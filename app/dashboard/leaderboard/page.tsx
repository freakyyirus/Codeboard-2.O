"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LeaderboardPodium } from "@/components/leaderboard/LeaderboardPodium"
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable"
import { FadeIn } from "@/components/ui/PremiumEffects"
import { Globe } from "lucide-react"

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
    }, [metric])

    const top3 = rankedUsers.slice(0, 3)
    const rest = rankedUsers.slice(3)

    return (
        <div className="p-6 md:p-10 max-w-7xl space-y-5 min-h-screen">
            {/* Header */}
            <FadeIn>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
                        <p className="text-gray-500">Top performers across all platforms</p>
                    </div>

                    <div className="flex bg-[#111] p-1 rounded-lg border border-white/10 self-start md:self-auto">
                        <button
                            onClick={() => setMetric("total")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${metric === "total" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"
                                }`}
                        >
                            Total Questions
                        </button>
                        <button
                            onClick={() => setMetric("cscore")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${metric === "cscore" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"
                                }`}
                        >
                            C Score
                        </button>
                        <button
                            onClick={() => setMetric("leetcode")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${metric === "leetcode" ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"
                                }`}
                        >
                            LeetCode Rating
                        </button>
                    </div>
                </div>
            </FadeIn>

            <AnimatePresence mode="wait">
                <motion.div
                    key={metric}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="space-y-5"
                >
                    {/* Podium */}
                    <LeaderboardPodium top3={top3} />

                    {/* Global Ranking Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Globe className="w-5 h-5 text-gray-500" />
                            Global Ranking <span className="text-gray-500 text-sm font-normal">({metricConfig[metric].label})</span>
                        </h2>
                        <div className="text-sm text-gray-500">Updated hourly</div>
                    </div>

                    {/* Table */}
                    <div>
                        <LeaderboardTable users={rest} metricLabel={metricConfig[metric].label} />
                    </div>
                </motion.div>
            </AnimatePresence>

        </div>
    )
}
