"use client"

import { useState, useEffect } from "react"
import { getUserRewards, getUserBadges, getAllBadges } from "@/lib/rewards-actions"

export function useRewards() {
    const [rewards, setRewards] = useState<any>(null)
    const [userBadges, setUserBadges] = useState<string[]>([])
    const [allBadges, setAllBadges] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchRewardsData = async () => {
        setLoading(true)
        try {
            const [rewardsData, badgesData, allBadgesData] = await Promise.all([
                getUserRewards(),
                getUserBadges(),
                getAllBadges()
            ])
            setRewards(rewardsData)
            setUserBadges(badgesData.map((b: any) => b.badge_type))
            setAllBadges(allBadgesData)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRewardsData()
    }, [])

    return {
        rewards,
        userBadges,
        allBadges,
        loading,
        error,
        refetch: fetchRewardsData
    }
}
