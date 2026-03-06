"use client"

import { useState, useEffect } from "react"
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader"
import { GrowthTrendChart } from "@/components/analytics/GrowthTrendChart"
import { TopicRadarChart } from "@/components/analytics/TopicRadarChart"
import { WeaknessSpotlight } from "@/components/analytics/WeaknessSpotlight"
import { ProductivityInsights } from "@/components/analytics/ProductivityInsights"
import { MultiPlatformHeatmap } from "@/components/analytics/MultiPlatformHeatmap"
import { FadeIn } from "@/components/ui/PremiumEffects"
import { GrowthAnalytics } from "@/components/analytics/GrowthAnalytics"
import { motion } from "framer-motion"
import { CheckCircle2, Clock, Flame, TrendingUp, ArrowUpRight, ArrowDownRight, Code2, Terminal, Code, Loader2, WifiOff } from "lucide-react"

interface PlatformData {
    name: string
    color: string
    rating: string
    solved: number
    details: Record<string, unknown>
}

interface AnalyticsData {
    platforms: PlatformData[]
    contributions: { date: string; count: number; platform: string; color: string }[]
    summary: {
        totalSolved: number
        totalContributions: number
        codingTime: string | null
        languages: { name: string; percent: number }[]
    }
    connected: {
        github: boolean
        leetcode: boolean
        codeforces: boolean
        wakatime: boolean
    }
}

const PLATFORM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    LeetCode: Code2,
    Codeforces: Terminal,
    CodeChef: Code,
}

export default function AnalyticsContent() {
    const [activeTab, setActiveTab] = useState<"Overview" | "Growth" | "Topics">("Overview")
    const [timeRange, setTimeRange] = useState("30 Days")
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const res = await fetch("/api/analytics")
                if (!res.ok) throw new Error("Failed to fetch")
                const json = await res.json()
                setData(json)
            } catch (e) {
                console.error("Analytics fetch error:", e)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                    <p className="text-sm text-gray-500">Fetching your analytics from all platforms...</p>
                </div>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-3 text-center max-w-md">
                    <WifiOff className="w-8 h-8 text-gray-600" />
                    <p className="text-gray-400 font-medium">Couldn't load analytics</p>
                    <p className="text-xs text-gray-600">Make sure your platform usernames are configured in <code className="text-white bg-white/10 px-1.5 py-0.5 rounded">.env.local</code></p>
                </div>
            </div>
        )
    }

    const { platforms, contributions, summary, connected } = data
    const connectedCount = Object.values(connected).filter(Boolean).length

    // Build summary cards from real data
    const metrics = [
        {
            label: "Problems Solved",
            value: summary.totalSolved.toLocaleString(),
            change: connectedCount > 0 ? `${connectedCount} platforms` : "No data",
            trend: "up" as const,
            icon: CheckCircle2,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "Coding Time",
            value: summary.codingTime || "—",
            change: summary.codingTime ? "Last 7 days" : "Connect WakaTime",
            trend: summary.codingTime ? "up" as const : "down" as const,
            icon: Clock,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            label: "Contributions",
            value: summary.totalContributions.toLocaleString(),
            change: connected.github ? "From GitHub" : "Connect GitHub",
            trend: summary.totalContributions > 0 ? "up" as const : "down" as const,
            icon: Flame,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            label: "Platforms Connected",
            value: connectedCount.toString(),
            change: `of 4 available`,
            trend: connectedCount >= 2 ? "up" as const : "down" as const,
            icon: TrendingUp,
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
    ]

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
            {/* 1. Header */}
            <FadeIn delay={0}>
                <AnalyticsHeader timeRange={timeRange} setTimeRange={setTimeRange} />
            </FadeIn>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2xl border border-white/5 md:w-fit mb-8 overflow-x-auto scollbar-hide">
                {["Overview", "Growth", "Topics"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`relative px-6 py-2.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                            }`}
                    >
                        {activeTab === tab && (
                            <motion.div
                                layoutId="analytics-main-tab"
                                className="absolute inset-0 bg-white/10 rounded-xl"
                                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                            />
                        )}
                        <span className="relative z-10">{tab}</span>
                    </button>
                ))}
            </div>

            {/* TAB CONTENT: OVERVIEW */}
            {activeTab === "Overview" && (
                <div className="space-y-8 animate-in mt-6">
                    {/* Setup Notice */}
                    {connectedCount === 0 && (
                        <FadeIn delay={0.05}>
                            <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4 flex items-center gap-3">
                                <div className="p-2 bg-yellow-500/10 rounded-lg">
                                    <WifiOff className="w-4 h-4 text-yellow-500" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-yellow-200 font-medium">No platforms connected</p>
                                    <p className="text-xs text-yellow-200/60">Set your usernames in <code className="bg-white/5 px-1 rounded">.env.local</code> (GITHUB_USERNAME, LEETCODE_USERNAME, CODEFORCES_USERNAME) to see real data.</p>
                                </div>
                            </div>
                        </FadeIn>
                    )}

                    {/* 2. Summary Cards */}
                    <FadeIn delay={0.1}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {metrics.map(m => (
                                <div key={m.label} className="bg-white/[0.03] border border-white/5 p-5 rounded-xl flex flex-col justify-between group hover:border-white/10 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded-lg ${m.bg} ${m.color}`}>
                                            <m.icon className="w-5 h-5" />
                                        </div>
                                        <div className={`flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full border ${m.trend === "up" ? "text-green-400 border-green-500/20 bg-green-500/5" : "text-gray-500 border-white/5 bg-white/[0.02]"
                                            }`}>
                                            {m.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                            {m.change}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white mb-1">{m.value}</div>
                                        <div className="text-xs text-gray-500">{m.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 3. Growth Chart (Old) */}
                        <FadeIn delay={0.2} className="lg:col-span-3 bg-white/[0.03] border border-white/5 rounded-xl p-6 min-h-[400px]">
                            <GrowthTrendChart />
                        </FadeIn>
                    </div>

                    {/* 5. Platform Breakdown - from real data */}
                    <FadeIn delay={0.4}>
                        <h3 className="text-white font-semibold mb-4">Connected Platforms</h3>
                        {platforms.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {platforms.map(p => {
                                    const IconComp = PLATFORM_ICONS[p.name] || Code2
                                    return (
                                        <div key={p.name} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                                                    <IconComp className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white">{p.name}</div>
                                                    <div className="text-xs text-gray-500">{p.solved > 0 ? `${p.solved} Solved` : String(p.details?.rank || "Connected")}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-bold">{p.rating}</div>
                                                <div className="text-[10px] text-gray-500">Rating</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-600 text-sm border border-dashed border-white/5 rounded-xl">
                                No platforms connected yet. Add your usernames in settings.
                            </div>
                        )}
                    </FadeIn>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 6. Productivity */}
                        <FadeIn delay={0.5} className="lg:col-span-3">
                            <h3 className="text-white font-semibold mb-4">Productivity Patterns</h3>
                            <ProductivityInsights />
                        </FadeIn>
                    </div>

                    {/* 8. Multi-Platform Heatmap */}
                    <FadeIn delay={0.7} className="space-y-4">
                        <h3 className="text-white font-semibold">Activity Heatmap</h3>
                        <MultiPlatformHeatmap contributions={contributions} />
                    </FadeIn>
                </div>
            )}

            {/* TAB CONTENT: GROWTH */}
            {activeTab === "Growth" && (
                <GrowthAnalytics />
            )}

            {/* TAB CONTENT: TOPICS */}
            {activeTab === "Topics" && (
                <div className="space-y-8 animate-in mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 4. Topic Radar */}
                        <FadeIn delay={0.3} className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-xl p-6 min-h-[400px]">
                            <TopicRadarChart />
                        </FadeIn>

                        {/* 7. Insights */}
                        <FadeIn delay={0.6} className="bg-white/[0.03] border border-white/5 rounded-xl p-6">
                            <WeaknessSpotlight />
                        </FadeIn>
                    </div>
                </div>
            )}
        </div>
    )
}
