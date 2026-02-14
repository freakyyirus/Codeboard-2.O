"use client"

import { Calendar, ExternalLink, Clock } from "lucide-react"

interface Contest {
    id: number
    name: string
    startTimeSeconds: number
    durationSeconds: number
    platform: string
    url: string
}

export function ContestList({ contests }: { contests: Contest[] }) {
    // Merge real data with mock if needed, or just style the list
    const displayContests = contests.length > 0 ? contests : [
        { id: 1, name: "Weekly Contest 386", startTimeSeconds: Date.now() / 1000 + 86400, durationSeconds: 5400, platform: "LeetCode", url: "#" },
        { id: 2, name: "Codeforces Round #932 (Div. 2)", startTimeSeconds: Date.now() / 1000 + 172800, durationSeconds: 7200, platform: "Codeforces", url: "#" },
        { id: 3, name: "Biweekly Contest 124", startTimeSeconds: Date.now() / 1000 + 345600, durationSeconds: 5400, platform: "LeetCode", url: "#" },
        { id: 4, name: "AtCoder Beginner Contest 342", startTimeSeconds: Date.now() / 1000 + 518400, durationSeconds: 6000, platform: "AtCoder", url: "#" },
    ]

    return (
        <div className="space-y-4 max-w-4xl">
            {displayContests.map((c) => {
                const startDate = new Date(c.startTimeSeconds * 1000)
                const isLeetCode = c.platform === "LeetCode"
                const isCodeforces = c.platform === "Codeforces"

                return (
                    <div key={c.id} className="glass p-6 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all">
                        <div className="flex items-center gap-6">
                            <div className={`
                                w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold text-xl border
                                ${isLeetCode ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : ""}
                                ${isCodeforces ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : ""}
                                ${!isLeetCode && !isCodeforces ? "bg-white/5 text-gray-400 border-white/10" : ""}
                            `}>
                                <span>{startDate.getDate()}</span>
                                <span className="text-xs uppercase font-medium opacity-60">
                                    {startDate.toLocaleString('default', { month: 'short' })}
                                </span>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">
                                        {c.name}
                                    </h3>
                                    <span className={`
                                        text-[10px] uppercase font-bold px-2 py-0.5 rounded border
                                        ${isLeetCode ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : ""}
                                        ${isCodeforces ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : ""}
                                        ${!isLeetCode && !isCodeforces ? "bg-white/5 text-gray-400 border-white/10" : ""}
                                    `}>
                                        {c.platform}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" />
                                        {startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        {startDate.toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        Duration: {c.durationSeconds / 60}m
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                            Register
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                )
            })}
        </div>
    )
}
