import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"
import Link from "next/link"
import BackButton from "@/components/back-button"
import GoogleMapsEswatini from "@/components/google-maps-eswatini"
import Image from "next/image"

const accommodationProviders = [
  {
    id: "hilton-mbabane",
    name: "Hilton Garden Inn Mbabane",
    category: "Luxury Hotel",
    rating: 4.8,
    reviews: 245,
    price: "E2,500",
    location: "Mbabane",
    region: "hhohho",
    image: "/images/hilton-exterior.jpeg",
    description: "Luxury accommodation in the heart of Mbabane with stunning mountain views and world-class amenities.",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Fitness Center", "Conference Rooms"],
  },
  {
    id: "royal-swazi-spa",
    name: "Royal Swazi Spa",
    category: "Resort & Spa",
    rating: 4.6,
    reviews: 178,
    price: "E1,800",
    location: "Ezulwini Valley",
    region: "hhohho",
    image: "/images/hilton-lobby.jpeg",
    description: "Luxury resort featuring spa, casino, and championship golf course in the beautiful Ezulwini Valley.",
    amenities: [
      "Spa Services",
      "Golf Course",
      "Casino",
      "Multiple Restaurants",
      "Swimming Pool",
      "Conference Facilities",
    ],
  },
  {
    id: "hlane-royal-lodge",
    name: "Hlane Royal National Park Lodge",
    category: "Safari Lodge",
    rating: 4.7,
    reviews: 156,
    price: "E1,200",
    location: "Hlane National Park",
    region: "lubombo",
    image: "/images/hlane-accommodation.jpeg",
    description:
      "Safari lodge within Hlane Royal National Park offering authentic wildlife experiences and comfortable accommodation.",
    amenities: [
      "Game Drives",
      "Restaurant",
      "Swimming Pool",
      "Wildlife Viewing",
      "Guided Tours",
      "Traditional Accommodation",
    ],
  },
  {
    id: "mantenga-lodge",
    name: "Mantenga Lodge",
    category: "Cultural Lodge",
    rating: 4.5,
    reviews: 134,
    price: "E900",
    location: "Ezulwini Valley",
    region: "hhohho",
    image: "/images/hlane-room.jpeg",
    description:
      "Traditional-style lodge offering cultural experiences with modern comfort in the scenic Ezulwini Valley.",
    amenities: [
      "Cultural Performances",
      "Traditional Architecture",
      "Restaurant",
      "Nature Walks",
      "Craft Shop",
      "Conference Room",
    ],
  },
  {
    id: "shewula-mountain-camp",
    name: "Shewula Mountain Camp",
    category: "Eco Lodge",
    rating: 4.4,
    reviews: 89,
    price: "E650",
    location: "Lubombo Mountains",
    region: "lubombo",
    image: "/images/hilton-atrium.jpeg",
    description: "Community-owned eco-lodge offering stunning mountain views and authentic cultural experiences.",
    amenities: [
      "Mountain Views",
      "Cultural Tours",
      "Hiking Trails",
      "Community Projects",
      "Traditional Meals",
      "Bird Watching",
    ],
  },
  {
    id: "manzini-city-hotel",
    name: "Manzini City Hotel",
    category: "Business Hotel",
    rating: 4.2,
    reviews: 203,
    price: "E800",
    location: "Manzini",
    region: "manzini",
    image: "/images/hilton-exterior.jpeg",
    description:
      "Modern business hotel in the commercial heart of Manzini with excellent facilities for business travelers.",
    amenities: ["Business Center", "Free WiFi", "Restaurant", "Conference Rooms", "Fitness Center", "Airport Shuttle"],
  },
]

export default function AccommodationPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Accommodation in Eswatini</h1>
          <p className="text-muted-foreground">
            From luxury hotels to safari lodges and cultural experiences, find the perfect place to stay in the Kingdom
            of Eswatini.
          </p>
        </div>

        {/* Interactive Map Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Accommodation Locations</h2>
          <p className="text-muted-foreground mb-6">
            Explore accommodation options across all regions of Eswatini. From luxury hotels in Mbabane to safari lodges
            in national parks.
          </p>
          <GoogleMapsEswatini height="400px" zoom={9} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodationProviders.map((accommodation) => (
            <Card key={accommodation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={accommodation.image || "/placeholder.svg"}
                  alt={accommodation.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{accommodation.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90">
                    {accommodation.region === "hhohho"
                      ? "Hhohho"
                      : accommodation.region === "manzini"
                        ? "Manzini"
                        : accommodation.region === "lubombo"
                          ? "Lubombo"
                          : "Shiselweni"}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{accommodation.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{accommodation.rating}</span>
                    <span className="text-sm text-muted-foreground">({accommodation.reviews})</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{accommodation.description}</p>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{accommodation.location}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {accommodation.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {accommodation.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{accommodation.amenities.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3">
                  <div>
                    <span className="text-sm text-muted-foreground">From </span>
                    <span className="font-bold text-primary text-lg">{accommodation.price}</span>
                    <span className="text-sm text-muted-foreground">/night</span>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/providers/${accommodation.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Explore More Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/categories/dining">Restaurants & Dining</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories/cultural">Cultural Experiences</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories/adventure">Adventure Activities</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/entertainment">Entertainment</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
