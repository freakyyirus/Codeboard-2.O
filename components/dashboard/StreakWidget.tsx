"use client"

import { Flame } from "lucide-react"

export function StreakWidget() {
    return (
        <div className="stat-card rounded-2xl p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-400" />
                </div>
                <span className="text-xs text-gray-500">Best: 45</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
                12 <span className="text-2xl">🔥</span>
            </div>
            <div className="text-sm text-gray-400">Day Streak</div>
        </div>
    )
}
