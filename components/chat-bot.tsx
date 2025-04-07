"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Mic, Bot, ShoppingCart, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

type Message = {
  sender: "user" | "bot"
  content: string
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [colorIndex, setColorIndex] = useState(0)
  const [pulseIntensity, setPulseIntensity] = useState(0.5)
  
  // Logo colors for animated circle
  const logoColors = [
    "#6B54FA", // Purple
    "#FA6565", // Pink/Red
    "#F9CA56", // Yellow/Gold
    "#53E2D2"  // Teal
  ]
  
  // Color rotation effect for the pulsing circle
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % logoColors.length)
    }, 2000)
    
    // Pulsing effect
    const pulseInterval = setInterval(() => {
      setPulseIntensity(prev => prev === 0.5 ? 1 : 0.5)
    }, 1000)
    
    return () => {
      clearInterval(colorInterval)
      clearInterval(pulseInterval)
    }
  }, [])
  
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      content: "Hi! I'm Adsy, your AI shopping assistant. I can help you with:",
      timestamp: new Date()
    },
    {
      sender: "bot",
      content: "• Finding ad spaces and platforms\n• Managing digital purchases\n• Providing market insights\n• Generating performance reports",
      timestamp: new Date()
    }
  ])

  const suggestions = [
    "Find ad spaces for my business",
    "Help me with digital advertising",
    "Show me trending platforms",
    "Generate a performance report"
  ]

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      sender: "user",
      content,
      timestamp: new Date()
    }
    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        sender: "bot",
        content: "I'll help you with that! Let me analyze your request...",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const toggleVoice = () => {
    setIsListening(!isListening)
    // Add voice recognition logic here
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 mb-2"
          >
            <Card className="w-[380px] shadow-xl border-[#2a2e45] bg-[#0f1424]">
              <CardHeader className="border-b border-[#2a2e45] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image 
                        src="/images/Adsy.png" 
                        alt="Adsy AI Assistant" 
                        width={40} 
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link href="/meet-adsy" className="text-lg font-semibold text-white hover:text-[#9575ff] transition-colors font-['Verdana',sans-serif]">
                        Adsy
                      </Link>
                      <p className="text-xs text-gray-400 font-['Verdana',sans-serif]">AI Shopping Assistant</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 h-[400px] overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                      <div className={`flex flex-col gap-1 max-w-[280px] ${msg.sender === 'user' ? 'items-end' : ''}`}>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="font-medium">{msg.sender === 'user' ? 'You' : 'Adsy'}</span>
                        </div>
                        <div className={`rounded-lg p-3 text-sm text-white ${
                          msg.sender === 'user' ? 'bg-[#9575ff]' : 'bg-[#1a1e32]'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-400 mb-2">Suggested actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs bg-[#1a1e32] text-gray-300 px-3 py-1.5 rounded-full hover:bg-[#2a2e45] transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#2a2e45] p-4">
                <form 
                  className="flex w-full gap-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (message.trim()) {
                      handleSendMessage(message)
                    }
                  }}
                >
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-[#1a1e32] border-[#2a2e45] text-white"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className={`text-gray-400 hover:text-white ${isListening ? 'text-red-500 hover:text-red-600' : ''}`}
                    onClick={toggleVoice}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button type="submit" size="icon" className="bg-[#9575ff] hover:bg-[#8a63ff] text-white">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="relative"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Pulsing outer ring with animated color */}
        <motion.div 
          className="absolute -inset-3 rounded-full z-0"
          style={{ 
            background: `radial-gradient(circle, ${logoColors[colorIndex]} 0%, rgba(0,0,0,0) 70%)`,
            opacity: pulseIntensity
          }}
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
          className="relative rounded-full w-14 h-14 bg-[#0f1424] border-2 hover:bg-[#1a1e32] shadow-lg z-10 overflow-hidden p-0"
          style={{ 
            borderColor: logoColors[colorIndex],
            transition: "border-color 0.5s ease-in-out"
          }}
      >
        {isOpen ? (
            <X className="h-6 w-6 text-white absolute z-20" />
          ) : (
            <>
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Image 
                  src="/images/Adsy.png" 
                  alt="Adsy AI Assistant" 
                  width={56} 
                  height={56}
                  className="object-cover"
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
                animate={{ 
                  x: ["-100%", "100%"],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear"
                }}
              />
            </>
        )}
      </Button>
      </motion.div>
    </div>
  )
} 