import { unstable_cache } from "next/cache"

const WAKATIME_API_URL = "https://wakatime.com/api/v1"

export interface WakaTimeStats {
    total_seconds: number
    daily_average: number
    languages: { name: string; percent: number; time: string }[]
    editors: { name: string; percent: number }[]
    operating_systems: { name: string; percent: number }[]
}

export async function getWakaTimeStats(): Promise<WakaTimeStats | null> {
    const apiKey = process.env.WAKATIME_API_KEY
    if (!apiKey) return null

    try {
        // WakaTime API Key needs to be Base64 encoded for Basic Auth
        const encodedKey = Buffer.from(apiKey).toString('base64')

        // Fetch Last 7 Days stats
        const response = await fetch(`${WAKATIME_API_URL}/users/current/stats/last_7_days`, {
            headers: {
                Authorization: `Basic ${encodedKey}`
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        })

        if (!response.ok) {
            // console.error(`WakaTime API error: ${response.status}`)
            return null
        }

        const data = await response.json()
        const stats = data.data

        return {
            total_seconds: stats.total_seconds,
            daily_average: stats.daily_average,
            languages: stats.languages.slice(0, 5), // Top 5
            editors: stats.editors.slice(0, 3),
            operating_systems: stats.operating_systems
        }
    } catch (error) {
        console.error("WakaTime fetch error:", error)
        return null
    }
}

export const getCachedWakaTimeStats = unstable_cache(
    async () => getWakaTimeStats(),
    ['wakatime-stats'],
    { revalidate: 3600 }
)
