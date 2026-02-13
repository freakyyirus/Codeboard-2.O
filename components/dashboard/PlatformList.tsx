"use client"

import { Check, Plus, ExternalLink } from "lucide-react"

type PlatformStatus = "connected" | "disconnected"

interface Platform {
    name: string
    handle: string
    status: PlatformStatus
    icon: React.ElementType
    color: string
}

const platforms: Platform[] = [
    { name: "LeetCode", handle: "yuvraj_123", status: "connected", icon: LeetCodeIcon, color: "var(--platform-leetcode)" },
    { name: "CodeChef", handle: "yuvraj_cc", status: "connected", icon: CodeChefIcon, color: "var(--platform-codechef)" },
    { name: "Codeforces", handle: "yuvaj_cf", status: "connected", icon: CodeforcesIcon, color: "var(--platform-codeforces)" },
    { name: "HackerRank", handle: "yuvraj_hr", status: "disconnected", icon: HackerRankIcon, color: "var(--platform-hackerrank)" },
    { name: "AtCoder", handle: "", status: "disconnected", icon: AtCoderIcon, color: "#fff" },
    { name: "GitHub", handle: "yuvraj-dev", status: "connected", icon: GitHubIcon, color: "var(--platform-github)" },
]

export function PlatformList() {
    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[8px] p-5 h-full">
            <h3 className="text-[14px] font-medium text-[var(--foreground)] mb-4">Connected Platforms</h3>
            <div className="space-y-3">
                {platforms.map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-[6px] bg-[var(--background)] border border-[var(--border)] flex items-center justify-center transition-colors group-hover:border-[var(--border-hover)]">
                                <platform.icon className={`w-4 h-4 ${platform.status === 'disconnected' ? 'grayscale opacity-50' : ''}`} color={platform.color} />
                            </div>
                            <div>
                                <p className={`text-[13px] font-medium ${platform.status === 'disconnected' ? 'text-[var(--text-tertiary)]' : 'text-[var(--foreground)]'}`}>
                                    {platform.name}
                                </p>
                                {platform.status === 'connected' && (
                                    <p className="text-[11px] text-[var(--text-tertiary)] hidden group-hover:block transition-all">
                                        @{platform.handle}
                                    </p>
                                )}
                            </div>
                        </div>

                        {platform.status === 'connected' ? (
                            <div className="w-5 h-5 rounded-full bg-[rgba(0,112,243,0.1)] flex items-center justify-center">
                                <Check className="w-3 h-3 text-[var(--primary)]" strokeWidth={2} />
                            </div>
                        ) : (
                            <button className="text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] border border-[var(--border)] rounded-[4px] px-2 py-1 bg-[var(--background)] hover:bg-[var(--secondary)] transition-colors">
                                Connect
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-[12px] font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] bg-[var(--secondary)] hover:bg-[var(--border)] rounded-[6px] transition-all">
                <Plus className="w-3 h-3" />
                Add Platform
            </button>
        </div>
    )
}

/* ─── Icons ────────────────────────────────────────────── */

function LeetCodeIcon({ className, color }: { className?: string, color: string }) {
    return <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color }}><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.173 5.423l.016.016c-.55.6-.96 1.742.063 2.768a4.015 4.015 0 0 0 3.75 1.157c.506-.11 1.012-.34 1.464-.672l1.644-1.229a.666.666 0 0 1 .63-.095.666.666 0 0 1 .373.805.65.65 0 0 1-.225.318l-1.649 1.234a5.353 5.353 0 0 1-1.956.9 5.343 5.343 0 0 1-5.006-1.543l-.014-.014C.68 3.036 5.86-2.583 13.483 0zm-2.097 5.753a.667.667 0 0 1 .937.105l7.218 9.531c2.193 2.896-.289 7.42-3.868 6.079-1.996-.749-2.903-2.61-2.903-2.61l.013-.016a5.344 5.344 0 0 1-2.955-4.821 5.362 5.362 0 0 1 1.455-3.19l.013-.012.012-.012a.668.668 0 0 1 .078-.954zM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z" /></svg>
}
function CodeforcesIcon({ className, color }: { className?: string, color: string }) { return <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color }}><rect x="2" y="12" width="6" height="10" rx="1.5" /><rect x="9" y="4" width="6" height="18" rx="1.5" /><rect x="16" y="8" width="6" height="14" rx="1.5" /></svg> }
function CodeChefIcon({ className, color }: { className?: string, color: string }) { return <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color }}><path d="M12 2L2 8l10 6 10-6-10-6zm0 12l-10-6v8l10 6 10-6v-8l-10 6z" /></svg> }
function HackerRankIcon({ className, color }: { className?: string, color: string }) { return <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-4H7v4H5V8h2v4h2V8h2v8zm5-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" /></svg> }
function AtCoderIcon({ className, color }: { className?: string, color: string }) { return <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color }}><circle cx="12" cy="12" r="10" /></svg> }
function GitHubIcon({ className, color }: { className?: string, color: string }) { return <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={{ color }}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> }
