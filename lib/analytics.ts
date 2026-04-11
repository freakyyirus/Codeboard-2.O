import { NextRequest, NextResponse } from "next/server"

let posthog: any = null

export function getPostHog() {
  if (posthog) return posthog

  const key = process.env.POSTHOG_API_KEY
  if (!key) {
    console.warn("PostHog API key not configured")
    return null
  }

  try {
    const { PostHog } = require("posthog-node")
    posthog = new PostHog(key, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    })
  } catch (e) {
    console.warn("PostHog not available:", e)
  }

  return posthog
}

export async function trackServerEvent(
  eventName: string,
  properties: Record<string, unknown> = {},
  userId?: string
) {
  const ph = getPostHog()
  if (!ph) return

  try {
    ph.capture({
      event: eventName,
      properties,
      userId,
    })
  } catch (error) {
    console.error("PostHog track error:", error)
  }
}

export async function identifyServerUser(userId: string, traits: Record<string, unknown> = {}) {
  const ph = getPostHog()
  if (!ph) return

  try {
    ph.identify({
      userId,
      traits,
    })
  } catch (error) {
    console.error("PostHog identify error:", error)
  }
}