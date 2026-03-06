"use client"

import { useState, useEffect } from "react"
import { PREDEFINED_ROADMAPS, type Roadmap } from "@/lib/roadmaps"
import { Plus, CheckCircle2, ArrowRight, Trash2, Map, ExternalLink, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function RoadmapPage() {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>(PREDEFINED_ROADMAPS)
    const [activeRoadmap, setActiveRoadmap] = useState<Roadmap | null>(null)
    const [customTask, setCustomTask] = useState("")
    const [filter, setFilter] = useState("All")
    const [search, setSearch] = useState("")

    // Load predefined roadmap progress from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('cb_roadmap_progress')
            if (saved) {
                const progress: Record<string, Record<string, string>> = JSON.parse(saved)
                setRoadmaps(prev => prev.map(r => {
                    const roadmapProgress = progress[r.id]
                    if (!roadmapProgress) return r
                    return {
                        ...r,
                        steps: r.steps.map(s => ({
                            ...s,
                            status: (roadmapProgress[s.id] as "pending" | "in-progress" | "completed") || s.status
                        }))
                    }
                }))
            }
        } catch (e) {
            console.error('Failed to load roadmap progress:', e)
        }
    }, [])

    // Fetch custom roadmaps from DB on mount
    useEffect(() => {
        const fetchCustomRoadmaps = async () => {
            try {
                const res = await fetch("/api/roadmaps")
                if (res.ok) {
                    const dbRoadmaps = await res.json()
                    // Format DB roadmaps to match UI interface
                    const formattedRoadmaps = dbRoadmaps.map((r: any) => ({
                        id: r.id,
                        title: r.title,
                        description: r.description || "Your custom habitual tasks and goals.",
                        icon: r.icon || "✨",
                        color: r.color || "#a855f7",
                        category: r.category || "Custom",
                        steps: r.steps ? r.steps.map((s: any) => ({
                            id: s.id,
                            title: s.title,
                            description: s.description || "Custom task",
                            resources: [],
                            status: s.status || "pending"
                        })) : []
                    }))

                    if (formattedRoadmaps.length > 0) {
                        setRoadmaps(prev => {
                            // Filter out existing DB roadmaps to avoid duplicates on strict mode remounts
                            const predefined = prev.filter(p => !formattedRoadmaps.find((f: any) => f.id === p.id))
                            return [...predefined, ...formattedRoadmaps]
                        })
                    }
                }
            } catch (e) {
                console.error("Failed to fetch custom roadmaps from DB", e)
            }
        }

        fetchCustomRoadmaps()
    }, [])

    const categories = ["All", ...Array.from(new Set(PREDEFINED_ROADMAPS.map(r => r.category)))]

    const filteredRoadmaps = roadmaps.filter(r => {
        if (r.category === "Custom") return false
        const matchesFilter = filter === "All" || r.category === filter
        const matchesSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const handleAddCustomTask = async () => {
        if (!customTask.trim()) return

        let customRoadmap = roadmaps.find(r => r.id === "custom-user")
        let newRoadmaps = [...roadmaps]

        const isNewRoadmap = !customRoadmap

        if (!customRoadmap) {
            customRoadmap = {
                id: "custom-user",
                title: "My Personal Roadmap",
                description: "Your custom habitual tasks and goals.",
                icon: "✨",
                color: "#a855f7",
                category: "Custom",
                steps: []
            }
            newRoadmaps.push(customRoadmap)
        }

        const newTask = {
            id: `custom-${Date.now()}`,
            title: customTask,
            description: "Custom task",
            resources: [],
            status: "pending" as const
        }

        const updatedRoadmap = {
            ...customRoadmap,
            steps: [...customRoadmap.steps, newTask]
        }

        newRoadmaps = newRoadmaps.map(r => r.id === "custom-user" ? updatedRoadmap : r)

        // Optimistic UI update
        setRoadmaps(newRoadmaps)
        setCustomTask("")

        // DB Persistence
        try {
            if (isNewRoadmap) {
                await fetch("/api/roadmaps", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "UPSERT_ROADMAP", payload: customRoadmap })
                });
            }

            await fetch("/api/roadmaps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "UPSERT_STEP",
                    payload: {
                        id: newTask.id,
                        roadmap_id: customRoadmap.id,
                        title: newTask.title,
                        description: newTask.description,
                        status: newTask.status
                    }
                })
            });
        } catch (e) {
            console.error("Failed to save habit to DB", e)
        }
    }

    const removeCustomTask = async (stepId: string) => {
        const newRoadmaps = roadmaps.map(r => {
            if (r.id === "custom-user") {
                return { ...r, steps: r.steps.filter(s => s.id !== stepId) }
            }
            return r
        })

        // Optimistic update
        setRoadmaps(newRoadmaps)

        // DB Persistence
        try {
            await fetch("/api/roadmaps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "DELETE_STEP", payload: { id: stepId } })
            });
        } catch (e) {
            console.error("Failed to delete habit from DB", e)
        }
    }

    const toggleStatus = async (roadmapId: string, stepId: string) => {
        let toggledStep: any = null;
        let pRoadmap: any = null;

        const newRoadmaps = roadmaps.map(r => {
            if (r.id === roadmapId) {
                pRoadmap = r;
                return {
                    ...r,
                    steps: r.steps.map(s => {
                        if (s.id === stepId) {
                            toggledStep = { ...s, status: s.status === "completed" ? "pending" : "completed" };
                            return toggledStep;
                        }
                        return s
                    })
                }
            }
            return r
        })

        // Optimistic update
        setRoadmaps(newRoadmaps)

        // Update activeRoadmap if this is the currently viewed one
        if (activeRoadmap?.id === roadmapId) {
            setActiveRoadmap(newRoadmaps.find(r => r.id === roadmapId) || null)
        }

        if (pRoadmap?.category === "Custom") {
            // Custom roadmaps persist to DB
            if (toggledStep) {
                try {
                    await fetch("/api/roadmaps", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            action: "UPSERT_STEP",
                            payload: {
                                id: toggledStep.id,
                                roadmap_id: pRoadmap.id,
                                title: toggledStep.title,
                                description: toggledStep.description,
                                status: toggledStep.status
                            }
                        })
                    });
                } catch (e) {
                    console.error("Failed to update habit status in DB", e)
                }
            }
        } else {
            // Predefined roadmaps persist to localStorage
            try {
                const saved = localStorage.getItem('cb_roadmap_progress')
                const progress: Record<string, Record<string, string>> = saved ? JSON.parse(saved) : {}
                if (!progress[roadmapId]) progress[roadmapId] = {}
                if (toggledStep) {
                    progress[roadmapId][stepId] = toggledStep.status
                }
                localStorage.setItem('cb_roadmap_progress', JSON.stringify(progress))
            } catch (e) {
                console.error('Failed to save roadmap progress:', e)
            }
        }
    }

    const customRoadmap = roadmaps.find(r => r.id === "custom-user")

    return (
        <div className="p-4 md:p-8 space-y-8 fade-in min-h-screen max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <Map className="w-6 h-6 text-blue-400" />
                        </div>
                        Learning Roadmaps
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">Structured paths to master new technologies. Click a roadmap to explore its steps.</p>
                </div>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search roadmaps..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 placeholder:text-gray-600"
                    />
                </div>
                <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${filter === cat
                                ? "bg-white/10 text-white"
                                : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Predefined Roadmaps Grid */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AnimatePresence mode="popLayout">
                            {filteredRoadmaps.map((roadmap, idx) => {
                                const completed = roadmap.steps.filter(s => s.status === "completed").length
                                const total = roadmap.steps.length
                                const pct = total > 0 ? Math.round((completed / total) * 100) : 0

                                return (
                                    <motion.div
                                        key={roadmap.id}
                                        layout
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2, delay: idx * 0.03 }}
                                        onClick={() => setActiveRoadmap(activeRoadmap?.id === roadmap.id ? null : roadmap)}
                                        className={`group p-5 rounded-2xl border cursor-pointer transition-all hover:translate-y-[-2px] ${activeRoadmap?.id === roadmap.id
                                            ? "border-white/20 bg-white/[0.06] shadow-lg"
                                            : "bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div
                                                className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl"
                                                style={{ backgroundColor: `${roadmap.color}15` }}
                                            >
                                                {roadmap.icon}
                                            </div>
                                            <span
                                                className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md"
                                                style={{ color: roadmap.color, backgroundColor: `${roadmap.color}15` }}
                                            >
                                                {roadmap.category}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-bold text-white mb-1 group-hover:text-white/90">{roadmap.title}</h3>
                                        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{roadmap.description}</p>

                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-700"
                                                    style={{ width: `${pct}%`, backgroundColor: roadmap.color }}
                                                />
                                            </div>
                                            <span className="text-xs font-mono text-gray-400 w-8 text-right">{pct}%</span>
                                        </div>
                                        <div className="text-[10px] text-gray-600 mt-2">{total} steps • {completed} completed</div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Active Roadmap Detail */}
                    <AnimatePresence>
                        {activeRoadmap && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-2xl">{activeRoadmap.icon}</span>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">{activeRoadmap.title}</h2>
                                        <p className="text-xs text-gray-500">{activeRoadmap.description}</p>
                                    </div>
                                </div>

                                <div className="relative space-y-4">
                                    {/* Vertical Line */}
                                    <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-white/5 -z-10" />

                                    {activeRoadmap.steps.map((step, idx) => (
                                        <motion.div
                                            key={step.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.04 }}
                                            className="flex gap-4 group"
                                        >
                                            <button
                                                onClick={(e) => { e.stopPropagation(); toggleStatus(activeRoadmap.id, step.id); }}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 transition-all bg-black ${step.status === "completed"
                                                    ? "text-green-500"
                                                    : "border-gray-700 text-transparent hover:border-gray-500"
                                                    }`}
                                                style={step.status === "completed" ? { borderColor: "#22c55e" } : {}}
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                            <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-xl p-4 hover:bg-white/[0.05] transition-colors">
                                                <h4 className={`font-semibold text-sm text-white ${step.status === "completed" ? "line-through text-gray-500" : ""}`}>
                                                    {step.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                                                {step.resources.length > 0 && (
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {step.resources.map(res => (
                                                            <a
                                                                key={res.url}
                                                                href={res.url}
                                                                target="_blank"
                                                                rel="noopener"
                                                                className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/5 px-2 py-1 rounded-md border border-blue-500/10 hover:border-blue-500/20 transition-colors"
                                                            >
                                                                {res.title} <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Custom Habits Sidebar */}
                <div className="space-y-4">
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sticky top-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                ✨ Your Habits
                            </h3>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md">Custom</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">Track daily habits and personal goals. Hit the + to add.</p>

                        <div className="flex gap-2 mb-6">
                            <input
                                type="text"
                                value={customTask}
                                onChange={(e) => setCustomTask(e.target.value)}
                                placeholder="Add new habit..."
                                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 placeholder:text-gray-600"
                                onKeyDown={(e) => e.key === 'Enter' && handleAddCustomTask()}
                            />
                            <button
                                onClick={handleAddCustomTask}
                                disabled={!customTask.trim()}
                                className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-3 flex items-center justify-center transition-colors disabled:opacity-30"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {(!customRoadmap || customRoadmap.steps.length === 0) && (
                                <div className="text-center text-gray-600 text-xs py-8 border border-dashed border-white/5 rounded-xl">
                                    No habits yet. Start adding!
                                </div>
                            )}
                            {customRoadmap?.steps.map(step => (
                                <div key={step.id} className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5 group hover:border-white/10 transition-colors">
                                    <button
                                        onClick={() => toggleStatus("custom-user", step.id)}
                                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0 ${step.status === "completed"
                                            ? "bg-green-500/20 border-green-500 text-green-500"
                                            : "border-gray-600 hover:border-gray-400"
                                            }`}
                                    >
                                        {step.status === "completed" && <CheckCircle2 className="w-3.5 h-3.5" />}
                                    </button>
                                    <span className={`text-sm text-gray-200 flex-1 ${step.status === "completed" ? "line-through text-gray-500" : ""}`}>
                                        {step.title}
                                    </span>
                                    <button
                                        onClick={() => removeCustomTask(step.id)}
                                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-600 hover:text-red-400 transition-all"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
