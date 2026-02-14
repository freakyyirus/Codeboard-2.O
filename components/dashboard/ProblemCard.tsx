"use client"

import { CheckCircle, ArrowRight } from "lucide-react"

type Platform = "Codeforces" | "LeetCode" | "CodeChef" | "HackerRank" | "AtCoder"

interface ProblemCardProps {
    title: string
    platform: Platform
    difficulty: "Easy" | "Medium" | "Hard"
    tags: string[]
    lastAttempted?: string
    solvedBy?: string
    isSolved?: boolean
    id: string
}

const difficultyConfig = {
    Easy: { bg: "bg-green-500/20", text: "text-green-400" },
    Medium: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
    Hard: { bg: "bg-red-500/20", text: "text-red-400" },
}

export function ProblemCard({ title, platform, difficulty, tags, lastAttempted, solvedBy, isSolved, id }: ProblemCardProps) {
    const diffStyle = difficultyConfig[difficulty]

    return (
        <div className="group relative flex flex-col justify-between p-5 stat-card rounded-2xl h-[160px] cursor-pointer overflow-hidden card-hover">
            {/* Top Row */}
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-500 font-mono">{platform}</span>
                {isSolved && (
                    <CheckCircle className="w-5 h-5 text-green-400" strokeWidth={1.5} />
                )}
            </div>

            {/* Title */}
            <div>
                <h3 className="text-[15px] font-semibold text-gray-300 leading-tight line-clamp-2 mb-2 group-hover:text-white transition-colors duration-200">
                    {title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-2 text-xs">
                    <span className={`px-2 py-1 rounded ${diffStyle.bg} ${diffStyle.text}`}>
                        {difficulty}
                    </span>
                    <span className="text-gray-500 truncate max-w-[120px]">
                        {tags.join(", ")}
                    </span>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-auto pt-3 flex items-center justify-between text-xs text-gray-500 border-t border-white/5 group-hover:border-transparent transition-colors">
                <span className="group-hover:opacity-0 transition-opacity duration-200">
                    {lastAttempted ? `Last: ${lastAttempted}` : `Solved by ${solvedBy}`}
                </span>
                <button className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 text-white font-medium">
                    Solve <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
            </div>
        </div>
    )
}
