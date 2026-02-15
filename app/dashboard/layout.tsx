"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
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
    Send,
    BookOpen,
    Menu,
    X,
    LogOut,
    Trophy,
    MousePointer2
} from "lucide-react"
import { CharacterProvider } from "@/components/DesktopPet"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"
import { CodeBoardLogoSimple } from "@/components/CodeBoardLogo"

function SidebarItem({ icon, label, href, active, onClick }: { icon: React.ReactNode, label: string, href: string, active?: boolean, onClick?: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-200 min-h-[44px] ${active
                ? "bg-white/10 text-white font-semibold"
                : "text-gray-400 hover:bg-white/[0.06] hover:text-gray-200"
                }`}
        >
            <div className={`${active ? "text-white" : "text-gray-500"}`}>
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
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [user, setUser] = useState<{ name: string; email: string; initials: string } | null>(null)

    useEffect(() => {
        const supabase = createBrowserSupabaseClient()
        supabase.auth.getUser().then(({ data: { user: authUser } }) => {
            if (authUser) {
                const name = authUser.user_metadata?.full_name || authUser.user_metadata?.user_name || authUser.email?.split('@')[0] || 'User'
                const email = authUser.email || ''
                const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                setUser({ name, email, initials })
            }
        })
    }, [])

    const handleSignOut = async () => {
        const supabase = createBrowserSupabaseClient()
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <CharacterProvider>
            <div className="flex h-screen overflow-hidden bg-black text-white selection:bg-blue-500/30">
                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* ─── Sidebar ─────────────────────────────── */}
                <aside className={`
                fixed md:relative z-50 h-screen w-64 bg-[#0B0B0B] text-white flex flex-col p-4 border-r border-[#1f1f1f]
                transition-transform duration-200 ease-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                shrink-0
            `}>
                    {/* Logo */}
                    <div className="mb-6 px-2">
                        <CodeBoardLogoSimple />
                    </div>

                    {/* Close button - mobile */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="absolute top-4 right-4 p-2 md:hidden"
                    >
                        <X size={20} />
                    </button>

                    {/* Main */}
                    <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">

                        <SidebarItem
                            icon={<LayoutDashboard size={18} />}
                            label="Dashboard"
                            href="/dashboard"
                            active={pathname === "/dashboard"}
                            onClick={() => setSidebarOpen(false)}
                        />
                        <SidebarItem
                            icon={<BookOpen size={18} />}
                            label="DSA Practice"
                            href="/dashboard/dsa"
                            active={pathname === "/dashboard/dsa"}
                            onClick={() => setSidebarOpen(false)}
                        />
                        <SidebarItem
                            icon={<Code2 size={18} />}
                            label="Dev"
                            href="/dashboard/dev"
                            active={pathname.startsWith("/dashboard/dev")}
                            onClick={() => setSidebarOpen(false)}
                        />
                        <SidebarItem
                            icon={<Users size={18} />}
                            label="Social"
                            href="/dashboard/social"
                            active={pathname.startsWith("/dashboard/social")}
                            onClick={() => setSidebarOpen(false)}
                        />
                        <SidebarItem
                            icon={<Terminal size={18} />}
                            label="CodeBoard IDE"
                            href="/dashboard/studio"
                            active={pathname.startsWith("/dashboard/studio")}
                            onClick={() => setSidebarOpen(false)}
                        />


                        {/* Event Calendar Section */}
                        <div className="mt-6 mb-2 text-xs text-gray-400 uppercase font-semibold px-2">Event Calendar</div>
                        <SidebarItem
                            icon={<CalendarDays size={18} />}
                            label="Contest"
                            href="/dashboard/contests"
                            active={pathname.startsWith("/dashboard/contests")}
                            onClick={() => setSidebarOpen(false)}
                        />
                        <SidebarItem
                            icon={<Rocket size={18} />}
                            label="Hackathon"
                            href="/dashboard/hackathons"
                            active={pathname.startsWith("/dashboard/hackathons")}
                            onClick={() => setSidebarOpen(false)}
                        />

                        {/* Sheets */}
                        <div className="mt-6 mb-2 text-xs text-gray-400 uppercase font-semibold px-2">Sheets</div>
                        <SidebarItem
                            icon={<Compass size={18} />}
                            label="Explore Sheet"
                            href="/dashboard/sheets/explore"
                            active={pathname.startsWith("/dashboard/sheets/explore")}
                            onClick={() => setSidebarOpen(false)}
                        />
                        <SidebarItem
                            icon={<FileText size={18} />}
                            label="My Sheet"
                            href="/dashboard/sheets/my"
                            active={pathname.startsWith("/dashboard/sheets/my")}
                            onClick={() => setSidebarOpen(false)}
                        />

                        {/* Community */}
                        <div className="mt-6 mb-2 text-xs text-gray-400 uppercase font-semibold px-2">Community</div>
                        <SidebarItem
                            icon={<Trophy size={18} />}
                            label="Leaderboard"
                            href="/dashboard/leaderboard"
                            active={pathname.startsWith("/dashboard/leaderboard")}
                            onClick={() => setSidebarOpen(false)}
                        />
                        <SidebarItem
                            icon={<BarChart3 size={18} />}
                            label="Analytics"
                            href="/dashboard/analytics"
                            active={pathname.startsWith("/dashboard/analytics")}
                            onClick={() => setSidebarOpen(false)}
                        />
                        <SidebarItem
                            icon={<MessageCircle size={18} />}
                            label="Community"
                            href="/dashboard/community"
                            active={pathname.startsWith("/dashboard/community")}
                            onClick={() => setSidebarOpen(false)}
                        />

                    </nav>

                    {/* Bottom */}
                    <div className="mt-4 flex flex-col gap-1 pt-4 border-t border-[#1f1f1f]">
                        <SidebarItem
                            icon={<Send size={18} />}
                            label="Feedback"
                            href="/dashboard/feedback"
                            active={pathname.startsWith("/dashboard/feedback")}
                            onClick={() => setSidebarOpen(false)}
                        />
                        <SidebarItem
                            icon={<Settings size={18} />}
                            label="Setting"
                            href="/dashboard/settings"
                            active={pathname.startsWith("/dashboard/settings")}
                            onClick={() => setSidebarOpen(false)}
                        />

                        <div className="flex items-center gap-3 p-2 mt-2 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold border border-white/10 group-hover:border-white/30">
                                {user?.initials || '??'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{user?.name || 'Loading...'}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="p-1.5 rounded-md text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                title="Sign out"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>

                </aside>

                {/* ─── Main Area ───────────────────────────── */}
                <main className="flex-1 overflow-hidden relative bg-black flex">
                    {/* Content Area */}
                    <div className="flex-1 overflow-hidden">
                        {/* Mobile header with hamburger */}
                        <div className="md:hidden flex items-center p-4 border-b border-[#1f1f1f]">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                            >
                                <Menu size={24} />
                            </button>
                        </div>

                        {/* Background ambient glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

                        <div className="h-full overflow-y-auto">
                            {children}
                        </div>
                    </div>

                </main>
            </div>
        </CharacterProvider>
    )
}
