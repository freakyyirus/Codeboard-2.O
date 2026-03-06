import { differenceInDays, startOfDay, parseISO } from 'date-fns'

export const DAILY_REWARD_BASE = 5
export const DAILY_REWARD_INCREMENT = 1
export const MAX_DAILY_REWARD = 10
export const WEEKLY_BONUS = 15

export function calculateStreak(lastClaimDate: string | null, currentStreak: number) {
    if (!lastClaimDate) {
        return { streak: 1, isContinuing: false, alreadyClaimed: false }
    }

    const today = startOfDay(new Date())
    const lastClaim = startOfDay(parseISO(lastClaimDate))

    const diff = differenceInDays(today, lastClaim)

    if (diff === 0) {
        // Already claimed today
        return { streak: currentStreak, isContinuing: true, alreadyClaimed: true }
    } else if (diff === 1) {
        // Claiming next day
        return { streak: currentStreak + 1, isContinuing: true, alreadyClaimed: false }
    } else {
        // Streak broken
        return { streak: 1, isContinuing: false, alreadyClaimed: false }
    }
}

export function calculateDailyReward(streak: number) {
    // Every 7 days, get a weekly bonus
    if (streak % 7 === 0) {
        return WEEKLY_BONUS
    }

    const reward = DAILY_REWARD_BASE + ((streak - 1) % 7) * DAILY_REWARD_INCREMENT
    return Math.min(reward, MAX_DAILY_REWARD)
}
