"use client"

import { Code, Trophy, Target, Zap, Calendar, TrendingUp } from "lucide-react"

export function PlatformStats({ stats }: { stats?: any }) {
    const leetCodeCount = stats?.leetcode?.totalSolved || 0
    const codeforcesRating = stats?.codeforces?.rating || 0

    // Authentic SVGs
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

    // Dynamic list of other platforms
    const otherPlatforms = [
        { key: 'codechef', label: 'CodeChef', icon: Trophy, color: 'text-orange-500', bg: 'bg-orange-900/20' },
        { key: 'atcoder', label: 'AtCoder', icon: Target, color: 'text-white', bg: 'bg-gray-800' },
        { key: 'hackerrank', label: 'HackerRank', icon: HackerRankIcon, color: 'text-green-500', bg: 'bg-green-900/20' },
    ]

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Trophy className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg text-white">Platform Stats</h3>
            </div>
            <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                {/* LeetCode (Always Show) */}
                <div className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5 group">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-900/20 rounded-lg flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                            <LeetCodeIcon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-300">LeetCode</span>
                    </div>
                    <div className="text-right">
                        <span className="font-bold text-white">{leetCodeCount}</span>
                        <div className="text-[10px] text-gray-500">problems</div>
                    </div>
                </div>

                {/* Codeforces (Always Show) */}
                <div className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5 group">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                            <CodeforcesIcon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-gray-300">Codeforces</span>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-white">{codeforcesRating || '—'}</div>
                        <div className="text-[10px] text-green-400">{codeforcesRating > 0 ? 'max rating' : 'not connected'}</div>
                    </div>
                </div>

                {/* Other Platforms (Dynamic) */}
                {otherPlatforms.map(p => {
                    const data = stats?.[p.key];
                    if (!data) return null; // Only show if data exists (connected)

                    return (
                        <div key={p.key} className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl border border-white/5 group">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 ${p.bg} rounded-lg flex items-center justify-center ${p.color} group-hover:scale-110 transition-transform`}>
                                    <p.icon className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium text-gray-300">{p.label}</span>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-white">{data.rating}</div>
                                <div className="text-[10px] text-gray-500">{data.rank || 'rated'}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

interface Contest {
    id: string | number;
    title: string;
    platform: string;
    start: string;
    end: string;
    url: string;
}

export function UpcomingContests({ contests = [] }: { contests?: Contest[] }) {
    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="font-semibold text-lg text-white">Upcoming Contests</h3>
            </div>
            <div className="space-y-3">
                {contests.length === 0 ? (
                    <div className="text-sm text-gray-500 text-center py-8">
                        No upcoming contests found.
                    </div>
                ) : (
                    contests.slice(0, 3).map((contest, index) => (
                        <a 
                            key={contest.id || index} 
                            href={contest.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 bg-gradient-to-r from-blue-500/10 to-transparent hover:from-blue-500/20 transition-colors rounded-xl border border-blue-500/10 group cursor-pointer relative overflow-hidden"
                        >
                            {index === 0 && (
                                <div className="absolute top-0 right-0 p-1">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                </div>
                            )}
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                    contest.platform.toLowerCase() === 'leetcode' 
                                        ? 'text-yellow-300 bg-yellow-500/20 border-yellow-500/20'
                                    : contest.platform.toLowerCase() === 'codeforces'
                                        ? 'text-blue-300 bg-blue-500/20 border-blue-500/20'
                                    : 'text-purple-300 bg-purple-500/20 border-purple-500/20'
                                }`}>
                                    {contest.platform}
                                </span>
                                <span className="text-xs text-gray-400 font-mono">
                                    {new Date(contest.start).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="font-medium text-sm text-gray-200 group-hover:text-white transition-colors line-clamp-1">
                                {contest.title}
                            </div>
                        </a>
                    ))
                )}
            </div>
        </div>
    )
}

export function SkillDistribution({ stats }: { stats?: any }) {
    const easy = stats?.leetcode?.easySolved || 0
    const medium = stats?.leetcode?.mediumSolved || 0
    const hard = stats?.leetcode?.hardSolved || 0
    const total = easy + medium + hard || 1 // Avoid divide by zero

    // Calculate percentages for the bar width
    const easyPct = Math.round((easy / total) * 100)
    const mediumPct = Math.round((medium / total) * 100)
    const hardPct = Math.round((hard / total) * 100)

    const skills = [
        { name: "Easy", level: easyPct, count: easy, color: "bg-green-500", track: "bg-green-500/20" },
        { name: "Medium", level: mediumPct, count: medium, color: "bg-yellow-500", track: "bg-yellow-500/20" },
        { name: "Hard", level: hardPct, count: hard, color: "bg-red-500", track: "bg-red-500/20" },
    ]

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-green-500/10 rounded-lg">
                    <Zap className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-semibold text-lg text-white">Difficulty Split</h3>
            </div>
            <div className="space-y-5">
                {skills.map((s) => (
                    <div key={s.name} className="group">
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-gray-400 font-medium">{s.name}</span>
                            <span className="text-white font-mono">{s.count} ({s.level}%)</span>
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
