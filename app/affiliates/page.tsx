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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-muted/50 py-12">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Affiliate Marketers</h1>
              <p className="text-muted-foreground mb-8">
                Connect with top affiliate marketers to promote your products or services
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Search affiliates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-lg"
                />
                <Button onClick={applyFilters}>Search</Button>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {showFilters && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Refine your search with these filters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
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

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Commission Rate Range</label>
                      <span className="text-sm text-muted-foreground">
                        {commissionRange[0]}% - {commissionRange[1]}%
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 30]}
                      max={30}
                      step={1}
                      value={commissionRange}
                      onValueChange={setCommissionRange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All Categories")
                    setCommissionRange([0, 30])
                    setFilteredAffiliates(affiliates)
                  }}
                >
                  Reset Filters
                </Button>
                <Button onClick={applyFilters}>Apply Filters</Button>
              </CardFooter>
            </Card>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAffiliates.map((affiliate) => (
              <Card key={affiliate.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline">{affiliate.expertise}</Badge>
                    <Badge variant="secondary">{affiliate.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/10">
                      <AvatarImage src={affiliate.avatar} alt={affiliate.name} />
                      <AvatarFallback>{affiliate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {affiliate.name}
                        {affiliate.verified && (
                          <Badge variant="outline" className="h-5 text-xs">
                            Verified
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-sm">Affiliate Marketer</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{affiliate.description}</p>

                  <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                    {Object.entries(affiliate.metrics).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(affiliate.rating) ? "text-yellow-500" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-7.07 3.707 1.35-7.87-5.72-5.573 7.91-1.149L10 0l3.53 7.7 7.91 1.149-5.72 5.573 1.35 7.87L10 15.585z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-medium">{affiliate.rating}</span>
                    <span className="text-xs text-muted-foreground">({affiliate.reviews} reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {affiliate.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <div>
                    <p className="text-sm font-medium">{affiliate.commissionRate}</p>
                    <p className="text-xs text-muted-foreground">{affiliate.commissionModel}</p>
                  </div>
                  <Link href={`/affiliates/${affiliate.id}`}>
                    <Button size="sm" className="gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      View Profile
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredAffiliates.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No affiliates found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

