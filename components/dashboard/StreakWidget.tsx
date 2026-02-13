"use client"

import { Flame, Info } from "lucide-react"

/* ─── Mock Data ────────────────────────────────────────── */

// 4 weeks x 7 days = 28 cells
const contributionData = [
    0, 2, 4, 1, 5, 3, 0, // Week 1
    0, 1, 0, 3, 4, 2, 1, // Week 2
    2, 4, 1, 5, 0, 1, 3, // Week 3
    1, 3, 5, 4, 2, 0, 1  // Week 4 (Current)
]

/* ─── Helpers ──────────────────────────────────────────── */

function getCellColor(count: number) {
    if (count === 0) return "bg-[var(--elevated)]"
    if (count <= 2) return "bg-[#334155]" // Slate-600ish
    if (count <= 4) return "bg-[#047857]" // Emerald-700
    return "bg-[#10B981]" // Emerald-500
}

/* ─── Component ────────────────────────────────────────── */

export function StreakWidget() {
    return (
        <div className="flex flex-col h-full justify-between">
            {/* Header */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Current Streak</h3>
                    <Info className="w-3.5 h-3.5 text-[var(--text-tertiary)] cursor-pointer hover:text-[var(--text-secondary)]" />
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-[48px] font-bold text-[var(--foreground)] leading-none tracking-tight font-mono">
                        12
                    </span>
                    <div className="flex flex-col">
                        <Flame className="w-5 h-5 text-[var(--warning)] flame-flicker" fill="currentColor" />
                        <span className="text-sm font-medium text-[var(--text-secondary)]">days</span>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="space-y-2">
                <div className="grid grid-cols-7 gap-1">
                    {contributionData.map((count, i) => (
                        <div
                            key={i}
                            className={`contribution-cell ${getCellColor(count)}`}
                            title={`${count} problems solved`}
                        />
                    ))}
                </div>
                <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] font-mono uppercase">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                    <span>Sun</span>
                </div>
            </div>
        </div>
    )
}
