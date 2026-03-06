"use server"

import { createClient } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { Database } from "@/lib/database.types"

type Tables = Database["public"]["Tables"]
type Profile = Tables["portfolio_profiles"]["Row"]
type Skill = Tables["portfolio_skills"]["Row"]
type Project = Tables["portfolio_projects"]["Row"]
type Education = Tables["portfolio_education"]["Row"]
type Experience = Tables["portfolio_experience"]["Row"]

export interface FullPortfolioData {
    profile: Profile | null
    skills: Skill[]
    projects: Project[]
    education: Education[]
    experience: Experience[]
}

export async function getPortfolioData(username?: string): Promise<FullPortfolioData> {
    const supabase = await createClient()
    let targetUserId = null

    if (username) {
        // Look up by custom url slug first
        const { data: profileBySlug } = await supabase
            .from("portfolio_profiles")
            .select("user_id")
            .eq("custom_url_slug", username)
            .single() as any

        if (profileBySlug) {
            targetUserId = profileBySlug.user_id
        } else {
            // Fallback to clerk username via users table
            const { data: userByUsername } = await supabase
                .from("users")
                .select("id")
                .eq("username", username)
                .single() as any
            if (userByUsername) {
                targetUserId = userByUsername.id
            }
        }
    } else {
        // Authenticated user
        const { userId } = await auth()
        targetUserId = userId
    }

    if (!targetUserId) {
        return { profile: null, skills: [], projects: [], education: [], experience: [] }
    }

    // Fetch everything concurrently
    const [
        { data: profile },
        { data: skills },
        { data: projects },
        { data: education },
        { data: experience }
    ] = await Promise.all([
        supabase.from("portfolio_profiles").select("*").eq("user_id", targetUserId).single(),
        supabase.from("portfolio_skills").select("*").eq("user_id", targetUserId).order("sort_order"),
        supabase.from("portfolio_projects").select("*").eq("user_id", targetUserId).order("sort_order"),
        supabase.from("portfolio_education").select("*").eq("user_id", targetUserId).order("sort_order"),
        supabase.from("portfolio_experience").select("*").eq("user_id", targetUserId).order("sort_order")
    ])

    return {
        profile: profile || null,
        skills: skills || [],
        projects: projects || [],
        education: education || [],
        experience: experience || []
    }
}

export async function updatePortfolioProfile(data: Partial<Tables["portfolio_profiles"]["Update"]>) {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    const supabase = await createClient()

    // Upsert the profile (if they don't have one yet, it creates it)
    const { error } = await supabase
        .from("portfolio_profiles")
        .upsert({ user_id: userId, ...(data as any) }, { onConflict: "user_id" })

    if (error) {
        console.error("Error updating portfolio profile:", error)
        throw new Error(error.message)
    }

    revalidatePath("/dashboard/portfolio")
    revalidatePath("/dashboard/portfolio/edit")
    return { success: true }
}

export async function upsertPortfolioSection<T extends "portfolio_skills" | "portfolio_projects" | "portfolio_education" | "portfolio_experience">(
    table: T,
    data: Tables[T]["Insert"][]
) {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    const supabase = await createClient()

    // Basic structural validation - ensure user_id matches
    const sanitizedData = data.map((item) => ({
        ...(item as any),
        user_id: userId
    }))

    // Clear existing for a full sync (simplest way to handle deletes/reorders in a draft)
    await (supabase.from(table) as any).delete().eq("user_id", userId)

    if (sanitizedData.length > 0) {
        const { error } = await (supabase.from(table) as any).insert(sanitizedData)
        if (error) {
            console.error(`Error upserting ${table}:`, error)
            throw new Error(error.message)
        }
    }

    revalidatePath("/dashboard/portfolio")
    revalidatePath("/dashboard/portfolio/edit")
    return { success: true }
}
