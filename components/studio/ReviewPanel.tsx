"use client"

import { useState, useRef, useEffect } from "react"
import {
    SearchCode,
    Loader2,
    ChevronDown,
    ChevronRight,
    AlertTriangle,
    CheckCircle,
    Info,
    X,
    RefreshCw,
    Sparkles
} from "lucide-react"

interface ReviewIssue {
    line: number
    severity: "error" | "warning" | "info" | "suggestion"
    message: string
    suggestion?: string
}

interface ReviewResult {
    score: number
    issues: ReviewIssue[]
    summary: string
    strengths: string[]
    improvements: string[]
}

interface ReviewPanelProps {
    code: string
    language: string
    isOpen: boolean
    onClose: () => void
}

export function ReviewPanel({ code, language, isOpen, onClose }: ReviewPanelProps) {
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [reviewResult, setReviewResult] = useState<ReviewResult | null>(null)
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        issues: true,
        strengths: true,
        improvements: true
    })

    const analyzeCode = async () => {
        setIsAnalyzing(true)
        setReviewResult(null)

        try {
            let aiSettings = undefined;
            const stored = localStorage.getItem("codeboard_ai_settings");
            if (stored) {
                try { aiSettings = JSON.parse(stored); } catch (e) {}
            }

            const response = await fetch("/api/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, language, aiSettings })
            })

            if (response.ok) {
                const data = await response.json()
                setReviewResult(data)
            } else {
                setReviewResult({
                    score: 0,
                    summary: "The AI Code Review service returned an error. Please check your API keys.",
                    issues: [{ line: 0, severity: "error", message: "Review Failed" }],
                    strengths: [],
                    improvements: []
                })
            }
        } catch (error) {
            setReviewResult({
                score: 0,
                summary: "Failed to connect to the AI Review service. Please try again.",
                issues: [{ line: 0, severity: "error", message: "Network or Server Error" }],
                strengths: [],
                improvements: []
            })
        } finally {
            setIsAnalyzing(false)
        }
    }

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case "error":
                return <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            case "warning":
                return <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
            case "info":
                return <Info className="w-3.5 h-3.5 text-blue-400" />
            case "suggestion":
                return <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            default:
                return <Info className="w-3.5 h-3.5 text-gray-400" />
        }
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "error":
                return "bg-red-500/10 border-red-500/30 text-red-400"
            case "warning":
                return "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
            case "info":
                return "bg-blue-500/10 border-blue-500/30 text-blue-400"
            case "suggestion":
                return "bg-purple-500/10 border-purple-500/30 text-purple-400"
            default:
                return "bg-gray-500/10 border-gray-500/30 text-gray-400"
        }
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-400"
        if (score >= 60) return "text-yellow-400"
        if (score >= 40) return "text-orange-400"
        return "text-red-400"
    }

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    if (!isOpen) return null

    return (
        <div className="w-[380px] border-l border-[#1f1f1f] bg-[#0c0c0c] flex flex-col h-full shrink-0">
            <div className="h-12 border-b border-[#1f1f1f] flex items-center justify-between px-4 bg-[#1a1a1a] shrink-0">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                    <SearchCode className="w-4 h-4 text-purple-400" />
                    Code Review
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="p-4 border-b border-[#1f1f1f]">
                <button
                    onClick={analyzeCode}
                    disabled={isAnalyzing || !code?.trim()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white rounded-lg font-medium text-sm transition-all"
                >
                    {isAnalyzing ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <SearchCode className="w-4 h-4" />
                            Analyze Code
                        </>
                    )}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
                {reviewResult && (
                    <>
                        <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-[#333]">
                            <div className="text-sm text-gray-400">Overall Score</div>
                            <div className={`text-2xl font-bold ${getScoreColor(reviewResult.score)}`}>
                                {reviewResult.score}/100
                            </div>
                        </div>

                        <p className="text-sm text-gray-400">{reviewResult.summary}</p>

                        <div className="space-y-2">
                            <button
                                onClick={() => toggleSection("issues")}
                                className="w-full flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#333] hover:border-[#444] transition-colors"
                            >
                                <div className="flex items-center gap-2 text-sm text-white font-medium">
                                    {getSeverityIcon("error")}
                                    Issues Found
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 bg-[#0c0c0c] px-2 py-0.5 rounded">
                                        {reviewResult.issues.length}
                                    </span>
                                    {expandedSections.issues ? (
                                        <ChevronDown className="w-4 h-4 text-gray-500" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-500" />
                                    )}
                                </div>
                            </button>

                            {expandedSections.issues && reviewResult.issues.length > 0 && (
                                <div className="space-y-2 pl-2">
                                    {reviewResult.issues.map((issue, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-3 rounded-lg border text-xs ${getSeverityColor(issue.severity)}`}
                                        >
                                            <div className="flex items-start gap-2">
                                                {getSeverityIcon(issue.severity)}
                                                <div className="flex-1">
                                                    <div className="font-medium mb-1">
                                                        Line {issue.line}: {issue.message}
                                                    </div>
                                                    {issue.suggestion && (
                                                        <div className="opacity-70 mt-1">
                                                            💡 {issue.suggestion}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {expandedSections.issues && reviewResult.issues.length === 0 && (
                                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                                    <div className="flex items-center gap-2 text-green-400 text-sm">
                                        <CheckCircle className="w-4 h-4" />
                                        No issues found!
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={() => toggleSection("strengths")}
                                className="w-full flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#333] hover:border-[#444] transition-colors"
                            >
                                <div className="flex items-center gap-2 text-sm text-white font-medium">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    Strengths
                                </div>
                                {expandedSections.strengths ? (
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-500" />
                                )}
                            </button>

                            {expandedSections.strengths && reviewResult.strengths.length > 0 && (
                                <div className="space-y-2 pl-2">
                                    {reviewResult.strengths.map((strength, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-sm text-green-300"
                                        >
                                            ✓ {strength}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={() => toggleSection("improvements")}
                                className="w-full flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#333] hover:border-[#444] transition-colors"
                            >
                                <div className="flex items-center gap-2 text-sm text-white font-medium">
                                    <RefreshCw className="w-4 h-4 text-yellow-400" />
                                    Improvements
                                </div>
                                {expandedSections.improvements ? (
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-500" />
                                )}
                            </button>

                            {expandedSections.improvements && reviewResult.improvements.length > 0 && (
                                <div className="space-y-2 pl-2">
                                    {reviewResult.improvements.map((improvement, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-sm text-yellow-300"
                                        >
                                            → {improvement}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {!reviewResult && !isAnalyzing && (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <SearchCode className="w-12 h-12 mb-4 opacity-30" />
                        <p className="text-sm text-center">
                            Click "Analyze Code" to review your solution
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
