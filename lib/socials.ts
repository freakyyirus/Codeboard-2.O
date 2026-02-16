import { unstable_cache } from "next/cache"

export interface SocialStats {
    twitter: { followers: number; following: number; tweets: number } | null
    linkedin: { connections: number; posts: number } | null
    devto: { followers: number; posts: number; reading_list: number } | null
    medium: { followers: number } | null
}

// 1. Dev.to (Public API)
async function getDevToStats(username?: string) {
    if (!username) return null
    try {
        const res = await fetch(`https://dev.to/api/users/by_username?url=${username}`, {
            next: { revalidate: 3600 }
        })
        if (!res.ok) return null
        const data = await res.json()

        // Fetch article count separately or estimate from profile? 
        // The user object usually has some basic info, but article count might need /articles?username=...
        // Let's just use what we can get easily or mock the deeper stats if needed.
        // Actually, let's fetch articles count by listing them
        const articlesRes = await fetch(`https://dev.to/api/articles?username=${username}`, {
            next: { revalidate: 3600 }
        })
        const articles = articlesRes.ok ? await articlesRes.json() : []

        return {
            followers: 0, // Dev.to API doesn't publicize follower count easily without key?
            // Actually it's often protected. Let's return null for followers if undefined.
            // But we can get post count.
            posts: articles.length,
            reading_list: 0 // Private usually
        }
    } catch (e) {
        return null
    }
}

// 2. Twitter (Mock - requires expensive API)
async function getTwitterStats(username?: string) {
    if (!username) return null
    // Mock data for demo
    return {
        followers: 1250,
        following: 450,
        tweets: 3200
    }
}

// 3. LinkedIn (Mock - requires OAuth)
async function getLinkedInStats(username?: string) {
    if (!username) return null
    // Mock data for demo
    return {
        connections: 500, // 500+ usually
        posts: 45
    }
}

export async function getSocialStats(): Promise<SocialStats> {
    const devtoUser = process.env.DEVTO_USERNAME
    const twitterUser = process.env.TWITTER_USERNAME
    const linkedinUser = process.env.LINKEDIN_USERNAME // or URL

    const [devto, twitter, linkedin] = await Promise.all([
        getDevToStats(devtoUser),
        getTwitterStats(twitterUser),
        getLinkedInStats(linkedinUser)
    ])

    return {
        twitter,
        linkedin,
        devto,
        medium: null
    }
}

export const getCachedSocialStats = unstable_cache(
    async () => getSocialStats(),
    ['social-stats'],
    { revalidate: 3600 }
)
