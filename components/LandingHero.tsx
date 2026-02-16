"use client"

import { ArrowRight, Code2 } from "lucide-react"

export function LandingHero() {
    return (
        <section className="pt-16 pb-8 md:pt-20 md:pb-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                    {/* Left: Text */}
                    <div className="smooth-fade text-center lg:text-left">
                        {/* Banner */}
                        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-neutral-700 mb-4 sm:mb-6">
                            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs sm:text-sm font-mono text-gray-300 font-semibold">TRACKING 500K+ PROBLEMS</span>
                        </div>

                        {/* Hero Title */}
                        <h1 className="font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6">
                            ONE<br className="hidden sm:block" />
                            <span className="gradient-text">DASHBOARD</span><br />
                            FOR ALL
                        </h1>

                        {/* Subtitle */}
                        <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8">
                            Aggregate LeetCode, Codeforces, and GitHub stats. Track streaks, analyze weaknesses, and level up — all without switching tabs.
                        </p>

                        {/* CTA Button */}
                        <a
                            href="/sign-in"
                            className="group bg-white text-black w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:scale-105 transition-all inline-flex items-center justify-center gap-2 sm:gap-3"
                        >
                            GET STARTED FREE
                            <ArrowRight className="w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
                        </a>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 sm:mt-12 max-w-lg mx-auto lg:mx-0">
                            <div className="text-center lg:text-left">
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">2,400+</div>
                                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mt-1 font-semibold">Developers</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">500K+</div>
                                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mt-1 font-semibold">Problems</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">99.9%</div>
                                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mt-1 font-semibold">Uptime</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Dashboard Preview Card */}
                    <div className="relative smooth-fade mt-6 lg:mt-0" style={{ animationDelay: "0.2s" }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl sm:blur-3xl rounded-full" />
                        <div className="relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-2xl border border-gray-200">
                            {/* Browser chrome */}
                            <div className="flex items-center gap-2 mb-2 sm:mb-3 border-b border-gray-100 pb-2 sm:pb-3">
                                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-400" />
                                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-400" />
                                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-400" />
                                <span className="ml-2 sm:ml-3 text-xs text-gray-400 font-mono">codeboard.dev/dashboard</span>
                            </div>
                            {/* Mini stat cards */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
                                <div className="bg-black text-white p-2 sm:p-3 rounded-lg">
                                    <div className="text-xs text-gray-400 mb-1 font-semibold">SOLVED</div>
                                    <div className="text-xl sm:text-2xl md:text-3xl font-bold">482</div>
                                </div>
                                <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                                    <div className="text-xs text-gray-500 mb-1 font-semibold">STREAK</div>
                                    <div className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-1 sm:gap-2">
                                        12 <span className="text-lg sm:text-xl">🔥</span>
                                    </div>
                                </div>
                            </div>
                            {/* Mini problem list */}
                            <div className="space-y-1.5 sm:space-y-2">
                                {[
                                    { name: "Two Sum", diff: "EASY", color: "green" },
                                    { name: "Merge K Lists", diff: "HARD", color: "yellow" },
                                    { name: "Valid Parentheses", diff: "EASY", color: "green" },
                                ].map((p) => (
                                    <div key={p.name} className="flex items-center justify-between p-1.5 sm:p-2 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-1.5 sm:gap-2">
                                            <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 bg-${p.color}-500 rounded-full`} />
                                            <span className="font-medium text-gray-700 text-xs sm:text-sm">{p.name}</span>
                                        </div>
                                        <span className={`text-xs bg-${p.color}-100 text-${p.color}-700 px-1.5 sm:px-2 py-0.5 rounded font-medium`}>{p.diff}</span>
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
