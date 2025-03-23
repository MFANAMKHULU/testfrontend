import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BarChart2,
  Calendar,
  Check,
  Clock,
  Eye,
  Globe,
  Heart,
  Instagram,
  MessageSquare,
  Share2,
  ShieldCheck,
  Star,
  Twitter,
  Youtube,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  reviews: 124,
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
}

export default function InfluencerDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-6">
            <Link
              href="/influencers"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to influencers
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar className="h-24 w-24 border-2 border-primary/10">
                    <AvatarImage src={influencer.avatar} alt={influencer.name} />
                    <AvatarFallback>{influencer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{influencer.platform}</Badge>
                      <Badge variant="secondary">{influencer.category}</Badge>
                      {influencer.verified && (
                        <Badge variant="outline" className="gap-1">
                          <Check className="h-3 w-3" /> Verified
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold mb-1">{influencer.name}</h1>
                    <p className="text-muted-foreground mb-2">{influencer.handle}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{influencer.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{influencer.reviews} reviews</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>500+ profile views this week</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 self-start">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="about">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">About {influencer.name}</h3>
                      <p className="text-muted-foreground">{influencer.description}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(influencer.metrics).map(([key, value]) => (
                        <div key={key} className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                          <p className="font-medium">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Social Profiles</h3>
                      <div className="space-y-3">
                        {influencer.socialProfiles.map((profile, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                              {profile.platform === "YouTube" && <Youtube className="h-4 w-4 text-primary" />}
                              {profile.platform === "Instagram" && <Instagram className="h-4 w-4 text-primary" />}
                              {profile.platform === "Twitter" && <Twitter className="h-4 w-4 text-primary" />}
                            </div>
                            <div>
                              <p className="font-medium">{profile.platform}</p>
                              <p className="text-sm text-muted-foreground">
                                {profile.handle} • {profile.followers} followers
                              </p>
                            </div>
                            <Button variant="ghost" size="sm" className="ml-auto" asChild>
                              <Link href={profile.url}>Visit</Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Past Collaborations</h3>
                      <div className="space-y-3">
                        {influencer.pastCollaborations.map((collab, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="bg-muted/50 p-2 rounded-lg">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{collab.brand}</p>
                              <p className="text-sm text-muted-foreground">
                                {collab.campaign} • {collab.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {influencer.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="pt-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium mb-3">Content Samples</h3>

                    <div className="grid gap-6">
                      {influencer.contentSamples.map((sample, index) => (
                        <Card key={index}>
                          <CardHeader className="pb-3">
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                              <Youtube className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <CardTitle className="mt-4">{sample.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Views</p>
                                <p className="font-medium">{sample.views}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Engagement</p>
                                <p className="font-medium">{sample.engagement}</p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full" asChild>
                              <Link href={sample.url}>Watch Video</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>

                    <div className="text-center">
                      <Button variant="outline" asChild>
                        <Link href="#">View All Content</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="services" className="pt-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium mb-3">Services Offered</h3>

                    <div className="grid gap-6">
                      {influencer.services.map((service, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <CardTitle>{service.title}</CardTitle>
                              <div className="text-right">
                                <p className="font-bold">{service.price}</p>
                              </div>
                            </div>
                            <CardDescription>{service.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <h4 className="text-sm font-medium mb-2">What's included:</h4>
                            <ul className="space-y-1">
                              {service.deliverables.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full">Book This Service</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <p className="text-3xl font-bold">{influencer.rating}</p>
                        <div className="flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(influencer.rating) ? "text-yellow-500" : "text-muted"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{influencer.reviews} reviews</p>
                      </div>
                      <div className="flex-1">
                        <div className="space-y-1">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const percentage =
                              rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 0 : 0
                            return (
                              <div key={rating} className="flex items-center gap-2">
                                <div className="flex items-center">
                                  <span className="text-sm w-3">{rating}</span>
                                  <Star className="h-3 w-3 text-yellow-500 ml-1" />
                                </div>
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="bg-yellow-500 h-full rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-muted-foreground">{percentage}%</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-6">
                      {influencer.reviews.map((review) => (
                        <div key={review.id} className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{review.author}</p>
                              <p className="text-sm text-muted-foreground">{review.company}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "text-yellow-500" : "text-muted"}`}
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <p className="text-sm">{review.content}</p>
                          {review.id < influencer.reviews.length && <Separator className="mt-4" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact {influencer.name}</CardTitle>
                  <CardDescription>Book a collaboration or ask questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">Starting at {influencer.price}</p>
                      <p className="text-sm text-muted-foreground">{influencer.priceModel}</p>
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

              <Card>
                <CardHeader>
                  <CardTitle>Similar Influencers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Michael Tech" />
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">Michael Tech</p>
                      <p className="text-sm text-muted-foreground">Tech Reviewer • 720K followers</p>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0">
                      View
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="TechGirl" />
                      <AvatarFallback>TG</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">TechGirl</p>
                      <p className="text-sm text-muted-foreground">Tech Influencer • 650K followers</p>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0">
                      View
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="GadgetPro" />
                      <AvatarFallback>GP</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">GadgetPro</p>
                      <p className="text-sm text-muted-foreground">Tech Expert • 920K followers</p>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

