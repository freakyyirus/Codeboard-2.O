"use client"

import { Flame } from "lucide-react"

interface StatsCardProps {
    label: string
    value: string
    change?: string
    subtext?: string
    icon?: React.ElementType
    trend?: "up" | "down" | "neutral"
}

export function StatsCard({ label, value, change, subtext, icon: Icon, trend = "neutral" }: StatsCardProps) {
    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-5 hover:border-[var(--border-hover)] transition-colors duration-150 group">
            <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] text-[var(--text-secondary)] uppercase tracking-wide font-medium">
                    {label}
                </p>
                {Icon && (
                    <Icon
                        className={`w-4 h-4 ${label.includes("Streak") ? "text-[var(--warning)]" : "text-[var(--text-tertiary)]"}`}
                    />
                )}
            </div>

            <div className="flex items-baseline gap-2">
                <h3 className="text-[36px] font-mono font-semibold text-[var(--foreground)] leading-none tracking-tight">
                    {value}
                </h3>
            </div>

            {(change || subtext) && (
                <div className="mt-2 flex items-center gap-2 text-[12px]">
                    {change && (
                        <span className={trend === "up" ? "text-[var(--success)]" : trend === "down" ? "text-[var(--error)]" : "text-[var(--text-tertiary)]"}>
                            {change}
                        </span>
                    )}
                    {subtext && (
                        <span className="text-[var(--text-tertiary)]">
                            {subtext}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}
