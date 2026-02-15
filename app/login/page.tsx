"use client"

import { useState, Suspense } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Code2, Mail, Lock, Eye, EyeOff, Github, Chrome, BarChart3, FileText, Trophy, Shield, Smartphone } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function LoginForm() {
    const [loading, setLoading] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [emailLoading, setEmailLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const searchParams = useSearchParams()
    const authError = searchParams.get("error")

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleOAuthLogin = async (provider: "github" | "google") => {
        try {
            setLoading(provider)
            setError(null)
            
            // Log the redirect URL for debugging
            const redirectUrl = `${window.location.origin}/auth/callback`
            console.log("Redirect URL:", redirectUrl)
            
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: redirectUrl,
                },
            })
            if (error) throw error
        } catch (err: any) {
            setError(err.message || "Something went wrong.")
            setLoading(null)
        }
    }

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setEmailLoading(true)
            setError(null)

            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                })
                if (error) throw error
                setEmailSent(true)
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong.")
        } finally {
            setEmailLoading(false)
        }
    }

    return (
        <>
            <h1 className="text-xl font-bold text-white mb-1">
                {emailSent ? "Check your email" : isSignUp ? "Create account" : "Welcome back"}
            </h1>
            <p className="text-gray-500 text-xs mb-5">
                {emailSent 
                    ? "We sent you a confirmation link" 
                    : "Don't have an account yet?"}
                {!emailSent && (
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="ml-1 text-orange-500 hover:text-orange-400 font-medium"
                    >
                        {isSignUp ? "Sign in" : "Sign up"}
                    </button>
                )}
            </p>

            {(error || authError) && (
                <div className="mb-3 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                    {error || "Authentication failed. Please try again."}
                </div>
            )}

            {emailSent ? (
                <div className="text-center py-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-gray-400 text-xs mb-3">
                        We sent a confirmation link to <span className="text-white font-medium">{email}</span>
                    </p>
                    <button
                        onClick={() => {
                            setEmailSent(false)
                            setIsSignUp(false)
                        }}
                        className="text-orange-500 hover:text-orange-400 text-xs"
                    >
                        Sign in instead
                    </button>
                </div>
            ) : (
                <>
                    <form onSubmit={handleEmailAuth} className="space-y-3">
                        <div>
                            <label className="block text-gray-500 text-xs mb-1.5">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full bg-[#111] border border-gray-800 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-500 text-xs mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full bg-[#111] border border-gray-800 rounded-lg py-2.5 pl-9 pr-10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {!isSignUp && (
                            <div className="text-right">
                                <a href="#" className="text-orange-500 hover:text-orange-400 text-xs">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={emailLoading || !email || !password}
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#D35400] text-white rounded-lg font-medium text-sm hover:bg-[#E55D00] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[42px]"
                        >
                            {emailLoading ? (
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : null}
                            {isSignUp ? "Create Account" : "Sign in"}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-gray-800" />
                        <span className="text-gray-600 text-[10px]">OR</span>
                        <div className="flex-1 h-px bg-gray-800" />
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => handleOAuthLogin("google")}
                            disabled={loading !== null}
                            className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-[#111] border border-gray-800 text-white rounded-lg font-medium text-sm hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[42px]"
                        >
                            {loading === "google" ? (
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Chrome className="w-4 h-4" />
                            )}
                            Google
                        </button>

                        <button
                            onClick={() => handleOAuthLogin("github")}
                            disabled={loading !== null}
                            className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-[#111] border border-gray-800 text-white rounded-lg font-medium text-sm hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[42px]"
                        >
                            {loading === "github" ? (
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Github className="w-4 h-4" />
                            )}
                            GitHub
                        </button>
                    </div>
                </>
            )}

            <p className="text-center text-[10px] text-gray-600 mt-4">
                By continuing, you agree to our{" "}
                <a href="#" className="text-orange-500 hover:text-white transition-colors">Terms</a>{" "}
                and{" "}
                <a href="#" className="text-orange-500 hover:text-white transition-colors">Privacy</a>
            </p>
        </>
    )
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
    return (
        <div className="flex gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-orange-500" />
            </div>
            <div>
                <h3 className="font-medium text-white text-xs">{title}</h3>
                <p className="text-[10px] text-gray-500 leading-tight">{description}</p>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-black flex overflow-hidden">
            {/* Left Column - Form */}
            <div className="w-full lg:w-[45%] flex items-center justify-center p-5 lg:p-8">
                <div className="w-full max-w-sm">
                    <Link href="/" className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <Code2 className="w-5 h-5 text-black" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white">CodeBoard</span>
                    </Link>

                    <Suspense fallback={<div className="text-gray-500 text-xs text-center">Loading...</div>}>
                        <LoginForm />
                    </Suspense>
                </div>
            </div>

            {/* Right Column - Features */}
            <div className="hidden lg:flex w-[55%] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.12),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(234,88,12,0.08),transparent_50%)]" />
                
                <div className="relative z-10 flex items-center justify-center w-full p-8">
                    <div className="max-w-md w-full">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-1">Welcome to CodeBoard</h2>
                            <p className="text-gray-500 text-xs">Your complete coding companion</p>
                        </div>
                        
                        <div className="bg-white/[0.03] backdrop-blur-lg rounded-2xl border border-white/5 p-5">
                            <div className="space-y-3">
                                <FeatureCard 
                                    icon={BarChart3}
                                    title="All in One Coding Profile"
                                    description="Showcase your portfolio, track stats, and share progress."
                                />
                                <FeatureCard 
                                    icon={FileText}
                                    title="Follow Popular Sheets"
                                    description="Organize notes and follow coding sheets in one place."
                                />
                                <FeatureCard 
                                    icon={Trophy}
                                    title="Contest Tracker"
                                    description="Track contest schedules and set reminders effortlessly."
                                />
                                <FeatureCard 
                                    icon={Shield}
                                    title="Secure Authentication"
                                    description="Protect your account with OAuth and 2FA."
                                />
                                <FeatureCard 
                                    icon={Smartphone}
                                    title="Cross-Device Sync"
                                    description="Access your profile across all devices seamlessly."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
