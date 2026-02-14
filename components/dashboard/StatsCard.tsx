"use client"

import { Info } from "lucide-react"

interface StatsCardProps {
    label: string
    value: string | number
}

export function StatsCard({ label, value }: StatsCardProps) {
    return (
        <div className="stat-card p-6 relative">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-300">
                <Info className="w-4 h-4" />
            </button>
            <h3 className="text-gray-400 font-medium mb-2">{label}</h3>
            <p className="text-5xl font-bold text-white">{value}</p>
        </div>
    )
}
