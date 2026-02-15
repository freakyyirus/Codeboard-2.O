"use client"

import { Code, Trophy, Target, Zap, Calendar, TrendingUp } from "lucide-react"

export function PlatformStats() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Trophy className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg text-white">Platform Stats</h3>
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5 group">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-900/20 rounded-lg flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                            <Code className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-300">LeetCode</span>
                    </div>
                    <span className="font-bold text-white">1,842</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5 group">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                            <Target className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-300">Codeforces</span>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-white">1,432</div>
                        <div className="text-[10px] text-green-400">max rating</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function UpcomingContests() {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="font-semibold text-lg text-white">Upcoming Contests</h3>
            </div>
            <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-500/10 to-transparent hover:from-blue-500/20 transition-colors rounded-xl border border-blue-500/10 group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/20">Codeforces</span>
                        <span className="text-xs text-gray-400 font-mono">In 2h 15m</span>
                    </div>
                    <div className="font-medium text-sm text-gray-200 group-hover:text-white transition-colors">Round #932 (Div. 2)</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-transparent hover:from-yellow-500/20 transition-colors rounded-xl border border-yellow-500/10 group cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-yellow-300 bg-yellow-500/20 px-2 py-0.5 rounded border border-yellow-500/20">LeetCode</span>
                        <span className="text-xs text-gray-400 font-mono">In 1d 4h</span>
                    </div>
                    <div className="font-medium text-sm text-gray-200 group-hover:text-white transition-colors">Weekly Contest 386</div>
                </div>
            </div>
        </div>
    )
}

export function SkillDistribution() {
    const skills = [
        { name: "DP", level: 80, color: "bg-purple-500", track: "bg-purple-500/20" },
        { name: "Graphs", level: 65, color: "bg-blue-500", track: "bg-blue-500/20" },
        { name: "Trees", level: 90, color: "bg-green-500", track: "bg-green-500/20" },
    ]

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-green-500/10 rounded-lg">
                    <Zap className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-semibold text-lg text-white">Skill Distribution</h3>
            </div>
            <div className="space-y-5">
                {skills.map((s) => (
                    <div key={s.name} className="group">
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-gray-400 font-medium">{s.name}</span>
                            <span className="text-white font-mono">{s.level}%</span>
                        </div>
                        <div className={`h-2 ${s.track} rounded-full overflow-hidden`}>
                            <div
                                className={`h-full ${s.color} rounded-full relative group-hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-500`}
                                style={{ width: `${s.level}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
