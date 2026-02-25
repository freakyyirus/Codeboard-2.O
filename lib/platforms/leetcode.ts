/**
 * LeetCode limits public API access, so we use their public GraphQL endpoint.
 * This function fetches a user's total solved problems and ranking.
 */

const LEETCODE_GRAPHQL_ENDPOINT = 'https://leetcode.com/graphql'

const USER_PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      profile {
        ranking
      }
    }
  }
`

export interface PlatformData {
    platform: string
    username: string
    easy_solved: number
    medium_solved: number
    hard_solved: number
    total_solved: number
    rating: number // Using ranking for LeetCode
    global_rank?: string
}

export async function fetchLeetCodeStats(username: string): Promise<PlatformData | null> {
    try {
        const response = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com',
            },
            body: JSON.stringify({
                query: USER_PROFILE_QUERY,
                variables: { username }
            }),
            next: { revalidate: 3600 } // Cache for 1 hour to prevent rate limiting
        })

        if (!response.ok) {
            console.error(`LeetCode API error: ${response.statusText}`)
            return null
        }

        const data = await response.json()
        const user = data.data?.matchedUser

        if (!user) {
            console.error(`LeetCode user not found: ${username}`)
            return null
        }

        // Parse problem counts
        const stats = user.submitStats?.acSubmissionNum || []
        const easy = stats.find((s: any) => s.difficulty === 'Easy')?.count || 0
        const medium = stats.find((s: any) => s.difficulty === 'Medium')?.count || 0
        const hard = stats.find((s: any) => s.difficulty === 'Hard')?.count || 0
        const all = stats.find((s: any) => s.difficulty === 'All')?.count || 0

        // Ranking
        const ranking = user.profile?.ranking || 0

        return {
            platform: 'leetcode',
            username: username,
            easy_solved: easy,
            medium_solved: medium,
            hard_solved: hard,
            total_solved: all,
            rating: ranking, // We store rank linearly here
        }

    } catch (error) {
        console.error("Failed to fetch LeetCode data:", error)
        return null
    }
}
