"use client"

import { CheckCircle, Circle, AlertCircle, List, ArrowRight } from "lucide-react"

const problems = [
    { title: "Two Sum", difficulty: "Easy", platform: "LeetCode", status: "solved", time: "2h ago" },
    { title: "Median of Two Sorted Arrays", difficulty: "Hard", platform: "LeetCode", status: "attempted", time: "5h ago" },
    { title: "Graph Valid Tree", difficulty: "Medium", platform: "Codeforces", status: "solved", time: "1d ago" },
    { title: "Coin Change", difficulty: "Medium", platform: "LeetCode", status: "solved", time: "2d ago" },
]

export function RecentProblems() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                    <List className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg text-white">Recent Problems</h3>
            </div>

            <div className="space-y-3 flex-1">
                {problems.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/20 transition-all group cursor-pointer relative overflow-hidden">
                        <div className="flex items-center gap-4 relative z-10">
                            <div className={`
                                w-10 h-10 rounded-xl flex items-center justify-center border border-white/5
                                ${p.status === 'solved' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}
                            `}>
                                {p.status === 'solved' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            </div>
                            <div>
                                <div className="font-medium text-sm text-gray-200 group-hover:text-blue-400 transition-colors">{p.title}</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] uppercase font-bold text-gray-500 bg-white/5 px-1.5 py-0.5 rounded">{p.platform}</span>
                                    <span className="text-[10px] text-gray-500">• {p.time}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 relative z-10">
                            <span className={`
                                text-[10px] font-bold px-2.5 py-1 rounded-lg border
                                ${p.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                                ${p.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : ''}
                                ${p.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                            `}>
                                {p.difficulty}
                            </span>
                        </div>

                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                ))}
            </div>

            <button className="w-full mt-4 py-3 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/5 hover:border-white/20 transition-all text-gray-400 hover:text-white flex items-center justify-center gap-2 group">
                View All Problems
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    )
}
