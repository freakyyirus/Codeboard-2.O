import Link from "next/link"
import { Github, Twitter, Mail, Terminal, Code, BarChart3, Network, ArrowRight, CheckCircle, Zap } from "lucide-react"
import { LandingHero } from "@/components/LandingHero"
import { FeaturesGrid } from "@/components/FeaturesGrid"
import { Button } from "@/components/ui/button"

const steps = [
  {
    step: "01",
    title: "Connect your platforms",
    description: "Link your LeetCode, Codeforces, GitHub, and HackerRank accounts in one click.",
  },
  {
    step: "02",
    title: "Track everything",
    description: "Your stats, streaks, submissions, and progress — automatically synced and unified.",
  },
  {
    step: "03",
    title: "Level up faster",
    description: "AI-powered insights tell you what to practice next. Never waste time on the wrong problems.",
  },
]

const testimonials = [
  {
    name: "Priya Sharma",
    role: "SWE @ Google",
    text: "CodeBoard replaced 6 tabs in my prep workflow. The DSA tracker alone saved me hours every week.",
    initials: "PS",
  },
  {
    name: "Alex Chen",
    role: "Competitive Programmer",
    text: "The event calendar + studio combo is unbeatable. I went from 1400 to 1800 on CF in 3 months.",
    initials: "AC",
  },
  {
    name: "Jordan Blake",
    role: "CS Student @ MIT",
    text: "Finally, a dashboard that feels like it was built by someone who actually grinds LeetCode.",
    initials: "JB",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-[var(--border)] h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[6px] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-[var(--primary)]" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
              CodeBoard
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
              Testimonials
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
              Log in
            </Link>
            <Link href="/login">
              <Button className="bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold py-1.5 px-4 h-auto hover:brightness-110">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <LandingHero />

      {/* Platform Integration Section */}
      <section className="py-12 border-y border-[var(--border)] bg-[var(--surface)]/30">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs text-[var(--text-tertiary)] mb-8 font-mono uppercase tracking-wider">
            Integrated with top platforms
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Code, name: "LeetCode", color: "var(--platform-leetcode)" },
              { icon: BarChart3, name: "Codeforces", color: "var(--platform-codeforces)" },
              { icon: Terminal, name: "HackerRank", color: "var(--success)" },
              { icon: Network, name: "GitHub", color: "var(--foreground)" },
            ].map((platform) => (
              <div key={platform.name} className="flex items-center gap-2.5 text-[var(--text-tertiary)] hover:text-[var(--foreground)] transition-colors group">
                <span
                  className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: platform.color }}
                />
                <platform.icon className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                <span className="font-medium text-sm font-mono">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <FeaturesGrid />
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest mb-4">
              How It Works
            </p>
            <h2 className="text-[28px] md:text-[40px] font-display text-[var(--foreground)] mb-4">
              Three steps to clarity.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative group">
                {/* Connector line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+4px)] w-[calc(100%-40px)] h-px bg-[var(--border)]" />
                )}
                <div className="text-[48px] font-mono font-bold text-[var(--elevated)] group-hover:text-[var(--primary)]/20 transition-colors mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 border-t border-[var(--border)] bg-[var(--surface)]/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-mono text-[var(--primary)] uppercase tracking-widest mb-4">
              Testimonials
            </p>
            <h2 className="text-[28px] md:text-[40px] font-display text-[var(--foreground)]">
              Loved by developers.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="border border-[var(--border)] rounded-[12px] p-6 bg-[var(--surface)] card-hover-glow">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--elevated)] border border-[var(--border)] flex items-center justify-center text-xs font-semibold text-[var(--foreground)]">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{t.name}</p>
                    <p className="text-xs text-[var(--text-tertiary)] font-mono">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-16 pb-24 relative overflow-hidden border-t border-[var(--border)]">
        {/* Gradient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-[24px] md:text-[36px] font-display mb-4 text-[var(--foreground)]">
            Ready to level up?
          </h2>
          <p className="text-base text-[var(--text-secondary)] mb-8 leading-relaxed max-w-lg mx-auto">
            Join thousands of developers using CodeBoard to track, analyze, and improve their coding skills.
          </p>
          <Link href="/login">
            <Button className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-110 text-sm font-semibold py-2.5 px-8 h-auto">
              Start Your Free Trial
            </Button>
          </Link>

          {/* Trust badges */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[var(--text-tertiary)] font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[var(--success)]" />
              No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[var(--warning)]" />
              Setup in 30 seconds
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--background)] border-t border-[var(--border)] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-[6px] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-[var(--primary)]" strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-lg tracking-tight text-[var(--foreground)]">CodeBoard</span>
              </Link>
              <p className="text-[var(--text-secondary)] text-sm max-w-xs mb-6 leading-relaxed">
                The ultimate companion for competitive programmers and software engineers preparing for technical interviews.
              </p>
              <div className="flex gap-4">
                <Link href="https://twitter.com/codeboard" className="text-[var(--text-tertiary)] hover:text-[var(--foreground)] transition-colors">
                  <Twitter className="w-5 h-5" strokeWidth={1.5} />
                </Link>
                <Link href="https://github.com/codeboard" className="text-[var(--text-tertiary)] hover:text-[var(--foreground)] transition-colors">
                  <Github className="w-5 h-5" strokeWidth={1.5} />
                </Link>
                <Link href="mailto:hello@codeboard.dev" className="text-[var(--text-tertiary)] hover:text-[var(--foreground)] transition-colors">
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                </Link>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-[var(--foreground)] text-sm mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                <li><Link href="#features" className="hover:text-[var(--foreground)] transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-[var(--foreground)] transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-[var(--foreground)] transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-[var(--foreground)] transition-colors">Changelog</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-[var(--foreground)] text-sm mb-4">Resources</h4>
              <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                <li><Link href="#" className="hover:text-[var(--foreground)] transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-[var(--foreground)] transition-colors">API Reference</Link></li>
                <li><Link href="#" className="hover:text-[var(--foreground)] transition-colors">Community</Link></li>
                <li><Link href="#" className="hover:text-[var(--foreground)] transition-colors">Help Center</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-[var(--foreground)] text-sm mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
                <li><Link href="#" className="hover:text-[var(--foreground)] transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-[var(--foreground)] transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-[var(--foreground)] transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-[var(--foreground)] transition-colors">Legal</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--text-tertiary)] text-xs font-mono">
              © 2026 CodeBoard Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-[var(--text-tertiary)] font-mono">
              <Link href="/privacy" className="hover:text-[var(--text-secondary)] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[var(--text-secondary)] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
