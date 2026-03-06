"use client"

import { useRewards } from "@/hooks/useRewards"
import { Flame } from "lucide-react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

export function StreakWidget() {
    const { rewards, loading } = useRewards()

    if (loading) {
        return <Skeleton className="h-8 w-20 rounded-full" />
    }

    const streak = rewards?.current_streak || 0
    const isHot = streak > 0

    return (
        <Link href="/dashboard/rewards">
            <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isHot ? 'bg-orange-950/30 border-orange-500/30 text-orange-500' : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                    }`}
            >
                <motion.div
                    animate={isHot ? {
                        scale: [1, 1.2, 1],
                        rotate: [-5, 5, -5]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <Flame className={isHot ? "text-orange-500 drop-shadow-[0_0_8px_rgba(255,69,0,0.8)]" : "text-zinc-500"} size={18} />
                </motion.div>
                <span className="font-bold text-sm">{streak} {streak === 1 ? 'Day' : 'Days'}</span>
            </motion.div>
        </Link>
    )
}
