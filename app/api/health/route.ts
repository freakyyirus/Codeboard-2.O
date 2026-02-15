import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    // Test database connection by checking if we can query
    const { error } = await supabase.from('users').select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('Health check error:', error)
      return NextResponse.json({ 
        status: 'unhealthy', 
        timestamp: new Date().toISOString(),
        error: 'Database connection failed'
      }, { status: 503 })
    }
    
    return NextResponse.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        supabase: 'ok'
      }
    })
  } catch (error) {
    console.error('Health check exception:', error)
    return NextResponse.json({ 
      status: 'unhealthy', 
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 })
  }
}
