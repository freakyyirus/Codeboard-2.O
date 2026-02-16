import { getCachedContests } from "@/lib/clist"
import { ContestList } from "@/components/dashboard/ContestList"
import { CalendarDays } from "lucide-react"

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default async function ContestsPage() {
    // Universal Fetch from Clist (LeetCode, CF, CC, AtCoder, etc.)
    const allContests = await getCachedContests()

    // Platforms for header legend
    const platforms = [
        { name: "Codeforces", color: "#1890ff", url: "https://codeforces.com/contests" },
        { name: "LeetCode", color: "#FFA116", url: "https://leetcode.com/contest/" },
        { name: "CodeChef", color: "#d69e2e", url: "https://codechef.com/contests" },
        { name: "AtCoder", color: "#ccc", url: "https://atcoder.jp/contests" },
        { name: "HackerRank", color: "#22c55e", url: "https://hackerrank.com/contests" },
    ]

    return (
        <div className="max-w-5xl p-6 md:p-8 fade-in h-screen flex flex-col">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <CalendarDays className="w-7 h-7 text-blue-400" />
                        Contest Calendar
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Schedule for Codeforces, LeetCode, CodeChef, and AtCoder.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
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

            {/* Contest List (Client Component with Tabs) */}
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                <ContestList contests={allContests} />
            </div>
        </div>
    )
}

