"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { AnimatedButton } from "@/components/animated-button"
import { AnimatedInput } from "@/components/animated-input"

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [accountType, setAccountType] = React.useState<"individual" | "company">("individual")
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    // Company fields
    companyName: "",
    registrationNumber: "",
    vatNumber: "",
    industry: "",
    website: "",
    contactPerson: "",
    phoneNumber: "",
    // Individual fields
    fullName: "",
    role: "" as string,
  })
  const [colorIndex, setColorIndex] = React.useState(0)

  // Logo colors for the border
  const logoColors = [
    "#6B54FA", // Purple
    "#FA6565", // Pink/Red
    "#F9CA56", // Yellow/Gold
    "#53E2D2"  // Teal
  ]

  // Color rotation effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % logoColors.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign up logic here
    console.log("Sign up with:", { accountType, formData })
  }

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Retail",
    "Manufacturing",
    "Media",
    "Other"
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-[#1a1e32] border border-[#2a2e45] rounded-xl shadow-lg p-6">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div 
                  className="relative flex items-center justify-center"
                  style={{ 
                    border: `2px solid ${logoColors[colorIndex]}`,
                    transition: "border-color 0.5s ease-in-out",
                    borderRadius: "50%",
                    width: "52px",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Image 
                    src="/images/Picture1.png" 
                    alt="Logo" 
                    width={44} 
                    height={44}
                    className="overflow-hidden" 
                    priority
                    style={{ 
                      borderRadius: "50%",
                      objectFit: "contain"
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Create Account</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setAccountType("individual")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    accountType === "individual"
                      ? "bg-[#9575ff] text-white"
                      : "bg-[#2a2e45] text-gray-300 hover:bg-[#2a2e45]/80"
                  }`}
                >
                  Individual
                </button>
                <button
                  onClick={() => setAccountType("company")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    accountType === "company"
                      ? "bg-[#9575ff] text-white"
                      : "bg-[#2a2e45] text-gray-300 hover:bg-[#2a2e45]/80"
                  }`}
                >
                  Company
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {accountType === "individual" ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-[#1a1f2e] border border-[#2a2e45] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#9575ff] focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4">I am joining as</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div
                          className={`relative flex items-center p-2 rounded-lg border-2 cursor-pointer transition-all h-10 ${
                            formData.role === 'advertiser'
                              ? 'border-primary bg-primary/10'
                              : 'border-[#2a2e45] bg-[#0f1424] hover:border-primary/50'
                          }`}
                          onClick={() => setFormData({ ...formData, role: 'advertiser' })}
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                formData.role === 'advertiser' ? 'border-primary' : 'border-[#2a2e45]'
                              }`}
                            >
                              {formData.role === 'advertiser' && (
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <span className={`font-medium text-sm ${formData.role === 'advertiser' ? 'text-primary' : 'text-white'}`}>
                              Advertiser
                            </span>
                          </div>
                        </div>

                        <div
                          className={`relative flex items-center p-2 rounded-lg border-2 cursor-pointer transition-all h-10 ${
                            formData.role === 'influencer'
                              ? 'border-primary bg-primary/10'
                              : 'border-[#2a2e45] bg-[#0f1424] hover:border-primary/50'
                          }`}
                          onClick={() => setFormData({ ...formData, role: 'influencer' })}
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                formData.role === 'influencer' ? 'border-primary' : 'border-[#2a2e45]'
                              }`}
                            >
                              {formData.role === 'influencer' && (
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <span className={`font-medium text-sm ${formData.role === 'influencer' ? 'text-primary' : 'text-white'}`}>
                              Influencer
                            </span>
                          </div>
                        </div>

                        <div
                          className={`relative flex items-center p-2 rounded-lg border-2 cursor-pointer transition-all h-10 ${
                            formData.role === 'affiliate'
                              ? 'border-primary bg-primary/10'
                              : 'border-[#2a2e45] bg-[#0f1424] hover:border-primary/50'
                          }`}
                          onClick={() => setFormData({ ...formData, role: 'affiliate' })}
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                formData.role === 'affiliate' ? 'border-primary' : 'border-[#2a2e45]'
                              }`}
                            >
                              {formData.role === 'affiliate' && (
                                <div className="w-2 h-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <span className={`font-medium text-sm ${formData.role === 'affiliate' ? 'text-primary' : 'text-white'}`}>
                              Affiliate
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="text-sm font-medium text-gray-300">
                        Company Name
                      </label>
                      <AnimatedInput
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Enter company name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="registrationNumber" className="text-sm font-medium text-gray-300">
                          Registration Number
                        </label>
                        <AnimatedInput
                          id="registrationNumber"
                          name="registrationNumber"
                          value={formData.registrationNumber}
                          onChange={handleInputChange}
                          placeholder="Company registration no."
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="vatNumber" className="text-sm font-medium text-gray-300">
                          VAT Number
                        </label>
                        <AnimatedInput
                          id="vatNumber"
                          name="vatNumber"
                          value={formData.vatNumber}
                          onChange={handleInputChange}
                          placeholder="VAT number (optional)"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="industry" className="text-sm font-medium text-gray-300">
                          Industry
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-[#2a2e45] bg-[#1a1e32] px-3 py-2 text-sm text-white transition-colors focus:border-[#9575ff] focus:outline-none focus:ring-0"
                          required
                        >
                          <option value="">Select industry</option>
                          {industries.map((industry) => (
                            <option key={industry} value={industry}>
                              {industry}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="website" className="text-sm font-medium text-gray-300">
                          Website
                        </label>
                        <AnimatedInput
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="Company website"
                          type="url"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="contactPerson" className="text-sm font-medium text-gray-300">
                          Contact Person
                        </label>
                        <AnimatedInput
                          id="contactPerson"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleInputChange}
                          placeholder="Full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-300">
                          Phone Number
                        </label>
                        <AnimatedInput
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Phone number"
                          type="tel"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <AnimatedInput
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <AnimatedInput
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                      Confirm Password
                    </label>
                    <AnimatedInput
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="rounded border-gray-600 text-[#9575ff] focus:ring-[#9575ff] focus:ring-0 focus:ring-offset-0"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-300">
                    I agree to the{" "}
                    <button type="button" className="text-[#9575ff] hover:text-[#8a63ff]">
                      Terms of Service
                    </button>
                    {" "}and{" "}
                    <button type="button" className="text-[#9575ff] hover:text-[#8a63ff]">
                      Privacy Policy
                    </button>
                  </label>
                </div>

                <AnimatedButton
                  type="submit"
                  variant="primary-gradient"
                  className="w-full"
                  hoverScale={1.02}
                  glowOnHover={true}
                  sweep={true}
                >
                  Create Account
                </AnimatedButton>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-[#9575ff] hover:text-[#8a63ff] font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 