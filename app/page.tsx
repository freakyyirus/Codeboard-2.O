import { LandingHero } from "@/components/LandingHero"
import { FeaturesGrid } from "@/components/FeaturesGrid"
import { Code2, Activity, Terminal, Github, BookOpen, Coffee, Cpu, Target, Layers } from "lucide-react"
import Link from "next/link"
import HeroAttraction from "@/components/HeroAttraction"
import { CodeBoardLogoSimple } from "@/components/CodeBoardLogo"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scrollbar-hide">
      {/* ─── Navbar ──────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CodeBoardLogoSimple textClassName="hidden sm:block" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="nav-link hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="nav-link hover:text-white transition-colors">How it Works</a>
            <a href="#testimonials" className="nav-link hover:text-white transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <Link href="/sign-in" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Log in</Link>
              <Link href="/sign-up" className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors">Get Started</Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Dashboard</Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* ─── Main Content ────────────────────────────────────── */}
      <div className="pt-16">
        {/* ─── Hero ────────────────────────────────────────────── */}
        <LandingHero />

        {/* ─── Hero Attraction ────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <HeroAttraction />
        </div>

        {/* ─── Logo Bar ────────────────────────────────────────── */}
        <section className="border-y border-white/10 bg-[#0d0d0d] py-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
            <p className="text-center text-xs text-gray-500 uppercase tracking-widest">Integrated with top platforms</p>
          </div>

          <div className="relative flex w-full max-w-[100vw] overflow-hidden">
            {/* Edge fade gradients */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 sm:w-48 bg-gradient-to-r from-[#0d0d0d] to-transparent"></div>
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 sm:w-48 bg-gradient-to-l from-[#0d0d0d] to-transparent"></div>

            {/* Marquee Track */}
            <div className="animate-marquee items-center text-gray-400">

              {/* Original Set + Duplicate Set for seamless looping */}
              {[...Array(2)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex gap-14 sm:gap-20 items-center shrink-0 pr-14 sm:pr-20">
                  {[
                    { name: "LeetCode", icon: <img src="/logos/leetcode.svg" alt="LeetCode" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 object-contain" /> },
                    { name: "Codeforces", icon: <img src="/logos/codeforces.svg" alt="Codeforces" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 object-contain" /> },
                    { name: "HackerRank", icon: <img src="/logos/hackerrank.svg" alt="HackerRank" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 object-contain" /> },
                    { name: "GitHub", icon: <img src="/logos/github.svg" alt="GitHub" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 object-contain" /> },
                    { name: "GeeksforGeeks", icon: <img src="/logos/geeksforgeeks.svg" alt="GeeksforGeeks" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 object-contain" /> },
                    { name: "CodeChef", icon: <img src="/logos/codechef.svg" alt="CodeChef" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 object-contain" /> },
                    { name: "AtCoder", icon: <img src="/logos/atcoder.svg" alt="AtCoder" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 object-contain" /> },
                    { name: "Unstop", icon: <img src="/logos/unstop.svg" alt="Unstop" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 object-contain" /> },
                    { name: "Devfolio", icon: <img src="/logos/devfolio.svg" alt="Devfolio" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 object-contain" /> },
                  ].map((platform) => (
                    <div key={platform.name} className="flex items-center gap-4 md:gap-5 opacity-80 hover:opacity-100 hover:text-white transition-all cursor-pointer shrink-0">
                      {platform.icon}
                      <span className="text-xl sm:text-2xl font-bold text-gray-400 hover:text-white transition-colors tracking-widest whitespace-nowrap drop-shadow-sm">{platform.name}</span>
                    </div>
                  ))}
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ─── Features ────────────────────────────────────────── */}
        <FeaturesGrid />

        {/* ─── How It Works ────────────────────────────────────── */}
        <section id="how-it-works" className="py-20 sm:py-32 px-4 sm:px-6 bg-black">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-8 sm:mb-16 tracking-tight">THREE STEPS TO CLARITY.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                { n: "01", title: "Connect your platforms", desc: "Link your LeetCode, Codeforces, GitHub, and HackerRank accounts in one click." },
                { n: "02", title: "Track everything", desc: "Your stats, streaks, submissions, and progress — automatically synced." },
                { n: "03", title: "Level up faster", desc: "AI-powered insights tell you what to practice next." },
              ].map((step) => (
                <div key={step.n} className="text-center">
                  <div className="text-5xl sm:text-6xl font-black text-white/20 mb-4">{step.n}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ────────────────────────────────────── */}
        <section id="testimonials" className="py-20 sm:py-32 px-4 sm:px-6 bg-gray-900">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-4">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-8 sm:mb-16 tracking-tight">LOVED BY DEVELOPERS.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                { quote: "CodeBoard replaced 6 tabs in my prep workflow. The DSA tracker alone saved me hours every week.", name: "Yuvraj Singh", role: "SWE @ Google", avatar: "/images/yuvraj-avatar-testimonial.png", customStyle: "object-cover object-[50%_15%]" },
                { quote: "The event calendar + studio combo is unbeatable. I went from 1400 to 1800 on CF in 3 months.", name: "Aashish Choudhary", role: "Competitive Programmer", avatar: "/images/aashish-avatar-new.png", customStyle: "object-cover object-[50%_15%] scale-[1.15]" },
                { quote: "Finally, a dashboard that feels like it was built by someone who actually grinds LeetCode.", name: "Tarun Karn", role: "SWE @ Meta", avatar: "/images/tarun-avatar-new.png", customStyle: "object-cover object-[50%_15%] scale-[1.15]" },
              ].map((t) => (
                <div key={t.name} className="bg-white text-black p-6 sm:p-8 rounded-2xl">
                  <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={`${t.name}'s avatar`} className={`w-10 h-10 rounded-full aspect-square border border-gray-200 ${t.customStyle}`} />
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Meet the Founder ──────────────────────────────── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-900/50 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-4">The Creator</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-12 tracking-tight">MEET THE FOUNDER.</h2>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-[#0a0a0a] p-8 sm:p-10 rounded-3xl border border-white/5 shadow-xl">
              <div className="flex-shrink-0 relative">
                <img
                  src="/images/founder.jpg"
                  alt="Yuvraj Singh"
                  className="w-32 h-32 sm:w-40 sm:h-40 aspect-square rounded-full object-cover object-[50%_40%]"
                />
              </div>

              <div className="text-center md:text-left space-y-4 w-full">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Yuvraj Singh</h3>
                  <p className="text-[#3b82f6] font-medium text-sm sm:text-base">Founder & Solo Developer</p>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  "I built CodeBoard out of my own frustration with tracking competitive programming progress across multiple platforms. What started as a personal dashboard during my SWE prep journey has evolved into the ultimate companion for thousands of developers aiming to level up their coding skills."
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
                    <span className="text-xs bg-white/[0.03] px-3 py-1.5 rounded-md border border-white/[0.05] text-gray-400">Software Engineer</span>
                    <span className="text-xs bg-white/[0.03] px-3 py-1.5 rounded-md border border-white/[0.05] text-gray-400">Competitive Programmer</span>
                  </div>
                  {/* Social Links Placeholder */}
                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <a href="https://www.linkedin.com/in/yuvraj-singh-1055011a9/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                    <a href="https://github.com/freakyyirus" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="GitHub">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </a>
                    <a href="https://x.com/realfreakyyirus" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="X (formerly Twitter)">
                      <svg className="w-5 h-5 mx-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 tracking-tight">READY TO LEVEL UP?</h2>
          <p className="text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">Join thousands of developers using CodeBoard to track, analyze, and improve their coding skills.</p>
          <Link href="/sign-in" className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-200 transition-all inline-flex items-center gap-2 sm:gap-3 mb-4">
            START YOUR FREE TRIAL
          </Link>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500">
            <span>No credit card</span>
            <span>Setup in 30 seconds</span>
          </div>
        </section>

        {/* ─── Footer ──────────────────────────────────────────── */}
        <footer className="border-t border-white/10 py-8 sm:py-12 px-4 sm:px-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CodeBoardLogoSimple />
                </div>
                <p className="text-gray-500 text-sm">The ultimate companion for competitive programmers and software engineers.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-500">
              <p>&copy; 2025 CodeBoard Inc. All rights reserved.</p>
              <div className="flex gap-4 sm:gap-6">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div >
  )
}
