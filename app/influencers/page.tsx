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
import { AnimatedContent } from "@/components/animated-content"
import { InfluencerCard } from "@/components/influencer-card"
import { VideoBackground } from "@/components/ui/video-background"
import { AnimatePresence, motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

// This would normally come from a database
const influencer = {
  id: 1,
  name: "Alex Morgan",
  handle: "@techreviewalex",
  avatar: "/placeholder.svg?height=200&width=200",
  description:
    "Tech reviewer and gadget enthusiast with a focus on consumer electronics and smartphones. I create in-depth reviews, comparison videos, and tutorials to help consumers make informed purchasing decisions. With over 5 years of experience in the tech industry, I provide honest, unbiased opinions on the latest technology products.",
  platform: "YouTube",
  icon: Youtube,
  metrics: {
    followers: "850K",
    engagement: "4.2%",
    avgViews: "120K",
    totalVideos: "412",
    monthlyGrowth: "+5.8K",
    demographics: "25-34 (45%), Male (72%)",
  },
  price: "$3,500",
  priceModel: "per video",
  category: "Technology",
  tags: ["Tech Reviews", "Gadgets", "Unboxing", "Tutorials", "Smartphones", "Laptops"],
  rating: 4.8,
  reviewCount: 124,
  verified: true,
  socialProfiles: [
    { platform: "YouTube", handle: "@techreviewalex", followers: "850K", url: "#" },
    { platform: "Instagram", handle: "@techreviewalex", followers: "320K", url: "#" },
    { platform: "Twitter", handle: "@techreviewalex", followers: "175K", url: "#" },
  ],
  pastCollaborations: [
    { brand: "TechGadgets Inc.", campaign: "Smartphone Launch", date: "June 2023" },
    { brand: "AudioPro", campaign: "Headphones Review", date: "April 2023" },
    { brand: "LaptopMaster", campaign: "Gaming Laptop Series", date: "February 2023" },
    { brand: "SmartHome Solutions", campaign: "Smart Home Devices", date: "December 2022" },
  ],
  contentSamples: [
    { title: "Ultimate Smartphone Comparison 2023", views: "450K", engagement: "5.2%", url: "#" },
    { title: "Top 10 Budget Laptops for Students", views: "380K", engagement: "4.8%", url: "#" },
    { title: "Smart Home Setup Guide", views: "290K", engagement: "4.5%", url: "#" },
  ],
  reviews: [
    {
      id: 1,
      author: "Sarah Johnson",
      company: "TechGadgets Inc.",
      rating: 5,
      date: "June 15, 2023",
      content:
        "Working with Alex was fantastic! His review of our new smartphone was thorough, honest, and engaging. The video quality was excellent, and he highlighted all the key features we wanted to showcase. We saw a 35% increase in website traffic after his review went live.",
    },
    {
      id: 2,
      author: "Michael Chen",
      company: "AudioPro",
      rating: 5,
      date: "April 22, 2023",
      content:
        "Alex delivered an exceptional review of our headphones. His attention to detail and technical knowledge really helped explain the unique features of our product. The audience engagement was impressive, and we received a significant boost in sales following his video.",
    },
    {
      id: 3,
      author: "Jessica Williams",
      company: "LaptopMaster",
      rating: 4,
      date: "February 8, 2023",
      content:
        "Good collaboration overall. Alex provided a comprehensive review of our gaming laptop series. The only reason for 4 stars instead of 5 is that the video was delivered a few days later than initially agreed upon. However, the quality of the content made up for the slight delay.",
    },
  ],
  services: [
    {
      title: "Dedicated Review Video",
      description: "In-depth 15-20 minute review of your product with detailed analysis and honest feedback",
      price: "$3,500",
      deliverables: [
        "Full HD video",
        "Product demonstration",
        "Technical analysis",
        "Pros and cons",
        "Final recommendation",
      ],
    },
    {
      title: "Product Comparison",
      description: "Compare your product against competitors to highlight unique selling points",
      price: "$4,200",
      deliverables: ["Side-by-side comparison", "Feature analysis", "Performance testing", "Value assessment"],
    },
    {
      title: "Tutorial/How-To Video",
      description: "Step-by-step guide showing how to use your product and maximize its features",
      price: "$2,800",
      deliverables: ["Detailed instructions", "Tips and tricks", "Use case scenarios", "Troubleshooting common issues"],
    },
  ],
} as const;

// Sample data for influencers
const influencers = [
  {
    id: 1,
    name: "Alex Morgan",
    handle: "@techreviewalex",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "Tech reviewer and gadget enthusiast with a focus on consumer electronics and smartphones",
    platform: "YouTube",
    icon: Youtube,
    metrics: {
      followers: "850K",
      engagement: "4.2%",
      avgViews: "120K",
    },
    price: "R15,000",
    priceModel: "per video",
    category: "Technology",
    tags: ["Tech Reviews", "Gadgets", "Unboxing"],
    rating: 4.8,
    reviewCount: 124,
    verified: true,
  },
  {
    id: 2,
    name: "Sophia Chen",
    handle: "@sophiastyle",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "Fashion and lifestyle influencer sharing outfit ideas, beauty tips, and travel experiences",
    platform: "Instagram",
    icon: Instagram,
    metrics: {
      followers: "1.2M",
      engagement: "3.8%",
      avgLikes: "45K",
    },
    price: "R12,000",
    priceModel: "per post",
    category: "Fashion",
    tags: ["Fashion", "Lifestyle", "Beauty"],
    rating: 4.7,
    reviewCount: 186,
    verified: true,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    handle: "@fitnesswithmark",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "Fitness coach and nutrition expert sharing workout routines, meal plans, and health advice",
    platform: "Instagram",
    icon: Instagram,
    metrics: {
      followers: "650K",
      engagement: "5.1%",
      avgLikes: "32K",
    },
    price: "R8,500",
    priceModel: "per post",
    category: "Health & Fitness",
    tags: ["Fitness", "Nutrition", "Wellness"],
    rating: 4.9,
    reviewCount: 92,
    verified: true,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    handle: "@emilyeats",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "Food blogger and recipe creator specializing in easy, healthy meals and baking tutorials",
    platform: "Blog",
    icon: Globe,
    metrics: {
      followers: "420K",
      engagement: "4.5%",
      monthlyViews: "800K",
    },
    price: "R6,500",
    priceModel: "per article",
    category: "Food & Cooking",
    tags: ["Recipes", "Food", "Cooking"],
    rating: 4.6,
    reviewCount: 78,
    verified: true,
  },
  {
    id: 5,
    name: "David Kim",
    handle: "@davidgaming",
    avatar: "/placeholder.svg?height=200&width=200",
    description: "Gaming streamer and content creator covering new releases, gameplay strategies, and industry news",
    platform: "Twitch",
    icon: Twitch,
    metrics: {
      followers: "950K",
      engagement: "6.2%",
      avgViewers: "15K",
    },
    price: "R10,000",
    priceModel: "per stream",
    category: "Gaming",
    tags: ["Gaming", "Streaming", "Reviews"],
    rating: 4.7,
    reviewCount: 103,
    verified: true,
  },
];

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
];

// Platform types for filtering
const platformTypes = ["All Platforms", "YouTube", "Instagram", "Twitter", "Blog", "Twitch"];

export default function InfluencersPage() {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const text = "Discover Influencers";
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  const taglines = [
    "Find the perfect influencer for your brand across various platforms and categories",
    "Connect with premium influencers that match your target audience and campaign goals",
    "Discover high-performing influencers tailored to your marketing strategy",
    "Access a curated selection of influencers designed to maximize your brand's visibility"
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

  const handleViewProfile = (influencer) => {
    setSelectedInfluencer(influencer);
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
                <source src="/images/influencer.mp4" type="video/mp4" />
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {influencers.map((influencer) => (
                <Card key={influencer.id} className="bg-background/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary/10">
                          <AvatarImage src={influencer.avatar} alt={influencer.name} />
                          <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{influencer.platform}</Badge>
                            {influencer.verified && (
                              <Badge variant="outline" className="gap-1">
                                <Check className="h-3 w-3" /> Verified
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold">{influencer.name}</h3>
                          <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{influencer.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Followers</p>
                        <p className="font-medium">{influencer.metrics.followers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="font-medium">{influencer.metrics.engagement}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {influencer.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold">{influencer.price}</p>
                      <p className="text-xs text-muted-foreground">{influencer.priceModel}</p>
                    </div>
                    <Button onClick={() => handleViewProfile(influencer)}>
                      View Profile
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </PageContainer>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedInfluencer && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary/10">
                    <AvatarImage src={selectedInfluencer.avatar} alt={selectedInfluencer.name} />
                    <AvatarFallback>{selectedInfluencer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-2xl">{selectedInfluencer.name}</DialogTitle>
                    <DialogDescription>{selectedInfluencer.handle}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">About</h3>
                    <p className="text-muted-foreground">{selectedInfluencer.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedInfluencer.metrics).map(([key, value]) => (
                        <div key={key} className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                          <p className="font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedInfluencer.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact {selectedInfluencer.name}</CardTitle>
                      <CardDescription>Book a collaboration or ask questions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold">{selectedInfluencer.price}</p>
                          <p className="text-sm text-muted-foreground">{selectedInfluencer.priceModel}</p>
                        </div>
                        <Button className="gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Contact
                        </Button>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Available for projects starting next month</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Average response time: 12 hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Performance reports included</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Secure payment & satisfaction guarantee</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

