"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, BarChart2, Filter } from "lucide-react"

export function ActivityChart() {
    const [timeRange, setTimeRange] = useState("This Year")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    // Generate mock data for the chart - mostly "this year" style data
    const data = [3, 5, 2, 8, 6, 4, 7, 5, 9, 3, 4, 6, 2, 8, 5, 3]

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <BarChart2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-sm text-white">Activity Overview</h3>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white transition-colors"
                    >
                        <span className="text-gray-400">Sort by:</span>
                        <span className="font-medium">{timeRange}</span>
                        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                className="absolute right-0 top-full mt-2 w-32 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl overflow-hidden z-10"
                            >
                                {["This Week", "This Month", "This Year"].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => {
                                            setTimeRange(option)
                                            setIsDropdownOpen(false)
                                        }}
                                        className={`w-full text-left px-4 py-2 text-[10px] transition-colors hover:bg-white/5 ${timeRange === option ? "text-blue-400 font-medium bg-blue-500/5" : "text-gray-400"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex-1 relative h-[180px] w-full">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[100, 75, 50, 25, 0].map((val) => (
                        <div key={val} className="flex items-center w-full">
                            <span className="text-[10px] text-gray-600 w-6 text-right mr-3">{val}%</span>
                            <div className="h-px bg-white/[0.03] flex-1 border-t border-dashed border-white/5" />
                        </div>
                    ))}
                </div>

                {/* Bars */}
                <div className="absolute inset-0 flex items-end justify-between gap-2 pl-9 pt-4 pb-6">
                    {data.map((h, i) => (
                        <div
                            key={i}
                            className="w-full h-full flex items-end relative group"
                        >
                            <div
                                className="w-full bg-gradient-to-t from-blue-600/20 to-blue-500/60 hover:from-blue-600/40 hover:to-blue-400/80 rounded-t-sm transition-all duration-300 relative"
                                style={{ height: `${h * 10}%` }}
                            >
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute -top-[40px] left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-white/10 text-white text-[10px] font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 pointer-events-none shadow-xl z-20 whitespace-nowrap">
                                <span className="text-gray-400">Hours:</span> <span className="text-blue-400">{h}h</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* X Axis Labels */}
                <div className="absolute bottom-0 left-9 right-0 flex justify-between text-[10px] text-gray-600 pt-2 border-t border-white/5">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jul</span>
                    <span>Sep</span>
                    <span>Nov</span>
                </div>
            </div>
        </div>
    )
}
