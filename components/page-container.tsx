"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <>
      {/* Animated background with dark blue gradient matching the theme */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-[#0f1424] via-[#121836] to-[#1a1e32] -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Content with proper spacing */}
      <div className={cn("relative pt-32 pb-16", className)}>
        {children}
      </div>
    </>
  )
} 