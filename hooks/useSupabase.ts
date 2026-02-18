"use client"

import { useSession } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../lib/database.types'
import { useMemo } from 'react'

/**
 * Hook to get a Supabase client that is authenticated with the Clerk session.
 * This should be used for all client-side Supabase operations.
 */
export function useSupabase() {
    const { session } = useSession()

    return useMemo(() => {
        return createClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                global: {
                    fetch: async (url, options = {}) => {
                        const clerkToken = await session?.getToken({ template: 'supabase' })

                        const headers = new Headers(options?.headers)
                        if (clerkToken) {
                            headers.set('Authorization', `Bearer ${clerkToken}`)
                        }

                        return fetch(url, {
                            ...options,
                            headers,
                        })
                    },
                },
            }
        )
    }, [session])
}
