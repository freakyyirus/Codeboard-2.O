"use client"

import { Clock, Calendar, ExternalLink } from "lucide-react"

interface ContestCountdownProps {
    title: string
    platform: "Codeforces" | "LeetCode" | "HackerRank"
    startTime: Date
    link: string
}

export function ContestCountdown({ title, platform, startTime, link }: ContestCountdownProps) {
    // Determine status (static mock for now, would be dynamic with date-fns)
    const isSoon = true

    return (
        <div className="relative overflow-hidden rounded-[12px] bg-[var(--surface)] border border-[var(--border)] p-5 group">
            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] to-[var(--elevated)] opacity-50" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--accent)] rounded-full blur-[60px]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Platform Label */}
                <div className="flex items-center gap-2 mb-4">
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{
                            background: platform === "Codeforces" ? "var(--platform-codeforces)" :
                                platform === "LeetCode" ? "var(--platform-leetcode)" :
                                    "var(--platform-hackerrank)"
                        }}
                    />
                    <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                        {platform}
                    </span>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-baseline gap-1 font-mono text-[var(--foreground)] leading-none mb-2 tabular-nums">
                    <span className="text-[32px] font-bold">02</span>
                    <span className="text-[32px] font-light text-[var(--text-tertiary)] colon-pulse">:</span>
                    <span className="text-[32px] font-bold">14</span>
                    <span className="text-[32px] font-light text-[var(--text-tertiary)] colon-pulse">:</span>
                    <span className="text-[32px] font-bold text-[var(--warning)]">33</span>
                </div>

                <div className="flex items-center gap-8 w-full justify-center text-[10px] text-[var(--text-tertiary)] font-mono uppercase tracking-widest mb-6">
                    <span className="translate-x-1.5">Hours</span>
                    <span>Minutes</span>
                    <span className="-translate-x-1.5">Seconds</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-[var(--foreground)] mb-6 max-w-[200px] leading-relaxed">
                    {title}
                </h3>

                {/* Actions */}
                <div className="w-full space-y-2">
                    <a
                        href={link}
                        className="flex items-center justify-center w-full py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[6px] text-xs font-semibold hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Register Now
                    </a>
                    <div className="flex justify-center">
                        <span className="text-[10px] text-[var(--text-tertiary)] flex items-center gap-1.5 font-mono">
                            <Clock className="w-3 h-3" strokeWidth={1.5} /> Starts at 20:00 UTC
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
