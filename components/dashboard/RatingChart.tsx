"use client"

interface RatingChartProps {
    rating?: number
    date?: string
    contest?: string
    rank?: number
}

export function RatingChart({
    rating = 1205,
    date = "21 Jan 2026",
    contest = "Starters 222 (Rated)",
    rank = 8214,
}: RatingChartProps) {
    return (
        <div className="stat-card p-6">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-gray-400 font-medium mb-1">Rating</h3>
                    <p className="text-4xl font-bold text-white">{rating}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">{date}</p>
                    <p className="font-medium text-white">{contest}</p>
                    <p className="text-sm text-gray-500">Rank: {rank.toLocaleString()}</p>
                </div>
            </div>
            <div className="h-48 w-full">
                <svg viewBox="0 0 400 150" className="w-full h-full">
                    {/* Grid lines */}
                    <line x1="0" y1="120" x2="400" y2="120" stroke="#1f1f1f" strokeWidth="1" />
                    <line x1="0" y1="90" x2="400" y2="90" stroke="#1f1f1f" strokeWidth="1" />
                    <line x1="0" y1="60" x2="400" y2="60" stroke="#1f1f1f" strokeWidth="1" />
                    <line x1="0" y1="30" x2="400" y2="30" stroke="#1f1f1f" strokeWidth="1" />

                    {/* Area fill */}
                    <path
                        d="M 0 120 Q 50 100, 100 80 T 200 60 T 300 40 T 400 20 L 400 120 Z"
                        fill="#f97316"
                        opacity="0.1"
                    />

                    {/* Line */}
                    <path
                        className="graph-line"
                        d="M 0 120 Q 50 100, 100 80 T 200 60 T 300 40 T 400 20"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="3"
                    />

                    {/* Y-axis labels */}
                    <text x="5" y="125" fontSize="10" fill="#555">900</text>
                    <text x="5" y="95" fontSize="10" fill="#555">950</text>
                    <text x="5" y="65" fontSize="10" fill="#555">1000</text>
                    <text x="5" y="35" fontSize="10" fill="#555">1050</text>
                    <text x="5" y="15" fontSize="10" fill="#555">1100</text>
                </svg>
            </div>
        </div>
    )
}
