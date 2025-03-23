import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Award, BarChart2, CheckCircle, Globe, Heart, Lightbulb, Shield, Users } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/50 py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About All Things Ads</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connecting advertisers, ad buyers, and affiliates in a seamless marketplace
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/ad-spaces">Browse Ad Spaces</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  All Things Ads was founded in 2020 with a simple mission: to revolutionize the advertising industry by
                  creating a transparent, efficient marketplace that connects advertisers who own marketing spaces with
                  businesses looking to advertise.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  We noticed a gap in the market where finding quality advertising spaces was difficult and
                  time-consuming, while many platform owners struggled to monetize their audiences effectively. Our
                  platform bridges this gap, making it easy for both sides to connect and create mutually beneficial
                  partnerships.
                </p>
                <p className="text-lg text-muted-foreground">
                  Today, we're proud to have facilitated thousands of successful advertising campaigns and helped
                  businesses of all sizes grow their reach and revenue.
                </p>
              </div>
              <div className="bg-muted/30 rounded-xl p-8">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Globe className="h-24 w-24 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
              <p className="text-lg text-muted-foreground">
                We're driven by a set of core values that guide everything we do
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    We constantly push the boundaries of what's possible in advertising technology, creating new
                    solutions that make advertising more effective and accessible.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Transparency</h3>
                  <p className="text-muted-foreground">
                    We believe in complete transparency in all our operations, from pricing to performance metrics,
                    ensuring all parties have the information they need to succeed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    We foster a supportive community where advertisers, ad buyers, and affiliates can connect, learn
                    from each other, and grow together.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Quality</h3>
                  <p className="text-muted-foreground">
                    We maintain high standards for all advertising spaces and campaigns on our platform, ensuring
                    quality experiences for both advertisers and audiences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <BarChart2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Data-Driven</h3>
                  <p className="text-muted-foreground">
                    We empower our users with comprehensive analytics and insights, helping them make informed decisions
                    and optimize their advertising strategies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Customer-Centric</h3>
                  <p className="text-muted-foreground">
                    We put our users first, constantly seeking feedback and improving our platform to better serve their
                    needs and help them achieve their goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground">The passionate people behind All Things Ads</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "Founder & CEO",
                  image: "/placeholder.svg?height=300&width=300",
                  bio: "Former digital marketing executive with 15+ years of experience in the advertising industry.",
                },
                {
                  name: "Sarah Chen",
                  role: "Chief Technology Officer",
                  image: "/placeholder.svg?height=300&width=300",
                  bio: "Tech innovator with a background in AI and machine learning, focused on building cutting-edge advertising solutions.",
                },
                {
                  name: "Michael Rodriguez",
                  role: "Head of Partnerships",
                  image: "/placeholder.svg?height=300&width=300",
                  bio: "Relationship builder with extensive experience in business development and strategic partnerships.",
                },
                {
                  name: "Emily Williams",
                  role: "Chief Marketing Officer",
                  image: "/placeholder.svg?height=300&width=300",
                  bio: "Creative marketer with a passion for brand storytelling and growth marketing strategies.",
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <Avatar className="h-40 w-40 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold mb-2">5,000+</p>
                <p className="text-lg text-muted-foreground">Ad Spaces</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">10,000+</p>
                <p className="text-lg text-muted-foreground">Ad Buyers</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">2,500+</p>
                <p className="text-lg text-muted-foreground">Affiliates</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">$10M+</p>
                <p className="text-lg text-muted-foreground">Revenue Generated</p>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Awards & Recognition</h2>
              <p className="text-lg text-muted-foreground">
                We're proud to be recognized for our innovation and impact
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                "Best AdTech Platform 2023",
                "Innovation Award 2022",
                "Top 50 StartUps to Watch",
                "Excellence in User Experience",
              ].map((award, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-medium">{award}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Join Our Community Today</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Whether you're an advertiser, ad buyer, or affiliate, there's a place for you in our ecosystem
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/signup">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

