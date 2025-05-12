"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { regions } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"

export default function RegionExplorer() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore by Region</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the unique attractions and experiences in each region of Eswatini
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map visualization */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border shadow-md">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eswatini-regions-and-capital-map.jpg-8pRhxbWrd2qTai5z4ud80k8ADOUXdO.jpeg"
                alt="Map of Eswatini showing regions"
                fill
                className="object-contain"
              />

              {/* Interactive region overlays */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" style={{ pointerEvents: "none" }}>
                {/* These paths are invisible but define the clickable areas */}
                <path
                  d="M100,100 L450,100 L450,350 L350,450 L200,450 L100,350 Z"
                  fill="transparent"
                  style={{ pointerEvents: "all" }}
                  className={`cursor-pointer ${
                    activeRegion === "hhohho" ? "stroke-primary stroke-2" : "stroke-transparent"
                  }`}
                  onClick={() => setActiveRegion("hhohho")}
                  onMouseEnter={() => setActiveRegion("hhohho")}
                  onMouseLeave={() => setActiveRegion(null)}
                />

                <path
                  d="M200,450 L350,450 L450,350 L450,600 L350,700 L200,700 L100,600 L100,350 Z"
                  fill="transparent"
                  style={{ pointerEvents: "all" }}
                  className={`cursor-pointer ${
                    activeRegion === "manzini" ? "stroke-primary stroke-2" : "stroke-transparent"
                  }`}
                  onClick={() => setActiveRegion("manzini")}
                  onMouseEnter={() => setActiveRegion("manzini")}
                  onMouseLeave={() => setActiveRegion(null)}
                />

                <path
                  d="M450,100 L900,100 L900,700 L450,700 L450,350 Z"
                  fill="transparent"
                  style={{ pointerEvents: "all" }}
                  className={`cursor-pointer ${
                    activeRegion === "lubombo" ? "stroke-primary stroke-2" : "stroke-transparent"
                  }`}
                  onClick={() => setActiveRegion("lubombo")}
                  onMouseEnter={() => setActiveRegion("lubombo")}
                  onMouseLeave={() => setActiveRegion(null)}
                />

                <path
                  d="M100,600 L200,700 L350,700 L450,600 L450,900 L100,900 Z"
                  fill="transparent"
                  style={{ pointerEvents: "all" }}
                  className={`cursor-pointer ${
                    activeRegion === "shiselweni" ? "stroke-primary stroke-2" : "stroke-transparent"
                  }`}
                  onClick={() => setActiveRegion("shiselweni")}
                  onMouseEnter={() => setActiveRegion("shiselweni")}
                  onMouseLeave={() => setActiveRegion(null)}
                />
              </svg>

              {/* Colored overlays for visual feedback */}
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  activeRegion === "hhohho" ? "opacity-30" : "opacity-0"
                }`}
                style={{
                  clipPath: "polygon(10% 10%, 45% 10%, 45% 35%, 35% 45%, 20% 45%, 10% 35%)",
                  backgroundColor: "#ec4899",
                  pointerEvents: "none",
                }}
              />

              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  activeRegion === "manzini" ? "opacity-30" : "opacity-0"
                }`}
                style={{
                  clipPath: "polygon(20% 45%, 35% 45%, 45% 35%, 45% 60%, 35% 70%, 20% 70%, 10% 60%, 10% 35%)",
                  backgroundColor: "#22c55e",
                  pointerEvents: "none",
                }}
              />

              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  activeRegion === "lubombo" ? "opacity-30" : "opacity-0"
                }`}
                style={{
                  clipPath: "polygon(45% 10%, 90% 10%, 90% 70%, 45% 70%, 45% 35%)",
                  backgroundColor: "#eab308",
                  pointerEvents: "none",
                }}
              />

              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  activeRegion === "shiselweni" ? "opacity-30" : "opacity-0"
                }`}
                style={{
                  clipPath: "polygon(10% 60%, 20% 70%, 35% 70%, 45% 60%, 45% 90%, 10% 90%)",
                  backgroundColor: "#ec4899",
                  pointerEvents: "none",
                }}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-3">Hover over a region to learn more</p>
          </div>

          {/* Region information */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md h-full">
              {activeRegion ? (
                <>
                  {regions
                    .filter((region) => region.slug === activeRegion)
                    .map((region) => (
                      <div key={region.slug} className="space-y-4">
                        <h3 className="text-2xl font-bold">{region.name} Region</h3>
                        <div className="flex items-center">
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                            {region.tagline}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{region.description}</p>

                        <div className="pt-4">
                          <h4 className="font-medium mb-2">Key Attractions:</h4>
                          <ul className="space-y-2">
                            {region.slug === "hhohho" && (
                              <>
                                <li className="flex items-center">
                                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                                  Mbabane (Capital City)
                                </li>
                                <li className="flex items-center">
                                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                                  Lobamba Royal Village
                                </li>
                                <li className="flex items-center">
                                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                                  Mlilwane Wildlife Sanctuary
                                </li>
                              </>
                            )}
                            {region.slug === "manzini" && (
                              <>
                                <li className="flex items-center">
                                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                                  Manzini City
                                </li>
                                <li className="flex items-center">
                                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                                  Swazi Candles Craft Market
                                </li>
                                <li className="flex items-center">
                                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                                  House on Fire
                                </li>
                              </>
                            )}
                            {region.slug === "lubombo" && (
                              <>
                                <li className="flex items-center">
                                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                                  Hlane Royal National Park
                                </li>
                                <li className="flex items-center">
                                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                                  Mbuluzi Game Reserve
                                </li>
                                <li className="flex items-center">
                                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                                  Lubombo Mountains
                                </li>
                              </>
                            )}
                            {region.slug === "shiselweni" && (
                              <>
                                <li className="flex items-center">
                                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                                  Nhlangano Town
                                </li>
                                <li className="flex items-center">
                                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                                  Mahamba Gorge
                                </li>
                                <li className="flex items-center">
                                  <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                                  Malolotja Nature Reserve
                                </li>
                              </>
                            )}
                          </ul>
                        </div>

                        <div className="pt-4">
                          <Button asChild>
                            <Link href={`/regions/${region.slug}`}>Explore {region.name} Region</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <h3 className="text-xl font-bold">Select a Region</h3>
                  <p className="text-muted-foreground">
                    Hover over or tap on a region on the map to discover more about Eswatini's diverse regions
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {regions.map((region) => (
                      <Button
                        key={region.slug}
                        variant="outline"
                        className="w-full"
                        onMouseEnter={() => setActiveRegion(region.slug)}
                        onMouseLeave={() => setActiveRegion(null)}
                        onClick={() => setActiveRegion(region.slug)}
                      >
                        {region.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
