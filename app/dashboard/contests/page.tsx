import { getUpcomingContests } from "@/lib/codeforces"
import { ContestList } from "@/components/dashboard/ContestList"

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

export default async function ContestsPage() {
    // 1. Fetch Data
    const contests = await getUpcomingContests()

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-[32px] font-display font-semibold text-[var(--foreground)] tracking-tight">
                    Upcoming Contests
                </h1>
                <p className="text-[var(--text-secondary)] text-[14px]">
                    Schedule for Codeforces, LeetCode, and AtCoder rounds.
                </p>
            </div>

            {/* Content */}
            <ContestList contests={contests} />
        </div>
    )
}
