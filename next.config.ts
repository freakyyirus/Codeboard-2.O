import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.clerk.accounts.dev https://*.clerk.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: https://img.clerk.com https://*.clerk.accounts.dev https://api.dicebear.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://*.vercel.app https://*.clerk.accounts.dev https://*.clerk.com https://*.sentry.io https://*.ingest.sentry.io; worker-src 'self' blob:; frame-src 'self' https://challenges.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.com;",
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Suppresses all Sentry build logs
  silent: true,

  // Upload source maps for better stack traces
  widenClientFileUpload: true,

  // Tree-shake Sentry debug code in production
  disableLogger: true,

  // Only upload source maps if auth token is set
  authToken: process.env.SENTRY_AUTH_TOKEN,

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
});

