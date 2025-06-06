import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Globe, Star, Share2, Heart, Clock, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ImageGallery from "@/components/image-gallery"
import ReviewSection from "@/components/review-section"
import ProviderNavigation from "@/components/provider-navigation"
import { allProviders, regions } from "@/lib/data"
import { notFound } from "next/navigation"
import GoogleMapsEswatini from "@/components/google-maps-eswatini"

// Make sure the page title and metadata reflect the specific provider
import type { Metadata } from "next"
import BackButton from "@/components/back-button"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const provider = allProviders.find((p) => p.id === params.id)

  if (!provider) {
    return {
      title: "Provider Not Found | Visit Eswatini",
      description: "The requested service provider could not be found.",
    }
  }

  return {
    title: `${provider.name} | Visit Eswatini`,
    description: provider.description,
  }
}

export default function ProviderPage({ params }: { params: { id: string } }) {
  const provider = allProviders.find((p) => p.id === params.id)

  if (!provider) {
    notFound()
  }

  const providerRegion = regions.find((r) => r.slug === provider.region)

  // Get provider-specific images
  const getProviderImages = (providerId: string) => {
    if (providerId === "hlane-royal-national-park") {
      return [
        "/images/hlane-royal-park.jpeg",
        "/images/hlane-lion.jpeg",
        "/images/hlane-room.jpeg",
        "/images/hlane-accommodation.jpeg",
      ]
    } else if (providerId === "royal-swazi-spa" || providerId === "featured-provider") {
      return ["/images/hilton-exterior.jpeg", "/images/hilton-lobby.jpeg", "/images/hilton-atrium.jpeg"]
    } else {
      // Default placeholder images
      return Array(5)
        .fill(0)
        .map((_, i) => `/placeholder.svg?height=600&width=800&text=${provider.name}+Image+${i + 1}`)
    }
  }

  const providerImages = getProviderImages(provider.id)

  // Extract coordinates for the provider location
  // Note: In a real app, these would come from your database
  const getProviderCoordinates = () => {
    // Check if we have specific coordinates for this provider
    const specificProviders: Record<string, { lat: number; lng: number }> = {
      "hlane-royal-national-park": { lat: -26.3, lng: 31.8333 },
      "royal-swazi-spa": { lat: -26.4167, lng: 31.2 },
      "mantenga-cultural-village": { lat: -26.45, lng: 31.2 },
      "mlilwane-wildlife-sanctuary": { lat: -26.4833, lng: 31.1833 },
      "swazi-candles": { lat: -26.55, lng: 31.1833 },
      "shewula-mountain-camp": { lat: -26.1167, lng: 31.9 },
    }

    if (specificProviders[provider.id]) {
      return specificProviders[provider.id]
    }

    // If no specific coordinates, use region center
    const regionCenters: Record<string, { lat: number; lng: number }> = {
      hhohho: { lat: -26.3208, lng: 31.1367 },
      manzini: { lat: -26.4833, lng: 31.3667 },
      lubombo: { lat: -26.35, lng: 31.85 },
      shiselweni: { lat: -26.85, lng: 31.2 },
    }

    return regionCenters[provider.region] || { lat: -26.5225, lng: 31.4659 }
  }

  const coordinates = getProviderCoordinates()

  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Image Gallery */}
      <ImageGallery provider={provider} images={providerImages} />

      {/* Provider Navigation */}
      <ProviderNavigation providerId={provider.id} />

      {/* Provider Details */}
      <section className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{provider.name}</h1>
                <div className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">
                    {provider.location}, {providerRegion?.name} Region
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-muted">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-muted">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(provider.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
              </div>
              <span className="ml-2 font-medium">{provider.rating.toFixed(1)}</span>
              <span className="ml-1 text-muted-foreground">({provider.reviewCount} reviews)</span>
            </div>

            {/* About Section */}
            <div id="about" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-primary/10 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </span>
                About
              </h2>
              <div className="pl-12">
                <p className="text-muted-foreground">{provider.description}</p>

                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-medium mb-2">Location Highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span>
                        {provider.region === "hhohho"
                          ? "Near Mbabane city center"
                          : provider.region === "lubombo"
                            ? "Close to wildlife viewing areas"
                            : provider.region === "manzini"
                              ? "Central location"
                              : "Scenic mountain views"}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <span>
                        {provider.category === "accommodation"
                          ? "On-site parking"
                          : provider.category === "adventure"
                            ? "Guided tours available"
                            : provider.category === "cultural"
                              ? "Cultural demonstrations"
                              : "Family-friendly"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Location Map Section */}
            <div id="location-map" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-primary/10 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </span>
                Location
              </h2>
              <div className="pl-12">
                <GoogleMapsEswatini
                  height="400px"
                  zoom={14}
                  showControls={true}
                  destination={{
                    name: provider.name,
                    lat: coordinates.lat,
                    lng: coordinates.lng,
                  }}
                />
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-medium mb-2">Location Details</h3>
                  <p className="text-sm text-muted-foreground">
                    {provider.name} is located in {provider.location}, {providerRegion?.name} Region.
                    {provider.category === "accommodation" && " Easily accessible with on-site parking available."}
                    {provider.category === "adventure" &&
                      " Perfect location for outdoor activities and nature exploration."}
                    {provider.category === "cultural" &&
                      " Situated in an area rich with cultural heritage and traditional sites."}
                    {provider.category === "dining" && " Conveniently located with easy access to local attractions."}
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div id="amenities" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-primary/10 p-2 rounded-full mr-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </span>
                Amenities
              </h2>
              <div className="pl-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {provider.amenities?.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-muted/20 rounded-lg">
                      <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services & Activities Section */}
            <div id="services" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-primary/10 p-2 rounded-full mr-3">
                  <Star className="h-5 w-5 text-primary" />
                </span>
                Services & Activities
              </h2>
              <div className="pl-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {provider.services?.map((service: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">{service}</p>
                        <p className="text-sm text-muted-foreground">
                          {index % 2 === 0 ? "Available daily" : "Reservation required"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {provider.category === "adventure" && (
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-medium mb-2 text-primary">Special Activities</h3>
                    <p className="text-sm">
                      Book our special guided tours for an unforgettable experience. Early booking is recommended as
                      spaces are limited.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Opening Hours Section */}
            <div id="hours" className="mb-12 scroll-mt-32">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-primary/10 p-2 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-primary" />
                </span>
                Opening Hours
              </h2>
              <div className="pl-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="font-medium">Monday - Friday</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="font-medium">Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="font-medium">Sunday</span>
                    <span>10:00 AM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/20 rounded-lg">
                    <span className="font-medium">Public Holidays</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                </div>

                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-1">Special Notice</h3>
                  <p className="text-sm text-yellow-700">
                    Hours may vary during major holidays and festivals. Please call ahead to confirm opening times
                    during these periods.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Tabs for Reviews */}
            <Tabs defaultValue="reviews" className="mt-8">
              <TabsList className="w-full">
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="reviews" className="py-4">
                <ReviewSection providerId={provider.id} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            <div className="sticky top-32">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Quick Info</h3>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Price Range</p>
                    <p className="text-2xl font-bold">
                      {provider.price > 0 ? `From E${provider.price}/night` : "Free"}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{provider.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{provider.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={provider.website} className="text-primary hover:underline">
                          {provider.website?.replace("https://", "")}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Providers */}
      <section className="container mx-auto py-8 px-4 border-t">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProviders
            .filter((p) => p.id !== provider.id && p.category === provider.category)
            .slice(0, 3)
            .map((relatedProvider) => (
              <div key={relatedProvider.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=300&width=500&text=${relatedProvider.name}`}
                    alt={relatedProvider.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">{relatedProvider.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm ml-1">{relatedProvider.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{relatedProvider.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-medium">
                      {relatedProvider.price > 0 ? `E${relatedProvider.price}` : "Free"}
                    </span>
                    <a
                      href={`/providers/${relatedProvider.id}`}
                      className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary/90"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
