"use client"

import { useState } from "react"
import { CodeEditor } from "@/components/studio/CodeEditor"
import { Play, Send } from "lucide-react"

export function StudioClient({ problem }: { problem: any }) {
    const [code, setCode] = useState("// Write your solution here\n")
    const [language, setLanguage] = useState("javascript")

    return (
        <div className="flex flex-col h-full">
            <div className="h-12 border-b border-[var(--border)] flex items-center px-4 justify-between bg-[var(--surface-hover)]">
                <div className="flex items-center gap-2">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-transparent text-sm font-medium focus:outline-none text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all">
                        <Play className="w-4 h-4" />
                        Run
                    </button>
                    <button className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-all shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                        <Send className="w-4 h-4" />
                        Submit
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-[#1e1e1e]">
                <CodeEditor
                    language={language}
                    value={code}
                    onChange={(val) => setCode(val || "")}
                    height="100%"
                />
            </div>
        </div>
    )
}
