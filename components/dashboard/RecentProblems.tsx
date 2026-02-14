"use client"

import { CheckCircle, Circle, AlertCircle } from "lucide-react"

const problems = [
    { title: "Two Sum", difficulty: "Easy", platform: "LeetCode", status: "solved", time: "2h ago" },
    { title: "Median of Two Sorted Arrays", difficulty: "Hard", platform: "LeetCode", status: "attempted", time: "5h ago" },
    { title: "Graph Valid Tree", difficulty: "Medium", platform: "Codeforces", status: "solved", time: "1d ago" },
    { title: "Coin Change", difficulty: "Medium", platform: "LeetCode", status: "solved", time: "2d ago" },
]

export function RecentProblems() {
    return (
        <div className="glass rounded-2xl p-6 h-full flex flex-col">
            <h3 className="font-semibold text-lg mb-6 text-white">Recent Problems</h3>
            <div className="space-y-3 flex-1">
                {problems.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                        <div className="flex items-center gap-3">
                            <div className={`
                                w-8 h-8 rounded-lg flex items-center justify-center
                                ${p.status === 'solved' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}
                            `}>
                                {p.status === 'solved' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            </div>
                            <div>
                                <div className="font-medium text-sm text-gray-200 group-hover:text-blue-400 transition-colors">{p.title}</div>
                                <div className="text-xs text-gray-500">{p.platform} • {p.time}</div>
                            </div>
                        </div>
                        <span className={`
                            text-xs px-2 py-1 rounded-md border
                            ${p.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                            ${p.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : ''}
                            ${p.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                        `}>
                            {p.difficulty}
                        </span>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-3 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                View All Problems
            </button>
        </div>
    )
}
