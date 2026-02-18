"use client"

import { Editor, loader, OnMount } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { Loader2 } from "lucide-react"
import { useRef } from "react"
import * as monaco from "monaco-editor"

// Ensure Monaco loads from a reliable CDN to avoid initialization errors in Next.js
// Monaco loader config removed to use default CDN


interface CodeEditorProps {
    language: string
    value: string
    onChange: (value: string | undefined) => void
    height?: string
    onValidation?: (markers: monaco.editor.IMarker[]) => void
}

export function CodeEditor({ language, value, onChange, height = "60vh", onValidation }: CodeEditorProps) {
    const { theme } = useTheme()
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

    const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
        editorRef.current = editor

        // Configure TypeScript/JavaScript diagnostics
        monacoInstance.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false,
        })
        monacoInstance.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false,
        })

        // Listen for marker changes (errors/warnings)
        const model = editor.getModel()
        if (model) {
            monacoInstance.editor.onDidChangeMarkers(() => {
                const markers = monacoInstance.editor.getModelMarkers({ resource: model.uri })
                if (onValidation) {
                    onValidation(markers)
                }
            })
        }
    }

    return (
        <div className="border border-[#333] rounded-lg overflow-hidden bg-[#1e1e1e] shadow-inner">
            <Editor
                height={height}
                language={language.toLowerCase()}
                value={value}
                theme="vs-dark"
                onChange={onChange}
                onMount={handleEditorDidMount}
                loading={<div className="flex h-full items-center justify-center bg-[#1e1e1e]">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                </div>}
                options={{
                    minimap: { enabled: false }, // Cleaner look
                    fontSize: 14,
                    fontFamily: "'Geist Mono', 'Fira Code', monospace",
                    fontLigatures: true,
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                    padding: { top: 16, bottom: 16 },
                    renderLineHighlight: "all",
                    automaticLayout: true,
                    bracketPairColorization: { enabled: true },
                    guides: { indentation: true },
                }}
            />
        </div>
    )
}
