import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { fetchGeeksForGeeksStats } from '@/lib/platforms/geeksforgeeks'

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
            .eq('platform', 'geeksforgeeks')
            .single()

        if (connError || !connection) {
            return NextResponse.json({ error: "GeeksForGeeks not connected" }, { status: 404 })
        }

        const stats = await fetchGeeksForGeeksStats(connection.username)
        if (!stats) {
            return NextResponse.json({ error: "Failed to fetch GeeksForGeeks data" }, { status: 500 })
        }

        return NextResponse.json(stats)
    } catch (error) {
        console.error("GeeksForGeeks Error:", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
