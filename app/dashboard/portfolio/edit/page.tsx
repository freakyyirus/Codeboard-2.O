"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Check, ChevronRight, ChevronLeft, Save, User, Code2, GraduationCap, Briefcase, Palette } from "lucide-react"

import { updatePortfolioProfile, upsertPortfolioSection } from "@/lib/portfolio-actions"

const STEPS = [
    { id: "basic", icon: User, label: "Basic Info" },
    { id: "skills", icon: Code2, label: "Skills" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "education", icon: GraduationCap, label: "Education" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "theme", icon: Palette, label: "Theme & Publish" },
]

export default function EditPortfolioPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [isSaving, setIsSaving] = useState(false)

    // Form State
    const [profileData, setProfileData] = useState({
        headline: "Full Stack Developer",
        location: "",
        company: "",
        bio: "",
        theme_color: "purple",
        custom_url_slug: "",
        is_public: true
    })

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) setCurrentStep(curr => curr + 1)
    }

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(curr => curr - 1)
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            // Trim and sanitize slug if it exists
            const sanitizedSlug = profileData.custom_url_slug?.trim() || null

            await updatePortfolioProfile({
                headline: profileData.headline,
                location: profileData.location,
                company: profileData.company,
                bio: profileData.bio,
                theme_color: profileData.theme_color,
                custom_url_slug: sanitizedSlug,
                is_public: profileData.is_public
            })

            // TODO: Upsert skills and projects when arrays are implemented

            router.push("/dashboard/portfolio")
            router.refresh()
        } catch (error) {
            console.error("Failed to save:", error)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white">Edit Portfolio</h1>
                    <p className="text-gray-400 mt-1">Customize your public developer profile.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                    {isSaving ? (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    {isSaving ? "Saving..." : "Save & Publish"}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Lateral Navigation (Steps) */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sticky top-24">
                        <nav className="space-y-1">
                            {STEPS.map((step, idx) => {
                                const Icon = step.icon
                                const isActive = currentStep === idx
                                const isPast = currentStep > idx

                                return (
                                    <button
                                        key={step.id}
                                        onClick={() => setCurrentStep(idx)}
                                        className={`
                                            w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium text-sm
                                            ${isActive
                                                ? "bg-white/10 text-white shadow-sm ring-1 ring-white/20"
                                                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"}
                                        `}
                                    >
                                        <div className={`
                                            w-6 h-6 rounded-full flex items-center justify-center shrink-0
                                            ${isActive ? "bg-white text-black" : isPast ? "bg-green-500/20 text-green-400" : "bg-[#1a1a1c] text-gray-500"}
                                        `}>
                                            {isPast ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                                        </div>
                                        {step.label}
                                    </button>
                                )
                            })}
                        </nav>
                    </div>
                </div>

                {/* Form Content Area */}
                <div className="flex-1 min-w-0">
                    <div className="bg-[#111113] border border-white/[0.06] rounded-3xl p-6 md:p-8 min-h-[500px] flex flex-col relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="flex-1"
                            >
                                {/* Step 1: Basic Info */}
                                {currentStep === 0 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-1">Basic Information</h2>
                                            <p className="text-sm text-gray-400">This forms the hero section of your portfolio.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Headline / Professional Title</label>
                                                <input
                                                    type="text"
                                                    value={profileData.headline}
                                                    onChange={e => setProfileData({ ...profileData, headline: e.target.value })}
                                                    className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                                    placeholder="e.g. Full Stack Developer & Innovator"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Location</label>
                                                    <input
                                                        type="text"
                                                        value={profileData.location}
                                                        onChange={e => setProfileData({ ...profileData, location: e.target.value })}
                                                        className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                                        placeholder="e.g. India"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Company / Affiliation</label>
                                                    <input
                                                        type="text"
                                                        value={profileData.company}
                                                        onChange={e => setProfileData({ ...profileData, company: e.target.value })}
                                                        className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                                        placeholder="e.g. CodeBoard"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">About Me (Bio)</label>
                                                <textarea
                                                    rows={5}
                                                    value={profileData.bio}
                                                    onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                                                    className="w-full bg-[#1a1a1c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-y"
                                                    placeholder="Write a short summary about yourself..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Placeholder for other steps */}
                                {currentStep > 0 && currentStep < 5 && (
                                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-20">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400">
                                            <Code2 className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">{STEPS[currentStep].label} Editor</h3>
                                            <p className="text-gray-400 max-w-sm mx-auto">This section will allow you to dynamically add, edit, and reorder your {STEPS[currentStep].label.toLowerCase()}.</p>
                                        </div>
                                        <button className="px-4 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors text-sm">
                                            + Add Item
                                        </button>
                                    </div>
                                )}

                                {/* Step 6: Theme & Publish */}
                                {currentStep === 5 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-1">Theme & Publish Settings</h2>
                                            <p className="text-sm text-gray-400">Choose how your portfolio looks and where it lives.</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-3">Accent Content</label>
                                                <div className="flex gap-4">
                                                    {["purple", "blue", "green", "orange"].map(color => (
                                                        <button
                                                            key={color}
                                                            onClick={() => setProfileData({ ...profileData, theme_color: color })}
                                                            className={`w-12 h-12 rounded-full ring-offset-2 ring-offset-[#111113] transition-all
                                                                ${profileData.theme_color === color ? "ring-2 ring-white scale-110" : "hover:scale-105 opacity-70"}
                                                            `}
                                                            style={{
                                                                background: `var(--${color}-500, ${color === 'purple' ? '#a855f7' :
                                                                    color === 'blue' ? '#3b82f6' :
                                                                        color === 'green' ? '#22c55e' : '#f97316'
                                                                    })`
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1.5">Custom Public URL</label>
                                                <div className="flex rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1c] focus-within:ring-2 focus-within:ring-purple-500/50">
                                                    <div className="px-4 py-3 bg-white/5 text-gray-500 text-sm whitespace-nowrap border-r border-white/10">
                                                        codeboard.dev/portfolio/
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-transparent px-4 py-3 text-white focus:outline-none"
                                                        placeholder="yuvrajsingh"
                                                        value={profileData.custom_url_slug}
                                                        onChange={e => setProfileData({ ...profileData, custom_url_slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-2">Only alphanumeric characters and hyphens allowed.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Footer Controls */}
                        <div className="mt-auto pt-8 flex items-center justify-between border-t border-white/[0.06]">
                            <button
                                onClick={handlePrev}
                                disabled={currentStep === 0}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-0"
                            >
                                <ChevronLeft className="w-4 h-4" /> Previous
                            </button>

                            <div className="flex gap-2">
                                {STEPS.map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? "bg-white" : "bg-white/20"}`} />
                                ))}
                            </div>

                            <button
                                onClick={currentStep === STEPS.length - 1 ? handleSave : handleNext}
                                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                            >
                                {currentStep === STEPS.length - 1 ? "Publish" : "Next"} <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
