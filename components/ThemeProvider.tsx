"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Theme = "dark" | "light"

interface ThemeContextValue {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: "dark",
    toggleTheme: () => { },
})

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark")
    const [mounted, setMounted] = useState(false)

    // Load saved theme on mount
    useEffect(() => {
        setMounted(true)
        const saved = localStorage.getItem("codeboard-theme") as Theme | null
        if (saved === "light" || saved === "dark") {
            setTheme(saved)
        }
    }, [])

    // Apply theme class to <html>
    useEffect(() => {
        if (!mounted) return
        const root = document.documentElement
        root.classList.remove("dark", "light")
        root.classList.add(theme)
        root.setAttribute("data-theme", theme)
        localStorage.setItem("codeboard-theme", theme)
    }, [theme, mounted])

    const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"))

    // Prevent hydration mismatch — render children only after mount
    if (!mounted) {
        return (
            <ThemeContext.Provider value={{ theme: "dark", toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        )
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
