"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { Plus, Trash2, BookOpen, Lock, Globe, Search, MoreVertical, Edit } from "lucide-react"
import Link from "next/link"

interface Notebook {
    id: string
    title: string
    content: Record<string, unknown>
    is_public: boolean
    tags: string[]
    created_at: string
    updated_at: string
}

export default function NotebookPage() {
    const { user, isLoaded } = useUser()
    const [notebooks, setNotebooks] = useState<Notebook[]>([])
    const [loading, setLoading] = useState(true)
    const [showCreate, setShowCreate] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (isLoaded && user) {
            loadNotebooks()
        }
    }, [isLoaded, user])

    const loadNotebooks = async () => {
        try {
            const res = await fetch("/api/notebooks")
            const data = await res.json()
            if (Array.isArray(data)) {
                setNotebooks(data)
            }
        } catch (error) {
            console.error("Failed to load notebooks:", error)
        } finally {
            setLoading(false)
        }
    }

    const createNotebook = async () => {
        if (!newTitle.trim()) return

        try {
            const res = await fetch("/api/notebooks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle }),
            })

            if (res.ok) {
                const notebook = await res.json()
                setNotebooks([notebook, ...notebooks])
                setNewTitle("")
                setShowCreate(false)
            }
        } catch (error) {
            console.error("Failed to create notebook:", error)
        }
    }

    const deleteNotebook = async (id: string) => {
        if (!confirm("Delete this notebook?")) return

        try {
            const res = await fetch(`/api/notebooks?id=${id}`, { method: "DELETE" })
            if (res.ok) {
                setNotebooks(notebooks.filter((n) => n.id !== id))
            }
        } catch (error) {
            console.error("Failed to delete notebook:", error)
        }
    }

    const filtered = notebooks.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    )

    if (!isLoaded || loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <BookOpen className="w-8 h-8 text-purple-400" />
                            Notebooks
                        </h1>
                        <p className="text-gray-400 mt-1">
                            Keep notes, code snippets, and journal entries
                        </p>
                    </div>

                    <button
                        onClick={() => setShowCreate(true)}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Notebook
                    </button>
                </div>

                {showCreate && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#1118] border border-white/10 rounded-xl p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4">Create New Notebook</h2>
                            <input
                                type="text"
                                placeholder="Notebook title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full bg-[#0a0a0b] border border-white/10 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-purple-500"
                                autoFocus
                                onKeyDown={(e) => e.key === "Enter" && createNotebook()}
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={createNotebook}
                                    className="flex-1 bg-purple-600 hover:bg-purple-500 py-2 rounded-lg font-medium"
                                >
                                    Create
                                </button>
                                <button
                                    onClick={() => setShowCreate(false)}
                                    className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search notebooks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#1118] border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 mb-4">
                            {search ? "No notebooks found" : "No notebooks yet"}
                        </p>
                        {!search && (
                            <button
                                onClick={() => setShowCreate(true)}
                                className="text-purple-400 hover:text-purple-300"
                            >
                                Create your first notebook →
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((notebook) => (
                            <div
                                key={notebook.id}
                                className="bg-[#1118] border border-white/10 rounded-xl p-4 hover:border-purple-500/50 transition-colors group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold truncate flex-1">
                                        {notebook.title}
                                    </h3>
                                    <button
                                        onClick={() => deleteNotebook(notebook.id)}
                                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    {notebook.is_public ? (
                                        <Globe className="w-3 h-3 text-green-400" />
                                    ) : (
                                        <Lock className="w-3 h-3 text-gray-500" />
                                    )}
                                    <span className="text-xs text-gray-500">
                                        {new Date(notebook.updated_at).toLocaleDateString()}
                                    </span>
                                </div>

                                {notebook.tags && notebook.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {notebook.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-white/10 px-2 py-0.5 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <Link
                                    href={`/dashboard/notebook/${notebook.id}`}
                                    className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
                                >
                                    <Edit className="w-3 h-3" />
                                    Open Notebook
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}