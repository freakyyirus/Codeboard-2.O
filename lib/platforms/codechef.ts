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

export async function fetchCodeChefStats(username: string): Promise<PlatformData | null> {
    try {
        // Use unofficial CodeChef user profile API
        const response = await fetch(`https://codechef-api.vercel.app/${username}`, {
            next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limiting
        })

        if (!response.ok) {
            console.error(`CodeChef API error: ${response.statusText}`)
            return null
        }

        const data = await response.json()

        if (!data || !data.success) {
            return null
        }

        // The API returns stars like "3★", we just want the number
        const ratingCategory = data.stars ? parseInt(data.stars.replace('★', '')) : 0;

        return {
            platform: 'codechef',
            username: username,
            // CodeChef API doesn't cleanly expose problem difficulty breakdown, so we log 0s
            easy_solved: 0,
            medium_solved: 0,
            hard_solved: 0,
            total_solved: data.fullySolved?.count || 0,
            rating: data.currentRating || 0,
            global_rank: data.globalRank ? data.globalRank.toString() : undefined
        }

    } catch (error) {
        console.error(`Failed to fetch CodeChef data for ${username}:`, error)
        return null
    }
}
