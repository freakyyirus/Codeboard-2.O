"use client"

import { useState, useEffect } from "react"
import { getHackathons, type Hackathon } from "@/lib/services/hackathons"
import { Calendar, ExternalLink, MapPin, Loader2, Trophy, Search, Gift } from "lucide-react"

const PLATFORMS = [
    { id: "all", name: "All Platforms", color: "bg-white text-black" },
    { id: "Devfolio", name: "Devfolio", color: "bg-[#3770FF]/20 text-[#3770FF] border-[#3770FF]/30" },
    { id: "Unstop", name: "Unstop", color: "bg-[#1C4980]/20 text-[#60A5FA] border-[#1C4980]/30" },
    { id: "Devpost", name: "Devpost", color: "bg-[#003E54]/20 text-[#00E4B2] border-[#003E54]/30" },
    { id: "HackerEarth", name: "HackerEarth", color: "bg-[#2A3449]/20 text-[#324b6e] border-[#2A3449]/30" },
]

export default function HackathonsPage() {
    const [hackathons, setHackathons] = useState<Hackathon[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("all")
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function load() {
            try {
                const data = await getHackathons()
                setHackathons(data)
            } catch (error) {
                console.error("Failed to load hackathons", error)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const filteredHackathons = hackathons.filter(h => {
        const matchesPlatform = filter === "all" || h.host === filter
        const matchesSearch = h.title.toLowerCase().includes(search.toLowerCase())
        return matchesPlatform && matchesSearch
    })

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short", day: "numeric"
        })
    }

    return (
        <div className="p-6 md:p-10 space-y-8 fade-in min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Trophy className="text-purple-500" />
                        Hackathons
                    </h1>
                    <p className="text-gray-400 mt-1">Participate in global hackathons and win prizes.</p>
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
                        placeholder="Search hackathons..."
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
            ) : filteredHackathons.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p>No hackathons found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHackathons.map(hack => (
                        <div key={hack.id} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group flex flex-col h-full">
                            {/* Image Header */}
                            <div className="h-40 bg-gray-800 relative overflow-hidden">
                                {hack.image ? (
                                    <img src={hack.image} alt={hack.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
                                        <Trophy className="w-12 h-12 text-white/20" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md border ${hack.status === "Live" ? "bg-red-500/20 text-red-500 border-red-500/30 animate-pulse" :
                                            "bg-black/60 text-white backdrop-blur-md border-white/10"
                                        }`}>
                                        {hack.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight group-hover:text-purple-400 transition-colors">
                                        {hack.title}
                                    </h3>
                                </div>

                                <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] border ${PLATFORMS.find(p => p.id === hack.host)?.color || "bg-gray-700 text-gray-300"
                                        }`}>
                                        {hack.host}
                                    </span>
                                    <span className="text-xs">•</span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {hack.mode}
                                    </span>
                                </div>

                                <div className="space-y-3 mt-auto">
                                    <div className="flex items-center justify-between text-sm text-gray-300 bg-white/5 p-2 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <span>{formatDate(hack.startDate)} - {formatDate(hack.endDate)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-1.5 text-yellow-500">
                                            <Gift className="w-4 h-4" />
                                            <span className="font-semibold">{hack.prize}</span>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href={hack.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 w-full py-2.5 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all"
                                >
                                    Participate <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
