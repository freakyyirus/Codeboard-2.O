import Link from "next/link"
import { Github, Twitter, Mail, Terminal, Code, BarChart3, Network } from "lucide-react"
import { LandingHero } from "@/components/LandingHero"
import { FeaturesGrid } from "@/components/FeaturesGrid"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-[var(--border)] h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo — mark + wordmark */}
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
            <Link
              href="#features"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
            >
              Blog
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

      {/* CTA Section — asymmetric padding */}
      <section className="pt-16 pb-24 relative overflow-hidden border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-[24px] md:text-[32px] font-display mb-4 text-[var(--foreground)]">
            Ready to level up?
          </h2>
          <p className="text-base text-[var(--text-secondary)] mb-8 leading-relaxed max-w-lg mx-auto">
            Join thousands of developers using CodeBoard to track, analyze, and improve their coding skills.
          </p>
          <Link href="/login">
            <Button className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-110 text-sm font-semibold py-2.5 px-6 h-auto">
              Start Your Free Trial
            </Button>
          </Link>
          <p className="mt-6 text-xs text-[var(--text-tertiary)] font-mono">
            No credit card required. Cancel anytime.
          </p>
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
                <li><Link href="#pricing" className="hover:text-[var(--foreground)] transition-colors">Pricing</Link></li>
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
              © 2025 CodeBoard Inc. All rights reserved.
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
