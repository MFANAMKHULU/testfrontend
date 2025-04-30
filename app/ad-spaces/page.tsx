"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Eye, Filter, Instagram, Youtube, Twitter, Globe, Twitch, Check, Star, MessageSquare, Calendar, Clock, BarChart2, ShieldCheck, Heart, Share2, Mail, Users, StarHalf, BadgeCheck, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageContainer } from "@/components/page-container"
import { VideoBackground } from "@/components/ui/video-background"
import { AnimatePresence, motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { GlareCard } from "@/components/ui/glare-card"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"

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
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [favoriteAdSpaces, setFavoriteAdSpaces] = useState<Set<number>>(new Set());
  const [selectedAdSpace, setSelectedAdSpace] = useState<AdSpace | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const text = "Discover Ad Spaces";
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;
  
  const taglines = [
    "Find the perfect advertising space for your brand",
    "Connect with premium ad spaces across various platforms",
    "Discover advertising opportunities that match your target audience",
    "Access a curated selection of high-performing ad spaces"
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

  // Remove the filter function and use all ad spaces directly
  const filteredAdSpaces = adSpaces;

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
                <source src="/images/adspace2.mp4" type="video/mp4" />
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

            {/* Ad Spaces Grid */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="min-h-[500px] flex flex-col justify-center border border-dashed rounded-lg space-y-4">
                <div className="p-2">
                  <ThreeDPhotoCarousel cards={filteredAdSpaces} />
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
        <div className="mt-auto">
          <Footer />
        </div>
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

