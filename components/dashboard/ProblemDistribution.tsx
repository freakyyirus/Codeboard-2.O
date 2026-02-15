"use client"

import { motion } from "framer-motion"

export function ProblemDistribution() {
    // Mock data matching the design
    const easy = 2
    const medium = 0
    const hard = 0
    const total = easy + medium + hard || 1 // avoid div by 0

    // Calculate stroke offsets for SVG circles
    // Circumference = 2 * pi * r. Let r=40 -> C ~ 251
    const radius = 40
    const circumference = 2 * Math.PI * radius

    // We only have 1 segment populated in the design (Easy=2), but logic should handle all.
    // Order: Easy (Green), Medium (Yellow), Hard (Red)

    const easyPrct = easy / total
    const mediumPrct = medium / total
    const hardPrct = hard / total

    const easyStroke = easyPrct * circumference
    const mediumStroke = mediumPrct * circumference
    const hardStroke = hardPrct * circumference

    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col h-full">
            <h3 className="text-gray-400 text-sm font-medium mb-6 text-center">Problems Solved</h3>

            <div className="flex items-center justify-between gap-8 h-full">
                {/* Donut Chart */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Background Circle */}
                        <circle
                            cx="64"
                            cy="64"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-white/5"
                        />

                        {/* Easy Segment */}
                        <motion.circle
                            initial={{ strokeDasharray: `0 ${circumference}` }}
                            animate={{ strokeDasharray: `${easyStroke} ${circumference}` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            cx="64"
                            cy="64"
                            r={radius}
                            stroke="#22c55e" // Green-500
                            strokeWidth="8"
                            fill="transparent"
                            strokeLinecap="round"
                        />
                        {/* Medium Segment (Rotated by Easy) */}
                        {/* Implementing complex multi-segment stack requires careful rotation logic. 
                             For simplified "Easy only" view in design, this suffices. 
                             For future: strict stacking order.
                         */}
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-white">{total === 1 && easy === 2 ? 0 : total}</span> {/* Mock logic fix */}
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">DSA</span>
                    </div>
                </div>

                {/* Legend / Stats */}
                <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-green-500 font-medium text-sm">Easy</span>
                        <span className="text-white font-bold">{easy}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-yellow-500 font-medium text-sm">Medium</span>
                        <span className="text-white font-bold">{medium}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-red-500 font-medium text-sm">Hard</span>
                        <span className="text-white font-bold">{hard}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
