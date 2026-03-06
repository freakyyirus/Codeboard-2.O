"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Trophy, ExternalLink, Activity, LinkIcon } from "lucide-react"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceDot,
} from "recharts"

interface ContestEntry {
    date: string
    rating: number
    contest: string
    rank: number
    type: string
}

interface RatingProgressionChartProps {
    ratingHistory?: Record<string, ContestEntry[]>
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload
        return (
            <div className="bg-[#111113] border border-white/10 rounded-xl p-4 shadow-2xl min-w-[200px]">
                <div className="text-gray-400 text-xs font-medium mb-1">{data.date}</div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-black text-white">{data.rating}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full">
                        Rating
                    </span>
                </div>
                <div className="space-y-1.5 pt-3 border-t border-white/5">
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Contest</span>
                        <span className="text-white font-medium truncate max-w-[140px]">{data.contest}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Type</span>
                        <span className="text-white">{data.type}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Rank</span>
                        <span className="text-white">#{data.rank?.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        )
    }
    return null
}

export function RatingProgressionChart({ ratingHistory }: RatingProgressionChartProps) {
    // Build available platforms from the real data
    const availablePlatforms = useMemo(() => {
        const platforms: Record<string, { label: string }> = {}
        if (ratingHistory) {
            if (ratingHistory.codeforces?.length) platforms.codeforces = { label: "Codeforces" }
            if (ratingHistory.leetcode?.length) platforms.leetcode = { label: "LeetCode" }
            if (ratingHistory.codechef?.length) platforms.codechef = { label: "CodeChef" }
        }
        return platforms
    }, [ratingHistory])

    const platformKeys = Object.keys(availablePlatforms)
    const [platform, setPlatform] = useState<string>(platformKeys[0] || "codeforces")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    // Get current data
    const currentData = useMemo(() => {
        if (!ratingHistory || !ratingHistory[platform]) return []
        return ratingHistory[platform]
    }, [ratingHistory, platform])

    // Compute Y-axis domain from real data
    const yDomain = useMemo(() => {
        if (currentData.length === 0) return [0, 2000]
        const ratings = currentData.map(d => d.rating)
        const min = Math.min(...ratings)
        const max = Math.max(...ratings)
        const padding = Math.max(50, Math.round((max - min) * 0.15))
        return [Math.max(0, min - padding), max + padding]
    }, [currentData])

    // No data — show empty state
    if (platformKeys.length === 0 || currentData.length === 0) {
        return (
            <div className="h-full flex flex-col bg-[#111113]/50 border border-white/[0.04] rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-orange-500/10 rounded-lg">
                        <Activity className="w-4 h-4 text-orange-400" />
                    </div>
                    <h3 className="font-bold text-gray-200">Rating Progression</h3>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                        <LinkIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium mb-1">No contest data yet</p>
                    <p className="text-gray-600 text-xs max-w-[200px]">
                        Connect your LeetCode or Codeforces account in Settings to see your rating progression.
                    </p>
                </div>
            </div>
        )
    }

    const latestContest = currentData[currentData.length - 1]
    const prevContest = currentData.length > 1 ? currentData[currentData.length - 2] : null
    const ratingDelta = prevContest ? latestContest.rating - prevContest.rating : 0

    return (
        <div className="h-full flex flex-col bg-[#111113]/50 border border-white/[0.04] rounded-2xl p-6 relative overflow-hidden group">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] -z-10 group-hover:bg-orange-500/10 transition-colors duration-700" />

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-orange-500/10 rounded-lg">
                            <Activity className="w-4 h-4 text-orange-400" />
                        </div>
                        <h3 className="font-bold text-gray-200">Rating Progression</h3>
                    </div>
                    <div className="flex items-baseline gap-2 mt-3">
                        <span className="text-4xl font-black text-white tracking-tight">
                            {latestContest.rating}
                        </span>
                        {ratingDelta !== 0 && (
                            <span className={`text-sm font-medium flex items-center ${ratingDelta > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {ratingDelta > 0 ? '+' : ''}{ratingDelta}
                                <span className="text-gray-500 ml-1 font-normal">last contest</span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Platform dropdown — only show if multiple platforms have data */}
                {platformKeys.length > 1 && (
                    <div className="relative z-20">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white transition-all shadow-sm"
                        >
                            <span className="font-medium text-gray-300">{availablePlatforms[platform]?.label}</span>
                            <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-full mt-2 w-36 bg-[#1a1a1c] border border-white/10 rounded-xl shadow-xl overflow-hidden z-30"
                                >
                                    {platformKeys.map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => {
                                                setPlatform(p)
                                                setIsDropdownOpen(false)
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${platform === p ? "bg-white/5 text-orange-400 font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                                        >
                                            {availablePlatforms[p]?.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Single platform badge */}
                {platformKeys.length === 1 && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-orange-400 bg-orange-400/10 px-2.5 py-1 rounded-full border border-orange-400/20">
                        {availablePlatforms[platform]?.label}
                    </span>
                )}
            </div>

            <div className="flex-1 w-full h-[220px] min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={currentData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff9f43" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ff9f43" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#ff9f43" />
                                <stop offset="100%" stopColor="#ff6b6b" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 10 }}
                            dy={10}
                        />
                        <YAxis
                            domain={yDomain}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 10 }}
                            dx={-10}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />

                        <Area
                            type="monotone"
                            dataKey="rating"
                            stroke="url(#lineGradient)"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRating)"
                            animationDuration={2000}
                        />

                        {/* Highlight point for the latest contest */}
                        <ReferenceDot
                            x={latestContest.date}
                            y={latestContest.rating}
                            r={4}
                            fill="#ff6b6b"
                            stroke="#fff"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom context bar for latest contest details */}
            <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4 text-gray-500">
                    <span className="flex items-center gap-1.5 text-gray-400">
                        <Trophy className="w-3.5 h-3.5 text-gray-500" />
                        Latest: <span className="text-white font-medium truncate max-w-[180px]">{latestContest.contest}</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">Rank #{latestContest.rank?.toLocaleString()}</span>
                </div>
                <span className="text-gray-600 text-[10px]">
                    {currentData.length} contest{currentData.length !== 1 ? 's' : ''}
                </span>
            </div>
        </div>
    )
}
