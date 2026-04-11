import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
    getCodeforcesUserInfo,
    getCodeforcesRatingHistory,
    getCodeforcesSubmissions
} from '@/lib/codeforces';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');

        if (!username) {
            // Get user's connected Codeforces username
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
            );
            
            const { data: conn } = await supabase
                .from('platform_connections')
                .select('username')
                .eq('user_id', userId)
                .eq('platform', 'codeforces')
                .single();

            if (!conn?.username) {
                return NextResponse.json(
                    { error: 'No Codeforces account connected. Add username in Settings.' },
                    { status: 400 }
                );
            }

            const userInfo = await getCodeforcesUserInfo(conn.username);
            return NextResponse.json(userInfo);
        }

        const userInfo = await getCodeforcesUserInfo(username);
        return NextResponse.json(userInfo);
    } catch (error) {
        console.error('Codeforces API error:', error);
        return NextResponse.json({ error: 'Failed to fetch Codeforces data' }, { status: 500 });
    }
}