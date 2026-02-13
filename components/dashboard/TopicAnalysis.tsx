"use client"

const topics = [
    { name: "Arrays", count: 42 },
    { name: "HashMap & Set", count: 35 },
    { name: "Dynamic Programming", count: 28 },
    { name: "Math", count: 22 },
    { name: "Graphs", count: 18 },
    { name: "Trees", count: 15 },
]

export function TopicAnalysis() {
    const maxCount = Math.max(...topics.map(t => t.count))

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-5 h-full">
            <h3 className="text-[14px] font-medium text-[var(--foreground)] mb-4">DSA Topic Analysis</h3>
            <div className="space-y-4">
                {topics.map((topic) => (
                    <div key={topic.name} className="group cursor-default">
                        <div className="flex justify-between text-[12px] mb-1.5">
                            <span className="text-[var(--text-secondary)] font-medium group-hover:text-[var(--foreground)] transition-colors">
                                {topic.name}
                            </span>
                            <span className="text-[var(--foreground)] font-mono">
                                {topic.count}
                            </span>
                        </div>
                        <div className="h-1.5 bg-[var(--secondary)] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[var(--primary)] rounded-full transition-all duration-500 group-hover:bg-[var(--primary)]/80"
                                style={{ width: `${(topic.count / maxCount) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
