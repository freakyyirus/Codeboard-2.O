"use client"

import { useState, useEffect, useRef } from "react"
import {
    Bug,
    Play,
    Pause,
    StepForward,
    StepBack,
    RotateCcw,
    Circle,
    Trash2,
    ChevronDown,
    ChevronRight,
    Plus,
    X,
    Eye,
    EyeOff,
    Variable,
    Box,
    List,
    MapPin,
    Loader2,
    AlertCircle
} from "lucide-react"

interface Breakpoint {
    id: string
    line: number
    enabled: boolean
    condition?: string
}

interface DebugVariable {
    name: string
    value: string
    type: string
    expanded?: boolean
    children?: DebugVariable[]
}

interface CallStackFrame {
    name: string
    line: number
    file: string
}

interface DebugState {
    isRunning: boolean
    isPaused: boolean
    currentLine: number | null
    breakpoints: Breakpoint[]
    variables: DebugVariable[]
    callStack: CallStackFrame[]
    watchExpressions: string[]
    logs: string[]
}

interface DebugPanelProps {
    code: string
    language: string
    isOpen: boolean
    onClose: () => void
    onRunWithDebug: () => void
    onSubmit: () => void
}

export function DebugPanel({ code, language, isOpen, onClose, onRunWithDebug, onSubmit }: DebugPanelProps) {
    const [debugState, setDebugState] = useState<DebugState>({
        isRunning: false,
        isPaused: false,
        currentLine: null,
        breakpoints: [],
        variables: [
            { name: "nums", value: "[2, 7, 11, 15]", type: "number[]", expanded: true, children: [
                { name: "[0]", value: "2", type: "number" },
                { name: "[1]", value: "7", type: "number" },
                { name: "[2]", value: "11", type: "number" },
                { name: "[3]", value: "15", type: "number" }
            ]},
            { name: "target", value: "9", type: "number" },
            { name: "map", value: "Map(2)", type: "Map", expanded: false, children: [
                { name: "2 → 0", value: "", type: "entry" },
                { name: "7 → 1", value: "", type: "entry" }
            ]},
            { name: "result", value: "[0, 1]", type: "number[]" }
        ],
        callStack: [
            { name: "twoSum", line: 5, file: "solution.js" },
            { name: "main", line: 18, file: "solution.js" }
        ],
        watchExpressions: ["result.length", "map.size", "target - nums[0]"],
        logs: []
    })

    const [newWatch, setNewWatch] = useState("")
    const [expandedVars, setExpandedVars] = useState<Set<string>>(new Set(["nums"]))
    const [expandedSections, setExpandedSections] = useState({
        variables: true,
        watch: true,
        callStack: true,
        breakpoints: true,
        console: true
    })

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    const toggleVariable = (name: string) => {
        setExpandedVars(prev => {
            const next = new Set(prev)
            if (next.has(name)) {
                next.delete(name)
            } else {
                next.add(name)
            }
            return next
        })
    }

    const addBreakpoint = (line: number) => {
        const exists = debugState.breakpoints.find(b => b.line === line)
        if (!exists) {
            setDebugState(prev => ({
                ...prev,
                breakpoints: [...prev.breakpoints, {
                    id: Date.now().toString(),
                    line,
                    enabled: true
                }]
            }))
        }
    }

    const removeBreakpoint = (id: string) => {
        setDebugState(prev => ({
            ...prev,
            breakpoints: prev.breakpoints.filter(b => b.id !== id)
        }))
    }

    const toggleBreakpoint = (id: string) => {
        setDebugState(prev => ({
            ...prev,
            breakpoints: prev.breakpoints.map(b => 
                b.id === id ? { ...b, enabled: !b.enabled } : b
            )
        }))
    }

    const addWatchExpression = () => {
        if (newWatch.trim() && !debugState.watchExpressions.includes(newWatch.trim())) {
            setDebugState(prev => ({
                ...prev,
                watchExpressions: [...prev.watchExpressions, newWatch.trim()]
            }))
            setNewWatch("")
        }
    }

    const removeWatchExpression = (expr: string) => {
        setDebugState(prev => ({
            ...prev,
            watchExpressions: prev.watchExpressions.filter(e => e !== expr)
        }))
    }

    const startDebug = () => {
        setDebugState(prev => ({
            ...prev,
            isRunning: true,
            isPaused: false,
            currentLine: null,
            logs: ["Debug session started..."]
        }))

        setTimeout(() => {
            setDebugState(prev => ({
                ...prev,
                currentLine: 5,
                isPaused: true,
                logs: [...prev.logs, `Paused at line ${prev.currentLine}`, "Hit breakpoint at line 5"]
            }))
        }, 1000)
    }

    const stepForward = () => {
        setDebugState(prev => {
            const nextLine = (prev.currentLine || 0) + 1
            return {
                ...prev,
                currentLine: nextLine,
                logs: [...prev.logs, `Stepped to line ${nextLine}`]
            }
        })
    }

    const stepBack = () => {
        setDebugState(prev => {
            const nextLine = Math.max(1, (prev.currentLine || 1) - 1)
            return {
                ...prev,
                currentLine: nextLine,
                logs: [...prev.logs, `Stepped back to line ${nextLine}`]
            }
        })
    }

    const resume = () => {
        setDebugState(prev => ({
            ...prev,
            isPaused: false,
            logs: [...prev.logs, "Resumed execution..."]
        }))

        setTimeout(() => {
            setDebugState(prev => ({
                ...prev,
                isRunning: false,
                isPaused: false,
                currentLine: null,
                logs: [...prev.logs, "Execution completed"]
            }))
        }, 2000)
    }

    const stopDebug = () => {
        setDebugState(prev => ({
            ...prev,
            isRunning: false,
            isPaused: false,
            currentLine: null,
            logs: [...prev.logs, "Debug session terminated"]
        }))
    }

    const resetDebug = () => {
        setDebugState(prev => ({
            ...prev,
            isRunning: false,
            isPaused: false,
            currentLine: null,
            logs: [],
            variables: [
                { name: "nums", value: "[2, 7, 11, 15]", type: "number[]", expanded: true, children: [
                    { name: "[0]", value: "2", type: "number" },
                    { name: "[1]", value: "7", type: "number" },
                    { name: "[2]", value: "11", type: "number" },
                    { name: "[3]", value: "15", type: "number" }
                ]},
                { name: "target", value: "9", type: "number" },
                { name: "map", value: "Map(2)", type: "Map", expanded: false },
                { name: "result", value: "undefined", type: "number[]" }
            ]
        }))
    }

    const getLineNumbers = () => {
        return code.split("\n").map((_, i) => i + 1)
    }

    const getTypeIcon = (type: string) => {
        if (type.includes("[]")) return <List className="w-3 h-3" />
        if (type.includes("Map")) return <MapPin className="w-3 h-3" />
        return <Variable className="w-3 h-3" />
    }

    if (!isOpen) return null

    return (
        <div className="w-[320px] border-l border-[#1f1f1f] bg-[#0c0c0c] flex flex-col h-full shrink-0">
            <div className="h-12 border-b border-[#1f1f1f] flex items-center justify-between px-4 bg-[#1a1a1a] shrink-0">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                    <Bug className="w-4 h-4 text-orange-400" />
                    Debug
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="p-3 border-b border-[#1f1f1f] bg-[#1a1a1a] shrink-0">
                <div className="flex items-center gap-2">
                    {!debugState.isRunning && !debugState.isPaused ? (
                        <button
                            onClick={startDebug}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-xs font-medium transition-colors"
                        >
                            <Play className="w-3.5 h-3.5" />
                            Start
                        </button>
                    ) : debugState.isPaused ? (
                        <button
                            onClick={resume}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-xs font-medium transition-colors"
                        >
                            <Play className="w-3.5 h-3.5" />
                            Resume
                        </button>
                    ) : null}

                    {debugState.isPaused && (
                        <>
                            <button
                                onClick={stepBack}
                                className="p-1.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-400 hover:text-white rounded transition-colors"
                                title="Step Back"
                            >
                                <StepBack className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={stepForward}
                                className="p-1.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-400 hover:text-white rounded transition-colors"
                                title="Step Forward"
                            >
                                <StepForward className="w-3.5 h-3.5" />
                            </button>
                        </>
                    )}

                    {(debugState.isRunning || debugState.isPaused) && (
                        <button
                            onClick={stopDebug}
                            className="p-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-colors"
                            title="Stop"
                        >
                            <Pause className="w-3.5 h-3.5" />
                        </button>
                    )}

                    <button
                        onClick={resetDebug}
                        className="p-1.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-400 hover:text-white rounded transition-colors"
                        title="Reset"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
                <div className="p-3 space-y-3">
                    {debugState.isRunning && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-xs text-yellow-400">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            {debugState.isPaused ? `Paused at line ${debugState.currentLine}` : "Running..."}
                        </div>
                    )}

                    <div className="space-y-2">
                        <button
                            onClick={() => toggleSection("breakpoints")}
                            className="w-full flex items-center justify-between p-2 bg-[#1a1a1a] rounded hover:bg-[#252525] transition-colors"
                        >
                            <div className="flex items-center gap-2 text-xs text-white font-medium">
                                <Circle className="w-3 h-3 text-red-400" fill="currentColor" />
                                Breakpoints
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500 bg-[#0c0c0c] px-1.5 py-0.5 rounded">
                                    {debugState.breakpoints.length}
                                </span>
                                {expandedSections.breakpoints ? (
                                    <ChevronDown className="w-3 h-3 text-gray-500" />
                                ) : (
                                    <ChevronRight className="w-3 h-3 text-gray-500" />
                                )}
                            </div>
                        </button>

                        {expandedSections.breakpoints && (
                            <div className="space-y-1 pl-2">
                                {debugState.breakpoints.length === 0 ? (
                                    <div className="text-xs text-gray-500 p-2">
                                        Click line numbers in editor to add breakpoints
                                    </div>
                                ) : (
                                    debugState.breakpoints.map(bp => (
                                        <div
                                            key={bp.id}
                                            className={`flex items-center justify-between p-2 rounded text-xs ${
                                                bp.enabled 
                                                    ? "bg-red-500/10 border border-red-500/30" 
                                                    : "bg-gray-800/50 border border-gray-700"
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleBreakpoint(bp.id)}
                                                    className={`${bp.enabled ? "text-red-400" : "text-gray-500"}`}
                                                >
                                                    <Circle className="w-3 h-3" fill="currentColor" />
                                                </button>
                                                <span className={bp.enabled ? "text-gray-300" : "text-gray-500"}>
                                                    Line {bp.line}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => removeBreakpoint(bp.id)}
                                                className="text-gray-500 hover:text-red-400"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => toggleSection("variables")}
                            className="w-full flex items-center justify-between p-2 bg-[#1a1a1a] rounded hover:bg-[#252525] transition-colors"
                        >
                            <div className="flex items-center gap-2 text-xs text-white font-medium">
                                <Variable className="w-3 h-3 text-blue-400" />
                                Variables
                            </div>
                            {expandedSections.variables ? (
                                <ChevronDown className="w-3 h-3 text-gray-500" />
                            ) : (
                                <ChevronRight className="w-3 h-3 text-gray-500" />
                            )}
                        </button>

                        {expandedSections.variables && (
                            <div className="space-y-1 pl-2">
                                {debugState.variables.map((v, idx) => (
                                    <div key={idx} className="text-xs">
                                        <div 
                                            className="flex items-center gap-2 p-1.5 hover:bg-[#2a2a2a] rounded cursor-pointer"
                                            onClick={() => v.children && toggleVariable(v.name)}
                                        >
                                            {v.children && (
                                                expandedVars.has(v.name) ? (
                                                    <ChevronDown className="w-3 h-3 text-gray-500" />
                                                ) : (
                                                    <ChevronRight className="w-3 h-3 text-gray-500" />
                                                )
                                            )}
                                            <span className="text-purple-400">{v.name}</span>
                                            <span className="text-gray-500">:</span>
                                            <span className="text-gray-300">{v.value}</span>
                                            <span className="text-gray-600 ml-auto">{v.type}</span>
                                        </div>
                                        {v.children && expandedVars.has(v.name) && (
                                            <div className="pl-6 space-y-0.5">
                                                {v.children.map((child, cIdx) => (
                                                    <div key={cIdx} className="flex items-center gap-2 p-1 text-gray-400">
                                                        <span className="text-blue-400">{child.name}</span>
                                                        <span className="text-gray-600">=</span>
                                                        <span className="text-green-400">{child.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => toggleSection("watch")}
                            className="w-full flex items-center justify-between p-2 bg-[#1a1a1a] rounded hover:bg-[#252525] transition-colors"
                        >
                            <div className="flex items-center gap-2 text-xs text-white font-medium">
                                <Eye className="w-3 h-3 text-yellow-400" />
                                Watch
                            </div>
                            {expandedSections.watch ? (
                                <ChevronDown className="w-3 h-3 text-gray-500" />
                            ) : (
                                <ChevronRight className="w-3 h-3 text-gray-500" />
                            )}
                        </button>

                        {expandedSections.watch && (
                            <div className="space-y-1 pl-2">
                                {debugState.watchExpressions.map((expr, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between p-1.5 bg-[#2a2a2a] rounded text-xs"
                                    >
                                        <span className="text-yellow-400 font-mono">{expr}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-400">-</span>
                                            <button
                                                onClick={() => removeWatchExpression(expr)}
                                                className="text-gray-500 hover:text-red-400"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex items-center gap-1">
                                    <input
                                        type="text"
                                        value={newWatch}
                                        onChange={(e) => setNewWatch(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && addWatchExpression()}
                                        placeholder="Add expression..."
                                        className="flex-1 bg-[#2a2a2a] border border-[#333] rounded px-2 py-1 text-xs text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-yellow-500"
                                    />
                                    <button
                                        onClick={addWatchExpression}
                                        className="p-1.5 bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 rounded"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => toggleSection("callStack")}
                            className="w-full flex items-center justify-between p-2 bg-[#1a1a1a] rounded hover:bg-[#252525] transition-colors"
                        >
                            <div className="flex items-center gap-2 text-xs text-white font-medium">
                                <Box className="w-3 h-3 text-green-400" />
                                Call Stack
                            </div>
                            {expandedSections.callStack ? (
                                <ChevronDown className="w-3 h-3 text-gray-500" />
                            ) : (
                                <ChevronRight className="w-3 h-3 text-gray-500" />
                            )}
                        </button>

                        {expandedSections.callStack && (
                            <div className="space-y-1 pl-2">
                                {debugState.callStack.map((frame, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-2 rounded text-xs ${
                                            idx === 0 ? "bg-green-500/10 border border-green-500/30" : "bg-[#2a2a2a]"
                                        }`}
                                    >
                                        <div className="text-gray-300 font-medium">{frame.name}</div>
                                        <div className="text-gray-500">
                                            {frame.file}:{frame.line}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => toggleSection("console")}
                            className="w-full flex items-center justify-between p-2 bg-[#1a1a1a] rounded hover:bg-[#252525] transition-colors"
                        >
                            <div className="flex items-center gap-2 text-xs text-white font-medium">
                                <AlertCircle className="w-3 h-3 text-gray-400" />
                                Console
                            </div>
                            {expandedSections.console ? (
                                <ChevronDown className="w-3 h-3 text-gray-500" />
                            ) : (
                                <ChevronRight className="w-3 h-3 text-gray-500" />
                            )}
                        </button>

                        {expandedSections.console && (
                            <div className="space-y-1 pl-2 max-h-32 overflow-y-auto">
                                {debugState.logs.length === 0 ? (
                                    <div className="text-xs text-gray-500 p-2">No console output</div>
                                ) : (
                                    debugState.logs.map((log, idx) => (
                                        <div key={idx} className="text-xs text-gray-400 p-1 border-b border-[#333]">
                                            {log}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DebugToggle({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-xs font-medium
                ${isOpen
                    ? "bg-orange-500/20 border-orange-500/50 text-orange-400"
                    : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:text-white"
                }`}
        >
            <Bug className="w-3.5 h-3.5" />
            Debug
        </button>
    )
}
