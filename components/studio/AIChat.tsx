"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react"

interface Message {
    role: "user" | "assistant"
    content: string
}

export function AIChat() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm CodeBoard AI. Need a hint or help debugging?" }
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage = input
        setInput("")
        setMessages(prev => [...prev, { role: "user", content: userMessage }])
        setIsLoading(true)

        // Mock AI Response (Simulating delay)
        setTimeout(() => {
            const responses = [
                "That's a great approach! Have you considered the edge cases?",
                "Try using a hash map to optimize the time complexity.",
                "The time complexity of your solution is O(n^2). Can we do better?",
                "Make sure to handle the case where the input array is empty.",
                "Here's a hint: Use two pointers."
            ]
            const randomResponse = responses[Math.floor(Math.random() * responses.length)]

            setMessages(prev => [...prev, { role: "assistant", content: randomResponse }])
            setIsLoading(false)
        }, 1500)
    }

    return (
        <div className="flex flex-col h-full bg-[var(--surface)] border-l border-[var(--border)] w-80">
            {/* Header */}
            <div className="p-4 border-b border-[var(--border)] flex items-center gap-2 bg-[var(--surface-hover)]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm">CodeBoard AI</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-[var(--text-tertiary)]">Online</span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m, i) => (
                    <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 
                            ${m.role === 'user' ? 'bg-[var(--text-secondary)]' : 'bg-purple-500/20'}`}>
                            {m.role === 'user' ? <User className="w-4 h-4 text-[var(--background)]" /> : <Bot className="w-4 h-4 text-purple-400" />}
                        </div>
                        <div className={`rounded-lg p-3 text-sm max-w-[85%] leading-relaxed
                            ${m.role === 'user'
                                ? 'bg-[var(--foreground)] text-[var(--background)] rounded-tr-none'
                                : 'bg-[var(--background)] border border-[var(--border)] rounded-tl-none text-[var(--text-secondary)]'}`}>
                            {m.content}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg rounded-tl-none p-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[var(--text-tertiary)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-[var(--text-tertiary)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-[var(--text-tertiary)] rounded-full animate-bounce" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--border)] bg-[var(--surface)]">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask for a hint..."
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-medium placeholder:text-[var(--text-tertiary)]"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-2 p-1 text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-[10px] text-center mt-2 text-[var(--text-tertiary)]">
                    AI can make mistakes. Use code responsibly.
                </p>
            </form>
        </div>
    )
}
