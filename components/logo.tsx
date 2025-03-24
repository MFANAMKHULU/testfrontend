"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  linkToHome?: boolean
}

export function Logo({ className, linkToHome = true }: LogoProps) {
  const logoContent = (
    <div className={cn("font-bold text-xl flex items-center", className)}>
      {/* Logo content has been removed */}
    </div>
  )

  if (linkToHome) {
    return <Link href="/">{logoContent}</Link>
  }

  return logoContent
}

