"use client"

import { useState } from "react"
import { Github, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

type AuthMode = "login" | "signup"

export function AuthForm() {
    const router = useRouter()
    const [mode, setMode] = useState<AuthMode>("login")
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.email) {
            newErrors.email = "We need your email to get started"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "That doesn't look like a valid email"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "At least 6 characters — keep it secure"
        }

        if (mode === "signup" && !formData.name) {
            newErrors.name = "What should we call you?"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)

        // Simulate auth delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        toast.success("Welcome! Setting up your dashboard...")

        // Redirect to dashboard
        setTimeout(() => {
            router.push("/dashboard")
        }, 1000)
    }

    const handleOAuthLogin = async (provider: "github" | "google") => {
        setIsLoading(true)
        toast.loading(`Connecting to ${provider}...`, { id: provider })

        // Simulate OAuth
        await new Promise(resolve => setTimeout(resolve, 2000))

        toast.success("Welcome! Setting up your dashboard...", { id: provider })

        setTimeout(() => {
            router.push("/dashboard")
        }, 1000)
    }

    return (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] shadow-2xl p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-[24px] font-display text-[var(--foreground)] mb-2">
                    {mode === "login" ? "Welcome back" : "Create an account"}
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                    {mode === "login"
                        ? "Enter your credentials to access your dashboard"
                        : "Start your coding journey today"
                    }
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {mode === "signup" && (
                    <div>
                        <label htmlFor="name" className="block text-[12px] font-medium text-[var(--text-secondary)] mb-1.5 font-mono uppercase tracking-wider">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={isLoading}
                            className="block w-full rounded-[6px] bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--text-tertiary)] focus:border-transparent focus:ring-2 focus:ring-[var(--ring)] text-sm py-2.5 px-3 transition-all"
                        />
                        {errors.name && (
                            <p className="text-xs text-[var(--error)] mt-1.5">{errors.name}</p>
                        )}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-[12px] font-medium text-[var(--text-secondary)] mb-1.5 font-mono uppercase tracking-wider">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isLoading}
                        className="block w-full rounded-[6px] bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--text-tertiary)] focus:border-transparent focus:ring-2 focus:ring-[var(--ring)] text-sm py-2.5 px-3 transition-all"
                    />
                    {errors.email && (
                        <p className="text-xs text-[var(--error)] mt-1.5">{errors.email}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="password" className="block text-[12px] font-medium text-[var(--text-secondary)] font-mono uppercase tracking-wider">
                            Password
                        </label>
                        {mode === "login" && (
                            <a href="#" className="text-xs text-[var(--text-tertiary)] hover:text-[var(--foreground)] transition-colors">
                                Forgot password?
                            </a>
                        )}
                    </div>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={isLoading}
                        className="block w-full rounded-[6px] bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--text-tertiary)] focus:border-transparent focus:ring-2 focus:ring-[var(--ring)] text-sm py-2.5 px-3 transition-all"
                    />
                    {errors.password && (
                        <p className="text-xs text-[var(--error)] mt-1.5">{errors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2.5 px-4 rounded-[6px] text-sm font-semibold text-[var(--primary-foreground)] bg-[var(--primary)] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--surface)] focus:ring-[var(--ring)] transition-all duration-150 disabled:opacity-50 active:scale-[0.99]"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        mode === "login" ? "Sign in" : "Create account"
                    )}
                </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--border)]" />
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-[var(--surface)] text-[var(--text-tertiary)] font-mono">
                        OR CONTINUE WITH
                    </span>
                </div>
            </div>

            {/* OAuth buttons */}
            <div className="space-y-3">
                <button
                    onClick={() => handleOAuthLogin("github")}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-[6px] border border-[var(--border)] bg-transparent hover:bg-[var(--elevated)] text-[var(--foreground)] transition-all duration-150 group disabled:opacity-50 active:scale-[0.99]"
                >
                    <Github className="w-5 h-5" strokeWidth={1.5} />
                    <span className="text-sm font-medium">GitHub</span>
                </button>
                <button
                    onClick={() => handleOAuthLogin("google")}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-[6px] border border-[var(--border)] bg-transparent hover:bg-[var(--elevated)] text-[var(--foreground)] transition-all duration-150 group disabled:opacity-50 active:scale-[0.99]"
                >
                    <svg className="h-5 w-5 fill-[var(--foreground)]" viewBox="0 0 24 24">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                    <span className="text-sm font-medium">Google</span>
                </button>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
                <p className="text-[10px] text-[var(--text-tertiary)]/60 uppercase tracking-widest font-mono">
                    Protected by CodeBoard Secure Auth
                </p>
            </div>

            {/* Toggle mode */}
            <div className="mt-6 text-center">
                <p className="text-sm text-[var(--text-secondary)]">
                    {mode === "login" ? (
                        <>
                            Don&apos;t have an account?{" "}
                            <button
                                onClick={() => setMode("signup")}
                                className="text-[var(--primary)] font-medium hover:brightness-125 transition-all"
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                onClick={() => setMode("login")}
                                className="text-[var(--primary)] font-medium hover:brightness-125 transition-all"
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}
