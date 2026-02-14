"use client"

import { Globe, RefreshCw, Pencil, Mail, Linkedin, Twitter, MapPin, GraduationCap, Lock, Github } from "lucide-react"
import Link from "next/link"

interface ProfileCardProps {
    name?: string
    handle?: string
    avatarUrl?: string
    location?: string
    institution?: string
}

export function ProfileCard({
    name = "Yuvraj Singh",
    handle = "@freakyyirus",
    avatarUrl = "",
    location = "India",
    institution = "GH Raisoni College of Engineering",
}: ProfileCardProps) {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()

    const socialLinks = [
        { icon: Mail, href: "mailto:yuvrajsingh56426@gmail.com" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/yuvraj-singh-1055011a9/" },
        { icon: Twitter, href: "https://x.com/realfreakyyirus" },
        { icon: Github, href: "https://github.com/freakyyirus" },
    ]

    return (
        <div className="stat-card p-6">
            {/* Top Controls */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Globe className="w-4 h-4" />
                    Public Profile
                </div>
                <div className="toggle" />
            </div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <RefreshCw className="w-4 h-4" />
                    Next Refresh
                </div>
                <span className="font-mono font-semibold text-sm text-white">14m 30s</span>
            </div>

            {/* Avatar & Name */}
            <div className="text-center">
                <div className="relative inline-block">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-orange-900/50"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-2xl border-4 border-orange-900/50">
                            {initials}
                        </div>
                    )}
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#1a1a1a] rounded-full border border-[#2a2a2a] flex items-center justify-center hover:bg-[#222] transition-colors">
                        <Pencil className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
                <h2 className="text-xl font-bold mt-4 text-white">{name}</h2>
                <Link href="https://github.com/freakyyirus" target="_blank" className="text-blue-400 font-medium hover:underline">{handle}</Link>

                <button className="w-full mt-4 py-2.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-sm">
                    Get your CodeBoard Card
                    <Lock className="w-4 h-4" />
                </button>

                {/* Social Links */}
                <div className="flex justify-center gap-3 mt-4">
                    {socialLinks.map((item, i) => (
                        <Link
                            key={i}
                            href={item.href}
                            target="_blank"
                            className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222] transition-colors border border-[#2a2a2a]"
                        >
                            <item.icon className="w-4 h-4 text-gray-400" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Details */}
            <div className="mt-6 space-y-3 pt-6 border-t border-[#1f1f1f]">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {location}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                    <GraduationCap className="w-4 h-4" />
                    {institution}
                </div>
            </div>
        </div>
    )
}
