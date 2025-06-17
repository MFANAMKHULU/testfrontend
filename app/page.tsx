"use client"

import { HowItWorks } from "@/components/how-it-works"
import { FeaturedSpaces } from "@/components/featured-spaces"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { AnimatedContent } from "@/components/animated-content"
import { PageContainer } from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Search, Instagram, Youtube, Twitter } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { CustomCursor } from "@/components/custom-cursor"
import { useState, useEffect } from "react"
import { Hero } from "@/components/hero"
import { CTA } from "@/components/cta"
import { VideoBackground } from "@/components/ui/video-background"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ShuffleCards } from "@/components/ui/testimonial-cards"

export default function Home() {
  const industryTypes = [
    "Digital Advertising",
    "Social Media Marketing",
    "E-Commerce Advertising",
    "Influencer Marketing"
  ]
  
  const marketplaceTypes = [
    "Marketplace",
    "Platform",
    "Network",
    "Ecosystem"
  ]
  
  // State declarations
  const [currentIndustryIndex, setCurrentIndustryIndex] = useState(0)
  const [currentMarketplaceIndex, setCurrentMarketplaceIndex] = useState(0)
  const [isIndustryChanging, setIsIndustryChanging] = useState(false)
  const [isMarketplaceChanging, setIsMarketplaceChanging] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [favoriteAdSpaces, setFavoriteAdSpaces] = useState<Set<number>>(new Set())
  const [selectedAdSpace, setSelectedAdSpace] = useState<number | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // Effect to cycle through industry types
  useEffect(() => {
    const industryInterval = setInterval(() => {
      setIsIndustryChanging(true)
      setTimeout(() => {
        setCurrentIndustryIndex((prevIndex) => (prevIndex + 1) % industryTypes.length)
        setIsIndustryChanging(false)
      }, 500) // Transition duration
    }, 7000) // Change every 7 seconds
    
    return () => clearInterval(industryInterval)
  }, [])
  
  // Effect to cycle through marketplace types
  useEffect(() => {
    // Start marketplace rotation after a 3.5-second delay to stagger animations
    const marketplaceInterval = setInterval(() => {
      setIsMarketplaceChanging(true)
      setTimeout(() => {
        setCurrentMarketplaceIndex((prevIndex) => (prevIndex + 1) % marketplaceTypes.length)
        setIsMarketplaceChanging(false)
      }, 500) // Transition duration
    }, 7000) // Change every 7 seconds
    
    return () => clearInterval(marketplaceInterval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative">
      <VideoBackground />
      <div className="relative z-10 bg-black/50 flex-1 flex flex-col min-h-screen">
        <Navbar />
        <PageContainer className="flex-1">
          <div className="py-2">
            <div className="relative shrink-0 flex flex-col gap-2 py-4">
              <video 
                className="fixed top-0 left-0 w-full h-full object-cover -z-10"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
              >
                <source src="/images/newbg.mp4" type="video/mp4" />
              </video>
              <div className="text-center py-1">
              </div>
            </div>

            <AnimatedContent>
              <div className="container-narrow relative z-10 py-2 md:py-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-4xl mx-auto text-center mb-8"
                >
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white flex flex-wrap justify-center items-baseline font-['Verdana',sans-serif]">
                    <span className="text-yellow-400 font-['Verdana',sans-serif]">The Revolutionary</span>&nbsp;
                    <span className="relative inline-block overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`industry-${currentIndustryIndex}`}
                          initial={{ y: isIndustryChanging ? 40 : 0, opacity: isIndustryChanging ? 0 : 1 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -40, opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="text-[#9575ff] whitespace-nowrap font-['Verdana',sans-serif] font-bold"
                        >
                          {industryTypes[currentIndustryIndex]}
                          <motion.span
                            className="absolute bottom-0 left-0 w-full h-1 bg-[#9575ff]/30 rounded-full"
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    &nbsp;
                    <span className="relative inline-block overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={`marketplace-${currentMarketplaceIndex}`}
                          initial={{ y: isMarketplaceChanging ? 40 : 0, opacity: isMarketplaceChanging ? 0 : 1 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -40, opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="whitespace-nowrap text-white/90 font-['Verdana',sans-serif] font-bold"
                        >
                          {marketplaceTypes[currentMarketplaceIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </h1>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative z-10 mb-10"
                  >
                    <div className="bg-gradient-to-r from-[#0c0025]/80 via-[#140047]/60 to-[#0c0025]/80 backdrop-blur-md rounded-2xl border border-[#4f2da3]/30 px-6 py-6 max-w-2xl mx-auto shadow-lg">
                      <p className="text-lg md:text-xl text-white/90 mb-8 font-medium font-['Verdana',sans-serif] leading-relaxed">
                        Connect <span className="text-white font-semibold font-['Verdana',sans-serif]">Businesses</span> with <span className="text-white font-semibold font-['Verdana',sans-serif]">Advertisers,</span> <span className="text-white font-semibold font-['Verdana',sans-serif]">Influencers,</span> and <span className="text-white font-semibold font-['Verdana',sans-serif]">Affiliates</span> through an <span className="relative inline-block font-['Verdana',sans-serif] text-white">
                          AI-powered
                          <motion.span 
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-white" 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                          />
                        </span> ecosystem.
                      </p>

                      <Tabs defaultValue="find-spaces" className="relative">
                        <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#1a1e32]/40 border border-[#2a2e45] p-1 rounded-lg">
                          <TabsTrigger
                            value="find-spaces"
                            className="data-[state=active]:bg-[#9575ff] data-[state=active]:text-white text-gray-300 rounded-md transition-all duration-300 font-['Verdana',sans-serif] font-medium"
                          >
                            Find Ad Platforms
                          </TabsTrigger>
                          <TabsTrigger
                            value="list-space"
                            className="data-[state=active]:bg-[#9575ff] data-[state=active]:text-white text-gray-300 rounded-md transition-all duration-300 font-['Verdana',sans-serif] font-medium"
                          >
                            List Your Services
                          </TabsTrigger>
                        </TabsList>
                        
                        <motion.div 
                          className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-r from-[#6B54FA] via-[#9575ff] to-[#53E2D2] opacity-20 blur-md -z-10"
                          animate={{ 
                            opacity: [0.1, 0.2, 0.1],
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            repeatType: "mirror"
                          }}
                        />
                        
                        <TabsContent value="find-spaces">
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                          >
                            <div className="flex w-full items-center space-x-2">
                              <div className="relative flex-1 group">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-[#9575ff] transition-colors" />
                                <Input
                                  type="text"
                                  placeholder="Search for advertisers, influencers, or ad packages..."
                                  className="pl-10 bg-[#1a1e32]/70 border-[#2a2e45] focus-within:border-[#9575ff] text-white rounded-lg transition-all font-['Verdana',sans-serif]"
                                />
                                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#6B54FA]/10 to-[#53E2D2]/10 animate-pulse" />
                                </div>
                              </div>
                              <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              >
                                <Button
                                  type="submit"
                                  className="bg-gradient-to-r from-[#6B54FA] to-[#9575ff] hover:from-[#8a63ff] hover:to-[#b18aff] text-white font-medium rounded-lg transition-all duration-300 px-5 font-['Verdana',sans-serif]"
                                >
                                  Search
                                </Button>
                              </motion.div>
                            </div>
                            
                            <div className="flex flex-wrap justify-center gap-3 mt-5 text-sm">
                              <span className="text-[#9575ff] font-['Verdana',sans-serif]">Popular:</span>
                              <div className="flex flex-wrap gap-3 items-center">
                                <Link href="/ad-spaces?category=websites" className="text-gray-300 hover:text-[#9575ff] transition-colors px-3 py-1 rounded-full bg-[#1a1e32]/50 border border-[#2a2e45]/50 hover:border-[#9575ff]/50 font-['Verdana',sans-serif] text-sm">
                                  Influencer Marketing
                                </Link>
                                <Link href="/ad-spaces?category=social-media" className="text-gray-300 hover:text-[#53E2D2] transition-colors px-3 py-1 rounded-full bg-[#1a1e32]/50 border border-[#2a2e45]/50 hover:border-[#53E2D2]/50 font-['Verdana',sans-serif] text-sm">
                                  Social Media Ads
                                </Link>
                                <Link href="/ad-spaces?category=newsletters" className="text-gray-300 hover:text-[#F9CA56] transition-colors px-3 py-1 rounded-full bg-[#1a1e32]/50 border border-[#2a2e45]/50 hover:border-[#F9CA56]/50 font-['Verdana',sans-serif] text-sm">
                                  Billboards
                                </Link>
                                <Link href="/ad-spaces?category=podcasts" className="text-gray-300 hover:text-[#FA6565] transition-colors px-3 py-1 rounded-full bg-[#1a1e32]/50 border border-[#2a2e45]/50 hover:border-[#FA6565]/50 font-['Verdana',sans-serif] text-sm">
                                  Radio Ads
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        </TabsContent>
                        
                        <TabsContent value="list-space">
                          <div className="text-center">
                            <p className="mb-5 text-white/80 font-medium font-['Verdana',sans-serif]">Start monetizing your platform today</p>
                            <Link href="/become-advertiser">
                              <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              >
                                <Button
                                  className="bg-gradient-to-r from-[#FA6565] to-[#F9CA56] hover:from-[#ff7a7a] hover:to-[#ffd76b] text-white font-medium gap-2 px-6 py-6 rounded-lg shadow-lg font-['Verdana',sans-serif]"
                                  size="lg"
                                >
                                  Get Started <ArrowRight className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </Link>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </motion.div>
                </motion.div>
                
              </div>
            </AnimatedContent>

            <AnimatedContent className="pb-0">
              <HowItWorks />
            </AnimatedContent>
          </div>

          <div className="my-12">
                  <ShuffleCards />
                </div>

                <Footer />
        </PageContainer>
      </div>
     
     
      
    </div>
  )
}

