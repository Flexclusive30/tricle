"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Info } from "lucide-react"

interface EswatiniLocationMapProps {
  highlightRegion?: string
  highlightCity?: string
  title?: string
  description?: string
}

export default function EswatiniLocationMap({
  highlightRegion,
  highlightCity,
  title = "Location in Eswatini",
  description,
}: EswatiniLocationMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const regions = [
    { slug: "hhohho", name: "Hhohho", color: "#3B82F6", x: 45, y: 25 },
    { slug: "manzini", name: "Manzini", color: "#10B981", x: 50, y: 45 },
    { slug: "lubombo", name: "Lubombo", color: "#F59E0B", x: 75, y: 55 },
    { slug: "shiselweni", name: "Shiselweni", color: "#EF4444", x: 35, y: 70 },
  ]

  const cities = [
    { name: "Mbabane", region: "hhohho", x: 45, y: 30, isCapital: true },
    { name: "Manzini", region: "manzini", x: 50, y: 50, isCapital: false },
    { name: "Siteki", region: "lubombo", x: 75, y: 60, isCapital: false },
    { name: "Nhlangano", region: "shiselweni", x: 35, y: 75, isCapital: false },
  ]

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
        <div className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-green-50 rounded-lg overflow-hidden border">
          {/* SVG Map */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background country shape */}
            <path d="M20,20 L80,20 L85,30 L80,80 L20,80 L15,70 Z" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.5" />

            {/* Region areas */}
            {regions.map((region) => (
              <g key={region.slug}>
                <circle
                  cx={region.x}
                  cy={region.y}
                  r="12"
                  fill={highlightRegion === region.slug ? region.color : `${region.color}40`}
                  stroke={region.color}
                  strokeWidth={highlightRegion === region.slug ? "2" : "1"}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredRegion(region.slug)}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                <text x={region.x} y={region.y + 20} textAnchor="middle" className="text-xs font-medium fill-gray-700">
                  {region.name}
                </text>
              </g>
            ))}

            {/* City markers */}
            {cities.map((city) => (
              <g key={city.name}>
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={city.isCapital ? "3" : "2"}
                  fill={highlightCity === city.name ? "#dc2626" : "#374151"}
                  stroke="white"
                  strokeWidth="1"
                />
                {(city.isCapital || highlightCity === city.name) && (
                  <text x={city.x} y={city.y - 5} textAnchor="middle" className="text-xs font-medium fill-gray-800">
                    {city.name}
                    {city.isCapital && " ★"}
                  </text>
                )}
              </g>
            ))}
          </svg>

          {/* Hover tooltip */}
          {hoveredRegion && (
            <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg border">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: regions.find((r) => r.slug === hoveredRegion)?.color }}
                />
                <span className="text-sm font-medium">
                  {regions.find((r) => r.slug === hoveredRegion)?.name} Region
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-2">
          {regions.map((region) => (
            <Badge
              key={region.slug}
              variant={highlightRegion === region.slug ? "default" : "secondary"}
              className="flex items-center gap-1"
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }} />
              {region.name}
            </Badge>
          ))}
        </div>

        {highlightRegion && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Located in {regions.find((r) => r.slug === highlightRegion)?.name} Region
                </p>
                <p className="text-xs text-blue-700 mt-1">{highlightCity && `Specifically in ${highlightCity}`}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
