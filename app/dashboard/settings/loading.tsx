export default function SettingsLoading() {
    return (
        <div className="flex min-h-[calc(100vh-64px)] animate-pulse">
            {/* Sidebar skeleton */}
            <aside className="w-64 min-w-[240px] border-r border-white/10 bg-black/40 py-6 px-4 hidden md:block">
                <div className="h-4 w-28 bg-white/5 rounded mb-8 mx-2" />
                <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-10 w-full bg-white/5 rounded-lg" />
                    ))}
                </div>
            </aside>

            {/* Content skeleton */}
            <main className="flex-1 p-6 md:p-10 max-w-4xl space-y-6">
                <div className="space-y-2">
                    <div className="h-8 w-40 bg-white/5 rounded-lg" />
                    <div className="h-4 w-60 bg-white/5 rounded-lg" />
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-6">
                    <div className="h-6 w-32 bg-white/5 rounded-lg" />
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white/5 rounded-full" />
                        <div className="h-4 w-40 bg-white/5 rounded" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 w-20 bg-white/5 rounded" />
                                <div className="h-12 w-full bg-white/5 rounded-xl" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
