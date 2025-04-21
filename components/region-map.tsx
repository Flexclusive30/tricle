"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { regions } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function RegionMap() {
  const router = useRouter()
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  const handleRegionClick = (slug: string) => {
    router.push(`/regions/${slug}`)
  }

  const handleRegionHover = (slug: string | null) => {
    setActiveRegion(slug)
  }

  // Define colors for each region
  const regionColors = {
    hhohho: "#ec4899", // Pink
    manzini: "#22c55e", // Green
    lubombo: "#eab308", // Yellow/Amber
    shiselweni: "#ec4899", // Pink
  }

  // Get region data by slug
  const getRegionData = (slug: string) => {
    return regions.find((region) => region.slug === slug)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center">
      {/* Map Container */}
      <div className="w-full lg:w-2/3 relative">
        <TooltipProvider>
          <svg
            viewBox="0 0 500 500"
            className="w-full h-auto border rounded-lg shadow-md"
            style={{ backgroundColor: "#f0f4f8" }}
          >
            {/* Background - simplified outline of Eswatini */}
            <path
              d="M120,100 C150,80 200,70 250,80 C300,90 350,120 380,150 C410,180 430,220 440,270 C450,320 440,370 420,410 C400,450 360,470 320,480 C280,490 230,485 190,470 C150,455 120,430 100,390 C80,350 70,300 80,250 C90,200 100,150 120,100 Z"
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="2"
            />

            {/* Hhohho Region - Northwestern */}
            <path
              d="M120,100 C150,80 200,70 250,80 C270,85 290,95 310,110 C280,130 260,160 250,200 C240,240 220,260 190,270 C160,280 130,270 110,250 C90,230 80,200 80,170 C80,140 90,120 120,100 Z"
              fill={activeRegion === "hhohho" ? regionColors.hhohho : "#ffd1ec"}
              stroke="#be185d"
              strokeWidth="2"
              style={{ cursor: "pointer", transition: "fill 0.3s ease" }}
              onClick={() => handleRegionClick("hhohho")}
              onMouseEnter={() => handleRegionHover("hhohho")}
              onMouseLeave={() => handleRegionHover(null)}
            />
            <text x="160" y="170" fill="#1e293b" fontWeight="bold" fontSize="14" pointerEvents="none">
              Hhohho
            </text>

            {/* Manzini Region - Southwestern */}
            <path
              d="M110,250 C130,270 160,280 190,270 C220,260 240,240 250,200 C260,240 280,270 310,290 C340,310 350,340 350,370 C350,400 330,420 300,430 C270,440 230,440 200,430 C170,420 140,400 120,370 C100,340 100,290 110,250 Z"
              fill={activeRegion === "manzini" ? regionColors.manzini : "#d1fae5"}
              stroke="#15803d"
              strokeWidth="2"
              style={{ cursor: "pointer", transition: "fill 0.3s ease" }}
              onClick={() => handleRegionClick("manzini")}
              onMouseEnter={() => handleRegionHover("manzini")}
              onMouseLeave={() => handleRegionHover(null)}
            />
            <text x="200" y="340" fill="#1e293b" fontWeight="bold" fontSize="14" pointerEvents="none">
              Manzini
            </text>

            {/* Lubombo Region - Eastern */}
            <path
              d="M310,110 C330,125 350,145 370,170 C390,195 405,225 415,260 C425,295 425,330 415,360 C405,390 385,410 350,420 C350,390 340,360 310,330 C280,300 260,270 250,230 C260,190 280,150 310,110 Z"
              fill={activeRegion === "lubombo" ? regionColors.lubombo : "#fef3c7"}
              stroke="#a16207"
              strokeWidth="2"
              style={{ cursor: "pointer", transition: "fill 0.3s ease" }}
              onClick={() => handleRegionClick("lubombo")}
              onMouseEnter={() => handleRegionHover("lubombo")}
              onMouseLeave={() => handleRegionHover(null)}
            />
            <text x="350" y="250" fill="#1e293b" fontWeight="bold" fontSize="14" pointerEvents="none">
              Lubombo
            </text>

            {/* Shiselweni Region - Southern */}
            <path
              d="M120,370 C140,400 170,420 200,430 C230,440 270,440 300,430 C330,420 350,400 350,370 C380,380 400,400 410,430 C420,460 410,480 390,490 C370,500 340,500 300,490 C260,480 220,460 190,430 C160,400 140,380 120,370 Z"
              fill={activeRegion === "shiselweni" ? regionColors.shiselweni : "#ffd1ec"}
              stroke="#be185d"
              strokeWidth="2"
              style={{ cursor: "pointer", transition: "fill 0.3s ease" }}
              onClick={() => handleRegionClick("shiselweni")}
              onMouseEnter={() => handleRegionHover("shiselweni")}
              onMouseLeave={() => handleRegionHover(null)}
            />
            <text x="250" y="450" fill="#1e293b" fontWeight="bold" fontSize="14" pointerEvents="none">
              Shiselweni
            </text>

            {/* Major Cities/Points */}
            <Tooltip>
              <TooltipTrigger asChild>
                <circle cx="180" cy="150" r="6" fill="#1e293b" style={{ cursor: "pointer" }} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Mbabane (Capital)</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <circle cx="220" cy="280" r="5" fill="#1e293b" style={{ cursor: "pointer" }} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Manzini</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <circle cx="350" cy="300" r="5" fill="#1e293b" style={{ cursor: "pointer" }} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Big Bend</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <circle cx="250" cy="400" r="5" fill="#1e293b" style={{ cursor: "pointer" }} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Nhlangano</p>
              </TooltipContent>
            </Tooltip>

            {/* Compass Rose */}
            <g transform="translate(430, 120)">
              <circle cx="0" cy="0" r="20" fill="white" stroke="#64748b" strokeWidth="1" />
              <path d="M0,-18 L0,18 M-18,0 L18,0" stroke="#64748b" strokeWidth="1" />
              <text x="0" y="-22" textAnchor="middle" fill="#64748b" fontSize="12">
                N
              </text>
              <text x="22" y="0" textAnchor="middle" fill="#64748b" fontSize="12">
                E
              </text>
              <text x="0" y="27" textAnchor="middle" fill="#64748b" fontSize="12">
                S
              </text>
              <text x="-22" y="0" textAnchor="middle" fill="#64748b" fontSize="12">
                W
              </text>
            </g>

            {/* Scale Bar */}
            <g transform="translate(100, 450)">
              <rect x="0" y="0" width="100" height="5" fill="#64748b" />
              <text x="50" y="20" textAnchor="middle" fill="#64748b" fontSize="10">
                50 km
              </text>
            </g>

            {/* Map Title */}
            <text x="250" y="40" textAnchor="middle" fill="#1e293b" fontWeight="bold" fontSize="18">
              Kingdom of Eswatini
            </text>
            <text x="250" y="60" textAnchor="middle" fill="#64748b" fontSize="12">
              Regional Map
            </text>

            {/* Neighboring Countries */}
            <text x="100" y="70" fill="#94a3b8" fontSize="10" fontStyle="italic">
              South Africa
            </text>
            <text x="400" y="150" fill="#94a3b8" fontSize="10" fontStyle="italic">
              Mozambique
            </text>
            <text x="100" y="430" fill="#94a3b8" fontSize="10" fontStyle="italic">
              South Africa
            </text>
          </svg>
        </TooltipProvider>
      </div>

      {/* Region Information */}
      <div className="w-full lg:w-1/3">
        <Card className="h-full">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Regions of Eswatini</h2>
            <p className="text-muted-foreground mb-6">
              Eswatini is divided into four administrative regions, each with its own unique landscapes, attractions,
              and cultural experiences.
            </p>

            <div className="space-y-4">
              {regions.map((region) => (
                <div
                  key={region.slug}
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    activeRegion === region.slug ? "bg-primary/10 border-primary" : "hover:bg-muted"
                  }`}
                  onClick={() => handleRegionClick(region.slug)}
                  onMouseEnter={() => handleRegionHover(region.slug)}
                  onMouseLeave={() => handleRegionHover(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{region.name}</h3>
                    <Badge
                      style={{
                        backgroundColor: activeRegion === region.slug ? (regionColors as any)[region.slug] : undefined,
                      }}
                    >
                      {region.tagline}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{region.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
