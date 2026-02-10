import { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: "primary" | "secondary" | "ghost" | "outline"
    size?: "sm" | "md" | "lg" | "icon"
}

const variants = {
    primary:
        "bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-110",
    secondary:
        "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--elevated)]",
    ghost:
        "hover:bg-[var(--secondary)] text-[var(--foreground)]",
    outline:
        "border border-[var(--border)] bg-transparent hover:bg-[var(--elevated)] text-[var(--foreground)]",
}

const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            className={`inline-flex items-center justify-center font-medium rounded-[var(--radius)] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] active:translate-y-px active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
