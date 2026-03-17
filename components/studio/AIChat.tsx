"use client"

import { useEffect, useRef, useState } from "react"
import { Send, Bot, User, Sparkles, Loader2, RefreshCw } from "lucide-react"
import { useChat } from "@ai-sdk/react"

interface AIChatProps {
    problemTitle?: string
    difficulty?: string
    userCode?: string
}

export function AIChat({ problemTitle, difficulty, userCode }: AIChatProps) {
    const [aiSettings, setAiSettings] = useState<any>(undefined)

    // Read settings when chat is opened
    useEffect(() => {
        const stored = localStorage.getItem("codeboard_ai_settings");
        if (stored) {
            try { setAiSettings(JSON.parse(stored)); } catch (e) {}
        }
    }, [])

    // @ts-expect-error - AI SDK type mismatch with current React version
    const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, stop } = useChat({
        body: {
            problemTitle,
            difficulty,
            userCode,
            aiSettings
        },
        onError: (err: unknown) => {
            console.error("Chat error:", err);
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
        <div className="flex flex-col h-full bg-[#0c0c0c] border-l border-[#1f1f1f] w-80">
            {/* Header */}
            <div className="p-4 border-b border-[#1f1f1f] flex items-center justify-between bg-[#111]">
                <div className="flex items-center gap-2">
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
                {isLoading && (
                    <button onClick={() => stop()} className="p-1.5 hover:bg-white/10 rounded-md text-red-400 transition-colors">
                        <span className="sr-only">Stop</span>
                        <div className="w-2 h-2 bg-red-500 rounded-[1px]" />
                    </button>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
                {messages.length === 0 && !error && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
                        <Bot className="w-10 h-10 text-gray-600 mb-2" />
                        <p className="text-sm text-gray-400">
                            Hi! I'm here to help you solve
                            <span className="block font-medium text-purple-400 mt-1">{problemTitle || "this problem"}</span>
                        </p>
                        <p className="text-xs text-gray-600 max-w-[200px]">
                            Ask for a hint, algorithm explanation, or help debugging your code.
                        </p>
                    </div>
                )}

                {messages.map((m: any) => (
                    <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
                            ${m.role === 'user' ? 'bg-blue-600' : 'bg-purple-500/20'}`}>
                            {m.role === 'user' ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-purple-400" />}
                        </div>
                        <div className={`rounded-lg p-3 text-sm max-w-[85%] leading-relaxed whitespace-pre-wrap
                            ${m.role === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-[#1a1a1a] border border-[#333] rounded-tl-none text-gray-300'}`}>
                            {m.content}
                        </div>
                    </div>
                ))}

                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                    <div className="flex gap-3">
                        <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-3.5 h-3.5 text-purple-400" />
                        </div>
                        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg rounded-tl-none p-4 flex items-center gap-1.5 h-10">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                        </div>
                    </div>
                )}

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex flex-col gap-2">
                        <p className="font-semibold">⚠️ Failed to generate response</p>
                        <p className="opacity-80">{error.message}</p>
                        <button
                            onClick={() => reload()}
                            className="flex items-center gap-1.5 self-start text-[10px] bg-red-500/20 px-2 py-1 rounded hover:bg-red-500/30 transition-colors"
                        >
                            <RefreshCw className="w-3 h-3" /> Retry
                        </button>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[#1f1f1f] bg-[#0c0c0c]">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask for a hint..."
                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-medium placeholder:text-gray-600"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-2 p-1 text-purple-400 hover:bg-purple-500/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                </div>
                <p className="text-[10px] text-center mt-2 text-gray-600">
                    Powered by Gemini • AI can make mistakes
                </p>
            </form>
        </div>
    )
}
