import { LandingHero } from "@/components/LandingHero"
import { FeaturesGrid } from "@/components/FeaturesGrid"
import { Code2 } from "lucide-react"
import Link from "next/link"
import HeroAttraction from "@/components/HeroAttraction"
import { CodeBoardLogoSimple } from "@/components/CodeBoardLogo"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scrollbar-hide">
      {/* ─── Navbar ──────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CodeBoardLogoSimple />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="nav-link hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="nav-link hover:text-white transition-colors">How it Works</a>
            <a href="#testimonials" className="nav-link hover:text-white transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Log in</Link>
            <div className="px-3 py-1 bg-yellow-900/30 text-yellow-400 text-xs font-medium rounded-full border border-yellow-800/30">
              Work in Progress
            </div>
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
        <section className="border-y border-white/10 bg-white/5 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-6">Integrated with top platforms</p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 opacity-50">
              <span className="text-lg sm:text-xl font-bold">LeetCode</span>
              <span className="text-lg sm:text-xl font-bold">Codeforces</span>
              <span className="text-lg sm:text-xl font-bold">HackerRank</span>
              <span className="text-lg sm:text-xl font-bold">GitHub</span>
            </div>
          </div>
        </section>

        {/* ─── Features ────────────────────────────────────────── */}
        <FeaturesGrid />

        {/* ─── How It Works ────────────────────────────────────── */}
        <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 bg-black">
          <div className="max-w-7xl mx-auto">
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
        <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-4">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-8 sm:mb-16 tracking-tight">LOVED BY DEVELOPERS.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                { quote: "CodeBoard replaced 6 tabs in my prep workflow. The DSA tracker alone saved me hours every week.", name: "Alex Chen", role: "SWE @ Google" },
                { quote: "The event calendar + studio combo is unbeatable. I went from 1400 to 1800 on CF in 3 months.", name: "Sarah Kim", role: "Competitive Programmer" },
                { quote: "Finally, a dashboard that feels like it was built by someone who actually grinds LeetCode.", name: "Mike Ross", role: "CS Student @ MIT" },
              ].map((t) => (
                <div key={t.name} className="bg-white text-black p-6 sm:p-8 rounded-2xl">
                  <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
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

        {/* ─── CTA ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 tracking-tight">READY TO LEVEL UP?</h2>
          <p className="text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">Join thousands of developers using CodeBoard to track, analyze, and improve their coding skills.</p>
          <Link href="/login" className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-200 transition-all inline-flex items-center gap-2 sm:gap-3 mb-4">
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
    </div>
  )
}
