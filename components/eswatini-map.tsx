"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { regions } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function EswatiniMap() {
  const router = useRouter()
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  const handleRegionClick = (slug: string) => {
    router.push(`/regions/${slug}`)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Map Container */}
      <div className="w-full lg:w-2/3 relative">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md border">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eswatini-regions-and-capital-map.jpg-8pRhxbWrd2qTai5z4ud80k8ADOUXdO.jpeg"
            alt="Map of Eswatini showing regions and major cities"
            fill
            className="object-contain"
            priority
          />

          {/* Interactive region overlays - more accurately mapped to the image */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" style={{ pointerEvents: "none" }}>
            {/* These paths are invisible but define the clickable areas */}
            <path
              d="M100,100 L450,100 L450,350 L350,450 L200,450 L100,350 Z"
              fill="transparent"
              style={{ pointerEvents: "all" }}
              className={`cursor-pointer ${activeRegion === "hhohho" ? "stroke-primary stroke-2" : "stroke-transparent"}`}
              onClick={() => handleRegionClick("hhohho")}
              onMouseEnter={() => setActiveRegion("hhohho")}
              onMouseLeave={() => setActiveRegion(null)}
            />

            <path
              d="M200,450 L350,450 L450,350 L450,600 L350,700 L200,700 L100,600 L100,350 Z"
              fill="transparent"
              style={{ pointerEvents: "all" }}
              className={`cursor-pointer ${activeRegion === "manzini" ? "stroke-primary stroke-2" : "stroke-transparent"}`}
              onClick={() => handleRegionClick("manzini")}
              onMouseEnter={() => setActiveRegion("manzini")}
              onMouseLeave={() => setActiveRegion(null)}
            />

            <path
              d="M450,100 L900,100 L900,700 L450,700 L450,350 Z"
              fill="transparent"
              style={{ pointerEvents: "all" }}
              className={`cursor-pointer ${activeRegion === "lubombo" ? "stroke-primary stroke-2" : "stroke-transparent"}`}
              onClick={() => handleRegionClick("lubombo")}
              onMouseEnter={() => setActiveRegion("lubombo")}
              onMouseLeave={() => setActiveRegion(null)}
            />

            <path
              d="M100,600 L200,700 L350,700 L450,600 L450,900 L100,900 Z"
              fill="transparent"
              style={{ pointerEvents: "all" }}
              className={`cursor-pointer ${activeRegion === "shiselweni" ? "stroke-primary stroke-2" : "stroke-transparent"}`}
              onClick={() => handleRegionClick("shiselweni")}
              onMouseEnter={() => setActiveRegion("shiselweni")}
              onMouseLeave={() => setActiveRegion(null)}
            />
          </svg>

          {/* Colored overlays for visual feedback */}
          <div
            className={`absolute inset-0 transition-opacity duration-200 ${activeRegion === "hhohho" ? "opacity-30" : "opacity-0"}`}
            style={{
              clipPath: "polygon(10% 10%, 45% 10%, 45% 35%, 35% 45%, 20% 45%, 10% 35%)",
              backgroundColor: "#ec4899",
              pointerEvents: "none",
            }}
          />

          <div
            className={`absolute inset-0 transition-opacity duration-200 ${activeRegion === "manzini" ? "opacity-30" : "opacity-0"}`}
            style={{
              clipPath: "polygon(20% 45%, 35% 45%, 45% 35%, 45% 60%, 35% 70%, 20% 70%, 10% 60%, 10% 35%)",
              backgroundColor: "#22c55e",
              pointerEvents: "none",
            }}
          />

          <div
            className={`absolute inset-0 transition-opacity duration-200 ${activeRegion === "lubombo" ? "opacity-30" : "opacity-0"}`}
            style={{
              clipPath: "polygon(45% 10%, 90% 10%, 90% 70%, 45% 70%, 45% 35%)",
              backgroundColor: "#eab308",
              pointerEvents: "none",
            }}
          />

          <div
            className={`absolute inset-0 transition-opacity duration-200 ${activeRegion === "shiselweni" ? "opacity-30" : "opacity-0"}`}
            style={{
              clipPath: "polygon(10% 60%, 20% 70%, 35% 70%, 45% 60%, 45% 90%, 10% 90%)",
              backgroundColor: "#ec4899",
              pointerEvents: "none",
            }}
          />
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">Click on a region to explore in detail</div>
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
                  onMouseEnter={() => setActiveRegion(region.slug)}
                  onMouseLeave={() => setActiveRegion(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{region.name}</h3>
                    <Badge
                      style={{
                        backgroundColor:
                          activeRegion === region.slug
                            ? region.slug === "hhohho" || region.slug === "shiselweni"
                              ? "#ec4899"
                              : region.slug === "manzini"
                                ? "#22c55e"
                                : "#eab308"
                            : undefined,
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
