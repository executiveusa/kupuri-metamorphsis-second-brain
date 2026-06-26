"use client"

import { useEffect } from "react"

const MUTATION_TAG = "metamorfosis-mutations"

export function PWAInitializer() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return
    }

    let registration: ServiceWorkerRegistration | undefined

    const register = async () => {
      try {
        registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        })

        if (registration && "sync" in registration) {
          try {
            await (registration as unknown as { sync: { register(tag: string): Promise<void> } }).sync.register(MUTATION_TAG)
          } catch {
            registration.active?.postMessage?.("flush-mutations")
          }
        } else {
          registration?.active?.postMessage?.("flush-mutations")
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Service worker registration failed", error)
        }
      }
    }

    register()

    return () => {
      if (!registration) return
      registration.update().catch(() => {
        /* ignore */
      })
    }
  }, [])

  return null
}
