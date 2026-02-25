"use client"

import { ExternalLink, Hash, Linkedin, Newspaper, Twitter } from "lucide-react"

interface SocialPost {
    id: string
    platform: "devto" | "medium" | "hashnode" | "twitter" | "linkedin"
    title: string
    url: string
    publishedAt: string
    views?: number
    reactions?: number
}

const PLATFORM_ICONS = {
    devto: <div className="p-1 bg-black rounded border border-white/20"><img src="https://d2fltix0v2e0sb.cloudfront.net/dev-black.png" alt="DEV" className="w-4 h-4 invert" /></div>,
    medium: <div className="p-1 bg-black rounded border border-white/20"><Newspaper className="w-4 h-4 text-white" /></div>,
    hashnode: <div className="p-1 bg-blue-600 rounded border border-blue-500"><Hash className="w-4 h-4 text-white" /></div>,
    twitter: <div className="p-1 bg-black rounded border border-white/20"><Twitter className="w-4 h-4 text-blue-400" /></div>,
    linkedin: <div className="p-1 bg-[#0077b5] rounded border border-[#0077b5]"><Linkedin className="w-4 h-4 text-white" /></div>,
}

export function SocialActivityFeed({ posts }: { posts: SocialPost[] }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="bg-white/[0.03] border border-white/10 rounded-xl h-full flex flex-col">
                <div className="p-6 pb-2">
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                        Social Activity
                    </h3>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-gray-500 text-sm">
                    <p>No recent activity found.</p>
                    <p className="text-xs mt-1">Connect your accounts in Settings.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-xl h-full flex flex-col">
            <div className="p-6 pb-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Recent Posts</h3>
                <span className="text-xs font-normal text-gray-400 bg-white/5 px-2 py-1 rounded-full">{posts.length} Posts</span>
            </div>
            <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-gray-800 max-h-[400px]">
                <div className="divide-y divide-white/5">
                    {posts.map((post) => (
                        <a
                            key={post.id}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-4 hover:bg-white/5 transition-colors group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    {PLATFORM_ICONS[post.platform] || <Newspaper className="w-4 h-4" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                                        {post.title}
                                    </h4>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                        {post.views !== undefined && (
                                            <span>{post.views} views</span>
                                        )}
                                        {post.reactions !== undefined && (
                                            <span>{post.reactions} likes</span>
                                        )}
                                    </div>
                                </div>
                                <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
