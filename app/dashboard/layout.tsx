"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Code2,
    BrainCircuit,
    Users,
    TerminalSquare,
    CalendarDays,
    Rocket,
    Compass,
    FileText,
    BarChart3,
    MessageCircle,
    Settings,
    Send,
    Trophy,
    Building2,
    Sun,
    PanelLeft,
} from "lucide-react"

interface SidebarSection {
    title?: string
    items: { icon: any; label: string; href: string }[]
}

const sidebarSections: SidebarSection[] = [
    {
        items: [
            { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
            { icon: Code2, label: "Dev", href: "/dashboard/dev" },
            { icon: BrainCircuit, label: "DSA", href: "/dashboard/problems" },
            { icon: Users, label: "Social", href: "/dashboard/social" },
            { icon: TerminalSquare, label: "CodeBoard IDE", href: "/dashboard/studio" },
        ],
    },
    {
        title: "Event Calendar",
        items: [
            { icon: CalendarDays, label: "Contest", href: "/dashboard/contests" },
            { icon: Rocket, label: "Hackathon", href: "/dashboard/hackathon" },
        ],
    },
    {
        title: "Sheets",
        items: [
            { icon: Compass, label: "Explore Sheet", href: "/dashboard/explore" },
            { icon: FileText, label: "My Sheet", href: "/dashboard/sheets" },
        ],
    },
    {
        title: "Community",
        items: [
            { icon: BarChart3, label: "Leaderboard", href: "/dashboard/community" },
            { icon: MessageCircle, label: "Community", href: "/dashboard/social" },
        ],
    },
]

const bottomItems = [
    { icon: Send, label: "Feedback", href: "/dashboard/feedback" },
    { icon: Settings, label: "Setting", href: "/dashboard/settings" },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="flex h-screen overflow-hidden bg-black text-white">
            {/* ─── Sidebar ─────────────────────────────── */}
            <aside className="h-screen w-64 bg-[#0B0B0B] text-white flex-col p-4 border-r border-[#1f1f1f] hidden md:flex">
                {/* Logo */}
                <Link href="/" className="text-xl font-semibold mb-6 block">
                    CodeBoard
                </Link>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 flex-1">
                    {sidebarSections.map((section, i) => (
                        <div key={i}>
                            {section.title && (
                                <div className="mt-4 text-xs text-gray-400 uppercase">
                                    {section.title}
                                </div>
                            )}
                            {section.items.map((item) => {
                                const isActive =
                                    pathname === item.href ||
                                    (item.href !== "/dashboard" && pathname.startsWith(item.href))
                                return (
                                    <Link
                                        key={item.href + item.label}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition text-sm ${isActive
                                            ? "bg-[#1a1a1a] text-white"
                                            : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                                            }`}
                                    >
                                        <item.icon size={18} />
                                        <span>{item.label}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    ))}
                </nav>

                {/* Bottom */}
                <div className="flex flex-col gap-2">
                    {bottomItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#1a1a1a] transition text-sm text-gray-400 hover:text-white"
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </aside>

            {/* ─── Main Area ───────────────────────────── */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-[#0B0B0B] border-b border-[#1f1f1f] px-6 py-3 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
                            <PanelLeft className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 text-xs font-medium rounded-full border border-yellow-800/30">
                            Work in Progress
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                            YS
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
