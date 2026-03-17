"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import {
    Terminal as TerminalIcon,
    ChevronDown,
    ChevronUp,
    Trash2,
    Copy,
    Check,
    X,
    Loader2,
    Play,
    Square,
    RefreshCw,
    Settings,
    Maximize2,
    Minimize2
} from "lucide-react"

interface TerminalProps {
    isOpen: boolean
    onToggle: () => void
    height?: number
}

interface TerminalLine {
    id: string
    type: "input" | "output" | "error" | "system" | "success"
    content: string
    timestamp: Date
}

const COMMANDS: Record<string, (args: string[]) => string> = {
    help: () => `Available commands:
  help              - Show this help message
  clear             - Clear terminal
  echo [text]       - Print text to terminal
  date              - Show current date and time
  whoami            - Show current user
  pwd               - Print working directory
  ls                - List files in current directory
  cat [file]        - Display file contents
  run               - Run current code
  submit            - Submit current solution
  status            - Show execution status
  env               - Show environment info
  version           - Show CodeBoard version`,
    
    clear: () => {
        return "__CLEAR__"
    },
    
    echo: (args) => args.join(" "),
    
    date: () => new Date().toString(),
    
    whoami: () => "codeboard-user",
    
    pwd: () => "/workspace/project",
    
    ls: () => `README.md
solution.js
test_cases.txt
input.txt
output.txt
debug.log
config.json`,
    
    cat: (args) => {
        if (args.length === 0) return "cat: missing file operand"
        const file = args[0]
        switch (file) {
            case "README.md":
                return "# CodeBoard Studio\n\nInteractive coding environment"
            case "solution.js":
                return "// Your solution code here"
            case "test_cases.txt":
                return "Test case 1: input=[] expected=[]\nTest case 2: input=[] expected=[]"
            default:
                return `cat: ${file}: No such file or directory`
        }
    },
    
    run: () => {
        return "__RUN__"
    },
    
    submit: () => {
        return "__SUBMIT__"
    },
    
    status: () => `Process Status:
  CPU: 12%
  Memory: 256MB / 512MB
  Uptime: 2h 34m
  Status: Idle`,
    
    env: () => `Environment:
  NODE_VERSION: v18.17.0
  PLATFORM: codeboard-studio
  RUNTIME: browser
  LANG: en_US.UTF-8`,
    
    version: () => `CodeBoard Studio v2.0.0
Monaco Editor v0.45.0
Node.js v18.17.0 (simulated)
Build: 2026.03.17`
}

export function Terminal({ isOpen, onToggle, height = 280 }: TerminalProps) {
    const [lines, setLines] = useState<TerminalLine[]>([
        {
            id: "welcome",
            type: "system",
            content: "Welcome to CodeBoard Terminal v2.0.0",
            timestamp: new Date()
        },
        {
            id: "hint",
            type: "system",
            content: "Type 'help' for available commands or 'clear' to clean the terminal.",
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState("")
    const [isRunning, setIsRunning] = useState(false)
    const [isMaximized, setIsMaximized] = useState(false)
    const [copied, setCopied] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen && terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [lines, isOpen])

    const addLine = (type: TerminalLine["type"], content: string) => {
        setLines(prev => [...prev, {
            id: Date.now().toString() + Math.random(),
            type,
            content,
            timestamp: new Date()
        }])
    }

    const executeCommand = (cmd: string) => {
        const trimmed = cmd.trim()
        if (!trimmed) return

        addLine("input", `$ ${trimmed}`)

        const parts = trimmed.split(/\s+/)
        const command = parts[0].toLowerCase()
        const args = parts.slice(1)

        const commandFn = COMMANDS[command]
        
        if (commandFn) {
            const result = commandFn(args)
            
            if (result === "__CLEAR__") {
                setLines([])
            } else if (result === "__RUN__") {
                setIsRunning(true)
                addLine("system", "⏳ Starting code execution...")
                setTimeout(() => {
                    setIsRunning(false)
                    addLine("success", "✅ Code executed successfully!")
                    addLine("output", "[2, 7, 11, 15]")
                }, 1500)
            } else if (result === "__SUBMIT__") {
                setIsRunning(true)
                addLine("system", "⏳ Submitting solution...")
                setTimeout(() => {
                    setIsRunning(false)
                    addLine("success", "✅ All test cases passed!")
                }, 2000)
            } else {
                addLine("output", result)
            }
        } else {
            addLine("error", `Command not found: ${command}. Type 'help' for available commands.`)
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            executeCommand(input)
            setInput("")
        }
    }

    const clearTerminal = () => {
        setLines([])
    }

    const copyTerminal = async () => {
        const text = lines.map(l => l.content).join("\n")
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const getLineColor = (type: TerminalLine["type"]) => {
        switch (type) {
            case "input":
                return "text-green-400"
            case "output":
                return "text-gray-300"
            case "error":
                return "text-red-400"
            case "system":
                return "text-yellow-400"
            case "success":
                return "text-green-400"
            default:
                return "text-gray-300"
        }
    }

    const currentHeight = isMaximized ? window.innerHeight * 0.7 : height

    if (!isOpen) return null

    return (
        <div 
            className="border-t border-[#1f1f1f] bg-[#0c0c0c] flex flex-col"
            style={{ height: currentHeight }}
        >
            <div className="flex items-center justify-between px-4 h-9 border-b border-[#1f1f1f] bg-[#1a1a1a] shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-white font-medium">
                        <TerminalIcon className="w-4 h-4 text-green-400" />
                        Terminal
                    </div>
                    {isRunning && (
                        <div className="flex items-center gap-1.5 text-xs text-yellow-400">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Running...
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={clearTerminal}
                        className="p-1.5 text-gray-500 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
                        title="Clear"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={copyTerminal}
                        className="p-1.5 text-gray-500 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
                        title="Copy"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                        onClick={() => setIsMaximized(!isMaximized)}
                        className="p-1.5 text-gray-500 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
                        title={isMaximized ? "Minimize" : "Maximize"}
                    >
                        {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
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

            <div 
                ref={terminalRef}
                className="flex-1 p-3 font-mono text-xs overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
            >
                <div className="space-y-0.5">
                    {lines.map((line) => (
                        <div key={line.id} className={`whitespace-pre-wrap break-all ${getLineColor(line.type)}`}>
                            {line.content}
                        </div>
                    ))}
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-green-400">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isRunning}
                        className="flex-1 bg-transparent border-none outline-none text-gray-300 font-mono text-xs placeholder:text-gray-600"
                        placeholder="Type a command..."
                        autoFocus
                    />
                </div>
            </div>
        </div>
    )
}

export function TerminalToggle({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-xs font-medium
                ${isOpen
                    ? "bg-green-500/20 border-green-500/50 text-green-400"
                    : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:text-white"
                }`}
        >
            <TerminalIcon className="w-3.5 h-3.5" />
            Terminal
        </button>
    )
}
