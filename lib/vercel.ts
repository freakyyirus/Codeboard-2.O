import { redis } from './redis'

export async function getDeployments() {
  const CACHE_KEY = "vercel:deployments"
  const cached = await redis.get(CACHE_KEY)
  if (cached) return cached

  // Return empty array if no token or invalid token
  if (!process.env.VERCEL_TOKEN || process.env.VERCEL_TOKEN === "your_vercel_token_here") {
    console.warn("VERCEL_TOKEN not set or invalid")
    return []
  }

  try {
    const res = await fetch("https://api.vercel.com/v6/deployments", {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        "Content-Type": "application/json"
      } as any,
      next: { revalidate: 1800 } // Cache for 30 minutes
    } as any);

    // Handle 403 or other auth errors gracefully
    if (!res.ok) {
      console.warn(`Vercel API Error: ${res.status} ${res.statusText}`)
      return []
    }

    const data = await res.json()
    
    // Cache for 30 minutes
    await redis.set(CACHE_KEY, data.deployments || [], { ex: 1800 })
    return data.deployments || [];
  } catch (error) {
    console.error("Failed to fetch Vercel deployments:", error)
    return []
  }
}

export async function getProjects() {
  const CACHE_KEY = "vercel:projects"
  const cached = await redis.get(CACHE_KEY)
  if (cached) return cached

  // Return empty array if no token or invalid token
  if (!process.env.VERCEL_TOKEN || process.env.VERCEL_TOKEN === "your_vercel_token_here") {
    console.warn("VERCEL_TOKEN not set or invalid")
    return []
  }

  try {
    const res = await fetch("https://api.vercel.com/v8/projects", {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        "Content-Type": "application/json"
      } as any,
      next: { revalidate: 3600 } // Cache for 1 hour
    } as any);

    // Handle 403 or other auth errors gracefully
    if (!res.ok) {
      console.warn(`Vercel Projects API Error: ${res.status} ${res.statusText}`)
      return []
    }

    const data = await res.json()
    
    // Cache for 1 hour
    await redis.set(CACHE_KEY, data.projects || [], { ex: 3600 })
    return data.projects || [];
  } catch (error) {
    console.error("Failed to fetch Vercel projects:", error)
    return []
  }
}