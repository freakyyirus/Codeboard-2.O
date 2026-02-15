"use client"

import { CheckCircle2, Clock, Flame, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function AnalyticsSummaryCards() {
    const metrics = [
        {
            label: "Problems Solved",
            value: "1,248",
            change: "+12%",
            trend: "up",
            icon: CheckCircle2,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "Coding Time",
            value: "48h 20m",
            change: "+5.4%",
            trend: "up",
            icon: Clock,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            label: "Current Streak",
            value: "14 Days",
            change: "-2 days",
            trend: "down",
            icon: Flame,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            label: "Consistency Score",
            value: "92",
            change: "+2.1%",
            trend: "up",
            icon: TrendingUp,
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m) => (
                <div key={m.label} className="bg-[#111] border border-white/10 p-5 rounded-xl flex flex-col justify-between group hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg ${m.bg} ${m.color}`}>
                            <m.icon className="w-5 h-5" />
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${m.trend === "up" ? "text-green-400 border-green-500/20 bg-green-500/10" : "text-red-400 border-red-500/20 bg-red-500/10"}`}>
                            {m.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {m.change}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white mb-1">{m.value}</div>
                        <div className="text-sm text-gray-500">{m.label}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
