import { NextResponse } from 'next/server'
import { createClerkSupabaseClient } from '@/lib/clerk-supabase'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const supabase = await createClerkSupabaseClient()

        // Fetch custom user roadmaps and their steps
        const { data: roadmaps, error } = await supabase
            .from('user_roadmaps')
            .select(`
                *,
                steps:roadmap_steps(*)
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (error) throw error

        return NextResponse.json(roadmaps)
    } catch (error: any) {
        console.error('Failed to fetch roadmaps:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const body = await req.json()
        const { action, payload } = body

        const supabase = await createClerkSupabaseClient()

        if (action === 'UPSERT_ROADMAP') {
            const { error } = await supabase
                .from('user_roadmaps')
                .upsert({
                    id: payload.id as string,
                    user_id: userId as string,
                    title: payload.title as string,
                    description: payload.description as string,
                    icon: payload.icon as string,
                    color: payload.color as string,
                    category: payload.category as string
                } as any)
            if (error) throw error
            return NextResponse.json({ success: true })
        }

        if (action === 'UPSERT_STEP') {
            const { error } = await supabase
                .from('roadmap_steps')
                .upsert({
                    id: payload.id as string,
                    roadmap_id: payload.roadmap_id as string,
                    title: payload.title as string,
                    description: payload.description as string,
                    status: payload.status as string
                } as any)

            if (error) throw error
            return NextResponse.json({ success: true })
        }

        if (action === 'DELETE_STEP') {
            const { error } = await supabase
                .from('roadmap_steps')
                .delete()
                .eq('id', payload.id)

            if (error) throw error
            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    } catch (error: any) {
        console.error('Roadmap action failed:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
