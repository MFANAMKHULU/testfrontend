"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge, BadgeCheck } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, MessageSquare, ShoppingCart } from "lucide-react"

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

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string, index: number) => void
    controls: any
    cards: any[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 2200 : 3600
    const faceCount = cards.length
    const faceWidth = (cylinderWidth / faceCount) * 0.4
    const radius = cylinderWidth / (2 * Math.PI)
    const [rotation, setRotation] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {
        setRotation(prev => prev + 0.1)
      }, 16)
      return () => clearInterval(interval)
    }, [])

    return (
      <div
        className="flex h-full items-center justify-center bg-mauve-dark-2"
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <div
          className="relative flex h-full origin-center justify-center"
          style={{
            transform: `rotate3d(0, 1, 0, ${rotation}deg)`,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={`key-${card.id}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-mauve-dark-2 p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
            >
              <div
                className="pointer-events-none w-full rounded-xl bg-background/80 backdrop-blur-sm p-6"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {card.avatar && (
                        <Avatar>
                          <AvatarImage src={card.avatar} alt={card.name} />
                          <AvatarFallback>{card.name?.[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{card.title}</h3>
                        {card.name && (
                          <p className="text-sm text-muted-foreground">
                            {card.name}
                            {card.verified && (
                              <BadgeCheck className="w-4 h-4 ml-1 inline-block text-blue-500" />
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">
                        {card.platform && (
                          <span className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            {card.platform}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(card.metrics).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold">${card.price}</span>
                        <span className="text-sm text-muted-foreground ml-1">
                          /{card.priceModel}
                        </span>
                      </div>
                      <Badge variant="secondary">{card.category}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      <Button className="flex-1">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Purchase
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

export function ThreeDPhotoCarousel({ cards }: { cards: any[] }) {
  return (
    <div className="relative">
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={() => {}}
          controls={{}}
          cards={cards}
          isCarouselActive={true}
        />
      </div>
    </div>
  )
} 