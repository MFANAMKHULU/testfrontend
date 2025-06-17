"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, TrendingUp, Users, DollarSign, Heart, Share2, Check, Twitter, Facebook } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample affiliate data
const affiliates = [
  {
    id: 1,
    name: "John Smith",
    avatar: "/placeholder.svg?height=100&width=100",
    expertise: "SaaS & Marketing",
    rating: 4.9,
    reviews: 87,
    commission: "15%",
    conversions: "12.5%",
    monthlyRevenue: "R187,500",
    activeClients: 15,
    verified: true,
    topProducts: ["Marketing Software", "CRM Tools", "Analytics Platforms"],
    audience: {
      size: "500K+",
      demographics: "25-45",
      interests: ["Business", "Technology", "Marketing"],
      locations: ["South Africa", "UK", "US"]
    },
    performance: {
      avgOrderValue: "R12,500",
      returnRate: "2.3%",
      customerLifetime: "18 months"
    }
  },
  {
    id: 2,
    name: "Emma Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    expertise: "Finance & Investing",
    rating: 4.8,
    reviews: 65,
    commission: "12%",
    conversions: "10.2%",
    monthlyRevenue: "R147,000",
    activeClients: 12,
    verified: true,
    topProducts: ["Investment Platform", "Financial Planning Software"],
    audience: {
      size: "300K+",
      demographics: "30-55",
      interests: ["Finance", "Investing", "Economy"],
      locations: ["Europe", "Australia"]
    },
    performance: {
      avgOrderValue: "R10,000",
      returnRate: "1.8%",
      customerLifetime: "24 months"
    }
  },
  {
    id: 3,
    name: "David Chen",
    avatar: "/placeholder.svg?height=100&width=100",
    expertise: "Health & Fitness",
    rating: 4.7,
    reviews: 92,
    commission: "18%",
    conversions: "14.8%",
    monthlyRevenue: "R228,000",
    activeClients: 18,
    verified: true,
    topProducts: ["Fitness App", "Nutrition Tracking Software"],
    audience: {
      size: "400K+",
      demographics: "20-50",
      interests: ["Health", "Fitness", "Wellness"],
      locations: ["North America", "Asia"]
    },
    performance: {
      avgOrderValue: "R15,000",
      returnRate: "2.5%",
      customerLifetime: "18 months"
    }
  },
  {
    id: 4,
    name: "Sarah Wilson",
    avatar: "/placeholder.svg?height=100&width=100",
    expertise: "E-commerce & Retail",
    rating: 4.9,
    reviews: 78,
    commission: "20%",
    conversions: "15.3%",
    monthlyRevenue: "R277,500",
    activeClients: 22,
    verified: true,
    topProducts: ["E-commerce Platform", "Online Shopping App"],
    audience: {
      size: "600K+",
      demographics: "18-65",
      interests: ["E-commerce", "Retail", "Fashion"],
      locations: ["Global"]
    },
    performance: {
      avgOrderValue: "R10,000",
      returnRate: "1.5%",
      customerLifetime: "12 months"
    }
  },
  {
    id: 5,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=100&width=100",
    expertise: "Tech & Gadgets",
    rating: 4.8,
    reviews: 103,
    commission: "16%",
    conversions: "13.7%",
    monthlyRevenue: "R222,000",
    activeClients: 19,
    verified: true,
    topProducts: ["Smartphone", "Laptop", "Wearable Tech"],
    audience: {
      size: "350K+",
      demographics: "18-55",
      interests: ["Technology", "Gadgets", "Innovation"],
      locations: ["Global"]
    },
    performance: {
      avgOrderValue: "R12,000",
      returnRate: "2.0%",
      customerLifetime: "18 months"
    }
  },
  {
    id: 6,
    name: "Lisa Anderson",
    avatar: "/placeholder.svg?height=100&width=100",
    expertise: "Beauty & Fashion",
    rating: 4.9,
    reviews: 156,
    commission: "22%",
    conversions: "16.2%",
    monthlyRevenue: "R319,500",
    activeClients: 25,
    verified: true,
    topProducts: ["Cosmetic Products", "Fashion Apparel"],
    audience: {
      size: "550K+",
      demographics: "20-60",
      interests: ["Beauty", "Fashion", "Lifestyle"],
      locations: ["Global"]
    },
    performance: {
      avgOrderValue: "R15,000",
      returnRate: "1.8%",
      customerLifetime: "12 months"
    }
  },
]

export default function AffiliatesPage() {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAffiliate, setSelectedAffiliate] = useState<typeof affiliates[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const cardsPerPage = 3

  const filteredAffiliates = affiliates.filter(affiliate =>
    affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    affiliate.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredAffiliates.length / cardsPerPage)
  const paginatedAffiliates = filteredAffiliates.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  const handleViewDetails = (affiliate: typeof affiliates[0]) => {
    setSelectedAffiliate(affiliate)
    setIsModalOpen(true)
  }

  const handleShare = async (affiliate: typeof affiliates[0], platform: 'twitter' | 'facebook') => {
    const shareUrl = `${window.location.origin}/affiliates/${affiliate.id}`
    const shareText = `Check out ${affiliate.name}'s affiliate profile on our platform!`

    if (platform === 'twitter') {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
      window.open(twitterUrl, '_blank')
    } else if (platform === 'facebook') {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
      window.open(facebookUrl, '_blank')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('/images/adspace.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <Navbar />
      <main className="flex-1 relative z-10">
        <div className="container py-12">
          <div className="text-center py-5">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Discover Affiliates
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connect with verified affiliates who can help grow your brand
            </p>
            <div className="max-w-2xl mx-auto mb-4">
              <Input
                type="search"
                placeholder="Search affiliates by name or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem'
          }}>
            {paginatedAffiliates.map((affiliate) => (
              <motion.div
                key={affiliate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-80 h-[480px] rounded-2xl border shadow-xl p-6 flex flex-col items-center justify-between transition-all duration-300 group overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-[#222] border-gray-200'}`}
              >
                {/* Header: Avatar, Name, Verified, Subtitle */}
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={affiliate.avatar} alt={affiliate.name} />
                    <AvatarFallback>{affiliate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold dark:text-white">{affiliate.name}</span>
                      {affiliate.verified && (
                        <span className="ml-1 px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-medium">Verified</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-300">Posted an ad</span>
                  </div>
                </div>

                {/* Title */}
                <div className="font-bold text-lg dark:text-white mb-1">{affiliate.expertise} Channel</div>

                {/* Description */}
                <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">
                  Top {affiliate.expertise.toLowerCase()} channel with high engagement and proven results. Perfect for brands in this niche.
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">{affiliate.expertise.split(" ")[0]}</Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200">Affiliate</Badge>
                </div>

                {/* Price */}
                <div className="text-xl font-bold dark:text-white mb-2">{affiliate.monthlyRevenue} <span className="text-base font-normal text-gray-500 dark:text-gray-300">/mo</span></div>

                {/* Metrics */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-xs text-gray-700 dark:text-gray-200 mb-2 w-full">
                  <div className="mb-1"><span className="font-semibold">Rating:</span> {affiliate.rating} ({affiliate.reviews} reviews)</div>
                  <div className="mb-1"><span className="font-semibold">Commission Rate:</span> {affiliate.commission}</div>
                  <div className="mb-1"><span className="font-semibold">Conversions:</span> {affiliate.conversions}</div>
                  <div className="mb-1"><span className="font-semibold">Active Clients:</span> {affiliate.activeClients}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto w-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-50 dark:hover:bg-[#2a2e45] text-gray-400 hover:text-red-500"
                    onClick={() => toggleFavorite(affiliate.id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${favorites.has(affiliate.id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-blue-50 dark:hover:bg-[#2a2e45] text-gray-400 hover:text-blue-500"
                    onClick={() => handleShare(affiliate, 'twitter')}
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-blue-50 dark:hover:bg-[#2a2e45] text-gray-400 hover:text-blue-500"
                    onClick={() => handleShare(affiliate, 'facebook')}
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    onClick={() => handleViewDetails(affiliate)}
                  >
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-cyan-400 text-white disabled:opacity-50 hover:bg-cyan-500 transition"
              >
                Prev
              </button>
              <span className="text-black font-semibold dark:text-white">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-cyan-400 text-white disabled:opacity-50 hover:bg-cyan-500 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className={`w-full max-w-2xl ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-[#222]'}`}>
          {selectedAffiliate && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedAffiliate.avatar} alt={selectedAffiliate.name} />
                    <AvatarFallback>{selectedAffiliate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                      {selectedAffiliate.name}
                      {selectedAffiliate.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Verified
                        </Badge>
                      )}
                    </DialogTitle>
                    <p className="text-gray-500 dark:text-gray-400">{selectedAffiliate.expertise}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Performance Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold">{selectedAffiliate.monthlyRevenue}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Monthly Revenue</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold">{selectedAffiliate.commission}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Commission Rate</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold">{selectedAffiliate.conversions}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="text-2xl font-bold">{selectedAffiliate.activeClients}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Active Clients</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Top Products</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAffiliate.topProducts?.map((product, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Audience Insights</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Size</span>
                        <span className="font-medium">{selectedAffiliate.audience?.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Age Range</span>
                        <span className="font-medium">{selectedAffiliate.audience?.demographics}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Top Interests</span>
                        <span className="font-medium">{selectedAffiliate.audience?.interests.join(", ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Locations</span>
                        <span className="font-medium">{selectedAffiliate.audience?.locations.join(", ")}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Avg Order Value</span>
                        <span className="font-medium">{selectedAffiliate.performance?.avgOrderValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Return Rate</span>
                        <span className="font-medium">{selectedAffiliate.performance?.returnRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Customer Lifetime</span>
                        <span className="font-medium">{selectedAffiliate.performance?.customerLifetime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="border-gray-200 dark:border-gray-700"
                >
                  Close
                </Button>
                <Button className="bg-primary hover:bg-primary/90">
                  Start Collaboration
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

