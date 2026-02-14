import { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: "brutal-primary" | "brutal-secondary" | "brutal-pill" | "outline"
    size?: "sm" | "md" | "lg"
}

const variants = {
    "brutal-primary":
        "bg-[var(--color-bg)] text-[var(--color-text)] border-brutal shadow-brutal-md active-brutal uppercase font-bold tracking-wide",
    "brutal-secondary":
        "bg-[var(--color-surface)] text-[var(--color-text-inverse)] border-brutal shadow-brutal-md active-brutal uppercase font-bold tracking-wide",
    "brutal-pill":
        "bg-[var(--color-bg)] text-[var(--color-text)] border-brutal shadow-brutal-sm active-brutal rounded-[50px] uppercase font-bold tracking-wide text-sm",
    outline:
        "bg-transparent text-[var(--color-text-inverse)] border-brutal shadow-brutal-md active-brutal uppercase font-bold tracking-wide",
}

const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
}

export function Button({
    children,
    variant = "brutal-primary",
    size = "md",
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            className={`inline-flex items-center justify-center font-bold transition-all duration-100 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
