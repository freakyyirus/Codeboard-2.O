"use client"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Check, X, Sparkles, Users, Zap, Crown } from "lucide-react"
import { useUser } from "@clerk/nextjs"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Perfect for getting started",
    icon: Zap,
    features: [
      { text: "1 platform sync", included: true },
      { text: "Basic analytics dashboard", included: true },
      { text: "Community leaderboard", included: true },
      { text: "5 learning roadmaps", included: true },
      { text: "GitHub-style heatmap", included: true },
    ],
    notIncluded: [
      "AI-powered insights",
      "Private leaderboards",
      "Custom portfolio domain",
      "Priority support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 499,
    yearlyPrice: 3999,
    description: "For serious competitive programmers",
    popular: true,
    icon: Crown,
    features: [
      { text: "Unlimited platform sync", included: true },
      { text: "Advanced AI insights", included: true },
      { text: "Private leaderboards", included: true },
      { text: "Unlimited roadmaps", included: true },
      { text: "Custom portfolio domain", included: true },
      { text: "Priority support", included: true },
      { text: "Everything in Free", included: true },
    ],
    notIncluded: [
      "Team management",
      "API access",
    ],
  },
  {
    id: "team",
    name: "Team",
    price: 1499,
    yearlyPrice: 11999,
    description: "For coaching institutes & study groups",
    icon: Users,
    features: [
      { text: "Up to 5 team members", included: true },
      { text: "Team analytics dashboard", included: true },
      { text: "Shared progress tracking", included: true },
      { text: "Admin controls", included: true },
      { text: "Everything in Pro", included: true },
    ],
    notIncluded: [
      "Unlimited team size",
      "API access",
    ],
  },
]

export default function PricingPage() {
  const { user, isSignedIn } = useUser()
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (planId: string) => {
    if (!isSignedIn) {
      window.location.href = "/sign-in"
      return
    }

    if (planId === "free") {
      window.location.href = "/dashboard"
      return
    }

    setLoading(planId)

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, billing }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error("Checkout failed:", data.error)
      }
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent <span className="text-purple-400">Pricing</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your coding journey. All plans include a 14-day free trial.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={billing === "monthly" ? "text-white" : "text-gray-400"}>Monthly</span>
            <button
              onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                billing === "yearly" ? "bg-purple-600" : "bg-gray-700"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  billing === "yearly" ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span className={billing === "yearly" ? "text-white" : "text-gray-400"}>
              Yearly
              <span className="ml-2 text-xs text-green-400">Save 33%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan) => {
            const Icon = plan.icon
            const isYearly = billing === "yearly"
            const price = isYearly && plan.yearlyPrice ? plan.yearlyPrice : plan.price
            const perMonth = isYearly && plan.yearlyPrice 
              ? Math.round(plan.yearlyPrice / 12) 
              : plan.price

            return (
              <div
                key={plan.id}
                className={`relative bg-[#1118] border rounded-2xl p-8 ${
                  plan.popular 
                    ? "border-purple-500/50 shadow-lg shadow-purple-500/10" 
                    : "border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plan.popular ? "bg-purple-600/20 text-purple-400" : "bg-white/10 text-gray-400"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-gray-400">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">₹{perMonth}</span>
                  {plan.price > 0 && (
                    <span className="text-gray-400 ml-2">
                      /{isYearly ? "year" : "month"}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    plan.popular
                      ? "bg-purple-600 hover:bg-purple-500 text-white"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  } disabled:opacity-50`}
                >
                  {loading === plan.id 
                    ? "Processing..." 
                    : plan.id === "free" 
                      ? "Get Started Free" 
                      : "Start 14-Day Trial"
                  }
                </button>

                <div className="mt-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature.text}</span>
                    </div>
                  ))}
                  {plan.notIncluded?.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <X className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">
            💳 Secure payments via Stripe &nbsp;•&nbsp; 
            🔄 Cancel anytime &nbsp;•&nbsp; 
            �-money-back Guarantee
          </p>
        </div>

        <div className="mt-24 bg-[#1118] border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4">For Institutions & Enterprises</h3>
          <p className="text-gray-400 mb-6">
            Need custom solutions for your coaching institute or company? We offer custom pricing, 
            dedicated support, and custom integrations.
          </p>
          <a
            href="mailto:enterprise@codeboard.io"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
          >
            Contact Sales → 
          </a>
        </div>
      </div>
    </div>
  )
}