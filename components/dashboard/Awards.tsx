"use client"

import { Flame, Star, Trophy } from "lucide-react"

export function Awards() {
    const medals = [
        { icon: Flame, label: "Streak Master" },
        { icon: Star, label: "Rising Star" },
        { icon: Trophy, label: "Contest Winner" },
    ]

    return (
        <div className="stat-card p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 font-medium">Awards</h3>
                <span className="text-sm text-gray-500">{medals.length}</span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
                {medals.map((m, i) => (
                    <div
                        key={i}
                        className="medal w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex items-center justify-center shadow-lg"
                    >
                        <m.icon className="w-8 h-8 text-white" />
                    </div>
                ))}
            </div>
            <button className="w-full text-center text-blue-400 text-sm font-medium hover:underline">
                show more
            </button>
        </div>
    )
}
