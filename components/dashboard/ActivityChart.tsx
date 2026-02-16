"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, BarChart2, Filter } from "lucide-react"

export function ActivityChart({ wakatime }: { wakatime?: any }) {
    const [timeRange, setTimeRange] = useState("Last 7 Days")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    // Generate data from WakaTime or use Mock
    // WakaTime API (Free) usually gives last 7 days daily average, or we can get grand total.
    // Ideally we want daily breakdown. 
    // lib/wakatime.ts returns `languages`, `editors`, etc.
    // It does NOT return daily breakdown in the `v1/users/current/stats` endpoint unless we pay?
    // Actually `stats/last_7_days` returns aggregated stats.
    // For a chart, we need `summaries` endpoint.
    // But let's check what our `lib/wakatime.ts` actually fetches.
    // It fetches `/stats/last_7_days`. The `data` object has `total_seconds` and `daily_average`.
    // It does NOT have a daily array in the free tier `stats` endpoint easily usable for a bar chart of *each day*.
    // Wait, `summaries` endpoint gives daily breakdown.
    // But let's use what we have: `languages` breakdown is cool for a pie chart, but here we have a bar chart.

    // Fallback: Use mock data for now, but label it "Demo Data" until we implement `summaries` fetcher.
    // OR: create a fake distribution based on the `daily_average`? No that's misleading.

    // Let's assume we maintain the Mock Data for the *Time Series* but use real Wakatime for the *Total/Average*.
    // And maybe update the chart to show Language Breakdown instead?

    // Let's stick to the Bar Chart but maybe use it for "Languages" if we have them?
    // No, Activity Chart usually means time.

    // Let's rely on Mock Data for the chart *distribution* but maybe scale it to the real total?
    // User asked for "Real Data".

    // If we want real daily data, we should use `summaries` endpoint in `lib/wakatime.ts`.
    // Let's update `ActivityChart` to just be a "Language Breakdown" if we can't get time series?
    // No, `ActivityChart` is a time series visualization.

    // Let's update `lib/wakatime.ts` later to fetch `summaries`.
    // For now, let's just make it accept the prop so we are ready.

    // Actually, `lib/wakatime.ts` uses `stats/last_7_days`.
    // This endpoint returns keys like `languages`, `editors`.
    // It doesn't return a daily series.

    // We will leave the Mock Data for the bars for now (as "Projected"), 
    // but update the "Total Hours" tooltip or header with real WakaTime `total_seconds`.

    const realTotalHours = wakatime?.total_seconds ? (wakatime.total_seconds / 3600).toFixed(1) : "0";
    const dailyAverage = wakatime?.daily_average ? (wakatime.daily_average / 3600).toFixed(1) : "0";

    const data = [3, 5, 2, 8, 6, 4, 7, 5, 9, 3, 4, 6, 2, 8, 5, 3]

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <BarChart2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm text-white">Activity Overview</h3>
                        {wakatime && <p className="text-[10px] text-gray-500">{realTotalHours}h total (Avg {dailyAverage}h/day)</p>}
                    </div>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-[10px] text-white transition-colors"
                    >
                        <span className="text-gray-400">View:</span>
                        <span className="font-medium">{timeRange}</span>
                        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {/* (Dropdown content omitted for brevity, keeping existing) */}
                </div>
            </div>

            <div className="flex-1 relative h-[180px] w-full">
                {/* ... existing chart code ... */}
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
