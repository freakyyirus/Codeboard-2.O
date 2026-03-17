export interface NewsArticle {
    id: string
    title: string
    description?: string
    url: string
    author?: string
    source: string
    image?: string
    publishedAt: string
    tags: string[]
    upvotes?: number
    comments?: number
}

async function fetchHackerNews(top: number = 20): Promise<NewsArticle[]> {
    try {
        const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
        const storyIds = await response.json()
        
        const stories = await Promise.all(
            storyIds.slice(0, top).map(async (id: number) => {
                const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                return storyRes.json()
            })
        )
        
        return stories.filter(Boolean).map((story: any) => ({
            id: `hn-${story.id}`,
            title: story.title,
            description: story.text?.substring(0, 200),
            url: story.url,
            author: story.by,
            source: "Hacker News",
            image: undefined,
            publishedAt: new Date(story.time * 1000).toISOString(),
            tags: [],
            upvotes: story.score,
            comments: story.descendants
        }))
    } catch (error) {
        console.error("Error fetching Hacker News:", error)
        return []
    }
}

async function fetchRedditProgramming(): Promise<NewsArticle[]> {
    try {
        const response = await fetch(
            "https://www.reddit.com/r/programming/hot.json?limit=25",
            {
                headers: {
                    "User-Agent": "CodeBoard/2.0"
                }
            }
        )
        
        const data = await response.json()
        
        return (data.data?.children || [])
            .filter((post: any) => !post.data.is_self || post.data.selftext)
            .map((post: any) => ({
                id: `reddit-${post.data.id}`,
                title: post.data.title,
                description: post.data.selftext?.substring(0, 200),
                url: post.data.url,
                author: post.data.author,
                source: "Reddit r/programming",
                image: post.data.thumbnail?.startsWith("http") ? post.data.thumbnail : undefined,
                publishedAt: new Date(post.data.created_utc * 1000).toISOString(),
                tags: post.data.link_flair_text ? [post.data.link_flair_text] : [],
                upvotes: post.data.ups,
                comments: post.data.num_comments
            }))
    } catch (error) {
        console.error("Error fetching Reddit:", error)
        return []
    }
}

async function fetchDevToArticles(limit: number = 20): Promise<NewsArticle[]> {
    try {
        const response = await fetch(
            `https://dev.to/api/articles?per_page=${limit}&top=7`
        )
        
        const data = await response.json()
        
        return (data || []).map((article: any) => ({
            id: `devto-${article.id}`,
            title: article.title,
            description: article.description,
            url: article.url,
            author: article.user?.name,
            source: "DEV.to",
            image: article.cover_image || article.social_image,
            publishedAt: article.published_at,
            tags: article.tag_list || [],
            upvotes: article.positive_reactions_count,
            comments: article.comments_count
        }))
    } catch (error) {
        console.error("Error fetching DEV.to:", error)
        return []
    }
}

async function fetchHashnodeStories(limit: number = 20): Promise<NewsArticle[]> {
    try {
        const response = await fetch("https://hashnode.com/api/stories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                page: 1,
                pageSize: limit,
                sortBy: "newest"
            })
        })
        
        const data = await response.json()
        
        return (data.stories || []).map((story: any) => ({
            id: `hashnode-${story.id}`,
            title: story.title,
            description: story.briefContent?.substring(0, 200),
            url: story.url,
            author: story.author?.name,
            source: "Hashnode",
            image: story.coverImage,
            publishedAt: story.publishedAt,
            tags: story.tags?.map((t: any) => t.name) || [],
            upvotes: story.totalReactions,
            comments: story.replyCount
        }))
    } catch (error) {
        console.error("Error fetching Hashnode:", error)
        return []
    }
}

async function fetchTechCrunch(): Promise<NewsArticle[]> {
    try {
        const response = await fetch("https://techcrunch.com/feed/")
        const text = await response.text()
        
        const articles: NewsArticle[] = []
        const itemRegex = /<item>([\s\S]*?)<\/item>/g
        let match
        
        while ((match = itemRegex.exec(text)) !== null && articles.length < 15) {
            const item = match[1]
            
            const getValue = (tag: string) => {
                const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)
                return item.match(regex)?.[1] || ""
            }
            
            articles.push({
                id: `tc-${Date.now()}-${articles.length}`,
                title: getValue("title"),
                description: getValue("description")?.replace(/<[^>]+>/g, "").substring(0, 200),
                url: getValue("link"),
                author: getValue("dc:creator"),
                source: "TechCrunch",
                publishedAt: getValue("pubDate"),
                tags: []
            })
        }
        
        return articles
    } catch (error) {
        console.error("Error fetching TechCrunch:", error)
        return []
    }
}

export async function getDevNews(sources?: string[]): Promise<NewsArticle[]> {
    const [hn, reddit, devto, hashnode, techcrunch] = await Promise.allSettled([
        fetchHackerNews(15),
        fetchRedditProgramming(),
        fetchDevToArticles(15),
        fetchHashnodeStories(15),
        fetchTechCrunch()
    ])
    
    let allNews: NewsArticle[] = [
        ...(hn.status === "fulfilled" ? hn.value : []),
        ...(reddit.status === "fulfilled" ? reddit.value : []),
        ...(devto.status === "fulfilled" ? devto.value : []),
        ...(hashnode.status === "fulfilled" ? hashnode.value : []),
        ...(techcrunch.status === "fulfilled" ? techcrunch.value : [])
    ]
    
    if (sources?.length) {
        allNews = allNews.filter(n => 
            sources.some(s => n.source.toLowerCase().includes(s.toLowerCase()))
        )
    }
    
    allNews.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    
    return allNews
}

export const getCachedDevNews = (() => {
    let cache: { news: NewsArticle[]; timestamp: number } | null = null
    const CACHE_DURATION = 1000 * 60 * 5
    
    return async (sources?: string[]): Promise<NewsArticle[]> => {
        if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
            return cache.news
        }
        
        const news = await getDevNews(sources)
        cache = { news, timestamp: Date.now() }
        return news
    }
})()
