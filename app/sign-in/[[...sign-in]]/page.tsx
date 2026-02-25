"use client"

import { SignIn } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { CodeBoardLogoSimple } from "@/components/CodeBoardLogo"
import Link from "next/link"
import { BarChart3, FileText, Trophy, Smartphone, Code2, ArrowLeft } from "lucide-react"
import { dark } from "@clerk/themes"

function FeatureCard({ icon: Icon, title, description, index }: { icon: React.ElementType, title: string, description: string, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + (index * 0.1), duration: 0.4 }}
            className="flex gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
        >
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
                <h3 className="font-medium text-white text-xs">{title}</h3>
                <p className="text-[10px] text-gray-400 leading-tight">{description}</p>
            </div>
        </motion.div>
    )
}

export default function SignInPage() {
    return (
        <div className="h-screen w-full bg-black flex flex-col lg:flex-row overflow-hidden relative selection:bg-white/20">
            {/* Simple Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-black" />
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
            </div>

            {/* Left Column - Form */}
            <div className="w-full lg:w-[45%] h-full flex flex-col items-center justify-center p-4 lg:p-8 relative z-10">
                {/* Back Navigation */}
                <div className="absolute top-6 left-6 z-20">
                    <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-gray-400 hover:text-white text-sm font-medium backdrop-blur-md group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6 lg:mb-8"
                >
                    <Link href="/" className="flex items-center gap-2 group w-fit">
                        <CodeBoardLogoSimple />
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-sm flex justify-center"
                >
                    <SignIn
                        appearance={{
                            baseTheme: dark,
                            elements: {
                                rootBox: "w-full",
                                card: "bg-black/60 border border-white/10 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] w-full m-0 p-8 rounded-2xl",
                                headerTitle: "text-white font-black text-2xl mb-1",
                                headerSubtitle: "text-gray-400 text-sm",
                                socialButtonsBlockButton: "bg-white/[0.03] border border-white/10 text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 rounded-xl h-11",
                                socialButtonsBlockButtonText: "font-semibold",
                                formButtonPrimary: "bg-white text-black hover:bg-gray-200 transition-all duration-300 rounded-xl h-11 font-bold text-sm shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.6)]",
                                footerActionLink: "text-blue-400 hover:text-blue-300 transition-colors font-medium",
                                formFieldLabel: "text-gray-400 text-xs font-semibold uppercase tracking-wider ml-1 mb-1.5",
                                formFieldInput: "bg-black/50 border border-white/10 text-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl h-11 px-4",
                                dividerLine: "bg-white/10",
                                dividerText: "text-gray-500 text-xs uppercase tracking-widest",
                                footer: "pb-0 pt-4"
                            }
                        }}
                    />
                </motion.div>
            </div>

            {/* Right Column - Features */}
            <div className="hidden lg:flex flex-col justify-center w-[55%] h-full relative bg-white/[0.02] border-l border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-20 animate-pulse" style={{ animationDuration: '4s' }} />

                <div className="relative z-10 flex items-center justify-center w-full p-8">
                    <div className="max-w-md w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-6 lg:mb-8"
                        >
                            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
                            <p className="text-gray-500 text-sm">Continue your coding journey today.</p>
                        </motion.div>

                        <div className="grid gap-3">
                            <FeatureCard index={0} icon={BarChart3} title="All in One Coding Profile" description="Showcase your portfolio, track stats, and share progress." />
                            <FeatureCard index={1} icon={FileText} title="Follow Popular Sheets" description="Organize notes and follow coding sheets in one place." />
                            <FeatureCard index={2} icon={Trophy} title="Contest Tracker" description="Track contest schedules and set reminders effortlessly." />
                            <FeatureCard index={3} icon={Smartphone} title="AI Assistant" description="Get intelligent coding help and study plans." />
                            <FeatureCard index={4} icon={Code2} title="Studio Mode" description="Focused coding environment with built-in tools." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
