import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { ActivityChart } from "@/components/dashboard/ActivityChart"
import { RecentProblems } from "@/components/dashboard/RecentProblems"
import { PlatformStats, UpcomingContests, SkillDistribution } from "@/components/dashboard/DashboardSidePanels"
import { getDashboardData } from "@/lib/actions"
import { Hand } from "lucide-react"

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
        <div className="p-6 md:p-8 max-w-7xl mx-auto fade-in pb-20">
            {/* Header */}
            <div className="mb-8 relative">
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-white">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{firstName}</span>!
                    <span className="animate-wave text-3xl">👋</span>
                </h1>
                <p className="text-gray-400">Here&apos;s your coding activity for today.</p>
            </div>

            {/* 1. Stats Grid (4 Cards) */}
            <StatsGrid />

            {/* 2. Main Content Grid (Chart + Recent) */}
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                    <ActivityChart />
                </div>
                <div>
                    <RecentProblems />
                </div>
            </div>

            {/* 3. Bottom Grid (Panels) */}
            <div className="grid lg:grid-cols-3 gap-6">
                <PlatformStats />
                <UpcomingContests />
                <SkillDistribution />
            </div>
        </div>
    )
}
