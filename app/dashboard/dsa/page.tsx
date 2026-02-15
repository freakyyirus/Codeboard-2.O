import { getDailyProblem } from "@/lib/leetcode"
import { Code, BookOpen, Trophy, TrendingUp, Clock, Target, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

/* ─── Server Component ─────────────────────────── */

export default async function DSAPage() {
  let dailyProblem: any = null

  try {
    dailyProblem = await getDailyProblem()
  } catch (e) {
    console.warn("Failed to fetch daily problem:", e)
  }

  const practiceAreas = [
    { title: "Data Structures", icon: <Code className="w-6 h-6" />, description: "Arrays, Linked Lists, Trees, Graphs, Hash Tables", progress: 0, color: "bg-blue-500", topics: 12 },
    { title: "Algorithms", icon: <TrendingUp className="w-6 h-6" />, description: "Sorting, Searching, DP, Greedy, Backtracking", progress: 0, color: "bg-green-500", topics: 15 },
    { title: "Problem Solving", icon: <Target className="w-6 h-6" />, description: "LeetCode, Codeforces, HackerRank, GFG problems", progress: 0, color: "bg-purple-500", topics: 8 },
  ]

  const DIFFICULTY_COLORS: Record<string, string> = {
    Easy: "text-green-400 bg-green-500/10",
    Medium: "text-yellow-400 bg-yellow-500/10",
    Hard: "text-red-400 bg-red-500/10",
  }

  return (
    <div className="max-w-6xl p-6 md:p-8 fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white">
          <BookOpen className="w-7 h-7 text-blue-400" />
          DSA Practice
        </h1>
        <p className="text-gray-500 text-sm">Master Data Structures and Algorithms with daily challenges and curated sheets.</p>
      </header>

      {/* Daily Challenge */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            🔥 Today&apos;s Daily Challenge
          </h2>
          <span className="text-xs text-gray-500">LeetCode Daily</span>
        </div>
        {dailyProblem ? (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[dailyProblem.difficulty] || "text-gray-400 bg-gray-500/10"}`}>
                {dailyProblem.difficulty}
              </span>
              <h3 className="text-white font-semibold">{dailyProblem.title}</h3>
            </div>
            {dailyProblem.topicTags && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {dailyProblem.topicTags.slice(0, 5).map((tag: any) => (
                  <span key={tag.name || tag} className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/5 rounded-full text-gray-400">
                    {tag.name || tag}
                  </span>
                ))}
              </div>
            )}
            <a
              href={`https://leetcode.com${dailyProblem.link || ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Solve Now <ExternalLink size={14} />
            </a>
          </div>
        ) : (
          <div className="text-gray-500 text-sm">
            <p>Unable to fetch today&apos;s daily challenge. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Practice Areas */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-white">Practice Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {practiceAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/5 rounded-xl">{area.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{area.title}</h3>
                  <p className="text-xs text-gray-500">{area.topics} topics</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">{area.description}</p>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div className={`h-full rounded-full ${area.color}`} style={{ width: `${area.progress}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-2">{area.progress}% complete</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/problems" className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
            Problem Set <ArrowRight size={16} />
          </h3>
          <p className="text-sm text-gray-500">Browse curated LeetCode problems with company tags and difficulty filters.</p>
        </Link>
        <Link href="/dashboard/sheets/explore" className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2 group-hover:text-violet-400 transition-colors">
            DSA Sheets <ArrowRight size={16} />
          </h3>
          <p className="text-sm text-gray-500">Follow structured sheets from Striver, Love Babbar, NeetCode, and more.</p>
        </Link>
      </div>
    </div>
  )
}
