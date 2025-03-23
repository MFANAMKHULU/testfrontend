"use client"

import { motion } from "framer-motion"
import { Logo } from "@/components/logo"

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-center"
      >
        <Logo className="mx-auto mb-8" />

        <div className="relative h-2 w-48 bg-muted overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: "100%",
              transition: { duration: 1.5, ease: "easeInOut" },
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

