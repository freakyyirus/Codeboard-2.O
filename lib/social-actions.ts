"use server"

import { auth } from "@clerk/nextjs/server"
import { createClient } from "@supabase/supabase-js"

function getAdminSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
}

/**
 * Follow a user
 */
export async function followUser(targetUserId: string) {
    const { userId } = await auth()
    if (!userId) return { error: "Not authenticated" }
    if (userId === targetUserId) return { error: "Cannot follow yourself" }

    const supabase = getAdminSupabase()

    const { error } = await supabase
        .from("follows")
        .upsert(
            { follower_id: userId, following_id: targetUserId },
            { onConflict: "follower_id,following_id" }
        )

    if (error) {
        console.error("Follow error:", error)
        return { error: error.message }
    }

    return { success: true }
}

/**
 * Unfollow a user
 */
export async function unfollowUser(targetUserId: string) {
    const { userId } = await auth()
    if (!userId) return { error: "Not authenticated" }

    const supabase = getAdminSupabase()

    const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", userId)
        .eq("following_id", targetUserId)

    if (error) {
        console.error("Unfollow error:", error)
        return { error: error.message }
    }

    return { success: true }
}

/**
 * Get follow suggestions — random users not yet followed by current user
 */
export async function getFollowSuggestions() {
    const { userId } = await auth()
    if (!userId) return []

    const supabase = getAdminSupabase()

    // Get IDs the user already follows
    const { data: following } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", userId)

    const followedIds = (following || []).map(f => f.following_id)
    const excludeIds = [userId, ...followedIds]

    // Fetch random users not in exclude list
    const { data: users, error } = await supabase
        .from("users")
        .select("id, username, full_name, avatar_url, skill_level")
        .not("id", "in", `(${excludeIds.join(",")})`)
        .limit(5)

    if (error) {
        console.error("Suggestions error:", error)
        return []
    }

    return (users || []).map(u => ({
        id: u.id,
        name: u.full_name || u.username || "Coder",
        initials: getInitials(u.full_name || u.username || "U"),
        role: u.skill_level || "beginner",
        avatar_url: u.avatar_url
    }))
}

/**
 * Get leaderboard — top users by solve count
 */
export async function getLeaderboard() {
    const supabase = getAdminSupabase()

    // Count solves per user and join with user profile
    const { data: topSolvers, error } = await supabase
        .from("users")
        .select("id, username, full_name, avatar_url, streak_count")
        .order("streak_count", { ascending: false })
        .limit(5)

    if (error) {
        console.error("Leaderboard error:", error)
        return []
    }

    return (topSolvers || []).map(u => ({
        id: u.id,
        name: u.full_name || u.username || "Coder",
        initials: getInitials(u.full_name || u.username || "U"),
        streak: u.streak_count || 0
    }))
}

/**
 * Get IDs the current user follows
 */
export async function getFollowingIds(): Promise<string[]> {
    const { userId } = await auth()
    if (!userId) return []

    const supabase = getAdminSupabase()
    const { data } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", userId)

    return (data || []).map(f => f.following_id)
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .map(w => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
}
