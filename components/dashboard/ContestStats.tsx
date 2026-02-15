"use client"

import { Trophy } from "lucide-react"

export function ContestStats() {
    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex items-center justify-between h-full">
            <div className="flex flex-col items-center justify-center w-1/3 border-r border-white/10 pr-4">
                <div className="text-gray-400 text-sm font-medium mb-2 text-center">Total Contests</div>
                <div className="text-5xl font-bold text-white tracking-tight">8</div>
            </div>

            <div className="flex-1 pl-6 space-y-3">
                <div className="flex items-center justify-between bg-white/[0.03] p-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3">
                        {/* Placeholder for CodeChef Icon - replacing with generic chef/trophy if not available */}
                        <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
                            <span className="text-xs">CC</span>
                        </div>
                        <span className="text-gray-300 font-medium">CodeChef</span>
                    </div>
                    <span className="text-white font-bold">6</span>
                </div>

                <div className="flex items-center justify-between bg-white/[0.03] p-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3">
                        {/* Placeholder for CodeForces Icon */}
                        <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center">
                            <div className="flex gap-0.5 items-end h-3">
                                <div className="w-1 h-1.5 bg-yellow-400 rounded-sm"></div>
                                <div className="w-1 h-2.5 bg-blue-400 rounded-sm"></div>
                                <div className="w-1 h-3 bg-red-400 rounded-sm"></div>
                            </div>
                        </div>
                        <span className="text-gray-300 font-medium">CodeForces</span>
                    </div>
                    <span className="text-white font-bold">2</span>
                </div>
            </div>
        </div>
    )
}
