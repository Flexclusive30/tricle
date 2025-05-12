"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import HeroBanner from "@/components/hero-banner"
import CategoryGrid from "@/components/category-grid"
import AnimatedProviderCard from "@/components/animated-provider-card"
import { categories, providers, featuredProvider } from "@/lib/data"
import { useState, useEffect } from "react"
import SplashScreen from "@/components/splash-screen"
import HeroImage from "@/components/hero-image"
import FeaturedDestinations from "@/components/featured-destinations"
import RegionExplorer from "@/components/region-explorer"
import EntertainmentSection from "@/components/entertainment-section"
import EventsSection from "@/components/events-section"
import TestimonialsSection from "@/components/testimonials-section"
import ShareExperienceSection from "@/components/share-experience-section"
import InteractiveMap from "@/components/interactive-map"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [splashChecked, setSplashChecked] = useState(false)

  // Check if splash screen should be shown (on initial load or refresh)
  useEffect(() => {
    // Only run this effect once the component has mounted
    if (typeof window !== "undefined") {
      // Check if this is a page refresh or initial load
      const shouldShowSplash =
        !sessionStorage.getItem("splashShown") || performance.navigation?.type === 1 || document.referrer === ""

      setShowSplash(shouldShowSplash)
      setSplashChecked(true)

      // Set up event listener for page refresh
      const handleBeforeUnload = () => {
        // Clear the flag when the page is refreshed
        sessionStorage.removeItem("splashShown")
      }

      window.addEventListener("beforeunload", handleBeforeUnload)

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload)
      }
    }
  }, [])

  // Carousel images
  const carouselImages = [
    { src: "/images/eswatini-landscape.jpg", alt: "Beautiful landscapes of Eswatini" },
    { src: "/images/hlane-lion.jpeg", alt: "Lion at Hlane Royal National Park" },
    { src: "/images/eswatini-cultural.jpg", alt: "Traditional Swazi cultural ceremony" },
    { src: "/images/hilton-exterior.jpeg", alt: "Hilton Hotel Eswatini" },
    { src: "/images/eswatini-wildlife.jpg", alt: "Wildlife in Eswatini's national parks" },
    { src: "/images/hlane-accommodation.jpeg", alt: "Traditional Accommodation" },
    { src: "/images/eswatini-safari.jpg", alt: "Safari experience in Eswatini" },
    { src: "/images/hilton-lobby.jpeg", alt: "Luxury Hotel Lobby" },
    { src: "/images/eswatini-mountains.jpg", alt: "Mountain ranges of Eswatini" },
    { src: "/images/hlane-room.jpeg", alt: "Safari Lodge Room" },
    { src: "/images/eswatini-village.jpg", alt: "Traditional Swazi village" },
  ]

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setShowSplash(false)
    // Mark that splash has been shown for this session
    sessionStorage.setItem("splashShown", "true")
  }

  // Don't render anything until we've checked if splash should be shown
  if (!splashChecked) {
    return null
  }

  // Prevent content from rendering until splash animation is complete
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  // Find the correct provider IDs
  const hlaneProvider = providers.find((p) => p.name.includes("Hlane"))
  const royalSpaProvider = providers.find((p) => p.name.includes("Royal Swazi Spa"))
  const mantengaProvider = providers.find((p) => p.name.includes("Mantenga"))

  // Featured providers for each category
  const featuredProviders = categories.map((category) => {
    return providers.find((provider) => provider.category === category.slug) || providers[0]
  })

  return (
    <main className="min-h-screen">
      {/* Hero Image */}
      <HeroImage />

      {/* Hero Banner (Carousel) */}
      <HeroBanner />

      {/* Featured Destinations */}
      <FeaturedDestinations />

      {/* Interactive Map */}
      <section className="container mx-auto py-12 md:py-16 px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore Destinations on Map</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the locations of Eswatini's top attractions and plan your journey
          </p>
        </div>

        <InteractiveMap />
      </section>

      {/* Explore by Region */}
      <RegionExplorer />

      {/* Entertainment Section */}
      <EntertainmentSection />

      {/* Upcoming Events & Festivals */}
      <EventsSection />

      {/* What People Say */}
      <TestimonialsSection />

      {/* Share Your Experience */}
      <ShareExperienceSection />

      {/* Categories Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Eswatini</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the best attractions, accommodations, and experiences across the Kingdom of Eswatini.
          </p>
        </div>

        <CategoryGrid />

        <div className="text-center mt-8">
          <Button asChild size="lg">
            <Link href="/categories/all">View All Categories</Link>
          </Button>
        </div>
      </section>

      {/* Featured Provider */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Provider</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience luxury and comfort at our top-rated accommodation in Mbabane.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <AnimatedProviderCard provider={featuredProvider} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
