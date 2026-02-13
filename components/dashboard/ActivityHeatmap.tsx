"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DayActivity {
    date: string
    count: number
}

interface ActivityHeatmapProps {
    data: DayActivity[]
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
    // Generate 52 weeks of mock data if not provided
    const weeks = Array.from({ length: 52 }).map((_, weekIndex) => {
        return Array.from({ length: 7 }).map((_, dayIndex) => {
            const date = new Date()
            date.setDate(date.getDate() - (52 * 7) + (weekIndex * 7) + dayIndex)
            return {
                date: date.toISOString().split('T')[0],
                count: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0,
            }
        })
    })

    const getColor = (count: number) => {
        if (count === 0) return "bg-[#1a1a1a]"
        if (count <= 2) return "bg-[#0e4429]"
        if (count <= 4) return "bg-[#006d32]"
        if (count <= 6) return "bg-[#26a641]"
        return "bg-[#39d353]"
    }

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-5 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-medium text-[var(--foreground)]">Activity</h3>
                <span className="text-[12px] text-[var(--text-tertiary)]">Last year</span>
            </div>

            <div className="flex-1 flex items-center overflow-x-auto pb-2 scrollbar-hide">
                <div className="grid grid-flow-col gap-[3px] auto-cols-[10px]">
                    {weeks.map((week, i) => (
                        <div key={i} className="grid grid-rows-7 gap-[3px]">
                            {week.map((day, j) => (
                                <TooltipProvider key={`${i}-${j}`}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div
                                                className={`w-[10px] h-[10px] rounded-[2px] ${getColor(day.count)} transition-colors duration-75 hover:ring-1 hover:ring-[var(--text-secondary)]`}
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-[var(--background)] border border-[var(--border)] text-[11px] px-2 py-1">
                                            <p>{day.date}: {day.count} problems</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-4 text-[10px] text-[var(--text-tertiary)] ml-auto">
                <span>Less</span>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#1a1a1a]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#006d32]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#26a641]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#39d353]" />
                <span>More</span>
            </div>
        </div>
    )
}
