import { getUpcomingContests } from "@/lib/codeforces"
import { ContestList } from "@/components/dashboard/ContestList"
import { CalendarDays, ExternalLink } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'
export const revalidate = 3600

/* ─── Multi-Platform Contest Data ────────────────── */

// LeetCode contests (static schedule - weekly/biweekly)
function getLeetCodeContests() {
    const now = new Date()
    const contests = []

    // LeetCode Weekly Contest (every Sunday 8:00 AM IST / 2:30 AM UTC)
    for (let i = 0; i < 3; i++) {
        const date = new Date(now)
        date.setDate(date.getDate() + ((7 - date.getDay()) % 7 || 7) + (i * 7))
        date.setHours(8, 0, 0, 0) // 8 AM IST
        const weekNum = Math.floor((date.getTime() - new Date("2023-01-01").getTime()) / (7 * 24 * 60 * 60 * 1000)) + 327
        contests.push({
            id: 100000 + i,
            name: `Weekly Contest ${weekNum}`,
            type: "LeetCode",
            startTimeSeconds: Math.floor(date.getTime() / 1000),
            durationSeconds: 5400, // 1.5 hours
            phase: "BEFORE" as const,
            url: "https://leetcode.com/contest/",
            color: "#FFA116",
        })
    }

    // LeetCode Biweekly Contest (every other Saturday 8:00 PM IST)
    for (let i = 0; i < 2; i++) {
        const date = new Date(now)
        date.setDate(date.getDate() + ((6 - date.getDay() + 7) % 7 || 7) + (i * 14))
        date.setHours(20, 0, 0, 0) // 8 PM IST
        const biweekNum = 140 + i
        contests.push({
            id: 200000 + i,
            name: `Biweekly Contest ${biweekNum}`,
            type: "LeetCode",
            startTimeSeconds: Math.floor(date.getTime() / 1000),
            durationSeconds: 5400,
            phase: "BEFORE" as const,
            url: "https://leetcode.com/contest/",
            color: "#FFA116",
        })
    }

    return contests
}

// CodeChef contests (estimated schedule)
function getCodeChefContests() {
    const now = new Date()
    const contests = []
    const date = new Date(now)
    date.setDate(date.getDate() + 5)
    date.setHours(20, 0, 0, 0)

    contests.push({
        id: 300000,
        name: "Starters Round",
        type: "CodeChef",
        startTimeSeconds: Math.floor(date.getTime() / 1000),
        durationSeconds: 7200,
        phase: "BEFORE" as const,
        url: "https://codechef.com/contests",
        color: "#5B4638",
    })

    return contests
}

// AtCoder contests (estimated schedule)
function getAtCoderContests() {
    const now = new Date()
    const contests = []
    const date = new Date(now)
    date.setDate(date.getDate() + ((6 - date.getDay() + 7) % 7 || 7))
    date.setHours(17, 30, 0, 0)

    contests.push({
        id: 400000,
        name: "AtCoder Beginner Contest",
        type: "AtCoder",
        startTimeSeconds: Math.floor(date.getTime() / 1000),
        durationSeconds: 6000,
        phase: "BEFORE" as const,
        url: "https://atcoder.jp/contests",
        color: "#222",
    })

    return contests
}

export default async function ContestsPage() {
    const cfContests = await getUpcomingContests()

    // Add platform info to CF contests
    const cfWithType = cfContests.map((c: any) => ({
        ...c,
        type: "Codeforces",
        url: "https://codeforces.com/contests",
        color: "#1890ff",
    }))

    const allContests = [
        ...cfWithType,
        ...getLeetCodeContests(),
        ...getCodeChefContests(),
        ...getAtCoderContests(),
    ].sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)

    const platforms = [
        { name: "Codeforces", color: "#1890ff", url: "https://codeforces.com/contests" },
        { name: "LeetCode", color: "#FFA116", url: "https://leetcode.com/contest/" },
        { name: "CodeChef", color: "#5B4638", url: "https://codechef.com/contests" },
        { name: "AtCoder", color: "#ccc", url: "https://atcoder.jp/contests" },
    ]

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-8 fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <CalendarDays className="w-7 h-7 text-blue-400" />
                        Upcoming Contests
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Schedule for Codeforces, LeetCode, CodeChef, and AtCoder.
                    </p>
                </div>
                <div className="flex gap-2">
                    {platforms.map(p => (
                        <a
                            key={p.name}
                            href={p.url}
                            target="_blank"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white transition-colors"
                        >
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                            {p.name}
                        </a>
                    ))}
                </div>
            </div>

            {/* Contest Cards */}
            <div className="space-y-3">
                {allContests.map((contest: any) => {
                    const start = new Date(contest.startTimeSeconds * 1000)
                    const duration = Math.floor(contest.durationSeconds / 3600)
                    const durationMin = Math.floor((contest.durationSeconds % 3600) / 60)
                    const now = new Date()
                    const diff = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                    const isToday = diff <= 0 && diff > -1
                    const isSoon = diff <= 2

                    return (
                        <div key={contest.id} className={`bg-white/5 border rounded-2xl p-5 hover:border-white/20 transition-all ${isToday ? "border-green-500/30 bg-green-500/5" :
                                isSoon ? "border-yellow-500/20" : "border-white/10"
                            }`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold border border-white/10" style={{ backgroundColor: `${contest.color}15`, color: contest.color, borderColor: `${contest.color}30` }}>
                                        {contest.type?.slice(0, 2).toUpperCase() || "CF"}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-sm">{contest.name}</h3>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                            <span>{start.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })}</span>
                                            <span>{start.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                                            <span>{duration}h {durationMin > 0 ? `${durationMin}m` : ""}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {isToday && (
                                        <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Live Soon</span>
                                    )}
                                    {!isToday && isSoon && (
                                        <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">In {diff} day{diff !== 1 ? "s" : ""}</span>
                                    )}
                                    <a
                                        href={contest.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {allContests.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>No upcoming contests found. Check back later!</p>
                </div>
            )}
        </div>
    )
}
