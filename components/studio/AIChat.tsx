"use client"

import { useRef, useEffect, useState, FormEvent } from "react"
import { Send, Bot, User, Sparkles } from "lucide-react"

interface AIChatProps {
    problemTitle?: string
    difficulty?: string
    userCode?: string
}

interface ChatMessage {
    id: string
    role: "user" | "assistant"
    content: string
}

export function AIChat({ problemTitle, difficulty, userCode }: AIChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: "1", role: "assistant", content: "Hi! I'm CodeBoard AI. Need a hint or help debugging?" }
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim()
        }

        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        const assistantId = (Date.now() + 1).toString()

        // Add empty assistant message that we'll stream into
        setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }])

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
                    context: {
                        problemTitle: problemTitle || "Not specified",
                        difficulty: difficulty || "Not specified",
                        userCode: userCode || ""
                    }
                })
            })

            if (!response.ok) throw new Error("Failed to get response")

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()

            if (!reader) throw new Error("No response stream")

            let fullText = ""

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                fullText += chunk

                // Update the assistant message with streamed content
                setMessages(prev =>
                    prev.map(m => m.id === assistantId ? { ...m, content: fullText } : m)
                )
            }

            // If no content was streamed, show fallback
            if (!fullText.trim()) {
                setMessages(prev =>
                    prev.map(m => m.id === assistantId
                        ? { ...m, content: "Sorry, I couldn't generate a response. Please try again." }
                        : m
                    )
                )
            }
        } catch {
            setMessages(prev =>
                prev.map(m => m.id === assistantId
                    ? { ...m, content: "⚠️ Connection error. Make sure the AI service is configured." }
                    : m
                )
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-full bg-[#0c0c0c] border-l border-[#1f1f1f] w-80">
            {/* Header */}
            <div className="p-4 border-b border-[#1f1f1f] flex items-center gap-2 bg-[#111]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm text-white">CodeBoard AI</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-gray-500">Online</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
                            ${m.role === 'user' ? 'bg-blue-600' : 'bg-purple-500/20'}`}>
                            {m.role === 'user' ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-purple-400" />}
                        </div>
                        <div className={`rounded-lg p-3 text-sm max-w-[85%] leading-relaxed whitespace-pre-wrap
                            ${m.role === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-[#1a1a1a] border border-[#333] rounded-tl-none text-gray-300'}`}>
                            {m.content || (
                                <span className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                                </span>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[#1f1f1f] bg-[#0c0c0c]">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask for a hint..."
                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-medium placeholder:text-gray-600"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-2 p-1 text-purple-400 hover:bg-purple-500/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-[10px] text-center mt-2 text-gray-600">
                    Powered by Gemini • AI can make mistakes
                </p>
            </form>
        </div>
    )
}
