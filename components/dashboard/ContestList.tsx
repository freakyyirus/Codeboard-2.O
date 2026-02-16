"use client"

import { useState, useMemo } from "react"
import { Calendar, ExternalLink, Clock, Timer, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Contest {
    id: number
    event: string
    href: string
    resource: string
    start: string // ISO
    end: string // ISO
    duration: number // seconds
}

export function ContestList({ contests }: { contests: Contest[] }) {
    const [filter, setFilter] = useState<'active' | 'upcoming' | 'past'>('upcoming')

    // Filter Logic
    const filteredContests = useMemo(() => {
        const now = new Date()
        const active: Contest[] = []
        const upcoming: Contest[] = []
        const past: Contest[] = []

        contests.forEach(c => {
            const start = new Date(c.start)
            const end = new Date(c.end)

            if (now >= start && now <= end) {
                active.push(c)
            } else if (now < start) {
                upcoming.push(c)
            } else {
                past.push(c)
            }
        })

        // Sort: Active/Upcoming by start (asc), Past by end (desc)
        active.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
        upcoming.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
        past.sort((a, b) => new Date(b.end).getTime() - new Date(a.end).getTime())

        if (filter === 'active') return active
        if (filter === 'upcoming') return upcoming
        return past
    }, [contests, filter])

    // Helper for styling
    const getPlatformStyle = (resource: string) => {
        if (resource.includes("leetcode")) return { color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20", label: "LeetCode" }
        if (resource.includes("codeforces")) return { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", label: "Codeforces" }
        if (resource.includes("codechef")) return { color: "text-orange-900", bg: "bg-orange-800/20", border: "border-orange-800/30", label: "CodeChef" }
        if (resource.includes("atcoder")) return { color: "text-gray-300", bg: "bg-white/10", border: "border-white/20", label: "AtCoder" }
        if (resource.includes("hackerrank")) return { color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20", label: "HackerRank" }
        return { color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", label: resource.split('.')[0] }
    }

    // Helper for duration
    const formatDuration = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        if (h > 24) return `${Math.floor(h / 24)} days`
        return `${h}h ${m > 0 ? `${m}m` : ''}`
    }

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                {(['active', 'upcoming', 'past'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${filter === tab
                                ? "bg-white/10 text-white"
                                : "text-gray-500 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)} ({
                            tab === 'active' ? contests.filter(c => new Date() >= new Date(c.start) && new Date() <= new Date(c.end)).length :
                                tab === 'upcoming' ? contests.filter(c => new Date() < new Date(c.start)).length :
                                    contests.filter(c => new Date() > new Date(c.end)).length
                        })
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {filteredContests.length > 0 ? (
                        filteredContests.map((c) => {
                            const style = getPlatformStyle(c.resource)
                            const start = new Date(c.start)
                            const end = new Date(c.end)

                            return (
                                <motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    layout
                                    className="group relative bg-[#111] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center gap-6"
                                >
                                    {/* Date Box */}
                                    <div className={`
                                        hidden md:flex flex-col items-center justify-center w-16 h-16 rounded-xl border font-bold text-xl
                                        ${style.bg} ${style.color} ${style.border}
                                    `}>
                                        <span>{start.getDate()}</span>
                                        <span className="text-[10px] uppercase opacity-70">
                                            {start.toLocaleString('default', { month: 'short' })}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${style.bg} ${style.color} ${style.border}`}>
                                                {style.label}
                                            </span>
                                            {filter === 'active' && (
                                                <span className="flex items-center gap-1 text-[10px] text-green-400 font-medium animate-pulse">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                    LIVE
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                                            {c.event}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {start.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {start.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Timer className="w-3.5 h-3.5" />
                                                {formatDuration(c.duration)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <a
                                        href={c.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 md:mt-0 px-5 py-2.5 bg-white/5 hover:bg-white text-white hover:text-black text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 group/btn"
                                    >
                                        {filter === 'past' ? 'View Details' : 'Register'}
                                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                    </a>
                                </motion.div>
                            )
                        })
                    ) : (
                        <div className="text-center py-20 bg-white/[0.02] rounded-2xl border border-white/5 border-dashed">
                            <CheckCircle2 className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500">No {filter} contests found</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
