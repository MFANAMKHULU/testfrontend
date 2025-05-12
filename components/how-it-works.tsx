"use client"

import React from "react"
import { motion } from "framer-motion"
import { Meteors } from "./ui/meteors"
import { HowItWorksTimeline } from "./ui/how-it-works-timeline"

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
      <Meteors number={20} className="absolute inset-0" />
      <div className="container mx-auto px-4 pt-0 pb-4 sm:px-6 lg:px-8 bg-transparent font-['Calibri',sans-serif] relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-0"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-0 text-yellow-400"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              transition: {
                type: "spring",
                stiffness: 50,
                damping: 15,
                mass: 1
              }
            }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-0">
            Discover how our platform has transformed advertising for businesses and creators alike
          </p>
        </motion.div>

        <HowItWorksTimeline />
      </div>
    </section>
  )
}

