"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { SignInModal } from "@/components/auth/sign-in-modal"
import { SignUpModal } from "@/components/auth/sign-up-modal"
import { Home, User, FileText, Briefcase, BarChart4 } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function Navbar() {
  const pathname = usePathname()
  const [isSignInOpen, setIsSignInOpen] = React.useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false)

  // Custom nav items based on the routes in the original navbar
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Ad Spaces', url: '/ad-spaces', icon: BarChart4 },
    { name: 'Influencers', url: '/influencers', icon: User },
    { name: 'Affiliates', url: '/affiliates', icon: Briefcase },
    { name: 'Company', url: '/about', icon: FileText }
  ]

  return (
    <>
      {/* Standalone Tubelight Navbar with Logo and Buttons */}
      <NavBar 
        items={navItems} 
        onSignIn={() => setIsSignInOpen(true)}
        onSignUp={() => setIsSignUpOpen(true)}
      />

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignUp={() => {
          setIsSignInOpen(false)
          setIsSignUpOpen(true)
        }}
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </>
  )
}

