"use client"

import * as React from "react"

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function AddToHomeScreenPrompt() {
  const [deferredEvent, setDeferredEvent] = React.useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault()
      setDeferredEvent(event as BeforeInstallPromptEvent)
      setVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  if (!visible || !deferredEvent) {
    return null
  }

  const install = async () => {
    try {
      await deferredEvent.prompt()
      const outcome = await deferredEvent.userChoice
      if (outcome.outcome === "accepted") {
        setVisible(false)
      }
    } catch (error) {
      console.error("Install prompt failed", error)
    }
  }

  const dismiss = () => {
    setVisible(false)
  }

  return (
    <aside className="fixed bottom-6 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 rounded-3xl border border-white/10 bg-[#0B0F12]/90 p-4 text-slate-100 shadow-xl backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-[#57B8BF]/20 text-[#57B8BF]">📲</div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Install Metamorfosis Wellness Journey</p>
          <p className="text-xs text-slate-300">
            Access your rituals offline and add the app to your home screen for faster check-ins.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={install}
              className="rounded-2xl bg-[#57B8BF] px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-[#0C6B74] hover:text-white"
            >
              Install
            </button>
            <button
              onClick={dismiss}
              className="rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:border-white"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
