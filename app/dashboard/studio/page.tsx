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
    EASY: "var(--success)",
    MEDIUM: "var(--warning)",
    HARD: "var(--error)",
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

export default function StudioPage() {
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
                if (!r.ok) throw new Error("Failed to load questions")
                return r.json()
            })
            .then((d: DataSet) => {
                setData(d)
                setLoading(false)
            })
            .catch((e) => {
                setError(e.message)
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
            <div className="max-w-[1200px] mx-auto space-y-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="skeleton h-8 w-48 rounded-[6px]" />
                </div>
                <div className="skeleton h-12 w-full rounded-[6px]" />
                <div className="skeleton h-[500px] w-full rounded-[12px]" />
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center min-h-[400px]">
                <p className="text-[var(--error)] text-sm font-mono">{error || "Failed to load data"}</p>
            </div>
        )
    }

    /* ─── Render ───────────────────────────────────── */

    return (
        <div className="max-w-[1200px] mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <LeetCodeLogo className="w-6 h-6 text-[#FFA116]" />
                        <h1 className="text-[24px] font-display text-[var(--foreground)]">
                            Studio
                        </h1>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm">
                        {data.meta.totalQuestions.toLocaleString()} company-tagged LeetCode problems across {data.meta.totalCompanies} companies
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)]">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ background: "var(--success)" }} />
                        Easy
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ background: "var(--warning)" }} />
                        Medium
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ background: "var(--error)" }} />
                        Hard
                    </span>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] w-4 h-4" strokeWidth={1.5} />
                    <input
                        type="text"
                        placeholder="Search problems, topics, or companies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--text-tertiary)] pl-10 pr-4 h-10 rounded-[6px] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-all"
                    />
                </div>

                {/* Difficulty Filter */}
                <div className="flex gap-1 border border-[var(--border)] rounded-[6px] p-1 bg-[var(--surface)]">
                    {["ALL", "EASY", "MEDIUM", "HARD"].map((d) => (
                        <button
                            key={d}
                            onClick={() => setDifficultyFilter(d)}
                            className={`px-3 h-8 text-xs font-mono rounded-[4px] transition-all duration-150 ${difficultyFilter === d
                                ? "bg-[var(--background)] text-[var(--foreground)] shadow-sm"
                                : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
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

                {/* Company Filter */}
                <div className="relative">
                    <button
                        onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
                        className={`flex items-center gap-2 h-10 px-4 border rounded-[6px] text-sm transition-all duration-150 ${selectedCompanies.size > 0
                            ? "border-[var(--primary)] bg-[var(--primary)]/[0.06] text-[var(--foreground)]"
                            : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--elevated)]"
                            }`}
                    >
                        <Building2 className="w-4 h-4" strokeWidth={1.5} />
                        {selectedCompanies.size > 0
                            ? `${selectedCompanies.size} ${selectedCompanies.size === 1 ? "company" : "companies"}`
                            : "Companies"}
                        <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {showCompanyDropdown && (
                        <>
                            <div
                                className="fixed inset-0 z-20"
                                onClick={() => setShowCompanyDropdown(false)}
                            />
                            <div className="absolute right-0 top-12 z-30 w-[280px] max-h-[360px] border border-[var(--border)] bg-[var(--surface)] rounded-[8px] shadow-xl overflow-hidden flex flex-col">
                                {/* Search */}
                                <div className="p-2 border-b border-[var(--border)]">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] w-3.5 h-3.5" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            placeholder="Filter companies..."
                                            value={companySearch}
                                            onChange={(e) => setCompanySearch(e.target.value)}
                                            className="w-full bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--text-tertiary)] pl-8 pr-3 h-8 rounded-[4px] text-xs focus:outline-none focus:ring-1 focus:ring-[var(--ring)]"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                                {/* Selected tags */}
                                {selectedCompanies.size > 0 && (
                                    <div className="px-2 pt-2 pb-1 flex flex-wrap gap-1 border-b border-[var(--border)]">
                                        {Array.from(selectedCompanies).map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => toggleCompany(c)}
                                                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-[var(--primary)]/10 text-[var(--primary)] rounded-[4px] hover:bg-[var(--primary)]/20 transition-colors"
                                            >
                                                {c} <X className="w-2.5 h-2.5" />
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setSelectedCompanies(new Set())}
                                            className="text-[10px] text-[var(--text-tertiary)] hover:text-[var(--error)] transition-colors"
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                )}
                                {/* List */}
                                <div className="flex-1 overflow-y-auto p-1">
                                    {filteredCompanies.slice(0, 50).map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => toggleCompany(c.name)}
                                            className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-[4px] transition-colors duration-100 ${selectedCompanies.has(c.name)
                                                ? "bg-[var(--primary)]/[0.06] text-[var(--foreground)]"
                                                : "text-[var(--text-secondary)] hover:bg-[var(--elevated)] hover:text-[var(--foreground)]"
                                                }`}
                                        >
                                            <span className="truncate">{c.name}</span>
                                            <span className="text-[var(--text-tertiary)] font-mono ml-2 shrink-0">
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

            {/* Active filters display */}
            {selectedCompanies.size > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-[var(--text-tertiary)]" strokeWidth={1.5} />
                    {Array.from(selectedCompanies).map((c) => (
                        <span
                            key={c}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-[var(--surface)] border border-[var(--border)] rounded-[6px] text-[var(--foreground)]"
                        >
                            <Building2 className="w-3 h-3 text-[var(--primary)]" strokeWidth={1.5} />
                            {c}
                            <button
                                onClick={() => toggleCompany(c)}
                                className="text-[var(--text-tertiary)] hover:text-[var(--error)] transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Results stat */}
            <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] font-mono">
                <span>
                    {filtered.length.toLocaleString()} problem{filtered.length !== 1 ? "s" : ""} found
                </span>
                <span>
                    Page {page + 1} of {totalPages || 1}
                </span>
            </div>

            {/* Questions Table */}
            <div className="border border-[var(--border)] rounded-[12px] overflow-hidden bg-[var(--surface)]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[var(--border)] text-[11px] text-[var(--text-tertiary)] font-mono uppercase tracking-wider">
                            <th className="p-4 font-normal w-12">#</th>
                            <th
                                className="p-4 font-normal cursor-pointer hover:text-[var(--foreground)] transition-colors select-none"
                                onClick={() => toggleSort("title")}
                            >
                                <span className="flex items-center gap-1">
                                    Problem
                                    {sortBy === "title" && (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                                </span>
                            </th>
                            <th
                                className="p-4 font-normal cursor-pointer hover:text-[var(--foreground)] transition-colors select-none"
                                onClick={() => toggleSort("difficulty")}
                            >
                                <span className="flex items-center gap-1">
                                    Difficulty
                                    {sortBy === "difficulty" && (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                                </span>
                            </th>
                            <th
                                className="p-4 font-normal cursor-pointer hover:text-[var(--foreground)] transition-colors select-none"
                                onClick={() => toggleSort("frequency")}
                            >
                                <span className="flex items-center gap-1">
                                    Freq
                                    {sortBy === "frequency" && (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                                </span>
                            </th>
                            <th
                                className="p-4 font-normal cursor-pointer hover:text-[var(--foreground)] transition-colors select-none hidden lg:table-cell"
                                onClick={() => toggleSort("acceptance")}
                            >
                                <span className="flex items-center gap-1">
                                    Accept
                                    {sortBy === "acceptance" && (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
                                </span>
                            </th>
                            <th className="p-4 font-normal hidden xl:table-cell">Companies</th>
                            <th className="p-4 font-normal w-10" />
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {pageQuestions.map((q, idx) => (
                            <tr
                                key={q.link + idx}
                                className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--elevated)]/30 transition-colors duration-100 group"
                            >
                                {/* Row # */}
                                <td className="p-4 text-[var(--text-tertiary)] font-mono text-xs">
                                    {page * ITEMS_PER_PAGE + idx + 1}
                                </td>

                                {/* Problem title + topics */}
                                <td className="p-4">
                                    <a
                                        href={q.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--foreground)] font-medium group-hover:text-[var(--primary)] transition-colors duration-150 inline-flex items-center gap-1.5"
                                    >
                                        <LeetCodeLogo className="w-3.5 h-3.5 text-[#FFA116] shrink-0" />
                                        {q.title}
                                    </a>
                                    {q.topics.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-1.5">
                                            {q.topics.slice(0, 3).map((t) => (
                                                <span
                                                    key={t}
                                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--background)] rounded-[3px] border border-[var(--border)]"
                                                >
                                                    <Hash className="w-2.5 h-2.5" strokeWidth={1.5} />
                                                    {t}
                                                </span>
                                            ))}
                                            {q.topics.length > 3 && (
                                                <span className="text-[10px] text-[var(--text-tertiary)] font-mono">
                                                    +{q.topics.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </td>

                                {/* Difficulty badge */}
                                <td className="p-4">
                                    <span
                                        className="inline-block px-2 py-0.5 text-[10px] font-mono font-semibold rounded-[4px] uppercase tracking-wider"
                                        style={{
                                            color: DIFFICULTY_COLORS[q.difficulty] || "var(--text-secondary)",
                                            background: `color-mix(in srgb, ${DIFFICULTY_COLORS[q.difficulty] || "var(--text-secondary)"} 12%, transparent)`,
                                        }}
                                    >
                                        {q.difficulty}
                                    </span>
                                </td>

                                {/* Frequency bar */}
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 bg-[var(--background)] h-1 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-[var(--primary)]"
                                                style={{ width: `${Math.min(q.frequency * 100, 100)}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                                            {(q.frequency * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                </td>

                                {/* Acceptance */}
                                <td className="p-4 hidden lg:table-cell">
                                    <span className="text-xs font-mono text-[var(--text-secondary)]">
                                        {q.acceptance}
                                    </span>
                                </td>

                                {/* Company tags */}
                                <td className="p-4 hidden xl:table-cell">
                                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                                        {q.companies.slice(0, 3).map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => {
                                                    setSelectedCompanies(new Set([c]))
                                                }}
                                                className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--background)] rounded-[3px] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors duration-100 cursor-pointer"
                                            >
                                                <Building2 className="w-2.5 h-2.5" strokeWidth={1.5} />
                                                {c}
                                            </button>
                                        ))}
                                        {q.companies.length > 3 && (
                                            <span className="text-[10px] text-[var(--text-tertiary)] font-mono self-center">
                                                +{q.companies.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </td>

                                {/* External link */}
                                <td className="p-4">
                                    <a
                                        href={q.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--text-tertiary)] hover:text-[var(--primary)] transition-colors"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty state */}
                {pageQuestions.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Search className="w-8 h-8 text-[var(--text-tertiary)] mb-3" strokeWidth={1.5} />
                        <p className="text-sm text-[var(--text-secondary)] mb-1">No problems found</p>
                        <p className="text-xs text-[var(--text-tertiary)]">Try adjusting your filters or search query</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-3 h-8 text-xs font-mono border border-[var(--border)] rounded-[6px] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--elevated)] transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none"
                    >
                        Prev
                    </button>
                    {/* Page numbers */}
                    {(() => {
                        const pages: number[] = []
                        const start = Math.max(0, page - 2)
                        const end = Math.min(totalPages - 1, page + 2)
                        for (let i = start; i <= end; i++) pages.push(i)
                        return pages.map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-8 h-8 text-xs font-mono rounded-[6px] transition-all duration-150 ${p === page
                                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                                    : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--elevated)]"
                                    }`}
                            >
                                {p + 1}
                            </button>
                        ))
                    })()}
                    <button
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 h-8 text-xs font-mono border border-[var(--border)] rounded-[6px] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--elevated)] transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Footer */}
            <div className="text-center text-[10px] text-[var(--text-tertiary)] font-mono pb-4">
                Data sourced from{" "}
                <a
                    href="https://github.com/liquidslr/leetcode-company-wise-problems"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] hover:brightness-125 transition-all"
                >
                    liquidslr/leetcode-company-wise-problems
                </a>{" "}
                · Updated June 2025
            </div>
        </div>
    )
}
