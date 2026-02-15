"use client"

import { useEffect } from "react"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("Global error:", error)
    }, [error])

    return (
        <html>
            <body style={{ backgroundColor: "#000", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
                <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", minHeight: "100vh", padding: "2rem", textAlign: "center",
                }}>
                    <div style={{
                        width: "64px", height: "64px", borderRadius: "16px",
                        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "28px", marginBottom: "24px",
                    }}>
                        ⚠
                    </div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px" }}>
                        Something went wrong
                    </h2>
                    <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "24px", maxWidth: "400px" }}>
                        An unexpected error occurred. Please try again or refresh the page.
                    </p>
                    <button
                        onClick={reset}
                        style={{
                            padding: "10px 24px", borderRadius: "10px", fontWeight: 600,
                            fontSize: "0.875rem", cursor: "pointer", border: "none",
                            background: "#fff", color: "#000",
                        }}
                    >
                        Try Again
                    </button>
                </div>
            </body>
        </html>
    )
}
