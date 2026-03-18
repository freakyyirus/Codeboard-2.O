import { NextRequest, NextResponse } from "next/server"
import { getCachedDevNews } from "@/lib/integrations/news"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const sources = searchParams.get("sources")?.split(",").filter(Boolean) || undefined

        const news = await getCachedDevNews(sources)

        return NextResponse.json({
            success: true,
            count: news.length,
            news
        })
    } catch (error) {
        console.error("Error fetching dev news:", error)
        return NextResponse.json(
            { success: false, error: "Failed to fetch dev news" },
            { status: 500 }
        )
    }
}
