"use client"

import { useRewards } from "@/hooks/useRewards"
import { useState } from "react"
import { spendCodeCoins } from "@/lib/rewards-actions"
import { Coins, Lock, Unlock, Paintbrush, Image as ImageIcon } from "lucide-react"

export function RewardStore() {
    const { rewards, refetch, loading } = useRewards()
    const [loadingItem, setLoadingItem] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const items = [
        { id: 'hint', name: 'Unlock AI Hint', cost: 10, icon: <Unlock className="text-blue-400" />, type: 'consumable' },
        { id: 'solution', name: 'Unlock Solution', cost: 25, icon: <Unlock className="text-purple-400" />, type: 'consumable' },
        { id: 'theme', name: 'Custom Profile Theme', cost: 100, icon: <Paintbrush className="text-pink-400" />, type: 'unlock' },
        { id: 'avatar_frame', name: 'Profile Avatar Frame', cost: 50, icon: <ImageIcon className="text-green-400" />, type: 'unlock' },
    ]

    const handlePurchase = async (id: string, cost: number) => {
        setLoadingItem(id)
        setError(null)
        try {
            await spendCodeCoins(cost, `Purchased ${id}`)
            await refetch()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoadingItem(null)
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-16 bg-zinc-800 animate-pulse rounded-xl"></div>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {error && <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg text-sm">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-1 xl:grid-cols-2">
                {items.map(item => {
                    const canAfford = (rewards?.code_coins || 0) >= item.cost

                    return (
                        <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-zinc-800 rounded-lg">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-zinc-200 text-sm">{item.name}</h4>
                                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold mt-1">
                                        <Coins size={12} />
                                        <span>{item.cost} CC</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                disabled={!canAfford || loadingItem === item.id}
                                onClick={() => handlePurchase(item.id, item.cost)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${canAfford
                                        ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                    }`}
                            >
                                {loadingItem === item.id ? '...' : (canAfford ? 'Redeem' : <Lock size={14} className="inline mr-1" />)}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
