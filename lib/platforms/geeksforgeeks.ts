export interface PlatformData {
    platform: string
    username: string
    easy_solved: number
    medium_solved: number
    hard_solved: number
    total_solved: number
    rating: number
    global_rank?: string
}

export async function fetchGeeksForGeeksStats(username: string): Promise<PlatformData | null> {
    try {
        // Use unofficial GeeksForGeeks user profile API
        const response = await fetch(`https://geeks-for-geeks-api.vercel.app/${username}`, {
            next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limiting
        })

        if (!response.ok) {
            console.error(`GeeksForGeeks API error: ${response.statusText}`)
            return null
        }

        const data = await response.json()

        if (!data || data.info !== "Data Fetched Successfully") {
            return null
        }

        return {
            platform: 'geeksforgeeks',
            username: username,
            easy_solved: data.Basic || 0,
            medium_solved: data.Medium || 0,
            hard_solved: data.Hard || 0,
            total_solved: data.totalProblemsSolved || 0,
            rating: data.codingScore || 0,
            global_rank: data.instituteRank ? data.instituteRank.toString() : undefined
        }

    } catch (error) {
        console.error(`Failed to fetch GeeksForGeeks data for ${username}:`, error)
        return null
    }
}
