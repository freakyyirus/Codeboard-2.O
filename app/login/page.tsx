"use client"

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Github, Loader2, Mail, Lock, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const router = useRouter()

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const handleGithubLogin = async () => {
        setIsLoading(true)
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setMessage(null)

        if (mode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                setError(error.message)
                setIsLoading(false)
            } else {
                router.push('/dashboard')
                router.refresh()
            }
        } else {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            })
            if (error) {
                setError(error.message)
                setIsLoading(false)
            } else {
                setMessage('Check your email to confirm your account!')
                setIsLoading(false)
            }
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4">
            <div className="w-full max-w-[400px] space-y-6 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] shadow-2xl p-6">

                {/* Header */}
                <div className="flex flex-col items-center space-y-2 text-center">
                    <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center mb-2">
                        <span className="font-bold text-[var(--background)] text-xl">CB</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                        {mode === 'login' ? 'Welcome back' : 'Create an account'}
                    </h1>
                    <p className="text-sm text-[var(--text-secondary)]">
                        {mode === 'login' ? 'Login to access your premium dashboard' : 'Start your coding journey properly'}
                    </p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 bg-[var(--background)] p-1 rounded-lg border border-[var(--border)]">
                    <button
                        onClick={() => setMode('login')}
                        className={`text-sm font-medium py-1.5 rounded-md transition-all ${mode === 'login' ? 'bg-[var(--surface)] shadow-sm text-[var(--foreground)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setMode('signup')}
                        className={`text-sm font-medium py-1.5 rounded-md transition-all ${mode === 'signup' ? 'bg-[var(--surface)] shadow-sm text-[var(--foreground)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'}`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Error/Message */}
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}
                {message && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-500 text-sm">
                        <Mail className="w-4 h-4" />
                        {message}
                    </div>
                )}

                {/* Email Form */}
                <form onSubmit={handleEmailAuth} className="space-y-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-[var(--text-tertiary)]" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full h-10 pl-9 pr-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-4 h-4 text-[var(--text-tertiary)]" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full h-10 pl-9 pr-3 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-10 bg-[var(--primary)] text-white font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading && (mode === 'login' || mode === 'signup') ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {mode === 'login' ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-[var(--border)]" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[var(--surface)] px-2 text-[var(--text-tertiary)]">Or continue with</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleGithubLogin}
                        disabled={isLoading}
                        className="w-full h-10 flex items-center justify-center gap-2 bg-[var(--foreground)] text-[var(--background)] font-medium rounded-[8px] hover:bg-[var(--text-secondary)] transition-all disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Github className="w-5 h-5" />
                        )}
                        GitHub
                    </button>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full h-10 flex items-center justify-center gap-2 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] font-medium rounded-[8px] hover:bg-[var(--surface-hover)] transition-all disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                        )}
                        Google
                    </button>
                </div>

                <p className="px-8 text-center text-xs text-[var(--text-tertiary)]">
                    By clicking continue, you agree to our Terms of Service.
                </p>
            </div>
        </div>
    )
}
