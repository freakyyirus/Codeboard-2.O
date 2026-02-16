import { unstable_cache } from "next/cache"

export interface CodeforcesStats {
    username: string
    rating: number
    rank: string
    maxRating: number
    maxRank: string
    lastOnlineTimeSeconds: number
    registrationTimeSeconds: number
    friendOfCount: number
    titlePhoto: string
}

export async function getCodeforcesStats(username: string): Promise<CodeforcesStats | null> {
    try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`)

        if (!response.ok) {
            console.error(`Codeforces API error: ${response.statusText}`)
            return null
        }

        const data = await response.json()

        if (data.status !== "OK" || !data.result || data.result.length === 0) {
            return null
        }

        const user = data.result[0]

        return {
            username: user.handle,
            rating: user.rating || 0,
            rank: user.rank || "unrated",
            maxRating: user.maxRating || 0,
            maxRank: user.maxRank || "unrated",
            lastOnlineTimeSeconds: user.lastOnlineTimeSeconds,
            registrationTimeSeconds: user.registrationTimeSeconds,
            friendOfCount: user.friendOfCount,
            titlePhoto: user.titlePhoto
        }
    } catch (error) {
        console.error("Codeforces fetch error:", error)
        return null
    }
}

export const getCachedCodeforcesStats = unstable_cache(
    async (username: string) => getCodeforcesStats(username),
    ['codeforces-stats'],
    { revalidate: 3600 } // Cache for 1 hour
)
