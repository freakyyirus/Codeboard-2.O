"use client"

import { useState } from "react"
import {
    Terminal,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Clock,
    Database,
    FileJson,
    ChevronDown,
    ChevronUp,
    Copy,
    Check,
    RefreshCw,
    X,
    Play,
    Send,
    Loader2,
    Sparkles,
    SearchCode,
    Bug,
    MonitorUp
} from "lucide-react"

interface TestCaseResult {
    id: number
    input: string
    expected: string
    actual: string
    passed: boolean
    time?: string
    memory?: string
}

interface OutputPanelProps {
    output: string[]
    isRunning: boolean
    activeTab: "console" | "testcases" | "results" | "review"
    onTabChange: (tab: "console" | "testcases" | "results" | "review") => void
    isOpen: boolean
    onToggle: () => void
    testCases?: TestCaseResult[]
    height?: number
}

export function OutputPanel({
    output,
    isRunning,
    activeTab,
    onTabChange,
    isOpen,
    onToggle,
    testCases = [],
    height = 280
}: OutputPanelProps) {
    const [copied, setCopied] = useState(false)
    const [expandedTests, setExpandedTests] = useState<Set<number>>(new Set())

    const copyOutput = async () => {
        const text = output.join("\n")
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const toggleTestExpand = (id: number) => {
        setExpandedTests(prev => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
            }
            return next
        })
    }

    const passedCount = testCases.filter(t => t.passed).length
    const failedCount = testCases.length - passedCount

    const getLineClass = (line: string) => {
        if (line.startsWith(">")) return "text-gray-500"
        if (line.startsWith("✅")) return "text-green-400"
        if (line.startsWith("❌")) return "text-red-400"
        if (line.startsWith("⏳")) return "text-yellow-400"
        if (line.startsWith("💎")) return "text-purple-400"
        return "text-gray-300"
    }

    const tabs = [
        { id: "console" as const, label: "Console", icon: Terminal },
        { id: "testcases" as const, label: "Test Cases", icon: CheckCircle, count: testCases.length },
        { id: "results" as const, label: "Results", icon: Database, count: testCases.length > 0 ? passedCount : undefined },
        { id: "review" as const, label: "Review", icon: SearchCode }
    ]

    if (!isOpen) return null

    return (
        <div 
            className="border-t border-[#1f1f1f] bg-[#0c0c0c] flex flex-col"
            style={{ height }}
        >
            <div className="flex items-center justify-between px-3 h-9 border-b border-[#1f1f1f] bg-[#1a1a1a] shrink-0">
                <div className="flex items-center gap-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${
                                activeTab === tab.id
                                    ? "bg-[#2a2a2a] text-white"
                                    : "text-gray-500 hover:text-gray-300"
                            }`}
                        >
                            <tab.icon className="w-3 h-3" />
                            {tab.label}
                            {tab.count !== undefined && (
                                <span className={`ml-1 px-1 py-0.5 rounded text-[10px] ${
                                    activeTab === tab.id ? "bg-blue-500/20 text-blue-400" : "bg-[#333] text-gray-500"
                                }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-1">
                    {isRunning && (
                        <div className="flex items-center gap-1.5 mr-2 text-xs text-yellow-400">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Running...
                        </div>
                    )}
                    <button
                        onClick={copyOutput}
                        className="p-1.5 text-gray-500 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
                        title="Copy output"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                        onClick={onToggle}
                        className="p-1.5 text-gray-500 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
                        title="Collapse"
                    >
                        <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 font-mono text-xs scrollbar-thin scrollbar-thumb-gray-800">
                {activeTab === "console" && (
                    <div className="space-y-0.5">
                        {output.length === 0 ? (
                            <div className="text-gray-500">No output yet. Run or submit your code to see results.</div>
                        ) : (
                            output.map((line, i) => (
                                <div key={i} className={getLineClass(line)}>
                                    {line || "\u00A0"}
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "testcases" && (
                    <div className="space-y-3">
                        {testCases.length === 0 ? (
                            <div className="text-gray-500">No test cases available.</div>
                        ) : (
                            testCases.map((tc, idx) => (
                                <div
                                    key={tc.id}
                                    className={`rounded-lg border overflow-hidden ${
                                        tc.passed 
                                            ? "bg-green-500/5 border-green-500/20" 
                                            : "bg-red-500/5 border-red-500/20"
                                    }`}
                                >
                                    <div 
                                        className="flex items-center justify-between p-3 cursor-pointer hover:opacity-90"
                                        onClick={() => toggleTestExpand(tc.id)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {tc.passed ? (
                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-400" />
                                            )}
                                            <span className={tc.passed ? "text-green-400" : "text-red-400"}>
                                                Test Case {tc.id}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {tc.time && (
                                                <span className="text-gray-500 text-[10px] flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {tc.time}
                                                </span>
                                            )}
                                            {expandedTests.has(tc.id) ? (
                                                <ChevronUp className="w-4 h-4 text-gray-500" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 text-gray-500" />
                                            )}
                                        </div>
                                    </div>
                                    
                                    {expandedTests.has(tc.id) && (
                                        <div className="px-3 pb-3 space-y-2 border-t border-[#333] pt-2">
                                            <div>
                                                <div className="text-[10px] text-gray-500 mb-1">Input</div>
                                                <pre className="bg-[#1a1a1a] p-2 rounded text-gray-300 whitespace-pre-wrap">
                                                    {tc.input}
                                                </pre>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-gray-500 mb-1">Expected Output</div>
                                                <pre className="bg-[#1a1a1a] p-2 rounded text-green-400 whitespace-pre-wrap">
                                                    {tc.expected}
                                                </pre>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-gray-500 mb-1">Your Output</div>
                                                <pre className={`bg-[#1a1a1a] p-2 rounded whitespace-pre-wrap ${
                                                    tc.passed ? "text-green-400" : "text-red-400"
                                                }`}>
                                                    {tc.actual}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "results" && (
                    <div className="space-y-4">
                        {testCases.length === 0 ? (
                            <div className="text-gray-500">Run your code to see results.</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333] text-center">
                                        <div className="text-2xl font-bold text-white">{testCases.length}</div>
                                        <div className="text-xs text-gray-500">Total</div>
                                    </div>
                                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30 text-center">
                                        <div className="text-2xl font-bold text-green-400">{passedCount}</div>
                                        <div className="text-xs text-green-400/70">Passed</div>
                                    </div>
                                    <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30 text-center">
                                        <div className="text-2xl font-bold text-red-400">{failedCount}</div>
                                        <div className="text-xs text-red-400/70">Failed</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">Test Results</div>
                                    {testCases.map(tc => (
                                        <div
                                            key={tc.id}
                                            className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#333]"
                                        >
                                            <div className="flex items-center gap-2">
                                                {tc.passed ? (
                                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-red-400" />
                                                )}
                                                <span className="text-gray-300">Case {tc.id}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs">
                                                {tc.time && (
                                                    <span className="text-gray-500">{tc.time}</span>
                                                )}
                                                <span className={tc.passed ? "text-green-400" : "text-red-400"}>
                                                    {tc.passed ? "Accepted" : "Wrong Answer"}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {activeTab === "review" && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center py-8 text-gray-500">
                            <div className="text-center">
                                <SearchCode className="w-12 h-12 mx-auto mb-4 opacity-30" />
                                <p className="text-sm">Use the Review panel for detailed code analysis</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export function OutputToggle({ 
    isOpen, 
    onToggle, 
    isRunning,
    errorCount 
}: { 
    isOpen: boolean; 
    onToggle: () => void;
    isRunning: boolean;
    errorCount: number;
}) {
    return (
        <button
            onClick={onToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-xs font-medium
                ${isOpen
                    ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                    : errorCount > 0
                        ? "bg-red-500/20 border-red-500/50 text-red-400"
                        : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:text-white"
                }`}
        >
            <MonitorUp className="w-3.5 h-3.5" />
            Output
            {isRunning && <Loader2 className="w-3 h-3 animate-spin" />}
        </button>
    )
}
