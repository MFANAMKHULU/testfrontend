"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { AnimatedButton } from "@/components/animated-button"
import { AnimatedInput } from "@/components/animated-input"
import { createClient } from '@supabase/supabase-js'
import { VerificationModal } from "./verification-modal"
import { LoadingLogo } from "@/components/loading-logo"

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
    userType: "" as "advertiser" | "influencer" | "affiliate" | "user",
  })
  const [colorIndex, setColorIndex] = React.useState(0)
  const [showVerification, setShowVerification] = React.useState(false)
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (authError) throw authError

      // Create user profile in the users_account table
      const { error: profileError } = await supabase
        .from('users_account')
        .insert({
          id: authData.user?.id,
          email: formData.email,
          full_name: accountType === "individual" ? formData.fullName : formData.contactPerson,
          user_type: accountType === "individual" ? formData.userType : "company",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          verified: false,
          bio: null,
          website: accountType === "company" ? formData.website : null,
          social_links: {},
          settings: {
            company_info: accountType === "company" ? {
              company_name: formData.companyName,
              registration_number: formData.registrationNumber,
              vat_number: formData.vatNumber,
              industry: formData.industry,
              phone_number: formData.phoneNumber
            } : null
          }
        })

      if (profileError) throw profileError

      // Show verification modal
      setShowVerification(true)
    } catch (error: any) {
      setError(error.message || "An error occurred during sign up")
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationComplete = () => {
    setShowVerification(false)
    onClose()
  }

  const handleSkipVerification = () => {
    setShowVerification(false)
    onClose()
    // You can add additional logic here to show the login modal
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
    <>
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
                  {loading ? (
                    <LoadingLogo size={44} />
                  ) : (
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
                  )}
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
                          required
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white mb-4">I am joining as</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div
                          className={`relative flex items-center p-2 rounded-lg border-2 cursor-pointer transition-all h-10 ${
                              formData.userType === 'advertiser'
                                ? 'border-[#9575ff] bg-[#9575ff]/10'
                                : 'border-[#2a2e45] bg-[#0f1424] hover:border-[#9575ff]/50'
                            }`}
                            onClick={() => setFormData({ ...formData, userType: 'advertiser' })}
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  formData.userType === 'advertiser' ? 'border-[#9575ff]' : 'border-[#2a2e45]'
                              }`}
                            >
                                {formData.userType === 'advertiser' && (
                                  <div className="w-2 h-2 rounded-full bg-[#9575ff]" />
                              )}
                            </div>
                              <span className={`font-medium text-sm ${formData.userType === 'advertiser' ? 'text-[#9575ff]' : 'text-white'}`}>
                              Advertiser
                            </span>
                          </div>
                        </div>

                        <div
                          className={`relative flex items-center p-2 rounded-lg border-2 cursor-pointer transition-all h-10 ${
                              formData.userType === 'influencer'
                                ? 'border-[#9575ff] bg-[#9575ff]/10'
                                : 'border-[#2a2e45] bg-[#0f1424] hover:border-[#9575ff]/50'
                            }`}
                            onClick={() => setFormData({ ...formData, userType: 'influencer' })}
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  formData.userType === 'influencer' ? 'border-[#9575ff]' : 'border-[#2a2e45]'
                              }`}
                            >
                                {formData.userType === 'influencer' && (
                                  <div className="w-2 h-2 rounded-full bg-[#9575ff]" />
                              )}
                            </div>
                              <span className={`font-medium text-sm ${formData.userType === 'influencer' ? 'text-[#9575ff]' : 'text-white'}`}>
                              Influencer
                            </span>
                          </div>
                        </div>

                        <div
                          className={`relative flex items-center p-2 rounded-lg border-2 cursor-pointer transition-all h-10 ${
                              formData.userType === 'affiliate'
                                ? 'border-[#9575ff] bg-[#9575ff]/10'
                                : 'border-[#2a2e45] bg-[#0f1424] hover:border-[#9575ff]/50'
                            }`}
                            onClick={() => setFormData({ ...formData, userType: 'affiliate' })}
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  formData.userType === 'affiliate' ? 'border-[#9575ff]' : 'border-[#2a2e45]'
                              }`}
                            >
                                {formData.userType === 'affiliate' && (
                                  <div className="w-2 h-2 rounded-full bg-[#9575ff]" />
                              )}
                              </div>
                              <span className={`font-medium text-sm ${formData.userType === 'affiliate' ? 'text-[#9575ff]' : 'text-white'}`}>
                                Affiliate
                              </span>
                            </div>
                          </div>

                          <div
                            className={`relative flex items-center p-2 rounded-lg border-2 cursor-pointer transition-all h-10 ${
                              formData.userType === 'user'
                                ? 'border-[#9575ff] bg-[#9575ff]/10'
                                : 'border-[#2a2e45] bg-[#0f1424] hover:border-[#9575ff]/50'
                            }`}
                            onClick={() => setFormData({ ...formData, userType: 'user' })}
                          >
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  formData.userType === 'user' ? 'border-[#9575ff]' : 'border-[#2a2e45]'
                                }`}
                              >
                                {formData.userType === 'user' && (
                                  <div className="w-2 h-2 rounded-full bg-[#9575ff]" />
                                )}
                              </div>
                              <span className={`font-medium text-sm ${formData.userType === 'user' ? 'text-[#9575ff]' : 'text-white'}`}>
                                User
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

                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}

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
                    disabled={loading}
                >
                    {loading ? "Creating Account..." : "Create Account"}
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

      <VerificationModal
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        email={formData.email}
        onVerificationComplete={handleVerificationComplete}
        onSkip={handleSkipVerification}
      />
    </>
  )
} 