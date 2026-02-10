import { AuthForm } from "@/components/AuthForm"
import Link from "next/link"
import { Terminal } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-[var(--background)]">
            {/* Subtle dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, var(--elevated) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                    maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)',
                }}
            />

            {/* Logo — Top Left */}
            <div className="absolute top-8 left-8 flex items-center gap-2.5 z-10">
                <div className="w-7 h-7 rounded-[6px] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center">
                    <Terminal className="w-4 h-4 text-[var(--primary)]" strokeWidth={1.5} />
                </div>
                <h2 className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                    CodeBoard
                </h2>
            </div>

            {/* Sign up link — Top Right */}
            <div className="absolute top-8 right-8 z-10 hidden sm:block">
                <p className="text-xs text-[var(--text-secondary)] font-mono">
                    Don&apos;t have an account?
                    <Link href="/login" className="text-[var(--primary)] hover:brightness-125 ml-2 transition-all">
                        Sign up
                    </Link>
                </p>
            </div>

            {/* Auth Form */}
            <div className="w-full max-w-md relative z-10">
                <AuthForm />

                {/* Mobile sign up link */}
                <div className="mt-8 text-center sm:hidden">
                    <p className="text-xs text-[var(--text-secondary)] font-mono">
                        Don&apos;t have an account?
                        <Link href="/login" className="text-[var(--primary)] hover:brightness-125 ml-2 transition-all">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Footer links */}
            <div className="absolute bottom-6 w-full text-center">
                <div className="flex items-center justify-center gap-6 text-xs text-[var(--text-tertiary)]/40 font-mono">
                    <Link href="/privacy" className="hover:text-[var(--text-secondary)] transition-colors">Privacy</Link>
                    <Link href="/terms" className="hover:text-[var(--text-secondary)] transition-colors">Terms</Link>
                    <Link href="/help" className="hover:text-[var(--text-secondary)] transition-colors">Help</Link>
                </div>
            </div>
        </div>
    )
}
