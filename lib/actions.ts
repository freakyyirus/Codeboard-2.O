"use server"

import { createClerkSupabaseClient } from '@/lib/clerk-supabase'
import { auth } from '@clerk/nextjs/server'
import { Database } from '@/lib/database.types'
import { getCachedLeetCodeStats, getCachedLeetCodeContestHistory } from '@/lib/leetcode'
import { getCachedCodeforcesStats, getCodeforcesRatingHistory } from '@/lib/codeforces'
import { getCachedPlatformRating } from '@/lib/clist'
import { getCachedWakaTimeStats } from '@/lib/wakatime'
import { getCachedHackathons } from '@/lib/hackathons'
import { getCachedSocialStats } from '@/lib/socials'
import { getSocialPosts } from '@/lib/services/socials'

type UserProfile = Database['public']['Tables']['users']['Row']

// Server Actions need to create a client that can access cookies if using Auth
// But for now we use the admin client from lib/supabase or create a new one contextually.
// Actually, using @supabase/ssr is better for Next.js actions.
// But we'll stick to the existing simple client pattern if Auth isn't fully set up with SSR cookies yet.
// However, to identify the 'current user', we need auth.

export async function getDashboardData() {
    const { userId } = await auth()

    if (!userId) {
        return {
            profile: null,
            stats: null,
            activity: [],
            ratings: [],
            platforms: [],
            contributions: []
        }
    }

    const supabase = await createClerkSupabaseClient()

    // 2. Get User Profile (from new 'users' table)
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

    if (!profile) {
        // Fallback or handle if webhook hasn't run yet?
        // Ideally we return null or basic info. 
        // For now let's return null to signify "loading" or "not found"
        return {
            profile: null,
            stats: null,
            activity: [],
            ratings: [],
            platforms: [],
            contributions: []
        }
    }

    // 3. Get Solves (Stats)
    const { count: solvedCount } = await supabase
        .from('solves')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)

    // 4. Get Recent Activity
    const { data: activity } = await supabase
        .from('solves')
        .select('solved_at, problem_id')
        .eq('user_id', userId)
        .order('solved_at', { ascending: false })
        .limit(365)

    // 5. Transform for Dashboard
    const userProfile = profile as UserProfile

    // 6. Get Platform Connections
    const { data: connections } = await supabase
        .from('platform_connections')
        .select('*')
        .eq('user_id', userId)

    const connectedPlatforms = connections?.reduce((acc: any, curr: any) => {
        acc[curr.platform] = {
            username: curr.username,
            last_synced: curr.last_synced
        }
        return acc
    }, {}) || {}



    // 7. Get Contribution Data (Existing logic + GitHub)
    const contributionMap = new Map<string, number>()

    // Internal Solves
    activity?.forEach((item: any) => {
        const date = item.solved_at.split('T')[0]
        contributionMap.set(date, (contributionMap.get(date) || 0) + 1)
    })

    // GitHub Contributions
    const githubUser = connectedPlatforms['github']?.username || process.env.GITHUB_USERNAME;
    if (githubUser) {
        const ghContributions = await getGithubContributions(githubUser);
        if (Array.isArray(ghContributions)) {
            ghContributions.forEach((c: any) => {
                // c.date is YYYY-MM-DD
                contributionMap.set(c.date, (contributionMap.get(c.date) || 0) + c.count);
            });
        }
    }

    const contributions = Array.from(contributionMap.entries()).map(([date, count]) => ({
        date,
        count
    }))

    // 8. Fetch Real Platform Stats from our new Engine table
    const { data: dbPlatformStats } = await supabase
        .from('platform_stats')
        .select('*')
        .eq('user_id', userId)

    let leetCodeStats: any = null
    let codeforcesStats: any = null
    let githubStats: any = null
    const otherStats: Record<string, any> = {}

    if (dbPlatformStats) {
        dbPlatformStats.forEach((stat: any) => {
            if (stat.platform === 'leetcode') {
                leetCodeStats = {
                    totalSolved: stat.total_solved,
                    easySolved: stat.easy_solved,
                    mediumSolved: stat.medium_solved,
                    hardSolved: stat.hard_solved,
                    ranking: stat.rating
                }
            } else if (stat.platform === 'codeforces') {
                codeforcesStats = {
                    rating: stat.rating,
                    rank: stat.global_rank,
                    username: connectedPlatforms['codeforces']?.username
                }
            } else if (stat.platform === 'github') {
                githubStats = {
                    totalRepos: stat.total_solved,
                    followers: stat.rating
                }
            } else {
                otherStats[stat.platform] = stat
            }
        })
    }

    // Live-fetch fallback: if platform_stats is empty but user has connected the platform,
    // fetch directly from API so data shows immediately (before cron runs)
    const lcUsername = connectedPlatforms['leetcode']?.username || process.env.LEETCODE_USERNAME
    if (!leetCodeStats && lcUsername) {
        const liveLC = await getCachedLeetCodeStats(lcUsername)
        if (liveLC) {
            leetCodeStats = {
                totalSolved: liveLC.totalSolved,
                easySolved: liveLC.easySolved,
                mediumSolved: liveLC.mediumSolved,
                hardSolved: liveLC.hardSolved,
                ranking: liveLC.ranking
            }
        }
    }

    const cfUsername = connectedPlatforms['codeforces']?.username || process.env.CODEFORCES_USERNAME
    if (!codeforcesStats && cfUsername) {
        const liveCF = await getCachedCodeforcesStats(cfUsername)
        if (liveCF) {
            codeforcesStats = {
                rating: liveCF.rating,
                rank: liveCF.rank,
                maxRating: liveCF.maxRating,
                maxRank: liveCF.maxRank,
                username: cfUsername
            }
        }
    }

    const otherPlatforms = ['codechef', 'atcoder', 'hackerrank', 'geeksforgeeks', 'codestudio'];

    await Promise.all(otherPlatforms.map(async (plat) => {
        const handle = connectedPlatforms[plat]?.username || process.env[`${plat.toUpperCase()}_USERNAME`];
        if (handle) {
            const data = await getCachedPlatformRating(plat, handle);
            if (data) {
                otherStats[plat] = data;
            }
        }
    }));

    // 11. WakaTime Stats
    const wakatimeStats = await getCachedWakaTimeStats();

    // 12. Hackathon Calendar
    const hackathons = await getCachedHackathons();

    // 13. Social Stats
    const socialStats = await getCachedSocialStats({
        devto: connectedPlatforms['devto']?.username,
        twitter: connectedPlatforms['twitter']?.username,
        linkedin: connectedPlatforms['linkedin']?.username
    });

    // 14. Social Posts (New)
    const socialPosts = await getSocialPosts({
        devto: connectedPlatforms['devto']?.username,
        medium: connectedPlatforms['medium']?.username, // Check if medium exists in connectedPlatforms, if not use Env or ignore
        hashnode: connectedPlatforms['hashnode']?.username
    })

    // 14. Merge Stats
    let finalTotalSolved = solvedCount || 0
    if (leetCodeStats?.totalSolved) {
        finalTotalSolved = leetCodeStats.totalSolved
    } else if (githubStats?.totalRepos) {
        finalTotalSolved = githubStats.totalRepos
    }

    // 15. Fetch Contest Rating History for Rating Progression Chart
    const ratingHistory: Record<string, any[]> = {}

    // Codeforces contest history
    if (cfUsername) {
        try {
            const cfHistory = await getCodeforcesRatingHistory(cfUsername)
            if (cfHistory && cfHistory.length > 0) {
                ratingHistory.codeforces = cfHistory.map((entry: any) => ({
                    date: new Date(entry.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
                    rating: entry.newRating,
                    contest: entry.contestName,
                    rank: entry.rank,
                    type: 'Rated'
                }))
            }
        } catch (e) {
            console.error('Failed to fetch CF rating history:', e)
        }
    }

    // LeetCode contest history
    if (lcUsername) {
        try {
            const lcHistory = await getCachedLeetCodeContestHistory(lcUsername)
            if (lcHistory && lcHistory.length > 0) {
                ratingHistory.leetcode = lcHistory
            }
        } catch (e) {
            console.error('Failed to fetch LC contest history:', e)
        }
    }

    // 16. Fetch Recent Problems with Details
    const { data: recentSolves } = await supabase
        .from('solves')
        .select(`
            id,
            solved_at,
            time_taken,
            problems!inner (
                title,
                difficulty,
                tags
            )
        `)
        .eq('user_id', userId)
        .order('solved_at', { ascending: false })
        .limit(10)

    const formattedRecentProblems = recentSolves?.map((solve: any) => ({
        id: solve.id,
        title: solve.problems?.title || "Unknown Problem",
        difficulty: solve.problems?.difficulty || "Medium",
        platform: "CodeBoard",
        status: "solved",
        time: new Date(solve.solved_at).toLocaleDateString(),
        solved_at: solve.solved_at
    })) || []

    return {
        profile: userProfile,
        stats: {
            total_solved: finalTotalSolved,
            easy: leetCodeStats?.easySolved || 0,
            medium: leetCodeStats?.mediumSolved || 0,
            hard: leetCodeStats?.hardSolved || 0,
            streak: userProfile?.streak_count || 0,
            leetcode: leetCodeStats,
            codeforces: codeforcesStats,
            github: githubStats,
            wakatime: wakatimeStats,
            hackathons: hackathons,
            ...otherStats
        },
        social: socialStats,
        activity: activity || [],
        recentProblems: formattedRecentProblems,
        ratings: [],
        platforms: dbPlatformStats || [],
        connectedPlatforms,
        contributions,
        socialPosts,
        ratingHistory
    }
}

import { getRepos, getPinnedRepos, getEvents, getGithubContributions } from '@/lib/github'

export async function getGitHubData(username?: string) {
    // If username is provided (e.g. from DB connection), use it.
    // Otherwise fallback to env var (Demo mode).
    const targetUser = username || process.env.GITHUB_USERNAME

    // Token is required for high rate limits, but some data might be public.
    // Ideally we'd use the user's Oauth token if they connected via GitHub App, 
    // but for now we use the Admin's token to fetch their public data.
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
