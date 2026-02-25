import { NextResponse } from "next/server"
import { fetchLeetCodeStats } from "@/lib/leetcode"
import { getCodeforcesUserInfo } from "@/lib/codeforces"
import { getGithubContributions } from "@/lib/github"
import { getWakaTimeStats } from "@/lib/wakatime"

export const dynamic = "force-dynamic"

export async function GET() {
    try {
        const githubUser = process.env.GITHUB_USERNAME
        const leetcodeUser = process.env.LEETCODE_USERNAME
        const codeforcesUser = process.env.CODEFORCES_USERNAME

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

        // Build platform summary
        const platforms = []

        if (leetcodeData) {
            platforms.push({
                name: "LeetCode",
                color: "#ef4444",
                rating: leetcodeData.ranking?.toString() || "—",
                solved: leetcodeData.totalSolved,
                details: {
                    easy: leetcodeData.easySolved,
                    medium: leetcodeData.mediumSolved,
                    hard: leetcodeData.hardSolved,
                },
            })
        }

        if (codeforcesData) {
            platforms.push({
                name: "Codeforces",
                color: "#22c55e",
                rating: codeforcesData.rating?.toString() || "—",
                solved: 0, // CF doesn't expose total solved easily
                details: {
                    rank: codeforcesData.rank,
                    maxRating: codeforcesData.maxRating,
                    maxRank: codeforcesData.maxRank,
                },
            })
        }

        // Build contribution heatmap data (platform-tagged)
        const contributions: { date: string; count: number; platform: string; color: string }[] = []

        if (Array.isArray(githubData)) {
            githubData.forEach((c: { date: string; count: number }) => {
                contributions.push({ date: c.date, count: c.count, platform: "GitHub", color: "#3b82f6" })
            })
        }

        // Summary metrics
        const totalSolved = platforms.reduce((a, p) => a + (p.solved || 0), 0)
        const totalContributions = contributions.reduce((a, c) => a + c.count, 0)

        // Coding time from WakaTime
        const codingTimeHours = wakatimeData ? Math.round(wakatimeData.total_seconds / 3600) : 0
        const codingTimeMinutes = wakatimeData ? Math.round((wakatimeData.total_seconds % 3600) / 60) : 0

        return NextResponse.json({
            platforms,
            contributions,
            summary: {
                totalSolved,
                totalContributions,
                codingTime: wakatimeData ? `${codingTimeHours}h ${codingTimeMinutes}m` : null,
                languages: wakatimeData?.languages || [],
            },
            connected: {
                github: !!githubUser,
                leetcode: !!leetcodeUser,
                codeforces: !!codeforcesUser,
                wakatime: !!wakatimeData,
            },
        })
    } catch (error) {
        console.error("Analytics API error:", error)
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
    }
}
