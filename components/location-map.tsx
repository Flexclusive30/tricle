"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { uuidv4 } from "@/lib/uuid-polyfill"

interface LocationMapProps {
  name: string
  coordinates: [number, number] // [latitude, longitude]
  zoom?: number
  height?: string
  className?: string
}

export default function LocationMap({
  name,
  coordinates,
  zoom = 14,
  height = "h-[300px]",
  className = "",
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const leafletMapRef = useRef<any>(null)

  // Generate a unique ID for this map instance
  const mapId = useRef(`map-${uuidv4()}`)

  // Generate Google Maps URL
  const googleMapsUrl = `https://maps.google.com/?q=${coordinates[0]},${coordinates[1]}`

  useEffect(() => {
    if (typeof window === "undefined") return

    // Dynamically import Leaflet
    const loadMap = async () => {
      try {
        // Clean up existing map if it exists
        if (leafletMapRef.current) {
          leafletMapRef.current.remove()
          leafletMapRef.current = null
        }

        const L = (await import("leaflet")).default

        // Import Leaflet CSS
        await import("leaflet/dist/leaflet.css")

        // Wait for the DOM to be ready
        if (!mapRef.current) return

        // Create map centered on the destination
        const map = L.map(mapRef.current).setView(coordinates, zoom)

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Add marker for the destination
        const marker = L.marker(coordinates).addTo(map).bindPopup(`<b>${name}</b>`).openPopup()

        // Store map reference
        leafletMapRef.current = map
        setMapLoaded(true)
      } catch (error) {
        console.error("Error loading map:", error)
      }
    }

    // Small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      loadMap()
    }, 100)

    // Clean up on unmount
    return () => {
      clearTimeout(timer)
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [coordinates, name, zoom])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.invalidateSize()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className={`${className} flex flex-col`}>
      <div className={`relative ${height} w-full rounded-lg overflow-hidden border shadow-md`}>
        <div ref={mapRef} id={mapId.current} className="w-full h-full" />

        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 flex justify-end">
        <Button asChild size="sm" variant="outline" className="text-xs">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3 w-3 mr-1" />
            View on Google Maps
          </a>
        </Button>
      </div>
    </div>
  )
}
