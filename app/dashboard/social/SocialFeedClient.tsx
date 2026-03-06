"use client"

import { useState, useEffect } from "react"
import { Heart, MessageCircle, Share2, Trophy, Flame, Target } from "lucide-react"

interface Post {
    id: string;
    user: string;
    initials: string;
    type: string;
    content: string;
    problem?: string;
    difficulty?: string;
    streakCount?: number;
    badge?: string;
    likes: number;
    comments: number;
    time: string;
}

export default function SocialFeedClient() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/social')
                if (res.ok) {
                    const data = await res.json()
                    setPosts(data)
                }
            } catch (error) {
                console.error("Failed to fetch social feed:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-20 border border-[var(--border)] rounded-[12px] bg-[var(--surface)]">
                <p className="text-[var(--text-secondary)]">No posts yet. Be the first to share your achievements!</p>
            </div>
        )
    }

    return (
        <>
            {posts.map((post) => (
                <div key={post.id} className="border border-[var(--border)] rounded-[12px] p-5 bg-[var(--surface)] card-hover-glow">
                    {/* User row */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-full bg-[var(--elevated)] border border-[var(--border)] flex items-center justify-center text-xs font-semibold text-[var(--foreground)]">
                            {post.initials}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-[var(--foreground)]">{post.user}</p>
                            <p className="text-xs text-[var(--text-tertiary)] font-mono">{post.time}</p>
                        </div>
                        {post.type === "solved" && post.difficulty && (
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

                    {/* Attachments / Meta */}
                    {post.type === "solved" && post.problem && (
                        <div className="bg-white/5 border border-white/5 rounded-lg p-3 mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-medium text-white">{post.problem}</span>
                            </div>
                        </div>
                    )}

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
        </>
    )
}

function Award(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="8" r="6" />
            <path d="M15.4776 12.89L17 22l-5-3-5 3 1.5224-9.11" />
        </svg>
    );
}
