"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
// import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  Users, 
  BarChart2, 
  Settings, 
  MessageSquare,
  DollarSign,
  Bell,
  Menu,
  X
} from "lucide-react"
import clsx from "clsx"

interface SidebarLink {
  icon: any
  label: string
  href: string
}

const commonLinks: SidebarLink[] = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/dashboard"
  },
  {
    icon: BarChart2,
    label: "Analytics",
    href: "/dashboard/analytics"
  },
  {
    icon: MessageSquare,
    label: "Messages",
    href: "/dashboard/messages"
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings"
  }
]

const roleSpecificLinks = {
  influencer: [
    {
      icon: Users,
      label: "Followers",
      href: "/dashboard/followers"
    },
    {
      icon: DollarSign,
      label: "Earnings",
      href: "/dashboard/earnings"
    }
  ],
  affiliate: [
    {
      icon: DollarSign,
      label: "Commissions",
      href: "/dashboard/commissions"
    },
    {
      icon: Users,
      label: "Referrals",
      href: "/dashboard/referrals"
    }
  ],
  company: [
    {
      icon: Users,
      label: "Campaigns",
      href: "/dashboard/campaigns"
    },
    {
      icon: DollarSign,
      label: "Budget",
      href: "/dashboard/budget"
    }
  ]
}

export function DashboardLayout({ 
  children, 
  role 
}: { 
  children: React.ReactNode
  role: "influencer" | "affiliate" | "company"
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  
  const links = [...commonLinks, ...roleSpecificLinks[role]]

  return (
    <div className="min-h-screen game bg-[#0f1424] text-white">
      {/* Mobile Sidebar Toggle */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-[#1a1e32] rounded-lg md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 w-64 bg-[#140047] transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#9575ff] mb-8">Adsy</h1>
          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "bg-[#9575ff] text-white"
                    : "text-gray-300 hover:bg-[#2a2e45] hover:text-white"
                )}
              >
                <link.icon className="h-5 w-5 mr-3" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className={clsx(
        "transition-all duration-200 ease-in-out",
        "md:ml-64 min-h-screen"
      )}>
        {/* Top Navigation */}
        <header className="bg-[#1a1e32] border-b border-[#2a2e45]">
          <div className="flex items-center justify-end px-6 h-16">
            <button className="p-2 hover:bg-[#2a2e45] rounded-lg mr-4">
              <Bell size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-[#9575ff] flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
} 