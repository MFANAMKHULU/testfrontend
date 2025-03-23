"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "@/components/logo"
import { AnimatedButton } from "@/components/animated-button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const routes = [
  {
    href: "/",
    label: "Home",
    active: (pathname: string) => pathname === "/",
  },
  {
    href: "/ad-spaces",
    label: "Ad Spaces",
    active: (pathname: string) => pathname === "/ad-spaces" || pathname.startsWith("/ad-spaces/"),
  },
  {
    href: "/influencers",
    label: "Influencers",
    active: (pathname: string) => pathname === "/influencers" || pathname.startsWith("/influencers/"),
  },
  {
    href: "/affiliates",
    label: "Affiliates",
    active: (pathname: string) => pathname === "/affiliates" || pathname.startsWith("/affiliates/"),
  },
  {
    href: "/pricing",
    label: "Pricing",
    active: (pathname: string) => pathname === "/pricing",
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8" linkToHome={false} />
            <Link href="/">
              <span className="font-bold text-lg hidden sm:inline-block">All Things Ads</span>
            </Link>
          </div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {routes.map((route) => (
                <NavigationMenuItem key={route.href}>
                  <Link href={route.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-sm font-medium transition-colors",
                        route.active(pathname) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {route.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "text-sm font-medium transition-colors",
                    pathname === "/about" || pathname === "/contact" || pathname === "/help" || pathname === "/faq"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/about"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">About</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn about our mission and team
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/contact"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Contact</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get in touch with our team
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/help"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Help Center</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Find answers to common questions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/faq"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">FAQ</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Frequently asked questions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden sm:block">
            <AnimatedButton
              variant="ghost-primary"
              className="relative overflow-hidden"
              hoverScale={1.02}
              glowOnHover={true}
              shimmer={true}
            >
              Log in
            </AnimatedButton>
          </Link>
          <Link href="/signup">
            <AnimatedButton
              variant="primary-gradient"
              className="relative overflow-hidden"
              hoverScale={1.02}
              glowOnHover={true}
              sweep={true}
            >
              Sign up
            </AnimatedButton>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

