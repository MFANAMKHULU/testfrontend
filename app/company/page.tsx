"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  BarChart3,
  DollarSign,
  Eye,
  Globe,
  LineChart,
  MessageSquare,
  TrendingUp,
  Users,
  Mail,
  ChevronDown,
  Building2,
  Target,
  ShoppingCart,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { AnimatedBorderCard } from "@/components/ui/animated-border-card"
import { motion } from "framer-motion"
import { useState } from "react"
import { Meteors } from "@/components/ui/meteors"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { AnimatedEmail } from "@/components/ui/animated-email"
import { CompanySidebar } from "@/components/company/sidebar"
import { TiltedScroll } from "@/components/ui/tilted-scroll"

const cardVariants = {
  hidden: {
    x: 0,
    y: 0,
    scale: 0.8,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: custom * 0.15,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

const stats = [
  {
    title: "Total Ad Spend",
    value: "$24,543",
    change: "+22% from last month",
    icon: DollarSign
  },
  {
    title: "Active Campaigns",
    value: "8",
    change: "+2 new this month",
    icon: Target
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.5% from last month",
    icon: ShoppingCart
  },
  {
    title: "Total Reach",
    value: "4.2M",
    change: "+28% from last month",
    icon: Eye
  }
]

const topPerformingAds = [
  {
    icon: <Building2 className="size-4 text-green-400" />,
    title: "Tech Blog Banner",
    description: "2.4% CTR",
    date: "This month",
    iconClassName: "text-green-400",
    titleClassName: "text-green-400",
    className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Users className="size-4 text-orange-400" />,
    title: "Newsletter Sponsorship",
    description: "1.8% CTR",
    date: "This month",
    iconClassName: "text-orange-400",
    titleClassName: "text-orange-400",
    className: "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <MessageSquare className="size-4 text-blue-300" />,
    title: "Podcast Ad",
    description: "1.5% CTR",
    date: "This month",
    iconClassName: "text-blue-300",
    titleClassName: "text-blue-300",
    className: "[grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-8 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
]

const campaigns = [
  {
    name: "Tech Blog Banner Campaign",
    revenue: 12450,
    status: "Active",
    budget: 5000,
    daysRemaining: 15
  },
  {
    name: "Newsletter Sponsorship",
    revenue: 8920,
    status: "Active",
    budget: 3000,
    daysRemaining: 8
  },
  {
    name: "Podcast Ad Campaign",
    revenue: 6780,
    status: "Paused",
    budget: 2500,
    daysRemaining: 3
  },
  {
    name: "Social Media Ads",
    revenue: 5340,
    status: "Active",
    budget: 4000,
    daysRemaining: 12
  },
  {
    name: "Influencer Marketing",
    revenue: 3200,
    status: "Scheduled",
    budget: 6000,
    daysRemaining: 30
  },
  {
    name: "Display Advertising",
    revenue: 2800,
    status: "Ended",
    budget: 2000,
    daysRemaining: 0
  }
]

export default function CompanyDashboardPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0])
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [revenueSort, setRevenueSort] = useState<'asc' | 'desc' | null>(null)

  const filteredCampaigns = campaigns
    .filter(campaign => statusFilter.length === 0 || statusFilter.includes(campaign.status))
    .sort((a, b) => {
      if (revenueSort === 'asc') return a.revenue - b.revenue
      if (revenueSort === 'desc') return b.revenue - a.revenue
      return 0
    })

  return (
    <div className="flex h-screen bg-[#1B0B36]">
      <CompanySidebar />
      <div className="flex-1 overflow-auto">
        <div className="space-y-8 p-8">
          <div className="flex items-start gap-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden bg-muted/20 border-2 border-blue-500/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 className="h-12 w-12 text-blue-400/50" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">TechCorp Inc.</h2>
              <div className="flex items-center gap-2 mt-1">
                <Briefcase className="h-4 w-4 text-gray-400" />
                <p className="text-gray-400">Technology & Software</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={stats.length - 1 - index}
                style={{
                  position: 'relative',
                  transformOrigin: 'center'
                }}
              >
                <AnimatedBorderCard>
                  <div className="p-4">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="text-sm font-medium text-gray-200">{stat.title}</h3>
                      <stat.icon className="h-4 w-4 text-gray-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <p className="text-xs text-gray-400">{stat.change}</p>
                    </div>
                  </div>
                </AnimatedBorderCard>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="border-2 border-blue-500/50 bg-transparent h-9 w-[400px] grid grid-cols-3 rounded-none p-1 shadow-[inset_0_0_35px_rgba(59,130,246,0.3)]">
              <TabsTrigger 
                value="overview" 
                className="ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border data-[state=active]:border-orange-500 data-[state=active]:rounded-none data-[state=active]:shadow-[inset_0_0_30px_rgba(34,197,94,0.5)] data-[state=active]:text-white data-[state=active]:bg-transparent hover:bg-transparent px-2 py-[2px] text-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="campaigns"
                className="ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border data-[state=active]:border-orange-500 data-[state=active]:rounded-none data-[state=active]:shadow-[inset_0_0_30px_rgba(34,197,94,0.5)] data-[state=active]:text-white data-[state=active]:bg-transparent hover:bg-transparent px-2 py-[2px] text-sm"
              >
                Campaigns
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border data-[state=active]:border-orange-500 data-[state=active]:rounded-none data-[state=active]:shadow-[inset_0_0_30px_rgba(34,197,94,0.5)] data-[state=active]:text-white data-[state=active]:bg-transparent hover:bg-transparent px-2 py-[2px] text-sm"
              >
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4 bg-gradient-to-br from-blue-950/30 to-blue-900/10 border-blue-500/20">
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Click on a campaign to view details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex">
                      <div className="w-[240px] space-y-6 relative">
                        {campaigns.map((campaign, index) => (
                          <div
                            key={campaign.name}
                            onClick={() => setSelectedCampaign(campaign)}
                            className={`group flex items-center cursor-pointer p-2 pl-4 transition-all relative ${
                              selectedCampaign.name === campaign.name 
                                ? 'text-green-400 after:absolute after:left-0 after:top-0 after:h-full after:w-[3px] after:bg-green-400'
                                : 'text-gray-400 hover:text-green-400'
                            }`}
                          >
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{campaign.name}</p>
                              <p className="text-xs text-gray-400/60">{campaign.status}</p>
                            </div>
                            <div className="absolute left-[calc(100%-5px)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                              <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-lg p-3 min-w-[180px]">
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-sm text-gray-400">Revenue</p>
                                    <p className="text-lg font-semibold text-green-400">
                                      ${campaign.revenue.toLocaleString()}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-1 text-green-400">
                                    <TrendingUp className="h-3 w-3" />
                                    <p className="text-xs">14% vs prev month</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="w-[1px] bg-blue-500/20 self-stretch mx-2" />

                      <div className="flex-1 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-green-500/5 rounded-full blur-[100px]" />
                        <motion.div
                          className="group h-64 w-64 rounded-full bg-[#1B0B36] flex items-center justify-center relative overflow-hidden border-2 border-green-500/20"
                          animate={{
                            scale: [1, 1.02, 1],
                            transition: { 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }
                          }}
                          key={selectedCampaign.revenue}
                        >
                          {/* Crack effect layers */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(34,197,94,0.2)_50%,transparent_100%)] animate-crack-pulse" />
                            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,rgba(34,197,94,0.3)_25%,transparent_50%)] animate-crack-spin" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.2)_0%,transparent_50%)] group-hover:scale-y-125 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(34,197,94,0.2)_0%,transparent_50%)] group-hover:scale-y-125 transition-transform duration-700" />
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent rounded-full" />
                          <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent rounded-full" />
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 rounded-full" />
                          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(34,197,94,0.2)] rounded-full" />
                          <div className="relative text-center space-y-2 z-10">
                            <p className="text-sm text-green-400">Revenue</p>
                            <p className="text-5xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                              ${selectedCampaign.revenue.toLocaleString()}
                            </p>
                            <div className="flex items-center justify-center gap-1 text-green-400">
                              <TrendingUp className="h-4 w-4" />
                              <p className="text-sm">14%</p>
                            </div>
                            <p className="text-xs text-gray-400">vs prev month</p>
                          </div>
                          <div className="absolute inset-0 bg-green-500/5 animate-pulse rounded-full" />
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3 bg-gradient-to-br from-blue-950/30 to-blue-900/10 border-blue-500/20">
                  <CardHeader>
                    <CardTitle>Top Performing Ads</CardTitle>
                    <CardDescription>Your best performing ad placements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TiltedScroll />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-4">
              <Card className="bg-gradient-to-br from-blue-950/30 to-blue-900/10 border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>All Campaigns</CardTitle>
                    <CardDescription>View and manage all your advertising campaigns</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="border-2 border-blue-500/50 hover:border-blue-500 transition-all duration-300 hover:shadow-[inset_0_0_25px_rgba(59,130,246,0.5)] bg-transparent text-white hover:text-white">
                        <LineChart className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={statusFilter.includes('Active')}
                        onCheckedChange={(checked) => 
                          setStatusFilter(checked 
                            ? [...statusFilter, 'Active']
                            : statusFilter.filter(s => s !== 'Active')
                          )
                        }
                      >
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusFilter.includes('Paused')}
                        onCheckedChange={(checked) => 
                          setStatusFilter(checked 
                            ? [...statusFilter, 'Paused']
                            : statusFilter.filter(s => s !== 'Paused')
                          )
                        }
                      >
                        Paused
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusFilter.includes('Scheduled')}
                        onCheckedChange={(checked) => 
                          setStatusFilter(checked 
                            ? [...statusFilter, 'Scheduled']
                            : statusFilter.filter(s => s !== 'Scheduled')
                          )
                        }
                      >
                        Scheduled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={statusFilter.includes('Ended')}
                        onCheckedChange={(checked) => 
                          setStatusFilter(checked 
                            ? [...statusFilter, 'Ended']
                            : statusFilter.filter(s => s !== 'Ended')
                          )
                        }
                      >
                        Ended
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Sort by Revenue</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setRevenueSort('desc')}>
                        Highest First
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRevenueSort('asc')}>
                        Lowest First
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRevenueSort(null)}>
                        Reset Sort
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredCampaigns.map((campaign) => (
                      <motion.div
                        key={campaign.name}
                        className="flex items-center justify-between group hover:bg-blue-500/5 p-3 rounded-lg transition-all"
                        whileHover={{
                          scale: 1.02,
                          rotateX: 2,
                          rotateY: 2,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="space-y-1">
                          <p className="font-medium text-white group-hover:text-blue-400 transition-colors">{campaign.name}</p>
                          <div className="flex items-center gap-3">
                            <p className="text-sm text-muted-foreground">
                              Budget: ${campaign.budget.toLocaleString()}
                            </p>
                            <div className="w-1 h-1 rounded-full bg-gray-600" />
                            <p className="text-sm text-muted-foreground">
                              {campaign.daysRemaining > 0 
                                ? `${campaign.daysRemaining} days remaining`
                                : 'Campaign ended'}
                            </p>
                            <div className="w-1 h-1 rounded-full bg-gray-600" />
                            <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${
                              campaign.status === 'Active' 
                                ? 'bg-green-500/10 text-green-400'
                                : campaign.status === 'Paused'
                                ? 'bg-orange-500/10 text-orange-400'
                                : campaign.status === 'Scheduled'
                                ? 'bg-blue-500/10 text-blue-400'
                                : 'bg-gray-500/10 text-gray-400'
                            }`}>
                              {campaign.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-400">
                              ${campaign.revenue.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-2 border-blue-500/50 hover:border-blue-500 transition-all duration-300 hover:shadow-[inset_0_0_25px_rgba(59,130,246,0.5)] bg-transparent text-white hover:text-white"
                          >
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="flex items-center justify-between">
                <Card className="relative overflow-hidden bg-gradient-to-br from-blue-950/30 to-blue-900/10 border-blue-500/20 flex-1 mr-4">
                  <div className="absolute inset-0 h-full w-full">
                    <Meteors number={20} />
                  </div>
                  <CardHeader className="relative z-10">
                    <CardTitle>Campaign Analytics</CardTitle>
                    <CardDescription>Download and view your campaign reports</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Monthly Campaign Report</p>
                          <p className="text-sm text-muted-foreground">August 2023</p>
                        </div>
                        <Button size="sm">Download</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">ROI Analysis</p>
                          <p className="text-sm text-muted-foreground">Last 30 days</p>
                        </div>
                        <Button size="sm">Download</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Audience Insights</p>
                          <p className="text-sm text-muted-foreground">Q3 2023</p>
                        </div>
                        <Button size="sm">Download</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="w-[300px] bg-gradient-to-br from-blue-950/30 to-blue-900/10 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-white" />
                      Email Reports
                    </CardTitle>
                    <CardDescription>Receive reports directly in your inbox</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          Enable email reports
                        </p>
                        <Switch className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-orange-500/20 data-[state=checked]:hover:bg-orange-500/90 data-[state=unchecked]:hover:bg-orange-500/30 [&>span]:data-[state=checked]:bg-green-500 [&>span]:data-[state=unchecked]:bg-red-500" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            Select Frequency
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px]">
                          <DropdownMenuItem>
                            Per Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Every 10 Days
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Monthly
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Quarterly
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Every 6 Months
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 