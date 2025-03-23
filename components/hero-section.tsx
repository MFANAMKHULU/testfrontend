"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ParallaxSection } from "@/components/parallax-section"
import { MarketingIllustrations } from "@/components/marketing-illustrations"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  // Handle mouse move for interactive elements
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    // Calculate mouse position relative to the container
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Update gradient position (0-100 range for CSS gradient)
    const gradientX = (x / rect.width) * 100
    const gradientY = (y / rect.height) * 100

    // Update CSS variables for gradient text
    containerRef.current.style.setProperty("--x", `${gradientX}%`)
    containerRef.current.style.setProperty("--y", `${gradientY}%`)
  }

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties
      }
    >
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>

      {/* Marketing illustrations that float and respond to mouse */}
      <MarketingIllustrations />

      <div className="container-narrow relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <motion.h1 ref={textRef} variants={item} className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            The Marketplace for{" "}
            <span className="relative inline-block">
              <span className="interactive-gradient-text">Advertising Spaces</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with advertisers who own premium marketing spaces or find the perfect platform for your next ad
            campaign.
          </motion.p>

          <motion.div variants={item}>
            <Tabs defaultValue="find-spaces" className="max-w-2xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="find-spaces"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Find Ad Spaces
                </TabsTrigger>
                <TabsTrigger
                  value="list-space"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  List Your Space
                </TabsTrigger>
              </TabsList>
              <TabsContent value="find-spaces">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex w-full max-w-lg mx-auto items-center space-x-2"
                >
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search for ad spaces..."
                      className="pl-10 border-primary/20 focus:border-primary"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      type="submit"
                      variant="ghost-primary"
                      className="shimmer-effect"
                    >
                      Search
                    </Button>
                  </motion.div>
                </motion.div>
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                  <span>Popular:</span>
                  <Link href="/ad-spaces?category=websites" className="hover:text-primary transition-colors">
                    Websites
                  </Link>
                  <span>•</span>
                  <Link href="/ad-spaces?category=social-media" className="hover:text-primary transition-colors">
                    Social Media
                  </Link>
                  <span>•</span>
                  <Link href="/ad-spaces?category=newsletters" className="hover:text-primary transition-colors">
                    Newsletters
                  </Link>
                  <span>•</span>
                  <Link href="/ad-spaces?category=podcasts" className="hover:text-primary transition-colors">
                    Podcasts
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="list-space">
                <div className="text-center">
                  <p className="mb-4">Start monetizing your platform today</p>
                  <Link href="/become-advertiser">
                    <motion.div
                      whileHover={{ scale: 1.03, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Button
                        variant="primary-gradient"
                        size="lg"
                        className="gap-2 sweep-effect"
                      >
                        List Your Ad Space <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>

        <ParallaxSection direction="up" speed={0.3} className="mt-12">
          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center gap-2"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold">5K+</span>
              </div>
              <div className="text-sm">
                <p className="font-medium">Ad Spaces</p>
                <p className="text-muted-foreground">Available</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center gap-2"
            >
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-xl font-bold">10K+</span>
              </div>
              <div className="text-sm">
                <p className="font-medium">Ad Buyers</p>
                <p className="text-muted-foreground">Active</p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center gap-2"
            >
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-xl font-bold">$2M+</span>
              </div>
              <div className="text-sm">
                <p className="font-medium">Ad Revenue</p>
                <p className="text-muted-foreground">Generated</p>
              </div>
            </motion.div>
          </div>
        </ParallaxSection>
      </div>
    </section>
  )
}

