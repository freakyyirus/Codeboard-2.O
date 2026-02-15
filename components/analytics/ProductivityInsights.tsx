"use client"

import { Sun, Calendar, Zap, Award } from "lucide-react"

export function ProductivityInsights() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1a1a1a] border border-white/5 p-4 rounded-xl flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider">
                    <Sun className="w-3 h-3 text-yellow-500" /> Peak Hours
                </div>
                <div className="text-xl font-bold text-white">10 PM - 2 AM</div>
                <div className="text-xs text-gray-500">Night Owl 🦉</div>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 p-4 rounded-xl flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider">
                    <Calendar className="w-3 h-3 text-blue-500" /> Best Day
                </div>
                <div className="text-xl font-bold text-white">Sunday</div>
                <div className="text-xs text-gray-500">Most commits (45)</div>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 p-4 rounded-xl flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider">
                    <Zap className="w-3 h-3 text-orange-500" /> Max Streak
                </div>
                <div className="text-xl font-bold text-white">42 Days</div>
                <div className="text-xs text-gray-500">Oct 12 - Nov 24</div>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 p-4 rounded-xl flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider">
                    <Award className="w-3 h-3 text-purple-500" /> Completion
                </div>
                <div className="text-xl font-bold text-white">Top 5%</div>
                <div className="text-xs text-gray-500">Global Ranking</div>
            </div>
        </div>
    )
}
