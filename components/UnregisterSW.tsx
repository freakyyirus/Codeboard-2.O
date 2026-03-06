"use client"

import { useEffect } from "react"

export function UnregisterSW() {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                for (let registration of registrations) {
                    registration.unregister().then(boolean => {
                        if (boolean) {
                            console.log('Unregistered dangling service worker to fix 404 errors.')
                        }
                    })
                }
            })
        }
    }, [])

    return null
}
