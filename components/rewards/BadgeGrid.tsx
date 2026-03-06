"use client"

import { useRewards } from "@/hooks/useRewards"
import { Trophy, Medal, Flame, Shield, Users, Smartphone, BarChart } from "lucide-react"
import { motion } from "framer-motion"

export function BadgeGrid() {
    const { allBadges, userBadges, loading } = useRewards()

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="animate-pulse w-full h-32 bg-zinc-800 rounded-xl" />
                ))}
            </div>
        )
    }

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Fire': return <Flame className="text-orange-500" size={32} />
            case 'Fire_Gold': return <Flame className="text-yellow-400" size={32} />
            case 'Fire_Diamond': return <Flame className="text-cyan-400" size={32} />
            case 'Bronze_Medal': return <Medal className="text-[#CD7F32]" size={32} />
            case 'Trophy': return <Trophy className="text-yellow-400" size={32} />
            case 'Users': return <Users className="text-purple-400" size={32} />
            case 'Smartphone': return <Smartphone className="text-blue-400" size={32} />
            case 'BarChart': return <BarChart className="text-green-400" size={32} />
            default: return <Shield className="text-zinc-400" size={32} />
        }
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allBadges.map((badge: any) => {
                const isEarned = userBadges.includes(badge.badge_type)
                return (
                    <motion.div
                        whileHover={isEarned ? { scale: 1.05, y: -5 } : {}}
                        key={badge.id}
                        className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${isEarned
                                ? 'bg-zinc-900 border-yellow-500/30 shadow-[0_4px_20px_rgba(255,215,0,0.05)]'
                                : 'bg-zinc-950 border-zinc-800 opacity-60 grayscale'
                            }`}
                    >
                        <div className={`mb-3 p-3 rounded-full ${isEarned ? 'bg-zinc-800' : 'bg-zinc-900'}`}>
                            {getIcon(badge.icon)}
                        </div>
                        <h4 className={`text-sm font-bold text-center ${isEarned ? 'text-zinc-200' : 'text-zinc-500'}`}>
                            {badge.name}
                        </h4>
                        <p className="text-xs text-center text-zinc-500 mt-1 line-clamp-2">
                            {badge.description}
                        </p>
                    </motion.div>
                )
            })}
        </div>
    )
}
