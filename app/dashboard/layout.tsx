"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    List,
    Trophy,
    Terminal,
    Map,
    BarChart3,
    Users,
    Settings,
    LogOut,
    Code2
} from "lucide-react"

const sidebarItems = [
    {
        section: "Overview",
        items: [
            { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
            { icon: List, label: "Problems", href: "/dashboard/problems" },
            { icon: Trophy, label: "Contests", href: "/dashboard/contests" },
            { icon: Terminal, label: "Studio", href: "/dashboard/studio", badge: "AI" },
            { icon: Map, label: "Roadmap", href: "/dashboard/roadmap" },
        ]
    },
    {
        section: "Platform",
        items: [
            { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
            { icon: Users, label: "Community", href: "/dashboard/community" },
            { icon: Settings, label: "Settings", href: "/dashboard/settings" },
        ]
    }
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="flex h-screen overflow-hidden bg-black text-white selection:bg-blue-500/30">
            {/* ─── Sidebar ─────────────────────────────── */}
            <aside className="w-64 bg-black border-r border-[#1f1f1f] flex flex-col hidden md:flex">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        <Code2 className="w-5 h-5 text-black" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">CodeBoard</span>
                </div>

                <nav className="flex-1 px-4 space-y-6 overflow-y-auto py-4">
                    {sidebarItems.map((group) => (
                        <div key={group.section}>
                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                                {group.section}
                            </div>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive
                                                ? "bg-white/10 text-white shadow-lg shadow-blue-900/10 border border-white/5"
                                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-blue-400" : "text-gray-400 group-hover:text-white"}`} />
                                            <span>{item.label}</span>
                                            {item.badge && (
                                                <span className="ml-auto text-[10px] font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-[#1f1f1f]">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold border border-white/10 group-hover:border-white/30">
                            YS
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">Yuvraj Singh</p>
                            <p className="text-xs text-gray-500">Pro Plan</p>
                        </div>
                        <button className="text-gray-500 hover:text-white transition-colors">
                            <LogOut className="w-4 h-4" />
                        </button>
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
