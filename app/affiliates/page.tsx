"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Eye, Filter, Instagram, Youtube, Twitter, Globe, Twitch, Check, Star, MessageSquare, Calendar, Clock, BarChart2, ShieldCheck, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageContainer } from "@/components/page-container"
import { VideoBackground } from "@/components/ui/video-background"
import { AnimatePresence, motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

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
      avgCommission: "R8,500/mo",
      activeClients: "15",
    },
    commissionRate: "8%",
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
      avgCommission: "R12,000/mo",
      activeClients: "8",
    },
    commissionRate: "5%",
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
      avgCommission: "R6,500/mo",
      activeClients: "12",
    },
    commissionRate: "10%",
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
      avgCommission: "R9,800/mo",
      activeClients: "10",
    },
    commissionRate: "12%",
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
      avgCommission: "R15,000/mo",
      activeClients: "6",
    },
    commissionRate: "6%",
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
      avgCommission: "R7,200/mo",
      activeClients: "14",
    },
    commissionRate: "7%",
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
      avgCommission: "R8,000/mo",
      activeClients: "9",
    },
    commissionRate: "8%",
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
      avgCommission: "R5,500/mo",
      activeClients: "11",
    },
    commissionRate: "15%",
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
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const text = "Discover Affiliates";
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  const taglines = [
    "Find the perfect affiliate partners to grow your business",
    "Connect with high-performing affiliates across various niches",
    "Discover affiliate programs that match your target audience",
    "Access a curated selection of affiliate opportunities"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeout;

    if (!isDeleting && currentIndex < text.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
    } else if (isDeleting && currentIndex > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      }, deletingSpeed);
    } else if (!isDeleting && currentIndex === text.length) {
      // Pause at full text
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && currentIndex === 0) {
      // Pause at empty text
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, pauseTime);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting]);

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [commissionRange, setCommissionRange] = useState([0, 30])
  const [filteredAffiliates, setFilteredAffiliates] = useState(affiliates)
  const [showFilters, setShowFilters] = useState(false)
  const [expandedCard, setExpandedCard] = useState(null);
  const [favoriteAffiliates, setFavoriteAffiliates] = useState(new Set());
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  const toggleFavorite = (affiliateId) => {
    setFavoriteAffiliates(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(affiliateId)) {
        newFavorites.delete(affiliateId);
      } else {
        newFavorites.add(affiliateId);
      }
      return newFavorites;
    });
  };

  const toggleExpand = (affiliateId) => {
    setExpandedCard(expandedCard === affiliateId ? null : affiliateId);
  };

  const handleViewProfile = (affiliate) => {
    setSelectedAffiliate(affiliate);
    setIsProfileOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <VideoBackground />
      <div className="relative z-10 bg-black/50 flex-1 flex flex-col min-h-screen">
        <Navbar />
        <PageContainer className="flex-1">
          <div className="py-8">
            <div className="relative shrink-0 flex flex-col gap-8 py-20">
              <video 
                className="fixed top-0 left-0 w-full h-full object-cover -z-10"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
              >
                <source src="/images/affiliate.mp4" type="video/mp4" />
              </video>
              <div className="text-center py-5">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 min-h-[72px]">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </h1>
                <div className="h-20 md:h-24 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentTaglineIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-medium"
                    >
                      {taglines[currentTaglineIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
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
                <motion.div
                  key={affiliate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card 
                    className={`bg-background/80 backdrop-blur-sm transition-all duration-300 ${
                      expandedCard === affiliate.id ? 'md:col-span-2 lg:col-span-3' : ''
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/10">
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
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => toggleFavorite(affiliate.id)}
                            className="hover:bg-gray-800/50"
                          >
                            <Heart 
                              className={`h-4 w-4 ${
                                favoriteAffiliates.has(affiliate.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                              }`}
                            />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="hover:bg-gray-800/50"
                          >
                            <Share2 className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 text-sm mb-4">{affiliate.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {Object.entries(affiliate.metrics).map(([key, value]) => (
                          <motion.div 
                            key={key} 
                            className="bg-muted/50 p-3 rounded-lg hover:bg-muted/70 transition-colors"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="text-gray-200 font-semibold">{value}</div>
                            <div className="text-gray-500 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {affiliate.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="bg-muted/50 text-gray-300 hover:bg-muted/70 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {expandedCard === affiliate.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 space-y-4"
                        >
                          <div className="border-t border-gray-700 pt-4">
                            <h4 className="text-lg font-semibold text-gray-200 mb-2">Recent Performance</h4>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="text-gray-200 font-semibold">+15%</div>
                                <div className="text-gray-500 text-xs">Conversion Rate</div>
                              </div>
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="text-gray-200 font-semibold">R45,000</div>
                                <div className="text-gray-500 text-xs">Monthly Revenue</div>
                              </div>
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="text-gray-200 font-semibold">98%</div>
                                <div className="text-gray-500 text-xs">Success Rate</div>
                              </div>
                            </div>
                          </div>
                          <div className="border-t border-gray-700 pt-4">
                            <h4 className="text-lg font-semibold text-gray-200 mb-2">Top Performing Campaigns</h4>
                            <div className="space-y-2">
                              {['Summer Sale 2023', 'Black Friday Special', 'New Year Promotion'].map((campaign) => (
                                <div key={campaign} className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                                  <span className="text-gray-300">{campaign}</span>
                                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                                    +25% ROI
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t border-gray-700 pt-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-200">
                          {affiliate.commissionRate}
                        </div>
                        <div className="text-sm text-gray-400">{affiliate.commissionModel}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => toggleExpand(affiliate.id)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-gray-100 transition-colors"
                        >
                          {expandedCard === affiliate.id ? 'Show Less' : 'Show More'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleViewProfile(affiliate)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-gray-100 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </PageContainer>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-sm border-gray-700">
          {selectedAffiliate && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary/10">
                    <AvatarImage src={selectedAffiliate.avatar} alt={selectedAffiliate.name} />
                    <AvatarFallback className="bg-gray-700 text-gray-200 text-2xl">
                      {selectedAffiliate.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="flex items-center gap-2 text-2xl text-gray-100">
                      {selectedAffiliate.name}
                      {selectedAffiliate.verified && (
                        <Badge variant="secondary" className="bg-gray-700 text-gray-200 border border-gray-600">
                          Verified
                        </Badge>
                      )}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400 text-lg">
                      {selectedAffiliate.expertise}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">About</h3>
                    <p className="text-gray-400">{selectedAffiliate.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedAffiliate.metrics).map(([key, value]) => (
                        <div key={key} className="bg-muted/50 p-4 rounded-lg">
                          <div className="text-gray-200 font-semibold text-xl">{value}</div>
                          <div className="text-gray-500 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAffiliate.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="bg-muted/50 text-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Commission Details</h3>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-gray-200 mb-1">
                        {selectedAffiliate.commissionRate}
                      </div>
                      <div className="text-gray-400">{selectedAffiliate.commissionModel}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Recent Performance</h3>
                    <div className="space-y-3">
                      {['Conversion Rate', 'Monthly Revenue', 'Success Rate'].map((metric) => (
                        <div key={metric} className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                          <span className="text-gray-300">{metric}</span>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                            {metric === 'Monthly Revenue' ? 'R9,800' : '+15%'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Top Campaigns</h3>
                    <div className="space-y-2">
                      {['Summer Sale 2023', 'Black Friday Special', 'New Year Promotion'].map((campaign) => (
                        <div key={campaign} className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                          <span className="text-gray-300">{campaign}</span>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                            +25% ROI
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                  onClick={() => setIsProfileOpen(false)}
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
    </div>
  )
}

