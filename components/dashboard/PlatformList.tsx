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

// Custom SVG Icons
const LeetCodeIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.415-1.337l-1.488-1.487c-.466-.467-1.111-.662-1.823-.662s-1.357.195-1.824.662l-4.332 4.363c-.467.467-.702 1.15-.702 1.863s.235 1.357.702 1.824l4.319 4.38c.467.467 1.125.645 1.837.645s1.357-.195 1.823-.662l1.488-1.487a5.055 5.055 0 0 0 2.415-1.337l2.609-2.636c.514-.515.496-1.366-.039-1.901-.535-.535-1.386-.553-1.9-.038z" />
    </svg>
)

const CodeforcesIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <rect x="14" y="3" width="6" height="18" rx="1" />
        <rect x="8" y="9" width="5" height="12" rx="1" />
        <rect x="2" y="14" width="5" height="7" rx="1" />
    </svg>
)

const HackerRankIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm5.424 16.5h-2.172v-3.774h-6.5v3.774H6.576V7.5h2.172v3.774h6.5V7.5h2.172v9z" />
    </svg>
)

const GeeksForGeeksIcon = (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0A12 12 0 1 0 24 12 12 12 0 0 0 12 0zm5.176 17.514L16.299 18.4l-4.298-4.298-4.299 4.298-.877-.886 4.299-4.299-4.299-4.298.877-.886 4.299 4.298 4.298-4.298.877.886-4.298 4.298 4.298 4.299z" />
    </svg>
)

const problemPlatforms = [
    { name: "LeetCode", icon: LeetCodeIcon, bgColor: "bg-yellow-900/30", iconColor: "text-yellow-400", connected: true, href: "https://leetcode.com/" },
    { name: "CodeChef", icon: ChefHat, bgColor: "bg-purple-900/30", iconColor: "text-purple-400", connected: true, href: "https://www.codechef.com/users/freakyyirus" },
    { name: "CodeForces", icon: CodeforcesIcon, bgColor: "bg-blue-900/30", iconColor: "text-blue-400", connected: true, href: "https://codeforces.com/profile/freakyyirus" },
    { name: "HackerRank", icon: HackerRankIcon, bgColor: "bg-green-900/30", iconColor: "text-green-400", connected: false, href: "https://www.hackerrank.com/profile/freakyyirus" },
    { name: "AtCoder", icon: Cpu, bgColor: "bg-gray-800", iconColor: "text-gray-400", connected: true, href: "https://atcoder.jp/" },
    { name: "GeeksForGeeks", icon: GeeksForGeeksIcon, bgColor: "bg-green-900/30", iconColor: "text-green-400", connected: true, href: "https://www.geeksforgeeks.org/profile/freakyyirus" },
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
