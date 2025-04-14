"use client"

import React from "react"
import { motion } from "framer-motion"
import { Meteors } from "./ui/meteors"
import { 
  Upload, 
  Settings, 
  BarChart3, 
  Wallet, 
  Search, 
  Lightbulb, 
  Rocket, 
  LineChart 
} from "lucide-react"

const steps = [
  {
    title: "For Advertisers",
    steps: [
      {
        title: "List Your Space",
        description: "Create a listing for your ad space with details about your audience, reach, and pricing.",
        icon: Upload,
        color: "from-[#32147f] to-[#4a1fb8]",
      },
      {
        title: "Set Your Terms",
        description: "Define your advertising guidelines, content restrictions, and preferred payment methods.",
        icon: Settings,
        color: "from-[#32147f] to-[#4a1fb8]",
      },
      {
        title: "Review Offers",
        description: "Receive and review offers from potential advertisers, negotiate terms, and accept the best fit.",
        icon: BarChart3,
        color: "from-[#32147f] to-[#4a1fb8]",
      },
      {
        title: "Get Paid",
        description: "Once the campaign is complete, receive payment directly to your preferred method.",
        icon: Wallet,
        color: "from-[#32147f] to-[#4a1fb8]",
      },
    ],
  },
  {
    title: "For Ad Buyers",
    steps: [
      {
        title: "Browse Spaces",
        description: "Explore a wide range of ad spaces across different platforms and audience demographics.",
        icon: Search,
        color: "from-[#32147f] to-[#4a1fb8]",
      },
      {
        title: "Make Offers",
        description: "Submit offers for ad spaces that match your target audience and campaign goals.",
        icon: Lightbulb,
        color: "from-[#32147f] to-[#4a1fb8]",
      },
      {
        title: "Launch Campaign",
        description: "Once your offer is accepted, upload your ad content and launch your campaign.",
        icon: Rocket,
        color: "from-[#32147f] to-[#4a1fb8]",
      },
      {
        title: "Track Performance",
        description: "Monitor your campaign's performance with detailed analytics and insights.",
        icon: LineChart,
        color: "from-[#32147f] to-[#4a1fb8]",
      },
    ],
  },
]

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
      <Meteors number={20} className="absolute inset-0" />
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 bg-transparent font-['Calibri',sans-serif] relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400"
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
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover how our platform has transformed advertising for businesses and creators alike
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.2 }}
              className="relative"
            >
              {/* Card content */}
              <div className="relative p-4 bg-black/50 backdrop-blur-xl rounded-lg border border-gray-700/40 shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent rounded-lg" />
                <div className="relative">
                  <h3 className="text-lg font-bold mb-4 text-white">{section.title}</h3>
                  <div className="space-y-3">
                    {section.steps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-start gap-2 group hover:bg-black/30 p-2 rounded-md transition-all duration-300"
                        >
                          <motion.div
                            className="flex-shrink-0 w-8 h-8 rounded-md bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center text-white group-hover:scale-110 group-hover:from-[#9575ff] group-hover:to-[#b388ff] transition-all duration-300 shadow-[0_0_10px_rgba(149,117,255,0.3)]"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="w-4 h-4" />
                          </motion.div>
                          <div>
                            <h4 className="text-base font-semibold mb-1 text-white group-hover:text-[#9575ff] transition-colors duration-300">
                              {step.title}
                            </h4>
                            <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

