"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
    Trophy,
    Map,
    PanelLeft,
    Briefcase
} from "lucide-react"
import { CharacterProvider } from "@/components/DesktopPet"
import { CodeBoardLogoSimple } from "@/components/CodeBoardLogo"
import { UserButton } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { motion, AnimatePresence } from "framer-motion"

/* ═══════════════════════════════════════════════════════
   Sidebar Nav Item
   ═══════════════════════════════════════════════════════ */
function SidebarItem({
    icon,
    label,
    href,
    active,
    onClick,
    collapsed,
}: {
    icon: React.ReactNode
    label: string
    href: string
    active?: boolean
    onClick?: () => void
    collapsed?: boolean
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            title={collapsed ? label : undefined}
            className={`
                group relative flex items-center gap-3 
                ${collapsed ? "justify-center px-2" : ""}
                py-1 rounded-lg cursor-pointer
                sidebar-item
                ${active ? "font-semibold sidebar-item-active" : ""}
            `}
        >
            {/* icon */}
            <div
                className="shrink-0"
                style={{ color: active ? "var(--accent)" : "var(--fg-muted)" }}
            >
                {icon}
            </div>

            {/* label */}
            {!collapsed && (
                <span className={`text-[14px] tracking-wide truncate ${active ? "font-semibold" : "font-medium"}`}
                    style={{ color: active ? "var(--fg-primary)" : "var(--fg-secondary)" }}
                >
                    {label}
                </span>
            )}

            {/* Active pip — pointer-events-none so it doesn't steal hover */}
            {active && !collapsed && (
                <div
                    className="absolute right-3 w-1.5 h-1.5 rounded-full pointer-events-none"
                    style={{
                        background: "var(--accent)",
                        boxShadow: "0 0 6px var(--accent)",
                    }}
                />
            )}
        </Link>
    )
}

/* ═══════════════════════════════════════════════════════
   Section Divider with label
   ═══════════════════════════════════════════════════════ */
function SectionHeader({ label, collapsed }: { label: string; collapsed?: boolean }) {
    if (collapsed) {
        return (
            <div className="my-2 mx-auto w-6">
                <div className="h-px" style={{ background: "var(--accent-muted)" }} />
            </div>
        )
    }
    return (
        <div className="mt-4 mb-1 px-3 flex items-center gap-3">
            <span
                className="text-[11px] uppercase font-bold tracking-wider"
                style={{ color: "var(--fg-muted)" }}
            >
                {label}
            </span>
            <div className="h-[1px] flex-1" style={{ background: "var(--border)" }} />
        </div>
    )
}

/* ═══════════════════════════════════════════════════════
   Dashboard Layout
   ═══════════════════════════════════════════════════════ */
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("sidebar-collapsed")
            return saved === "true"
        }
        return false
    })

    // Close on ESC
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && sidebarOpen) {
                setSidebarOpen(false)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [sidebarOpen])

    const toggleCollapsed = () => {
        const next = !collapsed
        setCollapsed(next)
        localStorage.setItem("sidebar-collapsed", String(next))
    }

    const close = () => setSidebarOpen(false)
    const isDark = true

    return (
        <CharacterProvider>
            <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-primary)", color: "var(--fg-primary)" }}>

                {/* ── Mobile backdrop ──────────────── */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 md:hidden"
                            style={{ background: isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }}
                            onClick={close}
                        />
                    )}
                </AnimatePresence>

                {/* ── Sidebar ─────────────────────── */}
                <aside
                    className={`
                        fixed md:relative z-40 h-screen flex flex-col shrink-0 overflow-hidden
                        transition-all duration-300 ease-in-out
                        ${sidebarOpen ? "translate-x-0 w-[256px]" : "-translate-x-full md:translate-x-0"}
                        ${collapsed ? "md:w-[68px]" : "md:w-[256px]"}
                    `}
                    style={{
                        background: "var(--glass-bg)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        borderRight: "1px solid var(--border)",
                        boxShadow: `2px 0 16px var(--shadow-sidebar)`,
                    }}
                >
                    {/* ─ Header ────────────────────── */}
                    <div className={`flex flex-col ${collapsed ? "items-center py-3 gap-2" : "px-3 pt-3 pb-1 gap-1"} ${!sidebarOpen ? "" : "pt-16 md:pt-3"}`}>
                        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} w-full overflow-hidden`}>
                            {collapsed ? (
                                <div
                                    className="w-8 h-8 font-bold flex items-center justify-center rounded-lg text-xs"
                                    style={{
                                        background: isDark ? "#fff" : "#1c1917",
                                        color: isDark ? "#000" : "#faf8f5",
                                    }}
                                >
                                    CB
                                </div>
                            ) : (
                                <CodeBoardLogoSimple />
                            )}
                        </div>

                        {/* Desktop collapse toggle */}
                        <button
                            onClick={toggleCollapsed}
                            className={`
                                hidden md:flex items-center gap-2 p-1.5 rounded-lg
                                transition-colors duration-200 sidebar-item
                                ${collapsed ? "justify-center" : ""}
                            `}
                            title={collapsed ? "Expand" : "Collapse"}
                            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            <PanelLeft size={15} className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
                            {!collapsed && <span className="text-[11px] font-medium">Collapse</span>}
                        </button>
                    </div>

                    {/* ─ Nav Items ─────────────────── */}
                    <nav className="flex flex-col gap-[2px] flex-1 overflow-y-auto overflow-x-hidden px-2 sidebar-scroll pb-2">

                        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" href="/dashboard" active={pathname === "/dashboard"} onClick={close} collapsed={collapsed} />
                        <SidebarItem icon={<BookOpen size={20} />} label="DSA Practice" href="/dashboard/dsa" active={pathname === "/dashboard/dsa"} onClick={close} collapsed={collapsed} />
                        <SidebarItem icon={<Code2 size={20} />} label="Dev" href="/dashboard/dev" active={pathname.startsWith("/dashboard/dev")} onClick={close} collapsed={collapsed} />
                        <SidebarItem icon={<Users size={20} />} label="Social" href="/dashboard/social" active={pathname.startsWith("/dashboard/social")} onClick={close} collapsed={collapsed} />
                        <SidebarItem icon={<Terminal size={20} />} label="CodeBoard IDE" href="/dashboard/studio" active={pathname.startsWith("/dashboard/studio")} onClick={close} collapsed={collapsed} />
                        <SidebarItem icon={<Map size={20} />} label="Roadmap" href="/dashboard/roadmap" active={pathname.startsWith("/dashboard/roadmap")} onClick={close} collapsed={collapsed} />

                        <SectionHeader label="Calendar" collapsed={collapsed} />
                        <SidebarItem icon={<CalendarDays size={20} />} label="Contest" href="/dashboard/contests" active={pathname.startsWith("/dashboard/contests")} onClick={close} collapsed={collapsed} />
                        <SidebarItem icon={<Rocket size={20} />} label="Hackathon" href="/dashboard/hackathons" active={pathname.startsWith("/dashboard/hackathons")} onClick={close} collapsed={collapsed} />

                        <SectionHeader label="Sheets" collapsed={collapsed} />
                        <SidebarItem icon={<Compass size={20} />} label="Explore" href="/dashboard/sheets/explore" active={pathname.startsWith("/dashboard/sheets/explore")} onClick={close} collapsed={collapsed} />
                        <SidebarItem icon={<FileText size={20} />} label="My Sheet" href="/dashboard/sheets/my" active={pathname.startsWith("/dashboard/sheets/my")} onClick={close} collapsed={collapsed} />

                        <SectionHeader label="Community" collapsed={collapsed} />
                        <SidebarItem icon={<MessageCircle size={20} />} label="Discussions" href="/dashboard/community" active={pathname.startsWith("/dashboard/community")} onClick={close} collapsed={collapsed} />
                        <SidebarItem icon={<Trophy size={20} />} label="Leaderboard" href="/dashboard/leaderboard" active={pathname.startsWith("/dashboard/leaderboard")} onClick={close} collapsed={collapsed} />
                        <SidebarItem icon={<BarChart3 size={20} />} label="Analytics" href="/dashboard/analytics" active={pathname.startsWith("/dashboard/analytics")} onClick={close} collapsed={collapsed} />
                    </nav>

                    {/* ─ Bottom ────────────────────── */}
                    <div className="p-2 flex flex-col gap-[2px]" style={{ borderTop: "1px solid var(--border)" }}>

                        <SidebarItem icon={<Briefcase size={20} />} label="Portfolio" href="/dashboard/portfolio" active={pathname.startsWith("/dashboard/portfolio")} onClick={close} collapsed={collapsed} />
                        <SidebarItem icon={<Send size={20} />} label="Feedback" href="/dashboard/feedback" active={pathname.startsWith("/dashboard/feedback")} onClick={close} collapsed={collapsed} />
                        <SidebarItem icon={<Settings size={20} />} label="Settings" href="/dashboard/settings" active={pathname.startsWith("/dashboard/settings")} onClick={close} collapsed={collapsed} />

                        {/* User card */}
                        <div
                            className={`mt-1 flex items-center ${collapsed ? "justify-center" : "gap-3 px-2"} py-1.5 rounded-lg transition-colors`}
                            style={{
                                background: "var(--bg-hover)",
                                border: "1px solid var(--border)",
                            }}
                        >
                            {!collapsed ? (
                                <div className="flex-1 min-w-0">
                                    <UserButton
                                        appearance={{
                                            baseTheme: isDark ? dark : undefined,
                                            elements: {
                                                userButtonBox: "flex-row-reverse w-full justify-between hover:bg-white/5 p-1 rounded-lg transition-colors",
                                                userButtonOuterIdentifier: `${isDark ? "text-white" : "text-gray-900"} text-sm font-medium truncate`,
                                                userButtonPopoverCard: `${isDark ? "bg-[#0a0a0a] border-white/10" : "bg-white border-gray-200"} border shadow-2xl rounded-xl`,
                                                userPreviewMainIdentifier: `${isDark ? "text-white" : "text-gray-900"} font-semibold`,
                                                userPreviewSecondaryIdentifier: `${isDark ? "text-gray-400" : "text-gray-500"} text-xs`,
                                                userButtonPopoverActionButton: `hover:bg-white/5 transition-colors ${isDark ? "text-gray-300" : "text-gray-700"}`,
                                                userButtonPopoverActionButtonText: `${isDark ? "text-gray-300" : "text-gray-700"} font-medium`,
                                                userButtonPopoverActionButtonIcon: `${isDark ? "text-gray-400" : "text-gray-500"}`,
                                                userButtonPopoverFooter: "hidden",
                                                scrollBox: isDark ? "bg-[#0a0a0a]" : "bg-white",
                                            }
                                        }}
                                        showName
                                    />
                                </div>
                            ) : (
                                <UserButton
                                    appearance={{
                                        baseTheme: isDark ? dark : undefined,
                                        elements: {
                                            userButtonPopoverCard: `${isDark ? "bg-[#0a0a0a] border-white/10" : "bg-white border-gray-200"} border shadow-2xl rounded-xl`,
                                            userPreviewMainIdentifier: `${isDark ? "text-white" : "text-gray-900"} font-semibold`,
                                            userPreviewSecondaryIdentifier: `${isDark ? "text-gray-400" : "text-gray-500"} text-xs`,
                                            userButtonPopoverActionButton: `hover:bg-white/5 transition-colors ${isDark ? "text-gray-300" : "text-gray-700"}`,
                                            userButtonPopoverActionButtonText: `${isDark ? "text-gray-300" : "text-gray-700"} font-medium`,
                                            userButtonPopoverActionButtonIcon: `${isDark ? "text-gray-400" : "text-gray-500"}`,
                                            userButtonPopoverFooter: "hidden",
                                            scrollBox: isDark ? "bg-[#0a0a0a]" : "bg-white",
                                        }
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </aside>

                {/* ── Main Content (always dark) ─── */}
                <main className="flex-1 overflow-hidden relative flex flex-col min-w-0 bg-black text-white">

                    {/* Background ambience */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full" />
                        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-purple-900/5 blur-[100px] rounded-full" />
                    </div>

                    {/* Mobile header */}
                    <header
                        className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
                    >
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 -ml-2 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-white/[0.06]"
                                aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                            >
                                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                            <span className="font-bold tracking-tight text-white">CodeBoard</span>
                        </div>
                        <UserButton appearance={{ baseTheme: dark }} />
                    </header>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-6 lg:p-8 relative z-10 w-full">
                        <div className="w-full max-w-[1600px] mx-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </CharacterProvider>
    )
}
