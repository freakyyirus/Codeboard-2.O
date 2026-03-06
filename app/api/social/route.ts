import { NextResponse } from 'next/server'
import { createClerkSupabaseClient } from '@/lib/clerk-supabase'
import { auth, clerkClient } from '@clerk/nextjs/server'

interface SocialPost {
    id: string
    user_id: string
    type: string
    content: string
    metadata: Record<string, unknown>
    likes_count: number
    comments_count: number
    created_at: string
}

interface EnrichedPost {
    id: string
    user: string
    initials: string
    type: string
    content: string
    problem?: string
    difficulty?: string
    streakCount?: number
    badge?: string
    likes: number
    comments: number
    time: string
}

export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const supabase = await createClerkSupabaseClient()

        const { data: posts, error } = await supabase
            .from('social_posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20)

        if (error) throw error

        const typedPosts = posts as SocialPost[] | null
        let enrichedPosts: EnrichedPost[] = []

        if (typedPosts && typedPosts.length > 0) {
            try {
                const uniqueUserIds = [...new Set(typedPosts.map((p) => p.user_id))];

                const client = await clerkClient()
                const userList = await client.users.getUserList({
                    userId: uniqueUserIds as string[]
                })

                const userMap = new Map<string, { name: string; initials: string }>();
                userList.data.forEach(u => {
                    const fullName = `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username || 'Unknown User'
                    const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                    userMap.set(u.id, { name: fullName, initials })
                });

                enrichedPosts = typedPosts.map((post) => {
                    const userInfo = userMap.get(post.user_id) || { name: 'Anonymous Coder', initials: 'AC' };
                    const md = post.metadata as Record<string, unknown> || {};
                    return {
                        id: post.id,
                        user: userInfo.name,
                        initials: userInfo.initials,
                        type: post.type,
                        content: post.content,
                        problem: md.problem as string | undefined,
                        difficulty: md.difficulty as string | undefined,
                        streakCount: md.streakCount as number | undefined,
                        badge: md.badge as string | undefined,
                        likes: post.likes_count,
                        comments: post.comments_count,
                        time: new Date(post.created_at).toLocaleDateString()
                    }
                })

            } catch (clerkErr) {
                console.error("Failed to enrich posts with Clerk user data:", clerkErr)
                enrichedPosts = typedPosts.map((post) => {
                    const md = post.metadata as Record<string, unknown> || {};
                    return {
                        id: post.id,
                        user: 'Unknown User',
                        initials: '?',
                        type: post.type,
                        content: post.content,
                        problem: md.problem as string | undefined,
                        difficulty: md.difficulty as string | undefined,
                        streakCount: md.streakCount as number | undefined,
                        badge: md.badge as string | undefined,
                        likes: post.likes_count,
                        comments: post.comments_count,
                        time: new Date(post.created_at).toLocaleDateString()
                    }
                })
            }
        }

        return NextResponse.json(enrichedPosts)
    } catch (error) {
        console.error('Failed to fetch social posts:', error)
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
