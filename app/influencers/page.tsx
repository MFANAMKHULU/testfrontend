"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Eye, Filter, Instagram, Youtube, Twitter, Globe, Twitch } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageContainer } from "@/components/page-container"
import { AnimatedContent } from "@/components/animated-content"
import { InfluencerCard } from "@/components/influencer-card"

// Sample data for influencers
const influencers = [
  {
    id: 1,
    name: "Alex Morgan",
    handle: "@techreviewalex",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Tech reviewer and gadget enthusiast with a focus on consumer electronics and smartphones",
    platform: "YouTube",
    icon: Youtube,
    metrics: {
      followers: "850K",
      engagement: "4.2%",
      avgViews: "120K",
    },
    price: 3500,
    priceModel: "per video",
    category: "Technology",
    tags: ["Tech Reviews", "Gadgets", "Unboxing"],
    rating: 4.8,
    reviews: 124,
    verified: true,
  },
  {
    id: 2,
    name: "Sophia Chen",
    handle: "@sophiastyle",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Fashion and lifestyle influencer sharing outfit ideas, beauty tips, and travel experiences",
    platform: "Instagram",
    icon: Instagram,
    metrics: {
      followers: "1.2M",
      engagement: "3.8%",
      avgLikes: "45K",
    },
    price: 2800,
    priceModel: "per post",
    category: "Fashion",
    tags: ["Fashion", "Lifestyle", "Beauty"],
    rating: 4.7,
    reviews: 186,
    verified: true,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    handle: "@fitnesswithmark",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Fitness coach and nutrition expert sharing workout routines, meal plans, and health advice",
    platform: "Instagram",
    icon: Instagram,
    metrics: {
      followers: "650K",
      engagement: "5.1%",
      avgLikes: "32K",
    },
    price: 1800,
    priceModel: "per post",
    category: "Health & Fitness",
    tags: ["Fitness", "Nutrition", "Wellness"],
    rating: 4.9,
    reviews: 92,
    verified: true,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    handle: "@emilyeats",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Food blogger and recipe creator specializing in easy, healthy meals and baking tutorials",
    platform: "Blog",
    icon: Globe,
    metrics: {
      followers: "420K",
      engagement: "4.5%",
      monthlyViews: "800K",
    },
    price: 1500,
    priceModel: "per article",
    category: "Food & Cooking",
    tags: ["Recipes", "Food", "Cooking"],
    rating: 4.6,
    reviews: 78,
    verified: true,
  },
  {
    id: 5,
    name: "David Kim",
    handle: "@davidgaming",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Gaming streamer and content creator covering new releases, gameplay strategies, and industry news",
    platform: "Twitch",
    icon: Twitch,
    metrics: {
      followers: "950K",
      engagement: "6.2%",
      avgViewers: "15K",
    },
    price: 2200,
    priceModel: "per stream",
    category: "Gaming",
    tags: ["Gaming", "Streaming", "Reviews"],
    rating: 4.7,
    reviews: 103,
    verified: true,
  },
  {
    id: 6,
    name: "Sarah Williams",
    handle: "@sarahfinance",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Financial advisor and educator sharing investment tips, budgeting strategies, and economic insights",
    platform: "Twitter",
    icon: Twitter,
    metrics: {
      followers: "380K",
      engagement: "3.9%",
      avgRetweets: "1.2K",
    },
    price: 1200,
    priceModel: "per thread",
    category: "Finance",
    tags: ["Finance", "Investing", "Money"],
    rating: 4.5,
    reviews: 67,
    verified: true,
  },
  {
    id: 7,
    name: "James Wilson",
    handle: "@travelwithjames",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Travel vlogger documenting adventures around the world with tips on budget travel and hidden gems",
    platform: "YouTube",
    icon: Youtube,
    metrics: {
      followers: "720K",
      engagement: "4.8%",
      avgViews: "95K",
    },
    price: 2500,
    priceModel: "per video",
    category: "Travel",
    tags: ["Travel", "Adventure", "Vlogging"],
    rating: 4.8,
    reviews: 112,
    verified: true,
  },
  {
    id: 8,
    name: "Olivia Parker",
    handle: "@oliviaparenting",
    avatar: "/placeholder.svg?height=100&width=100",
    description:
      "Parenting expert and mom of three sharing advice on child development, education, and family activities",
    platform: "Instagram",
    icon: Instagram,
    metrics: {
      followers: "520K",
      engagement: "5.5%",
      avgLikes: "28K",
    },
    price: 1600,
    priceModel: "per post",
    category: "Parenting",
    tags: ["Parenting", "Family", "Kids"],
    rating: 4.9,
    reviews: 89,
    verified: true,
  },
]

// Categories for filtering
const categories = [
  "All Categories",
  "Technology",
  "Fashion",
  "Health & Fitness",
  "Food & Cooking",
  "Gaming",
  "Finance",
  "Travel",
  "Parenting",
]

// Platform types for filtering
const platformTypes = ["All Platforms", "YouTube", "Instagram", "Twitter", "Blog", "Twitch"]

export default function InfluencersPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesCategory =
      selectedCategory === "All Categories" || influencer.category === selectedCategory
    const matchesPlatform =
      selectedPlatform === "All Platforms" || influencer.platform === selectedPlatform
    const matchesPrice =
      influencer.price >= priceRange[0] && influencer.price <= priceRange[1]
    const matchesSearch =
      influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      influencer.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )

    return matchesCategory && matchesPlatform && matchesPrice && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0B2C] via-[#1a1145] to-[#2a1760] relative">
      <Navbar />
      <PageContainer>
        <div className="py-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-4xl font-bold text-white text-center">Find Influencers</h1>
              <div className="flex items-center gap-4">
                <Input
                  placeholder="Search influencers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[300px] bg-white/90"
                />
                <Button
                  variant="outline"
                  className="border-purple-200 text-white hover:bg-purple-800/50 transition-all duration-300"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>
            </div>

            {/* Filters section */}
            {showFilters && (
              <AnimatedContent className="grid gap-6 p-6 rounded-lg bg-white/90 backdrop-blur-sm border border-purple-200/50 shadow-lg">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Platform</label>
                    <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platformTypes.map((platform) => (
                          <SelectItem key={platform} value={platform}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Price Range</label>
                    <div className="pt-2">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={5000}
                        step={100}
                        onValueChange={setPriceRange}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory("All Categories")
                      setSelectedPlatform("All Platforms")
                      setPriceRange([0, 5000])
                      setSearchQuery("")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </AnimatedContent>
            )}

            {/* Results count */}
            <div className="text-center text-white/80">
              Showing {filteredInfluencers.length} influencers
            </div>

            {/* Grid of influencer cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-4">
              {filteredInfluencers.map((influencer) => (
                <InfluencerCard key={influencer.id} influencer={influencer} />
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  )
}

