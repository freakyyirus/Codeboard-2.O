"use client"

import { Code, Trophy, Target } from "lucide-react"

export function PlatformStats() {
    return (
        <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-4 text-white">Platform Stats</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-900/30 rounded-lg flex items-center justify-center text-yellow-400">
                            <Code className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-300">LeetCode</span>
                    </div>
                    <span className="font-bold text-white">1,842</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-400">
                            <Target className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-300">Codeforces</span>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-white">1,432</div>
                        <div className="text-xs text-green-400">max</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function UpcomingContests() {
    return (
        <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-4 text-white">Upcoming Contests</h3>
            <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-900/20 to-transparent rounded-xl border border-blue-500/10">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded">Codeforces</span>
                        <span className="text-xs text-gray-400">In 2h</span>
                    </div>
                    <div className="font-medium text-sm text-gray-200">Round #932 (Div. 2)</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-yellow-900/20 to-transparent rounded-xl border border-yellow-500/10">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-yellow-400 bg-yellow-900/30 px-2 py-0.5 rounded">LeetCode</span>
                        <span className="text-xs text-gray-400">In 1d</span>
                    </div>
                    <div className="font-medium text-sm text-gray-200">Weekly Contest 386</div>
                </div>
            </div>
        </div>
    )
}

export function SkillDistribution() {
    const skills = [
        { name: "DP", level: 80, color: "bg-purple-500" },
        { name: "Graphs", level: 65, color: "bg-blue-500" },
        { name: "Trees", level: 90, color: "bg-green-500" },
    ]

    return (
        <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-4 text-white">Skill Distribution</h3>
            <div className="space-y-4">
                {skills.map((s) => (
                    <div key={s.name}>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">{s.name}</span>
                            <span className="text-white">{s.level}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.level}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
