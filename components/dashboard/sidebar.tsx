"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Bell,
  CreditCard,
  Globe,
  LayoutDashboard,
  MessageSquare,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

const advertiserRoutes = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    variant: "default",
  },
  {
    title: "Ad Spaces",
    icon: Globe,
    href: "/dashboard/ad-spaces",
    variant: "ghost",
  },
  {
    title: "Requests",
    icon: Bell,
    href: "/dashboard/requests",
    variant: "ghost",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    href: "/dashboard/messages",
    variant: "ghost",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    variant: "ghost",
  },
  {
    title: "Earnings",
    icon: CreditCard,
    href: "/dashboard/earnings",
    variant: "ghost",
  },
]

const buyerRoutes = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    variant: "default",
  },
  {
    title: "Browse Ad Spaces",
    icon: Globe,
    href: "/ad-spaces",
    variant: "ghost",
  },
  {
    title: "My Campaigns",
    icon: BarChart3,
    href: "/dashboard/campaigns",
    variant: "ghost",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    href: "/dashboard/messages",
    variant: "ghost",
  },
  {
    title: "Billing",
    icon: CreditCard,
    href: "/dashboard/billing",
    variant: "ghost",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  // For demo purposes, we'll assume the user is an advertiser
  const routes = advertiserRoutes

  return (
    <div className="hidden md:flex flex-col border-r w-64 min-h-screen sticky top-16 h-[calc(100vh-4rem)]">
      {" "}
      {/* Updated for fixed positioning */}
      <ScrollArea className="flex-1">
        <div className="px-3 py-4">
          {" "}
          {/* Increased padding */}
          <div className="px-4 py-2">
            <h2 className="text-lg font-bold tracking-tight">Advertiser Dashboard</h2>
            <p className="text-sm text-muted-foreground">Manage your ad spaces and earnings</p>
          </div>
          <Separator className="my-3" /> {/* Increased margin */}
          <div className="space-y-1 py-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                size="sm"
                className={cn("w-full justify-start", {
                  "bg-secondary": pathname === route.href,
                })}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.title}
                </Link>
              </Button>
            ))}
          </div>
          <Separator className="my-3" /> {/* Increased margin */}
          <div className="space-y-1 py-2">
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link href="/dashboard/ad-spaces/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Ad Space
              </Link>
            </Button>
          </div>
          <Separator className="my-3" /> {/* Increased margin */}
          <div className="space-y-1 py-2">
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href="/dashboard/help">
                <Users className="mr-2 h-4 w-4" />
                Help & Support
              </Link>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

