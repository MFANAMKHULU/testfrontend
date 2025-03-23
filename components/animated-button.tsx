"use client"

import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"

const MotionButton = motion(Button)

export interface AnimatedButtonProps extends ButtonProps {
  hoverScale?: number
  tapScale?: number
  glowOnHover?: boolean
  glowColor?: string
  hoverY?: number
  shimmer?: boolean
  sweep?: boolean
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      hoverScale = 1.03,
      tapScale = 0.97,
      hoverY = -2,
      children,
      asChild = false,
      glowOnHover = true,
      glowColor,
      shimmer = false,
      sweep = false,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    // When asChild is true, we need to be careful with how we structure the component
    if (asChild) {
      return (
        <Button
          ref={ref}
          className={cn(
            "relative overflow-hidden transition-all duration-200",
            shimmer && "shimmer-effect",
            sweep && "sweep-effect",
            className,
          )}
          asChild={true}
          variant={variant}
          {...props}
        >
          {children}
        </Button>
      )
    }

    // For normal usage (not asChild), we can use the motion effects
    return (
      <MotionButton
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          shimmer && "shimmer-effect",
          sweep && "sweep-effect",
          className,
        )}
        whileHover={{ scale: hoverScale, y: hoverY }}
        whileTap={{ scale: tapScale }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        variant={variant}
        {...props}
      >
        {glowOnHover && (
          <motion.span
            className={cn(
              "absolute inset-0 rounded-md opacity-0",
              variant === "default" && "bg-primary/20",
              variant === "secondary" && "bg-secondary/20",
              variant === "accent" && "bg-accent/20",
              variant === "outline" && "bg-primary/10",
              variant === "ghost" && "bg-primary/5",
              variant === "ghost-primary" && "bg-primary/10",
              variant === "primary-gradient" && "bg-white/10",
              glowColor,
            )}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </MotionButton>
    )
  },
)
AnimatedButton.displayName = "AnimatedButton"

