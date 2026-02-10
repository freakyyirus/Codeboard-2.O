"use client"

import { motion } from "framer-motion"
import {
    User,
    Sparkles,
    Flame,
    BarChart3,
    Users,
    ArrowRight
} from "lucide-react"

const features = [
    {
        title: "Unified Profile",
        description: "Connect all your accounts. View aggregated statistics, submission history, and global ranking in a single dashboard.",
        icon: User,
        accent: "var(--primary)",
    },
    {
        title: "AI Code Review",
        description: "Get instant feedback on time and space complexity. Receive actionable suggestions to optimize your solutions.",
        icon: Sparkles,
        accent: "var(--warning)",
    },
    {
        title: "Streak Guardian",
        description: "Visualize daily activity across all platforms. Set goals and never lose your coding momentum again.",
        icon: Flame,
        accent: "var(--error)",
    },
]

export function FeaturesGrid() {
    return (
        <section className="pt-32 pb-24">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header — left-aligned, not centered */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="mb-16"
                >
                    <h2 className="text-[24px] md:text-[32px] font-display mb-4 text-[var(--foreground)]">
                        Built for the grind.
                    </h2>
                    <p className="text-[var(--text-secondary)] text-base max-w-lg leading-relaxed">
                        Stop jumping between tabs. Get a holistic view of your progress
                        in a distraction-free environment.
                    </p>
                </motion.div>

                {/* Top 3 features — cards with left-border accent */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.08 }}
                            className="group relative rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-200 hover:translate-x-1 hover:border-[var(--elevated)]"
                            style={{ borderLeft: `3px solid ${feature.accent}` }}
                        >
                            <div className="flex flex-col h-full">
                                <div className="w-10 h-10 rounded-[6px] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] mb-5 bg-[var(--background)] group-hover:text-[var(--foreground)] transition-colors">
                                    <feature.icon className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-base font-semibold mb-2 text-[var(--foreground)] tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom 2 features — asymmetric layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.24 }}
                        className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-200 hover:translate-x-1 hover:border-[var(--elevated)] group"
                        style={{ borderLeft: "3px solid var(--success)" }}
                    >
                        <div className="mb-8 max-w-sm">
                            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)] tracking-tight">Detailed Analytics</h3>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                Drill down into topic-wise performance. Know exactly where you stand in DP, Graphs, or Trees.
                            </p>
                            <button className="mt-4 text-[var(--primary)] font-medium text-xs font-mono flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-wider">
                                Explore Analytics <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                        {/* Chart mockup */}
                        <div className="w-full h-32 flex items-end justify-between gap-1.5 px-4 opacity-40 group-hover:opacity-80 transition-opacity">
                            {[40, 70, 50, 90, 60, 35, 80].map((h, i) => (
                                <div
                                    key={i}
                                    className="w-full rounded-t-sm transition-all duration-300"
                                    style={{
                                        height: `${h}%`,
                                        background: h >= 80
                                            ? "var(--primary)"
                                            : h >= 60
                                                ? "var(--elevated)"
                                                : "#1E293B",
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.32 }}
                        className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-8 flex flex-col justify-center transition-all duration-200 hover:translate-x-1 hover:border-[var(--elevated)] group"
                        style={{ borderLeft: "3px solid var(--warning)" }}
                    >
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center p-3 rounded-[6px] bg-[var(--background)] border border-[var(--border)] mb-4 text-[var(--text-secondary)] group-hover:text-[var(--foreground)] transition-colors">
                                <Users className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)] tracking-tight">Community Leaderboards</h3>
                            <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                                Compete with friends or your company peers. Create private leaderboards for your organization.
                            </p>
                            {/* Avatar stack */}
                            <div className="flex justify-center -space-x-2 opacity-40 group-hover:opacity-80 transition-opacity">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--surface)] bg-[var(--elevated)]" />
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-[var(--surface)] bg-[var(--background)] flex items-center justify-center text-[10px] font-mono font-semibold text-[var(--foreground)]">
                                    +2k
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
