"use client"

import type React from "react"
import { ArrowRight, DollarSign, Search, Upload } from "lucide-react"
import { motion } from "framer-motion"
import { useRef } from "react"
import { ParallaxSection } from "@/components/parallax-section"
import { AnimatedContent } from "@/components/animated-content"
import { AnimatedList } from "@/components/animated-list"

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="py-20 relative">
      {/* Animated background with dark blue gradient matching the theme */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#0f1424] via-[#121836] to-[#1a1e32] z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      <div className="container-narrow relative z-10">
        <ParallaxSection direction="up" speed={0.2} className="mb-16">
          <div className="text-center">
            <AnimatedContent>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
            </AnimatedContent>

            <AnimatedContent delay={0.1}>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Our platform connects advertisers with ad buyers in a seamless marketplace
              </p>
            </AnimatedContent>
          </div>
        </ParallaxSection>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <AnimatedContent direction="left">
            <motion.div
              className="bg-[#1a1e32]/80 backdrop-blur-sm rounded-xl p-8 shadow-sm hover-lift border border-[#2a2e45]"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-[#9575ff]/20 text-[#9575ff] p-2 rounded-lg mr-3">For Advertisers</span>
              </h3>
              <AnimatedList staggerDelay={0.15}>
                <Step
                  number={1}
                  title="List Your Ad Space"
                  description="Create a detailed listing of your website, app, newsletter, or any marketing platform."
                  icon={Upload}
                />
                <Step
                  number={2}
                  title="Receive Ad Requests"
                  description="Ad buyers will send requests to place their ads on your platform."
                  icon={Search}
                />
                <Step
                  number={3}
                  title="Earn Revenue"
                  description="Accept requests, display ads, and earn money from your platform."
                  icon={DollarSign}
                />
              </AnimatedList>
            </motion.div>
          </AnimatedContent>

          <AnimatedContent direction="right" delay={0.2}>
            <motion.div
              className="bg-[#1a1e32]/80 backdrop-blur-sm rounded-xl p-8 shadow-sm hover-lift border border-[#2a2e45]"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-[#9575ff]/20 text-[#9575ff] p-2 rounded-lg mr-3">For Ad Buyers</span>
              </h3>
              <AnimatedList staggerDelay={0.15}>
                <Step
                  number={1}
                  title="Find Ad Spaces"
                  description="Browse and search for the perfect platforms to display your ads."
                  icon={Search}
                />
                <Step
                  number={2}
                  title="Submit Your Ads"
                  description="Upload your ad creatives and set your targeting preferences."
                  icon={Upload}
                />
                <Step
                  number={3}
                  title="Track Performance"
                  description="Monitor your ad performance and optimize for better results."
                  icon={ArrowRight}
                />
              </AnimatedList>
            </motion.div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  )
}

function Step({
  number,
  title,
  description,
  icon: Icon,
}: {
  number: number
  title: string
  description: string
  icon: React.ElementType
}) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="flex gap-4 group"
    >
      <div className="h-8 w-8 rounded-full bg-[#9575ff]/20 flex items-center justify-center shrink-0 group-hover:bg-[#9575ff]/30 transition-colors text-white">
        <span className="text-sm font-bold">{number}</span>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="h-4 w-4 text-[#9575ff]" />
          <h4 className="font-medium text-white">{title}</h4>
        </div>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </motion.div>
  )
}

