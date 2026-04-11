import { z } from "zod"

/**
 * Server-side environment variables — validated at import time.
 * If any required variable is missing, the app crashes immediately
 * with a clear error message instead of failing later with a cryptic one.
 */

const serverSchema = z.object({
    // Auth (Clerk)
    CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required"),
    CLERK_WEBHOOK_SECRET: z.string().min(1, "CLERK_WEBHOOK_SECRET is required"),

    // Database (Supabase)
    NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),

    // AI
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1, "GOOGLE_GENERATIVE_AI_API_KEY is required"),

    // Code Execution
    JUDGE0_API_KEY: z.string().optional(),
    JUDGE0_API_HOST: z.string().optional(),

    // Cache (Upstash)
    UPSTASH_REDIS_REST_URL: z.string().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

    // Cron
    CRON_SECRET: z.string().min(1, "CRON_SECRET is required for cron job security"),

    // Email
    RESEND_API_KEY: z.string().optional(),

    // Contests
    CLIST_API_USERNAME: z.string().optional(),
    CLIST_API_KEY: z.string().optional(),

    // Monitoring
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),

    // App
    NEXT_PUBLIC_APP_URL: z.string().optional(),

    // Stripe
    STRIPE_SECRET_KEY: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    STRIPE_PRO_PRICE_ID: z.string().optional(),
    STRIPE_PRO_YEARLY_PRICE_ID: z.string().optional(),
    STRIPE_TEAM_PRICE_ID: z.string().optional(),
    STRIPE_TEAM_YEARLY_PRICE_ID: z.string().optional(),

    // PostHog
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
    POSTHOG_API_KEY: z.string().optional(),
})

const clientSchema = z.object({
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required"),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
})

function validateEnv() {
    // Only validate on server side
    if (typeof window !== "undefined") return

    const result = serverSchema.safeParse(process.env)

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        const formatted = Object.entries(errors)
            .map(([key, msgs]) => `  ❌ ${key}: ${msgs?.join(", ")}`)
            .join("\n")

        console.error(
            "\n╔══════════════════════════════════════════════╗\n" +
            "║  ⚠️  MISSING ENVIRONMENT VARIABLES            ║\n" +
            "╚══════════════════════════════════════════════╝\n\n" +
            formatted + "\n\n" +
            "Copy .env.example to .env.local and fill in the required values.\n"
        )

        throw new Error("Missing required environment variables. See console output above.")
    }
}

// Run validation on import
validateEnv()

export { serverSchema, clientSchema }
