"use client"

import { useState } from "react"
import { CheckCircle, Circle, Lock, Search, Filter } from "lucide-react"

interface Problem {
    id: string
    title: string
    slug: string
    difficulty: "Easy" | "Medium" | "Hard"
    acceptance: string
    tags: string[]
    paid: boolean
    url: string
}

interface ProblemTableProps {
    problems: Problem[]
}

export function ProblemTable({ problems }: ProblemTableProps) {
    const [search, setSearch] = useState("")
    const [difficulty, setDifficulty] = useState<string | null>(null)

    // Client-side filtering for demo
    const filteredProblems = problems.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
        const matchesDiff = difficulty ? p.difficulty === difficulty : true
        return matchesSearch && matchesDiff
    })

    const getDiffColor = (diff: string) => {
        if (diff === "Easy") return "text-[var(--success)] bg-[var(--success)]/10"
        if (diff === "Medium") return "text-[var(--warning)] bg-[var(--warning)]/10"
        if (diff === "Hard") return "text-[var(--error)] bg-[var(--error)]/10"
        return "text-[var(--text-secondary)]"
    }

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[8px] overflow-hidden">
            {/* Filter Bar */}
            <div className="p-4 border-b border-[var(--border)] flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2 flex-1 max-w-sm relative">
                    <Search className="absolute left-3 w-4 h-4 text-[var(--text-tertiary)]" />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        className="w-full h-9 pl-9 pr-4 bg-[var(--background)] border border-[var(--border)] rounded-[6px] text-[14px] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    {["Easy", "Medium", "Hard"].map(diff => (
                        <button
                            key={diff}
                            onClick={() => setDifficulty(difficulty === diff ? null : diff)}
                            className={`px-3 py-1.5 text-[12px] font-medium rounded-[6px] border transition-all ${difficulty === diff
                                    ? "bg-[var(--secondary)] border-[var(--text-secondary)] text-[var(--foreground)]"
                                    : "bg-transparent border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]"
                                }`}
                        >
                            {diff}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-[14px]">
                    <thead className="bg-[var(--background)] border-b border-[var(--border)] text-[var(--text-tertiary)] text-[12px] uppercase tracking-wider font-medium">
                        <tr>
                            <th className="px-6 py-3 w-[50px]">Status</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3 w-[120px]">Acceptance</th>
                            <th className="px-6 py-3 w-[100px]">Difficulty</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                        {filteredProblems.map((problem) => (
                            <tr key={problem.id} className="group hover:bg-[var(--secondary)]/50 transition-colors">
                                <td className="px-6 py-4">
                                    {/* Mock status for now */}
                                    <Circle className="w-4 h-4 text-[var(--text-tertiary)]" />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <a href={problem.url} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                                            {problem.id}. {problem.title}
                                        </a>
                                        {problem.paid && <Lock className="w-3 h-3 text-[var(--warning)]" />}
                                    </div>
                                    {problem.tags.length > 0 && (
                                        <div className="flex gap-2 mt-1">
                                            {problem.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-[var(--background)] rounded text-[var(--text-tertiary)] border border-[var(--border)]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-[var(--text-secondary)] font-mono">
                                    {problem.acceptance}%
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-[4px] text-[11px] font-medium ${getDiffColor(problem.difficulty)}`}>
                                        {problem.difficulty}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Mock */}
            <div className="p-4 border-t border-[var(--border)] flex items-center justify-between text-[12px] text-[var(--text-secondary)]">
                <span>Showing {filteredProblems.length} problems</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-[var(--border)] rounded hover:bg-[var(--secondary)] disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 border border-[var(--border)] rounded hover:bg-[var(--secondary)]">Next</button>
                </div>
            </div>
        </div>
    )
}
