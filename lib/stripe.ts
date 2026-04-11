import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  typescript: true,
})

export const PRICE_IDS = {
  pro_monthly: process.env.STRIPE_PRO_PRICE_ID!,
  pro_yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
  team_monthly: process.env.STRIPE_TEAM_PRICE_ID!,
  team_yearly: process.env.STRIPE_TEAM_YEARLY_PRICE_ID!,
} as const

export const PLAN_FEATURES = {
  free: {
    name: "Free",
    price: 0,
    features: [
      "1 platform sync",
      "Basic analytics",
      "Community leaderboard",
      "5 roadmaps",
    ],
  },
  pro_monthly: {
    name: "Pro",
    price: 499,
    priceId: PRICE_IDS.pro_monthly,
    features: [
      "Unlimited platform sync",
      "Advanced AI insights",
      "Private leaderboards",
      "Unlimited roadmaps",
      "Priority support",
      "Custom portfolio domain",
    ],
  },
  pro_yearly: {
    name: "Pro Annual",
    price: 3999,
    priceId: PRICE_IDS.pro_yearly,
    features: [
      "Everything in Pro",
      "~33% savings",
      "2 months free",
    ],
    savings: "~33%",
  },
  team_monthly: {
    name: "Team",
    price: 1499,
    priceId: PRICE_IDS.team_monthly,
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "Team analytics",
      "Shared roadmaps",
      "Admin dashboard",
    ],
  },
  team_yearly: {
    name: "Team Annual",
    price: 11999,
    priceId: PRICE_IDS.team_yearly,
    features: [
      "Everything in Team",
      "~33% savings",
    ],
    savings: "~33%",
  },
} as const

export type PlanType = keyof typeof PLAN_FEATURES