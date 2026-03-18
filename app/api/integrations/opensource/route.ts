import { NextRequest, NextResponse } from "next/server"
import { getCachedOpenSourceIssues } from "@/lib/integrations/opensource"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const language = searchParams.get("language") || undefined
        const search = searchParams.get("search") || undefined

        const issues = await getCachedOpenSourceIssues({ language, search })

        return NextResponse.json({
            success: true,
            count: issues.length,
            issues
        })
    } catch (error) {
        console.error("Error fetching open source issues:", error)
        return NextResponse.json(
            { success: false, error: "Failed to fetch open source issues" },
            { status: 500 }
        )
    }
}
