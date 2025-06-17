"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Eye, Filter, Instagram, Youtube, Twitter, Globe, Twitch, Check, Star, MessageSquare, Calendar, Clock, BarChart2, ShieldCheck, Heart, Share2, Mail, Users, StarHalf, BadgeCheck, ShoppingCart, Facebook, Linkedin, Sun, Moon, Zap, ThumbsUp, Bookmark, Send } from "lucide-react"
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
import { LucideIcon } from "lucide-react"

// Define types
interface AdSpaceMetrics {
  [key: string]: string | number;
}

interface AdSpace {
  id: number;
  owner: {
    name: string;
    verified: boolean;
  };
  title: string;
  description: string;
  type: string;
  category: string;
  tags: string[];
  price: string;
  priceModel: string;
  metrics: AdSpaceMetrics;
  platform?: string;
  name?: string;
  avatar?: string;
  verified?: boolean;
  icon?: LucideIcon;
  rating?: number;
  images?: string[];
}

// Sample data for ad spaces
const adSpaces: AdSpace[] = [
  {
    id: 1,
    owner: {
      name: "Alex Johnson",
      verified: true,
    },
    title: "Pro Gamer YouTube Channel",
    description: "Top gaming channel with 2M+ subscribers. Perfect for game launches, eSports, and hardware sponsorships.",
    type: "Video",
    icon: Youtube,
    rating: 4.9,
    metrics: {
      subscribers: "2M",
      avgViews: "300K",
      engagementRate: "5.2%",
      avgWatchTime: "15:00",
    },
    price: "$7000",
    priceModel: "per video",
    category: "Gaming",
    tags: ["eSports", "PC Gaming", "Live Streams"],
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Alex Johnson",
    verified: true,
    platform: "YouTube",
    images: ["https://randomuser.me/api/portraits/men/32.jpg"]
  },
  {
    id: 2,
    owner: {
      name: "Samantha Lee",
      verified: true,
    },
    title: "Finance Weekly Newsletter",
    description: "Trusted finance newsletter with 100K+ subscribers. Ideal for fintech, investment, and banking ads.",
    type: "Newsletter",
    icon: Mail,
    rating: 4.7,
    metrics: {
      subscribers: "100K",
      openRate: "38%",
      clickRate: "12%",
      avgCPC: "$1.30",
    },
    price: "$2500",
    priceModel: "per issue",
    category: "Finance",
    tags: ["Investing", "Fintech", "Banking"],
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Samantha Lee",
    verified: true,
    platform: "Email",
    images: ["https://randomuser.me/api/portraits/women/44.jpg"]
  },
  {
    id: 3,
    owner: {
      name: "Michael Carter",
      verified: true,
    },
    title: "Business Leaders Podcast",
    description: "Podcast for entrepreneurs and executives. Reach a high-value B2B audience with your message.",
    type: "Podcast",
    icon: MessageSquare,
    rating: 4.8,
    metrics: {
      listeners: "50K",
      avgDownloads: "40K",
      completionRate: "88%",
      avgAdRecall: "72%",
    },
    price: "$3500",
    priceModel: "per episode",
    category: "Business",
    tags: ["Entrepreneurship", "Leadership", "B2B"],
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    name: "Michael Carter",
    verified: true,
    platform: "Podcast",
    images: ["https://randomuser.me/api/portraits/men/85.jpg"]
  },
  {
    id: 4,
    owner: {
      name: "Emma Wilson",
      verified: true,
    },
    title: "Fitness & Wellness Instagram",
    description: "Popular fitness influencer with 500K+ followers. Perfect for health, wellness, and lifestyle brands.",
    type: "Social Media",
    icon: Instagram,
    rating: 4.6,
    metrics: {
      followers: "500K",
      engagementRate: "4.8%",
      avgLikes: "20K",
      storyViews: "25K",
    },
    price: "$1800",
    priceModel: "per post",
    category: "Health & Fitness",
    tags: ["Fitness", "Wellness", "Lifestyle"],
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Emma Wilson",
    verified: true,
    platform: "Instagram",
    images: ["https://randomuser.me/api/portraits/women/68.jpg"]
  },
  {
    id: 5,
    owner: {
      name: "David Chen",
      verified: true,
    },
    title: "Travel Blog",
    description: "Award-winning travel blog with 200K+ monthly readers. Ideal for travel, tourism, and hospitality brands.",
    type: "Blog",
    icon: Globe,
    rating: 4.9,
    metrics: {
      monthlyReaders: "200K",
      avgSession: "4:30",
      bounceRate: "35%",
      topCountries: "US, UK, AU",
    },
    price: "$2200",
    priceModel: "per month",
    category: "Travel",
    tags: ["Travel", "Tourism", "Adventure"],
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    name: "David Chen",
    verified: true,
    platform: "Blog",
    images: ["https://randomuser.me/api/portraits/men/41.jpg"]
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

// ChatModal component for localStorage chat
function ChatModal({ adSpaceId, open, onClose }: { adSpaceId: number | null; open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const chatKey = `chat_${adSpaceId}`;
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const stored = localStorage.getItem(chatKey);
      setMessages(stored ? JSON.parse(stored) : []);
    }
  }, [open, chatKey]);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "You", text: input }];
    setMessages(newMessages);
    localStorage.setItem(chatKey, JSON.stringify(newMessages));
    setInput("");
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-md shadow-xl">
        <h2 className="font-bold mb-2 text-black">Chat with Owner</h2>
        <div className="h-64 overflow-y-auto border p-2 mb-2 bg-white-50">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-1 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
              <span className="inline-block bg-cyan-100 px-2 py-1 rounded text-gray-900">{msg.text}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-2 text-gray-900"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
          />
          <button className="bg-cyan-500 text-white px-3 py-1 rounded" onClick={sendMessage}>Send</button>
        </div>
        <button className="mt-2 text-sm text-gray-500" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// AnimatedCounter component
function AnimatedCounter({ value }: { value: number | string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = typeof value === 'string' ? parseInt(value.replace(/[^\d]/g, '')) : value;
    if (isNaN(end)) return setCount(0);
    if (end === 0) return setCount(0);
    const duration = 1000;
    const increment = Math.ceil(end / (duration / 16));
    let current = start;
    const step = () => {
      current += increment;
      if (current >= end) {
        setCount(end);
      } else {
        setCount(current);
        requestAnimationFrame(step);
      }
    };
    step();
    // eslint-disable-next-line
  }, [value]);
  return <span>{typeof value === 'string' && value.includes('%') ? `${count}%` : count.toLocaleString()}</span>;
}

// Simple Carousel component for card images
function CardCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div className="relative w-full h-32 mb-3 flex items-center justify-center">
      <img src={images[idx]} alt="ad space" className="object-cover w-full h-full rounded-xl" />
      {images.length > 1 && (
        <>
          <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-1 text-xs" onClick={e => { e.stopPropagation(); setIdx((idx - 1 + images.length) % images.length); }}>&lt;</button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-1 text-xs" onClick={e => { e.stopPropagation(); setIdx((idx + 1) % images.length); }}>&gt;</button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => <span key={i} className={`inline-block w-2 h-2 rounded-full ${i === idx ? 'bg-cyan-500' : 'bg-gray-300'}`}></span>)}
          </div>
        </>
      )}
    </div>
  );
}

// Filter Sidebar component
function FilterSidebar({ filters, setFilters, categories, platforms, minPrice, maxPrice }: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Floating button for mobile */}
      <button className="fixed bottom-6 left-6 z-50 bg-cyan-500 text-white px-4 py-2 rounded-full shadow-lg md:hidden" onClick={() => setOpen(true)}>
        Filters
      </button>
      {/* Sidebar for desktop, Drawer for mobile */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-40 p-4 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:block md:w-64`}>
        <div className="flex justify-between items-center mb-4 md:hidden">
          <span className="font-bold text-lg">Filters</span>
          <button onClick={() => setOpen(false)} className="text-gray-500">✕</button>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Category</label>
          <select className="w-full border rounded p-1" value={filters.category} onChange={e => setFilters((f: any) => ({ ...f, category: e.target.value }))}>
            <option value="">All</option>
            {categories.map((cat: string) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Platform</label>
          <select className="w-full border rounded p-1" value={filters.platform} onChange={e => setFilters((f: any) => ({ ...f, platform: e.target.value }))}>
            <option value="">All</option>
            {platforms.map((plat: string) => <option key={plat} value={plat}>{plat}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Min Price (R)</label>
          <input type="number" className="w-full border rounded p-1" value={filters.minPrice} onChange={e => setFilters((f: any) => ({ ...f, minPrice: e.target.value }))} min={minPrice} />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Max Price (R)</label>
          <input type="number" className="w-full border rounded p-1" value={filters.maxPrice} onChange={e => setFilters((f: any) => ({ ...f, maxPrice: e.target.value }))} max={maxPrice} />
        </div>
        <button className="w-full bg-cyan-500 text-white py-2 rounded mt-2" onClick={() => setFilters({ category: '', platform: '', minPrice: '', maxPrice: '' })}>Clear Filters</button>
      </div>
      {/* Overlay for mobile drawer */}
      {open && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setOpen(false)} />}
    </>
  );
}

export default function AdSpacesPage() {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [favoriteAdSpaces, setFavoriteAdSpaces] = useState<Set<number>>(new Set());
  const [likedAdSpaces, setLikedAdSpaces] = useState<Set<number>>(new Set());
  const [bookmarkedAdSpaces, setBookmarkedAdSpaces] = useState<Set<number>>(new Set());
  const [selectedAdSpace, setSelectedAdSpace] = useState<AdSpace | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const confettiRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<{[adSpaceId: number]: {user: string, comment: string}[]}>({});
  const [reviewInput, setReviewInput] = useState<{user: string, comment: string}>({user: '', comment: ''});
  const [chatOpen, setChatOpen] = useState<{ open: boolean; adSpaceId: number | null }>({ open: false, adSpaceId: null });
  const [filters, setFilters] = useState({ category: '', platform: '', minPrice: '', maxPrice: '' });
  const allCategories = Array.from(new Set(adSpaces.map(a => a.category)));
  const allPlatforms = Array.from(new Set(adSpaces.map(a => a.platform)));
  const allPrices = adSpaces.map(a => {
    if (typeof a.price === 'string') {
      return parseInt(a.price.replace(/[^\d]/g, ''));
    }
    return a.price;
  }).filter((price): price is number => !isNaN(price));
  const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
  const maxPrice = Math.max(...allPrices);
  
  // Filter ad spaces based on search
  const filteredAdSpaces = adSpaces.filter(space => {
    const q = search.toLowerCase();
    const price = typeof space.price === 'string' ? parseInt(space.price.replace(/[^\d]/g, '')) : space.price;
    return (
      (space.title.toLowerCase().includes(q) ||
        (space.description && space.description.toLowerCase().includes(q)) ||
        (space.category && space.category.toLowerCase().includes(q)) ||
        (space.tags && space.tags.some(tag => tag.toLowerCase().includes(q))) ||
        (space.name && space.name.toLowerCase().includes(q))) &&
      (!filters.category || space.category === filters.category) &&
      (!filters.platform || space.platform === filters.platform) &&
      (!filters.minPrice || price >= parseInt(filters.minPrice)) &&
      (!filters.maxPrice || price <= parseInt(filters.maxPrice))
    );
  });
  
  const totalPages = Math.ceil(filteredAdSpaces.length / cardsPerPage);
  const paginatedAdSpaces = filteredAdSpaces.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);
  
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

  // Like/Favorite/Bookmark handlers
  const toggleFavorite = (adSpaceId: number) => {
    setFavoriteAdSpaces(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(adSpaceId)) newFavorites.delete(adSpaceId);
      else newFavorites.add(adSpaceId);
      return newFavorites;
    });
  };
  const toggleLike = (adSpaceId: number) => {
    setLikedAdSpaces(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(adSpaceId)) newLikes.delete(adSpaceId);
      else newLikes.add(adSpaceId);
      return newLikes;
    });
  };
  const toggleBookmark = (adSpaceId: number) => {
    setBookmarkedAdSpaces(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(adSpaceId)) newBookmarks.delete(adSpaceId);
      else newBookmarks.add(adSpaceId);
      return newBookmarks;
    });
  };

  // Review submit handler
  const handleReviewSubmit = (adSpaceId: number) => {
    if (!reviewInput.user || !reviewInput.comment) return;
    setReviews(prev => ({
      ...prev,
      [adSpaceId]: [...(prev[adSpaceId] || []), { ...reviewInput }]
    }));
    setReviewInput({ user: '', comment: '' });
  };

  // Share handlers
  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin', adSpace: AdSpace) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this ad space: ${adSpace.title}`);
    let shareUrl = '';
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
    window.open(shareUrl, '_blank');
  };

  const toggleExpand = (adSpaceId: number) => {
    setExpandedCard(expandedCard === adSpaceId ? null : adSpaceId);
  };

  const handleViewProfile = (adSpace: AdSpace) => {
    setSelectedAdSpace(adSpace);
    setIsProfileOpen(true);
  };

  // Confetti effect on page change
  useEffect(() => {
    if (confettiRef.current) {
      confettiRef.current.classList.remove("animate-confetti");
      void confettiRef.current.offsetWidth; // trigger reflow
      confettiRef.current.classList.add("animate-confetti");
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image restored, with overlays for futuristic effects */}
      <div className="absolute inset-0 z-0">
        <img src="/images/adspace.jpg" alt="background" className="w-full h-full object-cover object-center absolute inset-0 z-0" style={{opacity:0.85}} />
        <div className="w-full h-full animate-gradient-move bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-70 absolute inset-0 z-10" />
        {/* Animated glowing orb */}
        <div className="absolute left-1/2 top-1/3 w-96 h-96 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 opacity-40 rounded-full blur-3xl animate-pulse-slow -translate-x-1/2 -z-10" />
      </div>
      <Navbar />
      <main className="flex-1 relative z-10">
        <div className="container py-12">
          <div className="text-center py-5">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_2px_24px_rgba(0,255,255,0.7)] mb-6 min-h-[72px]">
              {displayText}
              <span className="animate-pulse text-cyan-400">|</span>
            </h1>
            <div className="h-20 md:h-24 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTaglineIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg md:text-xl text-cyan-200 max-w-3xl mx-auto font-medium drop-shadow-[0_2px_12px_rgba(0,255,255,0.3)]"
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
              className="w-full max-w-md rounded-lg border border-cyan-400 bg-white/10 text-cyan-100 placeholder-cyan-300 shadow-lg focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 backdrop-blur-md"
            />
          </div>

          {/* Confetti effect container */}
          <div ref={confettiRef} className="pointer-events-none absolute left-8 top-0 w-full h-full z-50 animate-confetti" style={{display:'none'}} />
          {/* Ad Spaces Grid */}
          <div className="w-full flex flex-col">
            {paginatedAdSpaces.length === 0 ? (
              <div className="text-center text-cyan-300 py-20 animate-pulse">
                <span className="text-5xl">😅</span>
                <div className="mt-4 text-2xl font-bold">No ad spaces found. Try a different search!</div>
              </div>
                ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ml-auto">
                {paginatedAdSpaces.map((space, idx) => (
                  <motion.div
                        key={space.id}
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 30 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                    whileHover={{ scale: 1.07, rotate: 1, boxShadow: "0 0 48px 8px #00fff7cc" }}
                    className={`relative border border-cyan-400/40 rounded-2xl shadow-xl p-6 w-80 h-[480px] transition-all duration-300 hover:border-cyan-300 hover:shadow-cyan-400/40 group overflow-hidden${idx === 0 ? ' md:ml-32 ml-4' : ''}${idx === 1 ? ' md:ml-16 ml-2' : ''} ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
                    style={{ color: theme === 'dark' ? undefined : '#222' }}
                  >
                    {/* Neon border glow */}
                    <div className="absolute -inset-1 rounded-2xl pointer-events-none group-hover:shadow-[0_0_48px_12px_#00fff7] transition-all duration-300" />
                    {/* Like/Favorite/Bookmark buttons */}
                    <div className="absolute top-3 right-3 flex gap-2 z-10">
                      <button onClick={e => { e.stopPropagation(); toggleLike(space.id); }} className={likedAdSpaces.has(space.id) ? 'text-pink-500' : 'text-gray-400'} title="Like"><ThumbsUp size={20} /></button>
                      <button onClick={e => { e.stopPropagation(); toggleFavorite(space.id); }} className={favoriteAdSpaces.has(space.id) ? 'text-red-500' : 'text-gray-400'} title="Favorite"><Heart size={20} /></button>
                      <button onClick={e => { e.stopPropagation(); toggleBookmark(space.id); }} className={bookmarkedAdSpaces.has(space.id) ? 'text-blue-500' : 'text-gray-400'} title="Bookmark"><Bookmark size={20} /></button>
                    </div>
                        <div className="flex items-center gap-3 mb-3">
                          {space.avatar && (
                        <img src={space.avatar} alt={space.name || space.title} className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-cyan-400/30 shadow-md animate-fade-in" />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                          <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{space.name || 'Anonymous'}</span>
                              {space.verified && (
                            <span className="inline-block bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-xs px-2 py-0.5 rounded shadow-cyan-400/40">Verified</span>
                              )}
                            </div>
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Posted an ad</span>
                          </div>
                        </div>
                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{space.title}</h3>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{space.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-2 py-0.5 rounded text-xs shadow animate-glow">{space.type}</span>
                      <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-2 py-0.5 rounded text-xs shadow animate-glow">{space.category}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {space.tags && space.tags.map(tag => (
                        <span key={tag} className="bg-cyan-400/20 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs border border-cyan-400/40 shadow-cyan-400/10 shadow-sm animate-glow">{tag}</span>
                          ))}
                        </div>
                        <div className="mb-2">
                      <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>R{typeof space.price === 'string' ? space.price.replace(/[^\d]/g, '') : space.price}</span>
                      <span className={`text-xs font-normal ml-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{space.priceModel}</span>
                        </div>
                        <div className="mb-2">
                      <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Metrics:</span>
                      <ul className={`ml-4 mt-1 list-disc text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {Object.entries(space.metrics).map(([key, value]) => (
                          <li key={key}><span className={`capitalize font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{(key as string).replace(/([A-Z])/g, " $1").trim()}:</span> <span className="ml-1 text-cyan-700 font-bold"><AnimatedCounter value={value} /></span></li>
                            ))}
                          </ul>
                        </div>
                    <div className="flex justify-between mt-4">
                      <button
                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded shadow transition font-semibold animate-pulse"
                        onClick={() => { setSelectedAdSpace(space); setIsProfileOpen(true); }}
                      >
                        View More
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-cyan-700 rounded shadow transition font-semibold ml-2 animate-glow"
                        onClick={() => setChatOpen({ open: true, adSpaceId: space.id })}
                      >
                        Message Owner
                      </button>
                      </div>
                  </motion.div>
                    ))}
                  </div>
                )}
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 animate-fade-in">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-cyan-400 text-white disabled:opacity-50 hover:bg-cyan-500 transition"
                >
                  Prev
                </button>
                <span className="text-black font-semibold">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-cyan-400 text-white disabled:opacity-50 hover:bg-cyan-500 transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>

      <AnimatePresence>
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.3, type: 'spring' }}
          >
            <DialogContent className={`w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[80vh] overflow-y-auto border-gray-700 p-2 md:p-6 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-[#222]'}`}>
          {selectedAdSpace && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary/10">
                    <AvatarImage src={selectedAdSpace.avatar} alt={selectedAdSpace.name || selectedAdSpace.title} />
                        <AvatarFallback className="bg-gray-200 text-gray-700 text-2xl">
                      {(selectedAdSpace.name || selectedAdSpace.title)[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                        <DialogTitle className="flex items-center gap-2 text-2xl text-black">
                      {selectedAdSpace.name || selectedAdSpace.title}
                      {selectedAdSpace.verified && (
                            <Badge variant="secondary" className="bg-gray-200 text-gray-800 border border-gray-400">
                          Verified
                        </Badge>
                      )}
                    </DialogTitle>
                        <DialogDescription className="text-gray-700 text-lg">
                      {selectedAdSpace.platform || selectedAdSpace.type}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-6">
                  <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                        <p className="text-gray-700">{selectedAdSpace.description}</p>
                  </div>
                  
                  <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedAdSpace.metrics).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-sm text-muted-foreground capitalize">
                                {(key as string).replace(/([A-Z])/g, " $1").trim()}:
                              </span>
                              <span className="text-sm font-medium">{value}</span>
                            </div>
                      ))}
                    </div>
                  </div>

                  <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAdSpace.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                              className="bg-gray-200 text-gray-800"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing Details</h3>
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <div className="text-3xl font-bold text-gray-900 mb-1">
                        {selectedAdSpace.price}
                      </div>
                          <div className="text-gray-700">{selectedAdSpace.priceModel}</div>
                    </div>
                  </div>

                  <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Performance</h3>
                    <div className="space-y-3">
                      {['Engagement Rate', 'Monthly Revenue', 'Success Rate'].map((metric) => (
                            <div key={metric} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                              <span className="text-gray-800">{metric}</span>
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {metric === 'Monthly Revenue' ? 'R9,800' : '+15%'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Campaigns</h3>
                    <div className="space-y-2">
                      {['Summer Sale 2023', 'Black Friday Special', 'New Year Promotion'].map((campaign) => (
                            <div key={campaign} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                              <span className="text-gray-800">{campaign}</span>
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                            +25% ROI
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

                  {/* Share Buttons */}
                  <div className="flex gap-4 mt-4 mb-2">
                    <button onClick={() => handleShare('twitter', selectedAdSpace)} className="hover:text-cyan-500" title="Share on Twitter"><Twitter size={22} /></button>
                    <button onClick={() => handleShare('facebook', selectedAdSpace)} className="hover:text-blue-600" title="Share on Facebook"><Facebook size={22} /></button>
                    <button onClick={() => handleShare('linkedin', selectedAdSpace)} className="hover:text-blue-800" title="Share on LinkedIn"><Linkedin size={22} /></button>
                  </div>

                  {/* User Reviews/Comments Section */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">User Reviews & Comments</h3>
                    <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                      {(reviews[selectedAdSpace.id] || []).length === 0 && (
                        <div className="text-gray-500">No reviews yet. Be the first to comment!</div>
                      )}
                      {(reviews[selectedAdSpace.id] || []).map((r, idx) => (
                        <div key={idx} className="bg-gray-100 rounded p-2 text-gray-900">
                          <span className="font-bold text-cyan-700">{r.user}:</span> {r.comment}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={reviewInput.user}
                        onChange={e => setReviewInput({ ...reviewInput, user: e.target.value })}
                        className="px-2 py-1 rounded bg-gray-200 text-gray-900 border border-gray-400"
                      />
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={reviewInput.comment}
                        onChange={e => setReviewInput({ ...reviewInput, comment: e.target.value })}
                        className="px-2 py-1 rounded bg-gray-200 text-gray-900 border border-gray-400 flex-1"
                      />
                      <button onClick={() => handleReviewSubmit(selectedAdSpace.id)} className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded flex items-center gap-1"><Send size={16} />Post</button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-300 mt-6">
                <Button 
                  variant="outline" 
                      className="border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-black"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Close
                </Button>
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  Start Collaboration
                </Button>
              </div>
            </>
          )}
        </DialogContent>
          </motion.div>
      </Dialog>
      </AnimatePresence>

      <ChatModal adSpaceId={chatOpen.adSpaceId} open={chatOpen.open} onClose={() => setChatOpen({ open: false, adSpaceId: null })} />
      <FilterSidebar filters={filters} setFilters={setFilters} categories={allCategories} platforms={allPlatforms} minPrice={minPrice} maxPrice={maxPrice} />
    </div>
  )
}

