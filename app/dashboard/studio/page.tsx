"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
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
    Loader2,
    Menu,
    AlertTriangle,
    ExternalLink,
    SearchCode,
    Settings2
} from "lucide-react"
import { AIChat } from "@/components/studio/AIChat"
import { ReviewPanel } from "@/components/studio/ReviewPanel"
import { Terminal as StudioTerminal, TerminalToggle } from "@/components/studio/Terminal"
import { DebugPanel, DebugToggle } from "@/components/studio/DebugPanel"
import { OutputPanel, OutputToggle } from "@/components/studio/OutputPanel"
import { AISettingsModal } from "@/components/studio/AISettingsModal"
import { awardProblemSolvedCoins } from "@/lib/rewards-actions"

// Dynamically import CodeEditor to avoid SSR issues (window is not defined)
const CodeEditor = dynamic(
    () => import("@/components/studio/CodeEditor").then((mod) => mod.CodeEditor),
    { ssr: false, loading: () => <div className="h-full bg-[#1e1e1e] animate-pulse" /> }
)

/* ─── Constants ────────────────────────────────────── */

const LANGUAGES = [
    { id: "cpp", name: "C++", defaultCode: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n        return {};\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> nums = {2, 7, 11, 15};\n    auto result = sol.twoSum(nums, 9);\n    cout << "[" << result[0] << "," << result[1] << "]" << endl;\n    return 0;\n}` },
    { id: "python", name: "Python", defaultCode: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Your code here\n        seen = {}\n        for i, num in enumerate(nums):\n            comp = target - num\n            if comp in seen:\n                return [seen[comp], i]\n            seen[num] = i\n        return []\n\nif __name__ == "__main__":\n    sol = Solution()\n    print(sol.twoSum([2, 7, 11, 15], 9))` },
    { id: "javascript", name: "JavaScript", defaultCode: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const comp = target - nums[i];\n        if (map.has(comp)) return [map.get(comp), i];\n        map.set(nums[i], i);\n    }\n};\n\nconsole.log(twoSum([2, 7, 11, 15], 9));` },
    { id: "java", name: "Java", defaultCode: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) {\n                return new int[]{map.get(comp), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}` },
]

const DIFF_COLORS: Record<string, string> = {
    Easy: "#22c55e", easy: "#22c55e",
    Medium: "#eab308", medium: "#eab308",
    Hard: "#ef4444", hard: "#ef4444"
}

/* ─── Inner Component ──────────────────────────────── */

function StudioContent() {
    const searchParams = useSearchParams()
    const urlProblemId = searchParams.get("problemId")
    const titleParam = searchParams.get("title")
    const linkParam = searchParams.get("link")
    const diffParam = searchParams.get("difficulty")
    const [showAI, setShowAI] = useState(false)
    const [showReview, setShowReview] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [terminalOpen, setTerminalOpen] = useState(false)
    const [debugOpen, setDebugOpen] = useState(false)
    const [outputOpen, setOutputOpen] = useState(true)
    const [showProblemPanel, setShowProblemPanel] = useState(true)

    const [language, setLanguage] = useState(LANGUAGES[0])
    const [code, setCode] = useState(LANGUAGES[0].defaultCode)
    const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null)
    const [isRunning, setIsRunning] = useState(false)
    const [output, setOutput] = useState<string[]>(["Welcome to CodeBoard Engine v2.0", "Ready to compile...", "Use Terminal for command-line interaction or click Output for results."])
    const [activeTab, setActiveTab] = useState<"console" | "testcases" | "results" | "review">("console")
    const [errorCount, setErrorCount] = useState(0)

    const [problemsList, setProblemsList] = useState<any[]>([])
    const [currentProblem, setCurrentProblem] = useState<any>(null)
    const [isLoadingProblem, setIsLoadingProblem] = useState(true)
    const [apiError, setApiError] = useState(false)

    // Default fallback problem when API fails
    const DEFAULT_PROBLEM = {
        id: "default",
        title: titleParam || "Two Sum",
        difficulty: diffParam || "Easy",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        test_cases: [
            { input: "nums = [2,7,11,15], target = 9", expected_output: "[0,1]" },
            { input: "nums = [3,2,4], target = 6", expected_output: "[1,2]" }
        ]
    }

    // 1. Fetch Problem List on mount
    useEffect(() => {
        fetch('/api/problems')
            .then(res => {
                if (!res.ok) throw new Error(`API returned ${res.status}`)
                return res.json()
            })
            .then(data => {
                if (data.problems && data.problems.length > 0) {
                    setProblemsList(data.problems)
                    // Set initial ID if not coming from URL
                    if (!urlProblemId) {
                        setSelectedProblemId(data.problems[0].id)
                    } else {
                        setSelectedProblemId(urlProblemId)
                    }
                } else if (titleParam) {
                    // Fallback to custom if no problems in DB but URL has title
                    setSelectedProblemId("custom")
                } else {
                    // No problems returned, use default
                    setApiError(true)
                    setCurrentProblem(DEFAULT_PROBLEM)
                    setIsLoadingProblem(false)
                }
            })
            .catch(err => {
                console.error("Failed to load problems list", err)
                setApiError(true)
                if (titleParam) {
                    setSelectedProblemId("custom")
                } else {
                    // Fallback to default problem so the IDE is usable
                    setCurrentProblem(DEFAULT_PROBLEM)
                    setIsLoadingProblem(false)
                }
            })
    }, [urlProblemId, titleParam])

    // 2. Fetch specific problem details when selectedProblemId changes
    useEffect(() => {
        if (!selectedProblemId) return;

        if (selectedProblemId === "custom") {
            setCurrentProblem({
                id: "custom",
                title: titleParam || "Custom Problem",
                difficulty: diffParam || "Medium",
                description: `This problem is not yet fully supported in the local database.\n\nYou can view the full description on LeetCode and solve it here.\n\n[View Problem on LeetCode](${linkParam || "#"})`,
                test_cases: [{ input: "// Custom input here", expected_output: "// Custom output here" }]
            })
            setIsLoadingProblem(false)
            return;
        }

        setIsLoadingProblem(true)
        fetch(`/api/problems?id=${selectedProblemId}`)
            .then(res => res.json())
            .then(data => {
                if (data.problem) {
                    setCurrentProblem(data.problem)
                    // Set starter code if available for current language
                    if (data.problem.starter_code && data.problem.starter_code[language.name.toLowerCase()]) {
                        setCode(data.problem.starter_code[language.name.toLowerCase()])
                    } else if (data.problem.starter_code && data.problem.starter_code[language.id]) {
                        setCode(data.problem.starter_code[language.id])
                    }
                }
            })
            .finally(() => {
                setIsLoadingProblem(false)
            })
    }, [selectedProblemId, language, titleParam, linkParam, diffParam])

    const isCustom = currentProblem?.id === "custom"

    /* ─── Handlers */
    const executeCode = async (isSubmit: boolean) => {
        setIsRunning(true)
        setOutput(["⏳ Compiling...", isSubmit ? "Running all test cases..." : "Running sample test case..."])
        setTerminalOpen(true)
        setActiveTab("console")

        try {
            const bodyPayload: any = {
                code,
                language: language.id,
            }

            // Normal 'Run' uses first public test case input as standard stdin
            // 'Submit' passes the problemId to run against ALL test cases on the server
            if (isSubmit && !isCustom) {
                bodyPayload.problemId = currentProblem.id
            } else {
                bodyPayload.stdin = currentProblem?.test_cases?.[0]?.input || ""
            }

            const response = await fetch("/api/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyPayload)
            })

            const result = await response.json()

            if (result.error) {
                setOutput([`❌ Error: ${result.error}`])
            } else {
                let status = result.status?.description || result.verdict || "Completed"
                const mem = result.memory ? `> Memory: ${result.memory}KB` : ""
                const time = result.time ? `> Runtime: ${result.time}s` : ""

                const newOutput = [`> Status: ${status}`]
                if (time) newOutput.push(time)
                if (mem) newOutput.push(mem)
                newOutput.push("")

                if (result.compile_output) {
                    newOutput.push(`Compile Output:\n${atob(result.compile_output)}`)
                }

                if (isSubmit && result.is_final) {
                    // It's a full submission response
                    if (status === "Accepted") {
                        newOutput.push("", `✅ All ${result.total_test_cases} test cases passed!`)
                        try {
                            const coins = await awardProblemSolvedCoins(currentProblem.difficulty || 'Medium');
                            if (coins > 0) newOutput.push(`💎 Earned +${coins} CodeCoins!`);
                        } catch (err) {
                            console.error("Failed to award coins:", err)
                        }
                    } else {
                        newOutput.push("", `❌ Failed on hidden test case ${result.total_passed + 1}/${result.total_test_cases}`)
                        if (result.failed_test_case) {
                            newOutput.push(
                                `\nInput:\n${result.failed_test_case.input}`,
                                `Expected Output:\n${result.failed_test_case.expected_output}`,
                                result.stdout ? `Your Output:\n${result.stdout}` : ""
                            )
                        }
                    }
                } else {
                    // Singular run
                    if (result.stdout) newOutput.push(`Standard Output:\n${result.stdout}`)
                    if (result.stderr) newOutput.push(`Standard Error:\n${result.stderr}`)
                }

                setOutput(newOutput.filter(Boolean))
            }
        } catch (error) {
            setOutput(["❌ Failed to connect to execution engine"])
        } finally {
            setIsRunning(false)
        }
    }

    const handleRun = () => executeCode(false)
    const handleSubmit = () => executeCode(true)

    const handleErrorCountChange = (count: number) => {
        setErrorCount(count)
    }

    if (isLoadingProblem || !currentProblem) {
        return <div className="h-full flex items-center justify-center bg-black text-white"><Loader2 className="w-8 h-8 animate-spin" /></div>
    }

    return (
        <div className="h-full flex flex-col bg-[#000] text-gray-300 overflow-hidden">
            {/* Top Bar */}
            <div className="h-12 md:h-14 border-b border-[#1f1f1f] bg-[#0c0c0c] flex items-center justify-between px-3 md:px-4 shrink-0 gap-2 overflow-x-auto">
                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <button
                        onClick={() => setShowProblemPanel(!showProblemPanel)}
                        className="md:hidden p-1.5 text-gray-500 hover:text-white"
                    >
                        <Menu className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 text-white font-semibold text-sm">
                        <Terminal className="w-4 h-4 text-blue-500" />
                        <span className="hidden sm:inline">Studio</span>
                    </div>
                    <div className="h-5 w-px bg-[#1f1f1f] hidden sm:block" />

                    {isCustom ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-[#333] rounded-lg text-sm text-gray-300">
                            <span className="truncate max-w-[200px]">{currentProblem.title}</span>
                            <span className="text-xs text-blue-400 border border-blue-500/30 px-1.5 rounded bg-blue-500/10">Free Mode</span>
                        </div>
                    ) : (
                        <select
                            value={selectedProblemId || ""}
                            onChange={(e) => setSelectedProblemId(e.target.value)}
                            className="bg-[#1a1a1a] border border-[#333] rounded-lg px-2 md:px-3 py-1.5 text-xs md:text-sm focus:outline-none focus:border-blue-500 min-w-[140px] md:min-w-[200px]"
                        >
                            {problemsList.map(p => (
                                <option key={p.id} value={p.id}>{p.title} ({p.difficulty || "Medium"})</option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                    {/* Error Indicator */}
                    {errorCount > 0 ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs font-medium animate-in fade-in">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>{errorCount} Error{errorCount > 1 ? 's' : ''}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-xs font-medium animate-in fade-in">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">No Errors</span>
                        </div>
                    )}

                    <button
                        onClick={() => setShowReview(!showReview)}
                        className={`flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg border transition-all text-xs md:text-sm font-medium
                            ${showReview
                                ? "bg-purple-500/20 border-purple-500/50 text-purple-400"
                                : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:text-white"
                            }`}
                    >
                        <SearchCode className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Review</span>
                    </button>

                    <TerminalToggle isOpen={terminalOpen} onToggle={() => setTerminalOpen(!terminalOpen)} />

                    <DebugToggle isOpen={debugOpen} onToggle={() => setDebugOpen(!debugOpen)} />

                    <OutputToggle isOpen={outputOpen} onToggle={() => setOutputOpen(!outputOpen)} isRunning={isRunning} errorCount={errorCount} />

                    <button
                        onClick={() => setShowAI(!showAI)}
                        className={`flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg border transition-all text-xs md:text-sm font-medium
                            ${showAI
                                ? "bg-purple-500/20 border-purple-500/50 text-purple-400"
                                : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:text-white"
                            }`}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">AI</span>
                    </button>

                    <button
                        onClick={() => setShowSettings(true)}
                        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-[#333] bg-[#1a1a1a] text-gray-400 hover:text-white transition-all xl:mr-2"
                        title="AI Settings (Custom Keys)"
                    >
                        <Settings2 className="w-4 h-4" />
                    </button>

                    <select
                        value={language.id}
                        onChange={(e) => {
                            const lang = LANGUAGES.find(l => l.id === e.target.value)!
                            setLanguage(lang)
                            // Load starter code if problem defines it, otherwise fallback to template
                            if (currentProblem.starter_code && currentProblem.starter_code[lang.name.toLowerCase()]) {
                                setCode(currentProblem.starter_code[lang.name.toLowerCase()])
                            } else if (currentProblem.starter_code && currentProblem.starter_code[lang.id]) {
                                setCode(currentProblem.starter_code[lang.id])
                            } else {
                                setCode(lang.defaultCode)
                            }
                        }}
                        className="bg-[#1a1a1a] border border-[#333] rounded-lg px-2 md:px-3 py-1.5 text-xs md:text-sm focus:outline-none focus:border-blue-500"
                    >
                        {LANGUAGES.map(l => (
                            <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-lg bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30 transition-all disabled:opacity-50 text-xs md:text-sm font-medium"
                    >
                        {isRunning && activeTab === 'console' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                        Run
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={isRunning || isCustom}
                        className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg text-xs md:text-sm font-medium disabled:opacity-50"
                    >
                        <Send className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Submit</span>
                    </button>
                </div>
            </div>

            {/* Workspace */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Problem Description */}
                <div className={`${showProblemPanel ? "flex" : "hidden"} md:flex w-full md:w-[380px] lg:w-[420px] border-r border-[#1f1f1f] bg-[#0c0c0c] flex-col shrink-0 absolute md:relative z-10 h-full transition-all duration-300 ease-in-out`}>
                    <div className="p-3 md:p-4 border-b border-[#1f1f1f] flex items-center justify-between">
                        <div className="font-semibold text-white flex items-center gap-2 text-sm">
                            <Code2 className="w-4 h-4 text-gray-500" />
                            Description
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className="text-xs px-2 py-0.5 rounded border font-medium capitalize"
                                style={{
                                    color: DIFF_COLORS[currentProblem.difficulty] || DIFF_COLORS.Medium,
                                    borderColor: `${DIFF_COLORS[currentProblem.difficulty] || DIFF_COLORS.Medium}40`,
                                    backgroundColor: `${DIFF_COLORS[currentProblem.difficulty] || DIFF_COLORS.Medium}15`
                                }}
                            >
                                {currentProblem.difficulty || "Medium"}
                            </span>
                            <button onClick={() => setShowProblemPanel(false)} className="md:hidden text-gray-500 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-5 md:p-6 text-sm text-gray-300 space-y-5 scrollbar-thin scrollbar-thumb-gray-800">
                        <h2 className="text-lg font-bold text-white">
                            {currentProblem.title}
                        </h2>

                        {/* Description with simple markdown-like parsing */}
                        {(currentProblem.description || "No description provided.").split("\n\n").map((para: string, i: number) => {
                            // Check for links
                            if (para.startsWith("[View Problem")) {
                                const link = para.match(/\((.*?)\)/)?.[1]
                                return (
                                    <a
                                        key={i}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-blue-500/50 rounded-xl text-blue-400 transition-all group"
                                    >
                                        <span>View Description on LeetCode</span>
                                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </a>
                                )
                            }
                            return (
                                <p key={i} className="leading-relaxed whitespace-pre-wrap">
                                    {para}
                                </p>
                            )
                        })}

                        {/* Public Test Cases (Examples) */}
                        {currentProblem.test_cases && currentProblem.test_cases.length > 0 && (
                            <div className="mt-8 space-y-4">
                                <h3 className="text-white font-medium mb-2 border-b border-[#333] pb-2">Examples</h3>
                                {currentProblem.test_cases.filter((tc: any) => !tc.is_hidden).map((tc: any, i: number) => (
                                    <div key={i} className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333] text-xs text-gray-300">
                                        <div className="mb-2"><span className="text-gray-500 font-semibold mb-1 block">Input:</span> <pre className="font-mono bg-[#0c0c0c] p-2 rounded">{tc.input}</pre></div>
                                        <div><span className="text-gray-500 font-semibold mb-1 block">Output:</span> <pre className="font-mono bg-[#0c0c0c] p-2 rounded">{tc.expected_output}</pre></div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Constraints - simple rendering if exist in description */}
                    </div>
                </div>

                {/* Editor + Panels */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
                    <div className="flex-1 relative flex flex-col">
                        <CodeEditor
                            height="100%"
                            language={language.id}
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            onErrorCountChange={handleErrorCountChange}
                        />
                    </div>

                    <StudioTerminal
                        isOpen={terminalOpen}
                        onToggle={() => setTerminalOpen(!terminalOpen)}
                        height={280}
                    />

                    <OutputPanel
                        output={output}
                        isRunning={isRunning}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        isOpen={outputOpen}
                        onToggle={() => setOutputOpen(!outputOpen)}
                        height={280}
                    />
                </div>

                {/* Review Panel */}
                {showReview && (
                    <ReviewPanel
                        code={code}
                        language={language.id}
                        isOpen={showReview}
                        onClose={() => setShowReview(false)}
                    />
                )}

                {/* Debug Panel */}
                {debugOpen && (
                    <DebugPanel
                        code={code}
                        language={language.id}
                        isOpen={debugOpen}
                        onClose={() => setDebugOpen(false)}
                        onRunWithDebug={handleRun}
                        onSubmit={handleSubmit}
                    />
                )}

                {/* AI Assistant Panel */}
                {showAI && (
                    <AIChat
                        problemTitle={currentProblem.title}
                        difficulty={currentProblem.difficulty}
                        userCode={code}
                    />
                )}

                {/* AI Settings Modal */}
                <AISettingsModal 
                    isOpen={showSettings} 
                    onClose={() => setShowSettings(false)} 
                />
            </div>
        </div>
    )
}

export default function StudioPage() {
    return (
        <Suspense fallback={<div className="h-full flex items-center justify-center bg-black text-white"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
            <StudioContent />
        </Suspense>
    )
}
