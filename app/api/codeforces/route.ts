import { NextResponse } from 'next/server';
import {
    getCodeforcesUserInfo,
    getCodeforcesRatingHistory,
    getCodeforcesSubmissions
} from '@/lib/codeforces';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        // Default to the user's configured env var, or accept an explicit handle
        const username = searchParams.get('username') || process.env.CODEFORCES_USERNAME;

        if (!username) {
            return NextResponse.json(
                { error: 'Codeforces username is required or not configured in .env' },
                { status: 400 }
            );
        }

        // Fetch all data in parallel
        const [userInfo, ratingHistory, recentSubmissions] = await Promise.all([
            getCodeforcesUserInfo(username),
            getCodeforcesRatingHistory(username),
            getCodeforcesSubmissions(username, 10) // fetch last 10 submissions
        ]);

        if (!userInfo) {
            return NextResponse.json(
                { error: `Could not fetch Codeforces profile for ${username}` },
                { status: 404 }
            );
        }

        return NextResponse.json({
            profile: userInfo,
            history: ratingHistory,
            submissions: recentSubmissions
        });

    } catch (error) {
        console.error('Error in /api/codeforces:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
