"use client"

import {
    Brain,
    Terminal,
    Users,
    CalendarDays,
    LayoutDashboard,
    Zap,
} from "lucide-react"

const features = [
    {
        icon: LayoutDashboard,
        title: "Dev Dashboard",
        description: "Your unified command center. Stats, streaks, submissions — everything at a glance.",
        accent: "var(--primary)",
        span: "md:col-span-2",
    },
    {
        icon: Brain,
        title: "Problem Logic — DSA",
        description: "Filter by topic, company tag, and difficulty. Track which patterns you've mastered.",
        accent: "var(--warning)",
        span: "",
    },
    {
        icon: Users,
        title: "Social Feed",
        description: "See what friends are solving. Compete on leaderboards. Follow top performers.",
        accent: "var(--success)",
        span: "",
    },
    {
        icon: Terminal,
        title: "CodeBoard Studio",
        description: "A built-in IDE with AI assistance. Write, run, and submit code without leaving the platform.",
        accent: "#8B5CF6",
        span: "md:col-span-2",
    },
    {
        icon: CalendarDays,
        title: "Event Calendar",
        description: "Never miss a contest. LeetCode, Codeforces, HackerRank — all schedules, one calendar.",
        accent: "var(--error)",
        span: "",
    },
    {
        icon: Zap,
        title: "AI-Powered Insights",
        description: "Smart recommendations for what to practice next based on your performance patterns.",
        accent: "var(--primary)",
        span: "",
    },
]

export function FeaturesGrid() {
    return (
        <section className="py-24 relative">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-16">
                    <p className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest mb-4">
                        Features
                    </p>
                    <h2 className="text-[28px] md:text-[40px] font-display text-[var(--foreground)] mb-4">
                        Everything you need,<br className="hidden md:block" /> nothing you don&apos;t.
                    </h2>
                    <p className="text-base text-[var(--text-secondary)] max-w-lg mx-auto">
                        Six powerful modules designed to replace six browser tabs. Focus on solving, not searching.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className={`bento-card group ${feature.span}`}
                        >
                            {/* Subtle gradient accent on hover */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)` }}
                            />

                            <div
                                className="w-10 h-10 rounded-[10px] border border-[var(--border)] flex items-center justify-center mb-5 icon-glow"
                                style={{ background: `${feature.accent}10` }}
                            >
                                <feature.icon
                                    className="w-5 h-5"
                                    style={{ color: feature.accent }}
                                    strokeWidth={1.5}
                                />
                            </div>
                            <h3 className="text-base font-semibold text-[var(--foreground)] mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
