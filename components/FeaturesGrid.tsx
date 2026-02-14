"use client"

import { LayoutDashboard, Network, Users, Terminal, Calendar, Zap } from "lucide-react"

const features = [
    { icon: LayoutDashboard, num: "01", title: "DEV DASHBOARD", desc: "Your unified command center. Stats, streaks, submissions — everything at a glance.", wide: true, inverted: true },
    { icon: Network, num: "02", title: "DSA TRACKER", desc: "Filter by topic, company tag, and difficulty.", wide: false, inverted: false },
    { icon: Users, num: "03", title: "SOCIAL FEED", desc: "See what friends are solving. Compete on leaderboards.", wide: false, inverted: false },
    { icon: Terminal, num: "04", title: "CODEBOARD STUDIO", desc: "A built-in IDE with AI assistance. Write, run, and submit code without leaving.", wide: true, inverted: true },
    { icon: Calendar, num: "05", title: "CONTEST CALENDAR", desc: "Never miss a contest. All schedules, one calendar.", wide: false, inverted: false },
    { icon: Zap, num: "06", title: "AI RECOMMENDATIONS", desc: "Smart recommendations based on your patterns.", wide: false, inverted: false },
]

export function FeaturesGrid() {
    return (
        <section id="features" className="py-24 px-6 bg-white text-black">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full border border-black/20 text-xs font-bold uppercase tracking-wider mb-4">
                        Features
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight text-black">
                        EVERYTHING<br />YOU NEED.
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Six powerful modules designed to replace six browser tabs. Focus on solving, not searching.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid md:grid-cols-3 gap-4" style={{ gridAutoRows: "200px" }}>
                    {features.map((f) => (
                        <div
                            key={f.num}
                            className={`bento-card ${f.wide ? "md:col-span-2" : ""} ${f.inverted ? "bg-black text-white" : "bg-gray-100"
                                } rounded-3xl p-8 flex flex-col justify-between group cursor-pointer`}
                        >
                            <div>
                                <div className={`w-12 h-12 ${f.inverted ? "bg-white/10 group-hover:bg-white/20" : "bg-black group-hover:scale-110"
                                    } rounded-2xl flex items-center justify-center mb-4 transition-all`}>
                                    <f.icon className={`w-6 h-6 ${f.inverted ? "text-white" : "text-white"}`} />
                                </div>
                                <div className={`text-xs font-mono ${f.inverted ? "text-gray-500" : "text-gray-400"} mb-2`}>
                                    {f.num}
                                </div>
                                <h3 className={`${f.wide ? "text-2xl" : "text-xl"} font-bold mb-2`}>
                                    {f.title}
                                </h3>
                                <p className={`${f.inverted ? "text-gray-400" : "text-gray-600"} text-sm ${f.wide ? "max-w-sm" : ""}`}>
                                    {f.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
