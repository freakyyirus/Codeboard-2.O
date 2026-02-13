import { getUpcomingContests } from "@/lib/codeforces"
import { Calendar, Clock, ExternalLink, Trophy } from "lucide-react"

// Mock Data
const MOCK_CONTESTS = [
    { id: 1, name: "Codeforces Round #950 (Div. 2)", startTimeSeconds: Math.floor(Date.now() / 1000) + 86400, durationSeconds: 7200, platform: "Codeforces", url: "https://codeforces.com/contests" },
    { id: 2, name: "LeetCode Weekly Contest 398", startTimeSeconds: Math.floor(Date.now() / 1000) + 172800, durationSeconds: 5400, platform: "LeetCode", url: "https://leetcode.com/contest" },
    { id: 3, name: "AtCoder Beginner Contest 354", startTimeSeconds: Math.floor(Date.now() / 1000) + 259200, durationSeconds: 6000, platform: "AtCoder", url: "https://atcoder.jp" },
]

export default async function ContestsPage() {
    let contests = []

    try {
        contests = await getUpcomingContests()
        if (!contests || contests.length === 0) {
            console.log("Codeforces API returned empty, using mock.")
            contests = MOCK_CONTESTS
        }
    } catch (e) {
        console.warn("Failed to fetch contests:", e)
        contests = MOCK_CONTESTS
    }

    const formatTime = (seconds: number) => {
        return new Date(seconds * 1000).toLocaleString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
        })
    }

    const getDuration = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600)
        const mins = Math.floor((seconds % 3600) / 60)
        return `${hrs}h ${mins > 0 ? mins + 'm' : ''}`
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <h1 className="text-[32px] font-display font-semibold text-[var(--foreground)] tracking-tight">
                        Contests
                    </h1>
                    <p className="text-[var(--text-secondary)] text-[14px]">
                        Upcoming competitive programming events.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-[6px] text-[12px] font-mono text-[var(--text-secondary)]">
                        Schedule
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contests.map((contest: any) => (
                    <div key={contest.id} className="group bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-5 hover:border-[var(--text-secondary)] transition-all duration-200 relative overflow-hidden">
                        {/* Interactive Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${contest.platform === 'Codeforces' ? 'border-red-500/20 text-red-500 bg-red-500/10' :
                                            contest.platform === 'LeetCode' ? 'border-yellow-500/20 text-yellow-500 bg-yellow-500/10' :
                                                'border-blue-500/20 text-blue-500 bg-blue-500/10'
                                        }`}>
                                        {contest.platform}
                                    </span>
                                    <Trophy className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--primary)] transition-colors" />
                                </div>
                                <h3 className="text-[16px] font-medium text-[var(--foreground)] leading-tight mb-1">
                                    {contest.name}
                                </h3>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[12px] text-[var(--text-secondary)]">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{formatTime(contest.startTimeSeconds)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[12px] text-[var(--text-secondary)]">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{getDuration(contest.durationSeconds)}</span>
                                </div>
                            </div>

                            <a
                                href={contest.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 flex items-center justify-center gap-2 w-full py-2 bg-[var(--background)] border border-[var(--border)] rounded-[6px] text-[12px] font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:border-[var(--text-secondary)] transition-all group/btn"
                            >
                                Register
                                <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
