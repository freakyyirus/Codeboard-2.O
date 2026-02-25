"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/PremiumEffects"

type PlatformContribution = {
    date: string
    count: number
    platform: string
    color: string
}

// Platform color definitions
const PLATFORM_COLORS: Record<string, { shades: string[]; hex: string }> = {
    GitHub: {
        hex: "#3b82f6",
        shades: ["bg-blue-900/30", "bg-blue-700/50", "bg-blue-500/70", "bg-blue-400"],
    },
    LeetCode: {
        hex: "#ef4444",
        shades: ["bg-red-900/30", "bg-red-700/50", "bg-red-500/70", "bg-red-400"],
    },
    Codeforces: {
        hex: "#22c55e",
        shades: ["bg-green-900/30", "bg-green-700/50", "bg-green-500/70", "bg-green-400"],
    },
    CodeChef: {
        hex: "#eab308",
        shades: ["bg-yellow-900/30", "bg-yellow-700/50", "bg-yellow-500/70", "bg-yellow-400"],
    },
    HackerRank: {
        hex: "#10b981",
        shades: ["bg-emerald-900/30", "bg-emerald-700/50", "bg-emerald-500/70", "bg-emerald-400"],
    },
    default: {
        hex: "#a855f7",
        shades: ["bg-purple-900/30", "bg-purple-700/50", "bg-purple-500/70", "bg-purple-400"],
    },
}

function getShade(count: number, platform: string): string {
    if (count === 0) return "bg-white/[0.03]"
    const colors = PLATFORM_COLORS[platform]?.shades || PLATFORM_COLORS.default.shades
    if (count <= 2) return colors[0]
    if (count <= 5) return colors[1]
    if (count <= 8) return colors[2]
    return colors[3]
}

// For mixed/all platforms, use a gradient approach
function getMixedShade(count: number): string {
    if (count === 0) return "bg-white/[0.03]"
    if (count <= 2) return "bg-cyan-900/30"
    if (count <= 5) return "bg-cyan-700/50"
    if (count <= 8) return "bg-cyan-500/70"
    return "bg-cyan-400"
}

export function MultiPlatformHeatmap({ contributions }: { contributions: PlatformContribution[] }) {
    const platforms = useMemo(() => {
        const set = new Set(contributions.map(c => c.platform))
        return Array.from(set)
    }, [contributions])

    const [activePlatform, setActivePlatform] = useState<string | null>(null)

    // Generate last 365 days
    const days = useMemo(() => {
        const today = new Date()
        const dates = []
        for (let i = 364; i >= 0; i--) {
            const d = new Date(today)
            d.setDate(d.getDate() - i)
            dates.push(d.toISOString().split('T')[0])
        }
        return dates
    }, [])

    // Build contribution map: date -> { platform: count }
    const contributionMap = useMemo(() => {
        const map = new Map<string, { total: number; byPlatform: Record<string, number>; dominantPlatform: string }>()

        contributions.forEach(c => {
            const existing = map.get(c.date) || { total: 0, byPlatform: {}, dominantPlatform: "" }
            existing.total += c.count
            existing.byPlatform[c.platform] = (existing.byPlatform[c.platform] || 0) + c.count
            map.set(c.date, existing)
        })

        // Determine dominant platform per day
        map.forEach((val) => {
            let max = 0
            let dominant = ""
            Object.entries(val.byPlatform).forEach(([platform, count]) => {
                if (count > max) {
                    max = count
                    dominant = platform
                }
            })
            val.dominantPlatform = dominant
        })

        return map
    }, [contributions])

    // Group into weeks for column labels
    const weeks = useMemo(() => {
        const w = []
        for (let i = 0; i < days.length; i += 7) {
            w.push(days[i])
        }
        return w
    }, [days])

    const totalContributions = contributions.reduce((a, c) => a + c.count, 0)

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
        })
    }

    const getCellColor = (date: string): string => {
        const data = contributionMap.get(date)
        if (!data || data.total === 0) return "bg-white/[0.03]"

        if (activePlatform) {
            const platformCount = data.byPlatform[activePlatform] || 0
            if (platformCount === 0) return "bg-white/[0.03]"
            return getShade(platformCount, activePlatform)
        }

        // When no filter, color by dominant platform
        if (Object.keys(data.byPlatform).length === 1) {
            return getShade(data.total, data.dominantPlatform)
        }
        return getMixedShade(data.total)
    }

    const getCellCount = (date: string): number => {
        const data = contributionMap.get(date)
        if (!data) return 0
        if (activePlatform) return data.byPlatform[activePlatform] || 0
        return data.total
    }

    return (
        <FadeIn className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-white font-semibold text-sm">
                    {totalContributions} contributions in the last year
                </h3>

                {/* Platform Filter Chips */}
                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={() => setActivePlatform(null)}
                        className={`text-[10px] px-2.5 py-1 rounded-md border transition-all font-medium ${!activePlatform
                            ? "bg-white/10 border-white/20 text-white"
                            : "bg-transparent border-white/5 text-gray-500 hover:text-white"
                            }`}
                    >
                        All
                    </button>
                    {platforms.map(platform => {
                        const pc = PLATFORM_COLORS[platform] || PLATFORM_COLORS.default
                        return (
                            <button
                                key={platform}
                                onClick={() => setActivePlatform(activePlatform === platform ? null : platform)}
                                className={`text-[10px] px-2.5 py-1 rounded-md border transition-all font-medium flex items-center gap-1.5 ${activePlatform === platform
                                    ? "border-white/20 text-white"
                                    : "border-white/5 text-gray-500 hover:text-white"
                                    }`}
                                style={activePlatform === platform ? { backgroundColor: `${pc.hex}20` } : {}}
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pc.hex }} />
                                {platform}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto pb-2 scrollbar-hide">
                {/* Month Labels */}
                <div className="flex gap-0.5 mb-2 min-w-max">
                    {weeks.map((dateStr, i) => {
                        const date = new Date(dateStr)
                        const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                        const month = MONTHS[date.getMonth()]
                        const prevDate = i > 0 ? new Date(weeks[i - 1]) : null
                        const prevMonth = prevDate ? MONTHS[prevDate.getMonth()] : ''
                        const showLabel = month !== prevMonth

                        return (
                            <div key={i} className="w-2.5 text-[9px] text-gray-500 font-mono text-center">
                                {showLabel ? month : ''}
                            </div>
                        )
                    })}
                </div>

                <div className="flex gap-0.5 min-w-max">
                    <div className="grid grid-rows-7 grid-flow-col gap-0.5">
                        {days.map((date) => {
                            const count = getCellCount(date)
                            return (
                                <motion.div
                                    key={date}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.15 }}
                                    className={`w-2.5 h-2.5 rounded-sm ${getCellColor(date)} cursor-pointer relative group transition-colors hover:ring-1 hover:ring-white/30`}
                                >
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/95 border border-white/10 text-white text-[10px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                        <span className="font-medium">{count} contributions</span> on {formatDate(date)}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3 flex-wrap">
                    {platforms.map(platform => {
                        const pc = PLATFORM_COLORS[platform] || PLATFORM_COLORS.default
                        return (
                            <div key={platform} className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: pc.hex }} />
                                <span className="text-[10px] text-gray-500">{platform}</span>
                            </div>
                        )
                    })}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 rounded-sm bg-white/[0.03]" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-cyan-900/30" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-cyan-700/50" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-cyan-500/70" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
                    <span>More</span>
                </div>
            </div>
        </FadeIn>
    )
}
