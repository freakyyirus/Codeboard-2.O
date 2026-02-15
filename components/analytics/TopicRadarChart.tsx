"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
    { subject: 'Arrays', A: 120, fullMark: 150 },
    { subject: 'DP', A: 45, fullMark: 150 },
    { subject: 'Graphs', A: 60, fullMark: 150 },
    { subject: 'Strings', A: 90, fullMark: 150 },
    { subject: 'Trees', A: 110, fullMark: 150 },
    { subject: 'Math', A: 85, fullMark: 150 },
]

export function TopicRadarChart() {
    return (
        <div className="h-full flex flex-col">
            <h3 className="text-white font-semibold mb-4">Skill Distribution</h3>
            <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid stroke="#333" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                        <Radar
                            name="Skill Level"
                            dataKey="A"
                            stroke="#10b981"
                            strokeWidth={2}
                            fill="#10b981"
                            fillOpacity={0.3}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#10b981' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend/Info below chart */}
            <div className="text-center text-xs text-gray-500 mt-2">
                Your strongest area is <strong>Arrays</strong>
            </div>
        </div>
    )
}
