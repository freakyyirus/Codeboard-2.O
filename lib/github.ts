import { redis } from './redis'

const GITHUB_API = "https://api.github.com"
const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json"
};

export async function getRepos(username?: string) {
  const targetUser = username || process.env.GITHUB_USERNAME
  const CACHE_KEY = `github:repos:${targetUser}`

  // Return empty array if no user
  if (!targetUser) {
    console.warn("No GitHub username provided or set in env")
    return []
  }

  const cached = await redis.get(CACHE_KEY)
  if (cached) return cached


  // Return empty array if no token (unless checking public data without token, but rate limits apply)
  if (!process.env.GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN not set")
    // Could proceed without token for public data, but strictly following existing logic for now
    return []
  }

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${targetUser}/repos?sort=updated&per_page=100`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      // If 404, return empty
      if (res.status === 404) return []
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

export async function getEvents(username?: string) {
  const targetUser = username || process.env.GITHUB_USERNAME
  const CACHE_KEY = `github:events:${targetUser}`

  if (!targetUser) return []

  const cached = await redis.get(CACHE_KEY)
  if (cached) return cached

  // Return empty array if no token
  if (!process.env.GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN not set")
    return []
  }

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${targetUser}/events?per_page=30`,
      { headers, next: { revalidate: 1800 } } // Cache for 30 minutes
    );

    if (!res.ok) {
      if (res.status === 404) return []
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

export async function getPinnedRepos(username?: string) {
  const targetUser = username || process.env.GITHUB_USERNAME
  const CACHE_KEY = `github:pinned:${targetUser}`

  if (!targetUser) return []

  const cached = await redis.get(CACHE_KEY)
  if (cached) return cached

  // Return empty array if no token
  if (!process.env.GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN not set")
    return []
  }

  const query = {
    query: `
    query {
      user(login: "${targetUser}") {
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
    const pinnedNodes = data.data?.user?.pinnedItems?.nodes || []
    await redis.set(CACHE_KEY, pinnedNodes, { ex: 3600 })
    return pinnedNodes;
  } catch (error) {
    console.error("Failed to fetch pinned repos:", error)
    return []
  }
}
