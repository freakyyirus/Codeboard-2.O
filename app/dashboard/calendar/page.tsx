"use client"

import { useState } from "react"
import {
    ChevronLeft,
    ChevronRight,
    CalendarDays,
    Clock,
    ExternalLink,
    MapPin,
} from "lucide-react"

/* ─── Mock Data ────────────────────────────────────────── */

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

type ContestEvent = {
    id: number
    title: string
    platform: string
    date: string // "YYYY-MM-DD"
    time: string
    duration: string
    color: string
    link: string
}

const events: ContestEvent[] = [
    { id: 1, title: "Codeforces Round 923", platform: "Codeforces", date: "2026-02-14", time: "20:35 IST", duration: "2h", color: "var(--platform-codeforces)", link: "#" },
    { id: 2, title: "LeetCode Weekly Contest 435", platform: "LeetCode", date: "2026-02-15", time: "08:00 IST", duration: "1.5h", color: "var(--platform-leetcode)", link: "#" },
    { id: 3, title: "HackerRank Hack the Interview", platform: "HackerRank", date: "2026-02-18", time: "19:00 IST", duration: "3h", color: "var(--platform-hackerrank)", link: "#" },
    { id: 4, title: "LeetCode Biweekly Contest 148", platform: "LeetCode", date: "2026-02-22", time: "20:00 IST", duration: "1.5h", color: "var(--platform-leetcode)", link: "#" },
    { id: 5, title: "Codeforces Div 2 Round 924", platform: "Codeforces", date: "2026-02-25", time: "20:35 IST", duration: "2h", color: "var(--platform-codeforces)", link: "#" },
    { id: 6, title: "LeetCode Weekly Contest 436", platform: "LeetCode", date: "2026-03-01", time: "08:00 IST", duration: "1.5h", color: "var(--platform-leetcode)", link: "#" },
    { id: 7, title: "Codeforces Round 925", platform: "Codeforces", date: "2026-03-04", time: "20:35 IST", duration: "2h", color: "var(--platform-codeforces)", link: "#" },
    { id: 8, title: "HackerRank Week of Code", platform: "HackerRank", date: "2026-03-10", time: "00:00 IST", duration: "7d", color: "var(--platform-hackerrank)", link: "#" },
]

/* ─── Helpers ──────────────────────────────────────────── */

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay()
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

/* ─── Component ────────────────────────────────────────── */

export default function CalendarPage() {
    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())

    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    const getEventsForDay = (day: number): ContestEvent[] => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
        return events.filter((e) => e.date === dateStr)
    }

    const upcomingEvents = events
        .filter((e) => new Date(e.date) >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return (
        <div className="max-w-[1200px] mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-[24px] font-display text-[var(--foreground)]">Event Calendar</h1>
                <p className="text-[var(--text-secondary)] text-sm mt-1">
                    Never miss a contest. All platforms, one calendar.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Grid (2/3) */}
                <div className="lg:col-span-2">
                    <div className="border border-[var(--border)] rounded-[12px] bg-[var(--surface)] overflow-hidden">
                        {/* Month Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                            <button onClick={prevMonth} className="p-1.5 rounded-[6px] hover:bg-[var(--elevated)] transition-colors">
                                <ChevronLeft className="w-4 h-4 text-[var(--text-secondary)]" />
                            </button>
                            <h2 className="text-base font-semibold text-[var(--foreground)]">
                                {months[currentMonth]} {currentYear}
                            </h2>
                            <button onClick={nextMonth} className="p-1.5 rounded-[6px] hover:bg-[var(--elevated)] transition-colors">
                                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
                            </button>
                        </div>

                        {/* Week day headers */}
                        <div className="grid grid-cols-7 border-b border-[var(--border)]">
                            {weekDays.map((d) => (
                                <div key={d} className="py-3 text-center text-[11px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Calendar days */}
                        <div className="grid grid-cols-7">
                            {/* Empty cells for days before month start */}
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={`empty-${i}`} className="aspect-square border-b border-r border-[var(--border)] bg-[var(--background)]/30" />
                            ))}

                            {/* Day cells */}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1
                                const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                                const dayEvents = getEventsForDay(day)
                                const hasEvents = dayEvents.length > 0

                                return (
                                    <div
                                        key={day}
                                        className={`aspect-square border-b border-r border-[var(--border)] p-1.5 flex flex-col items-center relative hover:bg-[var(--elevated)]/30 transition-colors cursor-pointer ${isToday ? "bg-[var(--primary)]/[0.06]" : ""
                                            }`}
                                    >
                                        <span className={`text-xs font-mono mb-1 ${isToday
                                            ? "w-6 h-6 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-bold"
                                            : "text-[var(--text-secondary)]"
                                            }`}>
                                            {day}
                                        </span>
                                        {hasEvents && (
                                            <div className="flex gap-0.5 mt-auto">
                                                {dayEvents.map((e) => (
                                                    <div
                                                        key={e.id}
                                                        className="w-1.5 h-1.5 rounded-full"
                                                        style={{ background: e.color }}
                                                        title={e.title}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center gap-5 px-6 py-3 border-t border-[var(--border)]">
                            {[
                                { label: "LeetCode", color: "var(--platform-leetcode)" },
                                { label: "Codeforces", color: "var(--platform-codeforces)" },
                                { label: "HackerRank", color: "var(--platform-hackerrank)" },
                            ].map((p) => (
                                <span key={p.label} className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-tertiary)]">
                                    <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                                    {p.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Upcoming Events (1/3) */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-[var(--primary)]" />
                        <h3 className="text-base font-semibold text-[var(--foreground)]">Upcoming Events</h3>
                    </div>

                    <div className="space-y-3">
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="border border-[var(--border)] rounded-[10px] p-4 bg-[var(--surface)] card-hover-glow" style={{ borderLeft: `3px solid ${event.color}` }}>
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="text-sm font-medium text-[var(--foreground)] leading-tight">{event.title}</h4>
                                    <a href={event.link} className="text-[var(--text-tertiary)] hover:text-[var(--primary)] transition-colors">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] font-mono">
                                        <CalendarDays className="w-3 h-3" />
                                        {formatDate(event.date)}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] font-mono">
                                        <Clock className="w-3 h-3" />
                                        {event.time} · {event.duration}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: event.color }}>
                                        <MapPin className="w-3 h-3" />
                                        {event.platform}
                                    </div>
                                </div>

                                <button className="w-full mt-3 py-1.5 text-xs font-semibold border border-[var(--border)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-colors duration-150 rounded-[6px]">
                                    Register
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
