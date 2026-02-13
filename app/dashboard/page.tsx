import { StatsCard } from "@/components/dashboard/StatsCard"
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap"
import { RatingChart } from "@/components/dashboard/RatingChart"
import { PlatformList } from "@/components/dashboard/PlatformList"
import { TopicAnalysis } from "@/components/dashboard/TopicAnalysis"
import { Flame, Star, CheckCircle, Activity, Trophy } from "lucide-react"
import { getDashboardData } from "@/lib/actions"

/* ─── Mock Data (Fallback) ─────────────────────────────── */

const MOCK_DATA = {
    profile: {
        id: "mock-user",
        streak_count: 12,
        longest_streak: 24,
        email: "demo@codeboard.dev",
        username: "Demo User",
        full_name: "Demo User",
        avatar_url: "",
        skill_level: "beginner",
        daily_goal: 0,
        timezone: "UTC",
        last_active: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    stats: {
        total_solved: 1284,
        easy: 0,
        medium: 0,
        hard: 0,
        streak: 12
    },
    activity: Array.from({ length: 365 }).map((_, i) => ({
        solved_at: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
        problem_id: `prob-${i}`
    })),
    platforms: [],
    ratings: []
};

/* ─── Page Component (Server) ───────────────────────────── */

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {

    let data;

    try {
        const result = await getDashboardData();

        // If DB returns empty profile, fallback to mock (with log)
        if (!result.profile) {
            console.log("No profile found for seed ID, using mock data.");
            data = MOCK_DATA;
        } else {
            console.log("Profile found! Loading real data for:", result.profile);
            data = result;
        }
    } catch (e) {
        console.warn("Failed to fetch dashboard data:", e);
        data = MOCK_DATA;
    }

    const { profile, activity, platforms, ratings } = data;

    // Transform raw activity (solves) into Heatmap data (date/count)
    const heatmapData = Array.from({ length: 365 }).map((_, i) => {
        const date = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
        // Count solves for this date
        const count = activity && Array.isArray(activity)
            ? activity.filter((a: any) => a.solved_at?.startsWith(date)).length
            : 0;
        return { date, count };
    }).reverse();

    return (
        <div className="space-y-6 animate-fade-in">
            {/* 1. Header Area with Asymmetric Layout */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">

                <div>
                    <h1 className="text-[32px] font-display font-semibold text-[var(--foreground)] tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-[var(--text-secondary)] text-[14px]">
                        Track your competitive programming journey across all platforms.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-[6px] text-[12px] font-mono text-[var(--text-secondary)]">
                        <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                        System Normal
                    </div>
                </div>
            </div>

            {/* 2. Top Row: Stats (Grid 2x2) + Heatmap (Wide) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-auto xl:h-[320px]">
                {/* Stats Grid */}
                <div className="xl:col-span-12 2xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                    <StatsCard
                        label="Total Solved"
                        value={data.stats?.total_solved?.toLocaleString() ?? "0"}
                        change="+12 this week"
                        trend="up"
                        icon={CheckCircle}
                    />
                    <StatsCard
                        label="Active Days"
                        value="24" // TODO: Calculate this real-time
                        subtext="Last 30 days"
                        icon={Activity}
                    />
                    <StatsCard
                        label="Current Streak"
                        value={profile?.streak_count?.toString() ?? "0"}
                        subtext={`Best: ${profile?.longest_streak ?? 0}`}
                        icon={Flame}
                    />

                    <StatsCard
                        label="Max Rating"
                        value="1,942"
                        subtext="Codeforces (Expert)"
                        icon={Trophy}
                    />
                </div>

                {/* Heatmap */}
                <div className="xl:col-span-12 2xl:col-span-7 h-full">
                    <ActivityHeatmap data={heatmapData} />
                </div>
            </div>

            {/* 3. Middle Row: Rating Chart */}
            <div className="grid grid-cols-1">
                <div className="h-[400px]">
                    <RatingChart />
                </div>
            </div>

            {/* 4. Bottom Row: Platforms + Topic Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
                <div className="h-[400px]">
                    <PlatformList />
                </div>
                <div className="h-[400px]">
                    <TopicAnalysis />
                </div>
            </div>
        </div>
    )
}
