import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Award, BarChart2, CheckCircle, Globe, Heart, Lightbulb, Shield, Users } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageContainer } from "@/components/page-container"
import { AnimatedContent } from "@/components/animated-content"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageContainer>
        <AnimatedContent>
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About All Things Ads</h1>
              <p className="text-xl text-gray-300 mb-8">
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
        </AnimatedContent>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
                <p className="text-lg text-gray-300 mb-6">
                  All Things Ads was founded in 2020 with a simple mission: to revolutionize the advertising industry by
                  creating a transparent, efficient marketplace that connects advertisers who own marketing spaces with
                  businesses looking to advertise.
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  We noticed a gap in the market where finding quality advertising spaces was difficult and
                  time-consuming, while many platform owners struggled to monetize their audiences effectively. Our
                  platform bridges this gap, making it easy for both sides to connect and create mutually beneficial
                  partnerships.
                </p>
                <p className="text-lg text-gray-300">
                  Today, we're proud to have facilitated thousands of successful advertising campaigns and helped
                  businesses of all sizes grow their reach and revenue.
                </p>
              </div>
              <div className="bg-[#1a1f2e] rounded-xl p-8">
                <div className="aspect-square bg-[#2a2e45] rounded-lg flex items-center justify-center">
                  <Globe className="h-24 w-24 text-[#9575ff]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">Our Mission & Values</h2>
              <p className="text-lg text-gray-300">
                We're driven by a set of core values that guide everything we do
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-[#1a1f2e] border-[#2a2e45]">
                <CardContent className="pt-6">
                  <div className="bg-[#9575ff]/10 p-3 rounded-lg w-fit mb-4">
                    <Lightbulb className="h-6 w-6 text-[#9575ff]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Innovation</h3>
                  <p className="text-gray-300">
                    We constantly push the boundaries of what's possible in advertising technology, creating new
                    solutions that make advertising more effective and accessible.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1f2e] border-[#2a2e45]">
                <CardContent className="pt-6">
                  <div className="bg-[#9575ff]/10 p-3 rounded-lg w-fit mb-4">
                    <Shield className="h-6 w-6 text-[#9575ff]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Transparency</h3>
                  <p className="text-gray-300">
                    We believe in complete transparency in all our operations, from pricing to performance metrics,
                    ensuring all parties have the information they need to succeed.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1f2e] border-[#2a2e45]">
                <CardContent className="pt-6">
                  <div className="bg-[#9575ff]/10 p-3 rounded-lg w-fit mb-4">
                    <Users className="h-6 w-6 text-[#9575ff]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Community</h3>
                  <p className="text-gray-300">
                    We foster a supportive community where advertisers, ad buyers, and affiliates can connect, learn
                    from each other, and grow together.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1f2e] border-[#2a2e45]">
                <CardContent className="pt-6">
                  <div className="bg-[#9575ff]/10 p-3 rounded-lg w-fit mb-4">
                    <CheckCircle className="h-6 w-6 text-[#9575ff]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Quality</h3>
                  <p className="text-gray-300">
                    We maintain high standards for all advertising spaces and campaigns on our platform, ensuring
                    quality experiences for both advertisers and audiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1f2e] border-[#2a2e45]">
                <CardContent className="pt-6">
                  <div className="bg-[#9575ff]/10 p-3 rounded-lg w-fit mb-4">
                    <BarChart2 className="h-6 w-6 text-[#9575ff]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Data-Driven</h3>
                  <p className="text-gray-300">
                    We empower our users with comprehensive analytics and insights, helping them make informed decisions
                    and optimize their advertising strategies.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#1a1f2e] border-[#2a2e45]">
                <CardContent className="pt-6">
                  <div className="bg-[#9575ff]/10 p-3 rounded-lg w-fit mb-4">
                    <Heart className="h-6 w-6 text-[#9575ff]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">Customer-Centric</h3>
                  <p className="text-gray-300">
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
              <h2 className="text-3xl font-bold mb-4 text-white">Meet Our Team</h2>
              <p className="text-lg text-gray-300">The passionate people behind All Things Ads</p>
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
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-[#9575ff] mb-2">{member.role}</p>
                  <p className="text-sm text-gray-300">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-[#1a1f2e]">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold mb-2 text-white">5,000+</p>
                <p className="text-lg text-gray-300">Ad Spaces</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2 text-white">10,000+</p>
                <p className="text-lg text-gray-300">Ad Buyers</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2 text-white">2,500+</p>
                <p className="text-lg text-gray-300">Affiliates</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2 text-white">$10M+</p>
                <p className="text-lg text-gray-300">Revenue Generated</p>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Awards & Recognition</h2>
              <p className="text-lg text-gray-300">
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
                  <div className="bg-[#9575ff]/10 p-4 rounded-full mb-4">
                    <Award className="h-8 w-8 text-[#9575ff]" />
                  </div>
                  <p className="font-medium text-white">{award}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Join Our Community Today</h2>
              <p className="text-xl text-gray-300 mb-8">
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
      </PageContainer>
      <Footer />
    </div>
  )
}

