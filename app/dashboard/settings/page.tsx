"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useSupabase } from "@/hooks/useSupabase"
import {
    ArrowLeft,
    User,
    Users as UserCog,
    Grid3X3,
    Eye,
    Shield,
    Save,
    ExternalLink,
    CheckCircle,
    Loader2,
    Plus,
    Trash2,
    X,
    Pencil,
    Briefcase,
    GraduationCap,
    Award,
    Link as LinkIcon,
    Globe,
    FileText,
    Code2,
} from "lucide-react"
import toast from "react-hot-toast"
import Link from "next/link"

/* ─── Types ────────────────────────────────────── */

interface UserProfile {
    id: string
    email: string
    username: string
    full_name: string
    last_name: string
    avatar_url: string
    bio: string
    country: string
    daily_goal: number
    timezone: string
    skill_level: string
    visibility: "public" | "private"
}

interface Education {
    id: string
    institution: string
    degree: string
    branch: string
    year: string
}

interface Achievement {
    id: string
    title: string
    issuer: string
    date: string
    url: string
}

interface WorkExperience {
    id: string
    company: string
    role: string
    startDate: string
    endDate: string
    description: string
    current: boolean
}

interface Socials {
    linkedin: string
    twitter: string
    website: string
    resume: string
}

interface PlatformConnection {
    platform: string
    username: string
    connected: boolean
    icon: string
    url: string
}

const PLATFORMS: PlatformConnection[] = [
    { platform: "github", username: "", connected: false, icon: "⚫", url: "https://github.com" },
    { platform: "leetcode", username: "", connected: false, icon: "🟡", url: "https://leetcode.com" },
    { platform: "codestudio", username: "", connected: false, icon: "🔶", url: "https://codingninjas.com/codestudio" },
    { platform: "geeksforgeeks", username: "", connected: false, icon: "🟢", url: "https://geeksforgeeks.org" },
    { platform: "interviewbit", username: "", connected: false, icon: "🔵", url: "https://interviewbit.com" },
    { platform: "codechef", username: "", connected: false, icon: "🟤", url: "https://codechef.com" },
    { platform: "codeforces", username: "", connected: false, icon: "🔴", url: "https://codeforces.com" },
    { platform: "hackerrank", username: "", connected: false, icon: "🟩", url: "https://hackerrank.com" },
]

const COUNTRIES = [
    "India", "United States", "United Kingdom", "Canada", "Germany",
    "France", "Australia", "Japan", "South Korea", "Singapore",
    "Brazil", "Netherlands", "Sweden", "Israel", "China", "Other"
]

/* ─── Sidebar Sections ────────────────────────── */

type Section = "basic" | "profile" | "platform" | "visibility" | "accounts"

const SECTIONS: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: "basic", label: "Basic Info", icon: <User size={18} /> },
    { id: "profile", label: "Profile Details", icon: <UserCog size={18} /> },
    { id: "platform", label: "Platform", icon: <Grid3X3 size={18} /> },
    { id: "visibility", label: "Visibility", icon: <Eye size={18} /> },
    { id: "accounts", label: "Accounts", icon: <Shield size={18} /> },
]

type ProfileTab = "about" | "education" | "achievements" | "experience" | "socials"

const PROFILE_TABS: { id: ProfileTab; label: string; icon: React.ReactNode }[] = [
    { id: "about", label: "About Me", icon: <FileText size={16} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={16} /> },
    { id: "achievements", label: "Achievements", icon: <Award size={16} /> },
    { id: "experience", label: "Work Experience", icon: <Briefcase size={16} /> },
    { id: "socials", label: "Socials", icon: <Code2 size={16} /> },
]

/* ─── Component ────────────────────────────────── */

export default function SettingsPage() {
    const { user, isLoaded: userLoaded } = useUser()
    const supabase = useSupabase()

    const [activeSection, setActiveSection] = useState<Section>("basic")
    const [activeProfileTab, setActiveProfileTab] = useState<ProfileTab>("about")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)

    // Basic Info
    const [profile, setProfile] = useState<UserProfile>({
        id: "", email: "", username: "", full_name: "", last_name: "",
        avatar_url: "", bio: "", country: "India", daily_goal: 2,
        timezone: "UTC", skill_level: "beginner", visibility: "public",
    })

    // Profile Details
    const [aboutText, setAboutText] = useState("")
    const [aboutPreview, setAboutPreview] = useState(false)
    const [educations, setEducations] = useState<Education[]>([])
    const [achievements, setAchievements] = useState<Achievement[]>([])
    const [experiences, setExperiences] = useState<WorkExperience[]>([])
    const [socials, setSocials] = useState<Socials>({ linkedin: "", twitter: "", website: "", resume: "" })

    // Platform
    const [platforms, setPlatforms] = useState(PLATFORMS)

    // Accounts
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        if (userLoaded && user) {
            loadUserData()
        } else if (userLoaded && !user) {
            setLoading(false)
        }
    }, [user, userLoaded])

    const loadUserData = async () => {
        if (!user) return

        try {
            const { data: userProfile } = await supabase
                .from("users")
                .select("*")
                .eq("id", user.id)
                .single() as { data: any }

            if (userProfile) {
                setProfile({
                    id: user.id,
                    email: user.primaryEmailAddress?.emailAddress || "",
                    username: userProfile.username || user.username || "",
                    full_name: userProfile.full_name || user.fullName || "",
                    last_name: userProfile.last_name || user.lastName || "",
                    avatar_url: userProfile.avatar_url || user.imageUrl || "",
                    bio: userProfile.bio || "",
                    country: userProfile.country || "India",
                    daily_goal: userProfile.daily_goal || 2,
                    timezone: userProfile.timezone || "UTC",
                    skill_level: userProfile.skill_level || "beginner",
                    visibility: userProfile.visibility || "public",
                })
                if (userProfile.about_text) setAboutText(userProfile.about_text)
                if (userProfile.socials) setSocials(userProfile.socials)
            } else {
                setProfile(prev => ({
                    ...prev,
                    id: user.id,
                    email: user.primaryEmailAddress?.emailAddress || "",
                    username: user.username || "",
                    full_name: user.fullName || "",
                }))
            }

            // Load platform connections
            const { data: connections } = await supabase
                .from("platform_connections")
                .select("*")
                .eq("user_id", user.id) as { data: any[] | null }

            if (connections) {
                setPlatforms(prev => prev.map(p => {
                    const conn = connections.find((c: any) => c.platform === p.platform)
                    return conn ? { ...p, username: conn.username, connected: true } : p
                }))
            }
        } catch (error) {
            console.error("Error loading user data:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${user?.id || 'unknown'}-${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            // 1. Upload file
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            // 2. Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            // 3. Update profile state
            setProfile(prev => ({ ...prev, avatar_url: publicUrl }))

            // 4. Update database immediately
            const { error: updateError } = await (supabase.from("users") as any).upsert({
                id: user?.id,
                avatar_url: publicUrl,
                username: profile.username,
                full_name: profile.full_name,
                updated_at: new Date().toISOString(),
            })

            if (updateError) throw updateError

            toast.success("Avatar updated!")

        } catch (error: any) {
            toast.error(error.message || "Error uploading avatar")
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    const saveBasicInfo = async () => {
        if (!user) return
        setSaving(true)
        const { error } = await (supabase.from("users") as any).upsert({
            id: user.id,
            email: profile.email,
            username: profile.username,
            full_name: profile.full_name,
            last_name: profile.last_name,
            bio: profile.bio,
            country: profile.country,
            daily_goal: profile.daily_goal,
            timezone: profile.timezone,
            skill_level: profile.skill_level,
            visibility: profile.visibility,
            updated_at: new Date().toISOString(),
        })
        if (error) {
            toast.error("Failed to save to database")
            console.error("Database connection error:", error)
        }
        else {
            toast.success("Database Connected: Profile Saved!", {
                icon: "✅",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            })
        }
        setSaving(false)
    }

    const savePlatform = async (platform: string, username: string) => {
        if (!username.trim() || !user) return
        const { error } = await (supabase.from("platform_connections") as any).upsert({
            user_id: user.id, platform, username: username.trim(),
            last_synced: new Date().toISOString(),
        }, { onConflict: "user_id,platform" })
        if (error) { toast.error(`Failed to connect ${platform}`); console.error(error) }
        else {
            setPlatforms(prev => prev.map(p => p.platform === platform ? { ...p, connected: true } : p))
            toast.success(`${platform} connected!`)
        }
    }

    const disconnectPlatform = async (platform: string) => {
        if (!user) return
        await (supabase.from("platform_connections") as any).delete().eq("user_id", user.id).eq("platform", platform)
        setPlatforms(prev => prev.map(p => p.platform === platform ? { ...p, connected: false, username: "" } : p))
        toast.success(`${platform} disconnected`)
    }

    const updatePassword = async () => {
        toast("Password management is handled via Clerk settings.")
    }

    // Education CRUD
    const addEducation = () => setEducations((prev: Education[]) => [...prev, {
        id: Date.now().toString(), institution: "", degree: "", branch: "", year: "",
    }])
    const removeEducation = (id: string) => setEducations((prev: Education[]) => prev.filter(e => e.id !== id))

    // Achievement CRUD
    const addAchievement = () => setAchievements((prev: Achievement[]) => [...prev, {
        id: Date.now().toString(), title: "", issuer: "", date: "", url: "",
    }])
    const removeAchievement = (id: string) => setAchievements((prev: Achievement[]) => prev.filter(a => a.id !== id))

    // Work Experience CRUD
    const addExperience = () => setExperiences((prev: WorkExperience[]) => [...prev, {
        id: Date.now().toString(), company: "", role: "", startDate: "", endDate: "", description: "", current: false,
    }])
    const removeExperience = (id: string) => setExperiences((prev: WorkExperience[]) => prev.filter(e => e.id !== id))

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
            </div>
        )
    }

    return (
        <div className="flex min-h-[calc(100vh-64px)] fade-in">
            {/* ─── Settings Left Sidebar ───────────────────── */}
            <aside className="w-64 min-w-[240px] border-r border-white/10 bg-black/40 py-6 px-4 hidden md:block">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8 px-2"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Home</span>
                </Link>

                <nav className="space-y-1">
                    {SECTIONS.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === section.id
                                ? "bg-white/10 text-white border-l-2 border-white"
                                : "text-gray-500 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {section.icon}
                            {section.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* ─── Mobile Section Selector ──────────────────── */}
            <div className="md:hidden w-full px-4 pt-4">
                <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4">
                    <ArrowLeft size={16} /> Back
                </Link>
                <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-4 overflow-x-auto scrollbar-hide border border-white/5">
                    {SECTIONS.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setActiveSection(s.id)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeSection === s.id ? "bg-white/10 text-white" : "text-gray-500"
                                }`}
                        >
                            {s.icon} {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── Main Content ────────────────────────────── */}
            <main className="flex-1 p-6 md:p-10 max-w-4xl">

                {/* ═══════════════════════════════════════════ */}
                {/* BASIC INFO                                  */}
                {/* ═══════════════════════════════════════════ */}
                {activeSection === "basic" && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">Basic Info</h1>
                            <p className="text-sm text-gray-500">You can manage your details here.</p>
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 space-y-8">
                            <h2 className="text-lg font-semibold text-white">Basic Details</h2>

                            {/* Avatar */}
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/10 flex items-center justify-center text-2xl font-bold text-white/60 overflow-hidden">
                                        {profile.avatar_url ? (
                                            <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            (profile.full_name?.[0] || "U").toUpperCase()
                                        )}
                                        {uploading && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <Loader2 className="w-6 h-6 animate-spin text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <label
                                        htmlFor="avatar-upload"
                                        className="absolute -bottom-1 -right-1 w-7 h-7 bg-white/10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                                    >
                                        <Pencil size={12} className="text-white" />
                                    </label>
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        accept="image/*"
                                        onChange={handleAvatarUpload}
                                        disabled={uploading}
                                        className="hidden"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">CodeBoard Id / <span className="text-gray-400">{profile.username || "username"}</span></p>
                                </div>
                            </div>

                            {/* Name Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-400 mb-1.5 block">
                                        First Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.full_name}
                                        onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                                        placeholder="Your first name"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 mb-1.5 block">Last Name</label>
                                    <input
                                        type="text"
                                        value={profile.last_name}
                                        onChange={e => setProfile(p => ({ ...p, last_name: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                                        placeholder="Your last name"
                                    />
                                </div>
                            </div>

                            {/* Username & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-400 mb-1.5 block">Username</label>
                                    <input
                                        type="text"
                                        value={profile.username}
                                        onChange={e => setProfile(p => ({ ...p, username: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                                        placeholder="unique_username"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        disabled
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 block">Bio (Max 200 Characters)</label>
                                <textarea
                                    value={profile.bio}
                                    onChange={e => {
                                        if (e.target.value.length <= 200)
                                            setProfile(p => ({ ...p, bio: e.target.value }))
                                    }}
                                    rows={3}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                                <p className="text-xs text-gray-600 mt-1">{profile.bio.length}/200</p>
                            </div>

                            {/* Country */}
                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 block">Country</label>
                                <select
                                    value={profile.country}
                                    onChange={e => setProfile(p => ({ ...p, country: e.target.value }))}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none"
                                >
                                    {COUNTRIES.map(c => (
                                        <option key={c} value={c} className="bg-black text-white">{c}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Save */}
                            <button
                                onClick={saveBasicInfo}
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════ */}
                {/* PROFILE DETAILS                             */}
                {/* ═══════════════════════════════════════════ */}
                {activeSection === "profile" && (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">Profile Details</h1>
                            <p className="text-sm text-gray-500">Build your developer profile step by step.</p>
                        </div>

                        {/* Sub-Tabs */}
                        <div className="flex gap-1 border-b border-white/10 overflow-x-auto scrollbar-hide">
                            {PROFILE_TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveProfileTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${activeProfileTab === tab.id
                                        ? "border-white text-white"
                                        : "border-transparent text-gray-500 hover:text-gray-300"
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* ── About Me ──────────────────────── */}
                        {activeProfileTab === "about" && (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-1">About</h2>
                                    <p className="text-sm text-gray-500">Add a brief introduction about yourself to showcase your personality and interests.</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1 bg-white/5 rounded-lg p-0.5 border border-white/5">
                                        <button
                                            onClick={() => setAboutPreview(false)}
                                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${!aboutPreview ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"
                                                }`}
                                        >
                                            Write
                                        </button>
                                        <button
                                            onClick={() => setAboutPreview(true)}
                                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${aboutPreview ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"
                                                }`}
                                        >
                                            Preview
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => toast.success("Changes saved!")}
                                        className="px-5 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        Update Changes
                                    </button>
                                </div>

                                {aboutPreview ? (
                                    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 min-h-[300px]">
                                        <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                                            {aboutText || <span className="text-gray-600 italic">Nothing to preview yet.</span>}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                                        {/* Toolbar */}
                                        <div className="flex items-center gap-0.5 px-3 py-2 border-b border-white/10 bg-white/[0.02]">
                                            {["H", "B", "I", "U", "~", "❝", "❝", "⟨/⟩", "⟨⟩", "▦", "▤", "🔗", "📎", "🖼", "↩", "↪"].map((btn, i) => (
                                                <button key={i} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 rounded text-xs transition-colors">
                                                    {btn}
                                                </button>
                                            ))}
                                        </div>
                                        <textarea
                                            value={aboutText}
                                            onChange={e => setAboutText(e.target.value)}
                                            rows={12}
                                            className="w-full bg-transparent px-4 py-4 text-sm text-white focus:outline-none resize-none placeholder-gray-600"
                                            placeholder="Write about yourself, your interests, and what you're working on..."
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── Education ─────────────────────── */}
                        {activeProfileTab === "education" && (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-1">Education</h2>
                                    <p className="text-sm text-gray-500">Add your education details, including college name, degree, and grades.</p>
                                </div>

                                {educations.map(edu => (
                                    <div key={edu.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-medium text-white">Education Entry</h3>
                                            <button onClick={() => removeEducation(edu.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">Institution</label>
                                                <input
                                                    type="text"
                                                    value={edu.institution}
                                                    onChange={e => setEducations(prev => prev.map(ed =>
                                                        ed.id === edu.id ? { ...ed, institution: e.target.value } : ed
                                                    ))}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                                                    placeholder="College / University"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">Degree</label>
                                                <input
                                                    type="text"
                                                    value={edu.degree}
                                                    onChange={e => setEducations(prev => prev.map(ed =>
                                                        ed.id === edu.id ? { ...ed, degree: e.target.value } : ed
                                                    ))}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                                                    placeholder="B.Tech, M.Tech, etc."
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">Branch / Specialization</label>
                                                <input
                                                    type="text"
                                                    value={edu.branch}
                                                    onChange={e => setEducations(prev => prev.map(ed =>
                                                        ed.id === edu.id ? { ...ed, branch: e.target.value } : ed
                                                    ))}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                                                    placeholder="Computer Science"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">Year of Graduation</label>
                                                <input
                                                    type="text"
                                                    value={edu.year}
                                                    onChange={e => setEducations(prev => prev.map(ed =>
                                                        ed.id === edu.id ? { ...ed, year: e.target.value } : ed
                                                    ))}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                                                    placeholder="2026"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={addEducation}
                                    className="text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
                                >
                                    <Plus size={16} /> Add Education
                                </button>
                            </div>
                        )}

                        {/* ── Achievements ─────────────────────── */}
                        {activeProfileTab === "achievements" && (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-1">Achievements</h2>
                                    <p className="text-sm text-gray-500">Showcase your achievements and certifications to enhance your profile.</p>
                                </div>

                                {achievements.map(ach => (
                                    <div key={ach.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-medium text-white">Achievement</h3>
                                            <button onClick={() => removeAchievement(ach.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">Title</label>
                                                <input
                                                    type="text"
                                                    value={ach.title}
                                                    onChange={e => setAchievements(prev => prev.map(a =>
                                                        a.id === ach.id ? { ...a, title: e.target.value } : a
                                                    ))}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                                                    placeholder="Award or certification name"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">Issuing Organization</label>
                                                <input
                                                    type="text"
                                                    value={ach.issuer}
                                                    onChange={e => setAchievements(prev => prev.map(a =>
                                                        a.id === ach.id ? { ...a, issuer: e.target.value } : a
                                                    ))}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                                                    placeholder="Google, AWS, etc."
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">Date</label>
                                                <input
                                                    type="month"
                                                    value={ach.date}
                                                    onChange={e => setAchievements(prev => prev.map(a =>
                                                        a.id === ach.id ? { ...a, date: e.target.value } : a
                                                    ))}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">Certificate URL</label>
                                                <input
                                                    type="url"
                                                    value={ach.url}
                                                    onChange={e => setAchievements(prev => prev.map(a =>
                                                        a.id === ach.id ? { ...a, url: e.target.value } : a
                                                    ))}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={addAchievement}
                                    className="text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
                                >
                                    <Plus size={16} /> Add Achievement
                                </button>
                            </div>
                        )}

                        {/* ── Work Experience ──────────────────── */}
                        {activeProfileTab === "experience" && (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-1">Work Experience</h2>
                                    <p className="text-sm text-gray-500">Add your professional experience and internships.</p>
                                </div>

                                {experiences.map(exp => (
                                    <div key={exp.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-medium text-white">Experience</h3>
                                            <button onClick={() => removeExperience(exp.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">Company</label>
                                                <input
                                                    type="text"
                                                    value={exp.company}
                                                    onChange={e => setExperiences(prev => prev.map(ex =>
                                                        ex.id === exp.id ? { ...ex, company: e.target.value } : ex
                                                    ))}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                                                    placeholder="Company name"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">Role / Title</label>
                                                <input
                                                    type="text"
                                                    value={exp.role}
                                                    onChange={e => setExperiences(prev => prev.map(ex =>
                                                        ex.id === exp.id ? { ...ex, role: e.target.value } : ex
                                                    ))}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                                                    placeholder="Software Engineer Intern"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">Start Date</label>
                                                <input
                                                    type="month"
                                                    value={exp.startDate}
                                                    onChange={e => setExperiences(prev => prev.map(ex =>
                                                        ex.id === exp.id ? { ...ex, startDate: e.target.value } : ex
                                                    ))}
                                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500 mb-1 block">End Date</label>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="month"
                                                        value={exp.endDate}
                                                        disabled={exp.current}
                                                        onChange={e => setExperiences(prev => prev.map(ex =>
                                                            ex.id === exp.id ? { ...ex, endDate: e.target.value } : ex
                                                        ))}
                                                        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 disabled:opacity-40"
                                                    />
                                                    <label className="flex items-center gap-1.5 text-xs text-gray-400 whitespace-nowrap cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={exp.current}
                                                            onChange={e => setExperiences(prev => prev.map(ex =>
                                                                ex.id === exp.id ? { ...ex, current: e.target.checked, endDate: "" } : ex
                                                            ))}
                                                            className="accent-white"
                                                        />
                                                        Present
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 mb-1 block">Description</label>
                                            <textarea
                                                value={exp.description}
                                                onChange={e => setExperiences(prev => prev.map(ex =>
                                                    ex.id === exp.id ? { ...ex, description: e.target.value } : ex
                                                ))}
                                                rows={3}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 resize-none"
                                                placeholder="What did you work on?"
                                            />
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={addExperience}
                                    className="text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
                                >
                                    <Plus size={16} /> Add Experience
                                </button>
                            </div>
                        )}

                        {/* ── Socials ──────────────────────────── */}
                        {activeProfileTab === "socials" && (
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-1">Social Profiles</h2>
                                    <p className="text-sm text-gray-500">Link your online presence to share with others.</p>
                                </div>

                                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-5">
                                    {[
                                        { key: "linkedin" as const, label: "LinkedIn", placeholder: "https://linkedin.com/in/username", icon: "in" },
                                        { key: "twitter" as const, label: "Twitter / X", placeholder: "https://twitter.com/username", icon: "𝕏" },
                                        { key: "website" as const, label: "Personal Website", placeholder: "https://yoursite.com", icon: "🌐" },
                                        { key: "resume" as const, label: "Resume Link", placeholder: "https://drive.google.com/...", icon: "📄" },
                                    ].map(social => (
                                        <div key={social.key}>
                                            <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2">
                                                <span className="text-sm">{social.icon}</span>
                                                {social.label}
                                            </label>
                                            <input
                                                type="url"
                                                value={socials[social.key]}
                                                onChange={e => setSocials(prev => ({ ...prev, [social.key]: e.target.value }))}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                                                placeholder={social.placeholder}
                                            />
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => toast.success("Socials saved!")}
                                        className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        <Save size={14} /> Save Socials
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ═══════════════════════════════════════════ */}
                {/* PLATFORM                                    */}
                {/* ═══════════════════════════════════════════ */}
                {activeSection === "platform" && (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">Platform Integration</h1>
                            <p className="text-sm text-gray-500">Connect your coding and development platforms to track your progress.</p>
                        </div>

                        <div className="space-y-3">
                            {platforms.map(p => (
                                <div key={p.platform} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="flex items-center gap-3 min-w-[180px]">
                                        <span className="text-xl">{p.icon}</span>
                                        <div>
                                            <h3 className="font-semibold text-white capitalize text-sm">
                                                {p.platform === "geeksforgeeks" ? "GeeksforGeeks" :
                                                    p.platform === "codestudio" ? "Code Studio" :
                                                        p.platform === "interviewbit" ? "InterviewBit" :
                                                            p.platform === "hackerrank" ? "HackerRank" :
                                                                p.platform === "codechef" ? "CodeChef" :
                                                                    p.platform}
                                            </h3>
                                            {p.connected && (
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <CheckCircle size={12} className="text-green-400" />
                                                    <span className="text-xs text-green-400">Connected</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder={`${p.url}/your-username`}
                                            value={p.username}
                                            onChange={e => setPlatforms(prev => prev.map(pl =>
                                                pl.platform === p.platform ? { ...pl, username: e.target.value } : pl
                                            ))}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                                        />
                                    </div>

                                    <div className="flex gap-2 shrink-0">
                                        {p.connected ? (
                                            <>
                                                <a
                                                    href={`${p.url}/${p.username}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
                                                >
                                                    <ExternalLink size={16} />
                                                </a>
                                                <button
                                                    onClick={() => disconnectPlatform(p.platform)}
                                                    className="px-3 py-1.5 text-xs bg-white/5 text-gray-400 rounded-lg hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                                                >
                                                    Disconnect
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => savePlatform(p.platform, p.username)}
                                                className="px-4 py-1.5 text-sm bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                            >
                                                Submit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════ */}
                {/* VISIBILITY                                  */}
                {/* ═══════════════════════════════════════════ */}
                {activeSection === "visibility" && (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">Visibility Settings</h1>
                            <p className="text-sm text-gray-500">Control who can see your profile and data.</p>
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                            <h2 className="text-lg font-semibold text-white">Profile Visibility</h2>
                            <p className="text-sm text-gray-500">Choose whether your profile is visible to everyone or only to you.</p>

                            <div className="space-y-3">
                                {[
                                    { value: "public" as const, label: "Public", desc: "Anyone can view your profile, platforms, and progress." },
                                    { value: "private" as const, label: "Private", desc: "Only you can see your profile. Others will see a locked profile." },
                                ].map(opt => (
                                    <label
                                        key={opt.value}
                                        className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${profile.visibility === opt.value
                                            ? "bg-white/[0.06] border-white/20"
                                            : "bg-transparent border-white/10 hover:border-white/15"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="visibility"
                                            value={opt.value}
                                            checked={profile.visibility === opt.value}
                                            onChange={() => setProfile(p => ({ ...p, visibility: opt.value }))}
                                            className="mt-1 accent-white"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-white">{opt.label}</div>
                                            <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <button
                                onClick={() => { saveBasicInfo(); }}
                                disabled={saving}
                                className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                Save Visibility
                            </button>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════ */}
                {/* ACCOUNTS                                    */}
                {/* ═══════════════════════════════════════════ */}
                {activeSection === "accounts" && (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">Account Settings</h1>
                            <p className="text-sm text-gray-500">Manage your account security and data.</p>
                        </div>

                        {/* Account Information */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                            <h2 className="text-lg font-semibold text-white">Account Information</h2>

                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 block">Email Address</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-600 mt-1">Email cannot be changed. Contact support if needed.</p>
                            </div>
                        </div>

                        {/* Update Password */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                            <h2 className="text-lg font-semibold text-white">Update Password</h2>

                            <div className="space-y-4 max-w-md">
                                <div>
                                    <label className="text-sm text-gray-400 mb-1.5 block">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 mb-1.5 block">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <button
                                    onClick={updatePassword}
                                    className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    Update Password
                                </button>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 md:p-8 space-y-4">
                            <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
                            <p className="text-sm text-gray-500">
                                Permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                            <button className="px-4 py-2 text-sm bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 border border-red-500/20 transition-colors font-medium">
                                Delete Account
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
