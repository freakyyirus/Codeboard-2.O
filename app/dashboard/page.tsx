import { StatsCard } from "@/components/dashboard/StatsCard"
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap"
import { RatingChart } from "@/components/dashboard/RatingChart"
import { PlatformList } from "@/components/dashboard/PlatformList"
import { TopicAnalysis } from "@/components/dashboard/TopicAnalysis"
import { ProfileCard } from "@/components/dashboard/ProfileCard"
import { ContestRankings } from "@/components/dashboard/ContestRankings"
import { ProblemsSolved } from "@/components/dashboard/ProblemsSolved"
import { Awards } from "@/components/dashboard/Awards"
import { getDashboardData } from "@/lib/actions"
import { CheckCircle, ArrowRight } from "lucide-react"

/* ─── Page Component (Server) ───────────────────────────── */
export default async function DashboardPage() {
    let data: any = null
    try {
        data = await getDashboardData()
    } catch { }

    return (
        <div className="space-y-6 fade-in">


            {/* ─── 12-Column Grid ─────────────────────── */}
            <div className="grid grid-cols-12 gap-6">
                {/* Left Column — Profile (3 cols) */}
                <div className="col-span-12 lg:col-span-3 space-y-6">
                    <ProfileCard
                        name={data?.profile?.display_name || "Yuvraj Singh"}
                        handle={data?.profile?.username ? `@${data.profile.username}` : "@freakyyirus"}
                    />

                    {/* About Section */}
                    <div className="stat-card p-6">
                        <h3 className="font-semibold text-lg mb-4 text-white">About</h3>
                        <PlatformList />

                        {/* Profile Stats */}
                        <div className="mt-6 pt-6 border-t border-[#1f1f1f] space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Profile Views:</span>
                                <span className="font-semibold text-orange-400">0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Last Refresh:</span>
                                <span className="font-semibold text-white">57 seconds ago</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Profile Visibility:</span>
                                <span className="font-semibold text-white">Public</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column — Stats (9 cols) */}
                <div className="col-span-12 lg:col-span-9 space-y-6">
                    {/* Top Stats Row — 3 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard
                            label="Total Questions"
                            value={data?.stats?.total_solved ?? 84}
                        />
                        <StatsCard
                            label="Total Active Days"
                            value={data?.stats?.active_days ?? 21}
                        />
                        <ActivityHeatmap />
                    </div>

                    {/* Middle Row — Contests + Problems */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Total Contests */}
                        <div className="stat-card p-6">
                            <h3 className="text-gray-400 font-medium mb-4">Total Contests</h3>
                            <div className="flex items-start gap-8">
                                <p className="text-6xl font-bold text-white">7</p>
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-purple-900/30 rounded-lg flex items-center justify-center">
                                                <span className="text-purple-400 text-xs font-bold">CC</span>
                                            </div>
                                            <span className="font-medium text-sm text-gray-300">CodeChef</span>
                                        </div>
                                        <span className="font-bold text-lg text-white">5</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-900/30 rounded-lg flex items-center justify-center">
                                                <span className="text-blue-400 text-xs font-bold">CF</span>
                                            </div>
                                            <span className="font-medium text-sm text-gray-300">CodeForces</span>
                                        </div>
                                        <span className="font-bold text-lg text-white">2</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ProblemsSolved
                            total={data?.stats?.total_solved ?? 2}
                            easy={data?.stats?.easy ?? 2}
                            medium={data?.stats?.medium ?? 0}
                            hard={data?.stats?.hard ?? 0}
                        />
                    </div>

                    {/* Rating Graph */}
                    <RatingChart />

                    {/* Bottom Row — Awards + Rankings + CP */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Awards />
                        <ContestRankings />

                        {/* Competitive Programming */}
                        <div className="stat-card p-6">
                            <h3 className="text-gray-400 font-medium mb-4 text-center">Competitive Programming</h3>
                            <div className="flex items-center justify-center mb-4">
                                <div className="relative w-28 h-28">
                                    <svg viewBox="0 0 36 36" className="circular-chart">
                                        <path
                                            className="circle-bg"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className="circle"
                                            stroke="#22c55e"
                                            strokeDasharray="85, 100"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            className="circle"
                                            stroke="#fbbf24"
                                            strokeDasharray="10, 100"
                                            strokeDashoffset="-85"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">82</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-green-900/20 border border-green-800/30 rounded-lg">
                                    <span className="text-green-400 font-medium text-sm">Codechef</span>
                                    <span className="font-bold text-green-400">79</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
                                    <span className="text-yellow-400 font-medium text-sm">Codeforces</span>
                                    <span className="font-bold text-yellow-400">3</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DSA Topic Analysis */}
                    <TopicAnalysis />
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-[#1f1f1f]">
                <div className="flex flex-wrap justify-center gap-8 mb-6">
                    {["FAQ", "Contact Us", "Privacy", "Timeline", "Terms", "Refund Policy"].map((link) => (
                        <a key={link} href="#" className="text-gray-500 hover:text-white font-medium text-sm transition-colors">
                            {link}
                        </a>
                    ))}
                </div>
                <p className="text-center text-gray-600 text-sm">© 2026 CodeBoard, Inc. All rights reserved.</p>
            </footer>
        </div>
    )
}
