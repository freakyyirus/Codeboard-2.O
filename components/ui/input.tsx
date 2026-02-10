import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-4 py-2 text-base text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
