"use client"

import { motion } from "framer-motion"

type LeaderboardUser = {
    rank: number
    username: string
    handle: string
    avatar: string
    score: number
    metricValue?: number
    country?: string
}

export function LeaderboardTable({ users, metricLabel = "Total Questions" }: { users: LeaderboardUser[]; metricLabel?: string }) {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#111]">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10 text-xs text-gray-400 uppercase tracking-wider bg-white/5">
                        <th className="p-4 w-20 text-center">Rank</th>
                        <th className="p-4">User</th>
                        <th className="p-4 text-right">{metricLabel}</th>
                        <th className="p-4 text-right">Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <motion.tr
                            key={user.handle}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.18, delay: Math.min(index * 0.02, 0.12), ease: "easeOut" }}
                            className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                        >
                            <td className="p-4 text-center">
                                <span className="font-mono text-gray-500 group-hover:text-white transition-colors">#{user.rank}</span>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                                        <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt={user.username} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium text-sm">{user.username}</div>
                                        <div className="text-gray-600 text-xs">@{user.handle}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-right text-gray-300 font-mono">
                                {(user.metricValue ?? user.score).toLocaleString()}
                            </td>
                            <td className="p-4 text-right">
                                <span className={`text-xs px-2 py-1 rounded bg-white/5 border border-white/10 ${user.score > 2000 ? 'text-yellow-500 border-yellow-500/20' : 'text-gray-400'}`}>
                                    {Math.round(user.score / 5)} {/* Mock rating calc */}
                                </span>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
