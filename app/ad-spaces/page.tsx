"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Eye, Filter, Globe, Mail, MessageSquare, Users, Star, StarHalf } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedContent } from "@/components/animated-content"
import { AnimatedList } from "@/components/animated-list"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedButton } from "@/components/animated-button"
import { AnimatedInput } from "@/components/animated-input"
import { motion } from "framer-motion"
import { PageContainer } from "@/components/page-container"
import { CategoryCarousel } from "@/components/category-carousel"

// Sample data for ad spaces
const adSpaces = [
  {
    id: 1,
    title: "Tech Blog Premium Banner",
    description: "Top banner position on a tech blog with 500K monthly visitors",
    type: "Website",
    icon: Globe,
    rating: 4.5,
    metrics: {
      visitors: "500K",
      impressions: "2.5M",
      ctr: "3.2%",
    },
    price: 1200,
    priceModel: "per month",
    category: "Technology",
    tags: ["Banner", "Tech", "Premium"],
  },
  {
    id: 2,
    title: "Weekly Finance Newsletter",
    description: "Sponsored section in a finance newsletter with 50K subscribers",
    type: "Newsletter",
    icon: Mail,
    rating: 4.8,
    metrics: {
      subscribers: "50K",
      openRate: "32%",
      clickRate: "8.5%",
    },
    price: 800,
    priceModel: "per issue",
    category: "Finance",
    tags: ["Newsletter", "Finance", "Weekly"],
  },
  {
    id: 3,
    title: "Fitness App In-App Ads",
    description: "Native in-app advertisements in a fitness app with 200K active users",
    type: "Mobile App",
    icon: MessageSquare,
    rating: 4.2,
    metrics: {
      users: "200K",
      sessions: "1.2M",
      engagement: "4.5 min",
    },
    price: 1500,
    priceModel: "per week",
    category: "Health & Fitness",
    tags: ["Mobile", "In-App", "Fitness"],
  },
  {
    id: 4,
    title: "Travel Influencer Promotion",
    description: "Sponsored content from a travel influencer with 350K followers",
    type: "Social Media",
    icon: Users,
    rating: 4.9,
    metrics: {
      followers: "350K",
      engagement: "4.8%",
      reach: "120K",
    },
    price: 2000,
    priceModel: "per post",
    category: "Travel",
    tags: ["Influencer", "Social Media", "Travel"],
  },
  {
    id: 5,
    title: "Food Blog Sidebar Ad",
    description: "Sidebar advertisement on a popular food blog with 300K monthly visitors",
    type: "Website",
    icon: Globe,
    rating: 4.3,
    metrics: {
      visitors: "300K",
      impressions: "1.2M",
      ctr: "2.8%",
    },
    price: 750,
    priceModel: "per month",
    category: "Food & Cooking",
    tags: ["Sidebar", "Food", "Blog"],
  },
  {
    id: 6,
    title: "Gaming YouTube Channel",
    description: "Pre-roll ad on a gaming YouTube channel with 1M subscribers",
    type: "Video",
    icon: Users,
    rating: 4.7,
    metrics: {
      subscribers: "1M",
      views: "500K",
      watchTime: "3.2 min",
    },
    price: 3000,
    priceModel: "per video",
    category: "Gaming",
    tags: ["YouTube", "Gaming", "Video"],
  },
  {
    id: 7,
    title: "Business Podcast Sponsorship",
    description: "60-second ad spot on a business podcast with 100K weekly listeners",
    type: "Podcast",
    icon: MessageSquare,
    rating: 4.6,
    metrics: {
      listeners: "100K",
      downloads: "80K",
      completion: "92%",
    },
    price: 1800,
    priceModel: "per episode",
    category: "Business",
    tags: ["Podcast", "Business", "Audio"],
  },
  {
    id: 8,
    title: "Fashion Instagram Promotion",
    description: "Sponsored post on a fashion Instagram account with 500K followers",
    type: "Social Media",
    icon: Users,
    rating: 4.4,
    metrics: {
      followers: "500K",
      engagement: "5.2%",
      reach: "200K",
    },
    price: 2500,
    priceModel: "per post",
    category: "Fashion",
    tags: ["Instagram", "Fashion", "Social Media"],
  },
]

// Categories for filtering
const categories = [
  "All Categories",
  "Technology",
  "Finance",
  "Health & Fitness",
  "Travel",
  "Food & Cooking",
  "Gaming",
  "Business",
  "Fashion",
]

// Platform types for filtering
const platformTypes = ["All Types", "Website", "Newsletter", "Mobile App", "Social Media", "Video", "Podcast"]

// Add StarRating component
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-400" />
      ))}
      <span className="text-sm text-white/70 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function AdSpacesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0B2C] via-[#1a1145] to-[#2a1760]">
      <Navbar />
        <PageContainer>
        <div className="py-8">
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Discover Ad Spaces</h1>
              <p className="text-white/70 max-w-2xl mx-auto">
                Find the perfect advertising space for your brand across various platforms and categories
              </p>
            </div>

            {/* Category Carousel */}
            <CategoryCarousel adSpaces={adSpaces} />
          </div>
          </div>
        </PageContainer>
      <Footer />
    </div>
  )
}

