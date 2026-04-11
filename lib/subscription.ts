import { createClerkSupabaseClient } from "@/lib/clerk-supabase"

export type SubscriptionPlan = "free" | "pro" | "team"

export interface Subscription {
  userId: string
  plan: SubscriptionPlan
  status: string
  currentPeriodEnd: string | null
}

export async function getUserSubscription(userId: string): Promise<Subscription> {
  const supabase = await createClerkSupabaseClient()

  const { data: subscription } = await supabase
    .from("user_subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single() as any

  if (!subscription) {
    return { userId, plan: "free", status: "active", currentPeriodEnd: null }
  }

  return {
    userId: subscription.user_id,
    plan: subscription.plan || "free",
    status: subscription.status || "active",
    currentPeriodEnd: subscription.current_period_end,
  }
}

export type FeatureName = 
  | "platform_sync" 
  | "analytics" 
  | "leaderboard" 
  | "roadmaps"
  | "heatmap"
  | "unlimited_sync"
  | "ai_insights"
  | "private_leaderboard"
  | "unlimited_roadmaps"
  | "custom_domain"
  | "priority_support"
  | "team_management"
  | "team_analytics"
  | "admin_dashboard"
  | "shared_roadmaps"

export const PLAN_FEATURES: Record<SubscriptionPlan, FeatureName[]> = {
  free: ["platform_sync", "analytics", "leaderboard", "roadmaps", "heatmap"],
  pro: ["unlimited_sync", "ai_insights", "private_leaderboard", "unlimited_roadmaps", "custom_domain", "priority_support"],
  team: ["team_management", "team_analytics", "admin_dashboard", "shared_roadmaps"],
}

export function hasFeature(subscription: Subscription, feature: FeatureName): boolean {
  const features = PLAN_FEATURES[subscription.plan]
  return features.includes(feature)
}