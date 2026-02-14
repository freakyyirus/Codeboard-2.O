"use client"

import { Star } from "lucide-react"

interface RankingEntry {
    platform: string
    rating: number
    maxRating: number
    title?: string
}

interface ContestRankingsProps {
    rankings?: RankingEntry[]
}

export function ContestRankings({
    rankings = [
        { platform: "CODECHEF", rating: 1205, maxRating: 1205 },
        { platform: "CODEFORCES", rating: 636, maxRating: 636, title: "Newbie" },
    ],
}: ContestRankingsProps) {
    return (
        <div className="stat-card p-6">
            <h3 className="text-gray-400 font-medium mb-6 text-center">Contest Rankings</h3>
            <div className="space-y-6">
                {rankings.map((entry, i) => (
                    <div key={entry.platform} className={i > 0 ? "border-t border-[#1f1f1f] pt-4" : ""}>
                        <p className="text-sm text-gray-500 mb-2 text-center">{entry.platform}</p>
                        {entry.title && (
                            <p className="text-2xl font-bold text-center text-gray-500">{entry.title}</p>
                        )}
                        <div className="flex items-center justify-center gap-2 mt-1">
                            <Star className="w-4 h-4 text-gray-500" />
                            <span className="text-4xl font-bold text-white">{entry.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-1">(max : {entry.maxRating})</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
