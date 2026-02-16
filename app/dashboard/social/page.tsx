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

/* ─── Mock Data for Feed (Community Features) ────────────────── */
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
]

const leaderboard = [
    { name: "Alex Chen", initials: "AC", solved: 892, streak: 45 },
    { name: "Priya Sharma", initials: "PS", solved: 756, streak: 30 },
    { name: "Dev Patel", initials: "DP", solved: 681, streak: 22 },
    { name: "Sarah Kim", initials: "SK", solved: 634, streak: 18 },
    { name: "Jordan Blake", initials: "JB", solved: 589, streak: 15 },
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

export default async function SocialPage() {
    const stats = await getCachedSocialStats()

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

