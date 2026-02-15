"use client"

import { ReactNode } from "react"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
    title: string
    value: string | number
    subValue?: string
    icon: LucideIcon
    badgeText?: string
    color: "green" | "orange" | "blue" | "purple"
}

export function MetricCard({ title, value, subValue, icon: Icon, badgeText, color }: MetricCardProps) {
    const colorStyles = {
        green: {
            bg: "bg-green-500/10",
            text: "text-green-500",
            border: "group-hover:border-green-500/30",
            iconBg: "bg-green-900/20",
            badge: "text-green-400 bg-green-500/10"
        },
        orange: {
            bg: "bg-orange-500/10",
            text: "text-orange-500",
            border: "group-hover:border-orange-500/30",
            iconBg: "bg-orange-900/20",
            badge: "text-orange-400 bg-orange-500/10"
        },
        blue: {
            bg: "bg-blue-500/10",
            text: "text-blue-500",
            border: "group-hover:border-blue-500/30",
            iconBg: "bg-blue-900/20",
            badge: "text-blue-400 bg-blue-500/10"
        },
        purple: {
            bg: "bg-purple-500/10",
            text: "text-purple-500",
            border: "group-hover:border-purple-500/30",
            iconBg: "bg-purple-900/20",
            badge: "text-purple-400 bg-purple-500/10"
        }
    }

    const style = colorStyles[color]

    return (
        <div className={`bg-[#111] border border-white/10 rounded-xl p-5 relative group transition-colors ${style.border}`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${style.iconBg} ${style.text}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {badgeText && (
                    <div className={`px-2 py-1 rounded-full text-[10px] font-medium border border-white/5 ${style.badge}`}>
                        {badgeText}
                    </div>
                )}
            </div>

            <div>
                <div className="text-3xl font-bold text-white mb-1 tracking-tight">
                    {value}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                    {title}
                </div>
                {subValue && (
                    <div className="text-xs text-gray-600 mt-1">
                        {subValue}
                    </div>
                )}
            </div>
        </div>
    )
}
