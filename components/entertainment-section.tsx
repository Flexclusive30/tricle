"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, Music, Ticket, Utensils, Film } from "lucide-react"
import Link from "next/link"
import AnimatedProviderCard from "@/components/animated-provider-card"
import { allProviders } from "@/lib/data"
import { useState } from "react"

export default function EntertainmentSection() {
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter entertainment providers
  const entertainmentProviders = allProviders.filter((provider) => provider.category === "entertainment")

  // Get a few providers from other entertainment-related categories
  const diningProviders = allProviders.filter((provider) => provider.category === "dining").slice(0, 2)

  // Combine all entertainment options
  const allEntertainmentOptions = [...entertainmentProviders, ...diningProviders]

  // Filter based on active category
  const filteredProviders =
    activeCategory === "all"
      ? allEntertainmentOptions.slice(0, 3)
      : allEntertainmentOptions.filter((provider) => provider.category === activeCategory).slice(0, 3)

  return (
    <section className="container mx-auto py-12 md:py-16 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Entertainment</h2>
          <p className="text-muted-foreground max-w-2xl">
            Experience the vibrant nightlife and entertainment scene across Eswatini
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0" variant="outline">
          <Link href="/entertainment">
            View All Entertainment
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="flex overflow-x-auto scrollbar-hide gap-3 mb-6 pb-2">
        <Button
          variant={activeCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory("all")}
          className="rounded-full"
        >
          All
        </Button>
        <Button
          variant={activeCategory === "entertainment" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory("entertainment")}
          className="rounded-full flex items-center"
        >
          <Music className="mr-1 h-4 w-4" />
          Music & Shows
        </Button>
        <Button
          variant={activeCategory === "dining" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory("dining")}
          className="rounded-full flex items-center"
        >
          <Utensils className="mr-1 h-4 w-4" />
          Dining
        </Button>
        <Button variant="outline" size="sm" className="rounded-full flex items-center">
          <Film className="mr-1 h-4 w-4" />
          Cinema
        </Button>
        <Button variant="outline" size="sm" className="rounded-full flex items-center">
          <Ticket className="mr-1 h-4 w-4" />
          Events
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <AnimatedProviderCard key={provider.id} provider={provider} className="w-full" />
        ))}
      </div>

      <div className="mt-8 p-6 bg-purple-50 rounded-lg border border-purple-100">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/4">
            <h3 className="text-xl font-bold mb-2">Looking for nightlife recommendations?</h3>
            <p className="text-muted-foreground mb-4 md:mb-0">
              Discover the best bars, clubs, and entertainment venues across Eswatini with our curated guides.
            </p>
          </div>
          <div className="md:w-1/4 flex justify-center md:justify-end">
            <Button className="bg-purple-600 hover:bg-purple-700">View Nightlife Guide</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
