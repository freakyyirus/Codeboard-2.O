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

export async function fetchAtCoderStats(username: string): Promise<PlatformData | null> {
    try {
        // Kenkoooo AtCoder API
        const response = await fetch(`https://kenkoooo.com/atcoder/atcoder-api/v2/user_info?user=${username}`, {
            next: { revalidate: 3600 }
        })

        if (!response.ok) {
            console.error(`AtCoder API error: ${response.statusText}`)
            return null
        }

        const data = await response.json()

        if (!data || data.user_id !== username) {
            // For newer users or users not found
            return null;
        }

        return {
            platform: 'atcoder',
            username: username,
            easy_solved: 0,     // AtCoder doesn't easily return granularity by basic diff via this endpoint
            medium_solved: 0,
            hard_solved: 0,
            total_solved: data.accepted_count || 0,
            rating: data.rating || 0,
            global_rank: data.rank ? data.rank.toString() : undefined
        }

    } catch (error) {
        console.error(`Failed to fetch AtCoder data for ${username}:`, error)
        return null
    }
}
