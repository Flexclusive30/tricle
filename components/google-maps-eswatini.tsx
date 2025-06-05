"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Satellite, MapIcon, ExternalLink } from "lucide-react"
import Link from "next/link"

interface GoogleMapsEswatiniProps {
  highlightRegion?: string
  showControls?: boolean
  height?: string
  zoom?: number
  destination?: {
    name: string
    lat: number
    lng: number
  }
}

// Define the libraries we need
const libraries: ("places" | "geometry")[] = ["places", "geometry"]

export default function GoogleMapsEswatini({
  highlightRegion,
  showControls = true,
  height = "500px",
  zoom = 9,
  destination,
}: GoogleMapsEswatiniProps) {
  const [map, setMap] = useState<any>(null)
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null)
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("satellite")
  const mapRef = useRef<GoogleMap>(null)

  // Eswatini center coordinates or destination coordinates if provided
  const mapCenter = destination ? { lat: destination.lat, lng: destination.lng } : { lat: -26.5225, lng: 31.4659 }

  // Default zoom level - higher for specific destinations
  const defaultZoom = destination ? 14 : zoom

  // Generate Google Maps URL for the destination
  const getGoogleMapsUrl = () => {
    if (destination) {
      return `https://www.google.com/maps/search/?api=1&query=${destination.lat},${destination.lng}`
    }
    return `https://www.google.com/maps/place/Eswatini/@-26.5225,31.4659,9z`
  }

  // Regional boundaries and major cities
  const regions = [
    {
      slug: "hhohho",
      name: "Hhohho",
      color: "#3B82F6",
      center: { lat: -26.3208, lng: 31.1367 },
      cities: [
        { name: "Mbabane", lat: -26.3054, lng: 31.1367, isCapital: true },
        { name: "Lobamba", lat: -26.4465, lng: 31.2056, isCapital: true },
        { name: "Ezulwini", lat: -26.4167, lng: 31.2, isCapital: false },
        { name: "Piggs Peak", lat: -25.9667, lng: 31.25, isCapital: false },
      ],
    },
    {
      slug: "manzini",
      name: "Manzini",
      color: "#10B981",
      center: { lat: -26.4833, lng: 31.3667 },
      cities: [
        { name: "Manzini", lat: -26.4833, lng: 31.3667, isCapital: false },
        { name: "Matsapha", lat: -26.55, lng: 31.3083, isCapital: false },
        { name: "Malkerns", lat: -26.5833, lng: 31.1833, isCapital: false },
        { name: "Bhunya", lat: -26.6167, lng: 31.1, isCapital: false },
      ],
    },
    {
      slug: "lubombo",
      name: "Lubombo",
      color: "#F59E0B",
      center: { lat: -26.35, lng: 31.85 },
      cities: [
        { name: "Siteki", lat: -26.45, lng: 31.95, isCapital: false },
        { name: "Big Bend", lat: -26.8167, lng: 31.95, isCapital: false },
        { name: "Simunye", lat: -26.1167, lng: 31.9, isCapital: false },
        { name: "Lomahasha", lat: -25.9833, lng: 31.9167, isCapital: false },
      ],
    },
    {
      slug: "shiselweni",
      name: "Shiselweni",
      color: "#EF4444",
      center: { lat: -26.85, lng: 31.2 },
      cities: [
        { name: "Nhlangano", lat: -26.85, lng: 31.2, isCapital: false },
        { name: "Hlatikulu", lat: -26.9667, lng: 31.0833, isCapital: false },
        { name: "Lavumisa", lat: -27.3167, lng: 31.8833, isCapital: false },
        { name: "Hluti", lat: -26.9833, lng: 31.2167, isCapital: false },
      ],
    },
  ]

  // Tourist attractions and points of interest
  const attractions = [
    { name: "Hlane Royal National Park", lat: -26.3, lng: 31.8333, type: "wildlife" },
    { name: "Mlilwane Wildlife Sanctuary", lat: -26.4833, lng: 31.1833, type: "wildlife" },
    { name: "Malolotja Nature Reserve", lat: -26.0167, lng: 31.1167, type: "nature" },
    { name: "Mantenga Cultural Village", lat: -26.45, lng: 31.2, type: "culture" },
    { name: "Swazi Candles", lat: -26.55, lng: 31.1833, type: "culture" },
    { name: "Ngwenya Glass", lat: -26.2167, lng: 31.0833, type: "culture" },
  ]

  const mapContainerStyle = {
    width: "100%",
    height: height,
  }

  const mapOptions = {
    disableDefaultUI: !showControls,
    zoomControl: showControls,
    mapTypeControl: false,
    scaleControl: showControls,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: showControls,
    styles: [
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [{ color: "#4285f4" }, { weight: 2 }],
      },
    ],
  }

  const onLoad = useCallback((map: any) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  // Function to get marker label based on type
  const getMarkerLabel = (type: string, isCapital?: boolean) => {
    if (isCapital) {
      return {
        text: "★",
        color: "white",
        fontSize: "14px",
        fontWeight: "bold",
      }
    }
    return null
  }

  // Function to get marker color based on type - all red now
  const getMarkerColor = (type: string, isCapital?: boolean) => {
    return "#dc2626" // Red for all markers
  }

  const handleMarkerClick = (markerId: string) => {
    setSelectedMarker(selectedMarker === markerId ? null : markerId)
  }

  const focusOnRegion = (regionSlug: string) => {
    const region = regions.find((r) => r.slug === regionSlug)
    if (region && map) {
      map.panTo(region.center)
      map.setZoom(11)
    }
  }

  useEffect(() => {
    if (highlightRegion && map) {
      focusOnRegion(highlightRegion)
    }
  }, [highlightRegion, map])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {destination ? destination.name : "Interactive Map of Eswatini"}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={mapType === "roadmap" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapType("roadmap")}
            >
              <MapIcon className="h-4 w-4 mr-1" />
              Map
            </Button>
            <Button
              variant={mapType === "satellite" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapType("satellite")}
            >
              <Satellite className="h-4 w-4 mr-1" />
              Satellite
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} libraries={libraries}>
          <GoogleMap
            ref={mapRef}
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={defaultZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{ ...mapOptions, mapTypeId: mapType }}
          >
            {/* Destination marker - show if destination is provided with bouncing animation */}
            {destination && (
              <Marker
                position={{ lat: destination.lat, lng: destination.lng }}
                animation={window.google?.maps?.Animation?.BOUNCE}
                options={{
                  icon: {
                    path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
                    fillColor: "#dc2626",
                    fillOpacity: 1,
                    strokeColor: "#FFFFFF",
                    strokeWeight: 2,
                    scale: 1.8,
                  },
                }}
              >
                <InfoWindow position={{ lat: destination.lat, lng: destination.lng }}>
                  <div className="p-2">
                    <h3 className="font-semibold">{destination.name}</h3>
                    <p className="text-sm text-muted-foreground">Current Location</p>
                  </div>
                </InfoWindow>
              </Marker>
            )}

            {/* City markers - only show if not focusing on a destination */}
            {!destination &&
              regions.map((region) =>
                region.cities.map((city) => (
                  <Marker
                    key={`${region.slug}-${city.name}`}
                    position={{ lat: city.lat, lng: city.lng }}
                    label={getMarkerLabel("city", city.isCapital)}
                    options={{
                      icon: {
                        path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
                        fillColor: getMarkerColor("city", city.isCapital),
                        fillOpacity: 1,
                        strokeColor: "#FFFFFF",
                        strokeWeight: 2,
                        scale: 1,
                        labelOrigin: { x: 0, y: -30 },
                      },
                    }}
                    onClick={() => handleMarkerClick(`${region.slug}-${city.name}`)}
                  >
                    {selectedMarker === `${region.slug}-${city.name}` && (
                      <InfoWindow
                        position={{ lat: city.lat, lng: city.lng }}
                        onCloseClick={() => setSelectedMarker(null)}
                      >
                        <div className="p-2">
                          <h3 className="font-semibold">
                            {city.name}
                            {city.isCapital && " ★"}
                          </h3>
                          <p className="text-sm text-muted-foreground">{region.name} Region</p>
                          {city.isCapital && <p className="text-xs text-blue-600">Capital City</p>}
                          <Link href={`/regions/${region.slug}`} className="text-xs text-blue-600 hover:underline">
                            Explore {region.name} Region →
                          </Link>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                )),
              )}

            {/* Tourist attraction markers - only show if not focusing on a destination */}
            {!destination &&
              attractions.map((attraction) => (
                <Marker
                  key={attraction.name}
                  position={{ lat: attraction.lat, lng: attraction.lng }}
                  options={{
                    icon: {
                      path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
                      fillColor: getMarkerColor(attraction.type),
                      fillOpacity: 1,
                      strokeColor: "#FFFFFF",
                      strokeWeight: 2,
                      scale: 1,
                    },
                  }}
                  onClick={() => handleMarkerClick(attraction.name)}
                >
                  {selectedMarker === attraction.name && (
                    <InfoWindow
                      position={{ lat: attraction.lat, lng: attraction.lng }}
                      onCloseClick={() => setSelectedMarker(null)}
                    >
                      <div className="p-2">
                        <h3 className="font-semibold">{attraction.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{attraction.type} Attraction</p>
                        <p className="text-xs text-blue-600 hover:underline cursor-pointer">Learn more →</p>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
          </GoogleMap>
        </LoadScript>

        {/* View on Google Maps button */}
        <div className="mt-4 flex justify-end">
          <a href={getGoogleMapsUrl()} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4 mr-1" />
              View on Google Maps
            </Button>
          </a>
        </div>

        {/* Region quick navigation - only show if not focusing on a destination */}
        {!destination && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Navigation className="h-4 w-4" />
              Quick Navigation:
            </div>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region.slug}
                  variant={highlightRegion === region.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() => focusOnRegion(region.slug)}
                  className="flex items-center gap-1"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }} />
                  {region.name}
                </Button>
              ))}
            </div>

            {/* Updated Legend */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t">
              <div>
                <h4 className="text-sm font-medium mb-2">Locations</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
                      ★
                    </div>
                    <span>Capital Cities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span>Cities & Attractions</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Map Types</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span>Satellite View</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Road Map View</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
