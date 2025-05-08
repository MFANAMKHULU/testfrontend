"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, TrendingUp, Users, DollarSign, Heart, Share2, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

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
    monthlyRevenue: "$12,500",
    activeClients: 15,
    verified: true,
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
    monthlyRevenue: "$9,800",
    activeClients: 12,
    verified: true,
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
    monthlyRevenue: "$15,200",
    activeClients: 18,
    verified: true,
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
    monthlyRevenue: "$18,500",
    activeClients: 22,
    verified: true,
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
    monthlyRevenue: "$14,800",
    activeClients: 19,
    verified: true,
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
    monthlyRevenue: "$21,300",
    activeClients: 25,
    verified: true,
  },
]

export default function AffiliatesPage() {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const filteredAffiliates = affiliates.filter(affiliate =>
    affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    affiliate.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1424]">
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
        <div className="container py-8">
          <div className="flex flex-col items-center justify-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-6">Discover Affiliates</h1>
            <div className="w-full max-w-2xl mb-6">
              <Input
                placeholder="Search affiliates by name or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#1a1e32]/80 backdrop-blur-sm border-[#2a2e45] text-white placeholder-gray-400 focus:border-[#9575ff] focus:ring-[#9575ff]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAffiliates.map((affiliate) => (
              <motion.div
                key={affiliate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: theme === 'dark' ? 'rgba(24, 24, 32, 0.92)' : 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  padding: '1.5rem',
                  backdropFilter: 'blur(2px)',
                  border: theme === 'dark' ? '1px solid #222' : '1px solid #eee',
                  transition: 'all 0.2s ease-in-out',
                  position: 'relative',
                }}
                className="relative"
              >
                {/* Header: Avatar, Name, Verified, Subtitle */}
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={affiliate.avatar} alt={affiliate.name} />
                    <AvatarFallback>{affiliate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{affiliate.name}</span>
                      {affiliate.verified && (
                        <span className="ml-1 px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-medium">Verified</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Posted an ad</span>
                  </div>
                </div>

                {/* Title */}
                <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">{affiliate.expertise} Channel</div>

                {/* Description */}
                <div className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Top {affiliate.expertise.toLowerCase()} channel with high engagement and proven results. Perfect for brands in this niche.
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">{affiliate.expertise.split(" ")[0]}</Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">Affiliate</Badge>
                </div>

                {/* Price */}
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">{affiliate.monthlyRevenue} <span className="text-base font-normal text-gray-500 dark:text-gray-400">/mo</span></div>

                {/* Metrics */}
                <div className="bg-gray-50 dark:bg-[#232336] rounded-lg p-3 text-xs text-gray-700 dark:text-gray-300 mb-2">
                  <div className="mb-1"><span className="font-semibold">Rating:</span> {affiliate.rating} ({affiliate.reviews} reviews)</div>
                  <div className="mb-1"><span className="font-semibold">Commission Rate:</span> {affiliate.commission}</div>
                  <div className="mb-1"><span className="font-semibold">Conversions:</span> {affiliate.conversions}</div>
                  <div className="mb-1"><span className="font-semibold">Active Clients:</span> {affiliate.activeClients}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
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
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

