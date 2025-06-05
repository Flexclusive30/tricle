import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import BackButton from "@/components/back-button"
import GoogleMapsEswatini from "@/components/google-maps-eswatini"
import Image from "next/image"

const culturalProviders = [
  {
    id: "mantenga-cultural-village",
    name: "Mantenga Cultural Village",
    category: "Cultural Village",
    rating: 4.8,
    reviews: 156,
    price: "E250",
    location: "Ezulwini Valley",
    region: "hhohho",
    hours: "9:00 AM - 5:00 PM",
    image: "/images/hlane-accommodation.jpeg",
    description:
      "Experience traditional Swazi culture through dance performances, crafts demonstrations, and guided village tours.",
    highlights: ["Traditional Dance", "Craft Demonstrations", "Village Tours", "Cultural Workshops"],
  },
  {
    id: "swazi-candles",
    name: "Swazi Candles Craft Center",
    category: "Craft Center",
    rating: 4.6,
    reviews: 124,
    price: "Free",
    location: "Malkerns Valley",
    region: "manzini",
    hours: "8:00 AM - 5:00 PM",
    image: "/images/hilton-atrium.jpeg",
    description:
      "Watch artisans create beautiful handcrafted candles and browse an extensive collection of local crafts and textiles.",
    highlights: ["Candle Making", "Live Demonstrations", "Craft Shopping", "Local Artisans"],
  },
  {
    id: "ngwenya-glass",
    name: "Ngwenya Glass Factory",
    category: "Glass Factory",
    rating: 4.5,
    reviews: 98,
    price: "E50",
    location: "Ngwenya",
    region: "hhohho",
    hours: "8:00 AM - 4:30 PM",
    image: "/images/hilton-lobby.jpeg",
    description:
      "Witness skilled glassblowers create stunning recycled glass art pieces and learn about sustainable craftsmanship.",
    highlights: ["Glass Blowing", "Recycled Art", "Factory Tours", "Sustainable Crafts"],
  },
  {
    id: "lobamba-royal-village",
    name: "Lobamba Royal Village",
    category: "Royal Heritage",
    rating: 4.7,
    reviews: 89,
    price: "E150",
    location: "Lobamba",
    region: "hhohho",
    hours: "9:00 AM - 4:00 PM",
    image: "/images/hlane-room.jpeg",
    description:
      "Visit the spiritual and traditional capital of Eswatini, home to the royal family and important cultural sites.",
    highlights: ["Royal Heritage", "Traditional Architecture", "Cultural History", "Sacred Sites"],
  },
  {
    id: "matsamo-cultural-village",
    name: "Matsamo Cultural Village",
    category: "Cultural Village",
    rating: 4.4,
    reviews: 67,
    price: "E200",
    location: "Matsamo",
    region: "lubombo",
    hours: "8:00 AM - 5:00 PM",
    image: "/images/hilton-exterior.jpeg",
    description:
      "Authentic cultural experience showcasing traditional Swazi lifestyle, customs, and agricultural practices.",
    highlights: ["Traditional Lifestyle", "Agricultural Tours", "Cultural Customs", "Community Experience"],
  },
  {
    id: "mlawula-nature-reserve",
    name: "Mlawula Nature Reserve Cultural Site",
    category: "Heritage Site",
    rating: 4.3,
    reviews: 45,
    price: "E100",
    location: "Mlawula",
    region: "lubombo",
    hours: "6:00 AM - 6:00 PM",
    image: "/images/eswatini-cultural.jpg",
    description:
      "Explore ancient cultural sites and rock art while enjoying the natural beauty of this pristine reserve.",
    highlights: ["Rock Art", "Ancient Sites", "Nature Walks", "Cultural Heritage"],
  },
]

export default function CulturalPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Cultural Experiences in Eswatini</h1>
          <p className="text-muted-foreground">
            Immerse yourself in the rich cultural heritage of Eswatini through traditional villages, craft centers, and
            royal sites.
          </p>
        </div>

        {/* Interactive Map Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cultural Sites Map</h2>
          <p className="text-muted-foreground mb-6">
            Discover cultural attractions across Eswatini. From traditional villages to royal heritage sites and artisan
            workshops.
          </p>
          <GoogleMapsEswatini height="400px" zoom={9} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalProviders.map((cultural) => (
            <Card key={cultural.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={cultural.image || "/placeholder.svg"} alt={cultural.name} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{cultural.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90">
                    {cultural.region === "hhohho"
                      ? "Hhohho"
                      : cultural.region === "manzini"
                        ? "Manzini"
                        : cultural.region === "lubombo"
                          ? "Lubombo"
                          : "Shiselweni"}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{cultural.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{cultural.rating}</span>
                    <span className="text-sm text-muted-foreground">({cultural.reviews})</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{cultural.description}</p>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{cultural.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{cultural.hours}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {cultural.highlights.map((highlight) => (
                    <Badge key={highlight} variant="outline" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3">
                  <div>
                    <span className="font-bold text-primary text-lg">
                      {cultural.price === "Free" ? "Free Entry" : cultural.price}
                    </span>
                    {cultural.price !== "Free" && <span className="text-sm text-muted-foreground">/person</span>}
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/providers/${cultural.id}`}>Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Cultural Festival Calendar</h2>
          <p className="text-muted-foreground mb-6">
            Experience Eswatini's vibrant cultural festivals throughout the year. These events offer unique insights
            into Swazi traditions and customs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Umhlanga Reed Dance</h3>
              <p className="text-sm text-muted-foreground mb-2">August/September</p>
              <p className="text-sm">Annual ceremony where young women gather to pay homage to the Queen Mother.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Incwala Ceremony</h3>
              <p className="text-sm text-muted-foreground mb-2">December/January</p>
              <p className="text-sm">The most sacred national event celebrating kingship and the first fruits.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Explore More of Eswatini</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/categories/accommodation">Places to Stay</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories/adventure">Adventure Activities</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories/dining">Local Cuisine</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/events">Cultural Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
