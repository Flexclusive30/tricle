import Link from "next/link"
import { Button } from "@/components/ui/button"
;("use client")

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import CategoryGrid from "@/components/category-grid"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ImageCarousel from "@/components/image-carousel"
import Image from "next/image"
import SplashScreen from "@/components/splash-screen"
import { regions } from "@/lib/data"
import { Music } from "lucide-react"
import { allProviders, getFeaturedEvents } from "@/lib/data"
import AnimatedProviderCard from "@/components/animated-provider-card"
import GoogleMapsEswatini from "@/components/google-maps-eswatini"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [splashChecked, setSplashChecked] = useState(false)

  // Get featured events for homepage
  const featuredEvents = getFeaturedEvents()

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

  return (
    <main className="min-h-screen pb-20">
      {/* Static Hero Header - BUTTONS REMOVED */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hlane-royal-park.jpeg"
            alt="Eswatini Hlane Royal National Park"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Visit Eswatini</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Experience the beauty, culture, and adventure of Africa's hidden gem
            </p>
          </div>
        </div>
      </section>
      {/* Scrolling Image Carousel */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Experience Eswatini</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8">
            From breathtaking landscapes and wildlife encounters to vibrant cultural celebrations, Eswatini offers
            unforgettable experiences for every traveler.
          </p>

          <ImageCarousel images={carouselImages} height="h-[500px]" />
        </div>
      </section>
      {/* Navigation Bar */}
      <Navbar />
      {/* Search Section */}
      <section className="container mx-auto py-12 px-4">
        <div className="relative max-w-3xl mx-auto">
          <Input
            type="text"
            placeholder="Search for accommodations, tours, activities..."
            className="pl-4 pr-10 py-6 text-lg rounded-lg shadow-md"
          />
          <Button
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <Button variant="outline" size="sm">
            Accommodations
          </Button>
          <Button variant="outline" size="sm">
            Tours
          </Button>
          <Button variant="outline" size="sm">
            Cultural Sites
          </Button>
          <Button variant="outline" size="sm">
            Adventure
          </Button>
          <Button variant="outline" size="sm">
            Dining
          </Button>
        </div>
      </section>
      {/* Featured Experiences - MOVED UP */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/providers/hlane-royal-national-park" className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/hlane-royal-park.jpeg"
                  alt="Hlane Royal National Park"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">Hlane Royal National Park</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm ml-1">(4.9)</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  Experience Eswatini's largest protected area, home to lions, elephants, and rhinos.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">From E200</span>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/providers/royal-swazi-spa" className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/hilton-exterior.jpeg"
                  alt="Hilton Mbabane"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">Hilton Mbabane</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm ml-1">(4.8)</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  Luxury accommodation in the heart of Mbabane with stunning mountain views.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">From E1500</span>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/providers/mantenga-cultural-village" className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/hlane-accommodation.jpeg"
                  alt="Traditional Swazi Accommodation"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">Mantenga Cultural Village</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★★★★☆</span>
                    <span className="text-sm ml-1">(4.7)</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  Experience traditional Swazi culture through dance performances and village tours.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">From E250</span>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Button size="lg" asChild>
            <Link href="/experiences">View All Experiences</Link>
          </Button>
        </div>
      </section>
      {/* Interactive Map Section - MOVED DOWN */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Eswatini Interactive Map</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8">
          Discover all regions of Eswatini with our interactive map. Click on regions to explore attractions,
          accommodations, and activities.
        </p>

        <div className="max-w-5xl mx-auto">
          <GoogleMapsEswatini height="500px" zoom={8} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {regions.map((region) => (
            <Link href={`/regions/${region.slug}`} key={region.slug} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-1">{region.name} Region</h3>
                  <p className="text-sm text-primary font-medium mb-2">{region.tagline}</p>
                  <p className="text-muted-foreground text-sm mb-4">{region.description}</p>
                  <Button size="sm" className="w-full">
                    Explore {region.name}
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button asChild variant="outline">
            <Link href="/map">View Full Interactive Map</Link>
          </Button>
        </div>
      </section>
      {/* Category Grid with Featured Entertainment */};
      <section className="container mx-auto py-12 px-4 bg-muted/30">
        <h2 className="text-3xl font-bold text-center mb-8">Discover by Category</h2>
        <CategoryGrid />

        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-full">
              <Music className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold">Featured Entertainment</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {allProviders
              .filter((provider) => provider.category === "entertainment")
              .slice(0, 3)
              .map((provider) => (
                <AnimatedProviderCard key={provider.id} provider={provider} />
              ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/entertainment">View All Entertainment</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Events & Festivals - UPDATED TO SHOW ONLY 3 FEATURED EVENTS */}
      <section className="container mx-auto py-12 px-4 bg-muted/30">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events & Festivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-40 overflow-hidden">
                <img src={event.image || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="bg-primary/10 text-primary font-medium px-2 py-1 rounded text-xs">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="ml-2 text-xs text-muted-foreground">{event.time}</div>
                </div>
                <h3 className="font-bold">{event.name}</h3>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{event.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-primary font-medium">{event.price === 0 ? "Free" : `E${event.price}`}</span>
                  <Button size="sm" asChild>
                    <Link href={`/events/${event.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </section>
      {/* Travel Guides */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Travel Essentials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-xl mb-3">Visa Information</h3>
            <p className="text-muted-foreground mb-4">
              Learn about visa requirements for visiting Eswatini from different countries.
            </p>
            <Button variant="outline">Read More</Button>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-xl mb-3">Safety Tips</h3>
            <p className="text-muted-foreground mb-4">
              Essential safety information to ensure a smooth and enjoyable trip to Eswatini.
            </p>
            <Button variant="outline">Read More</Button>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-xl mb-3">Packing Guide</h3>
            <p className="text-muted-foreground mb-4">What to pack for different seasons and activities in Eswatini.</p>
            <Button variant="outline">Read More</Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
