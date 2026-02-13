"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

const stats = [
    { value: "2,400+", label: "Developers" },
    { value: "500K+", label: "Problems Tracked" },
    { value: "99.9%", label: "Uptime" },
]

export function LandingHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden">
            {/* Floating gradient orbs */}
            <div className="gradient-orb gradient-orb-cyan w-[500px] h-[500px] -top-40 -right-40" />
            <div className="gradient-orb gradient-orb-purple w-[400px] h-[400px] top-1/3 -left-32" />
            <div className="gradient-orb gradient-orb-emerald w-[350px] h-[350px] bottom-20 right-1/4" />

            {/* Dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, var(--text-tertiary) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                }}
            />

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                {/* Badge */}
                <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-sm mb-8 cursor-default">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span className="text-xs font-mono text-[var(--text-secondary)]">
                        v2.0 — Completely redesigned
                    </span>
                </div>

                {/* Headline */}
                <h1 className="animate-fade-in-up animation-delay-100 text-[36px] md:text-[56px] lg:text-[68px] font-display mb-6 text-[var(--foreground)] leading-[1.05]">
                    One dashboard for
                    <br />
                    <span className="gradient-text">every problem</span> you solve.
                </h1>

                {/* Subheadline */}
                <p className="animate-fade-in-up animation-delay-200 text-base md:text-lg text-[var(--text-secondary)] max-w-[580px] mx-auto mb-10 leading-relaxed">
                    Aggregate LeetCode, Codeforces, and GitHub stats. Track streaks,
                    analyze weaknesses, and level up — all without switching tabs.
                </p>

                {/* CTAs */}
                <div className="animate-fade-in-up animation-delay-300 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/login">
                        <Button variant="primary" className="min-w-[160px] font-semibold h-11 text-sm group">
                            Get Started Free
                            <ArrowRight className="w-4 h-4 ml-1. group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="outline" className="min-w-[160px] h-11 text-sm">
                            Explore Features
                        </Button>
                    </Link>
                </div>

                {/* Social proof stats */}
                <div className="animate-fade-in-up animation-delay-500 mt-16 flex items-center justify-center gap-8 md:gap-14">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-xl md:text-2xl font-mono font-bold text-[var(--foreground)] stat-number">
                                {stat.value}
                            </div>
                            <div className="text-xs text-[var(--text-tertiary)] font-mono mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dashboard Preview — glassmorphism card */}
                <div className="animate-fade-in-up animation-delay-600 mt-20 relative">
                    <div className="relative mx-auto gradient-border rounded-[16px] max-w-4xl">
                        <div className="border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl rounded-[16px] shadow-2xl overflow-hidden">
                            {/* Window chrome */}
                            <div className="h-10 bg-[var(--background)]/80 border-b border-[var(--border)] flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[var(--error)]/60" />
                                    <div className="w-3 h-3 rounded-full bg-[var(--warning)]/60" />
                                    <div className="w-3 h-3 rounded-full bg-[var(--success)]/60" />
                                </div>
                                <span className="ml-3 text-[11px] font-mono text-[var(--text-tertiary)]">
                                    codeboard.dev/dashboard
                                </span>
                            </div>

                            {/* Mockup content */}
                            <div className="aspect-[16/9] w-full bg-[var(--background)] relative p-6">
                                {/* Sidebar mockup */}
                                <div className="absolute left-0 top-0 bottom-0 w-[200px] border-r border-[var(--border)] p-4 hidden md:flex flex-col gap-2">
                                    <div className="h-3 w-20 rounded bg-[var(--elevated)] mb-4" />
                                    {["Dev Home", "DSA", "Social", "Studio", "Calendar"].map((label, i) => (
                                        <div
                                            key={label}
                                            className={`flex items-center gap-2 px-2 py-1.5 rounded-[6px] ${i === 0 ? "border-l-2 border-[var(--primary)] bg-[var(--surface)]" : ""}`}
                                        >
                                            <div className={`w-3 h-3 rounded ${i === 0 ? "bg-[var(--primary)]" : "bg-[var(--elevated)]"}`} />
                                            <span className={`text-[10px] font-mono ${i === 0 ? "text-[var(--foreground)]" : "text-[var(--text-tertiary)]"}`}>
                                                {label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Main area */}
                                <div className="md:ml-[216px] space-y-4">
                                    {/* Stat cards */}
                                    <div className="grid grid-cols-4 gap-3">
                                        {[
                                            { label: "Solved", val: "482", accent: "var(--primary)" },
                                            { label: "Acceptance", val: "64.2%", accent: "var(--success)" },
                                            { label: "Hours", val: "24.5h", accent: "var(--warning)" },
                                            { label: "Streak", val: "12🔥", accent: "var(--error)" },
                                        ].map((s) => (
                                            <div key={s.label} className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-3" style={{ borderLeft: `3px solid ${s.accent}` }}>
                                                <div className="text-[8px] font-mono text-[var(--text-tertiary)] mb-1">{s.label}</div>
                                                <div className="text-sm font-mono text-[var(--foreground)] font-semibold">{s.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Activity mock */}
                                    <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                                        {["Two Sum", "Merge K Lists", "Valid Parentheses"].map((name, i) => (
                                            <div key={name} className={`flex items-center gap-3 px-3 py-2 ${i < 2 ? "border-b border-[var(--border)]" : ""}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${i < 2 ? "bg-[var(--success)]" : "bg-[var(--warning)]"}`} />
                                                <span className="text-[10px] text-[var(--foreground)] font-medium flex-1">{name}</span>
                                                <span className="text-[8px] font-mono text-[var(--text-tertiary)]">{["Easy", "Hard", "Easy"][i]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative glow beneath preview */}
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-[var(--primary)] rounded-full blur-[120px] opacity-[0.06]" />
                </div>
            </div>
        </section>
    )
}
