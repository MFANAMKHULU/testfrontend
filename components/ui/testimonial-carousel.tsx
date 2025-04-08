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
  content: string | { id: string; author: string; company: string; rating: number; date: string; content: string }
  avatar: string
  category: "Advertiser" | "Ad Buyer" | "Affiliate"
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    content: "This platform has transformed how we manage our ad campaigns. The ROI has been incredible!",
    avatar: "https://source.unsplash.com/featured/150x150?woman-portrait-1",
    category: "Advertiser"
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CEO",
    company: "StartupX",
    content: "The targeting capabilities are unmatched. We've seen a 300% increase in conversion rates.",
    avatar: "https://source.unsplash.com/featured/150x150?man-portrait-1",
    category: "Ad Buyer"
  },
  {
    id: "3",
    name: "Emma Davis",
    role: "Digital Strategist",
    company: "AdVentures",
    content: "Finally, a platform that understands both advertisers and content creators. Brilliant!",
    avatar: "https://source.unsplash.com/featured/150x150?woman-portrait-2",
    category: "Affiliate"
  },
  {
    id: "4",
    name: "David Wilson",
    role: "Growth Manager",
    company: "GrowthLabs",
    content: "The analytics and insights have helped us optimize our campaigns like never before.",
    avatar: "https://source.unsplash.com/featured/150x150?man-portrait-2",
    category: "Advertiser"
  },
  {
    id: "5",
    name: "Lisa Chen",
    role: "Content Creator",
    company: "Digital Creators Co",
    content: "As a content creator, this platform has opened up amazing opportunities for monetization.",
    avatar: "https://source.unsplash.com/featured/150x150?woman-portrait-3",
    category: "Affiliate"
  },
  {
    id: "6",
    name: "James Thompson",
    role: "Media Buyer",
    company: "MediaPro",
    content: "The automation features have saved us countless hours. Highly recommended!",
    avatar: "https://source.unsplash.com/featured/150x150?man-portrait-3",
    category: "Ad Buyer"
  },
  {
    id: "7",
    name: "Sophie Anderson",
    role: "Marketing Manager",
    company: "BrandBoost",
    content: "The customer support is exceptional. They're always there to help optimize our campaigns.",
    avatar: "https://source.unsplash.com/featured/150x150?woman-portrait-4",
    category: "Advertiser"
  },
  {
    id: "8",
    name: "Alex Rodriguez",
    role: "Digital Marketing Lead",
    company: "TechGrowth",
    content: "The platform's AI-powered targeting has revolutionized our ad performance. Game-changing!",
    avatar: "https://source.unsplash.com/featured/150x150?man-portrait-4",
    category: "Ad Buyer"
  },
  {
    id: "9",
    name: "Maya Patel",
    role: "Social Media Manager",
    company: "InfluenceHub",
    content: "The integration with social platforms is seamless. Our engagement rates have skyrocketed.",
    avatar: "https://source.unsplash.com/featured/150x150?woman-portrait-5",
    category: "Affiliate"
  }
]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

// Helper function to safely extract content string
const getContentString = (content: string | any): string => {
  if (typeof content === 'string') {
    return content;
  }
  
  if (content && typeof content === 'object') {
    // If it's an object with a content property, use that
    if ('content' in content && typeof content.content === 'string') {
      return content.content;
    }
    
    // Otherwise stringify the object
    return JSON.stringify(content);
  }
  
  // Fallback for any other type
  return String(content);
}

const TestimonialCard = memo(
  ({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) => {
    // Safely extract content string
    const contentString = getContentString(testimonial.content);
    
    return (
      <Card className="bg-[#1a0a3d]/80 backdrop-blur-sm border-[#4f2da3]/30 p-4">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10 border-2 border-[#4f2da3]/30">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback className="bg-[#4f2da3]/20">{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
              <p className="text-xs text-gray-300">{testimonial.role} at {testimonial.company}</p>
            </div>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed mb-3">
            {contentString}
          </p>
          <div className="pt-3 border-t border-[#4f2da3]/50">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-[#4f2da3]/20 flex items-center justify-center">
                <svg
                  className="h-3 w-3 text-[#9575ff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
          >
            <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
              </div>
              <span className="text-xs text-gray-300">{testimonial.category}</span>
      </div>
      </div>
    </CardContent>
  </Card>
    )
  }
)

const AnimatedLogo = () => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 z-10"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1
      }}
      transition={{
        duration: 1,
        ease: "easeOut"
      }}
    >
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0"
        style={{
          border: '2px solid rgba(79, 45, 163, 0.3)',
          borderRadius: '50%',
        }}
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      
      {/* Middle rotating ring */}
      <motion.div
        className="absolute inset-2"
        style={{
          border: '2px solid rgba(78, 234, 255, 0.3)',
          borderRadius: '50%',
        }}
        animate={{ 
          rotate: -360,
          scale: [1.1, 1, 1.1]
        }}
        transition={{
          rotate: {
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }
        }}
      />

      {/* Logo container */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden"
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Logo image with gradient overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <img 
            src="/images/Picture1.png" 
            alt="Logo"
            className="w-32 h-32 object-contain"
          />
        </motion.div>

        {/* Glowing dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#4EEAFF]"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 45}deg) translateX(${70}px) translateY(-50%)`,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

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
    const faceWidth = 200
    const faceCount = testimonials.length
    const radius = 400
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
        <AnimatedLogo />
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
                className="w-[200px]"
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