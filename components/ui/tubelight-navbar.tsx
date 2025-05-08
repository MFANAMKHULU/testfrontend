"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedButton } from "@/components/animated-button"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  onSignIn?: () => void
  onSignUp?: () => void
  rightContent?: React.ReactNode
}

// Update the keyframes animation
const keyframes = `
  @keyframes flash {
    0%, 18%, 22%, 25%, 53%, 57%, 100% {
      background: linear-gradient(90deg, #00b8ff 0%, #ffa500 100%);
    }
  
    20%, 24%, 55% {
      background: linear-gradient(90deg, #ffa500 0%, #00b8ff 100%);
    }
  }

  @keyframes flicker {
    0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
      opacity: 0.99;
      filter: drop-shadow(0 0 1px #00b8ff) drop-shadow(0 0 15px #ffa500);
    }
    20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
      opacity: 0.4;
      filter: none;
    }
  }
`

export function NavBar({ items, className, onSignIn, onSignUp, rightContent }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [colorIndex, setColorIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  // Logo colors for the border
  const logoColors = [
    "#6B54FA", // Purple
    "#FA6565", // Pink/Red
    "#F9CA56", // Yellow/Gold
    "#53E2D2"  // Teal
  ]

  // Color rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % logoColors.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-4 transition-all duration-300",
        className,
      )}
    >
      <div className={cn(
        "flex items-center justify-between gap-3 backdrop-blur-lg py-3 px-6 rounded-full shadow-lg w-full max-w-5xl mx-auto",
        isScrolled 
          ? "bg-[#0c0025]/85 border border-[#4f2da3]/40" 
          : "bg-[#140047]/60 border border-[#2a2e45]/30"
      )}>
        {/* Logo Section */}
        <div className="flex items-center gap-1">
          <Link href="/" className="flex items-center gap-1">
            <div 
              className="relative flex items-center justify-center"
              style={{ 
                border: `2px solid ${logoColors[colorIndex]}`,
                transition: "border-color 0.5s ease-in-out",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image 
                src="/images/Picture1.png" 
                alt="Logo" 
                width={36} 
                height={36}
                className="overflow-hidden" 
                priority
                style={{ 
                  borderRadius: "50%",
                  objectFit: "contain"
                }}
              />
            </div>
            <Image 
              src="/images/logoName.png" 
              alt="Logo Text" 
              width={70} 
              height={30}
              className="overflow-hidden ml-1 hidden sm:block" 
              priority
              style={{
                objectFit: "contain"
              }}
            />
          </Link>
        </div>
        
        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-base font-medium transition-colors px-3",
                  "hover:text-[#00b8ff]",
                  "relative group"
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                      <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00b8ff] transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          })}
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          {rightContent}
          <AnimatedButton
            variant="ghost-primary"
            className={cn(
              "relative overflow-hidden text-white hover:text-[#9575ff] text-xs md:text-sm font-['Verdana',sans-serif]",
            )}
            hoverScale={1.02}
            glowOnHover={true}
            shimmer={true}
            onClick={onSignIn}
          >
            Sign In
          </AnimatedButton>
          <Link
            href="/signup"
            className={cn(
              "relative group px-4 py-2 rounded-lg text-sm font-medium",
              "text-white shadow-lg",
              "animate-[flash_2.5s_ease-in-out_infinite,flicker_2s_linear_infinite]",
              "hover:scale-105 hover:shadow-xl",
              "border border-white/20",
              "overflow-hidden",
              "bg-gradient-to-r from-[#00b8ff] to-[#ffa500]"
            )}
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 10px rgba(0,184,255,0.5), 0 0 20px rgba(255,165,0,0.3)"
            }}
          >
            Get Started
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00b8ff] to-[#ffa500] opacity-0 group-hover:opacity-20 transition-opacity" />
          </Link>
        </div>
      </div>
    </div>
  )
} 