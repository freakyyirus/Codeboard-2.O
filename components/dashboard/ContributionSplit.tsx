"use client"

import { motion } from "framer-motion"
import { Code, GitCommit } from "lucide-react"

export function ContributionSplit({ devCounts, dsaCounts }: { devCounts: number, dsaCounts: number }) {
    const total = devCounts + dsaCounts || 1 // Avoid div 0

    const radius = 50
    const circumference = 2 * Math.PI * radius

    // Percentages
    const devPrct = devCounts / total
    const dsaPrct = dsaCounts / total

    const devStroke = devPrct * circumference
    const dsaStroke = dsaPrct * circumference

    // Rotation: Start Dev at 0 (top-ish)
    // Start DSA after Dev: stroke-dashoffset needs calc or simple rotation
    // Simple stacking: 
    // Circle 1: Dev (0 to devPrct)
    // Circle 2: DSA (shifted by devPrct)

    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 flex flex-col h-full card-hover group">
            <h3 className="text-gray-400 text-sm font-medium mb-6 flex items-center gap-2">
                Contribution Split
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-gray-500">Live</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 h-full">
                {/* Radial Chart */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Track */}
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            stroke="#333"
                            strokeWidth="10"
                            fill="transparent"
                            className="opacity-50"
                        />

                        {/* Dev Segment (Blue/Purple) */}
                        <motion.circle
                            initial={{ strokeDasharray: `0 ${circumference}` }}
                            animate={{ strokeDasharray: `${devStroke} ${circumference}` }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            cx="50%"
                            cy="50%"
                            r={radius}
                            stroke="#8b5cf6" // Violet-500
                            strokeWidth="10"
                            fill="transparent"
                            strokeLinecap="round"
                        />

                        {/* DSA Segment (Green) - We need to rotate it to start where Dev ends */}
                        <motion.circle
                            initial={{ strokeDasharray: `0 ${circumference}` }}
                            animate={{ strokeDasharray: `${dsaStroke} ${circumference}` }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                            cx="50%"
                            cy="50%"
                            r={radius}
                            stroke="#22c55e" // Green-500
                            strokeWidth="10"
                            fill="transparent"
                            strokeLinecap="round"
                            style={{
                                display: dsaCounts > 0 ? 'block' : 'none',
                                transformOrigin: 'center',
                                rotate: `${devPrct * 360}deg` // Rotate properly
                            }}
                        />
                    </svg>

                    {/* Inner Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl sm:text-3xl font-bold text-white tracking-tighter">
                            {total === 1 && devCounts === 0 ? 0 : total}
                        </span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Total</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex-1 w-full space-y-3 min-w-0">
                    {/* Dev Item */}
                    <div className="group/item flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-violet-500/30 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                                <GitCommit className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-white font-medium text-sm truncate">Development</span>
                                <span className="text-xs text-gray-500 truncate">GitHub Activity</span>
                            </div>
                        </div>
                        <span className="text-violet-400 font-bold ml-2">{devCounts}</span>
                    </div>

                    {/* DSA Item */}
                    <div className="group/item flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-green-500/30 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                                <Code className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-white font-medium text-sm truncate">DSA</span>
                                <span className="text-xs text-gray-500 truncate">Problems Solved</span>
                            </div>
                        </div>
                        <span className="text-green-400 font-bold ml-2">{dsaCounts}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
