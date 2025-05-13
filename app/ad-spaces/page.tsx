"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Eye, Filter, Instagram, Youtube, Twitter, Globe, Twitch, Check, Star, MessageSquare, Calendar, Clock, BarChart2, ShieldCheck, Heart, Share2, Mail, Users, StarHalf, BadgeCheck, ShoppingCart, Facebook, Linkedin, Sun, Moon, Zap } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageContainer } from "@/components/page-container"
import { AnimatePresence, motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { GlareCard } from "@/components/ui/glare-card"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import { useTheme } from "next-themes"

// Define types
type Metrics = {
  visitors?: string;
  impressions?: string;
  ctr?: string;
  subscribers?: string;
  openRate?: string;
  clickRate?: string;
  users?: string;
  sessions?: string;
  engagement?: string;
  followers?: string;
  reach?: string;
  listeners?: string;
  downloads?: string;
  completion?: string;
  views?: string;
  watchTime?: string;
  viewsPerVideo?: string;
  engagementRate?: string;
  averageWatchTime?: string;
  averageLikes?: string;
  storyViews?: string;
  commentsPerPost?: string;
  averageRetweets?: string;
  impressionsPerTweet?: string;
  connections?: string;
  averageViews?: string;
  industryInfluence?: string;
  averageReach?: string;
  avgViews?: string;
  avgWatchTime?: string;
  avgCPC?: string;
  avgDownloads?: string;
  completionRate?: string;
  avgAdRecall?: string;
  avgLikes?: string;
  monthlyReaders?: string;
  avgSession?: string;
  bounceRate?: string;
  topCountries?: string;
}

type AdSpace = {
  id: number;
  title: string;
  description: string;
  type: string;
  icon: any; // LucideIcon type
  rating: number;
  metrics: Metrics;
  price: number;
  priceModel: string;
  category: string;
  tags: string[];
  avatar?: string;
  name?: string;
  verified?: boolean;
  platform?: string;
}

// Sample data for ad spaces
const adSpaces: AdSpace[] = [
  {
    id: 1,
    title: "Pro Gamer YouTube Channel",
    description: "Top gaming channel with 2M+ subscribers. Perfect for game launches, eSports, and hardware sponsorships.",
    type: "video",
    icon: Youtube,
    rating: 4.9,
    metrics: {
      subscribers: "2M",
      avgViews: "800K",
      engagementRate: "9.2%",
      avgWatchTime: "15:10"
    },
    price: 7000,
    priceModel: "per video",
    category: "Gaming",
    tags: ["eSports", "PC Gaming", "Live Streams"],
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Alex Johnson",
    verified: true,
    platform: "YouTube"
  },
  {
    id: 2,
    title: "Finance Weekly Newsletter",
    description: "Trusted finance newsletter with 100K+ subscribers. Ideal for fintech, investment, and banking ads.",
    type: "newsletter",
    icon: Mail,
    rating: 4.7,
    metrics: {
      subscribers: "100K",
      openRate: "38%",
      clickRate: "12%",
      avgCPC: "$1.20"
    },
    price: 2500,
    priceModel: "per issue",
    category: "Finance",
    tags: ["Investing", "Fintech", "Banking"],
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Samantha Lee",
    verified: false,
    platform: "Email"
  },
  {
    id: 3,
    title: "Business Leaders Podcast",
    description: "Podcast for entrepreneurs and executives. Reach a high-value B2B audience with your message.",
    type: "podcast",
    icon: MessageSquare,
    rating: 4.8,
    metrics: {
      listeners: "50K",
      avgDownloads: "40K",
      completionRate: "88%",
      avgAdRecall: "72%"
    },
    price: 3500,
    priceModel: "per episode",
    category: "Business",
    tags: ["Entrepreneurship", "Leadership", "B2B"],
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    name: "Michael Carter",
    verified: true,
    platform: "Podcast"
  },
  {
    id: 4,
    title: "Healthy Living Instagram",
    description: "Popular wellness Instagram with 300K+ followers. Great for health, fitness, and nutrition brands.",
    type: "social",
    icon: Instagram,
    rating: 4.6,
    metrics: {
      followers: "300K",
      engagementRate: "7.5%",
      avgLikes: "18K",
      storyViews: "25K"
    },
    price: 1800,
    priceModel: "per post",
    category: "Health & Fitness",
    tags: ["Wellness", "Fitness", "Nutrition"],
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Jessica Smith",
    verified: false,
    platform: "Instagram"
  },
  {
    id: 5,
    title: "Travel Explorer Blog",
    description: "Award-winning travel blog with 500K monthly readers. Perfect for tourism boards and travel products.",
    type: "website",
    icon: Globe,
    rating: 4.9,
    metrics: {
      monthlyReaders: "500K",
      avgSession: "4:20",
      bounceRate: "28%",
      topCountries: "US, UK, AU"
    },
    price: 2200,
    priceModel: "per month",
    category: "Travel",
    tags: ["Adventure", "Destinations", "Guides"],
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    name: "David Kim",
    verified: true,
    platform: "Blog"
  }
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
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [favoriteAdSpaces, setFavoriteAdSpaces] = useState<Set<number>>(new Set());
  const [selectedAdSpace, setSelectedAdSpace] = useState<AdSpace | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [search, setSearch] = useState("")
  const { theme } = useTheme()
  
  const text = "Discover Ad Spaces";
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;
  
  const taglines = [
    "Find the perfect advertising space for your brand",
    "Connect with influential creators and platforms",
    "Maximize your advertising ROI",
    "Reach your target audience effectively"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
    } else if (isDeleting && currentIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      }, deletingSpeed);
    } else if (!isDeleting && currentIndex === text.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && currentIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, pauseTime);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting]);

  // Filter ad spaces based on search
  const filteredAdSpaces = adSpaces.filter(space => {
    const q = search.toLowerCase()
    return (
      space.title.toLowerCase().includes(q) ||
      (space.description && space.description.toLowerCase().includes(q)) ||
      (space.category && space.category.toLowerCase().includes(q)) ||
      (space.tags && space.tags.some(tag => tag.toLowerCase().includes(q))) ||
      (space.name && space.name.toLowerCase().includes(q))
    )
  })

  const toggleFavorite = (adSpaceId: number) => {
    setFavoriteAdSpaces(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(adSpaceId)) {
        newFavorites.delete(adSpaceId);
      } else {
        newFavorites.add(adSpaceId);
      }
      return newFavorites;
    });
  };

  const toggleExpand = (adSpaceId: number) => {
    setExpandedCard(expandedCard === adSpaceId ? null : adSpaceId);
  };

  const handleViewProfile = (adSpace: AdSpace) => {
    setSelectedAdSpace(adSpace);
    setIsProfileOpen(true);
  };

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

          {/* Search bar */}
          <div className="flex justify-center mb-8">
            <Input
              type="text"
              placeholder="Search ad spaces..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-md rounded-lg border border-gray-300 bg-white/90 text-gray-900 placeholder-gray-500 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Ad Spaces Grid */}
          <div className="w-full max-w-7xl mx-auto">
            <div className="min-h-[500px] flex flex-col justify-center border border-dashed rounded-lg space-y-4">
              <div className="p-2">
                {/* Example: List filtered ad spaces */}
                {filteredAdSpaces.length === 0 ? (
                  <div className="text-center text-gray-400 py-20">No ad spaces found.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAdSpaces.map(space => (
                      <div
                        key={space.id}
                        style={{
                          background: theme === 'dark' ? 'rgba(24, 24, 32, 0.92)' : 'rgba(255, 255, 255, 0.95)',
                          color: theme === 'dark' ? '#f3f3f3' : '#333',
                          borderRadius: "1rem",
                          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                          padding: "1.5rem",
                          backdropFilter: "blur(2px)",
                          border: theme === 'dark' ? "1px solid #222" : "1px solid #eee",
                          transition: "all 0.2s ease-in-out"
                        }}
                        className="relative"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          {space.avatar && (
                            <img src={space.avatar} alt={space.name || space.title} className="w-10 h-10 rounded-full border border-primary/20" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">{space.name || 'Anonymous'}</span>
                              {space.verified && (
                                <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">Verified</span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">Posted an ad</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{space.title}</h3>
                        <p className="text-gray-600 mb-2">{space.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{space.type}</span>
                          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">{space.category}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {space.tags && space.tags.map(tag => (
                            <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">{tag}</span>
                          ))}
                        </div>
                        <div className="mb-2">
                          <span className="text-primary font-bold text-lg">${space.price}</span>
                          <span className="text-xs font-normal text-gray-500 ml-1">{space.priceModel}</span>
                        </div>
                        <div className="mb-2">
                          <span className="font-semibold text-gray-700">Metrics:</span>
                          <ul className="ml-4 mt-1 list-disc text-xs text-gray-600">
                            {Object.entries(space.metrics).map(([key, value]) => (
                              <li key={key}><span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {value}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-sm border-gray-700">
          {selectedAdSpace && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary/10">
                    <AvatarImage src={selectedAdSpace.avatar} alt={selectedAdSpace.name || selectedAdSpace.title} />
                    <AvatarFallback className="bg-gray-700 text-gray-200 text-2xl">
                      {(selectedAdSpace.name || selectedAdSpace.title)[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="flex items-center gap-2 text-2xl text-gray-100">
                      {selectedAdSpace.name || selectedAdSpace.title}
                      {selectedAdSpace.verified && (
                        <Badge variant="secondary" className="bg-gray-700 text-gray-200 border border-gray-600">
                          Verified
                        </Badge>
                      )}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400 text-lg">
                      {selectedAdSpace.platform || selectedAdSpace.type}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">About</h3>
                    <p className="text-gray-400">{selectedAdSpace.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedAdSpace.metrics).map(([key, value]) => (
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
                      {selectedAdSpace.tags.map((tag) => (
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
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Pricing Details</h3>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-gray-200 mb-1">
                        {selectedAdSpace.price}
                      </div>
                      <div className="text-gray-400">{selectedAdSpace.priceModel}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Recent Performance</h3>
                    <div className="space-y-3">
                      {['Engagement Rate', 'Monthly Revenue', 'Success Rate'].map((metric) => (
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

