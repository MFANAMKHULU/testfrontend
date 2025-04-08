"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Mail, MessageSquare, Users, Eye, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

interface CategoryCarouselProps {
  adSpaces: Array<{
    id: number
    title: string
    description: string
    type: string
    icon: any
    metrics: Record<string, string>
    price: number
    priceModel: string
    category: string
    tags: string[]
  }>
}

export function CategoryCarousel({ adSpaces }: CategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [flashStates, setFlashStates] = useState<boolean[]>(Array(3).fill(false))
  const cardsToShow = 3

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  // Enhanced random highlight effect for visible cards
  useEffect(() => {
    const highlightRandomCard = () => {
      const randomIdx = Math.floor(Math.random() * cardsToShow)
        setFlashStates(prev => {
        const newState = Array(3).fill(false)
        newState[randomIdx] = true
              return newState
            })

      // Turn off highlight after 2 seconds
      setTimeout(() => {
        setFlashStates(Array(3).fill(false))
      }, 2000)
    }

    const interval = setInterval(highlightRandomCard, Math.random() * 5000 + 3000)
    return () => clearInterval(interval)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + adSpaces.length) % adSpaces.length)
  }

  const getVisibleCards = useCallback(() => {
    const cards = []
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentIndex + i) % adSpaces.length
      cards.push(adSpaces[index])
    }
    return cards
  }, [currentIndex, adSpaces, cardsToShow])

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Featured Ad Spaces</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(-1)}
              className="rounded-full hover:bg-white/10 border-white/20 text-white backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(1)}
              className="rounded-full hover:bg-white/10 border-white/20 text-white backdrop-blur-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative h-[300px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="absolute w-full h-full grid grid-cols-3 gap-6"
            >
              {getVisibleCards().map((space, idx) => (
                <motion.div
                  key={`${space.id}-${idx}`} 
                  className="w-full h-full"
                  animate={flashStates[idx] ? {
                    scale: 1.15,
                    zIndex: 10,
                    transition: { duration: 0.3, ease: "easeOut" }
                  } : {
                    scale: 1,
                    zIndex: 0,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <Card 
                    className={`h-full overflow-hidden shadow-xl transition-all duration-300 relative group
                      ${flashStates[idx] 
                        ? 'bg-gradient-to-br from-orange-900 via-amber-800 to-orange-900 border-2 border-orange-400 shadow-[0_0_30px_rgba(251,146,60,0.3)] z-10' 
                        : 'bg-gradient-to-br from-orange-900/20 to-amber-900/20 backdrop-blur-xl border-orange-500/20 hover:border-orange-500/50'
                      }`}
                  >
                    {flashStates[idx] && (
                  <motion.div
                        className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 animate-gradient" />
                        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-orange-500 via-amber-500 to-orange-500 animate-gradient" />
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 animate-gradient" />
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 via-amber-500 to-orange-500 animate-gradient" />
                      </motion.div>
                    )}
                    
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className={`text-base font-semibold transition-colors flex items-center gap-2
                            ${flashStates[idx] ? 'text-orange-300' : 'text-white group-hover:text-orange-400'}`}
                          >
                            {space.title}
                            {flashStates[idx] && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <Sparkles className="w-4 h-4 text-amber-300" />
                              </motion.div>
                            )}
                          </h3>
                          <p className={`text-xs mt-0.5 ${flashStates[idx] ? 'text-orange-200/90' : 'text-white/70'}`}>
                            {space.description}
                          </p>
                        </div>
                        <space.icon className={`w-5 h-5 ${flashStates[idx] ? 'text-orange-400' : 'text-orange-400/70'}`} />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(space.metrics).map(([key, value]) => (
                          <div 
                            key={key} 
                            className={`p-1.5 rounded-lg transition-all duration-300
                              ${flashStates[idx] 
                                ? 'bg-gradient-to-br from-orange-800/50 to-amber-800/50 border border-orange-500/30' 
                                : 'bg-white/5 backdrop-blur-sm'
                              }`}
                          >
                            <p className={`text-xs capitalize ${flashStates[idx] ? 'text-orange-300' : 'text-white/50'}`}>
                              {key}
                            </p>
                            <p className={`text-sm font-medium ${flashStates[idx] ? 'text-orange-200' : 'text-white'}`}>
                              {value}
                            </p>
                        </div>
                      ))}
                    </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className={flashStates[idx] ? 'text-orange-300' : 'text-white'}>
                          <span className="text-xl font-bold">R{space.price}</span>
                          <span className={`text-xs ml-1 ${flashStates[idx] ? 'text-orange-300/80' : 'text-white/70'}`}>
                            {space.priceModel}
                          </span>
                        </div>
                    <Button 
                      variant="outline" 
                          size="sm"
                          className={`h-8 px-3 text-xs transition-all duration-300 ${
                            flashStates[idx]
                              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 border-orange-400'
                              : 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10'
                          }`}
                        >
                          <Eye className="w-3 h-3 mr-1.5" />
                          View
                    </Button>
                      </div>
                  </CardContent>
                </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
} 