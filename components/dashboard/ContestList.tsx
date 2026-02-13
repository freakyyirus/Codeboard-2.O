"use client"

import { Calendar, Clock, ExternalLink, Trophy } from "lucide-react"

interface Contest {
    id: number
    name: string
    startTimeSeconds: number
    durationSeconds: number
    platform: string
    url: string
}

export function ContestList({ contests }: { contests: Contest[] }) {
    if (!contests || contests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-[var(--text-tertiary)] bg-[var(--surface)] rounded-xl border border-[var(--border)]">
                <Trophy className="w-8 h-8 mb-2 opacity-50" />
                <p>No upcoming contests found</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contests.map((contest) => {
                const startDate = new Date(contest.startTimeSeconds * 1000)
                const durationHours = (contest.durationSeconds / 3600).toFixed(1)

                return (
                    <div
                        key={contest.id}
                        className="group relative overflow-hidden bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--primary)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/5"
                    >
                        {/* Platform Tag */}
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-2 py-1 rounded-md text-xs font-medium 
                                ${contest.platform === 'Codeforces' ? 'bg-[#1f2937] text-[#facc15]' : 'bg-blue-500/10 text-blue-500'}`}>
                                {contest.platform}
                            </span>
                            <a
                                href={contest.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--text-tertiary)] hover:text-[var(--foreground)] transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-lg leading-tight mb-4 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                            {contest.name}
                        </h3>

                        {/* Details */}
                        <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-[var(--text-tertiary)]" />
                                <span>{startDate.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-[var(--text-tertiary)]" />
                                <span>{startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({durationHours}h)</span>
                            </div>
                        </div>

                        {/* Countdown/Status (Optional - could add logic here) */}
                        <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                            <span className="text-xs font-mono text-[var(--text-tertiary)]">Starts in {Math.ceil((startDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days</span>
                            <button className="text-xs font-medium text-[var(--foreground)] bg-[var(--surface-hover)] px-3 py-1.5 rounded-md hover:bg-[var(--primary)] hover:text-white transition-all">
                                Set Reminder
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
