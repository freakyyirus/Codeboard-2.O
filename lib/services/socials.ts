export interface SocialPost {
    id: string
    platform: "devto" | "medium" | "hashnode" | "twitter" | "linkedin"
    title: string // or content snippet for tweets
    url: string
    publishedAt: string
    views?: number
    reactions?: number
}

export async function getSocialPosts(usernames: {
    devto?: string
    medium?: string
    hashnode?: string
    twitter?: string
    linkedin?: string
}): Promise<SocialPost[]> {
    const posts: SocialPost[] = []

    // 1. Dev.to
    if (usernames.devto) {
        try {
            const res = await fetch(`https://dev.to/api/articles?username=${usernames.devto}&per_page=3`)
            if (res.ok) {
                const data = await res.json()
                data.forEach((article: any) => {
                    posts.push({
                        id: `devto-${article.id}`,
                        platform: "devto",
                        title: article.title,
                        url: article.url,
                        publishedAt: article.published_at,
                        views: article.page_views_count,
                        reactions: article.public_reactions_count
                    })
                })
            }
        } catch (e) {
            console.error("Dev.to fetch failed", e)
        }
    }

    // 2. Hashnode (GraphQL)
    if (usernames.hashnode) {
        try {
            const query = `
                query {
                    user(username: "${usernames.hashnode}") {
                        posts(page: 1, pageSize: 3) {
                            nodes {
                                id
                                title
                                url
                                publishedAt
                                views
                                reactionCount
                            }
                        }
                    }
                }
            `
            const res = await fetch("https://gql.hashnode.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            })
            if (res.ok) {
                const { data } = await res.json()
                if (data.user?.posts?.nodes) {
                    data.user.posts.nodes.forEach((post: any) => {
                        posts.push({
                            id: `hashnode-${post.id}`,
                            platform: "hashnode",
                            title: post.title,
                            url: post.url,
                            publishedAt: post.publishedAt,
                            views: post.views,
                            reactions: post.reactionCount
                        })
                    })
                }
            }
        } catch (e) {
            console.error("Hashnode fetch failed", e)
        }
    }

    // 3. Medium (RSS via rss2json or similar, since RSS parsing in browser/edge is annoying with XML)
    // We'll use a public RSS-to-JSON bridge for demo: https://api.rss2json.com/v1/api.json?rss_url=
    if (usernames.medium) {
        try {
            const rssUrl = `https://medium.com/feed/@${usernames.medium}`
            const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
            if (res.ok) {
                const data = await res.json()
                if (data.items) {
                    data.items.slice(0, 3).forEach((item: any) => {
                        posts.push({
                            id: `medium-${item.guid}`,
                            platform: "medium",
                            title: item.title,
                            url: item.link,
                            publishedAt: item.pubDate,
                            // No views/reactions in RSS
                        })
                    })
                }
            }
        } catch (e) {
            console.error("Medium fetch failed", e)
        }
    }

    // Sort by date desc
    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}
