"use client"

import { useState } from "react"
import { UserPlus, UserCheck, Loader2 } from "lucide-react"
import { followUser, unfollowUser } from "@/lib/social-actions"
import toast from "react-hot-toast"

interface FollowButtonProps {
    userId: string
    userName: string
    initialFollowed?: boolean
}

export default function FollowButton({ userId, userName, initialFollowed = false }: FollowButtonProps) {
    const [isFollowed, setIsFollowed] = useState(initialFollowed)
    const [loading, setLoading] = useState(false)

    const handleToggle = async () => {
        setLoading(true)
        try {
            if (isFollowed) {
                const result = await unfollowUser(userId)
                if (result.error) {
                    toast.error("Failed to unfollow")
                } else {
                    setIsFollowed(false)
                    toast.success(`Unfollowed ${userName}`)
                }
            } else {
                const result = await followUser(userId)
                if (result.error) {
                    toast.error("Failed to follow")
                } else {
                    setIsFollowed(true)
                    toast.success(`Following ${userName}!`)
                }
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    if (isFollowed) {
        return (
            <button
                onClick={handleToggle}
                disabled={loading}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold border border-green-500/30 text-green-400 bg-green-500/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 rounded-[6px] transition-colors disabled:opacity-50"
            >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <UserCheck className="w-3 h-3" />}
                {loading ? "" : "Following"}
            </button>
        )
    }

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold border border-[var(--border)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] rounded-[6px] transition-colors disabled:opacity-50"
        >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <UserPlus className="w-3 h-3" />}
            {loading ? "" : "Follow"}
        </button>
    )
}
