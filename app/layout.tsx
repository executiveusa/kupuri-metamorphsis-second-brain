import type React from "react"
import type { Metadata } from "next"
import { Inter, Newsreader } from "next/font/google"

import "styles/tailwind.css"

import { AnalyticsScript } from "@/components/analytics/AnalyticsScript"
import { AddToHomeScreenPrompt } from "@/components/pwa/AddToHomeScreenPrompt"
import { PWAInitializer } from "@/components/pwa/PWAInitializer"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader" })

export const metadata: Metadata = {
  title: "Metamorphosis · Ivette Private Wellness OS",
  description:
    "Ivette Milo’s private wellness second brain for rituals, recipes, music, journaling, habits, and personal transformation.",
  themeColor: "#071018",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://metamorfosis.example.com"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <head>
        <meta name="theme-color" content="#071018" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="canonical" href={metadata.metadataBase?.toString()} />
      </head>
      <body className="min-h-screen bg-[#0B0F12] text-[#EAF2F4]">
        <a className="skip-to-content" href="#main">
          Skip to content
        </a>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <PWAInitializer />
            {children}
            <AddToHomeScreenPrompt />
          </div>
        </Providers>
        <AnalyticsScript />
      </body>
    </html>
  )
}
