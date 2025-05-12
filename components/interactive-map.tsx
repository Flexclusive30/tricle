"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"

// Define destination data with coordinates
const destinations = [
  {
    id: "mlilwane",
    name: "Mlilwane Wildlife Sanctuary",
    region: "Hhohho",
    description: "Experience close encounters with wildlife in this beautiful sanctuary.",
    image: "/images/eswatini-wildlife.jpg",
    link: "/providers/mlilwane-wildlife-sanctuary",
    coordinates: [-26.4833, 31.1833], // [latitude, longitude]
    googleMapsUrl: "https://maps.google.com/?q=-26.4833,31.1833",
  },
  {
    id: "mantenga",
    name: "Mantenga Cultural Village",
    region: "Ezulwini Valley",
    description: "Immerse yourself in traditional Swazi culture and performances.",
    image: "/images/eswatini-cultural.jpg",
    link: "/providers/mantenga-cultural-village",
    coordinates: [-26.4167, 31.1667],
    googleMapsUrl: "https://maps.google.com/?q=-26.4167,31.1667",
  },
  {
    id: "hlane",
    name: "Hlane Royal National Park",
    region: "Lubombo",
    description: "Eswatini's largest protected area, home to lions, elephants and rhinos.",
    image: "/images/hlane-lion.jpeg",
    link: "/providers/hlane-royal-national-park",
    coordinates: [-26.2667, 31.8333],
    googleMapsUrl: "https://maps.google.com/?q=-26.2667,31.8333",
  },
  {
    id: "swazi-candles",
    name: "Swazi Candles Craft Market",
    region: "Malkerns Valley",
    description: "Shop for handcrafted souvenirs and watch artisans at work.",
    image: "/images/eswatini-village.jpg",
    link: "/providers/swazi-candles",
    coordinates: [-26.5333, 31.2],
    googleMapsUrl: "https://maps.google.com/?q=-26.5333,31.2000",
  },
  {
    id: "mbabane",
    name: "Mbabane",
    region: "Hhohho",
    description: "The capital city of Eswatini with shopping and dining options.",
    image: "/placeholder.svg?height=300&width=500&text=Mbabane",
    link: "/regions/hhohho",
    coordinates: [-26.3167, 31.1333],
    googleMapsUrl: "https://maps.google.com/?q=-26.3167,31.1333",
  },
  {
    id: "manzini",
    name: "Manzini",
    region: "Manzini",
    description: "The largest urban center and commercial hub of Eswatini.",
    image: "/placeholder.svg?height=300&width=500&text=Manzini",
    link: "/regions/manzini",
    coordinates: [-26.4833, 31.3667],
    googleMapsUrl: "https://maps.google.com/?q=-26.4833,31.3667",
  },
  {
    id: "lobamba",
    name: "Lobamba",
    region: "Hhohho",
    description: "The traditional, spiritual, and legislative capital of Eswatini.",
    image: "/placeholder.svg?height=300&width=500&text=Lobamba",
    link: "/regions/hhohho",
    coordinates: [-26.4667, 31.2],
    googleMapsUrl: "https://maps.google.com/?q=-26.4667,31.2000",
  },
  {
    id: "royal-swazi-spa",
    name: "Royal Swazi Spa",
    region: "Hhohho",
    description: "Luxury resort featuring a hotel, spa, casino, and championship golf course.",
    image: "/images/hilton-exterior.jpeg",
    link: "/providers/royal-swazi-spa",
    coordinates: [-26.4333, 31.1833],
    googleMapsUrl: "https://maps.google.com/?q=-26.4333,31.1833",
  },
]

export default function InteractiveMap() {
  const [selectedDestination, setSelectedDestination] = useState<(typeof destinations)[0] | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // Initialize the map when the component mounts
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === "undefined") return

    // Dynamically import Leaflet
    const loadMap = async () => {
      try {
        const L = (await import("leaflet")).default

        // Import Leaflet CSS
        await import("leaflet/dist/leaflet.css")

        // If map is already initialized, clean it up
        if (mapRef.current) {
          mapRef.current.remove()
        }

        // Create map centered on Eswatini
        const map = L.map(mapContainerRef.current!).setView([-26.5225, 31.4659], 9)

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Add markers for each destination
        destinations.forEach((destination) => {
          const marker = L.marker(destination.coordinates as [number, number])
            .addTo(map)
            .bindPopup(`<b>${destination.name}</b><br>${destination.region}`)
            .on("click", () => {
              setSelectedDestination(destination)
            })
        })

        // Store map reference
        mapRef.current = map
        setMapLoaded(true)
      } catch (error) {
        console.error("Error loading map:", error)
      }
    }

    loadMap()

    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Map Container */}
      <div className="w-full lg:w-2/3 h-[400px] md:h-[500px] rounded-lg overflow-hidden border shadow-md relative">
        <div ref={mapContainerRef} className="w-full h-full" />

        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Destination Info */}
      <div className="w-full lg:w-1/3">
        {selectedDestination ? (
          <Card className="h-full">
            <div className="h-48 overflow-hidden">
              <img
                src={selectedDestination.image || "/placeholder.svg"}
                alt={selectedDestination.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-1">{selectedDestination.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{selectedDestination.region}</span>
              </div>
              <p className="text-muted-foreground mb-4">{selectedDestination.description}</p>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link href={selectedDestination.link}>View Details</Link>
                </Button>
                <Button asChild className="flex-1 flex items-center justify-center">
                  <a href={selectedDestination.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="h-full flex flex-col justify-center items-center p-6 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">Explore Destinations</h3>
            <p className="text-muted-foreground mb-4">
              Click on any marker on the map to view details about that destination.
            </p>
            <div className="grid grid-cols-2 gap-2 w-full mt-4">
              {destinations.slice(0, 4).map((destination) => (
                <Button
                  key={destination.id}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDestination(destination)}
                  className="text-xs"
                >
                  {destination.name}
                </Button>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
