"use client"

import { DashboardLayout } from "@/components/dashboard/layout"
import { motion } from "framer-motion"
import { 
  Users, 
  DollarSign, 
  TrendingUp,
  Target,
  BarChart2
} from "lucide-react"
import clsx from "clsx"

const stats = [
  {
    label: "Total Budget",
    value: "$150,000",
    change: "-8.2%",
    icon: DollarSign,
    trend: "down"
  },
  {
    label: "Active Campaigns",
    value: "12",
    change: "+3",
    icon: Target,
    trend: "up"
  },
  {
    label: "Total Reach",
    value: "2.4M",
    change: "+24.5%",
    icon: Users,
    trend: "up"
  },
  {
    label: "ROI",
    value: "285%",
    change: "+12.3%",
    icon: TrendingUp,
    trend: "up"
  }
]

const activeCampaigns = [
  {
    name: "Summer Collection Launch",
    platform: "Instagram",
    budget: "$25,000",
    reach: "450K",
    status: "Active",
    performance: "High"
  },
  {
    name: "Brand Awareness",
    platform: "TikTok",
    budget: "$18,000",
    reach: "820K",
    status: "Active",
    performance: "Medium"
  },
  {
    name: "Product Showcase",
    platform: "YouTube",
    budget: "$32,000",
    reach: "290K",
    status: "Scheduled",
    performance: "Pending"
  }
]

export default function CompanyDashboard() {
  return (
    <DashboardLayout role="company">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, Nike!</h1>
            <p className="text-gray-400 mt-1">Monitor your campaign performance and ROI.</p>
          </div>
          <button className="px-4 py-2 bg-[#9575ff] text-white rounded-lg hover:bg-[#8a63ff] transition-colors">
            Create Campaign
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[#1a1e32] p-6 rounded-lg border border-[#2a2e45]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                </div>
                <div className="p-2 bg-[#2a2e45] rounded-lg">
                  <stat.icon className="h-5 w-5 text-[#9575ff]" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={clsx(
                  "font-medium",
                  stat.trend === "up" ? "text-green-400" : "text-red-400"
                )}>
                  {stat.change}
                </span>
                <span className="text-gray-400 ml-2">vs last month</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Campaigns */}
        <div className="bg-[#1a1e32] rounded-lg border border-[#2a2e45]">
          <div className="p-6 border-b border-[#2a2e45]">
            <h2 className="text-lg font-semibold text-white">Active Campaigns</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400">
                    <th className="pb-4">Campaign</th>
                    <th className="pb-4">Platform</th>
                    <th className="pb-4">Budget</th>
                    <th className="pb-4">Reach</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {activeCampaigns.map((campaign, index) => (
                    <tr key={index} className="border-t border-[#2a2e45]">
                      <td className="py-4 text-white">{campaign.name}</td>
                      <td className="py-4 text-gray-300">{campaign.platform}</td>
                      <td className="py-4 text-white">{campaign.budget}</td>
                      <td className="py-4 text-gray-300">{campaign.reach}</td>
                      <td className="py-4">
                        <span className={clsx(
                          "px-2 py-1 text-xs rounded-full",
                          campaign.status === "Active" ? "bg-green-400/10 text-green-400" :
                          "bg-blue-400/10 text-blue-400"
                        )}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={clsx(
                          "px-2 py-1 text-xs rounded-full",
                          campaign.performance === "High" ? "bg-green-400/10 text-green-400" :
                          campaign.performance === "Medium" ? "bg-yellow-400/10 text-yellow-400" :
                          "bg-gray-400/10 text-gray-400"
                        )}>
                          {campaign.performance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Analytics Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1a1e32] p-6 rounded-lg border border-[#2a2e45]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Campaign Performance</h3>
              <button className="text-[#9575ff] hover:text-[#8a63ff] transition-colors text-sm">
                View Details →
              </button>
            </div>
            <div className="h-48 flex items-center justify-center border border-[#2a2e45] rounded-lg">
              <BarChart2 className="h-24 w-24 text-gray-600" />
            </div>
          </div>
          <div className="bg-[#1a1e32] p-6 rounded-lg border border-[#2a2e45]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Top Influencers</h3>
              <button className="text-[#9575ff] hover:text-[#8a63ff] transition-colors text-sm">
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: "John Doe", followers: "1.2M", engagement: "4.8%" },
                { name: "Jane Smith", followers: "856K", engagement: "5.2%" },
                { name: "Mike Johnson", followers: "643K", engagement: "4.5%" }
              ].map((influencer, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-[#2a2e45] rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-[#2a2e45] flex items-center justify-center">
                      <Users className="h-5 w-5 text-[#9575ff]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{influencer.name}</p>
                      <p className="text-gray-400 text-sm">{influencer.followers} followers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-medium">{influencer.engagement}</p>
                    <p className="text-gray-400 text-sm">Engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 