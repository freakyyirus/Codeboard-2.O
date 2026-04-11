"use client"

import { useCallback } from "react"
import { useUser } from "@clerk/nextjs"

type EventProperties = Record<string, unknown>

// Type for window.posthog
declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: EventProperties) => void
      identify: (userId: string, properties?: EventProperties) => void
      people: {
        set: (properties: EventProperties) => void
      }
    }
  }
}

export function useAnalytics() {
  const { user } = useUser()

  const track = useCallback((eventName: string, properties?: EventProperties) => {
    if (typeof window !== "undefined" && window.posthog) {
      window.posthog.capture(eventName, properties)
    }
  }, [])

  const identify = useCallback(() => {
    if (typeof window !== "undefined" && window.posthog && user) {
      window.posthog.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
      })
    }
  }, [user])

  const setProfile = useCallback((properties: EventProperties) => {
    if (typeof window !== "undefined" && window.posthog && user) {
      window.posthog.people.set(properties)
    }
  }, [user])

  return { track, identify, setProfile }
}