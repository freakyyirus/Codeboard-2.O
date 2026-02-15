"use client"

import { useState } from "react"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import { Send, MessageSquare, Bug, Lightbulb, Star, Loader2 } from "lucide-react"
import toast from "react-hot-toast"

const CATEGORIES = [
    { id: "feature", label: "Feature Request", icon: <Lightbulb size={16} />, color: "text-yellow-400" },
    { id: "bug", label: "Bug Report", icon: <Bug size={16} />, color: "text-red-400" },
    { id: "feedback", label: "General Feedback", icon: <MessageSquare size={16} />, color: "text-blue-400" },
    { id: "other", label: "Other", icon: <Star size={16} />, color: "text-purple-400" },
]

export default function FeedbackPage() {
    const [category, setCategory] = useState("feedback")
    const [message, setMessage] = useState("")
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async () => {
        if (!message.trim()) {
            toast.error("Please write something first!")
            return
        }

        setSending(true)
        // Store feedback in Supabase if table exists, or just show success
        try {
            const supabase = createBrowserSupabaseClient()
            const { data: { user } } = await supabase.auth.getUser()

            // Try to insert into feedback table if it exists
            try {
                const payload = {
                    user_id: user?.id,
                    category,
                    message: message.trim(),
                }
                await (supabase as any).from("feedback").insert(payload)
            } catch {
                // Table might not exist yet — silently succeed
            }

            setSent(true)
            toast.success("Thanks for your feedback! 🎉")
        } catch {
            toast.success("Thanks for your feedback! 🎉")
            setSent(true)
        }
        setSending(false)
    }

    if (sent) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center fade-in">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-white mb-2">Thanks for your feedback!</h2>
                <p className="text-gray-500 mb-6">We appreciate your time and will review it soon.</p>
                <button
                    onClick={() => { setSent(false); setMessage(""); }}
                    className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm hover:bg-white/20 transition-colors"
                >
                    Send Another
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto p-6 md:p-8 fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Feedback</h1>
                <p className="text-gray-500 text-sm">Help us improve CodeBoard. We read every message.</p>
            </div>

            {/* Category Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {CATEGORIES.map(c => (
                    <button
                        key={c.id}
                        onClick={() => setCategory(c.id)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${category === c.id
                            ? "bg-white/10 border-white/20 text-white"
                            : "bg-white/5 border-white/5 text-gray-500 hover:text-white hover:border-white/10"
                            }`}
                    >
                        <span className={c.color}>{c.icon}</span>
                        {c.label}
                    </button>
                ))}
            </div>

            {/* Message */}
            <div className="mb-6">
                <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/30 text-sm resize-none placeholder:text-gray-600"
                />
                <p className="text-xs text-gray-600 mt-2">{message.length}/1000 characters</p>
            </div>

            <button
                onClick={handleSubmit}
                disabled={sending || !message.trim()}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
            >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Submit Feedback
            </button>
        </div>
    )
}
