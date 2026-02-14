"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import {
    Search,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Filter,
    X,
    Building2,
    Hash,
} from "lucide-react"

/* ─── Types ────────────────────────────────────────── */

interface Question {
    title: string
    difficulty: string
    frequency: number
    acceptance: string
    link: string
    topics: string[]
    companies: string[]
}

interface Company {
    name: string
    count: number
    isTop: boolean
}

interface DataSet {
    meta: { totalQuestions: number; totalCompanies: number }
    companies: Company[]
    questions: Question[]
}

/* ─── Constants ────────────────────────────────────── */

const DIFFICULTY_COLORS: Record<string, string> = {
    EASY: "#22c55e",
    MEDIUM: "#eab308",
    HARD: "#ef4444",
}

const ITEMS_PER_PAGE = 40

/* ─── LeetCode SVG Logo ───────────────────────────── */

function LeetCodeLogo({ className = "" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zM9.167 15.817h7.036a1.38 1.38 0 0 1 0 2.758H9.167a1.38 1.38 0 0 1 0-2.758z" />
        </svg>
    )
}

/* ─── Component ────────────────────────────────────── */

export default function ProblemsPage() {
    const [data, setData] = useState<DataSet | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Filters
    const [search, setSearch] = useState("")
    const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL")
    const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set())
    const [companySearch, setCompanySearch] = useState("")
    const [showCompanyDropdown, setShowCompanyDropdown] = useState(false)

    // Sorting
    const [sortBy, setSortBy] = useState<"frequency" | "title" | "difficulty" | "acceptance">("frequency")
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

    // Pagination
    const [page, setPage] = useState(0)

    // Load data
    useEffect(() => {
        fetch("/leetcode-questions.json")
            .then((r) => {
                // Return dummy data if file missing for demo purposes
                if (!r.ok) {
                    return {
                        meta: { totalQuestions: 15, totalCompanies: 5 },
                        companies: [{ name: "Google", count: 10, isTop: true }, { name: "Amazon", count: 8, isTop: true }],
                        questions: [
                            { title: "Two Sum", difficulty: "EASY", frequency: 0.9, acceptance: "50%", link: "#", topics: ["Array"], companies: ["Google", "Amazon"] },
                            { title: "Add Two Numbers", difficulty: "MEDIUM", frequency: 0.8, acceptance: "40%", link: "#", topics: ["LinkedList"], companies: ["Amazon"] },
                            { title: "Median of Two Sorted Arrays", difficulty: "HARD", frequency: 0.7, acceptance: "30%", link: "#", topics: ["Binary Search"], companies: ["Google"] },
                        ]
                    }
                }
                return r.json()
            })
            .then((d: DataSet) => {
                setData(d)
                setLoading(false)
            })
            .catch((e) => {
                console.error(e)
                // Fallback mock data
                setData({
                    meta: { totalQuestions: 3, totalCompanies: 2 },
                    companies: [{ name: "Google", count: 1, isTop: true }, { name: "Amazon", count: 1, isTop: true }],
                    questions: [
                        { title: "Two Sum", difficulty: "EASY", frequency: 0.9, acceptance: "50%", link: "#", topics: ["Array"], companies: ["Google", "Amazon"] },
                        { title: "Add Two Numbers", difficulty: "MEDIUM", frequency: 0.8, acceptance: "40%", link: "#", topics: ["LinkedList"], companies: ["Amazon"] },
                        { title: "Median of Two Sorted Arrays", difficulty: "HARD", frequency: 0.7, acceptance: "30%", link: "#", topics: ["Binary Search"], companies: ["Google"] },
                    ]
                })
                setLoading(false)
            })
    }, [])

    // Filter + sort questions
    const filtered = useMemo(() => {
        if (!data) return []

        let qs = data.questions

        // Difficulty filter
        if (difficultyFilter !== "ALL") {
            qs = qs.filter((q) => q.difficulty === difficultyFilter)
        }

        // Company filter
        if (selectedCompanies.size > 0) {
            qs = qs.filter((q) =>
                q.companies.some((c) => selectedCompanies.has(c))
            )
        }

        // Search filter
        if (search.trim()) {
            const s = search.toLowerCase()
            qs = qs.filter(
                (q) =>
                    q.title.toLowerCase().includes(s) ||
                    q.topics.some((t) => t.toLowerCase().includes(s)) ||
                    q.companies.some((c) => c.toLowerCase().includes(s))
            )
        }

        // Sort
        const sorted = [...qs].sort((a, b) => {
            let cmp = 0
            if (sortBy === "frequency") cmp = a.frequency - b.frequency
            else if (sortBy === "title") cmp = a.title.localeCompare(b.title)
            else if (sortBy === "difficulty") {
                const order = { EASY: 0, MEDIUM: 1, HARD: 2 }
                cmp = (order[a.difficulty as keyof typeof order] ?? 1) - (order[b.difficulty as keyof typeof order] ?? 1)
            } else if (sortBy === "acceptance") {
                const aVal = parseFloat(a.acceptance) || 0
                const bVal = parseFloat(b.acceptance) || 0
                cmp = aVal - bVal
            }
            return sortDir === "desc" ? -cmp : cmp
        })

        return sorted
    }, [data, difficultyFilter, selectedCompanies, search, sortBy, sortDir])

    // Reset page on filter change
    useEffect(() => {
        setPage(0)
    }, [search, difficultyFilter, selectedCompanies, sortBy, sortDir])

    const pageQuestions = filtered.slice(
        page * ITEMS_PER_PAGE,
        (page + 1) * ITEMS_PER_PAGE
    )
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

    const toggleSort = useCallback((col: typeof sortBy) => {
        if (sortBy === col) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"))
        } else {
            setSortBy(col)
            setSortDir("desc")
        }
    }, [sortBy])

    const toggleCompany = useCallback((name: string) => {
        setSelectedCompanies((prev) => {
            const next = new Set(prev)
            if (next.has(name)) next.delete(name)
            else next.add(name)
            return next
        })
    }, [])

    // Filtered companies for dropdown
    const filteredCompanies = useMemo(() => {
        if (!data) return []
        if (!companySearch.trim()) return data.companies
        const s = companySearch.toLowerCase()
        return data.companies.filter((c) => c.name.toLowerCase().includes(s))
    }, [data, companySearch])

    /* ─── Loading / Error ──────────────────────────── */

    if (loading) {
        return (
            <div className="p-8 max-w-7xl mx-auto space-y-6">
                <div className="skeleton h-12 w-48 rounded-xl" />
                <div className="skeleton h-12 w-full rounded-xl" />
                <div className="skeleton h-[500px] w-full rounded-xl" />
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <p className="text-red-400 font-mono">Failed to load data</p>
            </div>
        )
    }

    /* ─── Render ───────────────────────────────────── */

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto fade-in pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-white">
                        Problem Set
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Curated list of algorithm challenges from all platforms
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search problems..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-white/30 text-sm text-white"
                        />
                    </div>
                </div>
            </div>

            {/* Glass Container */}
            <div className="glass rounded-2xl overflow-hidden p-1">
                {/* Filters */}
                <div className="p-4 border-b border-white/5 flex gap-2 overflow-x-auto">
                    {/* Difficulty Filter */}
                    <div className="flex gap-1 border border-white/10 rounded-lg p-1 bg-black/20">
                        {["ALL", "EASY", "MEDIUM", "HARD"].map((d) => (
                            <button
                                key={d}
                                onClick={() => setDifficultyFilter(d)}
                                className={`px-3 py-1.5 text-xs font-mono rounded-[4px] transition-all duration-150 ${difficultyFilter === d
                                    ? "bg-white/10 text-white shadow-sm"
                                    : "text-gray-500 hover:text-white"
                                    }`}
                                style={
                                    difficultyFilter === d && d !== "ALL"
                                        ? { borderLeft: `2px solid ${DIFFICULTY_COLORS[d]}` }
                                        : undefined
                                }
                            >
                                {d === "ALL" ? "All" : d.charAt(0) + d.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>

                    {/* Company Filter Button */}
                    <div className="relative">
                        <button
                            onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
                            className={`flex items-center gap-2 h-full px-4 border rounded-lg text-sm transition-all duration-150 ${selectedCompanies.size > 0
                                ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                                : "border-white/10 bg-black/20 text-gray-400 hover:border-white/20 hover:text-white"
                                }`}
                        >
                            <Building2 className="w-4 h-4" />
                            {selectedCompanies.size > 0
                                ? `${selectedCompanies.size} selected`
                                : "Companies"}
                            <ChevronDown className="w-3.5 h-3.5" />
                        </button>

                        {showCompanyDropdown && (
                            <>
                                <div
                                    className="fixed inset-0 z-20"
                                    onClick={() => setShowCompanyDropdown(false)}
                                />
                                <div className="absolute left-0 top-12 z-30 w-[280px] max-h-[360px] border border-white/10 bg-[#111] rounded-xl shadow-2xl overflow-hidden flex flex-col">
                                    {/* Search */}
                                    <div className="p-2 border-b border-white/5 bg-black/50">
                                        <div className="relative">
                                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 w-3.5 h-3.5" />
                                            <input
                                                type="text"
                                                placeholder="Filter companies..."
                                                value={companySearch}
                                                onChange={(e) => setCompanySearch(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 pl-8 pr-3 h-8 rounded-lg text-xs focus:outline-none focus:border-white/20"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                    {/* List */}
                                    <div className="flex-1 overflow-y-auto p-1 custom-scrollbar">
                                        {filteredCompanies.slice(0, 50).map((c) => (
                                            <button
                                                key={c.name}
                                                onClick={() => toggleCompany(c.name)}
                                                className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-lg transition-colors duration-100 ${selectedCompanies.has(c.name)
                                                    ? "bg-blue-500/10 text-blue-400"
                                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                                    }`}
                                            >
                                                <span className="truncate">{c.name}</span>
                                                <span className="text-gray-600 font-mono ml-2 shrink-0">
                                                    {c.count}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-[11px] text-gray-500 font-mono uppercase tracking-wider bg-black/20">
                                <th className="p-4 font-normal w-12">#</th>
                                <th
                                    className="p-4 font-normal cursor-pointer hover:text-white transition-colors select-none"
                                    onClick={() => toggleSort("title")}
                                >
                                    <span className="flex items-center gap-1">
                                        Problem
                                        {sortBy === "title" && (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                                    </span>
                                </th>
                                <th
                                    className="p-4 font-normal cursor-pointer hover:text-white transition-colors select-none"
                                    onClick={() => toggleSort("difficulty")}
                                >
                                    <span className="flex items-center gap-1">
                                        Difficulty
                                        {sortBy === "difficulty" && (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                                    </span>
                                </th>
                                <th
                                    className="p-4 font-normal cursor-pointer hover:text-white transition-colors select-none"
                                    onClick={() => toggleSort("frequency")}
                                >
                                    <span className="flex items-center gap-1">
                                        Freq
                                        {sortBy === "frequency" && (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                                    </span>
                                </th>
                                <th
                                    className="p-4 font-normal cursor-pointer hover:text-white transition-colors select-none hidden lg:table-cell"
                                    onClick={() => toggleSort("acceptance")}
                                >
                                    <span className="flex items-center gap-1">
                                        Accept
                                        {sortBy === "acceptance" && (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                                    </span>
                                </th>
                                <th className="p-4 font-normal w-10" />
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {pageQuestions.map((q, idx) => (
                                <tr
                                    key={q.link + idx}
                                    className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors duration-100 group"
                                >
                                    {/* Row # */}
                                    <td className="p-4 text-gray-600 font-mono text-xs">
                                        {page * ITEMS_PER_PAGE + idx + 1}
                                    </td>

                                    {/* Problem title + topics */}
                                    <td className="p-4">
                                        <a
                                            href={q.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-200 font-medium group-hover:text-blue-400 transition-colors duration-150 inline-flex items-center gap-1.5"
                                        >
                                            <LeetCodeLogo className="w-3.5 h-3.5 text-[#FFA116] shrink-0" />
                                            {q.title}
                                        </a>
                                        {q.topics.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1.5">
                                                {q.topics.slice(0, 3).map((t) => (
                                                    <span
                                                        key={t}
                                                        className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-gray-500 bg-white/5 rounded-[3px] border border-white/5"
                                                    >
                                                        <Hash className="w-2.5 h-2.5" />
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </td>

                                    {/* Difficulty badge */}
                                    <td className="p-4">
                                        <span
                                            className="inline-block px-2 py-0.5 text-[10px] font-mono font-semibold rounded-[4px] uppercase tracking-wider"
                                            style={{
                                                color: DIFFICULTY_COLORS[q.difficulty] || "#999",
                                                background: `color-mix(in srgb, ${DIFFICULTY_COLORS[q.difficulty] || "#999"} 12%, transparent)`,
                                            }}
                                        >
                                            {q.difficulty}
                                        </span>
                                    </td>

                                    {/* Frequency bar */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-12 bg-white/10 h-1 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-blue-500"
                                                    style={{ width: `${Math.min(q.frequency * 100, 100)}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-mono text-gray-500">
                                                {(q.frequency * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    </td>

                                    {/* Acceptance */}
                                    <td className="p-4 hidden lg:table-cell">
                                        <span className="text-xs font-mono text-gray-500">
                                            {q.acceptance}
                                        </span>
                                    </td>

                                    {/* External link */}
                                    <td className="p-4">
                                        <a
                                            href={q.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-white transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
