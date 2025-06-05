"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Info, Navigation } from "lucide-react"
import Link from "next/link"

interface InteractiveEswatiniMapProps {
  highlightRegion?: string
  highlightCity?: string
  title?: string
  description?: string
  showRegionLinks?: boolean
}

export default function InteractiveEswatiniMap({
  highlightRegion,
  highlightCity,
  title = "Interactive Map of Eswatini",
  description,
  showRegionLinks = true,
}: InteractiveEswatiniMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(highlightRegion || null)

  // Define clickable regions with their coordinates on the actual map
  const regions = [
    {
      slug: "hhohho",
      name: "Hhohho",
      color: "#3B82F6",
      description: "Home to the capital Mbabane and royal residences",
      // Coordinates for the clickable area (percentage of image)
      area: "15,10,55,45", // x1,y1,x2,y2 as percentages
      center: { x: 35, y: 27 },
      cities: ["Mbabane", "Lobamba", "Piggs Peak", "Ezulwini"],
    },
    {
      slug: "manzini",
      name: "Manzini",
      color: "#10B981",
      description: "Commercial hub and largest urban area",
      area: "25,35,70,65",
      center: { x: 47, y: 50 },
      cities: ["Manzini", "Matsapha", "Malkerns", "Bhunya"],
    },
    {
      slug: "lubombo",
      name: "Lubombo",
      color: "#F59E0B",
      description: "Wildlife parks and eastern mountains",
      area: "60,20,90,75",
      center: { x: 75, y: 47 },
      cities: ["Siteki", "Big Bend", "Simunye", "Lomahasha"],
    },
    {
      slug: "shiselweni",
      name: "Shiselweni",
      color: "#EF4444",
      description: "Southern region with rolling hills",
      area: "10,60,60,90",
      center: { x: 35, y: 75 },
      cities: ["Nhlangano", "Hlatikulu", "Lavumisa", "Hluti"],
    },
  ]

  const cities = [
    { name: "Mbabane", region: "hhohho", x: 32, y: 30, isCapital: true },
    { name: "Lobamba", region: "hhohho", x: 30, y: 35, isCapital: true },
    { name: "Manzini", region: "manzini", x: 45, y: 52, isCapital: false },
    { name: "Siteki", region: "lubombo", x: 72, y: 40, isCapital: false },
    { name: "Nhlangano", region: "shiselweni", x: 38, y: 78, isCapital: false },
    { name: "Big Bend", region: "lubombo", x: 78, y: 65, isCapital: false },
  ]

  const handleRegionClick = (regionSlug: string) => {
    setSelectedRegion(regionSlug === selectedRegion ? null : regionSlug)
  }

  const getRegionInfo = (regionSlug: string) => {
    return regions.find((r) => r.slug === regionSlug)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {title}
        </CardTitle>
        {description && <p className="text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border shadow-lg bg-gray-50">
          {/* Actual Eswatini Map Image */}
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eswatini-regions-and-capital-map.jpg-8pRhxbWrd2qTai5z4ud80k8ADOUXdO.jpeg"
            alt="Interactive map of Eswatini showing all regions"
            fill
            className="object-contain"
            priority
          />

          {/* Interactive Overlay */}
          <div className="absolute inset-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Clickable regions */}
              {regions.map((region) => {
                const isSelected = selectedRegion === region.slug
                const isHovered = hoveredRegion === region.slug
                const isHighlighted = highlightRegion === region.slug

                return (
                  <g key={region.slug}>
                    {/* Clickable area */}
                    <rect
                      x={region.area.split(",")[0]}
                      y={region.area.split(",")[1]}
                      width={region.area.split(",")[2] - region.area.split(",")[0]}
                      height={region.area.split(",")[3] - region.area.split(",")[1]}
                      fill={
                        isSelected || isHighlighted
                          ? `${region.color}40`
                          : isHovered
                            ? `${region.color}20`
                            : "transparent"
                      }
                      stroke={isSelected || isHighlighted ? region.color : "transparent"}
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredRegion(region.slug)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => handleRegionClick(region.slug)}
                    />

                    {/* Region label */}
                    <circle
                      cx={region.center.x}
                      cy={region.center.y}
                      r={isSelected || isHighlighted ? "3" : "2.5"}
                      fill={region.color}
                      stroke="white"
                      strokeWidth="1.5"
                      className="cursor-pointer"
                      onClick={() => handleRegionClick(region.slug)}
                    />

                    {/* Region name */}
                    {(isSelected || isHighlighted || isHovered) && (
                      <text
                        x={region.center.x}
                        y={region.center.y - 5}
                        textAnchor="middle"
                        className="text-xs font-bold fill-gray-800 pointer-events-none"
                        style={{ textShadow: "1px 1px 2px white" }}
                      >
                        {region.name}
                      </text>
                    )}
                  </g>
                )
              })}

              {/* City markers */}
              {cities.map((city) => {
                const isHighlighted = highlightCity === city.name
                return (
                  <g key={city.name}>
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={city.isCapital ? "1.5" : "1"}
                      fill={isHighlighted ? "#dc2626" : city.isCapital ? "#1f2937" : "#6b7280"}
                      stroke="white"
                      strokeWidth="0.5"
                    />
                    {(city.isCapital || isHighlighted) && (
                      <text
                        x={city.x}
                        y={city.y - 3}
                        textAnchor="middle"
                        className="text-xs font-medium fill-gray-800 pointer-events-none"
                        style={{ textShadow: "1px 1px 2px white" }}
                      >
                        {city.name}
                        {city.isCapital && " ★"}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Hover tooltip */}
          {hoveredRegion && !selectedRegion && (
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getRegionInfo(hoveredRegion)?.color }}
                />
                <span className="font-semibold">{getRegionInfo(hoveredRegion)?.name} Region</span>
              </div>
              <p className="text-sm text-muted-foreground">{getRegionInfo(hoveredRegion)?.description}</p>
              <p className="text-xs text-muted-foreground mt-1">Click to explore this region</p>
            </div>
          )}
        </div>

        {/* Selected Region Info */}
        {selectedRegion && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: getRegionInfo(selectedRegion)?.color }}
                />
                <h3 className="font-bold text-lg">{getRegionInfo(selectedRegion)?.name} Region</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRegion(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>

            <p className="text-muted-foreground mb-3">{getRegionInfo(selectedRegion)?.description}</p>

            <div className="mb-3">
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <Navigation className="h-4 w-4" />
                Major Cities
              </h4>
              <div className="flex flex-wrap gap-1">
                {getRegionInfo(selectedRegion)?.cities.map((city) => (
                  <Badge key={city} variant="secondary" className="text-xs">
                    {city}
                  </Badge>
                ))}
              </div>
            </div>

            {showRegionLinks && (
              <div className="flex gap-2">
                <Button asChild size="sm">
                  <Link href={`/regions/${selectedRegion}`}>
                    <MapPin className="h-4 w-4 mr-1" />
                    Explore Region
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/categories/accommodation?region=${selectedRegion}`}>
                    <Info className="h-4 w-4 mr-1" />
                    Find Hotels
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="text-sm font-medium text-muted-foreground mb-2 w-full">Click on regions to explore:</div>
          {regions.map((region) => (
            <Badge
              key={region.slug}
              variant={selectedRegion === region.slug || highlightRegion === region.slug ? "default" : "secondary"}
              className="flex items-center gap-1 cursor-pointer hover:bg-primary/80"
              onClick={() => handleRegionClick(region.slug)}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }} />
              {region.name}
            </Badge>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Info className="h-4 w-4" />
            Hover over regions to see details, click to explore. Stars (★) indicate capital cities.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
