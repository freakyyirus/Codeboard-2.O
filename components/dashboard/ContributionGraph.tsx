"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/PremiumEffects"

type Contribution = {
    date: string
    count: number
}

export function ContributionGraph({ contributions }: { contributions: Contribution[] }) {
    // Generate last 365 days
    const days = useMemo(() => {
        const today = new Date()
        const dates = []
        for (let i = 364; i >= 0; i--) {
            const d = new Date(today)
            d.setDate(d.getDate() - i)
            dates.push(d.toISOString().split('T')[0])
        }
        return dates
    }, [])

    const contributionMap = useMemo(() => {
        return new Map(contributions.map(c => [c.date, c.count]))
    }, [contributions])

    // Helper to get color intensity
    const getColor = (count: number) => {
        if (count === 0) return "bg-white/[0.03]"
        if (count <= 2) return "bg-green-900/40"
        if (count <= 5) return "bg-green-700/60"
        if (count <= 8) return "bg-green-500/80"
        return "bg-green-400"
    }

    // Helper to format date
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    // Group days into weeks for column-based structure (53 columns)
    const weeks = useMemo(() => {
        const w = []
        // We have 365 days. 365/7 = 52.1. 
        // We need to slice them carefully. 
        // The grid fills column by column (grid-flow-col).
        // Each column is 7 items (rows).
        for (let i = 0; i < days.length; i += 7) {
            w.push(days[i]) // Just need the first day of the week for the label
        }
        return w
    }, [days])

    const totalContributions = contributions.reduce((acc, curr) => acc + curr.count, 0)

    return (
        <FadeIn className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-sm">
                    {totalContributions || 0} contributions in the last year
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span>Less</span>
                    <div className="w-2.5 h-2.5 rounded-sm bg-white/[0.03]" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-green-900/40" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-green-700/60" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-green-500/80" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-green-400" />
                    <span>More</span>
                </div>
            </div>

            <div className="overflow-x-auto pb-2 scrollbar-hide">
                {/* Month Labels Row */}
                <div className="flex gap-0.5 mb-2 min-w-max">
                    {weeks.map((dateStr, i) => {
                        const date = new Date(dateStr)
                        const month = date.toLocaleString('default', { month: 'short' })
                        // Only show label if it's the first occurrence of this month
                        const prevDate = i > 0 ? new Date(weeks[i - 1]) : null
                        const prevMonth = prevDate ? prevDate.toLocaleString('default', { month: 'short' }) : ''
                        const showLabel = month !== prevMonth

                        return (
                            <div key={i} className="w-2.5 text-[9px] text-gray-500 font-mono text-center">
                                {showLabel ? month : ''}
                            </div>
                        )
                    })}
                </div>

                <div className="flex gap-0.5 min-w-max">
                    <div className="grid grid-rows-7 grid-flow-col gap-0.5">
                        {days.map((date) => {
                            const count = contributionMap.get(date) || 0
                            return (
                                <motion.div
                                    key={date}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className={`w-2.5 h-2.5 rounded-sm ${getColor(count)} cursor-pointer relative group transition-colors hover:border hover:border-white/20`}
                                >
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 border border-white/10 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        {count} contributions on {formatDate(date)}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
