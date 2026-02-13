import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-48 rounded-md" />
                    <Skeleton className="h-4 w-96 rounded-md" />
                </div>
                <Skeleton className="h-8 w-32 rounded-md" />
            </div>

            {/* Top Row: Stats + Heatmap */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-auto xl:h-[320px]">
                {/* Stats Grid Skeleton */}
                <div className="xl:col-span-12 2xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-5 h-[150px] flex flex-col justify-between">
                            <div className="flex justify-between">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-4 w-4 rounded-full" />
                            </div>
                            <Skeleton className="h-10 w-24" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    ))}
                </div>

                {/* Heatmap Skeleton */}
                <div className="xl:col-span-12 2xl:col-span-7 h-full bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-5">
                    <div className="flex justify-between mb-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="w-full h-40 bg-[var(--secondary)]/20 rounded-md animate-pulse" />
                </div>
            </div>

            {/* Middle Row: Chart Skeleton */}
            <div className="h-[400px] bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-6">
                <div className="flex justify-between mb-8">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <div className="space-y-2 flex flex-col items-end">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
                <div className="w-full h-[250px] bg-[var(--secondary)]/20 rounded-md" />
            </div>

            {/* Bottom Row Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
                <div className="h-[400px] bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-5">
                    <Skeleton className="h-5 w-32 mb-4" />
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full rounded-md" />
                        ))}
                    </div>
                </div>
                <div className="h-[400px] bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-5">
                    <Skeleton className="h-5 w-32 mb-4" />
                    <div className="space-y-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-8 w-full rounded-md" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
