"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    BookOpen,
    CheckCircle,
    Clock,
    TrendingUp,
    ArrowRight,
    BarChart3,
    Loader2,
} from "lucide-react"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"

/* ─── Types ────────────────────────────────────── */

interface TrackedSheet {
    id: string
    name: string
    total: number
    solved: number
    lastActivity: string
    color: string
}

/* ─── Mock Data ────────────────────────────────── */

const MOCK_TRACKED: TrackedSheet[] = [
    { id: "striver-sde", name: "Striver's SDE Sheet", total: 191, solved: 45, lastActivity: "2 hours ago", color: "#ef4444" },
    { id: "neetcode-150", name: "NeetCode 150", total: 150, solved: 78, lastActivity: "1 day ago", color: "#22c55e" },
]

/* ─── Component ────────────────────────────────── */

export default function MySheetsPage() {
    const [sheets, setSheets] = useState<TrackedSheet[]>(MOCK_TRACKED)
    const [loading, setLoading] = useState(false)

    const totalSolved = sheets.reduce((acc, s) => acc + s.solved, 0)
    const totalProblems = sheets.reduce((acc, s) => acc + s.total, 0)

    return (
        <div className="max-w-5xl p-6 md:p-8 fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <BarChart3 className="w-7 h-7 text-blue-400" />
                        My Sheets
                    </h1>
                    <p className="text-gray-500 text-sm">Track your progress across DSA sheets</p>
                </div>
                <Link
                    href="/dashboard/sheets/explore"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
                >
                    <BookOpen size={16} /> Explore Sheets
                </Link>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                        <CheckCircle size={14} /> Total Solved
                    </div>
                    <p className="text-3xl font-bold text-white">{totalSolved}</p>
                    <p className="text-xs text-gray-500 mt-1">out of {totalProblems} problems</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                        <BookOpen size={14} /> Active Sheets
                    </div>
                    <p className="text-3xl font-bold text-white">{sheets.length}</p>
                    <p className="text-xs text-gray-500 mt-1">sheets being tracked</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                        <TrendingUp size={14} /> Overall Progress
                    </div>
                    <p className="text-3xl font-bold text-white">
                        {totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0}%
                    </p>
                    <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                        <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: `${totalProblems > 0 ? (totalSolved / totalProblems) * 100 : 0}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Sheet Progress Cards */}
            {sheets.length > 0 ? (
                <div className="space-y-4">
                    {sheets.map(sheet => {
                        const progress = Math.round((sheet.solved / sheet.total) * 100)
                        return (
                            <div key={sheet.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sheet.color }} />
                                        <h3 className="text-lg font-semibold text-white">{sheet.name}</h3>
                                    </div>
                                    <Link
                                        href={`/dashboard/sheets/${sheet.id}`}
                                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors"
                                    >
                                        Continue <ArrowRight size={14} />
                                    </Link>
                                </div>

                                <div className="flex items-center gap-6 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircle size={14} className="text-green-400" />
                                        <span className="text-white font-medium">{sheet.solved}</span>
                                        <span className="text-gray-500">/ {sheet.total} solved</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Clock size={14} />
                                        <span>{sheet.lastActivity}</span>
                                    </div>
                                </div>

                                <div className="w-full bg-white/10 rounded-full h-2">
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{ width: `${progress}%`, backgroundColor: sheet.color }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-2">{progress}% complete</p>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500 bg-white/5 border border-white/10 rounded-2xl">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p className="mb-4">You haven&apos;t started tracking any sheets yet.</p>
                    <Link
                        href="/dashboard/sheets/explore"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-500 transition-colors"
                    >
                        Explore Sheets <ArrowRight size={14} />
                    </Link>
                </div>
            )}
        </div>
    )
}
