import { StatsGrid } from "@/components/dashboard/StatsGrid"
import { ActivityChart } from "@/components/dashboard/ActivityChart"
import { RecentProblems } from "@/components/dashboard/RecentProblems"
import { PlatformStats, UpcomingContests, SkillDistribution } from "@/components/dashboard/DashboardSidePanels"
import { getDashboardData } from "@/lib/actions"
import { Suspense } from "react"

/* ─── Page Component (Server) ───────────────────────────── */
export default async function DashboardPage() {
    let data: any = null
    let error: string | null = null
    
    try {
        data = await getDashboardData()
    } catch (err) {
        console.error('Dashboard data fetch failed:', err)
        error = err instanceof Error ? err.message : 'Failed to load dashboard data'
    }

    // Fallback name
    const userName = data?.profile?.display_name || "Yuvraj Singh"
    const firstName = userName.split(" ")[0]

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto fade-in pb-20 overflow-hidden">
            {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    Unable to load some data: {error}
                </div>
            )}
            
            <div className="mb-6 md:mb-8 relative">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2 text-white">
                    Welcome back, <span className="text-white">{firstName}</span>!
                    <span className="animate-wave text-2xl md:text-3xl">👋</span>
                </h1>
                <p className="text-gray-400 text-sm md:text-base">Here&apos;s your coding activity for today.</p>
            </div>

            {/* 1. Stats Grid (4 Cards) */}
            <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[1,2,3,4].map(i => <div key={i} className="h-24 bg-gray-800 rounded-xl animate-pulse" />)}
            </div>}>
                <StatsGrid />
            </Suspense>

            {/* 2. Main Content Grid (Chart + Recent) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
                <div className="lg:col-span-2">
                    <Suspense fallback={<div className="h-64 bg-gray-800 rounded-xl animate-pulse" />}>
                        <ActivityChart />
                    </Suspense>
                </div>
                <div>
                    <Suspense fallback={<div className="h-64 bg-gray-800 rounded-xl animate-pulse" />}>
                        <RecentProblems />
                    </Suspense>
                </div>
            </div>

            {/* 3. Bottom Grid (Panels) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <Suspense fallback={<div className="h-32 bg-gray-800 rounded-xl animate-pulse" />}>
                    <PlatformStats />
                </Suspense>
                <Suspense fallback={<div className="h-32 bg-gray-800 rounded-xl animate-pulse" />}>
                    <UpcomingContests />
                </Suspense>
                <Suspense fallback={<div className="h-32 bg-gray-800 rounded-xl animate-pulse" />}>
                    <SkillDistribution />
                </Suspense>
            </div>
        </div>
    )
}
