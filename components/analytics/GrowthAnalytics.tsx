"use client"

import { useState } from "react"
import { FadeIn, BaseCard } from "@/components/ui/PremiumEffects"
import { RatingProgressionChart } from "@/components/dashboard/RatingProgressionChart"
import { TrendingUp, BarChart3, Target, Activity, Flame, Award } from "lucide-react"

export function GrowthAnalytics() {
    const [platformView, setPlatformView] = useState<"Combined" | "CodeChef" | "Codeforces" | "LeetCode">("Combined")

    return (
        <div className="space-y-8 animate-in mt-6">

            {/* 1. Key Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <MetricCard
                    title="Rating Growth"
                    value="+312"
                    subtitle="from 928 to 1240"
                    trend="+33.6%"
                    icon={TrendingUp}
                    color="text-green-400"
                    bg="bg-green-500/10"
                />
                <MetricCard
                    title="Rank Imprv."
                    value="9,718"
                    subtitle="started at 12,069"
                    trend="Top 15%"
                    icon={BarChart3}
                    color="text-blue-400"
                    bg="bg-blue-500/10"
                />
                <MetricCard
                    title="Frequency"
                    value="2.3/mo"
                    subtitle="avg contests/month"
                    trend="Active"
                    icon={Activity}
                    color="text-purple-400"
                    bg="bg-purple-500/10"
                />
                <MetricCard
                    title="Best Perform."
                    value="1610"
                    subtitle="Jan 01, 2024"
                    trend="LeetCode"
                    icon={Award}
                    color="text-orange-400"
                    bg="bg-orange-500/10"
                />
                <MetricCard
                    title="Consistency"
                    value="87/100"
                    subtitle="Participation score"
                    trend="+5 pts"
                    icon={Flame}
                    color="text-red-400"
                    bg="bg-red-500/10"
                />
            </div>

            {/* 2. Platform Breakdown & Main Rating Chart */}
            <BaseCard className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white">Platform Breakdown</h3>
                        <p className="text-sm text-gray-500 mt-1">Detailed competition history and rating timelines.</p>
                    </div>

                    <div className="flex items-center gap-1 bg-[#111113] p-1 rounded-xl border border-white/5 overflow-x-auto w-full sm:w-auto">
                        {["Combined", "CodeChef", "Codeforces", "LeetCode"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setPlatformView(tab as any)}
                                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${platformView === tab ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-[400px]">
                    <RatingProgressionChart />
                </div>
            </BaseCard>

            {/* 3. Predictive Analytics & Comparisons */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Projected Rating / Goal Tracker */}
                <BaseCard className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Target className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Goal Tracker</h3>
                            <p className="text-xs text-gray-400">Target Rating: 1400 Codeforces</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Current: <span className="text-white font-medium">1120</span></span>
                                <span className="text-gray-400">Target: <span className="text-white font-medium">1400</span></span>
                            </div>
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full w-[40%]" />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-right">280 points remaining</p>
                        </div>

                        <div className="bg-[#111113] p-4 rounded-xl border border-white/5">
                            <h4 className="text-sm font-medium text-white mb-2">ML Prediction</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Based on your current trajectory of +20 points per contest, you will reach your goal in approximately <strong className="text-white">14 contests</strong> (~4 months).
                            </p>
                        </div>
                    </div>
                </BaseCard>

                {/* You vs Top 10% */}
                <BaseCard className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Comparative Analytics</h3>
                            <p className="text-xs text-gray-400">You vs Top 10% Peers</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center h-[200px] border border-dashed border-white/10 rounded-xl bg-[#111113]/50">
                        <p className="text-sm text-gray-500">Comparative Chart Visualization</p>
                    </div>
                </BaseCard>
            </div>
        </div>
    )
}

function MetricCard({ title, value, subtitle, trend, icon: Icon, color, bg }: any) {
    return (
        <FadeIn>
            <BaseCard className="p-5 flex flex-col justify-between h-full group hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg ${bg}`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border text-white border-white/10 bg-white/5">
                        {trend}
                    </div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-white mb-1 group-hover:scale-105 origin-left transition-transform">{value}</div>
                    <div className="text-xs font-semibold text-gray-400">{title}</div>
                    <div className="text-[10px] text-gray-500 mt-1">{subtitle}</div>
                </div>
            </BaseCard>
        </FadeIn>
    )
}
