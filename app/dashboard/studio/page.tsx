"use client"

import { useState, useMemo } from "react"
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
    Loader2,
    Menu,
    AlertTriangle,
    Maximize2,
    Minimize2
} from "lucide-react"
import { AIChat } from "@/components/studio/AIChat"
import { CodeEditor } from "@/components/studio/CodeEditor"
import * as monaco from "monaco-editor"

/* ─── Problem Bank ────────────────────────────────── */

interface Problem {
    id: string
    title: string
    difficulty: "Easy" | "Medium" | "Hard"
    description: string
    examples: { input: string; output: string; explanation?: string }[]
    constraints: string[]
    testInput: string
    expectedOutput: string
}

const PROBLEMS: Problem[] = [
    {
        id: "1", title: "Two Sum", difficulty: "Easy",
        description: "Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
        ],
        constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists."],
        testInput: "nums = [2,7,11,15], target = 9",
        expectedOutput: "[0,1]"
    },
    {
        id: "2", title: "Add Two Numbers", difficulty: "Medium",
        description: "You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each node contains a single digit. Add the two numbers and return the sum as a linked list.",
        examples: [
            { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." },
        ],
        constraints: ["The number of nodes in each linked list is in the range [1, 100].", "0 ≤ Node.val ≤ 9"],
        testInput: "l1 = [2,4,3], l2 = [5,6,4]",
        expectedOutput: "[7,0,8]"
    },
    {
        id: "3", title: "Longest Substring Without Repeating Characters", difficulty: "Medium",
        description: "Given a string `s`, find the length of the **longest substring** without repeating characters.",
        examples: [
            { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
            { input: 's = "bbbbb"', output: "1" },
        ],
        constraints: ["0 ≤ s.length ≤ 5 × 10⁴", "s consists of English letters, digits, symbols and spaces."],
        testInput: 's = "abcabcbb"',
        expectedOutput: "3"
    },
    {
        id: "4", title: "Median of Two Sorted Arrays", difficulty: "Hard",
        description: "Given two sorted arrays `nums1` and `nums2` of size m and n respectively, return **the median** of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
        examples: [
            { input: "nums1 = [1,3], nums2 = [2]", output: "2.0", explanation: "merged array = [1,2,3] and median is 2." },
        ],
        constraints: ["nums1.length == m", "nums2.length == n", "0 ≤ m ≤ 1000"],
        testInput: "nums1 = [1,3], nums2 = [2]",
        expectedOutput: "2.0"
    },
    {
        id: "5", title: "Valid Parentheses", difficulty: "Easy",
        description: "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
        examples: [
            { input: 's = "()"', output: "true" },
            { input: 's = "([)]"', output: "false" },
        ],
        constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'."],
        testInput: 's = "{[]}"',
        expectedOutput: "true"
    },
    {
        id: "6", title: "Merge Two Sorted Lists", difficulty: "Easy",
        description: "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one **sorted** list by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
        examples: [
            { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
        ],
        constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 ≤ Node.val ≤ 100"],
        testInput: "list1 = [1,2,4], list2 = [1,3,4]",
        expectedOutput: "[1,1,2,3,4,4]"
    },
    {
        id: "7", title: "Maximum Subarray", difficulty: "Medium",
        description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
        examples: [
            { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
        ],
        constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
        testInput: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        expectedOutput: "6"
    },
    {
        id: "8", title: "Climbing Stairs", difficulty: "Easy",
        description: "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        examples: [
            { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step. 2. 2 steps." },
            { input: "n = 3", output: "3" },
        ],
        constraints: ["1 ≤ n ≤ 45"],
        testInput: "n = 4",
        expectedOutput: "5"
    },
    {
        id: "9", title: "Binary Search", difficulty: "Easy",
        description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with O(log n) runtime complexity.",
        examples: [
            { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
            { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" },
        ],
        constraints: ["1 ≤ nums.length ≤ 10⁴", "-10⁴ < nums[i], target < 10⁴", "All integers in nums are unique."],
        testInput: "nums = [-1,0,3,5,9,12], target = 9",
        expectedOutput: "4"
    },
    {
        id: "10", title: "Merge K Sorted Lists", difficulty: "Hard",
        description: "You are given an array of `k` linked-lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        examples: [
            { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
        ],
        constraints: ["k == lists.length", "0 ≤ k ≤ 10⁴", "0 ≤ lists[i].length ≤ 500"],
        testInput: "lists = [[1,4,5],[1,3,4],[2,6]]",
        expectedOutput: "[1,1,2,3,4,4,5,6]"
    },
]

const LANGUAGES = [
    { id: "cpp", name: "C++", defaultCode: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n        return {};\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> nums = {2, 7, 11, 15};\n    auto result = sol.twoSum(nums, 9);\n    cout << "[" << result[0] << "," << result[1] << "]" << endl;\n    return 0;\n}` },
    { id: "python", name: "Python", defaultCode: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Your code here\n        seen = {}\n        for i, num in enumerate(nums):\n            comp = target - num\n            if comp in seen:\n                return [seen[comp], i]\n            seen[num] = i\n        return []\n\nif __name__ == "__main__":\n    sol = Solution()\n    print(sol.twoSum([2, 7, 11, 15], 9))` },
    { id: "javascript", name: "JavaScript", defaultCode: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const comp = target - nums[i];\n        if (map.has(comp)) return [map.get(comp), i];\n        map.set(nums[i], i);\n    }\n};\n\nconsole.log(twoSum([2, 7, 11, 15], 9));` },
    { id: "java", name: "Java", defaultCode: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) {\n                return new int[]{map.get(comp), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}` },
]

const DIFF_COLORS = { Easy: "#22c55e", Medium: "#eab308", Hard: "#ef4444" }

/* ─── Component ────────────────────────────────────── */

export default function StudioPage() {
    const [showAI, setShowAI] = useState(false)
    const [terminalOpen, setTerminalOpen] = useState(true)
    const [showProblemPanel, setShowProblemPanel] = useState(true)
    const [isMaximized, setIsMaximized] = useState(false)

    const [language, setLanguage] = useState(LANGUAGES[0])
    const [code, setCode] = useState(LANGUAGES[0].defaultCode)
    const [selectedProblemId, setSelectedProblemId] = useState("1")
    const [isRunning, setIsRunning] = useState(false)
    const [output, setOutput] = useState<string[]>(["Welcome to CodeBoard Studio v2.0", "Ready to compile..."])
    const [activeTab, setActiveTab] = useState<"console" | "testcases">("console")
    const [errorCount, setErrorCount] = useState(0)

    const currentProblem = useMemo(
        () => PROBLEMS.find(p => p.id === selectedProblemId) || PROBLEMS[0],
        [selectedProblemId]
    )

    /* ─── Handlers */
    const handleRun = async () => {
        setIsRunning(true)
        setOutput(["⏳ Compiling...", "Sending to execution engine..."])
        setTerminalOpen(true)
        setActiveTab("console")

        try {
            const response = await fetch("/api/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code,
                    language: language.id,
                    stdin: currentProblem.testInput
                })
            })

            const result = await response.json()

            if (result.error) {
                setOutput([`❌ Error: ${result.error}`])
            } else {
                const status = result.status?.description || "Completed"
                const stdout = result.stdout || ""
                const stderr = result.stderr || ""
                const compileOutput = result.compile_output || ""

                const newOutput = [
                    `> Status: ${status}`,
                    result.time ? `> Runtime: ${result.time}s` : "",
                    result.memory ? `> Memory: ${result.memory}KB` : "",
                    "",
                    compileOutput ? `Compile Output:\n${compileOutput}` : "",
                    stdout ? `Standard Output:\n${stdout}` : "",
                    stderr ? `Standard Error:\n${stderr}` : "",
                ].filter(Boolean)

                if (status === "Accepted") {
                    newOutput.push("", "✅ All test cases passed!")
                } else if (status !== "In Queue" && status !== "Processing") {
                    newOutput.push("", `❌ Result: ${status}`)
                }

                setOutput(newOutput)
            }
        } catch (error) {
            setOutput(["❌ Failed to connect to execution engine"])
        } finally {
            setIsRunning(false)
        }
    }

    const handleValidation = (markers: monaco.editor.IMarker[]) => {
        setErrorCount(markers.filter(m => m.severity === monaco.MarkerSeverity.Error).length)
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
                    <select
                        value={selectedProblemId}
                        onChange={(e) => setSelectedProblemId(e.target.value)}
                        className="bg-[#1a1a1a] border border-[#333] rounded-lg px-2 md:px-3 py-1.5 text-xs md:text-sm focus:outline-none focus:border-blue-500 min-w-[140px] md:min-w-[200px]"
                    >
                        {PROBLEMS.map(p => (
                            <option key={p.id} value={p.id}>{p.id}. {p.title} ({p.difficulty})</option>
                        ))}
                    </select>
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

                    <select
                        value={language.id}
                        onChange={(e) => {
                            const lang = LANGUAGES.find(l => l.id === e.target.value)!
                            setLanguage(lang)
                            setCode(lang.defaultCode)
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
                        {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                        Run
                    </button>

                    <button className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg text-xs md:text-sm font-medium">
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
                                className="text-xs px-2 py-0.5 rounded border font-medium"
                                style={{
                                    color: DIFF_COLORS[currentProblem.difficulty],
                                    borderColor: `${DIFF_COLORS[currentProblem.difficulty]}40`,
                                    backgroundColor: `${DIFF_COLORS[currentProblem.difficulty]}15`
                                }}
                            >
                                {currentProblem.difficulty}
                            </span>
                            <button onClick={() => setShowProblemPanel(false)} className="md:hidden text-gray-500 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-5 md:p-6 text-sm text-gray-300 space-y-5 scrollbar-thin scrollbar-thumb-gray-800">
                        <h2 className="text-lg font-bold text-white">{currentProblem.id}. {currentProblem.title}</h2>

                        {/* Description with simple markdown-like parsing */}
                        {currentProblem.description.split("\n\n").map((para, i) => (
                            <p key={i} className="leading-relaxed whitespace-pre-wrap">
                                {para}
                            </p>
                        ))}

                        {/* Examples */}
                        {currentProblem.examples.map((ex, i) => (
                            <div key={i}>
                                <h3 className="text-white font-medium mb-2">Example {i + 1}:</h3>
                                <pre className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333] text-xs text-gray-300 whitespace-pre-wrap">
                                    <span className="text-gray-500">Input: </span>{ex.input}{"\n"}
                                    <span className="text-gray-500">Output: </span>{ex.output}
                                    {ex.explanation && (<>{"\n"}<span className="text-gray-500">Explanation: </span>{ex.explanation}</>)}
                                </pre>
                            </div>
                        ))}

                        {/* Constraints */}
                        <div>
                            <h3 className="text-white font-medium mb-2">Constraints:</h3>
                            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-400">
                                {currentProblem.constraints.map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Editor + Terminal */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
                    <div className="flex-1 relative flex flex-col">
                        <CodeEditor
                            height="100%"
                            language={language.id}
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            onValidation={handleValidation}
                        />
                    </div>

                    {/* Terminal */}
                    <div
                        className="border-t border-[#1f1f1f] bg-[#0c0c0c] flex flex-col transition-all duration-300 ease-in-out"
                        style={{ height: terminalOpen ? 180 : 36 }}
                    >
                        <div className="flex items-center justify-between px-3 md:px-4 h-9 border-b border-[#1f1f1f] bg-[#1a1a1a] shrink-0">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setActiveTab("console")}
                                    className={`text-xs font-medium flex items-center gap-1.5 px-1 transition-colors ${activeTab === "console" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                                >
                                    <Terminal className="w-3 h-3" />
                                    Console
                                </button>
                                <button
                                    onClick={() => setActiveTab("testcases")}
                                    className={`text-xs font-medium flex items-center gap-1.5 px-1 transition-colors ${activeTab === "testcases" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                                >
                                    <CheckCircle className="w-3 h-3" />
                                    Tests
                                </button>
                            </div>
                            <button onClick={() => setTerminalOpen(!terminalOpen)} className="text-gray-500 hover:text-white">
                                {terminalOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                            </button>
                        </div>

                        {terminalOpen && (
                            <div className="flex-1 p-3 md:p-4 font-mono text-xs overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
                                {activeTab === "console" ? (
                                    <div className="space-y-0.5">
                                        {output.map((line, i) => (
                                            <div key={i} className={
                                                line.startsWith(">") ? "text-gray-500" :
                                                    line.startsWith("✅") ? "text-green-400" :
                                                        line.startsWith("❌") ? "text-red-400" :
                                                            line.startsWith("⏳") ? "text-yellow-400" :
                                                                "text-gray-300"
                                            }>{line || "\u00A0"}</div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="p-3 bg-[#1e1e1e] rounded border border-[#333]">
                                            <div className="text-[10px] text-gray-500 mb-1.5">Input</div>
                                            <div className="font-mono text-gray-300 text-xs">{currentProblem.testInput}</div>
                                        </div>
                                        <div className="p-3 bg-[#1e1e1e] rounded border border-[#333]">
                                            <div className="text-[10px] text-gray-500 mb-1.5">Expected Output</div>
                                            <div className="font-mono text-gray-300 text-xs">{currentProblem.expectedOutput}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* AI Assistant Panel */}
                {showAI && (
                    <AIChat
                        problemTitle={currentProblem.title}
                        difficulty={currentProblem.difficulty}
                        userCode={code}
                    />
                )}
            </div>
        </div>
    )
}
