# CodeBoard 2.0 — System Architecture

> **Version:** 2.0 · **Last Updated:** February 2026 · **Status:** Production

---

## 1. High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Landing  │  │Dashboard │  │  Studio  │  │ Settings │  │Analytics│ │
│  │  Page    │  │  (SPA)   │  │  (IDE)   │  │  Panel   │  │  Views  │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
│         React 19 · Next.js 16 · Tailwind CSS 4 · Framer Motion        │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ HTTPS
                               ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                      NEXT.JS APP ROUTER (Edge + Node)                   │
│  ┌────────────┐  ┌────────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │ Middleware  │  │ Server Actions │  │  API Routes  │  │ Cron Jobs  │  │
│  │  (Clerk)   │  │  (lib/actions) │  │  (app/api/)  │  │ (Vercel)   │  │
│  └────────────┘  └────────────────┘  └──────────────┘  └────────────┘  │
└───────┬──────────────┬───────────────────┬──────────────────┬───────────┘
        │              │                   │                  │
        ▼              ▼                   ▼                  ▼
┌──────────┐  ┌──────────────┐  ┌──────────────────┐  ┌──────────────┐
│  Clerk   │  │   Supabase   │  │  External APIs   │  │ Upstash Redis│
│  (Auth)  │  │ (PostgreSQL) │  │ (LC/CF/GH/etc.)  │  │  (Cache/RL)  │
└──────────┘  └──────────────┘  └──────────────────┘  └──────────────┘
```

**CodeBoard** is a competitive-programming developer dashboard built on the **Next.js 16 App Router**, deployed on **Vercel**. It aggregates stats from LeetCode, Codeforces, CodeChef, GitHub, and WakaTime into a single Vercel-inspired dark UI, with an integrated AI-powered code studio.

---

## 2. Tech Stack Summary

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | SSR, RSC, API Routes, Middleware |
| **Language** | TypeScript 5 | Type safety across the stack |
| **UI** | React 19, Tailwind CSS 4, Framer Motion | Component rendering, styling, animations |
| **Fonts** | Geist Sans + Geist Mono | Vercel-inspired typography |
| **Auth** | Clerk | User management, JWT → Supabase RLS |
| **Database** | Supabase (PostgreSQL) | Users, solves, problems, platform connections |
| **Cache / Rate Limit** | Upstash Redis | API response caching, sliding-window rate limiting |
| **AI** | Google Generative AI, OpenAI (via Vercel AI SDK) | AI Chat in Studio |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) | In-browser IDE |
| **Charts** | Recharts | Rating graphs, activity charts, analytics |
| **Email** | Resend + React Email | Transactional notifications |
| **Webhooks** | Svix (Clerk webhooks) | User lifecycle events |
| **Validation** | Zod 4 | Schema validation for forms/inputs |
| **Deployment** | Vercel | Edge functions, cron, CDN |
| **Analytics (planned)** | PostHog (via rewrites) | Product analytics |

---

## 3. Directory Structure

```
codeboard/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (Clerk, Theme, Fonts)
│   ├── page.tsx                  # Landing page (public)
│   ├── global-error.tsx          # Global error boundary
│   ├── not-found.tsx             # 404 page
│   ├── globals.css               # CSS variables + Tailwind
│   ├── sign-in/                  # Clerk sign-in page
│   ├── sign-up/                  # Clerk sign-up page
│   ├── settings/                 # User settings (public route)
│   ├── dashboard/                # Protected dashboard area
│   │   ├── layout.tsx            # Dashboard shell (sidebar + header)
│   │   ├── page.tsx              # Overview (stats, contributions, activity)
│   │   ├── analytics/            # Deep analytics & insights
│   │   ├── calendar/             # Coding calendar
│   │   ├── community/            # Social / community feed
│   │   ├── contests/             # Upcoming contests (Clist API)
│   │   ├── dev/                  # Developer tools
│   │   ├── dsa/                  # DSA sheet tracker
│   │   ├── feedback/             # User feedback
│   │   ├── hackathons/           # Hackathon aggregator
│   │   ├── leaderboard/          # Community leaderboard
│   │   ├── problem/              # Single problem view
│   │   ├── problems/             # Problem list browser
│   │   ├── roadmap/              # Learning roadmaps
│   │   ├── settings/             # In-dashboard settings
│   │   ├── sheets/               # DSA sheets (Striver, NeetCode, etc.)
│   │   ├── social/               # Social integrations
│   │   └── studio/               # AI-Powered code IDE
│   └── api/                      # API Route Handlers
│       ├── analytics/route.ts    # Analytics aggregation endpoint
│       ├── chat/route.ts         # AI chat (Vercel AI SDK)
│       ├── codeforces/route.ts   # CF stats proxy
│       ├── execute/route.ts      # Code execution endpoint
│       ├── health/               # Health check
│       ├── problems/route.ts     # Problems CRUD
│       ├── cron/                 # Vercel Cron Jobs
│       │   ├── reminders/        # Email reminder cron
│       │   └── sync-platforms/   # Platform data sync cron
│       └── webhooks/clerk/       # Clerk webhook handler
│
├── components/                   # Shared React components
│   ├── ui/                       # Design system primitives
│   │   ├── button.tsx            # Button variants
│   │   ├── skeleton.tsx          # Loading skeletons
│   │   ├── tooltip.tsx           # Radix tooltips
│   │   └── PremiumEffects.tsx    # Glow / glassmorphism effects
│   ├── dashboard/                # Dashboard-specific widgets
│   │   ├── ProfileCard.tsx       # User profile card
│   │   ├── MetricCard.tsx        # Stat metric tiles
│   │   ├── ContributionGraph.tsx # GitHub-style heatmap
│   │   ├── RatingChart.tsx       # Rating history line chart
│   │   ├── ActivityChart.tsx     # Activity bar chart
│   │   ├── ContestStats.tsx      # Contest performance
│   │   ├── RecentProblems.tsx    # Latest solved problems
│   │   ├── StreakWidget.tsx      # Daily streak counter
│   │   ├── TopicAnalysis.tsx     # Topic-wise breakdown
│   │   ├── ProblemDistribution.tsx # Easy/Med/Hard pie chart
│   │   ├── StatsGrid.tsx         # Stats overview grid
│   │   ├── DashboardSidePanels.tsx # Sidebar panels
│   │   └── ...28 components      # Full widget library
│   ├── analytics/                # Advanced analytics charts
│   │   ├── GrowthTrendChart.tsx  # Growth over time
│   │   ├── TopicRadarChart.tsx   # Radar chart for topics
│   │   ├── WeaknessSpotlight.tsx # Weak area detection
│   │   ├── MultiPlatformHeatmap.tsx
│   │   └── ProductivityInsights.tsx
│   ├── studio/                   # Code studio components
│   │   ├── StudioClient.tsx      # Studio orchestrator
│   │   ├── CodeEditor.tsx        # Monaco editor wrapper
│   │   └── AIChat.tsx            # AI assistant panel
│   ├── leaderboard/              # Leaderboard components
│   ├── problems/                 # Problem list & filters
│   ├── emails/                   # React Email templates
│   ├── ThemeProvider.tsx         # Dark/light theme context
│   ├── ThemeToggle.tsx           # Theme switch button
│   ├── LandingHero.tsx           # Landing page hero
│   └── DevHeader.tsx             # Dev-mode header
│
├── lib/                          # Core business logic
│   ├── actions.ts                # Server Actions (getDashboardData)
│   ├── settings-actions.ts       # Settings CRUD server actions
│   ├── supabase.ts               # Supabase SSR server client
│   ├── supabase-browser.ts       # Supabase browser client
│   ├── clerk-supabase.ts         # Clerk → Supabase JWT bridge
│   ├── database.types.ts         # Supabase generated types
│   ├── redis.ts                  # Upstash Redis singleton
│   ├── ratelimit.ts              # Rate limiter (10 req / 10s)
│   ├── leetcode.ts               # LeetCode GraphQL client
│   ├── codeforces.ts             # Codeforces API (HMAC auth)
│   ├── github.ts                 # GitHub REST API client
│   ├── wakatime.ts               # WakaTime stats API
│   ├── clist.ts                  # Clist.by contest aggregator
│   ├── hackathons.ts             # Hackathon aggregator
│   ├── socials.ts                # Social stats (Dev.to, Twitter, LinkedIn)
│   ├── vercel.ts                 # Vercel deployments API
│   ├── email.ts                  # Resend email sender
│   ├── problems.ts               # Built-in problem definitions
│   ├── roadmaps.ts               # Predefined learning roadmaps
│   ├── validations.ts            # Zod schemas
│   ├── utils.ts                  # Utility functions
│   ├── platforms/                # Platform-specific adapters
│   │   ├── leetcode.ts           # LC data normalization
│   │   └── github.ts             # GH data normalization
│   └── services/                 # Aggregation services
│       ├── contests.ts           # Contest aggregation logic
│       ├── hackathons.ts         # Hackathon service
│       └── socials.ts            # Social feed service
│
├── hooks/                        # React hooks
│   └── useSupabase.ts            # Client-side Supabase hook
│
├── data/                         # Static data
│   └── leetcode-questions.json   # 3000+ LeetCode problems
│
├── supabase/                     # Database schema
│   ├── setup_codeboard_engine.sql
│   ├── 02_platform_tables.sql
│   ├── seed.sql
│   └── migrations/
│
├── public/                       # Static assets
├── scripts/                      # Build/dev scripts
├── middleware.ts                  # Clerk auth middleware
├── next.config.ts                # Next.js config (security headers, CSP)
├── vercel.json                   # Vercel deployment config
└── tsconfig.json                 # TypeScript configuration
```

---

## 4. Architecture Layers

### 4.1 Presentation Layer

```
┌──────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │              Next.js App Router Pages              │  │
│  │  Landing → Sign In → Dashboard → Studio → Settings │  │
│  └───────────────────┬────────────────────────────────┘  │
│                      │                                   │
│  ┌───────────────────▼────────────────────────────────┐  │
│  │              Component Library                     │  │
│  │  ┌────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │  │
│  │  │   UI   │ │Dashboard │ │ Analytics│ │ Studio │ │  │
│  │  │Prims.  │ │ Widgets  │ │  Charts  │ │  IDE   │ │  │
│  │  └────────┘ └──────────┘ └──────────┘ └────────┘ │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Design: Vercel-dark theme · Geist fonts · 4px grid      │
│  State: React useState/useEffect · Server Components     │
│  Motion: Framer Motion (AnimatePresence, layout anims)   │
└──────────────────────────────────────────────────────────┘
```

- **Server Components** render static/data-heavy content on the server (layouts, metadata).
- **Client Components** (`"use client"`) handle interactive widgets (charts, editor, toggles).
- **Theme**: CSS custom properties (`--bg-primary`, `--fg-primary`, etc.) with `ThemeProvider` for dark/light switching.

### 4.2 Routing & Middleware Layer

```
Request → Clerk Middleware → Route Matcher → Handler
               │
               ├─ Public Routes:  /  /sign-in  /sign-up  /api/webhooks
               │     → Pass through (no auth check)
               │
               ├─ API Routes:  /api/*
               │     → Check auth.userId → 401 if missing
               │
               └─ Protected Routes:  /dashboard/*  /settings/*
                     → auth.protect() → Redirect to sign-in
```

The middleware (`middleware.ts`) uses `clerkMiddleware` with `createRouteMatcher` to enforce authentication boundaries. Public routes bypass checks; API routes return 401 JSON; dashboard routes redirect to sign-in.

### 4.3 Data Layer

```
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│                                                              │
│  ┌─────────────────────┐    ┌────────────────────────────┐  │
│  │   Supabase (PgSQL)  │    │     Upstash Redis          │  │
│  │                     │    │                            │  │
│  │  ┌───────────────┐  │    │  ┌──────────────────────┐  │  │
│  │  │    users      │  │    │  │ github:repos:{user}  │  │  │
│  │  │    solves     │  │    │  │ github:events:{user} │  │  │
│  │  │    problems   │  │    │  │ vercel:deployments   │  │  │
│  │  │  test_cases   │  │    │  │ vercel:projects      │  │  │
│  │  │  platform_    │  │    │  │ github:contributions │  │  │
│  │  │  connections  │  │    │  │ @upstash/ratelimit/* │  │  │
│  │  │ platform_stats│  │    │  └──────────────────────┘  │  │
│  │  │  recent_      │  │    │                            │  │
│  │  │ submissions   │  │    │  TTL: 1hr (API data)       │  │
│  │  └───────────────┘  │    │       30min (deployments)  │  │
│  │                     │    └────────────────────────────┘  │
│  │  RLS: Clerk JWT     │                                    │
│  │  Auth: service_role │                                    │
│  └─────────────────────┘                                    │
└─────────────────────────────────────────────────────────────┘
```

#### Database Schema (Supabase PostgreSQL)

| Table | Purpose | Key Columns |
|---|---|---|
| `users` | User profiles | `id` (Clerk ID), `display_name`, `email`, `bio`, `country`, `daily_goal`, `skill_level`, `visibility` |
| `solves` | Problem solve records | `user_id`, `problem_id`, `solved_at` |
| `problems` | Problem catalog | `platform`, `title`, `difficulty`, `tags`, `starter_code` (JSONB), `url` |
| `test_cases` | Problem test cases | `problem_id`, `input`, `expected_output`, `is_hidden` |
| `platform_connections` | Linked platform handles | `user_id`, `platform`, `username`, `last_synced` |
| `platform_stats` | Cached platform stats | `user_id`, `platform`, `easy/med/hard_solved`, `rating`, `global_rank` |
| `recent_submissions` | Activity feed items | `user_id`, `platform`, `problem_title`, `difficulty`, `timestamp` |

**Row Level Security (RLS):** All tables enforce RLS. Users can only `SELECT` their own rows (matched via `auth.uid()::text = user_id`). The `service_role` key has full CRUD access for cron jobs and webhooks.

#### Three Supabase Client Patterns

| Client | File | Use Case |
|---|---|---|
| **SSR Server Client** | `lib/supabase.ts` | Server Components & Server Actions (cookie-based) |
| **Clerk-bridged Client** | `lib/clerk-supabase.ts` | Actions needing Clerk JWT → Supabase RLS |
| **Browser Client** | `lib/supabase-browser.ts` | Client components (hooks) |
| **Admin Client** | `settings-actions.ts` (inline) | Service-role bypass for settings CRUD |

### 4.4 API & Integration Layer

```
┌──────────────────────────────────────────────────────────────────┐
│                    EXTERNAL API INTEGRATIONS                      │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐│
│  │ LeetCode │  │Codeforces│  │  GitHub   │  │    WakaTime      ││
│  │ GraphQL  │  │ REST+HMAC│  │ REST v3  │  │    REST          ││
│  │          │  │          │  │          │  │                  ││
│  │Stats,    │  │User info,│  │Repos,    │  │Coding time,     ││
│  │Submissions│ │Ratings,  │  │Events,   │  │Languages,       ││
│  │Calendar  │  │Submissions│ │Contrib.  │  │Editors           ││
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────────────┘│
│       │              │              │              │              │
│       ▼              ▼              ▼              ▼              │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │                    CACHING LAYER (Redis)                     ││
│  │         unstable_cache() + Redis TTL (1 hour default)       ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐│
│  │ Clist.by │  │  Vercel  │  │  Dev.to  │  │   Resend         ││
│  │ Contests │  │Deploys/  │  │ Articles │  │   (Email)        ││
│  │ Ratings  │  │Projects  │  │          │  │                  ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘│
│                                                                  │
│  ┌──────────┐  ┌──────────┐                                     │
│  │Google AI │  │ OpenAI   │  ← AI SDK (Vercel)                  │
│  │(Gemini)  │  │(GPT)     │    Streaming chat in Studio         │
│  └──────────┘  └──────────┘                                     │
└──────────────────────────────────────────────────────────────────┘
```

#### Platform Integration Details

| Platform | Client File | Auth Method | Data Fetched | Cache TTL |
|---|---|---|---|---|
| **LeetCode** | `lib/leetcode.ts` | Session cookie + CSRF | Stats, submissions, calendar | 1 hr (`unstable_cache`) |
| **Codeforces** | `lib/codeforces.ts` | HMAC-SHA512 API sig | User info, ratings, submissions | 1 hr (`next.revalidate`) |
| **GitHub** | `lib/github.ts` | Bearer token | Repos, events, contributions, languages | 1 hr (Redis) |
| **WakaTime** | `lib/wakatime.ts` | Basic auth (Base64 key) | Coding time, languages, editors | 1 hr (`unstable_cache`) |
| **Clist.by** | `lib/clist.ts` | API key + username | Contests, platform ratings | 1 hr |
| **Vercel** | `lib/vercel.ts` | Bearer token | Deployments, projects | 30 min (Redis) |
| **Dev.to** | `lib/socials.ts` | Public API | Articles, profile | 1 hr |
| **Twitter/LinkedIn** | `lib/socials.ts` | Mock (no public API) | Followers, posts (mocked) | — |

---

## 5. Authentication Flow

```
┌──────┐     ┌───────┐     ┌────────────┐     ┌──────────┐
│Client│────▶│ Clerk │────▶│ Middleware  │────▶│ App Route│
│      │     │  SDK  │     │(auth check)│     │          │
└──────┘     └───┬───┘     └────────────┘     └──────────┘
                 │
                 │ JWT (template: 'supabase')
                 ▼
          ┌──────────────┐
          │   Supabase   │
          │ (RLS enforced│
          │  via JWT)    │
          └──────────────┘
```

1. **Sign-up/Login**: Clerk handles all auth UI (`/sign-in`, `/sign-up` routes).
2. **User Sync**: Clerk webhook (`/api/webhooks/clerk`) fires on user creation → upserts into Supabase `users` table.
3. **Session**: Clerk middleware validates session on every request. Protected routes redirect unauthenticated users.
4. **Supabase RLS Bridge**: `createClerkSupabaseClient()` injects Clerk's Supabase JWT template into fetch headers, allowing Supabase RLS policies to validate `auth.uid()`.
5. **Admin Operations**: Settings actions use the `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS for user profile updates.

---

## 6. Data Flow Architecture

### 6.1 Dashboard Data Loading

```
┌──────────────┐    Server Action     ┌─────────────────┐
│ DashboardPage│───────────────────▶  │ getDashboardData │
│  (Client)    │                      │  (lib/actions.ts)│
│              │◀─────────────────── │                   │
│  useState +  │    JSON response     │  1. auth()       │
│  useEffect   │                      │  2. Supabase     │
└──────────────┘                      │     queries      │
                                      │  3. Platform API │
                                      │     calls        │
                                      │  4. Merge &      │
                                      │     return       │
                                      └─────────────────┘
                                             │
                            ┌────────────────┼────────────────┐
                            ▼                ▼                ▼
                     ┌──────────┐    ┌──────────────┐  ┌──────────┐
                     │ Supabase │    │ Redis Cache  │  │ External │
                     │  (user,  │    │ (if hit)     │  │   APIs   │
                     │ solves)  │    │              │  │ (LC,CF,  │
                     └──────────┘    └──────────────┘  │  GH...)  │
                                                       └──────────┘
```

`getDashboardData()` is the main server action that:
1. Authenticates the user via Clerk.
2. Fetches profile + solves from Supabase.
3. Fetches live stats from LeetCode, Codeforces, GitHub, WakaTime, Clist (all parallelized with `Promise.all`).
4. Merges contribution data from multiple sources into a unified heatmap.
5. Returns a single `DashboardData` payload to the client.

### 6.2 Platform Sync (Cron)

```
Vercel Cron (daily)
       │
       ▼
/api/cron/sync-platforms
       │
       ├── For each user with platform_connections:
       │      ├── Fetch latest stats from LeetCode/CF/GH
       │      ├── Upsert into platform_stats table
       │      └── Upsert recent_submissions
       │
       └── Update last_synced timestamps
```

### 6.3 Code Studio Flow

```
┌───────────┐    ┌──────────────┐    ┌─────────────┐
│  Monaco   │───▶│ StudioClient │───▶│ /api/execute│
│  Editor   │    │ (orchestrator│    │  (Route)    │
│           │    │  + AI chat)  │    └──────┬──────┘
└───────────┘    │              │           │
                 │  ┌────────┐  │     Code execution
                 │  │AIChat  │──────▶ /api/chat
                 │  │(Gemini)│  │     (AI SDK streaming)
                 │  └────────┘  │
                 └──────────────┘
```

---

## 7. Caching Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                     MULTI-TIER CACHING                        │
│                                                              │
│  Layer 1: Next.js fetch() cache                              │
│  ├── next: { revalidate: 3600 }                              │
│  └── Automatic dedup within a single render                  │
│                                                              │
│  Layer 2: unstable_cache() (Next.js Data Cache)              │
│  ├── getCachedLeetCodeStats()                                │
│  ├── getCachedCodeforcesStats()                              │
│  ├── getCachedWakaTimeStats()                                │
│  └── getCachedHackathons()                                   │
│                                                              │
│  Layer 3: Upstash Redis (remote KV)                          │
│  ├── github:repos:{user}        → TTL 1hr                   │
│  ├── github:events:{user}       → TTL 1hr                   │
│  ├── github:contributions:{user}→ TTL 1hr                   │
│  ├── vercel:deployments         → TTL 30min                  │
│  ├── vercel:projects            → TTL 1hr                    │
│  └── @upstash/ratelimit/*       → Sliding window state       │
│                                                              │
│  Layer 4: Client-side React state                            │
│  └── useState / useEffect for dashboard data                 │
└──────────────────────────────────────────────────────────────┘
```

**Pattern:** Every external API call checks Redis first → if miss, fetches live → stores in Redis with TTL → returns. `unstable_cache` handles Next.js-level caching for platform stats. `next: { revalidate }` on fetch calls handles CDN-level staleness.

---

## 8. Security Architecture

### 8.1 Security Headers (next.config.ts)

| Header | Value | Purpose |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Force HTTPS |
| `X-XSS-Protection` | `1; mode=block` | XSS mitigation |
| `X-Frame-Options` | `SAMEORIGIN` | Clickjacking prevention |
| `X-Content-Type-Options` | `nosniff` | MIME sniffing prevention |
| `Referrer-Policy` | `origin-when-cross-origin` | Referrer control |
| `Content-Security-Policy` | Strict CSP with whitelisted domains | XSS/injection prevention |
| `X-DNS-Prefetch-Control` | `on` | Performance optimization |

### 8.2 Auth & Data Security

- **Row Level Security (RLS)** on all Supabase tables — users can only access their own data.
- **Clerk middleware** protects all non-public routes at the edge.
- **Rate limiting** via Upstash (10 requests per 10-second sliding window) on API routes.
- **Environment secrets** for all API keys — never exposed to the client.
- **Zod validation** on all user input (login/signup forms).
- **Service role isolation** — admin Supabase client only used in server actions, never exposed.

---

## 9. API Route Map

| Endpoint | Method | Purpose | Auth |
|---|---|---|---|
| `/api/analytics` | GET | Aggregated analytics data | Clerk |
| `/api/chat` | POST | AI chat (streaming) | Clerk |
| `/api/codeforces` | GET | Codeforces stats proxy | Clerk |
| `/api/execute` | POST | Code execution | Clerk |
| `/api/health` | GET | Health check | Public |
| `/api/problems` | GET | Problem listings | Clerk |
| `/api/cron/sync-platforms` | POST | Platform data sync | Vercel Cron |
| `/api/cron/reminders` | POST | Email reminders | Vercel Cron |
| `/api/webhooks/clerk` | POST | Clerk user lifecycle | Svix signature |

---

## 10. Component Architecture

### 10.1 Component Hierarchy

```
RootLayout (ClerkProvider → ThemeProvider)
├── Landing Page
│   ├── LandingHero
│   ├── FeaturesGrid
│   └── HeroAttraction
│
└── Dashboard Layout (DashboardLayoutClient)
    ├── DevHeader (navigation + profile)
    │
    ├── Dashboard Page
    │   ├── MetricCard × 4 (total solved, streak, rank, active days)
    │   ├── ContributionGraph (365-day heatmap)
    │   ├── ActivityChart (weekly bar chart)
    │   ├── RecentProblems (latest solved)
    │   ├── ContestStats (contest performance)
    │   ├── ContributionSplit (platform pie chart)
    │   ├── PlatformStats (sidebar)
    │   ├── UpcomingContests (sidebar)
    │   ├── SkillDistribution (sidebar)
    │   └── SocialActivityFeed
    │
    ├── Analytics Page
    │   ├── AnalyticsSummaryCards
    │   ├── GrowthTrendChart
    │   ├── TopicRadarChart
    │   ├── MultiPlatformHeatmap
    │   ├── PlatformBreakdown
    │   ├── WeaknessSpotlight
    │   └── ProductivityInsights
    │
    ├── Studio Page
    │   ├── StudioClient (orchestrator)
    │   ├── CodeEditor (Monaco)
    │   └── AIChat (Gemini/GPT streaming)
    │
    ├── Problems Page
    │   ├── SearchFilter
    │   └── ProblemCard × N
    │
    ├── Contests Page
    │   ├── ContestCountdown
    │   ├── ContestList
    │   └── ContestRankings
    │
    ├── Roadmap Page
    │   └── RoadmapStep × N (per roadmap)
    │
    ├── Leaderboard Page
    │
    └── Settings Page
        ├── Basic Info Form
        ├── Platform Connections
        └── Preferences
```

### 10.2 Design System Tokens

```css
/* Backgrounds */
--bg-primary:    #000000    /* Pure black */
--bg-secondary:  #111111    /* Elevated */
--bg-tertiary:   #1a1a1a    /* Inputs */

/* Text */
--fg-primary:    #ffffff    /* Primary */
--fg-secondary:  #888888    /* Muted */
--fg-tertiary:   #666666    /* Disabled */

/* Accent */
--primary:       #0070f3    /* Vercel blue */
--accent-warning:#f5a623    /* Streaks */
--accent-error:  #ff0000    /* Errors */

/* Borders */
--border:        #333333    /* Dividers */
--border-hover:  #444444    /* Hover */

/* Platform Colors */
--leetcode:      #ffa116    /* Amber */
--codeforces:    #bfbfbf    /* Gray */
--github:        #f0f0f0    /* Off-white */
```

---

## 11. Deployment Architecture

```
┌────────────────────────────────────────────────────┐
│                    VERCEL                            │
│                                                    │
│  ┌────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │ Edge       │  │ Serverless   │  │   Static   │ │
│  │ Middleware │  │ Functions    │  │   Assets   │ │
│  │ (Clerk)    │  │ (API routes, │  │ (Next.js   │ │
│  │            │  │  RSC, Actions│  │  static)   │ │
│  └────────────┘  └──────────────┘  └────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐  │
│  │              Vercel Cron Jobs                │  │
│  │  • sync-platforms   (daily platform sync)    │  │
│  │  • reminders        (daily email reminders)  │  │
│  └──────────────────────────────────────────────┘  │
│                                                    │
│  Analytics: PostHog (via /ingest/* rewrite proxy)  │
└────────────────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
    ┌─────────┐  ┌──────────┐  ┌──────────────┐
    │ Clerk   │  │ Supabase │  │ Upstash Redis│
    │ (Auth)  │  │ (DB)     │  │ (Cache)      │
    └─────────┘  └──────────┘  └──────────────┘
```

- **Edge Functions**: Middleware runs at the edge for fast auth checks.
- **Serverless Functions**: API routes and server actions run as on-demand serverless functions.
- **Static Generation**: Landing page and public routes are statically generated.
- **Cron Jobs**: Vercel cron triggers `/api/cron/*` endpoints on schedule.
- **PostHog Proxy**: Analytics requests rewritten from `/ingest/*` to PostHog's domain to avoid ad blockers.

---

## 12. Key Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **Auth provider** | Clerk (not Supabase Auth) | Superior DX, social logins, webhook-based sync, JWT templates for Supabase RLS |
| **Database** | Supabase PostgreSQL | Open-source, RLS, real-time capabilities, generous free tier |
| **Cache** | Upstash Redis | Serverless Redis, works seamlessly with Vercel edge |
| **Server Actions vs API Routes** | Both | Server Actions for mutations/data loading; API Routes for webhooks, cron, streaming |
| **Client-side dashboard** | `"use client"` with `useEffect` | Dashboard needs interactivity (tabs, charts, animations); data fetched via server action |
| **Monaco Editor** | `@monaco-editor/react` | VS Code-grade editing experience in browser |
| **AI provider** | Google Gemini + OpenAI via Vercel AI SDK | Streaming responses, provider-agnostic SDK |
| **Rate limiting** | Upstash Ratelimit | Built for serverless, sliding window, Redis-backed |
| **Email** | Resend + React Email | Modern transactional email with React component templates |
| **Multiple platform adapters** | Separate files per platform | Isolation, independent caching strategies, easy to add new platforms |

---

## 13. Scalability Considerations

```
Current (MVP)                    Future (Scale)
─────────────                    ──────────────
Single Vercel deploy      →     Edge + Regional functions
Redis cache (1hr TTL)     →     Tiered cache (5min/1hr/24hr)
Client-side state         →     React Query / SWR with optimistic updates
Mock social data          →     Real OAuth integrations (Twitter, LinkedIn)
Built-in problems (10)    →     Supabase-backed problem bank (3000+)
Sync on page load         →     Background cron + WebSocket push
Single user scope         →     Multi-tenant with organization support
Free tier APIs            →     Paid API tiers with higher rate limits
```

---

## 14. Environment Variables

| Variable | Service | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase | ✅ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk | ✅ |
| `CLERK_SECRET_KEY` | Clerk | ✅ |
| `UPSTASH_REDIS_REST_URL` | Upstash | ✅ |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash | ✅ |
| `GITHUB_TOKEN` | GitHub | Optional |
| `GITHUB_USERNAME` | GitHub | Optional |
| `LEETCODE_SESSION` | LeetCode | Optional |
| `LEETCODE_CSRF_TOKEN` | LeetCode | Optional |
| `CODEFORCES_API_KEY` | Codeforces | Optional |
| `CODEFORCES_API_SECRET` | Codeforces | Optional |
| `WAKATIME_API_KEY` | WakaTime | Optional |
| `CLIST_API_USERNAME` | Clist.by | Optional |
| `CLIST_API_KEY` | Clist.by | Optional |
| `VERCEL_TOKEN` | Vercel | Optional |
| `RESEND_API_KEY` | Resend | Optional |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI | Optional |
| `OPENAI_API_KEY` | OpenAI | Optional |
| `DEVTO_USERNAME` | Dev.to | Optional |
| `TWITTER_USERNAME` | Twitter | Optional |
| `LINKEDIN_USERNAME` | LinkedIn | Optional |

---

*This document reflects the architecture as implemented in the codebase. Update as the system evolves.*
