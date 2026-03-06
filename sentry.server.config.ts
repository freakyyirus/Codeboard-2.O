import * as Sentry from "@sentry/nextjs"

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Performance Monitoring — lower sampling for server
    tracesSampleRate: 0.1,

    // Only enable if DSN is set
    enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
})
