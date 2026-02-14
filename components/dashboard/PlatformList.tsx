"use client"

import {
    Code,
    ChefHat,
    BarChart2,
    Shield,
    Cpu,
    Github,
    CheckCircle,
    AlertTriangle,
    ExternalLink,
    Plus,
    ChevronUp,
} from "lucide-react"

const problemPlatforms = [
    { name: "LeetCode", icon: Code, bgColor: "bg-yellow-900/30", iconColor: "text-yellow-400", connected: true, href: "https://leetcode.com/" },
    { name: "CodeChef", icon: ChefHat, bgColor: "bg-purple-900/30", iconColor: "text-purple-400", connected: true, href: "https://www.codechef.com/users/freakyyirus" },
    { name: "CodeForces", icon: BarChart2, bgColor: "bg-blue-900/30", iconColor: "text-blue-400", connected: true, href: "https://codeforces.com/profile/freakyyirus" },
    { name: "HackerRank", icon: Shield, bgColor: "bg-green-900/30", iconColor: "text-green-400", connected: false, href: "https://www.hackerrank.com/profile/freakyyirus" },
    { name: "AtCoder", icon: Cpu, bgColor: "bg-gray-800", iconColor: "text-gray-400", connected: true, href: "https://atcoder.jp/" },
    { name: "GeeksForGeeks", icon: Code, bgColor: "bg-green-900/30", iconColor: "text-green-400", connected: true, href: "https://www.geeksforgeeks.org/profile/freakyyirus" },
]

const devPlatforms = [
    { name: "GitHub", icon: Github, bgColor: "bg-gray-700", iconColor: "text-white", connected: true, href: "https://github.com/freakyyirus" },
]

export function PlatformList() {
    return (
        <div className="space-y-6">
            {/* Problem Solving Stats */}
            <div>
                <button className="w-full flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                    <span className="font-medium text-sm text-gray-300">Problem Solving Stats</span>
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                </button>
                <div className="mt-3 space-y-3">
                    {problemPlatforms.map((p) => (
                        <a
                            key={p.name}
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 hover:bg-[#1a1a1a] rounded-lg transition-colors cursor-pointer block"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 ${p.bgColor} rounded-lg flex items-center justify-center`}>
                                    <p.icon className={`w-4 h-4 ${p.iconColor}`} />
                                </div>
                                <span className="font-medium text-sm text-gray-300">{p.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {p.connected ? (
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                ) : (
                                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                )}
                                <ExternalLink className="w-4 h-4 text-gray-500" />
                            </div>
                        </a>
                    ))}
                </div>
                <button className="w-full mt-3 py-2.5 border-2 border-dashed border-orange-800 text-orange-400 rounded-xl font-medium hover:bg-orange-900/20 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Plus className="w-4 h-4" />
                    Add Platform
                </button>
            </div>

            {/* Development Stats */}
            <div>
                <button className="w-full flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#222] transition-colors">
                    <span className="font-medium text-sm text-gray-300">Development Stats</span>
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                </button>
                <div className="mt-3">
                    {devPlatforms.map((p) => (
                        <a
                            key={p.name}
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 hover:bg-[#1a1a1a] rounded-lg transition-colors cursor-pointer block"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 ${p.bgColor} rounded-lg flex items-center justify-center`}>
                                    <p.icon className={`w-4 h-4 ${p.iconColor}`} />
                                </div>
                                <span className="font-medium text-sm text-gray-300">{p.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <ExternalLink className="w-4 h-4 text-gray-500" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-orange-900/20 border border-orange-800/30 rounded-xl p-4">
                <h4 className="font-semibold text-orange-300 mb-1">Leaderboard</h4>
                <p className="text-xs text-orange-400/70 mb-3">Based on C Score</p>
                <button className="w-full py-2.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors text-sm">
                    View Leaderboard
                </button>
            </div>
        </div>
    )
}
