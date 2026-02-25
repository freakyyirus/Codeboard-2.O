"use client"

import { useTheme } from "./ThemeProvider"
import { motion } from "framer-motion"

export function ThemeToggle({ collapsed }: { collapsed?: boolean }) {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === "dark"

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative flex items-center gap-2 w-full
                ${collapsed ? "justify-center px-2" : "px-3"}
                py-2.5 rounded-lg cursor-pointer
                sidebar-item
            `}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <div className="relative w-[18px] h-[18px] shrink-0">
                {/* Sun */}
                <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute inset-0 w-full h-full"
                    initial={false}
                    animate={{
                        scale: isDark ? 0 : 1,
                        rotate: isDark ? -90 : 0,
                        opacity: isDark ? 0 : 1,
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </motion.svg>

                {/* Moon */}
                <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute inset-0 w-full h-full"
                    initial={false}
                    animate={{
                        scale: isDark ? 1 : 0,
                        rotate: isDark ? 0 : 90,
                        opacity: isDark ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </motion.svg>
            </div>

            {!collapsed && (
                <motion.span
                    key={theme}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="text-[13px] font-medium tracking-wide"
                >
                    {isDark ? "Dark Mode" : "Light Mode"}
                </motion.span>
            )}
        </button>
    )
}
