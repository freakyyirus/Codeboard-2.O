import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { fetchLeetCodeStats, PlatformData } from '@/lib/platforms/leetcode'
import { fetchGitHubStats } from '@/lib/platforms/github'
import { fetchHackerRankStats } from '@/lib/platforms/hackerrank'
import { fetchAtCoderStats } from '@/lib/platforms/atcoder'
import { fetchCodeChefStats } from '@/lib/platforms/codechef'
import { fetchGeeksForGeeksStats } from '@/lib/platforms/geeksforgeeks'
import { getCodeforcesUserInfo } from '@/lib/codeforces'
import { Database } from '@/lib/database.types'

type ConnectionRow = {
    platform: string
    username: string
}

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabaseAny = supabase as any

export async function POST(_request: NextRequest) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        console.log(`Starting manual platform sync for user: ${userId}`)

        const { data: connections, error: connError } = await supabase
            .from('platform_connections')
            .select('platform, username')
            .eq('user_id', userId)

        if (connError || !connections) {
            console.error("Error fetching connections:", connError)
            return NextResponse.json({ error: "Failed to fetch connected platforms" }, { status: 500 })
        }

        const typedConnections = connections as unknown as ConnectionRow[]

        if (typedConnections.length === 0) {
            return NextResponse.json({ success: true, message: "No platforms connected to sync." })
        }

        let successCount = 0
        let failCount = 0

        await Promise.allSettled(typedConnections.map(async (conn) => {
            let stats: PlatformData | null = null

            try {
                if (conn.platform === 'leetcode') {
                    stats = await fetchLeetCodeStats(conn.username)
                } else if (conn.platform === 'github') {
                    stats = await fetchGitHubStats(conn.username)
                } else if (conn.platform === 'codeforces') {
                    const cfData = await getCodeforcesUserInfo(conn.username)
                    if (cfData) {
                        stats = {
                            platform: 'codeforces',
                            username: conn.username,
                            easy_solved: 0,
                            medium_solved: 0,
                            hard_solved: 0,
                            total_solved: 0,
                            rating: cfData.rating,
                            global_rank: cfData.rank
                        }
                    }
                } else if (conn.platform === 'hackerrank') {
                    stats = await fetchHackerRankStats(conn.username)
                } else if (conn.platform === 'atcoder') {
                    stats = await fetchAtCoderStats(conn.username)
                } else if (conn.platform === 'codechef') {
                    stats = await fetchCodeChefStats(conn.username)
                } else if (conn.platform === 'geeksforgeeks') {
                    stats = await fetchGeeksForGeeksStats(conn.username)
                }

                if (stats) {
                    const { error: upsertError } = await supabaseAny
                        .from('platform_stats')
                        .upsert({
                            user_id: userId,
                            platform: conn.platform,
                            easy_solved: stats.easy_solved || 0,
                            medium_solved: stats.medium_solved || 0,
                            hard_solved: stats.hard_solved || 0,
                            total_solved: stats.total_solved || 0,
                            rating: stats.rating || 0,
                            global_rank: stats.global_rank || '',
                            last_synced: new Date().toISOString()
                        }, {
                            onConflict: 'user_id, platform'
                        })

                    if (upsertError) {
                        console.error(`Failed to upsert manual stats for ${conn.platform}:`, upsertError)
                        failCount++
                    } else {
                        successCount++
                    }
                } else {
                    failCount++
                }
            } catch (pErr) {
                console.error(`Error syncing ${conn.platform}:`, pErr)
                failCount++
            }
        }))

        return NextResponse.json({
            success: true,
            message: `Successfully synced ${successCount} platforms. ${failCount} failed.`,
            syncedCount: successCount,
            failedCount: failCount
        })

    } catch (error) {
        console.error("Manual Sync Error:", error)
        const message = error instanceof Error ? error.message : "Unknown error"
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
