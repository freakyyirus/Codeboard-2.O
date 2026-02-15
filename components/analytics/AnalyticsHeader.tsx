"use client"

import { Calendar } from "lucide-react"
import { motion } from "framer-motion"

export function AnalyticsHeader({ timeRange, setTimeRange }: { timeRange: string, setTimeRange: (range: string) => void }) {
    const ranges = ["7 Days", "30 Days", "6 Months", "1 Year", "All Time"]

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
                <p className="text-gray-500">Track your coding performance and growth.</p>
            </div>

            <div className="flex items-center gap-1 bg-[#111] p-1 rounded-lg border border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
                {ranges.map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${timeRange === range ? "text-white" : "text-gray-500 hover:text-gray-300"
                            }`}
                    >
                        {timeRange === range && (
                            <motion.div
                                layoutId="analytics-range-bg"
                                className="absolute inset-0 bg-white/10 rounded-md"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{range}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
