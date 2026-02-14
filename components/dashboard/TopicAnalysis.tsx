"use client"

import { Info } from "lucide-react"

const topics = [
    { name: "HashMap and Set", count: 1 },
    { name: "Arrays", count: 1 },
    { name: "Math", count: 1 },
]

export function TopicAnalysis() {
    const max = Math.max(...topics.map((t) => t.count), 1)

    return (
        <div className="stat-card p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-400 font-medium">DSA Topic Analysis</h3>
                <button className="text-gray-500 hover:text-gray-300">
                    <Info className="w-4 h-4" />
                </button>
            </div>
            <div className="space-y-4">
                {topics.map((topic) => (
                    <div key={topic.name} className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 w-32 text-right shrink-0">{topic.name}</span>
                        <div
                            className="h-6 bg-blue-600 rounded flex items-center justify-end px-2 transition-all"
                            style={{ width: `${(topic.count / max) * 100}%`, minWidth: "40px" }}
                        >
                            <span className="text-white text-sm font-medium">{topic.count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
