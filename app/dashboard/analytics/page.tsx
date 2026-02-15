"use client"

import { useState, useMemo } from "react"
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader"
import { AnalyticsSummaryCards } from "@/components/analytics/AnalyticsSummaryCards"
import { GrowthTrendChart } from "@/components/analytics/GrowthTrendChart"
import { TopicRadarChart } from "@/components/analytics/TopicRadarChart"
import { PlatformBreakdown } from "@/components/analytics/PlatformBreakdown"
import { WeaknessSpotlight } from "@/components/analytics/WeaknessSpotlight"
import { ProductivityInsights } from "@/components/analytics/ProductivityInsights"
import { ContributionGraph } from "@/components/dashboard/ContributionGraph"
import { FadeIn } from "@/components/ui/PremiumEffects"

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState("30 Days")

    // Mock Contribution Data for the heatmap
    const mockContributionData = useMemo(() => {
        const dates = []
        const today = new Date()
        for (let i = 0; i < 365; i++) {
            const d = new Date(today)
            d.setDate(d.getDate() - i)
            const count = Math.random() > 0.6 ? Math.floor(Math.random() * 8) : 0
            dates.push({ date: d.toISOString().split('T')[0], count })
        }
        return dates
    }, [])

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 min-h-screen">
            {/* 1. Header & Controls */}
            <FadeIn delay={0}>
                <AnalyticsHeader timeRange={timeRange} setTimeRange={setTimeRange} />
            </FadeIn>

            {/* 2. Key Metrics Summary */}
            <FadeIn delay={0.1}>
                <AnalyticsSummaryCards />
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 3. Main Growth Chart (Spans 2 cols) */}
                <FadeIn delay={0.2} className="lg:col-span-2 bg-[#111] border border-white/10 rounded-xl p-6 min-h-[400px]">
                    <GrowthTrendChart />
                </FadeIn>

                {/* 4. Topic Radar / Skill Analysis (Spans 1 col) */}
                <FadeIn delay={0.3} className="bg-[#111] border border-white/10 rounded-xl p-6 min-h-[400px]">
                    <TopicRadarChart />
                </FadeIn>
            </div>

            {/* 5. Platform Breakdown Row */}
            <FadeIn delay={0.4}>
                <PlatformBreakdown />
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 6. Productivity Insights (Spans 2 cols for grid layout) */}
                <FadeIn delay={0.5} className="lg:col-span-2">
                    <h3 className="text-white font-semibold mb-4">Productivity Patterns</h3>
                    <ProductivityInsights />
                </FadeIn>

                {/* 7. Weakness & AI Insights (Spans 1 col) */}
                <FadeIn delay={0.6} className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <WeaknessSpotlight />
                </FadeIn>
            </div>

            {/* 8. Coding Activity Heatmap (Full Width) */}
            <FadeIn delay={0.7} className="space-y-4">
                <h3 className="text-white font-semibold">Activity Heatmap</h3>
                {/* Reusing the heatmap component we made earlier or from dashboard */}
                <ContributionGraph contributions={mockContributionData} />
            </FadeIn>

        </div>
    )
}
