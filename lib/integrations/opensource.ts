export interface OpenSourceIssue {
    id: string
    title: string
    description: string
    repo: string
    repoUrl: string
    labels: string[]
    language?: string
    difficulty: "good first issue" | "easy" | "medium" | "hard"
    url: string
    comments: number
    createdAt: string
    updatedAt: string
    author: string
    platform: string
}

async function fetchGoodFirstIssues(): Promise<OpenSourceIssue[]> {
    try {
        const response = await fetch(
            "https://goodfirstissue.dev/api/issues?labels=good%20first%20issue",
            {
                headers: {
                    "Accept": "application/json"
                }
            }
        )
        
        if (!response.ok) return []
        
        const data = await response.json()
        
        return (data.issues || []).slice(0, 30).map((issue: any) => ({
            id: `gfi-${issue.id}`,
            title: issue.title,
            description: issue.description?.substring(0, 200) || "",
            repo: issue.repository?.full_name || "",
            repoUrl: issue.repository?.url || "",
            labels: issue.labels || [],
            language: issue.repository?.primaryLanguage?.name,
            difficulty: "good first issue" as const,
            url: issue.html_url,
            comments: issue.comments_count || 0,
            createdAt: issue.created_at,
            updatedAt: issue.updated_at,
            author: issue.user?.login || "",
            platform: "GoodFirstIssue.dev"
        }))
    } catch (error) {
        console.error("Error fetching GoodFirstIssue.dev:", error)
        return []
    }
}

async function fetchUpForGrabs(): Promise<OpenSourceIssue[]> {
    try {
        const response = await fetch("https://up-for-grabs.net/#api")
        const data = await response.json()
        
        const issues: OpenSourceIssue[] = []
        
        for (const project of (data.projects || []).slice(0, 20)) {
            if (project.tags && project.tags.includes("good-first-issue")) {
                issues.push({
                    id: `ufg-${project.name}`,
                    title: `${project.name} - Open issues`,
                    description: project.description || "",
                    repo: project.name,
                    repoUrl: project.site,
                    labels: project.tags || [],
                    language: project.tags?.find((t: string) => 
                        ["JavaScript", "TypeScript", "Python", "Go", "Rust", "Java", "C++"].includes(t)
                    ),
                    difficulty: "good first issue" as const,
                    url: project.site,
                    comments: 0,
                    createdAt: "",
                    updatedAt: "",
                    author: "",
                    platform: "Up For Grabs"
                })
            }
        }
        
        return issues
    } catch (error) {
        console.error("Error fetching Up For Grabs:", error)
        return []
    }
}

async function fetchGitHubGoodFirstIssues(token?: string): Promise<OpenSourceIssue[]> {
    try {
        const headers: Record<string, string> = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "CodeBoard/2.0"
        }
        
        if (token) {
            headers["Authorization"] = `token ${token}`
        }
        
        const response = await fetch(
            "https://api.github.com/search/issues?q=label:good-first-issue+is:issue+is:open&sort=created&order=desc&per_page=30",
            { headers }
        )
        
        if (!response.ok) return []
        
        const data = await response.json()
        
        return (data.items || []).map((issue: any) => ({
            id: `gh-${issue.id}`,
            title: issue.title,
            description: issue.body?.substring(0, 200) || "",
            repo: issue.repository_url?.replace("https://api.github.com/repos/", "") || "",
            repoUrl: issue.repository_url?.replace("api.github.com/repos", "github.com") || "",
            labels: issue.labels?.map((l: any) => l.name) || [],
            language: issue.repository_url ? "" : undefined,
            difficulty: "good first issue" as const,
            url: issue.html_url,
            comments: issue.comments,
            createdAt: issue.created_at,
            updatedAt: issue.updated_at,
            author: issue.user?.login,
            platform: "GitHub"
        }))
    } catch (error) {
        console.error("Error fetching GitHub issues:", error)
        return []
    }
}

async function fetchCodeTriage(): Promise<OpenSourceIssue[]> {
    try {
        const response = await fetch("https://www.codetriage.com/api/v1/repos.json?page=1&per_page=20")
        const data = await response.json()
        
        return (data || []).map((repo: any) => ({
            id: `ct-${repo.id}`,
            title: `${repo.name} - ${repo.issues_count || 0} open issues`,
            description: repo.description || "",
            repo: repo.full_name,
            repoUrl: repo.url,
            labels: [],
            language: repo.language,
            difficulty: "good first issue" as const,
            url: repo.url,
            comments: 0,
            createdAt: "",
            updatedAt: "",
            author: "",
            platform: "CodeTriage"
        }))
    } catch (error) {
        console.error("Error fetching CodeTriage:", error)
        return []
    }
}

export async function getOpenSourceIssues(filters?: {
    difficulty?: string
    language?: string
    search?: string
}): Promise<OpenSourceIssue[]> {
    const [goodFirst, upForGrabs, github, codeTriage] = await Promise.allSettled([
        fetchGoodFirstIssues(),
        fetchUpForGrabs(),
        fetchGitHubGoodFirstIssues(process.env.GITHUB_TOKEN),
        fetchCodeTriage()
    ])
    
    let allIssues: OpenSourceIssue[] = [
        ...(goodFirst.status === "fulfilled" ? goodFirst.value : []),
        ...(upForGrabs.status === "fulfilled" ? upForGrabs.value : []),
        ...(github.status === "fulfilled" ? github.value : []),
        ...(codeTriage.status === "fulfilled" ? codeTriage.value : [])
    ]
    
    if (filters?.language) {
        allIssues = allIssues.filter(i => 
            i.language?.toLowerCase() === filters.language!.toLowerCase()
        )
    }
    
    if (filters?.search) {
        const search = filters.search.toLowerCase()
        allIssues = allIssues.filter(i =>
            i.title.toLowerCase().includes(search) ||
            i.repo.toLowerCase().includes(search) ||
            i.labels.some(l => l.toLowerCase().includes(search))
        )
    }
    
    return allIssues
}

export const getCachedOpenSourceIssues = (() => {
    let cache: { issues: OpenSourceIssue[]; timestamp: number } | null = null
    const CACHE_DURATION = 1000 * 60 * 10
    
    return async (filters?: { language?: string; search?: string }): Promise<OpenSourceIssue[]> => {
        if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
            return cache.issues
        }
        
        const issues = await getOpenSourceIssues(filters)
        cache = { issues, timestamp: Date.now() }
        return issues
    }
})()
