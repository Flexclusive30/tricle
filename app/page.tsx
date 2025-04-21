"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Navbar from "@/components/navbar"
import ImageCarousel from "@/components/image-carousel"
import SplashScreen from "@/components/splash-screen"
import { providers } from "@/lib/data"
import Footer from "@/components/footer"

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

  return (
    <main className="min-h-screen">
      {/* Static Hero Header - BUTTONS REMOVED */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow">Visit Eswatini</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-shadow">
              Experience the beauty, culture, and adventure of Africa's hidden gem
            </p>
          </div>
        </div>
      </section>
      {/* Scrolling Image Carousel */}
      <section className="py-8 bg-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-shadow">Experience Eswatini</h2>
          <p className="text-center text-foreground max-w-3xl mx-auto mb-8 text-shadow-light">
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
          {/* Update the search input to be more opaque */}
          <Input
            type="text"
            placeholder="Search for accommodations, tours, activities..."
            className="pl-4 pr-10 py-6 text-lg rounded-lg shadow-md bg-white/40 backdrop-blur-sm"
          />
          <Button
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {/* Update the search buttons to be more opaque */}
          <Button variant="outline" size="sm" className="bg-white/20 hover:bg-white/30">
            Accommodations
          </Button>
          <Button variant="outline" size="sm" className="bg-white/20 hover:bg-white/30">
            Tours
          </Button>
          <Button variant="outline" size="sm" className="bg-white/20 hover:bg-white/30">
            Cultural Sites
          </Button>
          <Button variant="outline" size="sm" className="bg-white/20 hover:bg-white/30">
            Adventure
          </Button>
          <Button variant="outline" size="sm" className="bg-white/20 hover:bg-white/30">
            Dining
          </Button>
        </div>
      </section>
      {/* Featured Experiences - MOVED UP */}
      <section className="container mx-auto py-12 px-4 bg-white/20 backdrop-blur-sm rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-shadow">Featured Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href={`/providers/${hlaneProvider?.id || "hlane-royal-national-park"}`} className="group">
            <div className="card-transparent rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/hlane-royal-park.jpeg"
                  alt="Hlane Royal National Park"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-shadow">Hlane Royal National Park</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm ml-1">(4.9)</span>
                  </div>
                </div>
                <p className="text-foreground text-sm mb-3 text-shadow-light">
                  Experience Eswatini's largest protected area, home to lions, elephants, and rhinos.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">From E200</span>
                  <Button size="sm" className="bg-white/50 hover:bg-white/70">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/providers/royal-swazi-spa" className="group">
            <div className="card-transparent rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/hilton-exterior.jpeg"
                  alt="Hilton Mbabane"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-shadow">Hilton Mbabane</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm ml-1">(4.8)</span>
                  </div>
                </div>
                <p className="text-foreground text-sm mb-3 text-shadow-light">
                  Luxury accommodation in the heart of Mbabane with stunning mountain views.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">From E1500</span>
                  <Button size="sm" className="bg-white/50 hover:bg-white/70">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Link>

          <Link href={`/providers/${mantengaProvider?.id || "mantenga-cultural-village"}`} className="group">
            <div className="card-transparent rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/eswatini-cultural.jpg"
                  alt="Mantenga Cultural Village"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-shadow">Mantenga Cultural Village</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm ml-1">(4.8)</span>
                  </div>
                </div>
                <p className="text-foreground text-sm mb-3 text-shadow-light">
                  Experience traditional Swazi culture through dance performances and guided tours.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium">From E250</span>
                  <Button size="sm" className="bg-white/50 hover:bg-white/70">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Explore by Region Section */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Explore by Region</h2>

        {/* Category Navigation Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link href="/categories/all">
            <Button variant="outline" className="bg-white/30 hover:bg-white/50 text-black border-black/20">
              All Categories
            </Button>
          </Link>
          <Link href="/categories/accommodation">
            <Button variant="outline" className="bg-white/30 hover:bg-white/50 text-black border-black/20">
              Accommodation
            </Button>
          </Link>
          <Link href="/categories/tours">
            <Button variant="outline" className="bg-white/30 hover:bg-white/50 text-black border-black/20">
              Tours
            </Button>
          </Link>
          <Link href="/categories/dining">
            <Button variant="outline" className="bg-white/30 hover:bg-white/50 text-black border-black/20">
              Dining
            </Button>
          </Link>
          <Link href="/categories/cultural">
            <Button variant="outline" className="bg-white/30 hover:bg-white/50 text-black border-black/20">
              Cultural Sites
            </Button>
          </Link>
          <Link href="/categories/adventure">
            <Button variant="outline" className="bg-white/30 hover:bg-white/50 text-black border-black/20">
              Adventure
            </Button>
          </Link>
          <Link href="/categories/entertainment">
            <Button variant="outline" className="bg-white/30 hover:bg-white/50 text-black border-black/20">
              Entertainment
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/regions/hhohho" className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
            <img
              src="/images/eswatini-mountains.jpg"
              alt="Hhohho Region"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 w-full">
                <h3 className="text-xl font-bold text-white mb-1">Hhohho</h3>
                <p className="text-sm text-white/90">Cultural heartland with royal residences</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link href="/regions/manzini" className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
            <img
              src="/images/eswatini-landscape.jpg"
              alt="Manzini Region"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 w-full">
                <h3 className="text-xl font-bold text-white mb-1">Manzini</h3>
                <p className="text-sm text-white/90">Commercial hub and largest urban area</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link href="/regions/lubombo" className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
            <img
              src="/images/eswatini-wildlife.jpg"
              alt="Lubombo Region"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 w-full">
                <h3 className="text-xl font-bold text-white mb-1">Lubombo</h3>
                <p className="text-sm text-white/90">Savannah adventures and wildlife reserves</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link href="/regions/shiselweni" className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
            <img
              src="/images/eswatini-village.jpg"
              alt="Shiselweni Region"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 w-full">
                <h3 className="text-xl font-bold text-white mb-1">Shiselweni</h3>
                <p className="text-sm text-white/90">Untamed wilderness with rolling hills and forests</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </section>

      {/* Entertainment Section */}
      <section className="container mx-auto py-12 px-4 bg-white/20 backdrop-blur-sm rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Entertainment</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-transparent rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-eswatini-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-eswatini-blue"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">Traditional Performances</h3>
            <p className="text-black">
              Experience authentic Swazi dance and music performances showcasing the rich cultural heritage.
            </p>
          </div>

          <div className="card-transparent rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-eswatini-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-eswatini-red"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">Live Music</h3>
            <p className="text-black">
              Enjoy contemporary and traditional music at various venues throughout the country.
            </p>
          </div>

          <div className="card-transparent rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-eswatini-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-eswatini-yellow"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">Nightlife</h3>
            <p className="text-black">Discover vibrant bars, clubs and entertainment venues in Mbabane and Manzini.</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Button className="bg-primary hover:bg-primary/90">View All Entertainment Options</Button>
        </div>
      </section>

      {/* Upcoming Events & Festivals */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Upcoming Events & Festivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card-transparent rounded-lg overflow-hidden">
            <div className="p-4 border-b border-white/20">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-black">Umhlanga Reed Dance</h3>
                  <p className="text-sm text-black/70">Annual cultural celebration</p>
                </div>
                <div className="bg-eswatini-red/10 text-eswatini-red px-3 py-1 rounded-full text-sm font-medium">
                  August
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-black mb-4">
                Experience one of Eswatini's most famous cultural events where thousands of young women gather to honor
                the Queen Mother.
              </p>
              <div className="flex items-center text-sm text-black/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Ludzidzini Royal Village
              </div>
            </div>
          </div>

          <div className="card-transparent rounded-lg overflow-hidden">
            <div className="p-4 border-b border-white/20">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-black">Bushfire Festival</h3>
                  <p className="text-sm text-black/70">Music & arts festival</p>
                </div>
                <div className="bg-eswatini-blue/10 text-eswatini-blue px-3 py-1 rounded-full text-sm font-medium">
                  May
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-black mb-4">
                An internationally acclaimed music and arts festival bringing together artists from across Africa and
                beyond.
              </p>
              <div className="flex items-center text-sm text-black/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                House on Fire, Malkerns Valley
              </div>
            </div>
          </div>

          <div className="card-transparent rounded-lg overflow-hidden">
            <div className="p-4 border-b border-white/20">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-black">Incwala Ceremony</h3>
                  <p className="text-sm text-black/70">Sacred kingship ritual</p>
                </div>
                <div className="bg-eswatini-yellow/10 text-eswatini-yellow px-3 py-1 rounded-full text-sm font-medium">
                  December
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-black mb-4">
                A sacred kingship ceremony and the most important cultural event in Eswatini's calendar.
              </p>
              <div className="flex items-center text-sm text-black/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Royal Residence, Lobamba
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" className="bg-white/30 hover:bg-white/40 text-black border-black/20">
            View All Events
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
