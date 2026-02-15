import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center">
            <div className="text-8xl font-bold tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                404
            </div>
            <h1 className="text-xl font-semibold mb-2">Page Not Found</h1>
            <p className="text-sm text-gray-500 mb-8 max-w-md">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="flex gap-3">
                <Link
                    href="/"
                    className="px-6 py-2.5 bg-white text-black rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
                >
                    Go Home
                </Link>
                <Link
                    href="/dashboard"
                    className="px-6 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                    Dashboard
                </Link>
            </div>
        </div>
    )
}
