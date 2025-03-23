import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  linkToHome?: boolean
}

export function Logo({ className, linkToHome = true }: LogoProps) {
  const logoContent = (
    <div className={cn("font-bold text-xl flex items-center", className)}>
      <div className="relative w-14 h-14 mr-3">
        <Image src="/images/logo.png" alt="All Things Ads Logo" fill className="object-contain" priority />
      </div>
      {!className?.includes("h-8") && <span className="font-bold">All Things Ads</span>}
    </div>
  )

  if (linkToHome) {
    return <Link href="/">{logoContent}</Link>
  }

  return logoContent
}

