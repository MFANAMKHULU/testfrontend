"use client"

import { motion } from "framer-motion"
import { ParallaxSection } from "@/components/parallax-section"
import { AnimatedContent } from "@/components/animated-content"
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel"

export function Testimonials() {
  return (
    <section className="py-20 relative">
      {/* Dark blue gradient background matching the theme */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#32147f] via-[#140047] to-[#140047] z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#9575ff] rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0,
              scale: 0
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -50, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container-narrow relative z-10">
        <ParallaxSection direction="up" speed={0.2} className="mb-16">
          <div className="text-center">
            <AnimatedContent>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Users Say</h2>
            </AnimatedContent>
            <AnimatedContent delay={0.1}>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of satisfied advertisers and ad buyers on our platform
              </p>
            </AnimatedContent>
          </div>
        </ParallaxSection>

        <div className="min-h-[500px] flex flex-col justify-center">
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  )
}

