import { redis } from './redis'

const BASE_URL = "https://codeforces.com/api"

export async function getUpcomingContests() {
    // 1. Check Cache
    const CACHE_KEY = "codeforces:contests"
    const cached = await redis.get(CACHE_KEY)
    if (cached) return cached

    try {
        // 2. Fetch from Codeforces
        const res = await fetch(`${BASE_URL}/contest.list?gym=false`, {
            next: { revalidate: 3600 }
        })

        if (!res.ok) throw new Error("Codeforces API Error")

        const data = await res.json()
        if (data.status !== "OK") throw new Error("Codeforces API Error")

        // Filter: BEFORE phase (upcoming), sort by startTimeSeconds
        const upcoming = data.result
            .filter((c: any) => c.phase === "BEFORE")
            .sort((a: any, b: any) => a.startTimeSeconds - b.startTimeSeconds)
            .slice(0, 5) // Limit to 5
            .map((c: any) => ({
                id: c.id,
                name: c.name,
                startTimeSeconds: c.startTimeSeconds,
                durationSeconds: c.durationSeconds,
                platform: "Codeforces",
                url: `https://codeforces.com/contests/${c.id}` // Construct URL
            }))

        // 3. Cache (1 hour)
        await redis.set(CACHE_KEY, upcoming, { ex: 3600 })

        return upcoming
    } catch (error) {
        console.error("Failed to fetch Codeforces contests:", error)
        return []
    }
}
