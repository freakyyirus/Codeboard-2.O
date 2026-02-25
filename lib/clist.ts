import { unstable_cache } from "next/cache"

const CLIST_API_URL = "https://clist.by/api/v4"
const STANDARD_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export async function getPlatformRating(platform: string, handle: string): Promise<{ rating: number; rank: string | null } | null> {
    const apiUser = process.env.CLIST_API_USERNAME
    const apiKey = process.env.CLIST_API_KEY

    if (!apiUser || !apiKey) return null

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
        const query = new URLSearchParams({
            username: apiUser,
            api_key: apiKey,
            resource__name__exact: resource,
            handle__regex: "^" + handle + "$",
            limit: '1'
        })

        const url = CLIST_API_URL + "/account/?" + query.toString()

        const response = await fetch(url, { 
            headers: { 'User-Agent': STANDARD_USER_AGENT },
            next: { revalidate: 3600 } 
        })

        if (!response.ok) {
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
        console.error("Clist fetch error for " + platform + ":", error)
        return null
    }
}


export interface Contest {
    id: number
    event: string
    href: string
    resource: string
    start: string
    end: string
    duration: number
}

export async function getContests(): Promise<Contest[]> {
    const apiUser = process.env.CLIST_API_USERNAME
    const apiKey = process.env.CLIST_API_KEY
    if (!apiUser || !apiKey) return []

    const resources = ['leetcode.com', 'codeforces.com', 'codechef.com', 'atcoder.jp', 'hackerrank.com', 'geeksforgeeks.org']

    const now = new Date()
    const startObj = new Date(now)
    startObj.setDate(startObj.getDate() - 1)
    const startStr = startObj.toISOString().split('T')[0]

    try {
        const query = new URLSearchParams({
            username: apiUser,
            api_key: apiKey,
            resource__name__in: resources.join(','),
            start__gte: startStr,
            order_by: 'start',
            limit: '50'
        })

        const url = CLIST_API_URL + "/contest/?" + query.toString()

        const response = await fetch(url, { 
            headers: { 'User-Agent': STANDARD_USER_AGENT },
            next: { revalidate: 3600 } 
        })

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
    { revalidate: 3600 }
)
