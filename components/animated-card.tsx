"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function AnimatedCard({ children, className = "", intensity = 15 }: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for the tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Springs for smoother animation
  const springConfig = { damping: 20, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  // Transform values for the tilt effect
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-intensity, intensity])

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Calculate normalized position (0 to 1)
    const xPos = (e.clientX - rect.left) / width
    const yPos = (e.clientY - rect.top) / height

    // Update motion values (-0.5 to 0.5)
    x.set(xPos - 0.5)
    y.set(yPos - 0.5)
  }

  // Reset on mouse leave
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.2 } }}
    >
      {/* Card content */}
      <div style={{ transform: "translateZ(0px)" }}>{children}</div>

      {/* Highlight effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-tr from-primary/10 to-secondary/10 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: "translateZ(2px)",
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />
    </motion.div>
  )
}

