import type React from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex mt-16">
        {" "}
        {/* Added mt-16 to account for fixed navbar */}
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

