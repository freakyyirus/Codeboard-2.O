export interface TrendingRepo {
    id: string
    name: string
    fullName: string
    description: string
    url: string
    stars: number
    forks: number
    language: string
    languageColor?: string
    topics: string[]
    author: string
    authorAvatar?: string
    builtBy: Array<{ username: string; avatar: string }>
    starsSince: number
    forksCount: number
    openIssues: number
    license?: string
    updatedAt: string
}

async function fetchGitHubTrending(daily: boolean = true): Promise<TrendingRepo[]> {
    const timeRange = daily ? "daily" : "weekly"
    
    try {
        const response = await fetch(
            `https://api.github.com/search/repositories?q=created:>${getDateDaysAgo(daily ? 1 : 7)}&sort=stars&order=desc&per_page=30`,
            {
                headers: {
                    "Accept": "application/vnd.github.v3+json",
                    "User-Agent": "CodeBoard/2.0"
                }
            }
        )
        
        if (!response.ok) return []
        
        const data = await response.json()
        
        return (data.items || []).map((repo: any) => ({
            id: `gh-${repo.id}`,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            languageColor: getLanguageColor(repo.language),
            topics: repo.topics || [],
            author: repo.owner.login,
            authorAvatar: repo.owner.avatar_url,
            builtBy: [],
            starsSince: Math.floor(repo.stargazers_count / (daily ? 1 : 7)),
            forksCount: repo.forks_count,
            openIssues: repo.open_issues_count,
            license: repo.license?.name,
            updatedAt: repo.updated_at
        }))
    } catch (error) {
        console.error("Error fetching GitHub trending:", error)
        return []
    }
}

async function fetchGitHubStars(token?: string): Promise<TrendingRepo[]> {
    try {
        const headers: Record<string, string> = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "CodeBoard/2.0"
        }
        
        if (token) {
            headers["Authorization"] = `token ${token}`
        }
        
        const response = await fetch(
            "https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=30",
            { headers }
        )
        
        if (!response.ok) return []
        
        const data = await response.json()
        
        return (data.items || []).slice(0, 20).map((repo: any) => ({
            id: `gh-${repo.id}`,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            languageColor: getLanguageColor(repo.language),
            topics: repo.topics || [],
            author: repo.owner.login,
            authorAvatar: repo.owner.avatar_url,
            builtBy: [],
            starsSince: 0,
            forksCount: repo.forks_count,
            openIssues: repo.open_issues_count,
            license: repo.license?.name,
            updatedAt: repo.updated_at
        }))
    } catch (error) {
        console.error("Error fetching GitHub stars:", error)
        return []
    }
}

async function fetchGitHubExplore(): Promise<TrendingRepo[]> {
    try {
        const response = await fetch(
            "https://api.github.com/repos/github/explore/popular/repos",
            {
                headers: {
                    "Accept": "application/vnd.github.v3+json",
                    "User-Agent": "CodeBoard/2.0"
                }
            }
        )
        
        if (!response.ok) return []
        
        const data = await response.json()
        
        return (data.repositories || []).map((repo: any) => ({
            id: `gh-${repo.id}`,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            url: repo.url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            languageColor: getLanguageColor(repo.language),
            topics: repo.topics || [],
            author: repo.owner.login,
            authorAvatar: repo.owner.avatar_url,
            builtBy: [],
            starsSince: 0,
            forksCount: repo.forks_count,
            openIssues: 0,
            license: repo.license,
            updatedAt: ""
        }))
    } catch (error) {
        console.error("Error fetching GitHub Explore:", error)
        return []
    }
}

function getDateDaysAgo(days: number): string {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return date.toISOString().split("T")[0]
}

function getLanguageColor(language: string): string {
    const colors: Record<string, string> = {
        JavaScript: "#f1e05a",
        TypeScript: "#2b7489",
        Python: "#3572A5",
        Java: "#b07219",
        "C++": "#f34b7d",
        C: "#555555",
        "C#": "#178600",
        Go: "#00ADD8",
        Rust: "#dea584",
        Ruby: "#701516",
        PHP: "#4F5D95",
        Swift: "#ffac45",
        Kotlin: "#A97BFF",
        Scala: "#c22d40",
        Dart: "#00B4AB",
        Shell: "#89e051",
        HTML: "#e34c26",
        CSS: "#563d7c",
        Vue: "#41b883",
        Svelte: "#ff3e00"
    }
    
    return colors[language] || "#858585"
}

export async function getTrendingRepos(options?: {
    period?: "daily" | "weekly" | "monthly"
    language?: string
}): Promise<TrendingRepo[]> {
    const [trending, stars, explore] = await Promise.allSettled([
        fetchGitHubTrending(options?.period === "daily"),
        fetchGitHubStars(process.env.GITHUB_TOKEN),
        fetchGitHubExplore()
    ])
    
    let allRepos: TrendingRepo[] = [
        ...(trending.status === "fulfilled" ? trending.value : []),
        ...(stars.status === "fulfilled" ? stars.value : []),
        ...(explore.status === "fulfilled" ? explore.value : [])
    ]
    
    if (options?.language) {
        allRepos = allRepos.filter(r => 
            r.language?.toLowerCase() === options.language!.toLowerCase()
        )
    }
    
    allRepos.sort((a, b) => b.stars - a.stars)
    
    return allRepos.slice(0, 30)
}

export const getCachedTrendingRepos = (() => {
    let cache: { repos: TrendingRepo[]; timestamp: number } | null = null
    const CACHE_DURATION = 1000 * 60 * 30
    
    return async (options?: { period?: "daily" | "weekly" | "monthly"; language?: string }): Promise<TrendingRepo[]> => {
        if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
            return cache.repos
        }
        
        const repos = await getTrendingRepos(options)
        cache = { repos, timestamp: Date.now() }
        return repos
    }
})()
