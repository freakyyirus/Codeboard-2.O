import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
    const { userId } = await auth()
    
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const notebookId = searchParams.get('id')

    try {
        if (notebookId) {
            const { data, error } = await supabase
                .from('user_notebooks')
                .select('*')
                .eq('id', notebookId)
                .eq('user_id', userId)
                .single()

            if (error || !data) {
                return NextResponse.json({ error: 'Notebook not found' }, { status: 404 })
            }

            return NextResponse.json(data)
        }

        const { data, error } = await supabase
            .from('user_notebooks')
            .select('*')
            .eq('user_id', userId)
            .order('updated_at', { ascending: false })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data || [])
    } catch (error) {
        console.error('Notebooks GET error:', error)
        return NextResponse.json({ error: 'Failed to fetch notebooks' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const { userId } = await auth()
    
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, content = {}, tags = [], is_public = false } = body

    if (!title) {
        return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    try {
        const { data, error } = await supabase
            .from('user_notebooks')
            .insert({
                user_id: userId,
                title,
                content: content as any,
                tags: tags as any,
                is_public,
            })
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Notebook POST error:', error)
        return NextResponse.json({ error: 'Failed to create notebook' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    const { userId } = await auth()
    
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { id, title, content, tags, is_public } = body

    if (!id) {
        return NextResponse.json({ error: 'Notebook ID is required' }, { status: 400 })
    }

    try {
        const updateData: Record<string, unknown> = {
            updated_at: new Date().toISOString(),
        }

        if (title) updateData.title = title
        if (content) updateData.content = content
        if (tags) updateData.tags = tags
        if (is_public !== undefined) updateData.is_public = is_public

        const { data, error } = await supabase
            .from('user_notebooks')
            .update(updateData as any)
            .eq('id', id)
            .eq('user_id', userId)
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Notebook PATCH error:', error)
        return NextResponse.json({ error: 'Failed to update notebook' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    const { userId } = await auth()
    
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const notebookId = searchParams.get('id')

    if (!notebookId) {
        return NextResponse.json({ error: 'Notebook ID is required' }, { status: 400 })
    }

    try {
        const { error } = await supabase
            .from('user_notebooks')
            .delete()
            .eq('id', notebookId)
            .eq('user_id', userId)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Notebook DELETE error:', error)
        return NextResponse.json({ error: 'Failed to delete notebook' }, { status: 500 })
    }
}