"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Mail, Smartphone, Instagram, Users, Eye, MousePointerClick, Activity, Clock } from "lucide-react";
import { DisplayCards } from "@/components/ui/display-cards";
import { Meteors } from "@/components/ui/meteors";

export function FeaturedAdSpaces() {
  // Website Cards
  const websiteCards = [
    {
      icon: <Monitor className="size-4 text-[#9575ff]" />,
      title: "Tech Blog Premium Banner",
      description: "500K monthly visitors",
      date: "$1,200 per month",
      iconClassName: "text-[#9575ff]",
      titleClassName: "text-[#9575ff]",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-tr before:from-transparent before:to-[#32147f]/50 before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Users className="size-4 text-[#9575ff]" />,
      title: "Visitors & Impressions",
      description: "500K visitors • 2.5M impressions",
      date: "3.2% CTR",
      iconClassName: "text-[#9575ff]",
      titleClassName: "text-[#9575ff]",
      className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-tr before:from-transparent before:to-[#32147f]/50 before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Eye className="size-4 text-[#9575ff]" />,
      title: "Banner • Tech • Premium",
      description: "Top banner position",
      date: "View Details",
      iconClassName: "text-[#9575ff]",
      titleClassName: "text-[#9575ff]",
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-tr before:from-transparent before:to-[#32147f]/50 before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
  ];

  // Newsletter Cards
  const newsletterCards = [
    {
      icon: <Mail className="size-4 text-[#FA6565]" />,
      title: "Weekly Finance Newsletter",
      description: "50K subscribers",
      date: "$800 per issue",
      iconClassName: "text-[#FA6565]",
      titleClassName: "text-[#FA6565]",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-tr before:from-transparent before:to-[#FA6565]/50 before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Mail className="size-4 text-[#FA6565]" />,
      title: "Readers & Engagement",
      description: "32% open rate",
      date: "8.5% click rate",
      iconClassName: "text-[#FA6565]",
      titleClassName: "text-[#FA6565]",
      className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-tr before:from-transparent before:to-[#FA6565]/50 before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Mail className="size-4 text-[#FA6565]" />,
      title: "Newsletter • Finance • Weekly",
      description: "Sponsored section",
      date: "View Details",
      iconClassName: "text-[#FA6565]",
      titleClassName: "text-[#FA6565]",
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-tr before:from-transparent before:to-[#FA6565]/50 before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
  ];

  // Mobile App Cards
  const mobileAppCards = [
    {
      icon: <Smartphone className="size-4 text-[#F9CA56]" />,
      title: "Fitness App In-App Ads",
      description: "200K active users",
      date: "$1,500 per week",
      iconClassName: "text-[#F9CA56]",
      titleClassName: "text-[#F9CA56]",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-tr before:from-transparent before:to-[#F9CA56]/50 before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Activity className="size-4 text-[#F9CA56]" />,
      title: "Users & Activity",
      description: "1.2M sessions",
      date: "4.5 min engagement",
      iconClassName: "text-[#F9CA56]",
      titleClassName: "text-[#F9CA56]",
      className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-tr before:from-transparent before:to-[#F9CA56]/50 before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Smartphone className="size-4 text-[#F9CA56]" />,
      title: "Mobile • In-App • Fitness",
      description: "Native advertisements",
      date: "View Details",
      iconClassName: "text-[#F9CA56]",
      titleClassName: "text-[#F9CA56]",
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-tr before:from-transparent before:to-[#F9CA56]/50 before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
  ];

  // Social Media Cards
  const socialMediaCards = [
    {
      icon: <Instagram className="size-4 text-[#53E2D2]" />,
      title: "Travel Influencer Promotion",
      description: "350K followers",
      date: "$2,000 per post",
      iconClassName: "text-[#53E2D2]",
      titleClassName: "text-[#53E2D2]",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-tr before:from-transparent before:to-[#53E2D2]/50 before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Users className="size-4 text-[#53E2D2]" />,
      title: "Reach & Engagement",
      description: "4.8% engagement",
      date: "120K reach",
      iconClassName: "text-[#53E2D2]",
      titleClassName: "text-[#53E2D2]",
      className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-tr before:from-transparent before:to-[#53E2D2]/50 before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Instagram className="size-4 text-[#53E2D2]" />,
      title: "Influencer • Social Media • Travel",
      description: "Sponsored content",
      date: "View Details",
      iconClassName: "text-[#53E2D2]",
      titleClassName: "text-[#53E2D2]",
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-gradient-to-tr before:from-transparent before:to-[#53E2D2]/50 before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#32147f]/20 to-transparent" />
      <Meteors number={20} className="absolute inset-0" />
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 bg-gradient-to-br from-[#32147f] via-[#140047] to-[#140047] font-['Calibri',sans-serif] relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-yellow-400 mb-3 font-['Calibri',sans-serif]"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  mass: 1
                }
              }}
              viewport={{ once: true }}
            >
              Featured Ad Spaces
            </motion.h2>
            <motion.p 
              className="text-lg text-white/70 max-w-2xl mx-auto font-['Calibri',sans-serif]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Discover premium advertising opportunities across various platforms
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-12">
            {/* Website */}
            <motion.div 
              className="relative min-h-[360px] flex justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <DisplayCards cards={websiteCards} />
              <div className="absolute -bottom-6 left-0 right-0 text-center">
                <motion.span 
                  className="bg-[#0c0025]/80 px-4 py-1 rounded-full text-[#9575ff] font-semibold border border-[#4f2da3]/40"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 8px rgba(149, 117, 255, 0.5)",
                    borderColor: "rgba(149, 117, 255, 0.5)"
                  }}
                >
                  Website
                </motion.span>
              </div>
              <button className="mt-4 bg-[#9575ff]/80 text-white py-2 px-4 rounded-full hover:bg-[#9575ff] transition-all duration-300">
                Browse
              </button>
            </motion.div>

            {/* Newsletter */}
            <motion.div 
              className="relative min-h-[360px] flex justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <DisplayCards cards={newsletterCards} />
              <div className="absolute -bottom-6 left-0 right-0 text-center">
                <motion.span 
                  className="bg-[#0c0025]/80 px-4 py-1 rounded-full text-[#FA6565] font-semibold border border-[#4f2da3]/40"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 8px rgba(250, 101, 101, 0.5)",
                    borderColor: "rgba(250, 101, 101, 0.5)"
                  }}
                >
                  Newsletter
                </motion.span>
              </div>
              <button className="mt-4 bg-[#FA6565]/80 text-white py-2 px-4 rounded-full hover:bg-[#FA6565] transition-all duration-300">
                Browse
              </button>
            </motion.div>

            {/* Mobile App */}
            <motion.div 
              className="relative min-h-[360px] flex justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <DisplayCards cards={mobileAppCards} />
              <div className="absolute -bottom-6 left-0 right-0 text-center">
                <motion.span 
                  className="bg-[#0c0025]/80 px-4 py-1 rounded-full text-[#F9CA56] font-semibold border border-[#4f2da3]/40"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 8px rgba(249, 202, 86, 0.5)",
                    borderColor: "rgba(249, 202, 86, 0.5)"
                  }}
                >
                  Mobile App
                </motion.span>
              </div>
              <button className="mt-4 bg-[#F9CA56]/80 text-white py-2 px-4 rounded-full hover:bg-[#F9CA56] transition-all duration-300">
                Browse
              </button>
            </motion.div>

            {/* Social Media */}
            <motion.div 
              className="relative min-h-[360px] flex justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <DisplayCards cards={socialMediaCards} />
              <div className="absolute -bottom-6 left-0 right-0 text-center">
                <motion.span 
                  className="bg-[#0c0025]/80 px-4 py-1 rounded-full text-[#53E2D2] font-semibold border border-[#4f2da3]/40"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 8px rgba(83, 226, 210, 0.5)",
                    borderColor: "rgba(83, 226, 210, 0.5)"
                  }}
                >
                  Social Media
                </motion.span>
              </div>
              <button className="mt-4 bg-[#53E2D2]/80 text-white py-2 px-4 rounded-full hover:bg-[#53E2D2] transition-all duration-300">
                Browse
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 