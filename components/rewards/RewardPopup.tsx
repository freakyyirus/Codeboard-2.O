"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { claimDailyReward } from "@/lib/rewards-actions"
import { CoinFallAnimation } from "@/components/ui/coin-animations"
import { Flame, X, Coins } from "lucide-react"

export function RewardPopup() {
    const [isOpen, setIsOpen] = useState(false)
    const [rewardData, setRewardData] = useState<{ streak: number; coinsEarned: number } | null>(null)
    const [showCoins, setShowCoins] = useState(false)

    useEffect(() => {
        let mounted = true

        const claim = async () => {
            try {
                // Try claiming daily reward silently
                const result = await claimDailyReward()
                if (result.success && mounted) {
                    setRewardData({ streak: result.streak, coinsEarned: result.coinsEarned })
                    setIsOpen(true)
                    setShowCoins(true)
                }
            } catch (err) {
                console.error("Failed to claim daily reward", err)
            }
        }

        // Delay checking just to let the page load smoothly
        const timer = setTimeout(() => claim(), 1000)

        return () => {
            mounted = false
            clearTimeout(timer)
        }
    }, [])

    if (!isOpen || !rewardData) return null

    return (
        <>
            <CoinFallAnimation active={showCoins} onComplete={() => setShowCoins(false)} />

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            className="relative w-full max-w-sm overflow-hidden bg-zinc-900 border border-yellow-500/30 rounded-2xl shadow-[0_0_40px_rgba(255,215,0,0.15)]"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 text-center flex flex-col items-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                    className="w-20 h-20 mb-4 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-300 flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                                >
                                    <Coins size={40} className="text-zinc-900" />
                                </motion.div>

                                <h2 className="text-2xl font-bold text-white mb-2">Daily Reward Claimed!</h2>

                                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)] my-4 flex items-center gap-2">
                                    +{rewardData.coinsEarned} CC
                                </div>

                                <div className="flex items-center gap-2 px-4 py-2 mt-2 rounded-full border border-orange-500/30 bg-orange-500/10">
                                    <Flame className="text-orange-500" size={20} />
                                    <span className="font-bold text-orange-400">{rewardData.streak} Day Streak!</span>
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] transition-all"
                                >
                                    Awesome!
                                </button>
                                <p className="text-zinc-500 text-sm mt-4">Come back tomorrow for more!</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
