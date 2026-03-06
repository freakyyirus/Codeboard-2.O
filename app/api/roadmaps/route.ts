import { NextResponse } from 'next/server'
import { createClerkSupabaseClient } from '@/lib/clerk-supabase'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const supabase = await createClerkSupabaseClient()

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
    } catch (error) {
        console.error('Failed to fetch roadmaps:', error)
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ error: message }, { status: 500 })
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
                    id: payload.id,
                    user_id: userId,
                    title: payload.title,
                    description: payload.description,
                    icon: payload.icon,
                    color: payload.color,
                    category: payload.category
                } as never)
            if (error) throw error
            return NextResponse.json({ success: true })
        }

        if (action === 'UPSERT_STEP') {
            const { error } = await supabase
                .from('roadmap_steps')
                .upsert({
                    id: payload.id,
                    roadmap_id: payload.roadmap_id,
                    title: payload.title,
                    description: payload.description,
                    status: payload.status
                } as never)

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
    } catch (error) {
        console.error('Roadmap action failed:', error)
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
