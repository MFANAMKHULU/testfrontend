import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { FeaturedSpaces } from "@/components/featured-spaces"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { InteractiveBackground } from "@/components/interactive-background"
import { AnimatedContent } from "@/components/animated-content"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="max-w-[1920px] mx-auto overflow-hidden relative">
        <InteractiveBackground />
        <HeroSection />

        <AnimatedContent>
          <HowItWorks />
        </AnimatedContent>

        <AnimatedContent>
          <FeaturedSpaces />
        </AnimatedContent>

        <AnimatedContent>
          <Testimonials />
        </AnimatedContent>
      </div>
      <Footer />
    </main>
  )
}

