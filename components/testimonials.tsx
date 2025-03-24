"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { ParallaxSection } from "@/components/parallax-section"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedContent } from "@/components/animated-content"
import { AnimatedList } from "@/components/animated-list"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director at TechCorp",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "We've been able to increase our ad revenue by 300% since joining All Things Ads. The platform makes it so easy to manage our ad spaces and connect with quality advertisers.",
    type: "Advertiser",
  },
  {
    name: "Michael Chen",
    role: "Growth Lead at StartupX",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Finding the right advertising channels used to be a nightmare. All Things Ads simplified the process and helped us discover high-performing ad spaces that perfectly match our target audience.",
    type: "Ad Buyer",
  },
  {
    name: "Jessica Williams",
    role: "Independent Content Creator",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "As a blogger, I struggled to monetize my platform effectively. All Things Ads connected me with premium brands willing to pay top dollar for my audience. Game changer!",
    type: "Advertiser",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 relative">
      {/* Dark blue gradient background matching the theme */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Users Say</h2>
            </AnimatedContent>
            <AnimatedContent delay={0.1}>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of satisfied advertisers and ad buyers on our platform
              </p>
            </AnimatedContent>
          </div>
        </ParallaxSection>

        <AnimatedList className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {testimonials.map((testimonial, index) => (
            <AnimatedCard key={index} intensity={5}>
              <Card className="bg-[#1a1e32]/80 backdrop-blur-sm h-full border border-[#2a2e45]">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Avatar className="h-12 w-12 border-2 border-[#9575ff]/30">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-[#9575ff]/20 text-white">{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Quote className="h-6 w-6 text-[#9575ff]/60" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4 text-gray-300 italic">
                    "{testimonial.content}"
                  </CardDescription>
                  <CardTitle className="text-base text-white">{testimonial.name}</CardTitle>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <span className="text-xs bg-[#9575ff]/20 text-[#9575ff] px-2 py-1 rounded-full">
                      {testimonial.type}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </AnimatedList>
      </div>
    </section>
  )
}

