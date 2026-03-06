import {
    Heart,
    MessageCircle,
    Share2,
    Trophy,
    Flame,
    TrendingUp,
    UserPlus,
    Award,
    Target,
    Zap,
    Star,
    Twitter,
    Linkedin,
    Globe
} from "lucide-react"
import { getCachedSocialStats } from "@/lib/socials"
import { getLeaderboard, getFollowSuggestions } from "@/lib/social-actions"
import SocialFeedClient from "./SocialFeedClient"
import FollowButton from "./FollowButton"

const badges = [
    { name: "100 Problems", icon: Target, unlocked: true },
    { name: "30-Day Streak", icon: Flame, unlocked: true },
    { name: "DP Master", icon: Zap, unlocked: true },
    { name: "Graph Master", icon: Star, unlocked: false },
    { name: "Contest Winner", icon: Trophy, unlocked: false },
    { name: "500 Solved", icon: Award, unlocked: false },
]

export default async function SocialPage() {
    const [stats, leaderboard, suggestions] = await Promise.all([
        getCachedSocialStats(),
        getLeaderboard(),
        getFollowSuggestions()
    ])

    return (
        <div className="max-w-[1200px] p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-[24px] font-display text-[var(--foreground)]">Social</h1>
                <p className="text-[var(--text-secondary)] text-sm mt-1">
                    See what your community is solving. Compete, share, and grow together.
                </p>
            </div>

            {/* Developer Identity Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Twitter */}
                <div className="bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 p-5 rounded-2xl flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                            <span className="text-sm font-semibold text-[#1DA1F2]">Twitter</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">{stats.twitter ? stats.twitter.followers.toLocaleString() : '-'}</span>
                            <span className="text-xs text-gray-400">Followers</span>
                        </div>
                    </div>
                </div>

                {/* LinkedIn */}
                <div className="bg-[#0A66C2]/10 border border-[#0A66C2]/20 p-5 rounded-2xl flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                            <span className="text-sm font-semibold text-[#0A66C2]">LinkedIn</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">{stats.linkedin ? stats.linkedin.connections.toLocaleString() : '-'}</span>
                            <span className="text-xs text-gray-400">Connections</span>
                        </div>
                    </div>
                </div>

                {/* Dev.to */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Globe className="w-4 h-4 text-white" />
                            <span className="text-sm font-semibold text-white">Dev.to</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">{stats.devto ? stats.devto.posts.toLocaleString() : '-'}</span>
                            <span className="text-xs text-gray-400">Posts</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left — Activity Feed (2/3) */}
                <div className="lg:col-span-2 space-y-4">
                    <SocialFeedClient />
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Leaderboard */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy className="w-4 h-4 text-[var(--warning)]" />
                            <h3 className="text-base font-semibold text-[var(--foreground)]">Top Streaks</h3>
                        </div>
                        <div className="border border-[var(--border)] rounded-[12px] bg-[var(--surface)] overflow-hidden">
                            {leaderboard.length === 0 ? (
                                <div className="px-4 py-6 text-center text-xs text-gray-500">
                                    No users yet. Be the first!
                                </div>
                            ) : (
                                leaderboard.map((user, i) => (
                                    <div key={user.id} className={`flex items-center gap-3 px-4 py-3 ${i < leaderboard.length - 1 ? "border-b border-[var(--border)]" : ""} hover:bg-[var(--elevated)]/30 transition-colors cursor-pointer`}>
                                        <span className={`w-5 text-xs font-mono font-bold ${i < 3 ? "text-[var(--warning)]" : "text-[var(--text-tertiary)]"}`}>
                                            {i + 1}
                                        </span>
                                        <div className="w-7 h-7 rounded-full bg-[var(--elevated)] border border-[var(--border)] flex items-center justify-center text-[10px] font-semibold text-[var(--foreground)]">
                                            {user.initials}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-[var(--foreground)] truncate">{user.name}</p>
                                        </div>
                                        <span className="text-xs font-mono text-[var(--text-tertiary)] flex items-center gap-1">
                                            <Flame className="w-3 h-3 text-orange-400" />{user.streak}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Who to Follow */}
                    <div>
                        <h3 className="text-base font-semibold text-[var(--foreground)] mb-4">Who to Follow</h3>
                        <div className="border border-[var(--border)] rounded-[12px] bg-[var(--surface)] overflow-hidden">
                            {suggestions.length === 0 ? (
                                <div className="px-4 py-6 text-center text-xs text-gray-500">
                                    No suggestions yet. Invite your friends!
                                </div>
                            ) : (
                                suggestions.map((user, i) => (
                                    <div key={user.id} className={`flex items-center gap-3 px-4 py-3 ${i < suggestions.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                                        <div className="w-8 h-8 rounded-full bg-[var(--elevated)] border border-[var(--border)] flex items-center justify-center text-xs font-semibold text-[var(--foreground)]">
                                            {user.initials}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-[var(--foreground)] truncate">{user.name}</p>
                                            <p className="text-xs text-[var(--text-tertiary)] font-mono truncate">{user.role}</p>
                                        </div>
                                        <FollowButton userId={user.id} userName={user.name} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Achievement Badges */}
                    <div>
                        <h3 className="text-base font-semibold text-[var(--foreground)] mb-4">Your Badges</h3>
                        <div className="border border-[var(--border)] rounded-[12px] p-4 bg-[var(--surface)]">
                            <div className="grid grid-cols-3 gap-3">
                                {badges.map((badge) => (
                                    <div
                                        key={badge.name}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-[8px] text-center ${badge.unlocked
                                            ? "bg-[var(--background)]"
                                            : "bg-[var(--background)] opacity-40"
                                            }`}
                                    >
                                        <badge.icon
                                            className={`w-6 h-6 ${badge.unlocked ? "text-[var(--primary)]" : "text-[var(--text-tertiary)]"}`}
                                            strokeWidth={1.5}
                                        />
                                        <span className="text-[10px] font-mono text-[var(--text-tertiary)] leading-tight">
                                            {badge.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
