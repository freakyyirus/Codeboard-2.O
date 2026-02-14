"use client"

import { ChevronsRight } from "lucide-react"

const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"]
const heatmapData = [
    [0, 0, 0, 1],
    [2, 1, 0, 0],
    [0, 0, 0, 0],
    [1, 2, 0, 0],
    [3, 1, 2, 0],
    [4, 3, 2, 1],
    [0, 0, 0, 0],
]

interface ActivityHeatmapProps {
    submissions?: number
    maxStreak?: number
    currentStreak?: number
}

export function ActivityHeatmap({
    submissions = 29,
    maxStreak = 6,
    currentStreak = 0,
}: ActivityHeatmapProps) {
    return (
        <div className="stat-card p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>
                        Submissions <strong className="text-white">{submissions}</strong>
                    </span>
                    <span>
                        Max.Streak <strong className="text-white">{maxStreak}</strong>
                    </span>
                    <span>
                        Current.Streak{" "}
                        <strong className={currentStreak === 0 ? "text-red-400" : "text-green-400"}>
                            {currentStreak}
                        </strong>
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <select className="text-sm border border-[#1f1f1f] rounded-lg px-2 py-1 bg-[#1a1a1a] text-gray-300">
                        <option>Current</option>
                    </select>
                    <button className="text-gray-500 hover:text-gray-300">
                        <ChevronsRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex gap-3">
                {months.map((month, mi) => (
                    <div key={month} className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500 mb-1">{month}</span>
                        <div className="grid grid-cols-4 gap-1">
                            {heatmapData[mi].map((level, ci) => (
                                <div key={ci} className={`heatmap-cell heatmap-level-${level}`} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
