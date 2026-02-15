"use client"

import { useState, useEffect } from "react"
import {
    Heart,
    MessageCircle,
    Share2,
    Send,
    Image as ImageIcon,
    User,
    MoreHorizontal,
    Loader2,
    TrendingUp,
} from "lucide-react"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import toast from "react-hot-toast"

/* ─── Types ────────────────────────────────────── */

interface Post {
    id: string
    user: {
        name: string
        username: string
        initials: string
        avatar_url: string
    }
    content: string
    likes: number
    comments: number
    liked: boolean
    created_at: string
    tags: string[]
}

/* ─── Mock Data ────────────────────────────────── */

const MOCK_POSTS: Post[] = [
    {
        id: "1",
        user: { name: "Arjun Patel", username: "arjun_dev", initials: "AP", avatar_url: "" },
        content: "Just solved my 100th problem on LeetCode! 🎉 The grind is real but consistency pays off. Started with easy problems and now comfortable with most medium DP problems. Keep going everyone! 💪",
        likes: 42, comments: 8, liked: false,
        created_at: "2h ago",
        tags: ["milestone", "leetcode", "dp"]
    },
    {
        id: "2",
        user: { name: "Priya Sharma", username: "priya_codes", initials: "PS", avatar_url: "" },
        content: "Pro tip: Don't just solve problems, understand the patterns! I made a mind map of all DP patterns and it changed my approach completely. Happy to share if anyone's interested 📊",
        likes: 89, comments: 23, liked: true,
        created_at: "5h ago",
        tags: ["tips", "dp", "patterns"]
    },
    {
        id: "3",
        user: { name: "Rahul Kumar", username: "rahul_cf_expert", initials: "RK", avatar_url: "" },
        content: "Codeforces Round #900 was insane! Managed to solve A-D in 45 minutes. The key to E was segment tree with lazy propagation. Anyone else found a simpler approach?",
        likes: 31, comments: 15, liked: false,
        created_at: "8h ago",
        tags: ["codeforces", "contest", "competitive"]
    },
    {
        id: "4",
        user: { name: "Sneha Reddy", username: "sneha_ml", initials: "SR", avatar_url: "" },
        content: "Just got selected for Google Summer of Code 2026! 🌟 Applied to 3 orgs and got accepted by TensorFlow. Couldn't have done it without the support of this community. AMA!",
        likes: 156, comments: 34, liked: false,
        created_at: "1d ago",
        tags: ["gsoc", "opensource", "achievement"]
    },
    {
        id: "5",
        user: { name: "Dev Kapoor", username: "dev_k", initials: "DK", avatar_url: "" },
        content: "Striver's A2Z sheet is a game changer. Completed the Recursion section today — backtracking problems are starting to click. N-Queens was the breakthrough moment! 👑",
        likes: 67, comments: 12, liked: false,
        created_at: "1d ago",
        tags: ["striver", "recursion", "dsa"]
    },
]

const TRENDING_TAGS = ["leetcode", "codeforces", "placement", "dsa", "gsoc", "internship", "cp", "systemdesign"]

/* ─── Component ────────────────────────────────── */

export default function CommunityPage() {
    const [posts, setPosts] = useState(MOCK_POSTS)
    const [newPost, setNewPost] = useState("")
    const [posting, setPosting] = useState(false)
    const [currentUser, setCurrentUser] = useState<{ name: string; initials: string } | null>(null)

    useEffect(() => {
        const supabase = createBrowserSupabaseClient()
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"
                const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
                setCurrentUser({ name, initials })
            }
        })
    }, [])

    const handlePost = async () => {
        if (!newPost.trim()) return
        setPosting(true)

        // Extract hashtags
        const tags = newPost.match(/#\w+/g)?.map(t => t.slice(1)) || []

        const post: Post = {
            id: Date.now().toString(),
            user: {
                name: currentUser?.name || "You",
                username: "you",
                initials: currentUser?.initials || "YO",
                avatar_url: "",
            },
            content: newPost,
            likes: 0,
            comments: 0,
            liked: false,
            created_at: "Just now",
            tags,
        }

        setPosts([post, ...posts])
        setNewPost("")
        setPosting(false)
        toast.success("Post published! 🎉")
    }

    const toggleLike = (id: string) => {
        setPosts(posts.map(p =>
            p.id === id
                ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
                : p
        ))
    }

    return (
        <div className="max-w-3xl p-6 md:p-8 fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Community</h1>
                <p className="text-gray-500 text-sm">Share your journey, celebrate wins, and help each other grow.</p>
            </div>

            {/* Trending Tags */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                <TrendingUp size={14} className="text-gray-500 shrink-0" />
                {TRENDING_TAGS.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 bg-white/5 border border-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors shrink-0">
                        #{tag}
                    </span>
                ))}
            </div>

            {/* New Post */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold border border-white/10 shrink-0">
                        {currentUser?.initials || "??"}
                    </div>
                    <div className="flex-1">
                        <textarea
                            value={newPost}
                            onChange={e => setNewPost(e.target.value)}
                            placeholder="Share something with the community..."
                            rows={3}
                            className="w-full bg-transparent text-white text-sm focus:outline-none resize-none placeholder:text-gray-600"
                        />
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                    <ImageIcon size={18} />
                                </button>
                            </div>
                            <button
                                onClick={handlePost}
                                disabled={!newPost.trim() || posting}
                                className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                            >
                                {posting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feed */}
            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/15 transition-colors">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold border border-white/10 shrink-0">
                                {post.user.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-white text-sm">{post.user.name}</span>
                                    <span className="text-xs text-gray-600">@{post.user.username}</span>
                                    <span className="text-xs text-gray-600">· {post.created_at}</span>
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap mb-3">{post.content}</p>

                                {post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[11px] text-blue-400 hover:underline cursor-pointer">#{tag}</span>
                                        ))}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-6 text-gray-500">
                                    <button
                                        onClick={() => toggleLike(post.id)}
                                        className={`flex items-center gap-1.5 text-xs hover:text-red-400 transition-colors ${post.liked ? "text-red-400" : ""}`}
                                    >
                                        <Heart size={16} fill={post.liked ? "currentColor" : "none"} />
                                        {post.likes}
                                    </button>
                                    <button className="flex items-center gap-1.5 text-xs hover:text-blue-400 transition-colors">
                                        <MessageCircle size={16} />
                                        {post.comments}
                                    </button>
                                    <button className="flex items-center gap-1.5 text-xs hover:text-green-400 transition-colors">
                                        <Share2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
