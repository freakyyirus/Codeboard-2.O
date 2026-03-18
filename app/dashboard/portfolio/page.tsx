import { Briefcase, Building, MapPin, Edit3, ExternalLink } from "lucide-react"
import Link from "next/link"
import { getPortfolioData } from "@/lib/portfolio-actions"
import { auth } from "@clerk/nextjs/server"

export default async function PortfolioPage() {
    // 1. Fetch user data securely on the server
    const { userId } = await auth()

    // Fetch their portfolio
    const data = await getPortfolioData()
    const p = data.profile

    // Fallbacks if profile not setup yet
    if (!p) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-gray-400 mb-2">
                    <Briefcase className="w-10 h-10" />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-white mb-3">Setup Your Portfolio</h1>
                    <p className="text-gray-400 max-w-md mx-auto text-lg">
                        Turn your CodeBoard activity into a beautiful, shareable developer portfolio in minutes.
                    </p>
                </div>
                <Link
                    href="/dashboard/portfolio/edit"
                    className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                    Create Portfolio →
                </Link>
            </div>
        )
    }

    // Determine Theme Colors
    const isPurple = p.theme_color === 'purple'
    const isBlue = p.theme_color === 'blue'
    const isGreen = p.theme_color === 'green'
    const themeGradient = isPurple ? "from-purple-400 to-blue-400" :
        isBlue ? "from-blue-400 to-cyan-400" :
            isGreen ? "from-green-400 to-emerald-400" :
                "from-orange-400 to-amber-400"

    const themeBg = isPurple ? "bg-purple-500/10 border-purple-500/20 text-purple-400" :
        isBlue ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
            isGreen ? "bg-green-500/10 border-green-500/20 text-green-400" :
                "bg-orange-500/10 border-orange-500/20 text-orange-400"

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12">

            {/* Top Action Bar */}
            <div className="flex justify-end mb-4">
                <Link
                    href="/dashboard/portfolio/edit"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10 text-sm font-medium"
                >
                    <Edit3 className="w-4 h-4" /> Edit Portfolio
                </Link>
            </div>

            {/* Header / Intro Card */}
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-3xl bg-[#111113] border border-white/[0.06] relative overflow-hidden shadow-2xl">
                {/* Decorative background glow */}
                <div className={`absolute -top-32 -left-32 w-64 h-64 blur-[100px] rounded-full pointer-events-none ${isPurple ? 'bg-purple-500/20' : isBlue ? 'bg-blue-500/20' : isGreen ? 'bg-green-500/20' : 'bg-orange-500/20'}`} />
                <div className={`absolute -bottom-32 -right-32 w-64 h-64 blur-[100px] rounded-full pointer-events-none ${isPurple ? 'bg-blue-500/20' : isBlue ? 'bg-cyan-500/20' : isGreen ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`} />

                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1a1a1c] to-[#0c0c0c] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative shadow-lg z-10">
                    <span className={`text-5xl font-extrabold bg-gradient-to-br ${themeGradient} bg-clip-text text-transparent`}>
                        {p.headline ? p.headline.charAt(0).toUpperCase() : "U"}
                    </span>
                </div>

                <div className="flex-1 text-center md:text-left z-10 w-full">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                        <div>
                            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Your Portfolio</h1>
                            <p className="text-lg text-gray-400 max-w-2xl font-medium">
                                {p.headline || "Developer"}
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-4 mt-3 text-sm text-gray-500">
                                {p.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {p.location}</span>}
                                {p.company && <span className="flex items-center gap-1.5"><Building className="w-4 h-4" /> {p.company}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* About Section */}
                    {p.bio && (
                        <div className="p-8 rounded-3xl bg-[#111113]/80 border border-white/[0.04]">
                            <h2 className="text-xl font-bold text-white mb-4">About Me</h2>
                            <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                                {p.bio}
                            </p>
                        </div>
                    )}

                    {/* Placeholder for when we add dynamic items */}
                    <div className="p-8 rounded-3xl bg-[#111113]/80 border border-white/[0.04] border-dashed text-center">
                        <p className="text-gray-500 text-sm">Skills, Projects, Education & Experience will appear here once added in the Editor.</p>
                    </div>

                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Link Sharing Card */}
                    {p.custom_url_slug && p.is_public && (
                        <div className="p-8 rounded-3xl bg-[#111113] border border-white/[0.06]">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Public Link</h2>
                            <a
                                href={`/portfolio/${p.custom_url_slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className={`flex items-center justify-between p-3 rounded-xl border transition-all group ${themeBg}`}
                            >
                                <span className="font-medium truncate">codeboard.dev/portfolio/{p.custom_url_slug}</span>
                                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
