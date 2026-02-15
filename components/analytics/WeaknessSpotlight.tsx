"use client"

import { AlertTriangle, TrendingDown, Clock, MoveRight } from "lucide-react"

export function WeaknessSpotlight() {
    const insights = [
        {
            title: "Dynamic Programming",
            desc: "You tend to skip Hard DP problems.",
            icon: AlertTriangle,
            color: "text-red-400",
            bg: "bg-red-500/10",
        },
        {
            title: "Graph Theory",
            desc: "Average solve time is 25m (Goal: 15m).",
            icon: Clock,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
        },
        {
            title: "Contest Performance",
            desc: "Rating dropped by 15 points last week.",
            icon: TrendingDown,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
        },
    ]

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-white font-semibold mb-4">Areas for Improvement</h3>
            <div className="flex-1 space-y-3">
                {insights.map((item, i) => (
                    <div key={i} className="bg-[#1a1a1a] border border-white/5 p-3 rounded-xl flex gap-3 items-start group hover:border-white/10 transition-colors cursor-pointer">
                        <div className={`p-2 rounded-lg shrink-0 ${item.bg} ${item.color}`}>
                            <item.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-gray-200">{item.title}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                        </div>
                        <div className="self-center">
                            <MoveRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-medium text-gray-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                View All Insights
            </button>
        </div>
    )
}
