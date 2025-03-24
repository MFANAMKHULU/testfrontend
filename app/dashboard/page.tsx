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
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 space-y-8 p-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your advertising spaces.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,543</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Ad Spaces</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+2 new this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">3 new since yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2M</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <LineChart className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Top Performing Ad Spaces</CardTitle>
                  <CardDescription>Based on revenue this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-full flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">Tech Blog Premium Banner</p>
                          <p className="text-xs text-muted-foreground">$4,200 revenue</p>
                        </div>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">Newsletter Sponsorship</p>
                          <p className="text-xs text-muted-foreground">$3,150 revenue</p>
                        </div>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">Podcast Ad Spot</p>
                          <p className="text-xs text-muted-foreground">$2,800 revenue</p>
                        </div>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href="/dashboard/analytics">
                      View detailed analytics
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Requests</CardTitle>
                  <CardDescription>You have 5 pending requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-full flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">TechGadgets Inc.</p>
                          <p className="text-xs text-muted-foreground">Tech Blog Banner • 2 hours ago</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">SaaS Platform Pro</p>
                          <p className="text-xs text-muted-foreground">Newsletter • 5 hours ago</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">CloudCompute Ltd</p>
                          <p className="text-xs text-muted-foreground">Podcast Ad • 1 day ago</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href="/dashboard/requests">
                      View all requests
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>You have 3 unread messages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-full flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">Sarah Johnson</p>
                          <p className="text-xs text-muted-foreground">Question about banner specs • 1 hour ago</p>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">Michael Chen</p>
                          <p className="text-xs text-muted-foreground">Campaign renewal • 3 hours ago</p>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">Jessica Williams</p>
                          <p className="text-xs text-muted-foreground">Payment confirmation • 5 hours ago</p>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href="/dashboard/messages">
                      View all messages
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/dashboard/ad-spaces/new">
                        <Globe className="mr-2 h-4 w-4" />
                        Add New Ad Space
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/dashboard/earnings/withdraw">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Withdraw Earnings
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/dashboard/analytics/export">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Export Analytics
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/dashboard/settings">
                        <Users className="mr-2 h-4 w-4" />
                        Update Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Detailed performance metrics for your ad spaces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Analytics visualization would appear here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Download and view detailed reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Monthly Revenue Report</p>
                      <p className="text-sm text-muted-foreground">August 2023</p>
                    </div>
                    <Button size="sm">Download</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ad Performance Summary</p>
                      <p className="text-sm text-muted-foreground">Last 30 days</p>
                    </div>
                    <Button size="sm">Download</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Audience Demographics</p>
                      <p className="text-sm text-muted-foreground">Q3 2023</p>
                    </div>
                    <Button size="sm">Download</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  )
}

