"use server"

import { createClient } from "@supabase/supabase-js"
import { auth } from "@clerk/nextjs/server"

// Use service role key to bypass RLS — auth is handled by Clerk
function getAdminSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
}

export async function saveBasicInfoAction(data: {
    username: string
    full_name: string
    last_name: string
    email: string
    bio: string
    country: string
    daily_goal: number
    timezone: string
    skill_level: string
    visibility: string
}) {
    const { userId } = await auth()
    if (!userId) return { error: "Not authenticated" }

    const supabase = getAdminSupabase()

    const { error } = await supabase.from("users").upsert({
        id: userId,
        ...data,
        updated_at: new Date().toISOString(),
    })

    if (error) {
        console.error("saveBasicInfo error:", error)
        return { error: error.message }
    }
    return { success: true }
}

export async function savePlatformAction(platform: string, username: string) {
    const { userId } = await auth()
    if (!userId) return { error: "Not authenticated" }

    const supabase = getAdminSupabase()

    const { error } = await supabase.from("platform_connections").upsert(
        {
            user_id: userId,
            platform,
            username: username.trim(),
            last_synced: new Date().toISOString(),
        },
        { onConflict: "user_id,platform" }
    )

    if (error) {
        console.error("savePlatform error:", error)
        return { error: error.message }
    }
    return { success: true }
}

export async function disconnectPlatformAction(platform: string) {
    const { userId } = await auth()
    if (!userId) return { error: "Not authenticated" }

    const supabase = getAdminSupabase()

    const { error } = await supabase
        .from("platform_connections")
        .delete()
        .eq("user_id", userId)
        .eq("platform", platform)

    if (error) {
        console.error("disconnectPlatform error:", error)
        return { error: error.message }
    }
    return { success: true }
}

export async function loadUserDataAction() {
    const { userId } = await auth()
    if (!userId) return { error: "Not authenticated" }

    const supabase = getAdminSupabase()

    const [profileResult, connectionsResult] = await Promise.all([
        supabase.from("users").select("*").eq("id", userId).single(),
        supabase.from("platform_connections").select("*").eq("user_id", userId),
    ])

    return {
        profile: profileResult.data,
        connections: connectionsResult.data || [],
    }
}

/**
 * Immediately sync a single platform after connection.
 * Fetches live stats from the platform API and upserts into platform_stats.
 */
export async function syncPlatformNow(platform: string, username: string) {
    const { userId } = await auth()
    if (!userId) return { error: "Not authenticated" }
    if (!username.trim()) return { error: "Username is empty" }

    const supabase = getAdminSupabase()

    let stats: {
        easy_solved: number
        medium_solved: number
        hard_solved: number
        total_solved: number
        rating: number
        global_rank?: string
    } | null = null

    try {
        if (platform === 'leetcode') {
            const { fetchLeetCodeStats } = await import('@/lib/platforms/leetcode')
            stats = await fetchLeetCodeStats(username)
        } else if (platform === 'github') {
            const { fetchGitHubStats } = await import('@/lib/platforms/github')
            stats = await fetchGitHubStats(username)
        } else if (platform === 'codeforces') {
            const { getCodeforcesUserInfo } = await import('@/lib/codeforces')
            const cfData = await getCodeforcesUserInfo(username)
            if (cfData) {
                stats = {
                    easy_solved: 0,
                    medium_solved: 0,
                    hard_solved: 0,
                    total_solved: 0,
                    rating: cfData.rating,
                    global_rank: cfData.rank,
                }
            }
        } else if (platform === 'hackerrank') {
            const { fetchHackerRankStats } = await import('@/lib/platforms/hackerrank')
            stats = await fetchHackerRankStats(username)
        } else if (platform === 'atcoder') {
            const { fetchAtCoderStats } = await import('@/lib/platforms/atcoder')
            stats = await fetchAtCoderStats(username)
        }

        if (stats) {
            const { error: upsertError } = await supabase
                .from('platform_stats')
                .upsert({
                    user_id: userId,
                    platform,
                    easy_solved: stats.easy_solved,
                    medium_solved: stats.medium_solved,
                    hard_solved: stats.hard_solved,
                    total_solved: stats.total_solved,
                    rating: stats.rating,
                    global_rank: stats.global_rank || null,
                    last_synced: new Date().toISOString()
                }, {
                    onConflict: 'user_id,platform'
                })

            if (upsertError) {
                console.error(`syncPlatformNow upsert error for ${platform}:`, upsertError)
                return { error: upsertError.message }
            }
            return { success: true, stats }
        }

        return { success: true, stats: null }
    } catch (error: any) {
        console.error(`syncPlatformNow error for ${platform}:`, error)
        return { error: error.message || "Failed to sync" }
    }
}
