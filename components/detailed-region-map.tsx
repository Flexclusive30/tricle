"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MapPin, Info } from "lucide-react"

interface DetailedRegionMapProps {
  region: string
  attractions?: Array<{
    name: string
    type: string
    coordinates: [number, number]
    description: string
  }>
}

export default function DetailedRegionMap({ region, attractions = [] }: DetailedRegionMapProps) {
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null)

  // Define colors and paths for each region
  const regionConfig: Record<
    string,
    {
      color: string
      path: string
      viewBox: string
      cities: Array<{ name: string; x: number; y: number; isCapital?: boolean }>
    }
  > = {
    hhohho: {
      color: "#4CAF50",
      path: "M50,50 C80,30 120,20 160,30 C200,40 230,70 240,110 C250,150 240,190 220,220 C200,250 170,270 130,270 C90,270 60,250 40,220 C20,190 10,150 20,110 C30,70 40,50 50,50 Z",
      viewBox: "0 0 300 300",
      cities: [
        { name: "Mbabane", x: 100, y: 100, isCapital: true },
        { name: "Lobamba", x: 130, y: 140 },
        { name: "Ezulwini", x: 150, y: 160 },
        { name: "Piggs Peak", x: 80, y: 60 },
      ],
    },
    manzini: {
      color: "#2196F3",
      path: "M30,50 C60,30 100,20 140,30 C180,40 210,70 220,110 C230,150 220,190 200,220 C180,250 150,270 110,270 C70,270 40,250 20,220 C0,190 -10,150 0,110 C10,70 20,50 30,50 Z",
      viewBox: "0 0 300 300",
      cities: [
        { name: "Manzini", x: 150, y: 150, isCapital: true },
        { name: "Matsapha", x: 120, y: 170 },
        { name: "Malkerns", x: 180, y: 130 },
        { name: "Bhunya", x: 90, y: 200 },
      ],
    },
    lubombo: {
      color: "#FFC107",
      path: "M40,40 C70,20 110,10 150,20 C190,30 220,60 230,100 C240,140 230,180 210,210 C190,240 160,260 120,260 C80,260 50,240 30,210 C10,180 0,140 10,100 C20,60 30,40 40,40 Z",
      viewBox: "0 0 300 300",
      cities: [
        { name: "Siteki", x: 150, y: 100, isCapital: true },
        { name: "Big Bend", x: 180, y: 180 },
        { name: "Simunye", x: 120, y: 150 },
        { name: "Lomahasha", x: 220, y: 80 },
      ],
    },
    shiselweni: {
      color: "#FF5722",
      path: "M60,60 C90,40 130,30 170,40 C210,50 240,80 250,120 C260,160 250,200 230,230 C210,260 180,280 140,280 C100,280 70,260 50,230 C30,200 20,160 30,120 C40,80 50,60 60,60 Z",
      viewBox: "0 0 300 300",
      cities: [
        { name: "Nhlangano", x: 150, y: 150, isCapital: true },
        { name: "Hlatikulu", x: 120, y: 100 },
        { name: "Lavumisa", x: 200, y: 220 },
        { name: "Hluti", x: 100, y: 180 },
      ],
    },
  }

  const currentRegion = regionConfig[region] || regionConfig.hhohho

  // Sample attractions if none provided
  const defaultAttractions = [
    {
      name: "National Park",
      type: "nature",
      coordinates: [120, 80] as [number, number],
      description: "Beautiful national park with diverse wildlife and hiking trails.",
    },
    {
      name: "Cultural Village",
      type: "cultural",
      coordinates: [180, 120] as [number, number],
      description: "Traditional village showcasing authentic Swazi culture and crafts.",
    },
    {
      name: "Waterfall",
      type: "nature",
      coordinates: [90, 150] as [number, number],
      description: "Stunning waterfall with swimming pools and picnic areas surrounded by lush vegetation.",
    },
    {
      name: "Craft Market",
      type: "shopping",
      coordinates: [150, 200] as [number, number],
      description: "Local market selling traditional crafts, textiles, and souvenirs.",
    },
  ]

  const displayAttractions = attractions.length > 0 ? attractions : defaultAttractions

  const getAttractionIcon = (type: string) => {
    switch (type) {
      case "nature":
        return "🌳"
      case "cultural":
        return "🏛️"
      case "shopping":
        return "🛍️"
      default:
        return "📍"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold mb-4">{region.charAt(0).toUpperCase() + region.slice(1)} Region Map</h3>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map SVG */}
        <div className="w-full lg:w-2/3 border rounded-lg p-2 bg-slate-50">
          <TooltipProvider>
            <svg viewBox={currentRegion.viewBox} className="w-full h-auto">
              {/* Region Shape */}
              <path
                d={currentRegion.path}
                fill={`${currentRegion.color}30`}
                stroke={currentRegion.color}
                strokeWidth="3"
              />

              {/* Cities */}
              {currentRegion.cities.map((city, index) => (
                <g key={index}>
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={city.isCapital ? 6 : 4}
                    fill={city.isCapital ? "#1e293b" : "#64748b"}
                  />
                  <text x={city.x + 10} y={city.y + 5} fontSize="12" fontWeight={city.isCapital ? "bold" : "normal"}>
                    {city.name} {city.isCapital && "(Capital)"}
                  </text>
                </g>
              ))}

              {/* Attractions */}
              {displayAttractions.map((attraction, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <g
                      transform={`translate(${attraction.coordinates[0]}, ${attraction.coordinates[1]})`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedAttraction(attraction.name)}
                    >
                      <circle
                        r="8"
                        fill="white"
                        stroke={selectedAttraction === attraction.name ? "#f43f5e" : "#0ea5e9"}
                        strokeWidth="2"
                      />
                      <text textAnchor="middle" dominantBaseline="central" fontSize="10">
                        {getAttractionIcon(attraction.type)}
                      </text>
                    </g>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{attraction.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}

              {/* Roads */}
              <path
                d="M100,100 C120,120 140,130 150,150 M150,150 C160,170 170,190 180,180"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="2"
                fill="none"
              />
              <path
                d="M150,150 C130,160 110,170 90,150"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="2"
                fill="none"
              />

              {/* Map Legend */}
              <g transform="translate(20, 240)">
                <rect x="0" y="0" width="120" height="50" fill="white" stroke="#e2e8f0" strokeWidth="1" rx="4" />
                <text x="10" y="15" fontSize="10" fontWeight="bold">
                  Legend
                </text>
                <circle cx="15" cy="30" r="4" fill="#1e293b" />
                <text x="25" y="33" fontSize="8">
                  Major City
                </text>
                <circle cx="65" cy="30" r="3" fill="#64748b" />
                <text x="75" y="33" fontSize="8">
                  Town
                </text>
                <text x="10" y="45" fontSize="8">
                  🌳 Nature
                </text>
                <text x="60" y="45" fontSize="8">
                  🏛️ Cultural
                </text>
              </g>
            </svg>
          </TooltipProvider>
        </div>

        {/* Attraction Details */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-bold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Points of Interest
              </h4>

              <div className="mt-4 space-y-3">
                {displayAttractions.map((attraction, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md border transition-colors cursor-pointer ${
                      selectedAttraction === attraction.name ? "bg-primary/10 border-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedAttraction(attraction.name)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium">{attraction.name}</h5>
                      <Badge variant="outline">{attraction.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{attraction.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Button size="sm" className="w-full" variant="outline">
                  <Info className="h-4 w-4 mr-2" />
                  View All Attractions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
