"use client"

import { RecentProblems } from "@/components/dashboard/RecentProblems"
import { PlatformStats, UpcomingContests, SkillDistribution } from "@/components/dashboard/DashboardSidePanels"
import { ContributionGraph } from "@/components/dashboard/ContributionGraph"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { ContestStats } from "@/components/dashboard/ContestStats"
import { ContributionSplit } from "@/components/dashboard/ContributionSplit"
import { ActivityChart } from "@/components/dashboard/ActivityChart"
import { getDashboardData } from "@/lib/actions"
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart2, Code, Trophy, TrendingUp, CheckCircle2, Flame, Clock, Target } from "lucide-react"

type Section = "overview" | "problems" | "contests" | "stats"

const sections: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: BarChart2 },
  { id: "problems", label: "Problems", icon: Code },
  { id: "contests", label: "Contests", icon: Trophy },
  { id: "stats", label: "Stats", icon: TrendingUp },
]

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>("overview")
  const [data, setData] = useState<any>(null)

  // Use mock data for immediate visual feedback as requested
  const mockContributionData = useMemo(() => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      // distinct bias towards recent days for "streak" look
      // Deterministic pseudo-random generation to avoid hydration mismatch (server vs client)
      // Math.random() causes mismatch. We use date properties to create a fixed pattern.
      const seed = d.getDate() * (d.getMonth() + 1) + i
      const count = seed % 4 === 0 ? Math.floor((seed % 9)) : 0
      dates.push({ date: d.toISOString().split('T')[0], count })
    }
    return dates
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const dashboardData = await getDashboardData()
        setData(dashboardData)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      }
    }
    fetchData()
  }, [])

  const userName = data?.profile?.display_name || "Coder"
  const firstName = userName.split(" ")[0]

  // Use real data from backend, default to 0 if not connected
  const totalSolved = data?.stats?.total_solved || 0
  const activeDays = data?.stats?.streak || 0
  const githubUser = data?.connectedPlatforms?.github?.username

  return (
    <div className="p-6 md:p-10 max-w-7xl fade-in space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {firstName}
        </h1>
        <p className="text-gray-500">
          Track your progress and stay consistent.
        </p>
      </div>

      {/* Navigation */}
      <div className="border-b border-white/10 mb-6">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeSection === section.id
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
                }`}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeSection === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="space-y-6"
            >

              {/* Top Row: 4 Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Problems Solved"
                  value={totalSolved}
                  icon={CheckCircle2}
                  color="green"
                  badgeText={totalSolved > 0 ? "Live" : "No Solves"}
                />
                <MetricCard
                  title="Day Streak"
                  value={activeDays}
                  icon={Flame}
                  color="orange"
                  badgeText={activeDays > 0 ? "Hot!" : "Start Streak"}
                />
                <MetricCard
                  title="Coding Hours"
                  value={data?.stats?.wakatime?.daily_average ? `${(data.stats.wakatime.daily_average / 3600).toFixed(1)}h/day` : "0h"}
                  icon={Clock}
                  color="blue"
                  badgeText="WakaTime"
                />
                <MetricCard
                  title="Codeforces Rating"
                  value={data?.stats?.codeforces?.rating?.toString() || "Unrated"}
                  icon={Target}
                  color="purple"
                  badgeText={data?.stats?.codeforces?.rank || "No Rank"}
                />
              </div>

              {/* Second Row: Contest (Left) + Activity Overview (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[320px]">
                {/* Left: Contest Thing */}
                <div className="col-span-1 h-full">
                  <ContestStats hackathons={data?.stats?.hackathons} />
                </div>

                {/* Right: Activity Overview */}
                <div className="col-span-1 lg:col-span-2 h-full bg-white/[0.03] border border-white/10 rounded-xl p-6">
                  <ActivityChart wakatime={data?.stats?.wakatime} />
                </div>
              </div>

              {/* Third Row: Contribution Grid + Split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contribution Grid (2/3) */}
                <div className="col-span-1 lg:col-span-2 h-full">
                  <ContributionGraph
                    contributions={data?.contributions || []}
                    username={githubUser || "Account Not Linked"}
                  />
                </div>

                {/* Split Chart (1/3) */}
                <div className="col-span-1 h-full">
                  <ContributionSplit
                    devCounts={data?.contributions?.reduce((acc: number, curr: any) => acc + curr.count, 0) || 0}
                    dsaCounts={totalSolved}
                  />
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 h-full">
                  <PlatformStats stats={data?.stats} />
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 h-full">
                  <SkillDistribution stats={data?.stats} />
                </div>
              </div>

            </motion.div>
          )}

          {activeSection === "problems" && (
            <motion.div
              key="problems"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-6"
            >
              <RecentProblems />
            </motion.div>
          )}

          {activeSection === "contests" && (
            <motion.div
              key="contests"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="bg-white/[0.03] border border-white/10 rounded-xl p-6"
            >
              <UpcomingContests />
            </motion.div>
          )}

          {activeSection === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <PlatformStats stats={data?.stats} />
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
                <SkillDistribution stats={data?.stats} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
