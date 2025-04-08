"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Eye, Filter } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageContainer } from "@/components/page-container"
import { AnimatedContent } from "@/components/animated-content"

// Sample data for affiliates
const affiliates = [
  {
    id: 1,
    name: "John Smith",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Experienced affiliate marketer specializing in SaaS products and digital marketing tools",
    expertise: "SaaS & Marketing",
    metrics: {
      conversions: "12.5%",
      avgCommission: "$1,200/mo",
      activeClients: "15",
    },
    commissionRate: "15%",
    commissionModel: "of sales",
    category: "Technology",
    tags: ["SaaS", "Marketing Tools", "B2B"],
    rating: 4.9,
    reviews: 87,
    verified: true,
  },
  {
    id: 2,
    name: "Emma Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    description:
      "Finance and investment affiliate with a large audience of young professionals and first-time investors",
    expertise: "Finance & Investing",
    metrics: {
      conversions: "8.7%",
      avgCommission: "$2,500/mo",
      activeClients: "8",
    },
    commissionRate: "12%",
    commissionModel: "of sales",
    category: "Finance",
    tags: ["Investment", "Personal Finance", "Banking"],
    rating: 4.7,
    reviews: 62,
    verified: true,
  },
  {
    id: 3,
    name: "David Chen",
    avatar: "/placeholder.svg?height=100&width=100",
    description:
      "Health and fitness affiliate marketer with a focus on supplements, workout equipment, and nutrition programs",
    expertise: "Health & Fitness",
    metrics: {
      conversions: "10.2%",
      avgCommission: "$1,800/mo",
      activeClients: "12",
    },
    commissionRate: "18%",
    commissionModel: "of sales",
    category: "Health & Fitness",
    tags: ["Supplements", "Fitness", "Nutrition"],
    rating: 4.8,
    reviews: 74,
    verified: true,
  },
  {
    id: 4,
    name: "Sophia Garcia",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Fashion and beauty affiliate with a strong social media presence and high engagement rates",
    expertise: "Fashion & Beauty",
    metrics: {
      conversions: "14.3%",
      avgCommission: "$3,200/mo",
      activeClients: "10",
    },
    commissionRate: "20%",
    commissionModel: "of sales",
    category: "Fashion",
    tags: ["Beauty", "Clothing", "Accessories"],
    rating: 4.9,
    reviews: 93,
    verified: true,
  },
  {
    id: 5,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Travel affiliate specializing in luxury travel packages, hotels, and travel gear",
    expertise: "Travel & Leisure",
    metrics: {
      conversions: "7.8%",
      avgCommission: "$4,500/mo",
      activeClients: "6",
    },
    commissionRate: "10%",
    commissionModel: "of sales",
    category: "Travel",
    tags: ["Luxury Travel", "Hotels", "Travel Gear"],
    rating: 4.6,
    reviews: 58,
    verified: true,
  },
  {
    id: 6,
    name: "Olivia Wilson",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "E-commerce affiliate focusing on home goods, kitchen appliances, and smart home devices",
    expertise: "Home & Kitchen",
    metrics: {
      conversions: "9.5%",
      avgCommission: "$2,100/mo",
      activeClients: "14",
    },
    commissionRate: "15%",
    commissionModel: "of sales",
    category: "Home & Kitchen",
    tags: ["Home Goods", "Appliances", "Smart Home"],
    rating: 4.7,
    reviews: 69,
    verified: true,
  },
  {
    id: 7,
    name: "James Taylor",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Gaming affiliate with expertise in gaming hardware, software, and subscription services",
    expertise: "Gaming & Entertainment",
    metrics: {
      conversions: "11.2%",
      avgCommission: "$2,800/mo",
      activeClients: "9",
    },
    commissionRate: "12%",
    commissionModel: "of sales",
    category: "Gaming",
    tags: ["Gaming Hardware", "Software", "Subscriptions"],
    rating: 4.8,
    reviews: 81,
    verified: true,
  },
  {
    id: 8,
    name: "Ava Martinez",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Education affiliate specializing in online courses, educational software, and learning resources",
    expertise: "Education & Learning",
    metrics: {
      conversions: "13.7%",
      avgCommission: "$1,900/mo",
      activeClients: "11",
    },
    commissionRate: "25%",
    commissionModel: "of sales",
    category: "Education",
    tags: ["Online Courses", "Educational Software", "Learning"],
    rating: 4.9,
    reviews: 76,
    verified: true,
  },
]

// Categories for filtering
const categories = [
  "All Categories",
  "Technology",
  "Finance",
  "Health & Fitness",
  "Fashion",
  "Travel",
  "Home & Kitchen",
  "Gaming",
  "Education",
]

export default function AffiliatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [commissionRange, setCommissionRange] = useState([0, 30])
  const [filteredAffiliates, setFilteredAffiliates] = useState(affiliates)
  const [showFilters, setShowFilters] = useState(false)

  const applyFilters = () => {
    let filtered = affiliates

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(
        (affiliate) =>
          affiliate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          affiliate.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          affiliate.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((affiliate) => affiliate.category === selectedCategory)
    }

    // Apply commission range filter
    filtered = filtered.filter((affiliate) => {
      const rate = Number.parseInt(affiliate.commissionRate)
      return rate >= commissionRange[0] && rate <= commissionRange[1]
    })

    setFilteredAffiliates(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PageContainer>
        <AnimatedContent>
          <div className="space-y-6">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Find Affiliates</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect with top-performing affiliates across various industries
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Search affiliates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:w-auto w-full"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
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
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Commission Range (%)</label>
                    <Slider
                      min={0}
                      max={30}
                      step={1}
                      value={commissionRange}
                      onValueChange={setCommissionRange}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{commissionRange[0]}%</span>
                      <span>{commissionRange[1]}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Affiliates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAffiliates.map((affiliate) => (
                <Card 
                  key={affiliate.id} 
                  className="h-full bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-xl transition-all duration-300 border-gray-700 group"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-gray-600 ring-2 ring-gray-500/20">
                        <AvatarImage src={affiliate.avatar} alt={affiliate.name} />
                        <AvatarFallback className="bg-gray-700 text-gray-200">{affiliate.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="flex items-center gap-2 text-gray-100">
                          {affiliate.name}
                          {affiliate.verified && (
                            <Badge variant="secondary" className="bg-gray-700 text-gray-200 border border-gray-600">
                              Verified
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-gray-400">{affiliate.expertise}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm mb-4">{affiliate.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {Object.entries(affiliate.metrics).map(([key, value]) => (
                        <div key={key} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 group-hover:border-gray-600 transition-colors">
                          <div className="text-gray-200 font-semibold">{value}</div>
                          <div className="text-gray-500 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {affiliate.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center border-t border-gray-700 pt-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-200">
                        {affiliate.commissionRate}
                      </div>
                      <div className="text-sm text-gray-400">{affiliate.commissionModel}</div>
                    </div>
                    <Button 
                      variant="outline" 
                      asChild
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-gray-100 transition-colors"
                    >
                      <Link href={`/affiliates/${affiliate.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedContent>
      </PageContainer>
      <Footer />
    </div>
  )
}

