"use client"

import { motion } from "framer-motion"
import { Crown, Trophy } from "lucide-react"

type LeaderboardUser = {
    rank: number
    username: string
    handle: string
    avatar: string
    score: number
    country?: string
}

export function LeaderboardPodium({ top3 }: { top3: LeaderboardUser[] }) {
    // Expect top3 to be sorted by rank [1, 2, 3]
    // But for visual podium we want order: [2, 1, 3] (Left, Center, Right)
    const first = top3.find(u => u.rank === 1)
    const second = top3.find(u => u.rank === 2)
    const third = top3.find(u => u.rank === 3)

    return (
        <div className="flex items-end justify-center gap-4 md:gap-8 mb-8 mt-4 pt-12">
            {/* Rank 2 - Silver */}
            {second && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative group">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gray-300 p-1 bg-[#111] overflow-hidden relative z-10">
                            <img src={second.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${second.username}`} alt={second.username} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-300 text-black font-bold text-xs px-2 py-0.5 rounded-full border-2 border-[#111] z-20">
                            #2
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="text-white font-semibold text-sm md:text-base">{second.username}</div>
                        <div className="text-gray-500 text-xs">@{second.handle}</div>
                        <div className="mt-2 text-gray-300 font-bold bg-white/5 px-3 py-1 rounded-full text-sm inline-block">
                            {second.score.toLocaleString()}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Rank 1 - Gold */}
            {first && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center -mt-8 mx-2 z-10"
                >
                    <div className="relative group">
                        {/* Crown Icon */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                            <Crown className="w-8 h-8 fill-yellow-400" />
                        </div>

                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-yellow-400 p-1 bg-[#111] overflow-hidden relative z-10 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                            <img src={first.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${first.username}`} alt={first.username} className="w-full h-full rounded-full object-cover" />
                        </div>

                        {/* Medal/Rank Badge */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-br from-yellow-300 to-yellow-600 text-black font-bold text-lg w-10 h-10 flex items-center justify-center rounded-full border-4 border-[#111] z-20 shadow-lg">
                            1
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <div className="text-white font-bold text-lg md:text-xl">{first.username}</div>
                        <div className="text-gray-500 text-xs">@{first.handle}</div>
                        <div className="mt-2 text-yellow-400 font-bold bg-yellow-400/10 border border-yellow-400/20 px-4 py-1.5 rounded-full text-base inline-block">
                            {first.score.toLocaleString()}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Rank 3 - Bronze */}
            {third && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative group">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-amber-700 p-1 bg-[#111] overflow-hidden relative z-10">
                            <img src={third.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${third.username}`} alt={third.username} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-700 text-white font-bold text-xs px-2 py-0.5 rounded-full border-2 border-[#111] z-20">
                            #3
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <div className="text-white font-semibold text-sm md:text-base">{third.username}</div>
                        <div className="text-gray-500 text-xs">@{third.handle}</div>
                        <div className="mt-2 text-gray-300 font-bold bg-white/5 px-3 py-1 rounded-full text-sm inline-block">
                            {third.score.toLocaleString()}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
