"use client"

import { useRewards } from "@/hooks/useRewards"
import { PulseCoin } from "@/components/ui/coin-animations"
import { Skeleton } from "@/components/ui/skeleton"

export function CoinBalance() {
    const { rewards, loading } = useRewards()

    if (loading) {
        return <Skeleton className="h-8 w-24 rounded-full" />
    }

    const currentCoins = rewards?.code_coins || 0

    return (
        <div className="flex items-center bg-zinc-900/50 border border-yellow-500/20 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.1)]">
            <PulseCoin amount={currentCoins} />
        </div>
    )
}
