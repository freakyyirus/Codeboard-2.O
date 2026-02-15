"use client"

import { useState, useEffect } from "react"
import {
    CalendarDays,
    MapPin,
    Clock,
    ExternalLink,
    Trophy,
    Globe,
    Monitor,
    Users,
    Filter,
    Loader2,
    Rocket,
} from "lucide-react"

/* ─── Types ────────────────────────────────────── */

interface Hackathon {
    id: string
    name: string
    source: "devfolio" | "unstop" | "mlh" | "other"
    url: string
    start_date: string
    end_date: string
    mode: "online" | "offline" | "hybrid"
    prize: string
    image_url: string
    description: string
    status: "upcoming" | "ongoing" | "ended"
}

/* ─── Mock Data ────────────────────────────────── */

const MOCK_HACKATHONS: Hackathon[] = [
    {
        id: "1", name: "ETHIndia 2026", source: "devfolio", url: "https://devfolio.co/hackathons/ethindia2026",
        start_date: "2026-03-15T00:00:00Z", end_date: "2026-03-17T00:00:00Z",
        mode: "offline", prize: "$50,000", image_url: "", description: "India's largest Ethereum hackathon",
        status: "upcoming"
    },
    {
        id: "2", name: "HackTheBox CTF", source: "other", url: "https://hackthebox.com",
        start_date: "2026-03-01T00:00:00Z", end_date: "2026-03-03T00:00:00Z",
        mode: "online", prize: "$10,000", image_url: "", description: "Capture the flag competition",
        status: "upcoming"
    },
    {
        id: "3", name: "Unstop Innovation Challenge", source: "unstop", url: "https://unstop.com",
        start_date: "2026-02-20T00:00:00Z", end_date: "2026-02-28T00:00:00Z",
        mode: "online", prize: "₹5,00,000", image_url: "", description: "Build innovative solutions for real-world problems",
        status: "ongoing"
    },
    {
        id: "4", name: "MLH Global Hack Week", source: "mlh", url: "https://mlh.io",
        start_date: "2026-03-10T00:00:00Z", end_date: "2026-03-17T00:00:00Z",
        mode: "online", prize: "Prizes + Swag", image_url: "", description: "A week-long celebration of building",
        status: "upcoming"
    },
    {
        id: "5", name: "Smart India Hackathon 2026", source: "unstop", url: "https://sih.gov.in",
        start_date: "2026-04-01T00:00:00Z", end_date: "2026-04-03T00:00:00Z",
        mode: "hybrid", prize: "₹1,00,000 per team", image_url: "", description: "Government of India's flagship hackathon",
        status: "upcoming"
    },
    {
        id: "6", name: "Google Summer of Code 2026", source: "other", url: "https://summerofcode.withgoogle.com",
        start_date: "2026-05-01T00:00:00Z", end_date: "2026-08-31T00:00:00Z",
        mode: "online", prize: "Stipend", image_url: "", description: "Contribute to open source with Google",
        status: "upcoming"
    },
]

const SOURCE_COLORS: Record<string, { bg: string; text: string }> = {
    devfolio: { bg: "bg-blue-500/10", text: "text-blue-400" },
    unstop: { bg: "bg-orange-500/10", text: "text-orange-400" },
    mlh: { bg: "bg-red-500/10", text: "text-red-400" },
    other: { bg: "bg-purple-500/10", text: "text-purple-400" },
}

const MODE_ICONS: Record<string, React.ReactNode> = {
    online: <Globe size={14} />,
    offline: <MapPin size={14} />,
    hybrid: <Monitor size={14} />,
}

/* ─── Component ────────────────────────────────── */

export default function HackathonsPage() {
    const [filter, setFilter] = useState<"all" | "devfolio" | "unstop" | "mlh" | "other">("all")
    const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "ongoing">("all")
    const [hackathons] = useState(MOCK_HACKATHONS)

    const filtered = hackathons.filter(h => {
        if (filter !== "all" && h.source !== filter) return false
        if (statusFilter !== "all" && h.status !== statusFilter) return false
        return true
    })

    const formatDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })

    const getDaysUntil = (d: string) => {
        const diff = Math.ceil((new Date(d).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        if (diff < 0) return "Started"
        if (diff === 0) return "Today!"
        return `${diff} days`
    }

    return (
        <div className="max-w-6xl p-6 md:p-8 fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Rocket className="w-7 h-7 text-orange-400" />
                        Hackathons
                    </h1>
                    <p className="text-gray-500 text-sm">Upcoming hackathons from Devfolio, Unstop, MLH, and more.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
                    {["all", "devfolio", "unstop", "mlh", "other"].map(s => (
                        <button
                            key={s}
                            onClick={() => setFilter(s as any)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${filter === s ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {s === "all" ? "All Sources" : s === "mlh" ? "MLH" : s}
                        </button>
                    ))}
                </div>
                <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
                    {["all", "upcoming", "ongoing"].map(s => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s as any)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${statusFilter === s ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {s === "all" ? "All" : s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Hackathon Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(h => (
                    <div key={h.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group">
                        {/* Header Band */}
                        <div className={`h-2 ${h.status === "ongoing" ? "bg-green-500" :
                            h.status === "upcoming" ? "bg-blue-500" : "bg-gray-500"
                            }`} />

                        <div className="p-5">
                            {/* Source + Status */}
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${SOURCE_COLORS[h.source]?.bg} ${SOURCE_COLORS[h.source]?.text} capitalize`}>
                                    {h.source === "mlh" ? "MLH" : h.source}
                                </span>
                                <span className={`text-xs font-medium ${h.status === "ongoing" ? "text-green-400" : "text-gray-500"
                                    }`}>
                                    {h.status === "ongoing" ? "🔴 Live" : getDaysUntil(h.start_date)}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {h.name}
                            </h3>
                            <p className="text-xs text-gray-500 mb-4 line-clamp-2">{h.description}</p>

                            {/* Details */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <CalendarDays size={14} />
                                    <span>{formatDate(h.start_date)} — {formatDate(h.end_date)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    {MODE_ICONS[h.mode]}
                                    <span className="capitalize">{h.mode}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-yellow-400">
                                    <Trophy size={14} />
                                    <span>{h.prize}</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <a
                                href={h.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white transition-colors"
                            >
                                View Details <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <Rocket className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>No hackathons found for the selected filters.</p>
                </div>
            )}
        </div>
    )
}
