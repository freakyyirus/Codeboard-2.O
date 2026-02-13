"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Brain,
    Trophy,
    Terminal,
    Map,
    User,
    ChevronDown,
    Activity,
    Users,
    Settings
} from "lucide-react"

/* ─── Mock Data ────────────────────────────────────────── */

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Brain, label: "Problems", href: "/dashboard/problems" },
    { icon: Trophy, label: "Contests", href: "/dashboard/contests" },
    { icon: Terminal, label: "Studio", href: "/dashboard/studio" },
    { icon: Map, label: "Roadmap", href: "/dashboard/roadmap" },
]

const sectionItems = [
    { icon: Activity, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Users, label: "Community", href: "/dashboard/community" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

/* ─── Components ───────────────────────────────────────── */

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="h-screen flex bg-[var(--background)] overflow-hidden font-sans text-[var(--test-secondary)] selection:bg-[var(--primary)] selection:text-white">

            {/* ─── Sidebar (Fixed 240px as per PRD) ─────────────────── */}
            <aside className="fixed left-0 top-0 w-[240px] h-screen bg-[var(--background)] border-r border-[var(--border)] flex flex-col z-40">

                {/* Logo Area (64px) */}
                <div className="h-16 flex items-center px-4 gap-2 shrink-0">
                    <Terminal className="w-5 h-5 text-[var(--primary)]" strokeWidth={2} />
                    <span className="font-display font-semibold text-lg tracking-tight text-[var(--foreground)]">
                        CodeBoard
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 h-9 px-3 text-[14px] rounded-[6px] transition-all duration-150 group relative ${isActive
                                        ? "bg-[rgba(0,112,243,0.1)] text-[var(--foreground)] font-medium"
                                        : "text-[var(--text-secondary)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
                                    }`}
                            >
                                <item.icon
                                    className={`w-4 h-4 transition-colors ${isActive ? "text-[var(--primary)]" : "text-[var(--text-tertiary)] group-hover:text-[var(--foreground)]"
                                        }`}
                                    strokeWidth={1.5}
                                />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}

                    {/* Section Divider */}
                    <div className="pt-4 pb-2 px-3">
                        <span className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">
                            Platform
                        </span>
                    </div>

                    {sectionItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 h-9 px-3 text-[14px] rounded-[6px] transition-all duration-150 group ${pathname === item.href
                                    ? "bg-[rgba(0,112,243,0.1)] text-[var(--foreground)]"
                                    : "text-[var(--text-secondary)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
                                }`}
                        >
                            <item.icon className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--foreground)]" strokeWidth={1.5} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* User Mini-Card (Bottom) */}
                <div className="p-3 border-t border-[var(--border)] mt-auto">
                    <div className="flex items-center gap-3 p-2 rounded-[6px] hover:bg-[var(--secondary)] transition-colors cursor-pointer group">
                        <div className="w-8 h-8 rounded-full bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center overflow-hidden">
                            <span className="font-medium text-xs text-[var(--foreground)]">JD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-medium text-[var(--foreground)] truncate">
                                John Doe
                            </p>
                            <p className="text-[12px] text-[var(--text-tertiary)] truncate">Pro Plan</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                    </div>
                </div>
            </aside>

            {/* ─── Main Content Area (Fluid) ─────────────────────── */}
            <main className="flex-1 ml-[240px] min-w-0 overflow-y-auto bg-[var(--background)]">
                <div className="min-h-full p-8 max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>

        </div>
    )
}
