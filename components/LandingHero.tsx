import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-32 pb-12">
            <div className="max-w-4xl mx-auto px-6 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[6px] border border-[var(--border)] bg-[var(--surface)]/50 mb-8 cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                    <span className="text-xs font-mono text-[var(--text-secondary)]">
                        v2.0 shipped
                    </span>
                </div>

                {/* Headline */}
                <h1 className="text-[32px] md:text-5xl lg:text-6xl font-display mb-6 text-[var(--foreground)]">
                    One dashboard for
                    <br className="hidden md:block" />
                    every problem you solve.
                </h1>

                {/* Subheadline */}
                <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-[560px] mx-auto mb-10 leading-relaxed">
                    Aggregate LeetCode, Codeforces, and GitHub stats. Track streaks,
                    analyze weaknesses, and solve problems — all without switching tabs.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/login">
                        <Button variant="primary" className="min-w-[140px] font-semibold">
                            Get Started
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="outline" className="min-w-[140px]">
                            See Features
                        </Button>
                    </Link>
                </div>

                {/* Dashboard Preview — static HTML mockup, no animations */}
                <div className="mt-20 relative">
                    <div className="relative mx-auto border border-[var(--border)] bg-[var(--surface)] rounded-[12px] shadow-2xl overflow-hidden max-w-4xl">
                        {/* Window chrome */}
                        <div className="h-9 bg-[var(--background)] border-b border-[var(--border)] flex items-center px-4 gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--elevated)]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--elevated)]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--elevated)]" />
                            <span className="ml-3 text-[10px] font-mono text-[var(--text-tertiary)]">
                                codeboard — dashboard
                            </span>
                        </div>

                        {/* Mockup content */}
                        <div className="aspect-[16/9] w-full bg-[var(--background)] relative p-6">
                            {/* Sidebar mockup */}
                            <div className="absolute left-0 top-0 bottom-0 w-[200px] border-r border-[var(--border)] p-4 hidden md:flex flex-col gap-2">
                                <div className="h-3 w-20 rounded bg-[var(--elevated)] mb-4" />
                                {["Dashboard", "Problems", "Contests", "Studio"].map((label, i) => (
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
                                        <div key={s.label} className="rounded-[6px] border border-[var(--border)] bg-[var(--surface)] p-3" style={{ borderLeft: `3px solid ${s.accent}` }}>
                                            <div className="text-[8px] font-mono text-[var(--text-tertiary)] mb-1">{s.label}</div>
                                            <div className="text-sm font-mono text-[var(--foreground)] font-semibold">{s.val}</div>
                                        </div>
                                    ))}
                                </div>
                                {/* Table mockup */}
                                <div className="rounded-[6px] border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
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
            </div>
        </section>
    )
}
