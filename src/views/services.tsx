"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { detailedServices } from "@/lib/constant"
import Container from "@/components/container"
import { Search, X, Star, Clock, DollarSign, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredServices, setFilteredServices] = useState(detailedServices)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const navigate = useNavigate()

  const categories = Array.from(new Set(detailedServices.map((service) => service.category)))

  useEffect(() => {
    if (searchTerm) {
      setFilteredServices(
        detailedServices.filter(
          (service) =>
            service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.features.some((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase())) ||
            service.includedServices.some((subService) =>
              subService.name.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        ),
      )
      setSelectedCategory(null)
    } else if (selectedCategory) {
      setFilteredServices(detailedServices.filter((service) => service.category === selectedCategory))
    } else {
      setFilteredServices(detailedServices)
    }
  }, [searchTerm, selectedCategory])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const toggleExpand = (title: string) => {
    if (expandedService === title) {
      setExpandedService(null)
    } else {
      setExpandedService(title)
    }
  }

  const handleBookService = (serviceTitle: string, includedServices: { name: string }[]) => {
    const servicesParam = includedServices.map(s => s.name).join(',');
    navigate(`/artisans?service=${encodeURIComponent(serviceTitle)}&includedServices=${encodeURIComponent(servicesParam)}`);
  }

  return (
    <div className="bg-gray-50 py-20">
      <Container className="py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional services delivered by verified artisans in your area
          </p>
        </div>

        <div className="mb-12">
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All Categories
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredServices.map((service) => (
              <motion.div
                key={service.title}
                variants={item}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -20 }}
                className="h-full"
              >
                <div
                  className={`bg-white rounded-lg shadow-md p-6 h-full flex flex-col transform transition-all duration-300 hover:shadow-xl ${
                    expandedService === service.title
                      ? "border-2 border-blue-500"
                      : "border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl text-blue-600">{service.icon}</div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="fill-current w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">{service.averageRating}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {expandedService === service.title ? service.longDescription : service.description}
                  </p>

                  <div className="mb-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{service.priceRange}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{service.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6 flex-grow">
                    {service.features
                      .slice(0, expandedService === service.title ? undefined : 3)
                      .map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-700">
                          <span className="text-blue-600 mr-2 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    {service.features.length > 3 && expandedService !== service.title && (
                      <li className="text-blue-600 text-sm font-medium">
                        + {service.features.length - 3} more features
                      </li>
                    )}
                  </ul>

                  {expandedService === service.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6"
                    >
                      <h4 className="font-semibold text-lg mb-3">Included Services</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.includedServices.map((subService, idx) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded-md">
                            <div className="flex items-center mb-1">
                              <span className="mr-2">{subService.icon}</span>
                              <span className="font-medium">{subService.name}</span>
                            </div>
                            <p className="text-sm text-gray-600">{subService.description}</p>
                          </div>
                        ))}
                      </div>

                      {service.relatedServices.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-lg mb-2">Related Services</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.relatedServices.map((relatedService, idx) => (
                              <Link
                                key={idx}
                                to={`#${relatedService}`}
                                className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-100"
                              >
                                {relatedService}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  <div className="mt-auto flex flex-col gap-3">
                    <Button
                      onClick={() => toggleExpand(service.title)}
                      variant="outline"
                      className="w-full flex items-center justify-center"
                    >
                      {expandedService === service.title ? (
                        <>
                          Show Less <ChevronUp className="ml-2 w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Show More <ChevronDown className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                    <Button 
                      className="w-full text-white py-2 rounded-md transition-colors bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleBookService(service.title, service.includedServices)}
                    >
                      Book Service
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 mb-4">No services found matching "{searchTerm}"</p>
            <Button onClick={() => setSearchTerm("")} className="bg-blue-600 hover:bg-blue-700 text-white">
              View All Services
            </Button>
          </div>
        )}

        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Access to Individual Services</h2>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3 justify-center"
          >
            {detailedServices.flatMap((service) =>
              service.includedServices.map((subService) => (
                <motion.div
                  key={`pill-${subService.name}`}
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex"
                >
                  <Link to={`/artisans?service=${encodeURIComponent(subService.name)}`} className="group">
                    <div className="bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-full px-5 py-2.5 transition-all duration-300 border border-blue-100 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-100 flex items-center">
                      <span className="mr-2">{subService.icon}</span>
                      <span className="text-sm font-medium whitespace-nowrap">{subService.name}</span>
                    </div>
                  </Link>
                </motion.div>
              )),
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 bg-white rounded-lg p-8 text-center shadow-md border border-gray-100"
        >
          <h2 className="text-2xl font-bold mb-4">Need a Custom Service?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Contact us for custom service requests
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-colors">
            Contact Us
          </Button>
        </motion.div>
      </Container>
    </div>
  )
}

export default ServicesPage
