"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { AnimatedButton } from "@/components/animated-button"
import { AnimatedInput } from "@/components/animated-input"

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
  onSignUp: () => void
}

export function SignInModal({ isOpen, onClose, onSignUp }: SignInModalProps) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [colorIndex, setColorIndex] = React.useState(0)

  // Logo colors for the border
  const logoColors = [
    "#6B54FA", // Purple
    "#FA6565", // Pink/Red
    "#F9CA56", // Yellow/Gold
    "#53E2D2"  // Teal
  ]

  // Color rotation effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % logoColors.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign in logic here
    console.log("Sign in with:", { email, password })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md mx-4"
          >
            <div className="bg-[#1a1e32] border border-[#2a2e45] rounded-xl shadow-lg p-6">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div 
                  className="relative flex items-center justify-center"
                  style={{ 
                    border: `2px solid ${logoColors[colorIndex]}`,
                    transition: "border-color 0.5s ease-in-out",
                    borderRadius: "50%",
                    width: "52px",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Image 
                    src="/images/Picture1.png" 
                    alt="Logo" 
                    width={44} 
                    height={44}
                    className="overflow-hidden" 
                    priority
                    style={{ 
                      borderRadius: "50%",
                      objectFit: "contain"
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Sign In</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <AnimatedInput
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <AnimatedInput
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-600 text-[#9575ff] focus:ring-[#9575ff] focus:ring-0 focus:ring-offset-0" />
                    <span className="text-sm text-gray-300">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-[#9575ff] hover:text-[#8a63ff]">
                    Forgot password?
                  </button>
                </div>

                <AnimatedButton
                  type="submit"
                  variant="primary-gradient"
                  className="w-full"
                  hoverScale={1.02}
                  glowOnHover={true}
                  sweep={true}
                >
                  Sign In
                </AnimatedButton>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      onSignUp()
                    }}
                    className="text-[#9575ff] hover:text-[#8a63ff] font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 