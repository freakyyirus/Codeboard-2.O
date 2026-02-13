import { StudioClient } from "@/components/studio/StudioClient"


// Mock for visual dev first
const MOCK_PROBLEM = {
    id: "uuid-1",
    title: "Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    difficulty: "Easy",
    examples: [
        { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
        { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ]
}

export default async function ProblemPage({ params }: { params: { id: string } }) {
    // In real implementation, fetch from DB
    // const supabase = await createClient()
    // const { data: problem } = supabase.from('problems').select('*').eq('id', params.id).single()

    // For now, use mock to let user see the UI
    const problem = MOCK_PROBLEM

    return (
        <div className="h-[calc(100vh-4rem)] flex gap-4 p-4 overflow-hidden">
            {/* Left: Problem Description */}
            <div className="w-1/2 flex flex-col gap-4 overflow-y-auto pr-2">
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold tracking-tight">{problem.title}</h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium 
                            ${problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                                problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                                    'bg-red-500/10 text-red-500'}`}>
                            {problem.difficulty}
                        </span>
                    </div>

                    <div className="prose prose-invert max-w-none text-[var(--text-secondary)]">
                        <p>{problem.description}</p>
                    </div>

                    <div className="mt-8 space-y-4">
                        {problem.examples.map((ex, i) => (
                            <div key={i} className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border)]">
                                <p className="text-sm font-code text-[var(--text-secondary)]">
                                    <span className="text-[var(--text-tertiary)] select-none">Input:</span> {ex.input}
                                </p>
                                <p className="text-sm font-code text-[var(--text-secondary)] mt-2">
                                    <span className="text-[var(--text-tertiary)] select-none">Output:</span> {ex.output}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: Code Editor */}
            <div className="w-1/2 flex flex-col gap-4">
                <div className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden flex flex-col">
                    <div className="flex-1 relative overflow-hidden bg-[#1e1e1e]">
                        <StudioClient problem={problem} />
                    </div>
                </div>
            </div>
        </div>
    )
}
