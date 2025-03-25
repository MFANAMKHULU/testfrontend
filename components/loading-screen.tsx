"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false)
  const colors = ["#9575ff", "#8a63ff", "#7d52ff", "#6e3fff"]
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f1424]">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="relative mb-8 flex items-center"
      >
        {/* Logo */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative h-16 w-16"
        >
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            style={{
              filter: `drop-shadow(0 0 10px ${colors[colorIndex]})`
            }}
          >
            <motion.path
              d="M50 10 L90 90 L10 90 Z"
              fill="none"
              stroke={colors[colorIndex]}
              strokeWidth="4"
              animate={{
                strokeDasharray: ["0,1000", "1000,0"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(circle, ${colors[colorIndex]}20 0%, transparent 70%)`,
                `radial-gradient(circle, ${colors[colorIndex]}40 0%, transparent 70%)`,
                `radial-gradient(circle, ${colors[colorIndex]}20 0%, transparent 70%)`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <motion.p
          animate={{ color: colors[colorIndex] }}
          transition={{ duration: 0.5 }}
          className="text-lg font-medium"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  )
}

