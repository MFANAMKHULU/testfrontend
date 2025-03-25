import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "All Things Ads",
  description: "Find and manage ad spaces, connect with advertisers, and grow your revenue",
  icons: {
    icon: [
      {
        url: "/images/Favicon2.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/images/Favicon2.png",
        sizes: "16x16",
        type: "image/png"
      }
    ],
    shortcut: "/images/Favicon2.png",
    apple: "/images/Favicon2.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}