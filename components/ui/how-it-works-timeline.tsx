"use client";

import { Upload, Settings, BarChart3, Wallet, Search, Lightbulb, Rocket, LineChart } from "lucide-react";
import RadialOrbitalTimeline from "./radial-orbital-timeline";

const timelineData = [
  // For Advertisers
  {
    id: 1,
    title: "List Your Space",
    date: "Step 1",
    content: "Create a listing for your ad space with details about your audience, reach, and pricing.",
    category: "For Advertisers",
    icon: Upload,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Set Your Terms",
    date: "Step 2",
    content: "Define your advertising guidelines, content restrictions, and preferred payment methods.",
    category: "For Advertisers",
    icon: Settings,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Review Offers",
    date: "Step 3",
    content: "Receive and review offers from potential advertisers, negotiate terms, and accept the best fit.",
    category: "For Advertisers",
    icon: BarChart3,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Get Paid",
    date: "Step 4",
    content: "Once the campaign is complete, receive payment directly to your preferred method.",
    category: "For Advertisers",
    icon: Wallet,
    relatedIds: [3],
    status: "pending" as const,
    energy: 30,
  },
  // For Ad Buyers
  {
    id: 5,
    title: "Browse Spaces",
    date: "Step 1",
    content: "Explore a wide range of ad spaces across different platforms and audience demographics.",
    category: "For Ad Buyers",
    icon: Search,
    relatedIds: [6],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 6,
    title: "Make Offers",
    date: "Step 2",
    content: "Submit offers for ad spaces that match your target audience and campaign goals.",
    category: "For Ad Buyers",
    icon: Lightbulb,
    relatedIds: [5, 7],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 7,
    title: "Launch Campaign",
    date: "Step 3",
    content: "Once your offer is accepted, upload your ad content and launch your campaign.",
    category: "For Ad Buyers",
    icon: Rocket,
    relatedIds: [6, 8],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 8,
    title: "Track Performance",
    date: "Step 4",
    content: "Monitor your campaign's performance with detailed analytics and insights.",
    category: "For Ad Buyers",
    icon: LineChart,
    relatedIds: [7],
    status: "pending" as const,
    energy: 30,
  },
];

export function HowItWorksTimeline() {
  return (
    <div className="w-full h-[800px] flex flex-col items-center justify-center bg-transparent overflow-hidden">
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </div>
  );
} 