"use client"

import { Calendar, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"

export function AnalyticsHeader({ timeRange, setTimeRange }: { timeRange: string, setTimeRange: (range: string) => void }) {
    const ranges = ["7 Days", "30 Days", "6 Months", "1 Year", "All Time"]

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                    <BarChart3 className="w-7 h-7 text-purple-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white">Analytics</h1>
                    <p className="text-gray-500 text-sm mt-1">Track your coding performance and growth.</p>
                </div>
            </div>

            <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/5 self-start md:self-auto overflow-x-auto max-w-full">
                {ranges.map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${timeRange === range ? "text-white" : "text-gray-500 hover:text-gray-300"
                            }`}
                    >
                        {timeRange === range && (
                            <motion.div
                                layoutId="analytics-range-bg"
                                className="absolute inset-0 bg-white/10 rounded-lg"
                                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                            />
                        )}
                        <span className="relative z-10">{range}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
