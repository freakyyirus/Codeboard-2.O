import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { fetchAtCoderStats } from '@/lib/platforms/atcoder'

export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

        const { data: connection, error: connError } = await supabaseAdmin
            .from('platform_connections')
            .select('username')
            .eq('user_id', userId)
            .eq('platform', 'atcoder')
            .single()

        if (connError || !connection) {
            return NextResponse.json({ error: "AtCoder not connected" }, { status: 404 })
        }

        const stats = await fetchAtCoderStats(connection.username)
        if (!stats) {
            return NextResponse.json({ error: "Failed to fetch AtCoder data" }, { status: 500 })
        }

        return NextResponse.json(stats)
    } catch (error) {
        console.error("AtCoder Error:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
