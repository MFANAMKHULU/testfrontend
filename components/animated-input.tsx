"use client"

import { forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { InputProps } from "@/components/ui/input"

const MotionInput = motion(Input)

export interface AnimatedInputProps extends InputProps {
  focusScale?: number
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, focusScale = 1.02, ...props }, ref) => {
    return (
      <MotionInput
        ref={ref}
        className={cn("transition-all duration-200", className)}
        whileFocus={{ scale: focusScale, boxShadow: "0 0 0 2px rgba(var(--primary), 0.2)" }}
        transition={{ duration: 0.2 }}
        {...props}
      />
    )
  },
)
AnimatedInput.displayName = "AnimatedInput"

