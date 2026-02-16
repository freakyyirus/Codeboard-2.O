"use client"

import { SignIn } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { PremiumBackground, FadeIn } from "@/components/ui/PremiumEffects"
import { CodeBoardLogoSimple } from "@/components/CodeBoardLogo"
import Link from "next/link"
import { dark } from "@clerk/themes"
import { BarChart3, FileText, Trophy, Smartphone, Code2 } from "lucide-react"

// Re-using PremiumBackground and FadeIn from the existing login page reference or importing if they are exported.
// Since I can't easily see if they are exported from a shared file or just defined in the login page, 
// I will assume they are in @/components/ui/PremiumEffects as imported in the login page I viewed earlier.
// Wait, I saw imports in the login page:
// import { FadeIn, PremiumBackground, scaleOnHover } from "@/components/ui/PremiumEffects"
// So I should import them from there.

function FeatureCard({ icon: Icon, title, description, index }: { icon: React.ElementType, title: string, description: string, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
        >
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
                <h3 className="font-medium text-white text-xs">{title}</h3>
                <p className="text-[10px] text-gray-500 leading-tight">{description}</p>
            </div>
        </motion.div>
    )
}

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden scrollbar-hide relative selection:bg-white/20">
            {/* Simple Background elements since PremiumBackground might need context */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-black" />
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
            </div>

            {/* Left Column - Form */}
            <div className="w-full lg:w-[45%] flex items-center justify-center p-5 lg:p-8 relative z-10">
                <div className="w-full max-w-sm flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Link href="/" className="flex items-center gap-2 mb-8 group w-fit">
                            <CodeBoardLogoSimple />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-full flex justify-center"
                    >
                        <SignIn
                            appearance={{
                                baseTheme: dark,
                                elements: {
                                    rootBox: "w-full",
                                    card: "bg-black/40 border border-white/10 backdrop-blur-md shadow-xl w-full",
                                    headerTitle: "text-white font-bold",
                                    headerSubtitle: "text-gray-400",
                                    socialButtonsBlockButton: "bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.08]",
                                    formButtonPrimary: "bg-white text-black hover:bg-gray-200",
                                    footerActionLink: "text-white hover:text-gray-300",
                                    formFieldLabel: "text-gray-400",
                                    formFieldInput: "bg-black/40 border-white/10 text-white focus:border-white/30",
                                    dividerLine: "bg-white/10",
                                    dividerText: "text-gray-500",
                                }
                            }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Right Column - Features */}
            <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-white/[0.02] border-l border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-20 animate-pulse" style={{ animationDuration: '4s' }} />

                <div className="relative z-10 flex items-center justify-center w-full p-8">
                    <div className="max-w-md w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-8"
                        >
                            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
                            <p className="text-gray-500 text-sm">Continue your coding journey with CodeBoard.</p>
                        </motion.div>

                        <div className="grid gap-4">
                            <FeatureCard
                                index={0}
                                icon={BarChart3}
                                title="All in One Coding Profile"
                                description="Showcase your portfolio, track stats, and share progress."
                            />
                            <FeatureCard
                                index={1}
                                icon={FileText}
                                title="Follow Popular Sheets"
                                description="Organize notes and follow coding sheets in one place."
                            />
                            <FeatureCard
                                index={2}
                                icon={Trophy}
                                title="Contest Tracker"
                                description="Track contest schedules and set reminders effortlessly."
                            />
                            <FeatureCard
                                index={3}
                                icon={Smartphone}
                                title="AI Assistant"
                                description="Get intelligent coding help and study plans."
                            />
                            <FeatureCard
                                index={4}
                                icon={Code2}
                                title="Studio Mode"
                                description="Focused coding environment with built-in tools."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
