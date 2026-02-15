export default function DashboardLoading() {
    return (
        <div className="p-6 md:p-10 space-y-6 animate-pulse">
            {/* Header skeleton */}
            <div className="space-y-2">
                <div className="h-8 w-48 bg-white/5 rounded-lg" />
                <div className="h-4 w-72 bg-white/5 rounded-lg" />
            </div>

            {/* Stat cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3">
                        <div className="flex justify-between">
                            <div className="h-4 w-20 bg-white/5 rounded" />
                            <div className="h-8 w-8 bg-white/5 rounded-lg" />
                        </div>
                        <div className="h-7 w-16 bg-white/5 rounded" />
                        <div className="h-2 w-full bg-white/5 rounded-full" />
                    </div>
                ))}
            </div>

            {/* Content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-white/5 rounded-lg shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <div className="h-4 w-3/4 bg-white/5 rounded" />
                                <div className="h-3 w-1/2 bg-white/5 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-16 w-full bg-white/5 rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    )
}
