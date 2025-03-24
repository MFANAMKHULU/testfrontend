import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { InteractiveBackground } from "@/components/interactive-background"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: "All Things Ads",
  description: "Connect advertisers, ad buyers, and affiliates in one platform",
  generator: 'v0.dev',
  applicationName: 'All Things Ads',
  keywords: ['advertising', 'marketing', 'ad spaces', 'marketplace'],
  authors: [{ name: 'All Things Ads Team' }],
  creator: 'All Things Ads',
  publisher: 'All Things Ads',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/images/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body 
        className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <InteractiveBackground />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}