import "@/app/globals.css"
import { Metadata } from "next"
import { ChatBot } from "@/components/chat-bot"
import { LoadingProvider } from "@/providers/loading-provider"
import { StarsBackground } from "@/components/stars-background"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"

export const metadata: Metadata = {
  title: "Adsy - AI-Powered Advertising Platform",
  description: "Connect with influencers, manage campaigns, and optimize your advertising with AI.",
  icons: {
    icon: '/images/Favicon2.png',
    shortcut: '/images/Favicon2.png',
    apple: '/images/Favicon2.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <LoadingProvider>
            <StarsBackground />
            <div style={{position: 'fixed', top: 24, right: 24, zIndex: 1000}}>
              <ModeToggle />
            </div>
            {children}
          </LoadingProvider>
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  )
}