import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Public routes that DON'T need auth checking
const PUBLIC_ROUTES = ['/', '/login', '/auth/callback']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Skip auth check entirely for public routes — no Supabase call needed
    const isPublicRoute = PUBLIC_ROUTES.some(route =>
        pathname === route || pathname.startsWith('/auth/')
    )

    if (isPublicRoute) {
        return NextResponse.next()
    }

    // Only check auth for protected routes (e.g., /dashboard/*)
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    try {
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value }) => {
                            request.cookies.set(name, value)
                        })
                        response = NextResponse.next({
                            request,
                        })
                        cookiesToSet.forEach(({ name, value, options }) => {
                            response.cookies.set(name, value, options)
                        })
                    },
                },
            }
        )

        const { data: { user } } = await supabase.auth.getUser()

        // Not authenticated → redirect to login
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    } catch (e) {
        console.warn('Middleware auth check failed:', e)
        // Auth failed → redirect to login for safety
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
