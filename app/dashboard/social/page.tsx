"use client"

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
} from "lucide-react"

/* ─── Mock Data ────────────────────────────────────────── */

const feedPosts = [
    {
        user: "Priya Sharma",
        initials: "PS",
        time: "2 min ago",
        type: "solved",
        content: "Just solved Merge K Sorted Lists in 15 minutes! Dynamic programming is clicking finally.",
        problem: "Merge K Sorted Lists",
        difficulty: "Hard",
        likes: 24,
        comments: 3,
    },
    {
        user: "Alex Chen",
        initials: "AC",
        time: "1 hour ago",
        type: "streak",
        content: "30-day streak! 🔥 Consistency is key. If I can do it, so can you.",
        streakCount: 30,
        likes: 89,
        comments: 12,
    },
    {
        user: "Jordan Blake",
        initials: "JB",
        time: "3 hours ago",
        type: "achievement",
        content: "Unlocked the 'Graph Master' badge after solving 50 graph problems!",
        badge: "Graph Master",
        likes: 45,
        comments: 7,
    },
    {
        user: "Sarah Kim",
        initials: "SK",
        time: "5 hours ago",
        type: "solved",
        content: "Finally cracked the Traveling Salesman Problem. Took me 3 days but it was worth it.",
        problem: "Traveling Salesman",
        difficulty: "Hard",
        likes: 67,
        comments: 15,
    },
    {
        user: "Dev Patel",
        initials: "DP",
        time: "Yesterday",
        type: "contest",
        content: "Finished 47th in Codeforces Round 922! Moved up from Specialist to Expert. 🎉",
        likes: 134,
        comments: 28,
    },
]

const leaderboard = [
    { name: "Alex Chen", initials: "AC", solved: 892, streak: 45 },
    { name: "Priya Sharma", initials: "PS", solved: 756, streak: 30 },
    { name: "Dev Patel", initials: "DP", solved: 681, streak: 22 },
    { name: "Sarah Kim", initials: "SK", solved: 634, streak: 18 },
    { name: "Jordan Blake", initials: "JB", solved: 589, streak: 15 },
    { name: "John Doe", initials: "JD", solved: 482, streak: 12 },
    { name: "Maria Garcia", initials: "MG", solved: 445, streak: 10 },
    { name: "Raj Kumar", initials: "RK", solved: 398, streak: 8 },
    { name: "Lisa Wang", initials: "LW", solved: 367, streak: 6 },
    { name: "Tom Wilson", initials: "TW", solved: 312, streak: 4 },
]

const suggestions = [
    { name: "Emily Zhang", initials: "EZ", role: "SWE @ Apple", solved: 520 },
    { name: "Arjun Mehta", initials: "AM", role: "CP Grandmaster", solved: 1200 },
    { name: "Chloe Park", initials: "CP", role: "CS @ Stanford", solved: 340 },
]

const badges = [
    { name: "100 Problems", icon: Target, unlocked: true },
    { name: "30-Day Streak", icon: Flame, unlocked: true },
    { name: "DP Master", icon: Zap, unlocked: true },
    { name: "Graph Master", icon: Star, unlocked: false },
    { name: "Contest Winner", icon: Trophy, unlocked: false },
    { name: "500 Solved", icon: Award, unlocked: false },
]

/* ─── Component ────────────────────────────────────────── */

export default function SocialPage() {
    return (
        <div className="max-w-[1200px] mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-[24px] font-display text-[var(--foreground)]">Social</h1>
                <p className="text-[var(--text-secondary)] text-sm mt-1">
                    See what your community is solving. Compete, share, and grow together.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left — Activity Feed (2/3) */}
                <div className="lg:col-span-2 space-y-4">
                    {feedPosts.map((post, index) => (
                        <div key={index} className="border border-[var(--border)] rounded-[12px] p-5 bg-[var(--surface)] card-hover-glow">
                            {/* User row */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-full bg-[var(--elevated)] border border-[var(--border)] flex items-center justify-center text-xs font-semibold text-[var(--foreground)]">
                                    {post.initials}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-[var(--foreground)]">{post.user}</p>
                                    <p className="text-xs text-[var(--text-tertiary)] font-mono">{post.time}</p>
                                </div>
                                {post.type === "solved" && (
                                    <span className={`badge ${post.difficulty === "Easy" ? "badge-easy" : post.difficulty === "Medium" ? "badge-medium" : "badge-hard"}`}>
                                        {post.difficulty}
                                    </span>
                                )}
                                {post.type === "streak" && (
                                    <span className="flex items-center gap-1 text-xs font-mono text-[var(--warning)]">
                                        <Flame className="w-3.5 h-3.5 flame-flicker" /> {post.streakCount} days
                                    </span>
                                )}
                                {post.type === "achievement" && (
                                    <Award className="w-5 h-5 text-[var(--primary)]" />
                                )}
                                {post.type === "contest" && (
                                    <Trophy className="w-5 h-5 text-[var(--warning)]" />
                                )}
                            </div>

                            {/* Content */}
                            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                                {post.content}
                            </p>

                            {/* Actions */}
                            <div className="flex items-center gap-6 pt-3 border-t border-[var(--border)]">
                                <button className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--error)] transition-colors font-mono">
                                    <Heart className="w-3.5 h-3.5" strokeWidth={1.5} /> {post.likes}
                                </button>
                                <button className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--primary)] transition-colors font-mono">
                                    <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} /> {post.comments}
                                </button>
                                <button className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--foreground)] transition-colors font-mono ml-auto">
                                    <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} /> Share
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Leaderboard */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy className="w-4 h-4 text-[var(--warning)]" />
                            <h3 className="text-base font-semibold text-[var(--foreground)]">Weekly Leaderboard</h3>
                        </div>
                        <div className="border border-[var(--border)] rounded-[12px] bg-[var(--surface)] overflow-hidden">
                            {leaderboard.map((user, i) => (
                                <div key={user.name} className={`flex items-center gap-3 px-4 py-3 ${i < leaderboard.length - 1 ? "border-b border-[var(--border)]" : ""} hover:bg-[var(--elevated)]/30 transition-colors cursor-pointer`}>
                                    <span className={`w-5 text-xs font-mono font-bold ${i < 3 ? "text-[var(--warning)]" : "text-[var(--text-tertiary)]"}`}>
                                        {i + 1}
                                    </span>
                                    <div className="w-7 h-7 rounded-full bg-[var(--elevated)] border border-[var(--border)] flex items-center justify-center text-[10px] font-semibold text-[var(--foreground)]">
                                        {user.initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-[var(--foreground)] truncate">{user.name}</p>
                                    </div>
                                    <span className="text-xs font-mono text-[var(--text-tertiary)]">{user.solved}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Who to Follow */}
                    <div>
                        <h3 className="text-base font-semibold text-[var(--foreground)] mb-4">Who to Follow</h3>
                        <div className="border border-[var(--border)] rounded-[12px] bg-[var(--surface)] overflow-hidden">
                            {suggestions.map((user, i) => (
                                <div key={user.name} className={`flex items-center gap-3 px-4 py-3 ${i < suggestions.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                                    <div className="w-8 h-8 rounded-full bg-[var(--elevated)] border border-[var(--border)] flex items-center justify-center text-xs font-semibold text-[var(--foreground)]">
                                        {user.initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[var(--foreground)] truncate">{user.name}</p>
                                        <p className="text-xs text-[var(--text-tertiary)] font-mono truncate">{user.role}</p>
                                    </div>
                                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold border border-[var(--border)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] rounded-[6px] transition-colors">
                                        <UserPlus className="w-3 h-3" /> Follow
                                    </button>
                                </div>
                            ))}
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
