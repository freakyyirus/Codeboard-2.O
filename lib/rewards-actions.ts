"use server"

import { createClerkSupabaseClient } from './clerk-supabase'
import { auth } from '@clerk/nextjs/server'
import { calculateStreak, calculateDailyReward } from './reward-utils'
import { startOfDay } from 'date-fns'

export async function getUserRewards() {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')

    const supabase = await createClerkSupabaseClient()

    // Find user rewards
    const { data: rewards, error } = await supabase
        .from('user_rewards')
        .select('*')
        .eq('user_id', userId)
        .single() as any

    if (error && error.code !== 'PGRST116') {
        throw error // NOT "Row not found"
    }

    if (!rewards) {
        const { data: newRewards, error: insertError } = await (supabase.from('user_rewards') as any)
            .insert({ user_id: userId })
            .select()
            .single() as any

        if (insertError) throw insertError
        return newRewards
    }

    return rewards
}

export async function claimDailyReward() {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')

    const supabase = await createClerkSupabaseClient()
    const rewards = await getUserRewards()

    const { streak, alreadyClaimed } = calculateStreak(rewards.last_claim_date, rewards.current_streak || 0)

    if (alreadyClaimed) {
        return { success: false, message: 'Already claimed today', streak, coinsEarned: 0 }
    }

    const coinsEarned = calculateDailyReward(streak)
    const today = startOfDay(new Date()).toISOString().split('T')[0] // local 'YYYY-MM-DD' equivalent for DB

    const newLongestStreak = Math.max(rewards.longest_streak || 0, streak)

    // Update user_rewards
    const { error: updateError } = await (supabase.from('user_rewards') as any)
        .update({
            code_coins: (rewards.code_coins || 0) + coinsEarned,
            current_streak: streak,
            longest_streak: newLongestStreak,
            last_claim_date: today,
            updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)

    if (updateError) throw updateError

    const { error: claimError } = await (supabase.from('daily_rewards') as any)
        .insert({
            user_id: userId,
            claim_date: today,
            coins_earned: coinsEarned,
            streak_day: streak
        })

    if (claimError) console.error("Could not insert daily log", claimError)

    // Check streak badges
    await checkAndAwardBadges()

    return { success: true, coinsEarned, streak }
}

export async function checkAndAwardBadges() {
    const { userId } = await auth()
    if (!userId) return []

    const supabase = await createClerkSupabaseClient()
    const rewards = await getUserRewards()

    const { data: earnedBadges } = await supabase
        .from('user_badges')
        .select('badge_type')
        .eq('user_id', userId)

    const earnedTypes = new Set(earnedBadges?.map((b: any) => b.badge_type) || [])
    const { data: allBadges } = await supabase.from('badges').select('*') as any

    if (!allBadges) return []

    const newlyEarned = []

    for (const badge of allBadges) {
        if (earnedTypes.has(badge.badge_type)) continue

        let earned = false

        if (badge.requirement_type === 'streak' && rewards.current_streak && rewards.current_streak >= (badge.requirement_value || 0)) {
            earned = true
        } else if (badge.requirement_type === 'problems_solved' && rewards.total_problems_solved && rewards.total_problems_solved >= (badge.requirement_value || 0)) {
            earned = true
        }

        if (earned) {
            newlyEarned.push({ user_id: userId, badge_type: badge.badge_type })
        }
    }

    if (newlyEarned.length > 0) {
        await supabase.from('user_badges').insert(newlyEarned as any)
    }

    return newlyEarned.map(b => b.badge_type)
}

export async function spendCodeCoins(amount: number, reason: string) {
    const { userId } = await auth()
    if (!userId) throw new Error('Unauthorized')

    const supabase = await createClerkSupabaseClient()
    const rewards = await getUserRewards()

    if ((rewards.code_coins || 0) < amount) {
        throw new Error('Insufficient CodeCoins')
    }

    const { error } = await (supabase.from('user_rewards') as any)
        .update({ code_coins: (rewards.code_coins || 0) - amount })
        .eq('user_id', userId)

    if (error) throw error

    return { success: true }
}

export async function getUserBadges() {
    const { userId } = await auth()
    if (!userId) return []

    const supabase = await createClerkSupabaseClient()
    const { data } = await supabase.from('user_badges').select('badge_type, earned_at').eq('user_id', userId)
    return data || []
}

export async function getAllBadges() {
    const supabase = await createClerkSupabaseClient()
    const { data } = await supabase.from('badges').select('*').order('id') as any
    return data || []
}

export async function awardProblemSolvedCoins(difficulty: string) {
    const { userId } = await auth()
    if (!userId) return 0

    const supabase = await createClerkSupabaseClient()
    const rewards = await getUserRewards()

    let coins = 2
    if (difficulty === 'Medium') coins = 5
    if (difficulty === 'Hard') coins = 10

    const { error: updateError } = await (supabase.from('user_rewards') as any)
        .update({
            code_coins: (rewards.code_coins || 0) + coins,
            total_problems_solved: (rewards.total_problems_solved || 0) + 1
        })
        .eq('user_id', userId)

    if (updateError) {
        console.error("Failed to award coins", updateError)
        return 0
    }

    // Check for problem-solving badges asynchronously
    checkAndAwardBadges().catch(console.error)

    return coins
}
