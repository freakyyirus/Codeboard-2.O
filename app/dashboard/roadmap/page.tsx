"use client"

import { CheckCircle, Lock } from "lucide-react"

export default function RoadmapPage() {
    return (
        <div className="p-6 md:p-8 max-w-5xl fade-in pb-20">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-white">Learning Roadmap</h1>
                <p className="text-gray-400">Structured path to master DSA and Competitive Programming</p>
            </div>

            <div className="space-y-6">
                {/* Phase 1 */}
                <div className="glass rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                            <span className="text-2xl font-bold text-green-500">1</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-1">Fundamentals</h3>
                            <p className="text-gray-400">Arrays, Strings, Basic Math, Sorting</p>
                        </div>
                        <div className="ml-auto flex flex-col items-end">
                            <span className="text-2xl font-bold text-green-500">85%</span>
                            <span className="text-xs text-green-400 uppercase tracking-wider font-semibold">Complete</span>
                        </div>
                    </div>

                    <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-8 border border-white/5">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: "85%" }} />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {["Two Sum", "Valid Anagram", "Contains Duplicate", "Group Anagrams", "Top K Frequent", "Product of Array"].map((topic, i) => (
                            <div key={topic} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-sm font-medium text-gray-200">{topic}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Phase 2 */}
                <div className="glass rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                            <span className="text-2xl font-bold text-yellow-500">2</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-1">Data Structures</h3>
                            <p className="text-gray-400">Stacks, Queues, Linked Lists, Trees, Heaps</p>
                        </div>
                        <div className="ml-auto flex flex-col items-end">
                            <span className="text-2xl font-bold text-yellow-500">45%</span>
                            <span className="text-xs text-yellow-400 uppercase tracking-wider font-semibold">In Progress</span>
                        </div>
                    </div>

                    <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-8 border border-white/5">
                        <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full" style={{ width: "45%" }} />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 opacity-80">
                        {["Valid Parentheses", "Min Stack", "Reverse Linked List", "Invert Binary Tree", "Lowest Common Ancestor"].map((topic, i) => (
                            <div key={topic} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                {i < 2 ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-yellow-500/50" />}
                                <span className="text-sm font-medium text-gray-300">{topic}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Phase 3 */}
                <div className="glass rounded-2xl p-8 relative overflow-hidden opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
                            <Lock className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-1">Advanced Algorithms</h3>
                            <p className="text-gray-400">DP, Graphs, Segment Trees, Tries</p>
                        </div>
                        <div className="ml-auto">
                            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white uppercase tracking-wider border border-white/10">Locked</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
