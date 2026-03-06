import { NextResponse } from 'next/server'
import { createClerkSupabaseClient } from '@/lib/clerk-supabase'
import { auth, clerkClient } from '@clerk/nextjs/server'

export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const supabase = await createClerkSupabaseClient()

        // Fetch posts from database, ordered by latest
        const { data: posts, error } = await supabase
            .from('social_posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20)

        if (error) throw error

        let enrichedPosts: any[] = [];

        // Try to fetch user details from Clerk for each post to show names/initials
        if (posts && posts.length > 0) {
            try {
                // Get unique user IDs to minimize Clerk API calls
                const uniqueUserIds = [...new Set(posts.map((p: any) => p.user_id))];

                // Construct query parameters matching user IDs
                // e.g., ?userId=user_1&userId=user_2
                const queryParams = uniqueUserIds.map(id => `userId=${id}`).join('&');

                // Directly call Clerk backend API since clerkClient() might not support bulk fetching by ID list easily in all versions
                // Using clerkClient.users.getUserList is preferred if available
                const client = await clerkClient()
                const userList = await client.users.getUserList({
                    userId: uniqueUserIds as string[]
                })

                const userMap = new Map();
                userList.data.forEach(u => {
                    const fullName = `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username || 'Unknown User'
                    const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                    userMap.set(u.id, { name: fullName, initials })
                });

                enrichedPosts = posts.map((post: any) => {
                    const userInfo = userMap.get(post.user_id) || { name: 'Anonymous Coder', initials: 'AC' };
                    // Map the DB schema back to the UI expected props
                    const md = post.metadata as any || {};
                    return {
                        id: post.id,
                        user: userInfo.name,
                        initials: userInfo.initials,
                        type: post.type,
                        content: post.content,
                        problem: md.problem,
                        difficulty: md.difficulty,
                        streakCount: md.streakCount,
                        badge: md.badge,
                        likes: post.likes_count,
                        comments: post.comments_count,
                        time: new Date(post.created_at).toLocaleDateString() // Or time ago logic
                    }
                })

            } catch (clerkErr) {
                console.error("Failed to enrich posts with Clerk user data:", clerkErr)
                // Fallback if Clerk fails
                enrichedPosts = posts.map((post: any) => {
                    const md = post.metadata as any || {};
                    return {
                        id: post.id,
                        user: 'Unknown User',
                        initials: '?',
                        type: post.type,
                        content: post.content,
                        ...md,
                        likes: post.likes_count,
                        comments: post.comments_count,
                        time: new Date(post.created_at).toLocaleDateString()
                    }
                })
            }
        }

        return NextResponse.json(enrichedPosts)
    } catch (error: any) {
        console.error('Failed to fetch social posts:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
