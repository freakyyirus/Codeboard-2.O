"use client"

import { CheckCircle, Flame, Clock, Target, TrendingUp } from "lucide-react"

export function StatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Problems Solved */}
            <div className="glass rounded-2xl p-6 card-hover group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/20">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-xs text-green-400 flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                        <TrendingUp className="w-3 h-3" /> +12
                    </span>
                </div>
                <div className="text-3xl font-bold mb-1 text-white relative z-10">482</div>
                <div className="text-sm text-gray-400 relative z-10">Problems Solved</div>
            </div>

            {/* Day Streak */}
            <div className="glass rounded-2xl p-6 card-hover group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-500/20">
                        <Flame className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full border border-white/10">Best: 45</span>
                </div>
                <div className="text-3xl font-bold mb-1 flex items-center gap-2 text-white relative z-10">
                    12 <span className="text-2xl animate-pulse">🔥</span>
                </div>
                <div className="text-sm text-gray-400 relative z-10">Day Streak</div>
            </div>

            {/* Time Spent */}
            <div className="glass rounded-2xl p-6 card-hover group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                        <Clock className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-xs text-blue-400 flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                        <TrendingUp className="w-3 h-3" /> +2.5h
                    </span>
                </div>
                <div className="text-3xl font-bold mb-1 text-white relative z-10">24.5h</div>
                <div className="text-sm text-gray-400 relative z-10">This Week</div>
            </div>

            {/* Global Rank */}
            <div className="glass rounded-2xl p-6 card-hover group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/20">
                        <Target className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full border border-purple-500/20">Top 5%</span>
                </div>
                <div className="text-3xl font-bold mb-1 text-white relative z-10">1,842</div>
                <div className="text-sm text-gray-400 relative z-10">Global Rank</div>
            </div>
        </div>
    )
}
