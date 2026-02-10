"use client"

import {
    CheckCircle,
    Percent,
    Clock,
    Calendar,
    TrendingUp,
    Flame,
    Code,
    BarChart3,
    ExternalLink,
} from "lucide-react"

/* ─── Data ─────────────────────────────────────────────── */

const submissions = [
    {
        status: "accepted",
        problem: "Merge K Sorted Lists",
        platform: "LeetCode",
        difficulty: "Hard",
        time: "2 min ago",
    },
    {
        status: "accepted",
        problem: "Two Sum",
        platform: "LeetCode",
        difficulty: "Easy",
        time: "45 min ago",
    },
    {
        status: "failed",
        problem: "Travelling Salesman",
        platform: "Codeforces",
        difficulty: "Hard",
        time: "2 hours ago",
    },
    {
        status: "accepted",
        problem: "Valid Parentheses",
        platform: "LeetCode",
        difficulty: "Easy",
        time: "Yesterday",
    },
    {
        status: "pending",
        problem: "Longest Palindromic Substring",
        platform: "LeetCode",
        difficulty: "Medium",
        time: "Yesterday",
    },
]

const topicStrengths = [
    { name: "Dynamic Programming", percentage: 85 },
    { name: "Graphs", percentage: 62 },
    { name: "Trees", percentage: 92 },
    { name: "Greedy", percentage: 45 },
    { name: "Binary Search", percentage: 78 },
]

const contributionGrid = [
    0, 2, 1, 5, 3, 0, 1,
    4, 0, 2, 6, 1, 3, 0,
    1, 5, 0, 2, 4, 1, 3,
    2, 0, 3, 1, 5, 2, 4,
]

/* ─── Helpers ──────────────────────────────────────────── */

function getContributionColor(count: number): string {
    if (count === 0) return "bg-[var(--elevated)]"
    if (count <= 2) return "bg-[var(--text-tertiary)]/40"
    if (count <= 4) return "bg-emerald-700"
    return "bg-emerald-500"
}

function getStrengthColor(pct: number): string {
    if (pct >= 80) return "var(--primary)"
    if (pct >= 60) return "var(--success)"
    return "var(--text-tertiary)"
}

/* ─── Component ────────────────────────────────────────── */

export default function DashboardPage() {
    return (
        <div className="max-w-[1200px] mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-[24px] font-display text-[var(--foreground)]">Dashboard</h1>
                    <p className="text-[var(--text-secondary)] text-sm mt-1">
                        Welcome back, John. You solved 3 problems today.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 border border-[var(--border)] rounded-[6px] flex flex-col items-center justify-center min-w-[100px] bg-[var(--surface)]">
                        <span className="text-[12px] text-[var(--text-tertiary)] uppercase tracking-wider font-mono">Rank</span>
                        <span className="text-lg font-mono text-[var(--foreground)] font-semibold">1,204</span>
                    </div>
                    <div className="px-4 py-2 border border-[var(--border)] rounded-[6px] flex flex-col items-center justify-center min-w-[100px] bg-[var(--surface)]">
                        <span className="text-[12px] text-[var(--text-tertiary)] uppercase tracking-wider font-mono">Streak</span>
                        <span className="text-lg font-mono text-[var(--foreground)] font-semibold flex items-center gap-1">
                            12 <Flame className="w-4 h-4 text-[var(--warning)] flame-flicker" />
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Solved */}
                <div className="border border-[var(--border)] rounded-[12px] p-5 bg-[var(--surface)]" style={{ borderLeft: "3px solid var(--primary)" }}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-[var(--text-secondary)]">Total Solved</h3>
                        <CheckCircle className="w-[18px] h-[18px] text-[var(--text-tertiary)]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[32px] font-semibold text-[var(--foreground)] font-mono leading-none mb-3">482</div>
                    <div className="w-full bg-[var(--background)] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[var(--primary)] h-full rounded-full" style={{ width: "65%" }} />
                    </div>
                    <p className="text-[12px] text-[var(--text-tertiary)] mt-2 font-mono">Top 15% global</p>
                </div>

                {/* Acceptance */}
                <div className="border border-[var(--border)] rounded-[12px] p-5 bg-[var(--surface)]" style={{ borderLeft: "3px solid var(--success)" }}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-[var(--text-secondary)]">Acceptance</h3>
                        <Percent className="w-[18px] h-[18px] text-[var(--text-tertiary)]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[32px] font-semibold text-[var(--foreground)] font-mono leading-none mb-3">64.2%</div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--success)] flex items-center gap-1 font-mono">
                            <TrendingUp className="w-3.5 h-3.5" /> +2.1%
                        </span>
                        <span className="text-[12px] text-[var(--text-tertiary)]">vs last month</span>
                    </div>
                </div>

                {/* Hours Coded */}
                <div className="border border-[var(--border)] rounded-[12px] p-5 bg-[var(--surface)]" style={{ borderLeft: "3px solid var(--warning)" }}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-[var(--text-secondary)]">Hours Coded</h3>
                        <Clock className="w-[18px] h-[18px] text-[var(--text-tertiary)]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[32px] font-semibold text-[var(--foreground)] font-mono leading-none mb-3">24.5h</div>
                    <div className="flex items-end gap-1 mt-1">
                        {[30, 50, 40, 80, 60, 30, 20].map((h, i) => (
                            <div
                                key={i}
                                className="w-1 rounded-sm"
                                style={{
                                    height: `${h * 0.12}rem`,
                                    background: h >= 70 ? "var(--primary)" : "var(--elevated)",
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Next Contest */}
                <div className="border border-[var(--border)] rounded-[12px] p-5 bg-[var(--surface)]" style={{ borderLeft: "3px solid var(--error)" }}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-[var(--text-secondary)]">Next Contest</h3>
                        <Calendar className="w-[18px] h-[18px] text-[var(--text-tertiary)]" strokeWidth={1.5} />
                    </div>
                    <div className="text-base font-medium text-[var(--foreground)] mb-1">Codeforces Round 923</div>
                    <div className="text-[20px] font-mono text-[var(--foreground)] font-semibold mb-3 tabular-nums">
                        04<span className="colon-pulse">:</span>22<span className="colon-pulse">:</span>10
                    </div>
                    <button className="w-full py-1.5 text-xs font-semibold border border-[var(--border)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors duration-150 rounded-[6px]">
                        Register Now
                    </button>
                </div>
            </div>

            {/* Streak & Contribution Grid */}
            <div className="border border-[var(--border)] rounded-[12px] p-6 bg-[var(--surface)]">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-baseline gap-3">
                        <div className="flex items-center gap-2">
                            <Flame className="w-5 h-5 text-[var(--warning)] flame-flicker" />
                            <span className="text-[32px] font-mono font-bold text-[var(--foreground)] leading-none">12</span>
                        </div>
                        <span className="text-sm text-[var(--text-secondary)]">day streak</span>
                    </div>
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">Last 28 days</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {contributionGrid.map((count, i) => (
                        <div
                            key={i}
                            className={`aspect-square rounded-sm ${getContributionColor(count)} cursor-default`}
                            title={`${count} problem${count !== 1 ? "s" : ""}`}
                        />
                    ))}
                </div>
                <div className="flex items-center gap-2 mt-3 text-[10px] text-[var(--text-tertiary)] font-mono">
                    <span>Less</span>
                    <div className="flex gap-0.5">
                        {[0, 1, 3, 5].map((c) => (
                            <div key={c} className={`w-2.5 h-2.5 rounded-sm ${getContributionColor(c)}`} />
                        ))}
                    </div>
                    <span>More</span>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column — Submissions Table */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-[var(--foreground)]">Recent Submissions</h3>
                        <button className="text-xs text-[var(--primary)] hover:brightness-125 font-mono transition-all duration-150 flex items-center gap-1">
                            View All <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="border border-[var(--border)] rounded-[12px] overflow-hidden bg-[var(--surface)]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--border)] text-[12px] text-[var(--text-tertiary)] font-mono uppercase tracking-wider">
                                    <th className="p-4 font-normal w-12">Status</th>
                                    <th className="p-4 font-normal">Problem</th>
                                    <th className="p-4 font-normal">Platform</th>
                                    <th className="p-4 font-normal">Difficulty</th>
                                    <th className="p-4 font-normal text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-[var(--text-secondary)]">
                                {submissions.map((sub, index) => (
                                    <tr key={index} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--elevated)]/30 transition-colors duration-150 group cursor-pointer">
                                        <td className="p-4">
                                            <span className={`inline-block w-2 h-2 rounded-full ${sub.status === "accepted" ? "bg-[var(--success)]" :
                                                sub.status === "failed" ? "bg-[var(--error)]" : "bg-[var(--warning)]"
                                                }`} />
                                        </td>
                                        <td className="p-4 font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-150">{sub.problem}</td>
                                        <td className="p-4">
                                            <span className="flex items-center gap-2">
                                                {sub.platform === "LeetCode" ? (
                                                    <Code className="w-4 h-4 text-[var(--text-tertiary)]" strokeWidth={1.5} />
                                                ) : (
                                                    <BarChart3 className="w-4 h-4 text-[var(--text-tertiary)]" strokeWidth={1.5} />
                                                )}
                                                <span className="font-mono text-xs">{sub.platform}</span>
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`badge ${sub.difficulty === "Easy"
                                                ? "badge-easy"
                                                : sub.difficulty === "Medium"
                                                    ? "badge-medium"
                                                    : "badge-hard"
                                                }`}>
                                                {sub.difficulty}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right font-mono text-xs text-[var(--text-tertiary)]">{sub.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column — Topic Strength & Daily Goal */}
                <div className="space-y-6">
                    {/* Topic Strength */}
                    <div>
                        <h3 className="text-base font-semibold text-[var(--foreground)] mb-4">Topic Strength</h3>
                        <div className="border border-[var(--border)] rounded-[12px] p-5 bg-[var(--surface)]">
                            <div className="space-y-4">
                                {topicStrengths.map((topic) => (
                                    <div key={topic.name}>
                                        <div className="flex justify-between text-xs mb-1.5">
                                            <span className="text-[var(--foreground)]">{topic.name}</span>
                                            <span className="text-[var(--text-tertiary)] font-mono">{topic.percentage}%</span>
                                        </div>
                                        <div className="w-full bg-[var(--background)] h-1.5 rounded-full">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${topic.percentage}%`,
                                                    background: getStrengthColor(topic.percentage),
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-2 border border-[var(--border)] text-xs text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--elevated)] rounded-[6px] transition-all duration-150 font-mono">
                                View Full Analysis
                            </button>
                        </div>
                    </div>

                    {/* Daily Goal */}
                    <div className="border border-[var(--border)] rounded-[12px] p-5 bg-[var(--surface)]">
                        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">Daily Goal</h3>
                        <p className="text-xs text-[var(--text-secondary)] mb-4">Solve 2 Hard problems today.</p>
                        <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12">
                                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                                    <circle cx="24" cy="24" r="20" className="fill-none stroke-[var(--background)]" strokeWidth="3" />
                                    <circle cx="24" cy="24" r="20" className="fill-none stroke-[var(--primary)]" strokeWidth="3" strokeDasharray="125.6" strokeDashoffset="125.6" strokeLinecap="round" />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-[var(--text-tertiary)]">
                                    0/2
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-[var(--text-secondary)] mb-1">Progress</div>
                                <div className="w-full bg-[var(--background)] h-1.5 rounded-full">
                                    <div className="bg-[var(--primary)] h-full rounded-full transition-all" style={{ width: "0%" }} />
                                </div>
                                <p className="text-[10px] text-[var(--text-tertiary)] mt-1 font-mono">
                                    {"// keep grinding, you got this"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 border-t border-[var(--border)] pt-6 pb-6 text-center text-xs text-[var(--text-tertiary)] font-mono">
                <p>CodeBoard © 2025 — crafted with intention</p>
            </footer>
        </div>
    )
}
