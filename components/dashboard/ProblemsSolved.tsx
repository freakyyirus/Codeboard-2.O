"use client"

interface ProblemsSolvedProps {
    total?: number
    easy?: number
    medium?: number
    hard?: number
}

export function ProblemsSolved({
    total = 2,
    easy = 2,
    medium = 0,
    hard = 0,
}: ProblemsSolvedProps) {
    const max = Math.max(total, 1)
    const percent = Math.round((total / max) * 70)

    return (
        <div className="stat-card p-6">
            <h3 className="text-gray-400 font-medium mb-4 text-center">Problems Solved</h3>
            <div className="flex items-center gap-6">
                {/* Donut Chart */}
                <div className="relative w-32 h-32 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                        <path
                            className="circle-bg"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                            className="circle"
                            stroke="#22c55e"
                            strokeDasharray={`${percent}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{total}</span>
                    </div>
                </div>

                {/* Breakdown */}
                <div className="flex-1 space-y-3">
                    <div className="text-gray-400 font-medium text-sm">DSA</div>
                    <div className="flex items-center justify-between p-2 bg-green-900/20 border border-green-800/30 rounded-lg">
                        <span className="text-green-400 font-medium text-sm">Easy</span>
                        <span className="font-bold text-green-400">{easy}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
                        <span className="text-yellow-400 font-medium text-sm">Medium</span>
                        <span className="font-bold text-yellow-400">{medium}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-900/20 border border-red-800/30 rounded-lg">
                        <span className="text-red-400 font-medium text-sm">Hard</span>
                        <span className="font-bold text-red-400">{hard}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
