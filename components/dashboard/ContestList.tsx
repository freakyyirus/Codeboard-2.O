"use client"

interface Contest {
    id: number
    name: string
    startTimeSeconds: number
    durationSeconds: number
    platform: string
    url: string
}

export function ContestList({ contests }: { contests: Contest[] }) {
    const mockContests = [
        { name: "LeetCode Weekly", time: "Sunday, 10:30 PM EST", days: 2, color: "red" },
        { name: "Codeforces Round", time: "Friday, 8:00 PM EST", days: 5, color: "yellow" },
    ]

    return (
        <div className="stat-card rounded-2xl p-6 h-full">
            <h3 className="font-semibold text-lg text-white mb-6">Upcoming Contests</h3>
            <div className="space-y-4">
                {mockContests.map((c) => (
                    <div key={c.name} className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-white">{c.name}</span>
                            <span className={`text-xs px-2 py-1 rounded ${c.color === "red" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                                }`}>
                                In {c.days} days
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">{c.time}</p>
                        <button className="w-full py-2 bg-white/10 rounded-lg text-xs font-medium text-gray-300 hover:bg-white/20 hover:text-white transition-colors">
                            Set Reminder
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
