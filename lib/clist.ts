import { unstable_cache } from "next/cache"

const CLIST_API_URL = "https://clist.by/api/v4"

export async function getPlatformRating(platform: string, handle: string): Promise<{ rating: number; rank: string | null } | null> {
    const apiUser = process.env.CLIST_API_USERNAME
    const apiKey = process.env.CLIST_API_KEY

    // If no API key, return null so frontend shows "Not Connected" or "0"
    if (!apiUser || !apiKey) return null

    // Map our platform names to Clist resource slugs
    // Clist uses specific domain-like names for filtering
    const resourceMap: Record<string, string> = {
        'leetcode': 'leetcode.com',
        'codeforces': 'codeforces.com',
        'codechef': 'codechef.com',
        'atcoder': 'atcoder.jp',
        'hackerrank': 'hackerrank.com',
        'geeksforgeeks': 'geeksforgeeks.org',
        'codestudio': 'codingninjas.com/codestudio',
        'topcoder': 'topcoder.com',
        'spoj': 'spoj.com'
    }

    const resource = resourceMap[platform.toLowerCase()]
    if (!resource) return null

    try {
        // Clist API v4: /account/?resource__name__exact=codeforces.com&handle__regex=^handle$
        // We use regex matching to ensure exact match (e.g. "tourist" vs "tourist123")
        const query = new URLSearchParams({
            username: apiUser,
            api_key: apiKey,
            resource__name__exact: resource,
            handle__regex: `^${handle}$`,
            limit: '1'
        })

        const url = `${CLIST_API_URL}/account/?${query.toString()}`

        // Cache at fetch level for 1 hour
        const response = await fetch(url, { next: { revalidate: 3600 } })

        if (!response.ok) {
            // console.error(`Clist API error ${response.status}: ${response.statusText}`)
            return null
        }

        const data = await response.json()

        if (data.objects && data.objects.length > 0) {
            const account = data.objects[0]
            return {
                rating: account.rating || 0,
                rank: account.rank || null
            }
        }
        return null
    } catch (error) {
        console.error(`Clist fetch error for ${platform}:`, error)
        return null
    }
}


export interface Contest {
    id: number
    event: string
    href: string
    resource: string
    start: string // ISO
    end: string // ISO
    duration: number // seconds
}

export async function getContests(): Promise<Contest[]> {
    const apiUser = process.env.CLIST_API_USERNAME
    const apiKey = process.env.CLIST_API_KEY
    if (!apiUser || !apiKey) return []

    // Resources to fetch
    const resources = ['leetcode.com', 'codeforces.com', 'codechef.com', 'atcoder.jp', 'hackerrank.com', 'geeksforgeeks.org']

    // Calculate date range: Yesterday to +14 days
    const now = new Date()
    const startObj = new Date(now)
    startObj.setDate(startObj.getDate() - 1)
    const startStr = startObj.toISOString().split('T')[0] // YYYY-MM-DD

    // Fetch upcoming and active contests
    try {
        const query = new URLSearchParams({
            username: apiUser,
            api_key: apiKey,
            resource__name__in: resources.join(','),
            start__gte: startStr,
            order_by: 'start',
            limit: '50'
        })

        const url = `${CLIST_API_URL}/contest/?${query.toString()}`

        // Cache for 1 hour
        const response = await fetch(url, { next: { revalidate: 3600 } })

        if (!response.ok) return []

        const data = await response.json()
        return data.objects || []
    } catch (error) {
        console.error("Clist contest fetch error:", error)
        return []
    }
}


export const getCachedContests = unstable_cache(
    async () => getContests(),
    ['clist-contests'],
    { revalidate: 3600 }
)

export const getCachedPlatformRating = unstable_cache(
    async (platform: string, handle: string) => getPlatformRating(platform, handle),
    ['clist-rating'],
    { revalidate: 3600 } // Cache for 1 hour
)

