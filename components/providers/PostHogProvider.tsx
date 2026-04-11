"use client"

import { useEffect, ReactNode } from "react"
import { useUser } from "@clerk/nextjs"
import { usePathname, useSearchParams } from "next/navigation"

type PostHogInstance = {
  capture: (event: string, properties?: Record<string, unknown>) => void
  identify: (id: string, properties?: Record<string, unknown>) => void
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { user } = useUser()

  useEffect(() => {
    if (typeof window === "undefined") return

    const script = document.createElement("script")
    script.innerHTML = `
      !function(t,e){var o,n,p,r;e.getElementById("posthog-pid")||((o=e.createElement("script")).type="text/javascript",
      o.src="https://cdn.posthog.com/posthog.js",o.onload=function(){
      posthog.init("${process.env.NEXT_PUBLIC_POSTHOG_KEY}",{api_host:"${process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com}"}})}),
      (n=e.getElementsByTagName("script")[0]).parentNode.insertBefore(o,n)
      }(document,document);
    `
    script.id = "posthog-pid"
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ph = (window as any).posthog as PostHogInstance | undefined
      if (ph) {
        ph.capture("$pageview", {
          $pathname: pathname,
          $search: searchParams.toString(),
        })

        if (user) {
          ph.identify(user.id, {
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName,
          })
        }
      }
    }
  }, [pathname, searchParams, user])

  return <>{children}</>
}