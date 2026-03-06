import * as Sentry from "@sentry/nextjs"

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Performance Monitoring
    tracesSampleRate: 0.1, // 10% of transactions in production

    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 0.1,

    // Replay errors only
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0,

    // Only enable if DSN is set
    enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Filter out noise
    ignoreErrors: [
        // Browser extensions
        "top.GLOBALS",
        "ResizeObserver loop",
        // Network errors users cause
        "Failed to fetch",
        "Load failed",
        "NetworkError",
    ],
})
