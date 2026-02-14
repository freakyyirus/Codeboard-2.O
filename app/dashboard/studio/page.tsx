"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import {
    Terminal,
    Play,
    Send,
    Sparkles,
    Code2,
    CheckCircle,
    X,
    ChevronUp,
    ChevronDown,
    Loader2
} from "lucide-react"

/* ─── Mock Data ────────────────────────────────────── */

const PROBLEMS = [
    { id: "1", title: "Two Sum", difficulty: "Easy" },
    { id: "2", title: "Add Two Numbers", difficulty: "Medium" },
    { id: "3", title: "Longest Substring", difficulty: "Medium" },
    { id: "4", title: "Median of Two Sorted Arrays", difficulty: "Hard" },
]

const LANGUAGES = [
    { id: "cpp", name: "C++", defaultCode: `#include <iostream>\n\nint main() {\n    std::cout << "Hello World!";\n    return 0;\n}` },
    { id: "python", name: "Python", defaultCode: `def solve():\n    print("Hello World!")\n\nif __name__ == "__main__":\n    solve()` },
    { id: "javascript", name: "JavaScript", defaultCode: `console.log("Hello World!");` },
    { id: "java", name: "Java", defaultCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World!");\n    }\n}` },
]

/* ─── Component ────────────────────────────────────── */

export default function StudioPage() {
    // Layout State
    const [showAI, setShowAI] = useState(false)
    const [terminalOpen, setTerminalOpen] = useState(true)

    // Editor State
    const [language, setLanguage] = useState(LANGUAGES[0])
    const [code, setCode] = useState(LANGUAGES[0].defaultCode)
    const [selectedProblem, setSelectedProblem] = useState(PROBLEMS[0].id)
    const [isRunning, setIsRunning] = useState(false)
    const [output, setOutput] = useState<string[]>([
        "Welcome to CodeBoard Studio v2.0",
        "Ready to compile...",
    ])
    const [activeTab, setActiveTab] = useState<"console" | "testcases">("console")

    // AI Chat State
    const [messages, setMessages] = useState([
        { role: "ai", content: "Hi! I'm your AI coding assistant. I can help you explain the problem, give hints, or debug your code." }
    ])
    const [input, setInput] = useState("")

    /* ─── Handlers ─────────────────────────────────────── */

    const handleRun = async () => {
        setIsRunning(true)
        setOutput(["Compiling...", "Running tests..."])

        // Simulate execution
        setTimeout(() => {
            setIsRunning(false)
            setOutput([
                "> gcc solution.cpp -o solution",
                "> ./solution",
                "Hello World!",
                "",
                "Process finished with exit code 0"
            ])
            setTerminalOpen(true)
        }, 1500)
    }

    const handleSendMessage = () => {
        if (!input.trim()) return

        const newMessages = [...messages, { role: "user", content: input }]
        setMessages(newMessages)
        setInput("")

        // Simulate AI response
        setTimeout(() => {
            setMessages([...newMessages, {
                role: "ai",
                content: "I see you're working on Two Sum. Would you like a hint about using a hash map?"
            }])
        }, 1000)
    }

    /* ─── Render ───────────────────────────────────────── */

    return (
        <div className="h-full flex flex-col bg-[#000] text-gray-300 overflow-hidden">

            {/* 1. Top Navigation Bar */}
            <div className="h-14 border-b border-[#1f1f1f] bg-[#0c0c0c] flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white font-semibold">
                        <Terminal className="w-5 h-5 text-blue-500" />
                        <span>Studio</span>
                    </div>
                    <div className="h-6 w-px bg-[#1f1f1f]" />
                    <select
                        value={selectedProblem}
                        onChange={(e) => setSelectedProblem(e.target.value)}
                        className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 min-w-[200px]"
                    >
                        {PROBLEMS.map(p => (
                            <option key={p.id} value={p.id}>{p.id}. {p.title} ({p.difficulty})</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowAI(!showAI)}
                        className={`
                            flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-sm font-medium
                            ${showAI
                                ? "bg-purple-500/20 border-purple-500/50 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:text-white"
                            }
                        `}
                    >
                        <Sparkles className="w-4 h-4" />
                        AI Assistant
                    </button>

                    <div className="h-6 w-px bg-[#1f1f1f]" />

                    <select
                        value={language.id}
                        onChange={(e) => {
                            const lang = LANGUAGES.find(l => l.id === e.target.value)!
                            setLanguage(lang)
                            setCode(lang.defaultCode)
                        }}
                        className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
                    >
                        {LANGUAGES.map(l => (
                            <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30 transition-all disabled:opacity-50"
                    >
                        {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                        <span className="text-sm font-medium">Run</span>
                    </button>

                    <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
                        <Send className="w-4 h-4" />
                        <span className="text-sm font-medium">Submit</span>
                    </button>
                </div>
            </div>

            {/* 2. Main Workspace */}
            <div className="flex-1 flex overflow-hidden relative">

                {/* LEFT PANEL: Problem Description */}
                <div className="w-[400px] border-r border-[#1f1f1f] bg-[#0c0c0c] flex flex-col shrink-0 hidden md:flex">
                    <div className="p-4 border-b border-[#1f1f1f] flex items-center justify-between">
                        <div className="font-semibold text-white flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-gray-500" />
                            Description
                        </div>
                        <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20">Easy</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 prose prose-invert max-w-none text-gray-300">
                        <h2 className="text-xl font-bold text-white mb-4">1. Two Sum</h2>
                        <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
                        <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
                        <p>You can return the answer in any order.</p>

                        <h3 className="text-white mt-6 mb-2">Example 1:</h3>
                        <pre className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333] text-sm text-gray-300">
                            Input: nums = [2,7,11,15], target = 9{"\n"}
                            Output: [0,1]{"\n"}
                            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                        </pre>

                        <h3 className="text-white mt-6 mb-2">Constraints:</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>2 &le; nums.length &le; 10<sup>4</sup></li>
                            <li>-10<sup>9</sup> &le; nums[i] &le; 10<sup>9</sup></li>
                            <li>-10<sup>9</sup> &le; target &le; 10<sup>9</sup></li>
                        </ul>
                    </div>
                </div>

                {/* CENTER PANEL: Editor + Terminal */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">

                    {/* Editor */}
                    <div className="flex-1 relative">
                        <Editor
                            height="100%"
                            language={language.id}
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: "'JetBrains Mono', monospace",
                                lineNumbers: "on",
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16 }
                            }}
                        />
                    </div>

                    {/* Terminal (Collapsible) */}
                    <div
                        className="border-t border-[#1f1f1f] bg-[#0c0c0c] flex flex-col transition-all duration-300 ease-in-out"
                        style={{ height: terminalOpen ? 200 : 40 }}
                    >
                        <div className="flex items-center justify-between px-4 h-10 border-b border-[#1f1f1f] bg-[#1a1a1a] shrink-0">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setActiveTab("console")}
                                    className={`text-xs font-medium flex items-center gap-2 h-full border-b-2 px-1 transition-colors ${activeTab === "console" ? "text-white border-blue-500" : "text-gray-500 border-transparent hover:text-gray-300"}`}
                                >
                                    <Terminal className="w-3.5 h-3.5" />
                                    Console
                                </button>
                                <button
                                    onClick={() => setActiveTab("testcases")}
                                    className={`text-xs font-medium flex items-center gap-2 h-full border-b-2 px-1 transition-colors ${activeTab === "testcases" ? "text-white border-green-500" : "text-gray-500 border-transparent hover:text-gray-300"}`}
                                >
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    Test Cases
                                </button>
                            </div>
                            <button onClick={() => setTerminalOpen(!terminalOpen)} className="text-gray-500 hover:text-white">
                                {terminalOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                            </button>
                        </div>

                        {terminalOpen && (
                            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar">
                                {activeTab === "console" ? (
                                    <div className="space-y-1">
                                        {output.map((line, i) => (
                                            <div key={i} className={line.startsWith(">") ? "text-gray-500" : "text-gray-300"}>{line}</div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-[#1e1e1e] rounded border border-[#333]">
                                            <div className="text-xs text-gray-500 mb-2">Input</div>
                                            <div className="font-mono text-gray-300">nums = [2,7,11,15], target = 9</div>
                                        </div>
                                        <div className="p-3 bg-[#1e1e1e] rounded border border-[#333]">
                                            <div className="text-xs text-gray-500 mb-2">Expected Output</div>
                                            <div className="font-mono text-gray-300">[0,1]</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL: AI Assistant */}
                {showAI && (
                    <div
                        className="w-[320px] border-l border-[#1f1f1f] bg-[#0c0c0c] flex flex-col absolute right-0 top-0 bottom-0 z-20 shadow-2xl"
                    >
                        <div className="p-4 border-b border-[#1f1f1f] flex items-center justify-between bg-purple-900/10">
                            <div className="flex items-center gap-2 text-purple-400 font-semibold">
                                <Sparkles className="w-4 h-4" />
                                AI Assistant
                            </div>
                            <button onClick={() => setShowAI(false)} className="text-gray-500 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`
                                        max-w-[85%] p-3 rounded-2xl text-sm
                                        ${m.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-[#1e1e1e] border border-[#333] text-gray-300 rounded-bl-none'
                                        }
                                    `}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-[#1f1f1f] bg-[#0c0c0c]">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask for a hint..."
                                    className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-600"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="p-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors text-white"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <button className="text-[10px] bg-[#1a1a1a] border border-[#333] hover:bg-[#222] px-2 py-1 rounded text-purple-400 transition-colors">💡 Explain Code</button>
                                <button className="text-[10px] bg-[#1a1a1a] border border-[#333] hover:bg-[#222] px-2 py-1 rounded text-green-400 transition-colors">🐛 Debug</button>
                                <button className="text-[10px] bg-[#1a1a1a] border border-[#333] hover:bg-[#222] px-2 py-1 rounded text-blue-400 transition-colors">📊 Complexity</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
