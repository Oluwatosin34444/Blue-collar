import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Loader2, MapPin, Search, BadgeCheckIcon } from "lucide-react"
import { Rating, RatingButton } from "@/components/ui/rating";
import type { Artisan } from "@/lib/types"
import type { AddressType } from "./address-autocomplete"

interface FindArtisansModalProps {
  artisans: Artisan[]
  userAddress: AddressType
  onArtisanClick?: (artisanId: string) => void
}

function destructureAddress(address: string): AddressType | null {
  try {
    const parsedAddress = JSON.parse(address) as AddressType
    const { address1, address2, formattedAddress, city, region, postalCode, country, lat, lng } = parsedAddress
    return {
      address1,
      address2,
      formattedAddress,
      city,
      region,
      postalCode,
      country,
      lat,
      lng,
    }
  } catch {
    return null
  }
}

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function FindArtisansModal({ artisans, userAddress, onArtisanClick }: FindArtisansModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [kmRange, setKmRange] = useState([10])
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Artisan[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    setIsSearching(true)
    setHasSearched(false)

    // Simulate search delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const nearbyArtisans = artisans.filter((artisan) => {
      const artisanAddress = destructureAddress(artisan?.address || "")

      if (!artisanAddress) {
        return false
      }

      const distance = calculateDistance(userAddress.lat, userAddress.lng, artisanAddress.lat, artisanAddress.lng)

      return distance <= kmRange[0]
    })

    setSearchResults(nearbyArtisans)
    setHasSearched(true)
    setIsSearching(false)
  }

  const handleArtisanClick = (artisanId: string) => {
    if (onArtisanClick) {
      onArtisanClick(artisanId)
    }
    setIsOpen(false)
  }

  const resetSearch = () => {
    setSearchResults([])
    setHasSearched(false)
    setKmRange([10])
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          resetSearch()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <MapPin className="w-4 h-4 mr-2" />
          Find Artisans Around Me
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Find Artisans Around Me
          </DialogTitle>
          <DialogDescription>
            Discover skilled artisans in your area. Set your preferred distance and find the perfect match for your
            needs.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="border-b pb-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search Radius: {kmRange[0]} km</label>
                <Slider value={kmRange} onValueChange={setKmRange} max={50} min={1} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 km</span>
                  <span>50 km</span>
                </div>
              </div>

              <Button onClick={handleSearch} disabled={isSearching} className="w-full bg-blue-600 hover:bg-blue-700">
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scanning for artisans...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search Artisans
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isSearching && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <MapPin className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="mt-4 text-lg font-medium">Scanning for artisans...</p>
                <p className="text-gray-600">Finding skilled professionals in your area</p>
              </div>
            )}

            {hasSearched && !isSearching && searchResults.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Found {searchResults.length} artisan{searchResults.length !== 1 ? "s" : ""} within {kmRange[0]} km
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((artisan) => (
                    <Card
                      key={artisan._id}
                      onClick={() => handleArtisanClick(artisan._id)}
                      className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-none pt-0"
                    >
                      <div className="relative">
                        <img
                          src={
                            artisan.artisanImage ||
                            `https://ui-avatars.com/api/?name=${artisan.firstName || "/placeholder.svg"}+${artisan.lastName}`
                          }
                          alt={`${artisan.firstName} ${artisan.lastName}`}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        {artisan?.verified && (
                          <Badge variant="secondary" className="bg-green-500 text-white absolute top-2 right-2">
                            <BadgeCheckIcon className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>

                      <CardContent className="space-y-2 p-4">
                        <h3 className="text-lg font-semibold">{`${artisan.firstName} ${artisan.lastName}`}</h3>
                        <p className="text-gray-600">{artisan.service}</p>
                        <div className="flex items-center text-sm">
                          <Rating defaultValue={artisan.rating} readOnly>
                            {Array.from({ length: 5 }).map((_, index) => (
                              <RatingButton key={index} />
                            ))}
                          </Rating>
                        </div>
                        <p className="text-gray-600 text-sm">{artisan.location}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {hasSearched && !isSearching && searchResults.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No artisans found</h3>
                <p className="text-gray-600 text-center mb-6 max-w-md">
                  We couldn't find any artisans within {kmRange[0]} km of your location. Try increasing the search
                  radius or use the location search on the artisans page.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setKmRange([Math.min(50, kmRange[0] + 10)])}>
                    Increase Range
                  </Button>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>Browse All Artisans</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
