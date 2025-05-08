"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Instagram, Youtube, Twitter, Globe, Users, Star, TrendingUp, Calendar, Check, Twitch, Award, Target, DollarSign, Clock, Heart, MessageSquare, Share2, Zap, Trophy, TrendingUp as TrendingUpIcon } from "lucide-react"

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
  
  return (
    <div>
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
      <div style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        marginTop: "6rem",
        padding: "2rem"
      }}>
        <Input
          type="text"
          placeholder="Search influencers by name, category, or brand..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            background: theme === 'dark' ? 'rgba(24, 24, 32, 0.92)' : 'rgba(255, 255, 255, 0.95)',
            color: theme === 'dark' ? '#f3f3f3' : '#333',
            border: theme === 'dark' ? "1px solid #222" : "1px solid #eee",
            backdropFilter: "blur(2px)",
            transition: "all 0.2s ease-in-out"
          }}
        />
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
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: theme === 'dark' ? '#a0a0a0' : '#666', fontSize: "0.8rem" }}>Growth</div>
                  <div style={{ color: "#22c55e", fontWeight: 600 }}>{influencer.growth}</div>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "1rem" }}>
                {influencer.categories.map((category) => (
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

              <div style={{ 
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                borderRadius: "0.75rem",
                padding: "1rem",
                marginBottom: "1rem"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: theme === 'dark' ? '#a0a0a0' : '#666', fontSize: "0.8rem" }}>
                    <DollarSign size={14} />
                    <span>Rate: {influencer.collaborationRate}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: theme === 'dark' ? '#a0a0a0' : '#666', fontSize: "0.8rem" }}>
                    <Clock size={14} />
                    <span>{influencer.responseTime}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
                  {influencer.topBrands?.map((brand) => (
                    <Badge
                      key={brand}
                      style={{
                        background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        color: theme === 'dark' ? '#f3f3f3' : '#333',
                        border: "none",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "1rem",
                        fontSize: "0.8rem"
                      }}
                    >
                      {brand}
                    </Badge>
                  ))}
                </div>
              </div>

              <div style={{ 
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                borderRadius: "0.75rem",
                padding: "1rem",
                marginBottom: "1rem"
              }}>
                <div style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.5rem", color: theme === 'dark' ? '#f3f3f3' : '#333' }}>
                  Recent Campaigns
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {influencer.recentCampaigns?.map((campaign, index) => (
                    <div key={index} style={{ 
                      display: "flex", 
                      justifyContent: "space-between",
                      fontSize: "0.8rem",
                      color: theme === 'dark' ? '#a0a0a0' : '#666'
                    }}>
                      <span>{campaign.name}</span>
                      <div style={{ display: "flex", gap: "1rem" }}>
                        <span style={{ color: "#22c55e" }}>{campaign.success}</span>
                        <span>{campaign.reach}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
                {influencer.platforms.map((platform) => {
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

              <div style={{ display: "flex", justifyContent: "space-between", color: theme === 'dark' ? '#a0a0a0' : '#666', fontSize: "0.8rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <Calendar size={14} />
                  <span>Joined {influencer.joinDate}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <Globe size={14} />
                  <span>{influencer.location}</span>
                </div>
              </div>

              <div style={{ 
                background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                borderRadius: "0.75rem",
                padding: "1rem",
                marginBottom: "1rem",
                fontSize: "0.8rem",
                color: theme === 'dark' ? '#a0a0a0' : '#666'
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Audience Age: {influencer.audienceAge}</span>
                  <span>Gender: {influencer.audienceGender}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <Target size={14} />
                  <span>Top Locations: {influencer.topLocations?.join(", ") || "Not specified"}</span>
                </div>
              </div>

              <a
                href={influencer.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  background: theme === 'dark' ? '#4f46e5' : '#4f46e5',
                  color: "#fff",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.98rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                  transition: "all 0.2s ease-in-out",
                  width: "100%"
                }}
                onMouseOver={e => (e.currentTarget.style.background = theme === 'dark' ? '#3730a3' : '#3730a3')}
                onMouseOut={e => (e.currentTarget.style.background = theme === 'dark' ? '#4f46e5' : '#4f46e5')}
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

