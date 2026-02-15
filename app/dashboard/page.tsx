import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { ActivityChart } from "@/components/dashboard/ActivityChart"
import { RecentProblems } from "@/components/dashboard/RecentProblems"
import { PlatformStats, UpcomingContests, SkillDistribution } from "@/components/dashboard/DashboardSidePanels"
import { getDashboardData } from "@/lib/actions"

/* ─── Page Component (Server) ───────────────────────────── */
export default async function DashboardPage() {
    let data: any = null
    try {
        data = await getDashboardData()
    } catch { }

    // Fallback name
    const userName = data?.profile?.display_name || "Yuvraj Singh"
    const firstName = userName.split(" ")[0]

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto fade-in pb-20 overflow-hidden">
            <div className="mb-6 md:mb-8 relative">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2 text-white">
                    Welcome back, <span className="text-white">{firstName}</span>!
                    <span className="animate-wave text-2xl md:text-3xl">👋</span>
                </h1>
                <p className="text-gray-400 text-sm md:text-base">Here&apos;s your coding activity for today.</p>
            </div>

            {/* 1. Stats Grid (4 Cards) */}
            <StatsGrid />

            {/* 2. Main Content Grid (Chart + Recent) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="lg:col-span-2">
                    <ActivityChart />
                </div>
                <div>
                    <RecentProblems />
                </div>
            </div>

            {/* 3. Bottom Grid (Panels) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <PlatformStats />
                <UpcomingContests />
                <SkillDistribution />
            </div>
        </div>
    )
}
