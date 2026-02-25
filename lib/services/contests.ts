import { type NextRequest, NextResponse } from "next/server"

export interface Contest {
    id: string
    event: string
    host: string
    href: string
    start: string
    end: string
    duration: number // in seconds
    status: "BEFORE" | "CODING" | "COMPLETED"
}

// Map common platform names to Clist resource IDs or slugs if needed
const PLATFORM_MAPPING: Record<string, string> = {
    leetcode: "leetcode.com",
    codeforces: "codeforces.com",
    codechef: "codechef.com",
    atcoder: "atcoder.jp",
    hackerrank: "hackerrank.com",
    geeksforgeeks: "geeksforgeeks.org",
    kaggle: "kaggle.com",
}

export async function getContests(): Promise<Contest[]> {
    const CLIST_API_KEY = process.env.CLIST_API_KEY
    const CLIST_API_USERNAME = process.env.CLIST_API_USERNAME

    // Mock data if no key
    if (!CLIST_API_KEY || !CLIST_API_USERNAME || CLIST_API_KEY.includes("your_")) {
        console.warn("Clist API credentials missing. Using mock data.")
        return getMockContests()
    }

    try {
        // Fetch upcoming contests
        // Clist API: /api/v4/contest/
        // Params: username, api_key, limit=50, start__gte=now, order_by=start
        const now = new Date().toISOString()
        const params = new URLSearchParams({
            username: CLIST_API_USERNAME,
            api_key: CLIST_API_KEY,
            limit: "50",
            start__gte: now,
            order_by: "start",
        })

        const response = await fetch(`https://clist.by/api/v4/contest/?${params.toString()}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        })

        if (!response.ok) {
            throw new Error(`Clist API error: ${response.statusText}`)
        }

        const data = await response.json()

        return data.objects.map((c: any) => ({
            id: c.id.toString(),
            event: c.event,
            host: c.host,
            href: c.href,
            start: c.start,
            end: c.end,
            duration: c.duration,
            status: "BEFORE" // Simplified
        }))

    } catch (error) {
        console.error("Failed to fetch contests:", error)
        return getMockContests()
    }
}

function getMockContests(): Contest[] {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(now.getDate() + 1)

    return [
        {
            id: "1",
            event: "Weekly Contest 400",
            host: "leetcode.com",
            href: "https://leetcode.com/contest/",
            start: tomorrow.toISOString(),
            end: new Date(tomorrow.getTime() + 90 * 60000).toISOString(),
            duration: 5400,
            status: "BEFORE"
        },
        {
            id: "2",
            event: "Codeforces Round 950 (Div. 2)",
            host: "codeforces.com",
            href: "https://codeforces.com/contests",
            start: new Date(tomorrow.getTime() + 5 * 3600000).toISOString(),
            end: new Date(tomorrow.getTime() + 7 * 3600000).toISOString(),
            duration: 7200,
            status: "BEFORE"
        },
        {
            id: "3",
            event: "Starters 130",
            host: "codechef.com",
            href: "https://codechef.com",
            start: new Date(tomorrow.getTime() + 24 * 3600000).toISOString(),
            end: new Date(tomorrow.getTime() + 27 * 3600000).toISOString(),
            duration: 10800,
            status: "BEFORE"
        }
    ]
}
