"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
    return (
        <div className="max-w-[1200px] mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-16 w-[100px] rounded-[6px]" />
                    <Skeleton className="h-16 w-[100px] rounded-[6px]" />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-[var(--border)] rounded-[12px] p-5 bg-[var(--surface)]" style={{ borderLeft: "3px solid var(--elevated)" }}>
                        <div className="flex justify-between items-start mb-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-[18px] w-[18px] rounded" />
                        </div>
                        <Skeleton className="h-8 w-16 mb-3" />
                        <Skeleton className="h-1.5 w-full rounded-full" />
                    </div>
                ))}
            </div>

            {/* Streak / Contribution Grid */}
            <div className="border border-[var(--border)] rounded-[12px] p-6 bg-[var(--surface)]">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-baseline gap-3">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-3 w-24" />
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 28 }).map((_, i) => (
                        <Skeleton key={i} className="aspect-square rounded-sm" />
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Table */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="border border-[var(--border)] rounded-[12px] overflow-hidden bg-[var(--surface)]">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className={`flex items-center gap-4 p-4 ${i < 5 ? "border-b border-[var(--border)]" : ""}`}>
                                <Skeleton className="w-2 h-2 rounded-full" />
                                <Skeleton className="h-4 w-40 flex-1" />
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-5 w-14 rounded-[6px]" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    <div>
                        <Skeleton className="h-5 w-28 mb-4" />
                        <div className="border border-[var(--border)] rounded-[12px] p-5 bg-[var(--surface)] space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i}>
                                    <div className="flex justify-between mb-1.5">
                                        <Skeleton className="h-3 w-32" />
                                        <Skeleton className="h-3 w-8" />
                                    </div>
                                    <Skeleton className="h-1.5 w-full rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border border-[var(--border)] rounded-[12px] p-5 bg-[var(--surface)]">
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-3 w-44 mb-4" />
                        <div className="flex items-center gap-4">
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-1.5 w-full rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
