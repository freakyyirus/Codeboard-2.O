"use client"

import { useState, useEffect } from "react"
import { getContests, type Contest } from "@/lib/services/contests"
import { Calendar, Clock, ExternalLink, Filter, Loader2, Trophy, Search } from "lucide-react"

const PLATFORMS = [
    { id: "all", name: "All Platforms", color: "bg-white text-black" },
    { id: "leetcode.com", name: "LeetCode", color: "bg-[#FFA116]/20 text-[#FFA116] border-[#FFA116]/30" },
    { id: "codeforces.com", name: "Codeforces", color: "bg-[#FF0000]/20 text-[#FF0000] border-[#FF0000]/30" },
    { id: "codechef.com", name: "CodeChef", color: "bg-[#5B4638]/20 text-[#D0C3BC] border-[#5B4638]/30" },
    { id: "atcoder.jp", name: "AtCoder", color: "bg-white/10 text-white border-white/20" },
    { id: "geeksforgeeks.org", name: "GeeksforGeeks", color: "bg-[#2F8D46]/20 text-[#2F8D46] border-[#2F8D46]/30" },
    { id: "hackerrank.com", name: "HackerRank", color: "bg-[#2EC866]/20 text-[#2EC866] border-[#2EC866]/30" },
]

export default function ContestsPage() {
    const [contests, setContests] = useState<Contest[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("all")
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function load() {
            try {
                // In a real app we might want to fetch this server-side, 
                // but for client-side filtering simplicity we fetch here or via server action
                // For now, let's assume getContests is a server action or we wrap it
                // Since getContests is async, we can call it if it's a Server Action.
                // However, importing server action directly in client component works in Next.js.
                const data = await getContests()
                setContests(data)
            } catch (error) {
                console.error("Failed to load contests", error)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const filteredContests = contests.filter(c => {
        const matchesPlatform = filter === "all" || c.host === filter
        const matchesSearch = c.event.toLowerCase().includes(search.toLowerCase())
        return matchesPlatform && matchesSearch
    })

    const formatDuration = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600)
        const mins = Math.floor((seconds % 3600) / 60)
        return `${hrs}h ${mins > 0 ? `${mins}m` : ""}`
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "numeric"
        })
    }

    return (
        <div className="p-6 md:p-10 space-y-8 fade-in min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Trophy className="text-yellow-500" />
                        Contests Calendar
                    </h1>
                    <p className="text-gray-400 mt-1">Don't miss upcoming coding challenges from top platforms.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
                    {PLATFORMS.map(p => (
                        <button
                            key={p.id}
                            onClick={() => setFilter(p.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${filter === p.id
                                    ? "bg-white text-black border-white"
                                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search contests..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                </div>
            ) : filteredContests.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p>No contests found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredContests.map(contest => (
                        <div key={contest.id} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all group relative overflow-hidden">
                            {/* Platform Badge */}
                            <div className="absolute top-4 right-4">
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border ${PLATFORMS.find(p => p.id === contest.host)?.color || "bg-white/10 text-gray-400 border-white/10"
                                    }`}>
                                    {contest.host.replace(".com", "").replace(".org", "").replace(".jp", "")}
                                </span>
                            </div>

                            <div className="mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-3">
                                    <Calendar className="w-5 h-5 text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1" title={contest.event}>
                                    {contest.event}
                                </h3>
                            </div>

                            <div className="space-y-3 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatDuration(contest.duration)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                    <span>Starts: <span className="text-gray-300">{formatDate(contest.start)}</span></span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                <span className="text-xs font-mono text-gray-600">ID: {contest.id}</span>
                                <a
                                    href={contest.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-sm font-medium text-white hover:text-blue-400 transition-colors"
                                >
                                    Register <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
