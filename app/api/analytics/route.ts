import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { fetchLeetCodeStats } from "@/lib/leetcode"
import { getCodeforcesUserInfo } from "@/lib/codeforces"
import { getGithubContributions } from "@/lib/github"
import { getWakaTimeStats } from "@/lib/wakatime"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

export async function GET() {
    try {
        const { userId } = await auth()
        
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        // Fetch user's connected platforms
        const { data: connections } = await supabase
            .from('platform_connections')
            .select('platform, username')
            .eq('user_id', userId)

        const connected = connections?.reduce((acc: Record<string, string>, conn) => {
            if (conn.username) {
                acc[conn.platform] = conn.username
            }
            return acc
        }, {} as Record<string, string>) || {}

        const githubUser = connected['github']
        const leetcodeUser = connected['leetcode']
        const codeforcesUser = connected['codeforces']

        // Fetch all platform data in parallel
        const [leetcode, codeforces, githubContribs, wakatime] = await Promise.allSettled([
            leetcodeUser ? fetchLeetCodeStats(leetcodeUser) : Promise.resolve(null),
            codeforcesUser ? getCodeforcesUserInfo(codeforcesUser) : Promise.resolve(null),
            githubUser ? getGithubContributions(githubUser) : Promise.resolve(null),
            getWakaTimeStats(),
        ])

        const leetcodeData = leetcode.status === "fulfilled" ? leetcode.value : null
        const codeforcesData = codeforces.status === "fulfilled" ? codeforces.value : null
        const githubData = githubContribs.status === "fulfilled" ? githubContribs.value : null
        const wakatimeData = wakatime.status === "fulfilled" ? wakatime.value : null

        return NextResponse.json({
            leetcode: leetcodeData,
            codeforces: codeforcesData,
            github: githubData,
            wakatime: wakatimeData,
            connected: connected,
        })
    } catch (error) {
        console.error("Analytics API error:", error)
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
    }
}