import { redis } from './redis'

const GITHUB_API = "https://api.github.com"

export async function getTrendingRepos() {
    // 1. Check Cache
    const CACHE_KEY = "github:trending"
    const cached = await redis.get(CACHE_KEY)
    if (cached) return cached

    // 2. Fetch from GitHub (Search for high-star repos created in last 7 days)
    const date = new Date()
    date.setDate(date.getDate() - 7)
    const dateStr = date.toISOString().split('T')[0]

    // Query: created:>DATE stars:>100 topic:algorithm
    const query = `created:>${dateStr} stars:>100 topic:algorithm`

    try {
        const res = await fetch(`${GITHUB_API}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=5`, {
            headers: {
                "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
                "Accept": "application/vnd.github.v3+json"
            },
            next: { revalidate: 3600 } // Next.js cache backup
        })

        if (!res.ok) throw new Error(`GitHub API Error: ${res.statusText}`)

        const data = await res.json()
        const repos = data.items.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,
            stars: repo.stargazers_count,
            language: repo.language,
            url: repo.html_url,
            owner_avatar: repo.owner.avatar_url
        }))

        // 3. Cache Result (1 hour)
        await redis.set(CACHE_KEY, repos, { ex: 3600 })

        return repos
    } catch (error) {
        console.error("Failed to fetch GitHub trending:", error)
        return []
    }
}
