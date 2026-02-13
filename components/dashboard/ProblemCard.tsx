"use client"

import { CheckCircle, ArrowRight } from "lucide-react"

type Platform = "Codeforces" | "LeetCode" | "CodeChef" | "HackerRank" | "AtCoder"

interface ProblemCardProps {
    title: string
    platform: Platform
    difficulty: "Easy" | "Medium" | "Hard"
    tags: string[]
    lastAttempted?: string
    solvedBy?: string
    isSolved?: boolean
    id: string
}

const platformConfig = {
    Codeforces: { color: "var(--platform-codeforces)", icon: CodeforcesIcon },
    LeetCode: { color: "var(--platform-leetcode)", icon: LeetCodeIcon },
    CodeChef: { color: "var(--platform-codechef)", icon: CodeChefIcon },
    HackerRank: { color: "var(--platform-hackerrank)", icon: HackerRankIcon },
    AtCoder: { color: "#222", icon: AtCoderIcon },
}

const difficultyConfig = {
    Easy: { bg: "rgba(16, 185, 129, 0.1)", text: "#10B981" },
    Medium: { bg: "rgba(245, 158, 11, 0.1)", text: "#F59E0B" },
    Hard: { bg: "rgba(244, 63, 94, 0.1)", text: "#F43F5E" },
}

export function ProblemCard({ title, platform, difficulty, tags, lastAttempted, solvedBy, isSolved, id }: ProblemCardProps) {
    const config = platformConfig[platform]
    const diffStyle = difficultyConfig[difficulty]

    return (
        <div
            className={`problem-card group relative flex flex-col justify-between p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] h-[160px] cursor-pointer overflow-hidden ${isSolved ? "problem-card-solved" : ""}`}
            style={{ borderLeftColor: isSolved ? "var(--success)" : config.color }}
        >
            {/* Top Row: Icon & Status */}
            <div className="flex justify-between items-start mb-2">
                <div className="w-8 h-8 rounded-[6px] bg-[var(--background)] border border-[var(--border)] flex items-center justify-center transition-colors group-hover:border-[var(--border)]/80">
                    <config.icon className="w-5 h-5 opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" color={config.color} />
                </div>
                {isSolved && (
                    <div className="text-[var(--success)] animate-fade-in">
                        <CheckCircle className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                )}
            </div>

            {/* Title */}
            <div>
                <h3 className="text-[15px] font-medium text-[var(--foreground)] leading-tight line-clamp-2 mb-2 group-hover:text-[var(--primary)] transition-colors duration-200">
                    {title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-2 text-xs">
                    <span
                        className="px-2 py-0.5 rounded-[4px] font-mono leading-none"
                        style={{ backgroundColor: diffStyle.bg, color: diffStyle.text }}
                    >
                        {difficulty}
                    </span>
                    <span className="text-[var(--text-tertiary)] truncate max-w-[120px]">
                        {tags.join(", ")}
                    </span>
                </div>
            </div>

            {/* Bottom Action (Hover Reveal) */}
            <div className="mt-auto pt-3 flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)] border-t border-[var(--border)]/50 group-hover:border-transparent transition-colors">
                <span className="group-hover:opacity-0 transition-opacity duration-200">
                    {lastAttempted ? `Last: ${lastAttempted}` : `Solved by ${solvedBy}`}
                </span>

                <button className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 text-[var(--primary)] font-medium">
                    Solve <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
            </div>
        </div>
    )
}

/* ─── Simple Icons (Placeholder SVGs) ──────────────────── */
function LeetCodeIcon({ className, color }: { className?: string, color: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color }}>
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.173 5.423l.016.016c-.55.6-.96 1.742.063 2.768a4.015 4.015 0 0 0 3.75 1.157c.506-.11 1.012-.34 1.464-.672l1.644-1.229a.666.666 0 0 1 .63-.095.666.666 0 0 1 .373.805.65.65 0 0 1-.225.318l-1.649 1.234a5.353 5.353 0 0 1-1.956.9 5.343 5.343 0 0 1-5.006-1.543l-.014-.014C.68 3.036 5.86-2.583 13.483 0zm-2.097 5.753a.667.667 0 0 1 .937.105l7.218 9.531c2.193 2.896-.289 7.42-3.868 6.079-1.996-.749-2.903-2.61-2.903-2.61l.013-.016a5.344 5.344 0 0 1-2.955-4.821 5.362 5.362 0 0 1 1.455-3.19l.013-.012.012-.012a.668.668 0 0 1 .078-.954zM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z" fillOpacity="0.2" /> {/* Background circle for better visibility */}
            <path d="M16.125 0l-.004.004a1.765 1.765 0 0 0-.482 1.37 1.77 1.77 0 0 0 1.258 1.492l.024.004h.024a1.77 1.77 0 0 0 1.368-.48 1.766 1.766 0 0 0 .5-1.341l-.004-.037H16.125z" transform="translate(3 3) scale(0.7)" />
            {/* Simplified generic mark */}
            <path d="M10 2l-2 2h8l-2-2h-4z" />
        </svg>
    )
}

function CodeforcesIcon({ className, color }: { className?: string, color: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color }}>
            <rect x="2" y="12" width="6" height="10" rx="1.5" />
            <rect x="9" y="4" width="6" height="18" rx="1.5" opacity="0.8" />
            <rect x="16" y="8" width="6" height="14" rx="1.5" opacity="0.6" />
        </svg>
    )
}

function CodeChefIcon({ className, color }: { className?: string, color: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color }}>
            <path d="M12 2L2 8l10 6 10-6-10-6zm0 12l-10-6v8l10 6 10-6v-8l-10 6z" />
        </svg>
    )
}

function HackerRankIcon({ className, color }: { className?: string, color: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color }}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-4H7v4H5V8h2v4h2V8h2v8zm5-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
        </svg>
    )
}

function AtCoderIcon({ className, color }: { className?: string, color: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color }}>
            <circle cx="12" cy="12" r="10" />
        </svg>
    )
}
