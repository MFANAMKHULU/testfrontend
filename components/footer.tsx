"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Twitter, Sparkles, ArrowRight } from "lucide-react"
import { Logo } from "@/components/logo"
import { AnimatedContent } from "@/components/animated-content"
import { AnimatedInput } from "@/components/animated-input"
import { AnimatedButton } from "@/components/animated-button"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container-narrow py-12 md:py-16">
        <AnimatedContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Logo className="mb-4" />
              <p className="text-muted-foreground mb-4 text-sm">
                The premier marketplace connecting advertisers with ad buyers for seamless advertising experiences.
              </p>
              <div className="flex space-x-4">
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                    <Link href="#" aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                    <Link href="#" aria-label="Facebook">
                      <Facebook className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                    <Link href="#" aria-label="Instagram">
                      <Instagram className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                    <Link href="#" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
              <div className="mt-4">
                <Link
                  href="/ai-assistant"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Assistant
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-4">For Advertisers</h3>
              <ul className="space-y-3 text-sm">
                <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link href="/list-ad-space" className="text-muted-foreground hover:text-foreground transition-colors">
                    List Your Ad Space
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link
                    href="/success-stories"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Success Stories
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                    Resources
                  </Link>
                </motion.li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-4">For Ad Buyers</h3>
              <ul className="space-y-3 text-sm">
                <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link href="/ad-spaces" className="text-muted-foreground hover:text-foreground transition-colors">
                    Browse Ad Spaces
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link href="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">
                    Case Studies
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link href="/ad-tools" className="text-muted-foreground hover:text-foreground transition-colors">
                    Ad Tools
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </motion.li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-4">Subscribe to our newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest updates and news about advertising opportunities.
              </p>
              <div className="flex gap-2">
                <AnimatedInput placeholder="Enter your email" type="email" className="max-w-[220px] h-9" />
                <AnimatedButton size="sm" className="h-9" variant="primary-gradient" hoverScale={1.05} sweep={true}>
                  <span>Subscribe</span>
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </AnimatedButton>
              </div>
            </div>
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.2}>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All Things Ads. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </motion.div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </footer>
  )
}

