"use client"

import { useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react"

interface AIChatProps {
    problemTitle?: string
    difficulty?: string
    userCode?: string
}

export function AIChat({ problemTitle, difficulty, userCode }: AIChatProps) {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: "/api/chat",
        initialMessages: [
            { id: "1", role: "assistant", content: "Hi! I'm CodeBoard AI. Need a hint or help debugging?" }
        ],
        body: {
            context: {
                problemTitle: problemTitle || "Not specified",
                difficulty: difficulty || "Not specified",
                userCode: userCode || ""
            }
        }
    })
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

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

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m: any) => (
                    <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
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

                {isLoading && messages[messages.length - 1]?.role === 'user' && (
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
                        onChange={handleInputChange}
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
