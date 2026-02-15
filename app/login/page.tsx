"use client"

import { useState, Suspense, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Code2, Mail, Lock, Eye, EyeOff, Github, Chrome, BarChart3, FileText, Trophy, Shield, Smartphone } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { CursorEffect, FadeIn, PremiumBackground, scaleOnHover } from "@/components/ui/PremiumEffects"
import { CodeBoardLogo } from "@/components/CodeBoardLogo"

function LoginForm() {
    const router = useRouter()
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
                // Redirect to dashboard after successful login
                router.push('/dashboard')
                router.refresh()
                return
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong.")
        } finally {
            setEmailLoading(false)
        }
    }

    return (
        <FadeIn delay={0.2} className="w-full">
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
                        className="ml-1 text-white hover:underline font-medium"
                    >
                        {isSignUp ? "Sign in" : "Sign up"}
                    </button>
                )}
            </p>

            <AnimatePresence>
                {(error || authError) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-3 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs overflow-hidden"
                    >
                        {error || authError || "Authentication failed. Please try again."}
                    </motion.div>
                )}
            </AnimatePresence>

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
                        className="text-white hover:underline text-xs"
                    >
                        Sign in instead
                    </button>
                </div>
            ) : (
                <>
                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-xs mb-1.5 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs mb-1.5 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {!isSignUp && (
                            <div className="text-right">
                                <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            disabled={emailLoading || !email || !password}
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-black rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[42px]"
                        >
                            {emailLoading ? (
                                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            ) : null}
                            {isSignUp ? "Create Account" : "Sign in"}
                        </motion.button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-gray-600 text-[10px] uppercase">Or continue with</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <motion.button
                            onClick={() => handleOAuthLogin("google")}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            disabled={loading !== null}
                            className="flex items-center justify-center gap-2 py-2.5 bg-white/[0.03] border border-white/10 text-white rounded-xl font-medium text-sm hover:bg-white/[0.08] transition-colors disabled:opacity-50"
                        >
                            {loading === "google" ? (
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Chrome className="w-4 h-4" />
                            )}
                            Google
                        </motion.button>

                        <motion.button
                            onClick={() => handleOAuthLogin("github")}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            disabled={loading !== null}
                            className="flex items-center justify-center gap-2 py-2.5 bg-white/[0.03] border border-white/10 text-white rounded-xl font-medium text-sm hover:bg-white/[0.08] transition-colors disabled:opacity-50"
                        >
                            {loading === "github" ? (
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Github className="w-4 h-4" />
                            )}
                            GitHub
                        </motion.button>
                    </div>
                </>
            )}

            <p className="text-center text-[10px] text-gray-600 mt-4">
                By continuing, you agree to our{" "}
                <a href="#" className="text-white hover:underline transition-colors">Terms</a>{" "}
                and{" "}
                <a href="#" className="text-white hover:underline transition-colors">Privacy</a>
            </p>
        </FadeIn>
    )
}

function FeatureCard({ icon: Icon, title, description, index }: { icon: React.ElementType, title: string, description: string, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
        >
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
                <h3 className="font-medium text-white text-xs">{title}</h3>
                <p className="text-[10px] text-gray-500 leading-tight">{description}</p>
            </div>
        </motion.div>
    )
}

export default function LoginPage() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-black flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden scrollbar-hide relative selection:bg-white/20">
            <PremiumBackground />
            <CursorEffect />

            {/* Left Column - Form */}
            <div className="w-full lg:w-[45%] flex items-center justify-center p-5 lg:p-8 relative z-10">
                <div className="w-full max-w-sm">
                    <FadeIn delay={0.1}>
                        <Link href="/" className="flex items-center gap-2 mb-8 group w-fit">
                            <CodeBoardLogo />
                        </Link>
                    </FadeIn>

                    <Suspense fallback={<div className="text-gray-500 text-xs text-center animate-pulse">Loading...</div>}>
                        <LoginForm />
                    </Suspense>
                </div>
            </div>

            {/* Right Column - Features */}
            <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-white/[0.02] border-l border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-20 animate-pulse" style={{ animationDuration: '4s' }} />

                <div className="relative z-10 flex items-center justify-center w-full p-8">
                    <div className="max-w-md w-full">
                        <FadeIn delay={0.3} className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome to CodeBoard</h2>
                            <p className="text-gray-500 text-sm">Your complete coding companion for growth.</p>
                        </FadeIn>

                        <div className="grid gap-4">
                            <FeatureCard
                                index={0}
                                icon={BarChart3}
                                title="All in One Coding Profile"
                                description="Showcase your portfolio, track stats, and share progress."
                            />
                            <FeatureCard
                                index={1}
                                icon={FileText}
                                title="Follow Popular Sheets"
                                description="Organize notes and follow coding sheets in one place."
                            />
                            <FeatureCard
                                index={2}
                                icon={Trophy}
                                title="Contest Tracker"
                                description="Track contest schedules and set reminders effortlessly."
                            />
                            <FeatureCard
                                index={3}
                                icon={Smartphone}
                                title="AI Assistant"
                                description="Get intelligent coding help and study plans."
                            />
                            <FeatureCard
                                index={4}
                                icon={Code2}
                                title="Studio Mode"
                                description="Focused coding environment with built-in tools."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
