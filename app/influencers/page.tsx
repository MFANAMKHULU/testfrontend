"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Instagram, Youtube, Twitter, Globe, Users, Star, TrendingUp, Calendar, Check, Twitch, Award, Target, DollarSign, Clock, Heart, MessageSquare, Share2, Zap, Trophy, TrendingUp as TrendingUpIcon } from "lucide-react"
import { Footer } from "@/components/footer"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const influencers = [
  {
    name: "Alex Morgan",
    handle: "@techreviewalex",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Tech reviewer and gadget enthusiast with a focus on consumer electronics and smartphones.",
    posts: 245,
    website: "https://alextechreviews.com",
    followers: "2.5M",
    engagement: "8.5%",
    categories: ["Technology", "Gadgets", "Reviews"],
    platforms: ["YouTube", "Instagram", "Twitter"],
    avgViews: "500K",
    location: "San Francisco, CA",
    languages: ["English", "Spanish"],
    verified: true,
    joinDate: "Jan 2020",
    achievements: ["Top Tech Creator 2023", "Best Tech Reviews 2022"],
    collaborationRate: "$5K - $10K",
    responseTime: "< 24 hours",
    topBrands: ["Apple", "Samsung", "Sony"],
    recentCampaigns: [
      { name: "iPhone 15 Launch", success: "98%", reach: "2.1M" },
      { name: "Samsung S24 Review", success: "95%", reach: "1.8M" }
    ],
    growth: "+15%",
    audienceAge: "18-34",
    audienceGender: "65% Male",
    topLocations: ["US", "UK", "Canada"]
  },
  {
    name: "Sophia Chen",
    handle: "@sophiastyle",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    description: "Gaming streamer and content creator covering new releases, gameplay strategies, and industry news.",
    posts: 312,
    website: "https://sophiastyle.gg",
    followers: "1.8M",
    engagement: "12.3%",
    categories: ["Gaming", "eSports", "Live Streaming"],
    platforms: ["Twitch", "YouTube", "Discord"],
    avgViews: "350K",
    location: "Los Angeles, CA",
    languages: ["English", "Mandarin"],
    verified: true,
    joinDate: "Mar 2019",
    achievements: ["Twitch Partner", "Gaming Awards 2023"],
    collaborationRate: "$3K - $8K",
    responseTime: "< 12 hours",
    topBrands: ["NVIDIA", "Razer", "Logitech"],
    recentCampaigns: [
      { name: "RTX 4090 Launch", success: "96%", reach: "1.5M" },
      { name: "Gaming Setup Tour", success: "92%", reach: "1.2M" }
    ],
    growth: "+22%",
    audienceAge: "16-28",
    audienceGender: "70% Male",
    topLocations: ["US", "Japan", "South Korea"]
  },
  {
    name: "David Kim",
    handle: "@davidgaming",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    description: "Fitness coach and nutrition expert sharing workout routines, meal plans, and health advice.",
    posts: 180,
    website: "https://davidfit.com",
    followers: "950K",
    engagement: "15.7%",
    categories: ["Fitness", "Health", "Nutrition"],
    platforms: ["Instagram", "YouTube", "TikTok"],
    avgViews: "200K",
    location: "Miami, FL",
    languages: ["English", "Korean"],
    verified: false,
    joinDate: "Jun 2021"
  },
  {
    name: "Emily Rodriguez",
    handle: "@emilyeats",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    description: "Food blogger and recipe creator specializing in easy, healthy meals and baking tutorials.",
    posts: 410,
    website: "https://emilyeats.com",
    followers: "1.2M",
    engagement: "9.8%",
    categories: ["Food", "Cooking", "Lifestyle"],
    platforms: ["Instagram", "YouTube", "Pinterest"],
    avgViews: "280K",
    location: "New York, NY",
    languages: ["English", "Spanish"],
    verified: true,
    joinDate: "Sep 2018"
  },
  {
    name: "Marcus Johnson",
    handle: "@fitnesswithmark",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    description: "Fashion and lifestyle influencer sharing outfit ideas, beauty tips, and travel experiences.",
    posts: 98,
    website: "https://marklifestyle.com",
    followers: "750K",
    engagement: "11.2%",
    categories: ["Fashion", "Lifestyle", "Travel"],
    platforms: ["Instagram", "TikTok", "YouTube"],
    avgViews: "150K",
    location: "Chicago, IL",
    languages: ["English"],
    verified: false,
    joinDate: "Apr 2022"
  },
  {
    name: "Sarah Lee",
    handle: "@sarahlee",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    description: "Travel vlogger exploring the world and sharing unique experiences and tips.",
    posts: 220,
    website: "https://sarahleetravels.com",
    followers: "1.5M",
    engagement: "13.5%",
    categories: ["Travel", "Adventure", "Photography"],
    platforms: ["YouTube", "Instagram", "TikTok"],
    avgViews: "400K",
    location: "Worldwide",
    languages: ["English", "Korean", "Japanese"],
    verified: true,
    joinDate: "May 2019"
  },
];

export default function InfluencersPage() {
  const { theme } = useTheme()
  const [search, setSearch] = useState("")
  const [selectedInfluencer, setSelectedInfluencer] = useState<typeof influencers[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const filteredInfluencers = influencers.filter(influencer => {
    const searchTerm = search.toLowerCase()
    return (
      influencer.name.toLowerCase().includes(searchTerm) ||
      influencer.handle.toLowerCase().includes(searchTerm) ||
      influencer.description.toLowerCase().includes(searchTerm) ||
      influencer.categories.some(cat => cat.toLowerCase().includes(searchTerm)) ||
      (influencer.topBrands?.some(brand => brand.toLowerCase().includes(searchTerm)) ?? false)
    )
  })

  const handleViewMore = (influencer: typeof influencers[0]) => {
    setSelectedInfluencer(influencer)
    setIsModalOpen(true)
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
              Find the Perfect Influencer
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connect with verified influencers who can help grow your brand
            </p>
            <div className="max-w-2xl mx-auto">
              <Input
                type="search"
                placeholder="Search influencers by name, category, or platform..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
          }}>
            {filteredInfluencers.map((influencer) => (
              <div
                key={influencer.handle}
                style={{
                  background: theme === 'dark' ? 'rgba(24, 24, 32, 0.92)' : 'rgba(255, 255, 255, 0.95)',
                  color: theme === 'dark' ? '#f3f3f3' : '#333',
                  borderRadius: "1rem",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                  padding: "2rem",
                  minWidth: "320px",
                  maxWidth: "380px",
                  textAlign: "center",
                  backdropFilter: "blur(2px)",
                  border: theme === 'dark' ? "1px solid #222" : "1px solid #eee",
                  transition: "all 0.2s ease-in-out"
                }}
                className="influencer-card"
              >
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: "1rem",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                      border: "3px solid " + (theme === 'dark' ? '#4f46e5' : '#4f46e5')
                    }}
                  />
                  {influencer.verified && (
                    <div style={{
                      position: "absolute",
                      bottom: "1rem",
                      right: "0",
                      background: "#4f46e5",
                      borderRadius: "50%",
                      padding: "0.25rem",
                      color: "white"
                    }}>
                      <Check size={16} />
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h3 style={{ margin: 0, fontWeight: 700, color: theme === 'dark' ? '#f3f3f3' : '#333' }}>{influencer.name}</h3>
                  {(influencer.achievements?.length ?? 0) > 0 && (
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      <Award size={16} style={{ color: "#fbbf24" }} />
                      <Trophy size={16} style={{ color: "#fbbf24" }} />
                    </div>
                  )}
                </div>

                <div style={{ color: theme === 'dark' ? '#a0a0a0' : '#666', fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                  {influencer.handle}
                </div>

                <div style={{ color: theme === 'dark' ? '#f3f3f3' : '#333', fontSize: "1rem", marginBottom: "1rem" }}>
                  {influencer.description}
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: theme === 'dark' ? '#a0a0a0' : '#666', fontSize: "0.8rem" }}>Followers</div>
                    <div style={{ color: theme === 'dark' ? '#f3f3f3' : '#333', fontWeight: 600 }}>{influencer.followers}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: theme === 'dark' ? '#a0a0a0' : '#666', fontSize: "0.8rem" }}>Engagement</div>
                    <div style={{ color: theme === 'dark' ? '#f3f3f3' : '#333', fontWeight: 600 }}>{influencer.engagement}</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "1rem" }}>
                  {influencer.categories.slice(0, 3).map((category) => (
                    <Badge
                      key={category}
                      style={{
                        background: theme === 'dark' ? 'rgba(79, 70, 229, 0.2)' : 'rgba(79, 70, 229, 0.1)',
                        color: theme === 'dark' ? '#a5b4fc' : '#4f46e5',
                        border: "none",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "1rem",
                        fontSize: "0.8rem"
                      }}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
                  {influencer.platforms.slice(0, 3).map((platform) => {
                    const Icon = {
                      'YouTube': Youtube,
                      'Instagram': Instagram,
                      'Twitter': Twitter,
                      'Twitch': Twitch,
                      'TikTok': TrendingUp,
                      'Discord': Users,
                      'Pinterest': Globe
                    }[platform] || Globe
                    
                    return (
                      <div
                        key={platform}
                        style={{
                          background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          color: theme === 'dark' ? '#f3f3f3' : '#333'
                        }}
                      >
                        <Icon size={20} />
                      </div>
                    )
                  })}
                </div>

                <Button 
                  onClick={() => handleViewMore(influencer)}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  View More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-sm border-gray-700">
          {selectedInfluencer && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <img
                    src={selectedInfluencer.avatar}
                    alt={selectedInfluencer.name}
                    className="w-20 h-20 rounded-full border-2 border-primary/10"
                  />
                  <div>
                    <DialogTitle className="flex items-center gap-2 text-2xl text-gray-100">
                      {selectedInfluencer.name}
                      {selectedInfluencer.verified && (
                        <Badge variant="secondary" className="bg-gray-700 text-gray-200 border border-gray-600">
                          Verified
                        </Badge>
                      )}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400 text-lg">
                      {selectedInfluencer.handle}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">About</h3>
                    <p className="text-gray-400">{selectedInfluencer.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="text-gray-200 font-semibold text-xl">{selectedInfluencer.followers}</div>
                        <div className="text-gray-500 text-sm">Followers</div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="text-gray-200 font-semibold text-xl">{selectedInfluencer.engagement}</div>
                        <div className="text-gray-500 text-sm">Engagement Rate</div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="text-gray-200 font-semibold text-xl">{selectedInfluencer.avgViews}</div>
                        <div className="text-gray-500 text-sm">Average Views</div>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="text-gray-200 font-semibold text-xl">{selectedInfluencer.growth}</div>
                        <div className="text-gray-500 text-sm">Growth Rate</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedInfluencer.categories.map((category) => (
                        <Badge 
                          key={category} 
                          variant="secondary" 
                          className="bg-muted/50 text-gray-300"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Collaboration Details</h3>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-3xl font-bold text-gray-200 mb-1">
                        {selectedInfluencer.collaborationRate}
                      </div>
                      <div className="text-gray-400">Response Time: {selectedInfluencer.responseTime}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Recent Campaigns</h3>
                    <div className="space-y-3">
                      {selectedInfluencer.recentCampaigns?.map((campaign, index) => (
                        <div key={index} className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                          <span className="text-gray-300">{campaign.name}</span>
                          <div className="flex gap-4">
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                              {campaign.success}
                            </Badge>
                            <span className="text-gray-400">{campaign.reach}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Audience Demographics</h3>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between text-gray-300">
                        <span>Age Range:</span>
                        <span>{selectedInfluencer.audienceAge}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Gender:</span>
                        <span>{selectedInfluencer.audienceGender}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Top Locations:</span>
                        <span>{selectedInfluencer.topLocations?.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                  onClick={() => setIsModalOpen(false)}
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
  );
}

