<div align="center">

<img src="./public/codeboard-logo.jpg" alt="CodeBoard Logo" width="250" />

# CodeBoard

### The Complete Developer Productivity & Analytics Platform 🚀

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

[Features](#-core-features) •
[Architecture](#-system-architecture) •
[Quick Start](#-quick-start) •
[API](#-api-structure) •
[Contributing](#-contributing)

</div>

---

## ⚡ Overview

**CodeBoard** is the ultimate dashboard for competitive programmers and developers. It aggregates your coding journey from platforms like **LeetCode, Codeforces, and GitHub** into a single, beautiful interface.

Designed for students, job seekers, and serious developers, CodeBoard helps you **track progress, analyze performance, and stay consistent** with streaks, leaderboards, and AI-driven insights. It transforms scattered coding stats into a unified professional portfolio.

| Problem | Solution |
| :--- | :--- |
| **Fragmented Data** — Stats scattered across 5+ sites (LC, CF, GitHub). | **Unified Profile** — One dashboard syncing all your coding metrics in real-time. |
| **Lack of Consistency** — Hard to maintain streaks without visualization. | **Activity Heatmaps** — GitHub-style contribution graphs for all your coding platforms. |
| **No Social Proof** — Resumes don't show "daily effort". | **Public Leaderboards** — Compete with friends and showcase your global rank. |
| **Unorganized Prep** — DSA sheets and notes are everywhere. | **Structured Roadmaps** — Built-in DSA sheets (Striver, Love Babbar) with progress tracking. |

---

## 🚀 Core Features

### 📊 Comprehensive Dashboard
The command center of your coding life. View real-time stats, solve streaks, and daily activity graphs.
- **Unified Stats**: Total problems solved across platforms.
- **Activity Graph**: GitHub-style heatmap combining manual and platform activity.
- **Skill Radar**: Visual breakdown of your strengths (DP, Graphs, Arrays).

### 🔐 Premium Authentication (New)
Powered by **Clerk** for robust, secure, and beautiful user management.
- **Seamless Onboarding**: Google/GitHub OAuth and Email login.
- **User Profiles**: Manage avatar, email, and security settings instantly.
- **Premium UI**: Custom-styled login/signup pages with dynamic background effects.

### 🤖 AI & Analytics
Deep dive into your performance with our custom analytics engine.
- **Growth Trends**: Visualize your problem-solving velocity over time.
- **Weakness Spotlight**: AI identifies topics you're neglecting (e.g., "You haven't solved DP in 2 weeks").
- **Productivity Insights**: "You code best on Tuesday evenings."

### 🏆 Gamification & Leaderboards
Compete with the community.
- **Global Leaderboard**: Live rankings based on problem count and consistency.
- **Podium View**: Top 3 performers highlighted with specialized UI.
- **Streak System**: Don't break the chain.

### 📚 DSA Studio & Sheets
Structured learning paths integrated directly into the platform.
- **Curated Sheets**: Access popular problem lists (Blind 75, NeetCode 150).
- **Notes & Solutions**: Attach markdown notes to every problem you solve.
- **Space Repetition**: Mark problems for review later.

### 💻 Developer Hub
Stay updated with the tech world.
- **Dev News**: Curated tech news feed tailored to your interests.
- **Hackathon Tracker**: Upcoming contests and hackathons.
- **Job Board**: Aggregated internships and full-time roles.

---

## 🛠 Quick Start

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/codeboard.git
    cd codeboard
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env.local` file in the root. You will need keys from **Clerk** and **Supabase**.

    ```env
    # Supabase (Database)
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

    # Clerk (Authentication)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    CLERK_WEBHOOK_SECRET=whsec_...

    # Upstash (Caching - Optional)
    UPSTASH_REDIS_REST_URL=your_redis_url
    UPSTASH_REDIS_REST_TOKEN=your_redis_token
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to see the app live.

---

## ⚙️ Tech Stack

Built with a modern, type-safe stack for performance and scalability.

| Layer | Technology | Key Features |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14 (App Router)** | Server Components, Streaming, SEO optimization. |
| **Styling** | **Tailwind CSS 4** | Zero-runtime styles, dark mode native. |
| **UI Components** | **Radix UI / Lucide** | Accessible primitives, beautiful icons. |
| **Animations** | **Framer Motion** | Smooth layout transitions and micro-interactions. |
| **Backend** | **Next.js API Routes** | Edge-ready serverless functions. |
| **Database** | **Supabase (PostgreSQL)** | Row Level Security (RLS), Realtime subscriptions. |
| **Auth** | **Clerk** | Complete user management, MFA, Session control. |
| **Sync** | **Webhooks (Svix)** | Real-time user synchronization between Clerk and Supabase. |
| **Caching** | **Upstash Redis** | Rate limiting, leaderboard caching. |

---

## 🏗 System Architecture

CodeBoard follows a modern **Serverless** architecture leveraging the T3 Stack principles.

```mermaid
graph TD
    User[Clients (Web/Mobile)] -->|HTTPS| Edge[Next.js Edge Middleware]
    Edge -->|Auth Guard (Clerk)| App[Next.js App Router]
    
    subgraph Auth Layer
        App -->|Verify Session| Clerk[Clerk Auth]
        Clerk -->|Webhook (User Created)| API[API Route]
    end

    subgraph Data Layer
        API -->|Sync User| DB[(Supabase Postgres)]
        App -->|Fetch Data (RLS)| DB
        App -->|Cache/Rate Limit| Redis[(Upstash Redis)]
    end
    
    subgraph External Integrations
        App -->|Fetch Stats| LC[LeetCode GraphQL]
        App -->|Fetch Stats| CF[Codeforces API]
        App -->|Fetch Repos| GH[GitHub API]
    end
```

**Data Flow:**
1.  **Auth**: **Clerk** handles identity. `middleware.ts` protects sensitive routes.
2.  **Sync**: When a user signs up, a webhook syncs their profile to **Supabase** `users` table.
3.  **Data Access**: The app uses a custom `createClerkSupabaseClient` which injects the Clerk JWT into Supabase requests, enforcing Row Level Security (RLS).
4.  **Performance**: High-traffic data (Leaderboards) is cached in Redis.

---

## 🚀 Deployment

CodeBoard is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add the Environment Variables from your `.env.local` (Clerk + Supabase keys).
4.  Deploy! Vercel handles the build, edge caching, and asset optimization automatically.

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with ❤️ by Developers, for Developers.</p>
</div>
