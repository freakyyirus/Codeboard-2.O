import { redis } from './redis'

const GITHUB_API = "https://api.github.com"
const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json"
};

export async function getRepos() {
  const CACHE_KEY = "github:repos"
  const cached = await redis.get(CACHE_KEY)
  if (cached) return cached

  // Return empty array if no token
  if (!process.env.GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN not set")
    return []
  }

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${process.env.GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      { headers, next: { revalidate: 3600 } }
    );
    
    if (!res.ok) {
      console.error(`GitHub API Error: ${res.status} ${res.statusText}`)
      return []
    }
    
    const data = await res.json()
    
    // Cache for 1 hour
    await redis.set(CACHE_KEY, data, { ex: 3600 })
    return data;
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error)
    return []
  }
}

export async function getTrendingRepos() {
  // Mock implementation for now - can be replaced with actual GitHub trending API
  return [
    { 
      id: 1, 
      full_name: "donnemartin/system-design-primer", 
      description: "Learn how to design large-scale systems.", 
      stars: 245000, 
      language: "Python", 
      url: "https://github.com/donnemartin/system-design-primer", 
      owner_avatar: "" 
    },
    { 
      id: 2, 
      full_name: "trekhleb/javascript-algorithms", 
      description: "Algorithms and data structures implemented in JavaScript with explanations and links to further readings", 
      stars: 182000, 
      language: "JavaScript", 
      url: "https://github.com/trekhleb/javascript-algorithms", 
      owner_avatar: "" 
    },
    { 
      id: 3, 
      full_name: "jwasham/coding-interview-university", 
      description: "A complete computer science study plan to become a software engineer.", 
      stars: 278000, 
      language: "Markdown", 
      url: "https://github.com/jwasham/coding-interview-university", 
      owner_avatar: "" 
    }
  ];
}

export async function getEvents() {
  const CACHE_KEY = "github:events"
  const cached = await redis.get(CACHE_KEY)
  if (cached) return cached

  // Return empty array if no token or username
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_USERNAME) {
    console.warn("GITHUB_TOKEN or GITHUB_USERNAME not set")
    return []
  }

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${process.env.GITHUB_USERNAME}/events?per_page=30`,
      { headers, next: { revalidate: 1800 } } // Cache for 30 minutes
    );
    
    if (!res.ok) {
      console.error(`GitHub Events API Error: ${res.status} ${res.statusText}`)
      return []
    }
    
    const data = await res.json()
    
    // Cache for 30 minutes
    await redis.set(CACHE_KEY, data, { ex: 1800 })
    return data;
  } catch (error) {
    console.error("Failed to fetch GitHub events:", error)
    return []
  }
}

export async function getPinnedRepos() {
  const CACHE_KEY = "github:pinned"
  const cached = await redis.get(CACHE_KEY)
  if (cached) return cached

  // Return empty array if no token or username
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_USERNAME) {
    console.warn("GITHUB_TOKEN or GITHUB_USERNAME not set")
    return []
  }

  const query = {
    query: `
    query {
      user(login: "${process.env.GITHUB_USERNAME}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              primaryLanguage { 
                name
              }
            }
          }
        }
      }
    }
  `,
  };

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query),
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      console.error(`GitHub GraphQL Error: ${res.status} ${res.statusText}`)
      return []
    }

    const data = await res.json()
    
    // Handle GraphQL errors
    if (data.errors) {
      console.error("GraphQL errors:", data.errors)
      return []
    }
    
    // Cache for 1 hour
    await redis.set(CACHE_KEY, data.data.user.pinnedItems.nodes, { ex: 3600 })
    return data.data.user.pinnedItems.nodes;
  } catch (error) {
    console.error("Failed to fetch pinned repos:", error)
    return []
  }
}
