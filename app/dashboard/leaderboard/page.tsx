"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LeaderboardPodium } from "@/components/leaderboard/LeaderboardPodium"
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable"
import { FadeIn } from "@/components/ui/PremiumEffects"
import { Globe, Trophy, Sparkles, Users } from "lucide-react"

// Mock Data
const MOCK_USERS = [
    { rank: 1, username: "Bhanu Karnwal", handle: "Cheeku", score: 11923, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bhanu" },
    { rank: 2, username: "Deepak", handle: "phoenixdev100", score: 11041, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak" },
    { rank: 3, username: "Anonymous", handle: "anon_coder", score: 8829, avatar: "" },
    { rank: 4, username: "Alex Chen", handle: "achen_dev", score: 7520, avatar: "" },
    { rank: 5, username: "Sarah Smith", handle: "ssmith_code", score: 6200, avatar: "" },
    { rank: 6, username: "Mike Johnson", handle: "mjohnson", score: 5800, avatar: "" },
    { rank: 7, username: "Emily Davis", handle: "edavis_99", score: 5100, avatar: "" },
    { rank: 8, username: "Chris Lee", handle: "clee_tech", score: 4900, avatar: "" },
    { rank: 9, username: "Priya Sharma", handle: "priya_algo", score: 4600, avatar: "" },
    { rank: 10, username: "Raj Patel", handle: "raj_codes", score: 4200, avatar: "" },
]

export default function LeaderboardPage() {
    const [metric, setMetric] = useState<"total" | "cscore" | "leetcode">("total")

    const metricConfig = {
        total: { label: "Total Questions", getValue: (score: number) => score },
        cscore: { label: "C Score", getValue: (score: number) => Math.round(score * 0.85) },
        leetcode: { label: "LeetCode Rating", getValue: (score: number) => Math.round(score / 5) },
    }

    const rankedUsers = useMemo(() => {
        const config = metricConfig[metric]
        return [...MOCK_USERS]
            .map((u) => ({ ...u, metricValue: config.getValue(u.score) }))
            .sort((a, b) => b.metricValue - a.metricValue)
            .map((u, index) => ({ ...u, rank: index + 1 }))
    }, [metric, metricConfig])

    const top3 = rankedUsers.slice(0, 3)
    const rest = rankedUsers.slice(3)

    const tabs = [
        { key: "total" as const, label: "Total Questions", icon: Sparkles },
        { key: "cscore" as const, label: "C Score", icon: Trophy },
        { key: "leetcode" as const, label: "LeetCode", icon: Globe },
    ]

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 min-h-screen">
            {/* Header */}
            <FadeIn>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                            <Trophy className="w-7 h-7 text-yellow-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
                            <p className="text-gray-500 text-sm mt-1">Top performers across all platforms</p>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            <span>{MOCK_USERS.length} competitors</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-700 rounded-full" />
                        <span>Updated hourly</span>
                    </div>
                </div>
            </FadeIn>

            {/* Metric Tabs */}
            <div className="flex bg-white/[0.03] p-1 rounded-xl border border-white/5 w-fit">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setMetric(tab.key)}
                        className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${metric === tab.key ? "text-white" : "text-gray-500 hover:text-gray-300"
                            }`}
                    >
                        {metric === tab.key && (
                            <motion.div
                                layoutId="leaderboard-tab"
                                className="absolute inset-0 bg-white/10 rounded-lg"
                                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                            />
                        )}
                        <tab.icon className="w-4 h-4 relative z-10" />
                        <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={metric}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="space-y-6"
                >
                    {/* Podium */}
                    <LeaderboardPodium top3={top3} />

                    {/* Global Ranking Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-white flex items-center gap-2">
                            <Globe className="w-4 h-4 text-gray-500" />
                            Global Ranking
                            <span className="text-gray-600 text-xs font-normal ml-1">({metricConfig[metric].label})</span>
                        </h2>
                    </div>

                    {/* Table */}
                    <LeaderboardTable users={rest} metricLabel={metricConfig[metric].label} />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
