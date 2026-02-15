"use client"

import { Info } from "lucide-react"

interface StatCardProps {
    title: string
    value: string | number
    infoTooltip?: string
}

export function StatCard({ title, value, infoTooltip }: StatCardProps) {
    return (
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 flex flex-col justify-between h-full relative group">
            <div className="absolute top-3 right-3 text-gray-600 hover:text-gray-400 cursor-help transition-colors">
                <Info className="w-4 h-4" />
            </div>

            <div className="text-gray-400 text-sm font-medium mb-2">{title}</div>

            <div className="flex items-end justify-center h-full">
                <div className="text-5xl font-bold text-white tracking-tight">
                    {value}
                </div>
            </div>
        </div>
    )
}
