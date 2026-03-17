import { NextRequest, NextResponse } from "next/server"
import { getCachedJobs, type Job } from "@/lib/integrations/jobs"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const platform = searchParams.get("platform") || undefined
        const type = searchParams.get("type") || undefined
        const search = searchParams.get("search") || undefined
        const tags = searchParams.get("tags")?.split(",").filter(Boolean) || undefined

        const jobs = await getCachedJobs({ platform, type, search, tags })

        return NextResponse.json({
            success: true,
            count: jobs.length,
            jobs
        })
    } catch (error) {
        console.error("Error fetching jobs:", error)
        return NextResponse.json(
            { success: false, error: "Failed to fetch jobs" },
            { status: 500 }
        )
    }
}
