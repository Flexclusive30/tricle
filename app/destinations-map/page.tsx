"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import InteractiveMap from "@/components/interactive-map"
import BackButton from "@/components/back-button"
import { Button } from "@/components/ui/button"
import { MapPin, Filter } from "lucide-react"

export default function DestinationsMapPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Destinations Map</h1>
          <p className="text-muted-foreground">
            Explore all attractions and destinations across the Kingdom of Eswatini
          </p>
        </div>
      </section>

      {/* Map Filters */}
      <section className="container mx-auto py-6 px-4">
        <div className="flex flex-wrap gap-3 mb-6">
          <Button variant="outline" size="sm" className="rounded-full">
            <Filter className="h-4 w-4 mr-2" />
            All Destinations
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <MapPin className="h-4 w-4 mr-2" />
            Attractions
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <MapPin className="h-4 w-4 mr-2" />
            Accommodations
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <MapPin className="h-4 w-4 mr-2" />
            Dining
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <MapPin className="h-4 w-4 mr-2" />
            Shopping
          </Button>
        </div>
      </section>

      {/* Full Map */}
      <section className="container mx-auto py-6 px-4 mb-12">
        <div className="h-[600px] md:h-[700px]">
          <InteractiveMap />
        </div>
      </section>

      <Footer />
    </main>
  )
}
