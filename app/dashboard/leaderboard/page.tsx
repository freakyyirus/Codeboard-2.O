"use client"

import { LeaderboardPodium } from "@/components/leaderboard/LeaderboardPodium"
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable"
import { FadeIn } from "@/components/ui/PremiumEffects"
import { Rocket, Globe } from "lucide-react"

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
    const top3 = MOCK_USERS.slice(0, 3)
    const rest = MOCK_USERS.slice(3)

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6 min-h-screen">
            {/* Header */}
            <FadeIn>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
                        <p className="text-gray-500">Top performers across all platforms</p>
                    </div>

                    <div className="flex bg-[#111] p-1 rounded-lg border border-white/10 self-start md:self-auto">
                        <button className="px-4 py-2 bg-white/10 text-white rounded-md text-sm font-medium transition-colors">Total Questions</button>
                        <button className="px-4 py-2 text-gray-500 hover:text-white transition-colors text-sm font-medium">C Score</button>
                        <button className="px-4 py-2 text-gray-500 hover:text-white transition-colors text-sm font-medium">LeetCode Rating</button>
                    </div>
                </div>
            </FadeIn>



            {/* Podium */}
            <LeaderboardPodium top3={top3} />

            {/* Global Ranking Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-gray-500" />
                    Global Ranking <span className="text-gray-500 text-sm font-normal">(Total Questions)</span>
                </h2>
                <div className="text-sm text-gray-500">Updated hourly</div>
            </div>

            {/* Table */}
            <div>
                <LeaderboardTable users={rest} />
            </div>

        </div>
    )
}
