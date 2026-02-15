"use client"

import { useState } from "react"
import Link from "next/link"
import {
    BookOpen,
    CheckCircle,
    ExternalLink,
    Filter,
    Search,
    TrendingUp,
    User,
    ArrowRight,
} from "lucide-react"

/* ─── Types ────────────────────────────────────── */

interface Sheet {
    id: string
    name: string
    author: string
    description: string
    problems: number
    difficulty: "mixed" | "beginner" | "intermediate" | "advanced"
    source: string
    url: string
    color: string
    categories: string[]
}

/* ─── Sheet Data ───────────────────────────────── */

const SHEETS: Sheet[] = [
    {
        id: "striver-sde",
        name: "Striver's SDE Sheet",
        author: "Raj Vikramaditya (Striver)",
        description: "The most popular SDE sheet covering all major DSA topics asked in product company interviews. 191 handpicked problems.",
        problems: 191,
        difficulty: "intermediate",
        source: "takeuforward.org",
        url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
        color: "#ef4444",
        categories: ["Arrays", "Linked List", "Greedy", "Recursion", "Binary Search", "Trees", "Graphs", "DP", "Tries", "Stacks"]
    },
    {
        id: "striver-a2z",
        name: "Striver's A2Z DSA",
        author: "Raj Vikramaditya (Striver)",
        description: "Complete A to Z DSA course sheet with 455 problems covering every topic from basics to advanced.",
        problems: 455,
        difficulty: "mixed",
        source: "takeuforward.org",
        url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
        color: "#f97316",
        categories: ["Basics", "Sorting", "Arrays", "Binary Search", "Strings", "Linked List", "Recursion", "Bit Manipulation", "Stack", "Queues", "Trees", "Graphs", "DP"]
    },
    {
        id: "love-babbar",
        name: "Love Babbar 450 DSA",
        author: "Love Babbar",
        description: "450 topic-wise problems for complete DSA preparation. Cracking the Coding Interview alternative for India.",
        problems: 450,
        difficulty: "mixed",
        source: "450dsa.com",
        url: "https://450dsa.com",
        color: "#8b5cf6",
        categories: ["Arrays", "Matrix", "Strings", "Searching & Sorting", "Linked List", "Binary Trees", "BST", "Greedy", "Backtracking", "Stack & Queue", "Heap", "Graph", "Trie", "DP", "Bit Manipulation"]
    },
    {
        id: "neetcode-150",
        name: "NeetCode 150",
        author: "NeetCode",
        description: "Curated list of 150 LeetCode problems covering the most important patterns for coding interviews.",
        problems: 150,
        difficulty: "intermediate",
        source: "neetcode.io",
        url: "https://neetcode.io/practice",
        color: "#22c55e",
        categories: ["Arrays & Hashing", "Two Pointers", "Stack", "Binary Search", "Sliding Window", "Linked List", "Trees", "Tries", "Heap", "Backtracking", "Graphs", "DP", "Greedy", "Intervals", "Math & Geometry", "Bit Manipulation"]
    },
    {
        id: "neetcode-all",
        name: "NeetCode All",
        author: "NeetCode",
        description: "Extended collection of 300+ problems for comprehensive coding interview preparation.",
        problems: 300,
        difficulty: "mixed",
        source: "neetcode.io",
        url: "https://neetcode.io/practice",
        color: "#10b981",
        categories: ["Arrays", "Two Pointers", "Sliding Window", "Stack", "Binary Search", "Linked List", "Trees", "Tries", "Heap", "Backtracking", "Graphs", "DP", "Greedy", "Intervals"]
    },
    {
        id: "fraz-sde",
        name: "Fraz SDE Sheet",
        author: "Muhammad Fraz",
        description: "SDE sheet by Fraz covering frequently asked problems in top tech company interviews with video explanations.",
        problems: 200,
        difficulty: "intermediate",
        source: "YouTube / GitHub",
        url: "https://github.com/mfraz/SDE-Sheet",
        color: "#3b82f6",
        categories: ["Arrays", "Strings", "Linked List", "Stacks & Queues", "Trees", "Graphs", "DP", "Greedy", "Backtracking"]
    },
]

const DIFFICULTY_BADGES: Record<string, { bg: string; text: string }> = {
    beginner: { bg: "bg-green-500/10", text: "text-green-400" },
    intermediate: { bg: "bg-yellow-500/10", text: "text-yellow-400" },
    advanced: { bg: "bg-red-500/10", text: "text-red-400" },
    mixed: { bg: "bg-blue-500/10", text: "text-blue-400" },
}

/* ─── Component ────────────────────────────────── */

export default function ExploreSheetsPage() {
    const [search, setSearch] = useState("")

    const filtered = SHEETS.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.author.toLowerCase().includes(search.toLowerCase()) ||
        s.categories.some(c => c.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <div className="max-w-6xl p-6 md:p-8 fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <BookOpen className="w-7 h-7 text-violet-400" />
                        Explore DSA Sheets
                    </h1>
                    <p className="text-gray-500 text-sm">Popular problem sheets curated by top educators</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search sheets or topics..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 w-64 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                </div>
            </div>

            {/* Sheet Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map(sheet => (
                    <div
                        key={sheet.id}
                        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group"
                    >
                        {/* Color band */}
                        <div className="h-1.5" style={{ backgroundColor: sheet.color }} />

                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                        {sheet.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-0.5">by {sheet.author}</p>
                                </div>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${DIFFICULTY_BADGES[sheet.difficulty]?.bg} ${DIFFICULTY_BADGES[sheet.difficulty]?.text}`}>
                                    {sheet.difficulty}
                                </span>
                            </div>

                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{sheet.description}</p>

                            {/* Stats */}
                            <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                    <CheckCircle size={12} /> {sheet.problems} problems
                                </span>
                                <span className="flex items-center gap-1">
                                    <ExternalLink size={12} /> {sheet.source}
                                </span>
                            </div>

                            {/* Categories */}
                            <div className="flex flex-wrap gap-1.5 mb-5">
                                {sheet.categories.slice(0, 6).map(c => (
                                    <span key={c} className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/5 rounded-full text-gray-400">
                                        {c}
                                    </span>
                                ))}
                                {sheet.categories.length > 6 && (
                                    <span className="text-[10px] px-2 py-0.5 text-gray-600">+{sheet.categories.length - 6} more</span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <Link
                                    href={`/dashboard/sheets/${sheet.id}`}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white transition-colors"
                                >
                                    Start Tracking <ArrowRight size={14} />
                                </Link>
                                <a
                                    href={sheet.url}
                                    target="_blank"
                                    className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>No sheets found matching your search.</p>
                </div>
            )}
        </div>
    )
}
