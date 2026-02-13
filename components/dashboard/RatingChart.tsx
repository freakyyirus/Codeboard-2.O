"use client"

import { Info } from "lucide-react"

export function RatingChart() {
    // Mock Data: 10 Contests
    // Values: 1000, 1050, 1030, 1100, 1150, 1120, 1180, 1190, 1160, 1205
    const data = [1000, 1050, 1030, 1100, 1150, 1120, 1180, 1190, 1160, 1205]
    const min = 1000
    const max = 1250
    const range = max - min

    // Generate Path
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100
        const y = 100 - ((val - min) / range) * 100
        return `${x},${y}`
    }).join(" ")

    // Smooth curve would need logic, for now stick to polyline for simplicity
    // Or generate a cubic bezier if possible, but let's stick to simple line for mock

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-6 h-full flex flex-col relative overflow-hidden group">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-[18px] font-medium text-[var(--foreground)]">Rating Progress</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-[var(--platform-codechef)]" />
                        <p className="text-[14px] text-[var(--text-secondary)]">CodeChef • Last 10 contests</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[24px] font-mono font-semibold text-[var(--foreground)] leading-none">1205</p>
                    <p className="text-[12px] text-[var(--success)] font-mono mt-1">+45 last contest</p>
                </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 w-full h-full relative min-h-[200px]">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-t border-[var(--border)] border-dashed opacity-30 w-full" />
                    <div className="border-t border-[var(--border)] border-dashed opacity-30 w-full" />
                    <div className="border-t border-[var(--border)] border-dashed opacity-30 w-full" />
                    <div className="border-t border-[var(--border)] border-dashed opacity-30 w-full" />
                </div>

                {/* SVG Chart */}
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Fill Area */}
                    <path
                        d={`M0,100 L0,${100 - ((data[0] - min) / range) * 100} ${points.split(" ").map(p => "L" + p).join(" ")} L100,100 Z`}
                        fill="url(#chartGradient)"
                    />

                    {/* Line */}
                    <polyline
                        points={points}
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        className="drop-shadow-lg"
                    />

                    {/* Data Points (optional) */}
                    {data.map((val, i) => {
                        const x = (i / (data.length - 1)) * 100
                        const y = 100 - ((val - min) / range) * 100
                        return (
                            <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="4"
                                className="fill-[var(--surface)] stroke-[var(--primary)] stroke-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                vectorEffect="non-scaling-stroke"
                            />
                        )
                    })}
                </svg>

                {/* Tooltip Overlay (Mock Interactive) */}
                <div className="absolute top-0 right-0 p-2 bg-[var(--background)] border border-[var(--border)] rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="font-mono text-white">Latest: 1205</p>
                    <p className="text-[var(--text-tertiary)]">Rank: 245</p>
                </div>
            </div>
        </div>
    )
}
