import crypto from "crypto";
import { unstable_cache } from "next/cache";

const API_BASENAME = "https://codeforces.com/api/";
const API_KEY = process.env.CODEFORCES_API_KEY;
const API_SECRET = process.env.CODEFORCES_API_SECRET;

export interface CodeforcesStats {
    username: string
    rating: number
    rank: string
    maxRating: number
    maxRank: string
    lastOnlineTimeSeconds: number
    registrationTimeSeconds: number
    friendOfCount: number
    titlePhoto: string
}

/**
 * Generates the API signature required for authorized Codeforces API calls.
 * Reference: https://codeforces.com/apiHelp
 */
function generateCodeforcesApiHash(methodName: string, params: Record<string, string>) {
    const rand = crypto.randomBytes(3).toString("hex").substring(0, 6);
    const time = Math.floor(Date.now() / 1000).toString();

    const allParams: Record<string, string> = {
        ...params,
        apiKey: API_KEY!,
        time: time,
    };

    const sortedKeys = Object.keys(allParams).sort();
    const paramStrings = sortedKeys.map(key => key + "=" + allParams[key]);
    const queryString = paramStrings.join("&");

    const stringToHash = rand + "/" + methodName + "?" + queryString + "#" + API_SECRET;
    const hash = crypto.createHash("sha512").update(stringToHash).digest("hex");

    const apiSig = rand + hash;
    return API_BASENAME + methodName + "?" + queryString + "&apiSig=" + apiSig;
}

/**
 * Executes an API call to Codeforces.
 * Falls back to unauthenticated public API if keys are missing.
 */
async function fetchCodeforcesApi(methodName: string, params: Record<string, string>) {
    let url = "";

    if (API_KEY && API_SECRET) {
        url = generateCodeforcesApiHash(methodName, params);
    } else {
        const queryString = new URLSearchParams(params).toString();
        url = API_BASENAME + methodName + "?" + queryString;
    }

    try {
        const response = await fetch(url, { next: { revalidate: 3600 } });
        const data = await response.json();

        if (data.status !== "OK") {
            console.error("Codeforces API error (" + methodName + "):", data.comment);
            return null;
        }

        return data.result;
    } catch (error) {
        console.error("Codeforces Error fetching " + methodName + ":", error);
        return null;
    }
}

// Specific API Wrappers

export async function getCodeforcesUserInfo(username: string): Promise<CodeforcesStats | null> {
    const users = await fetchCodeforcesApi("user.info", { handles: username });
    
    if (!users || users.length === 0) return null;
    
    const user = users[0];
    return {
        username: user.handle,
        rating: user.rating || 0,
        rank: user.rank || "unrated",
        maxRating: user.maxRating || 0,
        maxRank: user.maxRank || "unrated",
        lastOnlineTimeSeconds: user.lastOnlineTimeSeconds,
        registrationTimeSeconds: user.registrationTimeSeconds,
        friendOfCount: user.friendOfCount,
        titlePhoto: user.titlePhoto
    };
}

export async function getCodeforcesRatingHistory(username: string) {
    const history = await fetchCodeforcesApi("user.rating", { handle: username });
    return history || [];
}

export async function getCodeforcesSubmissions(username: string, count: number = 20) {
    const submissions = await fetchCodeforcesApi("user.status", { 
        handle: username, 
        from: "1", 
        count: count.toString() 
    });
    return submissions || [];
}

export const getCachedCodeforcesStats = unstable_cache(
    async (username: string) => getCodeforcesUserInfo(username),
    ['codeforces-stats'],
    { revalidate: 3600 }
)
