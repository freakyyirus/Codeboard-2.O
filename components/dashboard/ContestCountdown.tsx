"use client"

interface ContestCountdownProps {
    title: string
    platform: "Codeforces" | "LeetCode" | "HackerRank"
    startTime: Date
    link: string
}

export function ContestCountdown({ title, platform, startTime, link }: ContestCountdownProps) {
    return (
        <div className="stat-card rounded-2xl p-6 text-center">
            <div className="mb-4">
                <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-medium">
                    {platform}
                </span>
            </div>
            <h3 className="text-sm font-medium text-white mb-4">{title}</h3>
            <div className="flex items-center justify-center gap-4 mb-6">
                {[
                    { val: "02", label: "Days" },
                    { val: "14", label: "Hrs" },
                    { val: "33", label: "Min" },
                ].map((t) => (
                    <div key={t.label} className="text-center">
                        <div className="text-3xl font-bold text-white">{t.val}</div>
                        <div className="text-xs text-gray-500 mt-1">{t.label}</div>
                    </div>
                ))}
            </div>
            <a
                href={link}
                className="block w-full py-3 bg-white text-black rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
                Register Now
            </a>
        </div>
    )
}
