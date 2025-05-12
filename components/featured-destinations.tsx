"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Featured destinations data
const destinations = [
  {
    id: "mlilwane",
    name: "Mlilwane Wildlife Sanctuary",
    region: "Hhohho",
    description: "Experience close encounters with wildlife in this beautiful sanctuary.",
    image: "/images/eswatini-wildlife.jpg",
    link: "/providers/mlilwane-wildlife-sanctuary",
  },
  {
    id: "mantenga",
    name: "Mantenga Cultural Village",
    region: "Ezulwini Valley",
    description: "Immerse yourself in traditional Swazi culture and performances.",
    image: "/images/eswatini-cultural.jpg",
    link: "/providers/mantenga-cultural-village",
  },
  {
    id: "hlane",
    name: "Hlane Royal National Park",
    region: "Lubombo",
    description: "Eswatini's largest protected area, home to lions, elephants and rhinos.",
    image: "/images/hlane-lion.jpeg",
    link: "/providers/hlane-royal-national-park",
  },
  {
    id: "swazi-candles",
    name: "Swazi Candles Craft Market",
    region: "Malkerns Valley",
    description: "Shop for handcrafted souvenirs and watch artisans at work.",
    image: "/images/eswatini-village.jpg",
    link: "/providers/swazi-candles",
  },
]

export default function FeaturedDestinations() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="container mx-auto py-12 md:py-16 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Destinations</h2>
          <p className="text-muted-foreground max-w-2xl">
            Discover these must-visit attractions during your stay in Eswatini
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0" variant="outline">
          <Link href="/categories/all">
            View All Destinations
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {destinations.map((destination) => (
          <Link href={destination.link} key={destination.id}>
            <Card
              className="overflow-hidden h-full group cursor-pointer transition-all duration-300 hover:shadow-lg"
              onMouseEnter={() => setHoveredCard(destination.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredCard === destination.id ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg mb-1">{destination.name}</h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{destination.region}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{destination.description}</p>
                <div
                  className={`mt-3 text-primary text-sm font-medium flex items-center transition-all duration-300 ${
                    hoveredCard === destination.id ? "translate-x-2" : ""
                  }`}
                >
                  Explore
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
