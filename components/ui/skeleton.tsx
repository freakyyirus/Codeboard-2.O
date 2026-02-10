export function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div
            className={`skeleton rounded-[var(--radius)] bg-[var(--elevated)] ${className}`}
        />
    )
}
