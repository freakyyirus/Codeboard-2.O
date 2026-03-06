import { CoinBalance } from "@/components/rewards/CoinBalance"
import { StreakWidget } from "@/components/rewards/StreakWidget"
import { BadgeGrid } from "@/components/rewards/BadgeGrid"
import { RewardStore } from "@/components/rewards/RewardStore"

export default function RewardsPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-zinc-800/60 shadow-xl">
                <div>
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                        Rewards Dashboard
                    </h1>
                    <p className="text-zinc-400 mt-2">View your achievements, streaks, and spend your CodeCoins.</p>
                </div>
                <div className="flex items-center gap-4">
                    <StreakWidget />
                    <CoinBalance />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-zinc-950/50 p-6 rounded-3xl border border-zinc-800">
                        <h2 className="text-xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
                            <span>CodeCoin Store</span>
                        </h2>
                        <RewardStore />
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-950/50 p-6 rounded-3xl border border-zinc-800">
                        <h2 className="text-xl font-bold text-zinc-100 mb-6">Achievement Badges</h2>
                        <BadgeGrid />
                    </div>
                </div>
            </div>
        </div>
    )
}
