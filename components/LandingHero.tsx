"use client"

import { ArrowRight, Code2 } from "lucide-react"

export function LandingHero() {
    return (
        <section className="relative pt-32 pb-20 px-6 grid-bg min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text */}
                    <div className="smooth-fade">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 mb-6">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-xs font-mono text-gray-400">TRACKING 500K+ PROBLEMS</span>
                        </div>

                        <h1 className="hero-text font-black mb-6">
                            ONE<br />
                            <span className="gradient-text">DASHBOARD</span><br />
                            FOR ALL
                        </h1>

                        <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                            Aggregate LeetCode, Codeforces, and GitHub stats. Track streaks, analyze weaknesses, and level up — all without switching tabs.
                        </p>

                        <a
                            href="/login"
                            className="group bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all inline-flex items-center gap-3"
                        >
                            GET STARTED FREE
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <div className="flex gap-12 mt-12">
                            <div>
                                <div className="text-3xl font-bold">2,400+</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Developers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">500K+</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Problems Tracked</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">99.9%</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Uptime</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Dashboard Preview Card */}
                    <div className="relative smooth-fade" style={{ animationDelay: "0.2s" }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
                        <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 transform hover:rotate-1 transition-transform duration-500">
                            {/* Browser chrome */}
                            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <span className="ml-4 text-xs text-gray-400 font-mono">codeboard.dev/dashboard</span>
                            </div>
                            {/* Mini stat cards */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-black text-white p-4 rounded-xl">
                                    <div className="text-xs text-gray-400 mb-1">SOLVED</div>
                                    <div className="text-3xl font-bold">482</div>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-xl">
                                    <div className="text-xs text-gray-500 mb-1">STREAK</div>
                                    <div className="text-3xl font-bold flex items-center gap-2">
                                        12 <span className="text-2xl">🔥</span>
                                    </div>
                                </div>
                            </div>
                            {/* Mini problem list */}
                            <div className="space-y-2">
                                {[
                                    { name: "Two Sum", diff: "EASY", color: "green" },
                                    { name: "Merge K Lists", diff: "HARD", color: "yellow" },
                                    { name: "Valid Parentheses", diff: "EASY", color: "green" },
                                ].map((p) => (
                                    <div key={p.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 bg-${p.color}-500 rounded-full`} />
                                            <span className="font-medium text-gray-700">{p.name}</span>
                                        </div>
                                        <span className={`text-xs bg-${p.color}-100 text-${p.color}-700 px-2 py-1 rounded`}>{p.diff}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
