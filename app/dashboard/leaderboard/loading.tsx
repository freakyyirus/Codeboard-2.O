export default function LeaderboardLoading() {
    return (
        <div className="p-6 md:p-10 max-w-7xl space-y-6 min-h-screen animate-pulse">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <div className="h-8 w-40 bg-white/5 rounded-lg" />
                    <div className="h-4 w-72 bg-white/5 rounded-lg" />
                </div>
                <div className="flex bg-[#111] p-1 rounded-lg border border-white/10 self-start md:self-auto gap-1">
                    <div className="h-9 w-32 bg-white/5 rounded-md" />
                    <div className="h-9 w-20 bg-white/5 rounded-md" />
                    <div className="h-9 w-36 bg-white/5 rounded-md" />
                </div>
            </div>

            <div className="flex items-end justify-center gap-4 md:gap-8 pt-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-full" />
                    <div className="h-4 w-24 bg-white/5 rounded" />
                    <div className="h-3 w-20 bg-white/5 rounded" />
                </div>
                <div className="flex flex-col items-center gap-4 -mt-6">
                    <div className="w-28 h-28 md:w-32 md:h-32 bg-white/5 rounded-full" />
                    <div className="h-4 w-28 bg-white/5 rounded" />
                    <div className="h-3 w-24 bg-white/5 rounded" />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-full" />
                    <div className="h-4 w-24 bg-white/5 rounded" />
                    <div className="h-3 w-20 bg-white/5 rounded" />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="h-5 w-64 bg-white/5 rounded" />
                <div className="h-4 w-24 bg-white/5 rounded" />
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111] overflow-hidden">
                <div className="h-10 bg-white/5" />
                <div className="divide-y divide-white/5">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4">
                            <div className="w-10 h-4 bg-white/5 rounded" />
                            <div className="flex-1 flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/5 rounded-full" />
                                <div className="space-y-2">
                                    <div className="h-3 w-24 bg-white/5 rounded" />
                                    <div className="h-3 w-20 bg-white/5 rounded" />
                                </div>
                            </div>
                            <div className="w-20 h-4 bg-white/5 rounded" />
                            <div className="w-16 h-4 bg-white/5 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
