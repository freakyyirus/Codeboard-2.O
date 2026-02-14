"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Code2,
    Users,
    Terminal,
    CalendarDays,
    Rocket,
    Compass,
    FileText,
    BarChart3,
    MessageCircle,
    Settings,
    Send
} from "lucide-react"

function SidebarItem({ icon, label, href, active }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${active
                ? "bg-white/10 text-white font-medium border border-white/5"
                : "text-gray-400 hover:bg-[#1a1a1a] hover:text-gray-200"
                }`}
        >
            <div className={`${active ? "text-blue-400" : "text-gray-500"}`}>
                {icon}
            </div>
            <span className="text-sm">{label}</span>
        </Link>
    )
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="flex h-screen overflow-hidden bg-black text-white selection:bg-blue-500/30">
            {/* ─── Sidebar ─────────────────────────────── */}
            {/* ─── Sidebar ─────────────────────────────── */}
            <aside className="h-screen w-64 bg-[#0B0B0B] text-white flex flex-col p-4 border-r border-[#1f1f1f] hidden md:flex shrink-0">

                {/* Logo */}
                <div className="text-xl font-semibold mb-6 flex items-center gap-2 px-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <span>CodeBoard</span>
                </div>

                {/* Main */}
                <nav className="flex flex-col gap-1 flex-1 overflow-y-auto custom-scrollbar">

                    <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" href="/dashboard" active={pathname === "/dashboard"} />
                    <SidebarItem icon={<Code2 size={18} />} label="Dev" href="/dashboard/dev" active={pathname === "/dashboard/dev"} />
                    <SidebarItem icon={<Users size={18} />} label="Social" href="/dashboard/social" active={pathname.startsWith("/dashboard/social")} />
                    <SidebarItem icon={<Terminal size={18} />} label="CodeBoard IDE" href="/dashboard/studio" active={pathname.startsWith("/dashboard/studio")} />

                    {/* Event Calendar Section */}
                    <div className="mt-6 mb-2 text-xs text-gray-400 uppercase font-semibold px-2">Event Calendar</div>
                    <SidebarItem icon={<CalendarDays size={18} />} label="Contest" href="/dashboard/contests" active={pathname.startsWith("/dashboard/contests")} />
                    <SidebarItem icon={<Rocket size={18} />} label="Hackathon" href="/dashboard/hackathons" active={pathname.startsWith("/dashboard/hackathons")} />

                    {/* Sheets */}
                    <div className="mt-6 mb-2 text-xs text-gray-400 uppercase font-semibold px-2">Sheets</div>
                    <SidebarItem icon={<Compass size={18} />} label="Explore Sheet" href="/dashboard/sheets/explore" active={pathname.startsWith("/dashboard/sheets/explore")} />
                    <SidebarItem icon={<FileText size={18} />} label="My Sheet" href="/dashboard/sheets/my" active={pathname.startsWith("/dashboard/sheets/my")} />

                    {/* Community */}
                    <div className="mt-6 mb-2 text-xs text-gray-400 uppercase font-semibold px-2">Community</div>
                    <SidebarItem icon={<BarChart3 size={18} />} label="Leaderboard" href="/dashboard/leaderboard" active={pathname.startsWith("/dashboard/leaderboard")} />
                    <SidebarItem icon={<MessageCircle size={18} />} label="Community" href="/dashboard/community" active={pathname.startsWith("/dashboard/community")} />

                </nav>

                {/* Bottom */}
                <div className="mt-4 flex flex-col gap-1 pt-4 border-t border-[#1f1f1f]">
                    <SidebarItem icon={<Send size={18} />} label="Feedback" href="/dashboard/feedback" active={pathname.startsWith("/dashboard/feedback")} />
                    <SidebarItem icon={<Settings size={18} />} label="Setting" href="/dashboard/settings" active={pathname.startsWith("/dashboard/settings")} />

                    <div className="flex items-center gap-3 p-2 mt-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold border border-white/10 group-hover:border-white/30">
                            YS
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">Yuvraj Singh</p>
                            <p className="text-xs text-gray-500">Pro Plan</p>
                        </div>
                    </div>
                </div>

            </aside>

            {/* ─── Main Area ───────────────────────────── */}
            <main className="flex-1 overflow-hidden relative bg-black">
                {/* Background ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

                <div className="h-full overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
