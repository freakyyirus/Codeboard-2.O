"use server"

import { createClient } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

type UserProfile = Database['public']['Tables']['users']['Row']

// Server Actions need to create a client that can access cookies if using Auth
// But for now we use the admin client from lib/supabase or create a new one contextually.
// Actually, using @supabase/ssr is better for Next.js actions.
// But we'll stick to the existing simple client pattern if Auth isn't fully set up with SSR cookies yet.
// However, to identify the 'current user', we need auth.

export async function getDashboardData() {
    const supabase = await createClient()

    // 1. Get Auth User
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return {
            profile: null,
            stats: null,
            activity: [],
            ratings: [],
            platforms: []
        }
    }

    // 2. Get User Profile (from new 'users' table)
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

    // 3. Get Solves (Stats)
    const { count: solvedCount } = await supabase
        .from('solves')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)

    // 4. Get Recent Activity
    const { data: activity } = await supabase
        .from('solves')
        .select('solved_at, problem_id')
        .eq('user_id', user.id)
        .order('solved_at', { ascending: false })
        .limit(365)

    // 5. Transform for Dashboard
    const userProfile = profile as UserProfile | null

    // 6. Get Platform Connections
    const { data: connections } = await supabase
        .from('platform_connections')
        .select('*')
        .eq('user_id', user.id)

    const connectedPlatforms = connections?.reduce((acc: any, curr: any) => {
        acc[curr.platform] = {
            username: curr.username,
            last_synced: curr.last_synced
        }
        return acc
    }, {}) || {}

    // 7. Get Contribution Data (Daily counts for last year)
    // We group by date in JS since Supabase simple client doesn't support complex group by easily without RPC
    const contributionMap = new Map<string, number>()
    activity?.forEach((item: any) => {
        const date = item.solved_at.split('T')[0]
        contributionMap.set(date, (contributionMap.get(date) || 0) + 1)
    })

    const contributions = Array.from(contributionMap.entries()).map(([date, count]) => ({
        date,
        count
    }))

    return {
        profile: userProfile || {
            id: user.id,
            username: user.user_metadata?.user_name || 'Coder',
            full_name: user.user_metadata?.full_name || 'Anonymous',
            email: user.email || '',
            avatar_url: '',
            skill_level: 'beginner',
            daily_goal: 0,
            timezone: 'UTC',
            streak_count: 0,
            longest_streak: 0,
            last_active: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        },
        stats: {
            total_solved: solvedCount || 0,
            easy: 0,
            medium: 0,
            hard: 0,
            streak: userProfile?.streak_count || 0
        },
        activity: activity || [],
        ratings: [],
        platforms: [],
        connectedPlatforms,
        contributions
    }
}

import { getRepos, getPinnedRepos, getEvents } from '@/lib/github'

export async function getGitHubData(username?: string) {
    // If username is provided, use it. Otherwise checkout env.
    const targetUser = username || process.env.GITHUB_USERNAME
    const hasToken = !!process.env.GITHUB_TOKEN && !!targetUser

    try {
        if (!hasToken) {
            return { repos: [], pinned: [], events: [], hasToken: false }
        }
        const [repos, pinned, events] = await Promise.all([
            getRepos(targetUser),
            getPinnedRepos(targetUser),
            getEvents(targetUser),
        ])
        return { repos, pinned, events, hasToken: true }
    } catch (error) {
        console.error("Failed to fetch GitHub data:", error)
        return { repos: [], pinned: [], events: [], hasToken: false }
    }
}
