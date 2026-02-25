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
