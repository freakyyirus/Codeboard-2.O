/**
 * GitHub API fetcher.
 * Uses the public strictly-rate-limited REST endpoint.
 * For production, it's recommended to add a GITHUB_TOKEN to headers.
 */

import { PlatformData } from './leetcode' // Import the standardized interface

export async function fetchGitHubStats(username: string): Promise<PlatformData | null> {
    try {
        // Fetch basic user profile (public repos, followers, etc)
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` // Optional, but highly recommended
            },
            next: { revalidate: 3600 }
        })

        if (!response.ok) {
            console.error(`GitHub API error: ${response.statusText}`)
            return null
        }

        const data = await response.json()

        // GitHub doesn't have "easy/medium/hard" problems. 
        // We will map their stats to fit our platform model:
        // total_solved = public repos (for now)
        // rating = followers

        return {
            platform: 'github',
            username: username,
            easy_solved: 0,
            medium_solved: 0,
            hard_solved: 0,
            total_solved: data.public_repos || 0,
            rating: data.followers || 0,
            global_rank: data.type, // e.g. "User"
        }

    } catch (error) {
        console.error("Failed to fetch GitHub data:", error)
        return null
    }
}
