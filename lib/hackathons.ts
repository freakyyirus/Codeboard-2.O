import { unstable_cache } from "next/cache"
import { getPlatformRating } from "./clist"

// Types
export interface Hackathon {
    id: string
    title: string
    platform: 'unstop' | 'devfolio' | 'hack2skill' | 'hackerearth' | 'other'
    start: string // ISO Date
    end: string // ISO Date
    url: string
    status: 'active' | 'upcoming' | 'past'
    logo?: string
}

// 1. HackerEarth (via Clist or Mock)
async function getHackerEarthHackathons(): Promise<Hackathon[]> {
    // Clist API can return contests for resource 'hackerearth.com'
    // But for now, let's mock some data to ensure the UI works immediately
    // Real Clist implementation would go here if API key is present
    return [
        {
            id: 'he-1',
            title: 'HackerEarth Future Tech Challenge',
            platform: 'hackerearth',
            start: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            end: new Date(Date.now() + 86400000 * 3).toISOString(),
            url: 'https://www.hackerearth.com/challenges/',
            status: 'upcoming',
        },
        {
            id: 'he-2',
            title: 'HackerEarth Monthly Circuit',
            platform: 'hackerearth',
            start: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            end: new Date(Date.now() + 86400000 * 5).toISOString(),
            url: 'https://www.hackerearth.com/challenges/competitive/',
            status: 'active',
        }
    ]
}

// 2. Unstop (Formerly Dare2Compete) - No Public API, using structured mock/placeholder
async function getUnstopHackathons(): Promise<Hackathon[]> {
    return [
        {
            id: 'unstop-1',
            title: 'Flipkart GRiD 6.0',
            platform: 'unstop',
            start: new Date(Date.now() + 86400000 * 10).toISOString(),
            end: new Date(Date.now() + 86400000 * 20).toISOString(),
            url: 'https://unstop.com/hackathons',
            status: 'upcoming',
        },
        {
            id: 'unstop-2',
            title: 'Tata Crucible Hackathon',
            platform: 'unstop',
            start: new Date(Date.now() - 86400000 * 2).toISOString(),
            end: new Date(Date.now() + 86400000 * 2).toISOString(),
            url: 'https://unstop.com/hackathons',
            status: 'active',
        }
    ]
}

// 3. Devfolio
async function getDevfolioHackathons(): Promise<Hackathon[]> {
    return [
        {
            id: 'devfolio-1',
            title: 'ETHIndia 2024',
            platform: 'devfolio',
            start: new Date(Date.now() + 86400000 * 15).toISOString(),
            end: new Date(Date.now() + 86400000 * 17).toISOString(),
            url: 'https://ethindia.devfolio.co/',
            status: 'upcoming',
        }
    ]
}

// 4. Hack2Skill
async function getHack2SkillHackathons(): Promise<Hackathon[]> {
    return [
        {
            id: 'h2s-1',
            title: 'GenAI Hackathon 2024',
            platform: 'hack2skill',
            start: new Date(Date.now() + 86400000 * 5).toISOString(),
            end: new Date(Date.now() + 86400000 * 8).toISOString(),
            url: 'https://hack2skill.com/hackathons',
            status: 'upcoming',
        }
    ]
}

// Aggregator
export async function getHackathons(): Promise<Hackathon[]> {
    try {
        const [he, unstop, devfolio, h2s] = await Promise.all([
            getHackerEarthHackathons(),
            getUnstopHackathons(),
            getDevfolioHackathons(),
            getHack2SkillHackathons()
        ])

        const all = [...he, ...unstop, ...devfolio, ...h2s]

        // Sort by start date (soonest first)
        return all.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    } catch (error) {
        console.error("Failed to fetch hackathons:", error)
        return []
    }
}

export const getCachedHackathons = unstable_cache(
    async () => getHackathons(),
    ['hackathons-list'],
    { revalidate: 3600 }
)
