"use client"

import { Editor } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { Loader2 } from "lucide-react"

interface CodeEditorProps {
    language: string
    value: string
    onChange: (value: string | undefined) => void
    height?: string
}

export function CodeEditor({ language, value, onChange, height = "60vh" }: CodeEditorProps) {
    const { theme } = useTheme()

    return (
        <div className="border border-[var(--border)] rounded-lg overflow-hidden bg-[#1e1e1e]">
            <Editor
                height={height}
                language={language.toLowerCase()}
                value={value}
                theme="vs-dark" // We force dark theme for editor for now to match UI
                onChange={onChange}
                loading={<Loader2 className="w-6 h-6 animate-spin text-[var(--primary)]" />}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "Geist Mono, monospace",
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                    padding: { top: 16, bottom: 16 },
                }}
            />
        </div>
    )
}
