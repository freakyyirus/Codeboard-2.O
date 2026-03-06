"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Coins } from "lucide-react"

export function CoinFallAnimation({ active, onComplete }: { active: boolean; onComplete?: () => void }) {
    const [particles, setParticles] = useState<{ id: number; x: number; delay: number }[]>([])

    useEffect(() => {
        if (active) {
            const newParticles = Array.from({ length: 30 }).map((_, i) => ({
                id: i,
                x: Math.random() * 100, // percentage string
                delay: Math.random() * 1.5
            }))
            setParticles(newParticles)

            const timer = setTimeout(() => {
                if (onComplete) onComplete()
            }, 3000)

            return () => clearTimeout(timer)
        } else {
            setParticles([])
        }
    }, [active, onComplete])

    if (!active) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ top: "-10%", left: `${p.x}%`, opacity: 0, rotate: 0 }}
                    animate={{ top: "110%", opacity: [0, 1, 1, 0], rotate: 360 * 3 }}
                    transition={{
                        duration: 2,
                        delay: p.delay,
                        ease: "easeIn"
                    }}
                    className="absolute text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                >
                    <Coins size={32} />
                </motion.div>
            ))}
        </div>
    )
}

export function PulseCoin({ amount }: { amount: number }) {
    return (
        <motion.div
            key={amount}
            initial={{ scale: 1.5, color: "#FFA500" }}
            animate={{ scale: 1, color: "currentColor" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1 font-bold text-yellow-400"
        >
            <Coins className="w-5 h-5" />
            <span>{amount.toLocaleString()} CC</span>
        </motion.div>
    )
}
