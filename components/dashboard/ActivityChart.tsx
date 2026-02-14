"use client"

export function ActivityChart() {
    // Generate mock data for the chart
    const data = [3, 5, 2, 8, 6, 4, 7, 5, 9, 3, 4, 6, 2, 8, 5, 3]

    return (
        <div className="glass rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg text-white">Activity Overview</h3>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-gray-400 focus:outline-none focus:border-white/30 hover:bg-white/10 transition-colors cursor-pointer">
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                </select>
            </div>

            <div className="flex-1 flex items-end justify-between gap-2 min-h-[200px]">
                {data.map((h, i) => (
                    <div
                        key={i}
                        className="w-full bg-blue-500/20 hover:bg-blue-500/40 rounded-t-sm transition-all relative group"
                        style={{ height: `${h * 10}%` }}
                    >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {h} hrs
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
