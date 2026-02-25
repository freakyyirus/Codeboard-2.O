import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { fetchLeetCodeStats, PlatformData } from '@/lib/platforms/leetcode'
import { fetchGitHubStats } from '@/lib/platforms/github'

// Initialize a Supabase admin client to bypass RLS for background fetching
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: Request) {
    // Basic security to ensure this endpoint isn't hit arbitrarily by public users
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        console.log("Starting Platform Sync Cron Job...")

        const { data: connections, error: connError } = await supabase
            .from('platform_connections')
            .select('user_id, platform, platform_username')

        if (connError || !connections) {
            console.error("Error fetching connections:", connError)
            return NextResponse.json({ error: "Failed to fetch connections" }, { status: 500 })
        }

        let successCount = 0
        let failCount = 0

        // 2. Loop through each connection and fetch live data
        for (const conn of connections) {
            let stats: PlatformData | null = null

            if (conn.platform === 'leetcode') {
                stats = await fetchLeetCodeStats(conn.platform_username)
            } else if (conn.platform === 'github') {
                stats = await fetchGitHubStats(conn.platform_username)
            }
            // Add other platforms (Codeforces, HackerRank, etc.) here later

            // 3. Upsert the fetched data into the new platform_stats table
            if (stats) {
                const { error: upsertError } = await supabase
                    .from('platform_stats')
                    .upsert({
                        user_id: conn.user_id,
                        platform: conn.platform,
                        easy_solved: stats.easy_solved,
                        medium_solved: stats.medium_solved,
                        hard_solved: stats.hard_solved,
                        total_solved: stats.total_solved,
                        rating: stats.rating,
                        global_rank: stats.global_rank,
                        last_synced: new Date().toISOString()
                    }, {
                        onConflict: 'user_id, platform'
                    })

                if (upsertError) {
                    console.error(`Failed to upsert stats for ${conn.user_id} on ${conn.platform}:`, upsertError)
                    failCount++
                } else {
                    successCount++
                }
            } else {
                failCount++
            }
        }

        console.log(`Cron job finished. Success: ${successCount}, Failed/Skipped: ${failCount}`)
        return NextResponse.json({
            success: true,
            message: `Synced ${successCount} profiles. Failed ${failCount}.`
        })

    } catch (error: any) {
        console.error("Cron Job Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
