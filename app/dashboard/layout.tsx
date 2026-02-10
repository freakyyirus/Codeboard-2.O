"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Code,
    Trophy,
    Terminal as TerminalIcon,
    Map,
    Search,
    Bell,
    Settings,
    ChevronDown,
} from "lucide-react"

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Code, label: "Problems", href: "/dashboard/problems" },
    { icon: Trophy, label: "Contests", href: "/dashboard/contests" },
    { icon: TerminalIcon, label: "Studio", href: "/dashboard/studio" },
    { icon: Map, label: "Roadmap", href: "/dashboard/roadmap" },
]

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="h-screen flex bg-[var(--background)] overflow-hidden">
            {/* Sidebar — 280px fixed, committed layout */}
            <aside className="w-[280px] bg-[var(--surface)] border-r border-[var(--border)] flex flex-col h-full shrink-0">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-[var(--border)]">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-[6px] border border-[var(--border)] bg-[var(--background)] flex items-center justify-center">
                            <TerminalIcon className="w-4 h-4 text-[var(--primary)]" strokeWidth={1.5} />
                        </div>
                        <span className="font-semibold text-base tracking-tight text-[var(--foreground)]">
                            CodeBoard
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="px-4 py-6 flex-1 overflow-y-auto">
                    <div className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 h-10 px-3 text-sm rounded-[6px] transition-all duration-150 ${isActive
                                        ? "text-[var(--foreground)] border-l-2 border-[var(--primary)] bg-[var(--primary)]/[0.06] pl-[10px]"
                                        : "text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--elevated)] hover:pl-[14px]"
                                        }`}
                                >
                                    <item.icon
                                        className={`w-[18px] h-[18px] ${isActive ? "text-[var(--primary)]" : ""}`}
                                        strokeWidth={1.5}
                                    />
                                    <span>{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </nav>

                {/* User Profile — bottom */}
                <div className="p-4 border-t border-[var(--border)]">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-[var(--elevated)] border-2 border-[var(--border)] flex items-center justify-center text-xs text-[var(--foreground)] font-medium">
                            JD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[var(--foreground)] truncate">John Doe</p>
                            <p className="text-xs text-[var(--text-tertiary)] truncate">Pro Member</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="h-16 border-b border-[var(--border)] flex items-center justify-between px-8 bg-[var(--background)]/80 backdrop-blur-sm sticky top-0 z-10">
                    {/* Search */}
                    <div className="w-full max-w-xl relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] w-[18px] h-[18px]" strokeWidth={1.5} />
                        <input
                            placeholder="Search problems, users, or tags..."
                            className="w-full bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--text-tertiary)] pl-10 pr-16 h-10 rounded-[6px] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-medium text-[var(--text-tertiary)] bg-[var(--background)] border border-[var(--border)] rounded">
                                ⌘K
                            </kbd>
                        </div>
                    </div>

                    {/* Right section */}
                    <div className="flex items-center gap-4 ml-6">
                        <button className="relative text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
                            <Bell className="w-[18px] h-[18px]" strokeWidth={1.5} />
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[var(--error)] rounded-full border-2 border-[var(--background)]" />
                        </button>
                        <div className="h-5 w-px bg-[var(--border)]" />
                        {/* Platform status indicators */}
                        <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-tertiary)]">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[var(--success)]" />
                                LeetCode
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[var(--warning)]" />
                                Codeforces
                            </span>
                        </div>
                        <div className="h-5 w-px bg-[var(--border)]" />
                        <Link href="/dashboard/settings" className="text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
                            <Settings className="w-[18px] h-[18px]" strokeWidth={1.5} />
                        </Link>
                    </div>
                </header>

                {/* Content — asymmetric padding */}
                <div className="flex-1 overflow-y-auto pt-8 px-8 pb-12">
                    {children}
                </div>
            </main>
        </div>
    )
}
