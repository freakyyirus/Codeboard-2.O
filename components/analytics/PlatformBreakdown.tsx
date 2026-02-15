"use client"

import { Code2, Terminal, Code } from "lucide-react"

export function PlatformBreakdown() {
    const platforms = [
        { name: "LeetCode", icon: Code2, rating: "1,845", solved: 482, color: "text-yellow-500", bg: "bg-yellow-500/10" },
        { name: "Codeforces", icon: Terminal, rating: "1,420", solved: 215, color: "text-blue-500", bg: "bg-blue-500/10" },
        { name: "CodeChef", icon: Code, rating: "1,605", solved: 198, color: "text-orange-900", bg: "bg-orange-900/10" }, // Using orange-900 for brown-ish
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platforms.map((p) => (
                <div key={p.name} className="bg-[#111] border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-white/20 transition-all">
                    <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${p.bg} ${p.color}`}>
                            <p.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="font-medium text-white">{p.name}</div>
                            <div className="text-xs text-gray-500">{p.solved} Solved</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-white font-bold">{p.rating}</div>
                        <div className="text-[10px] text-gray-500">Rating</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
