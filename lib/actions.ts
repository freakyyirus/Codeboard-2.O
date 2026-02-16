"use server"

import { createClerkSupabaseClient } from '@/lib/clerk-supabase'
import { auth } from '@clerk/nextjs/server'
import { Database } from '@/lib/database.types'
import { getCachedLeetCodeStats } from '@/lib/leetcode'
import { getCachedCodeforcesStats } from '@/lib/codeforces'
import { getCachedPlatformRating } from '@/lib/clist'
import { getCachedWakaTimeStats } from '@/lib/wakatime'
import { getCachedHackathons } from '@/lib/hackathons'

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
            platforms: []
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
            platforms: []
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

    // 8. Fetch Real LeetCode Stats (The New "Engine")
    const dbLeetCodeUser = connectedPlatforms['leetcode']?.username;
    const envLeetCodeUser = process.env.LEETCODE_USERNAME;
    const targetLeetCodeUser = dbLeetCodeUser || envLeetCodeUser;

    let leetCodeStats = null;
    if (targetLeetCodeUser) {
        leetCodeStats = await getCachedLeetCodeStats(targetLeetCodeUser);
    }

    // 9. Fetch Real Codeforces Stats
    const dbCodeforcesUser = connectedPlatforms['codeforces']?.username;
    // const envCodeforcesUser = process.env.CODEFORCES_USERNAME; // Optional fallback
    const targetCodeforcesUser = dbCodeforcesUser; // || envCodeforcesUser

    let codeforcesStats = null;
    if (targetCodeforcesUser) {
        codeforcesStats = await getCachedCodeforcesStats(targetCodeforcesUser);
    }

    // 10. Universal Fetch for Other Platforms (CodeChef, AtCoder, HackerRank, etc.)
    // We iterate through the connectedPlatforms object to find others
    const otherPlatforms = ['codechef', 'atcoder', 'hackerrank', 'geeksforgeeks', 'codestudio'];
    const otherStats: Record<string, any> = {};

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
    const socialStats = await getCachedSocialStats();

    // 14. Merge Stats
    // If we have LeetCode stats, use them for the "Total Solved" card.
    // Otherwise fallback to internal DB count (which is likely 0 for new users).

    const finalTotalSolved = leetCodeStats ? leetCodeStats.totalSolved : (solvedCount || 0);

    return {
        profile: userProfile,
        stats: {
            total_solved: finalTotalSolved,
            easy: leetCodeStats?.easySolved || 0,
            medium: leetCodeStats?.mediumSolved || 0,
            hard: leetCodeStats?.hardSolved || 0,
            streak: userProfile?.streak_count || 0,
            // Include raw platform objects for frontend
            leetcode: leetCodeStats,
            codeforces: codeforcesStats,
            wakatime: wakatimeStats,
            hackathons: hackathons,
            ...otherStats
        },
        social: socialStats,
        activity: activity || [],
        ratings: [],
        platforms: [],
        connectedPlatforms,
        contributions
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
