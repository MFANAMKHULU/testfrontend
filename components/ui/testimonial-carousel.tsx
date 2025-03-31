"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState, useCallback } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  category: "Advertiser" | "Ad Buyer" | "Affiliate"
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    content: "This platform has transformed how we manage our ad campaigns. The ROI has been incredible!",
    avatar: "https://source.unsplash.com/featured/150x150?woman-portrait-1",
    category: "Advertiser",
    rating: 5
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CEO",
    company: "StartupX",
    content: "The targeting capabilities are unmatched. We've seen a 300% increase in conversion rates.",
    avatar: "https://source.unsplash.com/featured/150x150?man-portrait-1",
    category: "Ad Buyer",
    rating: 4
  },
  {
    id: "3",
    name: "Emma Davis",
    role: "Digital Strategist",
    company: "AdVentures",
    content: "Finally, a platform that understands both advertisers and content creators. Brilliant!",
    avatar: "https://source.unsplash.com/featured/150x150?woman-portrait-2",
    category: "Affiliate",
    rating: 5
  },
  {
    id: "4",
    name: "James Wilson",
    role: "Growth Manager",
    company: "ScaleUp Inc",
    content: "The analytics and insights have helped us optimize our campaigns like never before.",
    avatar: "https://source.unsplash.com/featured/150x150?man-portrait-2",
    category: "Ad Buyer",
    rating: 5
  },
  {
    id: "5",
    name: "Lisa Zhang",
    role: "Content Creator",
    company: "Creative Studios",
    content: "As a content creator, this platform has made monetization seamless and profitable.",
    avatar: "https://source.unsplash.com/featured/150x150?woman-portrait-3",
    category: "Affiliate",
    rating: 4
  }
]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const TestimonialCard = memo(({ testimonial, isActive = false }: { testimonial: Testimonial, isActive?: boolean }) => (
  <Card 
    className={`
      ${isActive ? 'w-[400px] scale-110 shadow-lg z-10' : 'w-[300px]'} 
      bg-gradient-to-br from-[#140047]/80 via-[#1a0066]/80 to-[#200080]/80 
      border-[#4f2da3]/50 hover:border-[#6b3dcc]/50 
      shadow-xl shadow-black/10
      transition-all duration-300
      backdrop-blur-sm
      hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
    `}
  >
    <CardContent className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-12 w-12 border-2 border-[#4f2da3]/30">
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback className="bg-[#4f2da3]/20">{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-300">{testimonial.role} at {testimonial.company}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500" : "text-gray-600"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 15.585l-7.07 3.707 1.35-7.87-5.72-5.573 7.91-1.149L10 0l3.53 7.7 7.91 1.149-5.72 5.573 1.35 7.87L10 15.585z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
      <p className="text-sm text-gray-300 leading-relaxed mb-4">{testimonial.content}</p>
      <div className="pt-4 border-t border-[#4f2da3]/50">
        <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
          testimonial.category === "Advertiser" 
            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
            : testimonial.category === "Ad Buyer"
            ? "bg-[#4f2da3]/10 text-[#a98eff] border border-[#4f2da3]/20"
            : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
        }`}>
          {testimonial.category}
        </span>
      </div>
    </CardContent>
  </Card>
))

const Carousel = memo(
  ({
    handleClick,
    controls,
    isCarouselActive,
    activeTestimonial
  }: {
    handleClick: (testimonial: Testimonial) => void
    controls: any
    isCarouselActive: boolean
    activeTestimonial: Testimonial | null
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800
    const faceCount = testimonials.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    // Auto-rotation effect
    useEffect(() => {
      let animationFrameId: number
      let lastTime = performance.now()
      const rotationSpeed = 0.02 // Adjust speed as needed

      const animate = (currentTime: number) => {
        if (!isCarouselActive) return

        const deltaTime = currentTime - lastTime
        const newRotation = rotation.get() + rotationSpeed * deltaTime
        rotation.set(newRotation)
        lastTime = currentTime

        animationFrameId = requestAnimationFrame(animate)
      }

      if (isCarouselActive) {
        animationFrameId = requestAnimationFrame(animate)
      }

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
      }
    }, [isCarouselActive, rotation])

    // Center the selected card
    useEffect(() => {
      if (activeTestimonial) {
        const selectedIndex = testimonials.findIndex(t => t.id === activeTestimonial.id)
        const targetRotation = -(selectedIndex * (360 / faceCount))
        rotation.set(targetRotation)
      }
    }, [activeTestimonial, faceCount, rotation])

    // Handle mouse enter/leave for pausing rotation
    const handleMouseEnter = useCallback(() => {
      controls.stop()
    }, [controls])

    const handleMouseLeave = useCallback(() => {
      if (isCarouselActive) {
        controls.start({
          rotateY: rotation.get(),
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 30,
            mass: 0.1,
          },
        })
      }
    }, [controls, isCarouselActive, rotation])

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              className="absolute flex h-full origin-center items-center justify-center"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
                opacity: activeTestimonial 
                  ? testimonial.id === activeTestimonial.id 
                    ? 1 
                    : 0.3
                  : 1
              }}
              onClick={() => handleClick(testimonial)}
            >
              <motion.div
                layoutId={`testimonial-${testimonial.id}`}
                className="w-[300px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={transition}
              >
                <TestimonialCard 
                  testimonial={testimonial} 
                  isActive={activeTestimonial?.id === testimonial.id}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

export function TestimonialCarousel() {
  const [activeTestimonial, setActiveTestimonial] = useState<Testimonial | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  const handleClick = (testimonial: Testimonial) => {
    if (activeTestimonial?.id === testimonial.id) {
      setActiveTestimonial(null)
      setIsCarouselActive(true)
    } else {
      setActiveTestimonial(testimonial)
      setIsCarouselActive(false)
      controls.stop()
    }
  }

  return (
    <motion.div layout className="relative">
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          isCarouselActive={isCarouselActive}
          activeTestimonial={activeTestimonial}
        />
      </div>
    </motion.div>
  )
} 