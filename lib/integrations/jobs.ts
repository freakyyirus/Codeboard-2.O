export interface Job {
    id: string
    title: string
    company: string
    companyLogo?: string
    location: string
    salary?: string
    type: "full-time" | "part-time" | "contract" | "internship" | "remote"
    tags: string[]
    description: string
    url: string
    postedAt: string
    platform: string
}

export interface JobFilters {
    platform?: string
    type?: string
    tags?: string[]
    search?: string
}

const JOB_PLATFORMS = {
    remoteok: "https://remoteok.com/api",
    weworkremotely: "https://weworkremotely.com/api",
    remotelean: "https://remote.leanapp.co"
}

async function fetchRemoteOK(): Promise<Job[]> {
    try {
        const response = await fetch("https://remoteok.com/api", {
            headers: {
                "User-Agent": "CodeBoard/2.0"
            }
        })
        const data = await response.json()
        
        return (data as any[])
            .filter((job: any) => !job.id || job.id > 0)
            .slice(0, 20)
            .map((job: any) => ({
                id: `remoteok-${job.id || job.position}`,
                title: job.position,
                company: job.company,
                companyLogo: job.company_logo,
                location: job.location || "Remote",
                salary: job.salary,
                type: "remote" as const,
                tags: job.tags || [],
                description: job.description?.substring(0, 200) || "",
                url: job.url,
                postedAt: job.date,
                platform: "RemoteOK"
            }))
    } catch (error) {
        console.error("Error fetching RemoteOK jobs:", error)
        return []
    }
}

async function fetchWeWorkRemotely(): Promise<Job[]> {
    try {
        const response = await fetch("https://weworkremotely.com/api")
        const data = await response.json()
        
        return (data.jobs || [])
            .slice(0, 20)
            .map((job: any) => ({
                id: `wwr-${job.id}`,
                title: job.title,
                company: job.company_name,
                companyLogo: job.company_logo_url,
                location: job.location_names?.[0] || "Remote",
                salary: job.salary?.toString(),
                type: "remote" as const,
                tags: job.categories || [],
                description: job.description?.substring(0, 200) || "",
                url: `https://weworkremotely.com${job.url}`,
                postedAt: job.published_at,
                platform: "WeWorkRemotely"
            }))
    } catch (error) {
        console.error("Error fetching WeWorkRemotely jobs:", error)
        return []
    }
}

async function fetchGitHubJobs(): Promise<Job[]> {
    try {
        const response = await fetch("https://jobs.github.com/api")
        const text = await response.text()
        
        const jobs: Job[] = []
        const jobMatches = text.match(/<position>[\s\S]*?<\/position>/g) || []
        
        for (const match of jobMatches.slice(0, 20)) {
            const getValue = (tag: string) => {
                const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`)
                return match.match(regex)?.[1] || ""
            }
            
            jobs.push({
                id: `gh-${getValue("id")}`,
                title: getValue("title"),
                company: getValue("company"),
                location: getValue("location"),
                type: getValue("type") as any || "full-time",
                tags: getValue("tags").split(",").filter(Boolean),
                description: getValue("description")?.substring(0, 200) || "",
                url: getValue("url"),
                postedAt: getValue("created_at"),
                platform: "GitHub Jobs"
            })
        }
        
        return jobs
    } catch (error) {
        console.error("Error fetching GitHub Jobs:", error)
        return []
    }
}

export async function getJobs(filters?: JobFilters): Promise<Job[]> {
    const [remoteOk, weWork, github] = await Promise.allSettled([
        fetchRemoteOK(),
        fetchWeWorkRemotely(),
        fetchGitHubJobs()
    ])
    
    let allJobs: Job[] = [
        ...(remoteOk.status === "fulfilled" ? remoteOk.value : []),
        ...(weWork.status === "fulfilled" ? weWork.value : []),
        ...(github.status === "fulfilled" ? github.value : [])
    ]
    
    if (filters?.platform) {
        allJobs = allJobs.filter(j => 
            j.platform.toLowerCase().includes(filters.platform!.toLowerCase())
        )
    }
    
    if (filters?.type) {
        allJobs = allJobs.filter(j => j.type === filters.type)
    }
    
    if (filters?.search) {
        const search = filters.search.toLowerCase()
        allJobs = allJobs.filter(j => 
            j.title.toLowerCase().includes(search) ||
            j.company.toLowerCase().includes(search) ||
            j.tags.some(t => t.toLowerCase().includes(search))
        )
    }
    
    if (filters?.tags?.length) {
        allJobs = allJobs.filter(j =>
            filters.tags!.some(tag => 
                j.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
            )
        )
    }
    
    return allJobs
}

export async function getJobsByPlatform(platform: string): Promise<Job[]> {
    switch (platform.toLowerCase()) {
        case "remoteok":
            return fetchRemoteOK()
        case "weworkremotely":
            return fetchWeWorkRemotely()
        case "github":
            return fetchGitHubJobs()
        default:
            return getJobs({ platform })
    }
}

export const getCachedJobs = (() => {
    let cache: { jobs: Job[]; timestamp: number } | null = null
    const CACHE_DURATION = 1000 * 60 * 15
    
    return async (filters?: JobFilters): Promise<Job[]> => {
        if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
            return cache.jobs
        }
        
        const jobs = await getJobs(filters)
        cache = { jobs, timestamp: Date.now() }
        return jobs
    }
})()
