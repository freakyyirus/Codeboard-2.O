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

export async function fetchHackerRankStats(username: string): Promise<PlatformData | null> {
    try {
        // Use unofficial HackerRank user profile API
        const response = await fetch(`https://www.hackerrank.com/rest/hackers/${username}/profile`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'application/json'
            },
            next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limiting
        })

        if (!response.ok) {
            console.error(`HackerRank API error: ${response.statusText}`)
            return null
        }

        const data = await response.json()
        const user = data.model

        if (!user) {
            return null;
        }

        // We'll estimate rating based on followers/level since true competitive "rating" varies 
        // Or default to 0 and rely on total_solved (which HackerRank calls "level" + practice scores)
        const rating = user.level || 0;

        return {
            platform: 'hackerrank',
            username: username,
            easy_solved: 0, // Profile API doesn't cleanly expose problem difficulty breakdown without further scraping
            medium_solved: 0,
            hard_solved: 0,
            total_solved: user.badge_counts?.total || 0, // Using badge count or another proxy for 'activity'
            rating: rating,
            global_rank: undefined
        }

    } catch (error) {
        console.error(`Failed to fetch HackerRank data for ${username}:`, error)
        return null
    }
}
