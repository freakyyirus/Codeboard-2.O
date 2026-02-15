"use client"

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 fade-in">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-6">
                ⚡
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Oops! Something broke</h2>
            <p className="text-sm text-gray-500 mb-6 max-w-md">
                {error.message || "An unexpected error occurred while loading this page."}
            </p>
            <button
                onClick={reset}
                className="px-6 py-2.5 bg-white text-black rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
                Try Again
            </button>
        </div>
    )
}
