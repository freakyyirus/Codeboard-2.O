"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ExternalLink, ChevronRight, Clock } from "lucide-react"

interface Hackathon {
    id: string
    title: string
    platform: string
    start: string
    end: string
    url: string
    status: 'active' | 'upcoming' | 'past'
}

export function ContestStats({ hackathons = [] }: { hackathons?: Hackathon[] }) {
    const [filter, setFilter] = useState<'active' | 'upcoming' | 'past'>('upcoming')

    const filteredHackathons = useMemo(() => {
        if (!hackathons) return []
        return hackathons.filter(h => h.status === filter)
    }, [hackathons, filter])

    // Group by Date
    const groupedHackathons = useMemo(() => {
        const groups: Record<string, Hackathon[]> = {}
        filteredHackathons.forEach(h => {
            const date = new Date(h.start).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
            })
            if (!groups[date]) groups[date] = []
            groups[date].push(h)
        })
        return groups
    }, [filteredHackathons])

    return (
        <div className="bg-[#111] border border-white/10 rounded-xl flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-500/10 rounded-md">
                        <Calendar className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="font-semibold text-sm text-white">Hackathons</span>
                </div>

                {/* Tabs */}
                <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/5">
                    {(['active', 'upcoming', 'past'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-3 py-1 text-[10px] font-medium rounded-md transition-all ${filter === tab
                                ? "bg-white/10 text-white shadow-sm"
                                : "text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-hide">
                <AnimatePresence mode="popLayout">
                    {Object.entries(groupedHackathons).length > 0 ? (
                        Object.entries(groupedHackathons).map(([date, items]) => (
                            <motion.div
                                key={date}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-1"
                            >
                                <div className="text-[10px] font-mono text-gray-500 px-2 py-1 sticky top-0 bg-[#111]/95 backdrop-blur-sm z-10 border-b border-dashed border-white/5">
                                    {date}
                                </div>
                                <div className="space-y-1">
                                    {items.map(item => (
                                        <div
                                            key={item.id}
                                            className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all cursor-pointer"
                                            onClick={() => window.open(item.url, '_blank')}
                                        >
                                            <div className="flex items-center gap-3">
                                                {/* Platform Badge */}
                                                <div className={`w-1.5 h-8 rounded-full ${item.platform === 'hackerearth' ? 'bg-blue-500' :
                                                        item.platform === 'unstop' ? 'bg-orange-500' :
                                                            item.platform === 'devfolio' ? 'bg-indigo-500' :
                                                                item.platform === 'hack2skill' ? 'bg-green-500' :
                                                                    'bg-gray-500'
                                                    }`} />

                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                                                        {item.title}
                                                    </span>
                                                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                                        <span className="capitalize">{item.platform}</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {new Date(item.start).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 text-gray-500 gap-2">
                            <Trophy className="w-8 h-8 opacity-20" />
                            <span className="text-xs">No {filter} hackathons</span>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

function Trophy(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
    )
}
