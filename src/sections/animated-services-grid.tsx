"use client"

import { useState } from "react"
import Container from "@/components/container"
import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface AnimatedServicesGridProps {
  services: string[]
  title?: string
  subtitle?: string
}

export default function AnimatedServicesGrid({
  services,
  title = "Our Services",
  subtitle = "Find the right artisan for your project",
}: AnimatedServicesGridProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredServices = searchTerm
    ? services.filter((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))
    : services

  // Icons for some common services (you can expand this list)
  const serviceIcons: Record<string, string> = {
    Electrical: "⚡",
    Plumbing: "🔧",
    Carpentry: "🪚",
    Painting: "🖌️",
    Cleaning: "🧹",
    "AC Repair": "❄️",
    Laundry: "👕",
    Hairdressing: "💇",
    Tailoring: "🧵",
    Barbing: "✂️",
    "Auto Mechanics": "🚗",
    "Furniture Making": "🪑",
    "Pest Control": "🐜",
    Roofing: "🏠",
    Landscaping: "🌳",
  }

  const getServiceIcon = (service: string) => {
    return serviceIcons[service] || "👨‍🔧"
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredServices.map((service) => (
            <motion.div key={service} variants={item}>
              <Link to={`/artisans?service=${encodeURIComponent(service)}`} className="block group">
                <div className="bg-white hover:bg-blue-600 rounded-xl p-6 text-center transition-all duration-300 shadow-sm hover:shadow-lg border border-gray-100 group-hover:border-blue-500 h-full flex flex-col items-center justify-center">
                  <span className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">
                    {getServiceIcon(service)}
                  </span>
                  <h3 className="text-gray-900 group-hover:text-white font-medium">{service}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No services found matching "{searchTerm}"</p>
          </div>
        )}
      </Container>
    </section>
  )
}
