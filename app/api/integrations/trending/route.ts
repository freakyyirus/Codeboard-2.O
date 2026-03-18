import { NextRequest, NextResponse } from "next/server"
import { getCachedTrendingRepos } from "@/lib/integrations/trending"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const period = searchParams.get("period") as "daily" | "weekly" | "monthly" | undefined
        const language = searchParams.get("language") || undefined

        const repos = await getCachedTrendingRepos({ period, language })

        return NextResponse.json({
            success: true,
            count: repos.length,
            repos
        })
    } catch (error) {
        console.error("Error fetching trending repos:", error)
        return NextResponse.json(
            { success: false, error: "Failed to fetch trending repos" },
            { status: 500 }
        )
    }
}
