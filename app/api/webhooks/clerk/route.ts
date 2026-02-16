import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    const eventType = evt.type

    // Initialize Supabase Admin Client (Service Role) to bypass RLS for user management
    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    ) as any

    if (eventType === 'user.created') {
        const { id, email_addresses, image_url, first_name, last_name, username } = evt.data

        // Get primary email
        const email = email_addresses.find(email => email.id === evt.data.primary_email_address_id)?.email_address ?? null
        const fullName = `${first_name || ''} ${last_name || ''}`.trim() || username || null

        await supabase.from('users').insert({
            id: id,
            email: email,
            username: username || email?.split('@')[0] || null, // Fallback username
            full_name: fullName,
            avatar_url: image_url || null,
            // Default values
            skill_level: 'beginner',
            daily_goal: 1,
            timezone: 'UTC',
            streak_count: 0,
            longest_streak: 0
        } as any)
    }

    if (eventType === 'user.updated') {
        const { id, email_addresses, image_url, first_name, last_name, username } = evt.data

        const email = email_addresses.find(email => email.id === evt.data.primary_email_address_id)?.email_address
        const fullName = `${first_name || ''} ${last_name || ''}`.trim() || username

        await supabase.from('users').update({
            email: email,
            username: username || email?.split('@')[0] || null, // Fallback
            full_name: fullName,
            avatar_url: image_url || null,
        } as any).eq('id', id)
    }

    if (eventType === 'user.deleted') {
        const { id } = evt.data

        if (id) {
            await supabase.from('users').delete().eq('id', id)
        }
    }

    return new Response('', { status: 200 })
}
