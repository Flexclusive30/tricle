import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Users, Mountain, Waves } from "lucide-react"
import Link from "next/link"
import BackButton from "@/components/back-button"
import GoogleMapsEswatini from "@/components/google-maps-eswatini"
import Image from "next/image"

const adventureProviders = [
  {
    id: "hlane-royal-national-park",
    name: "Hlane Royal National Park",
    category: "Wildlife Safari",
    rating: 4.9,
    reviews: 187,
    price: "E200",
    location: "Lubombo Region",
    region: "lubombo",
    duration: "Full Day",
    difficulty: "Easy",
    image: "/images/hlane-royal-park.jpeg",
    description:
      "Experience Eswatini's largest protected area with lions, elephants, rhinos, and diverse birdlife on guided game drives.",
    activities: ["Game Drives", "Bush Walks", "Bird Watching", "Rhino Tracking"],
  },
  {
    id: "mlilwane-wildlife-sanctuary",
    name: "Mlilwane Wildlife Sanctuary",
    category: "Multi-Activity",
    rating: 4.7,
    reviews: 203,
    price: "E150",
    location: "Ezulwini Valley",
    region: "hhohho",
    duration: "Half/Full Day",
    difficulty: "Easy to Moderate",
    image: "/images/eswatini-wildlife.jpg",
    description:
      "Eswatini's oldest protected area offering wildlife viewing, hiking, mountain biking, and horseback riding.",
    activities: ["Horseback Safari", "Mountain Biking", "Hiking", "Wildlife Viewing"],
  },
  {
    id: "malolotja-nature-reserve",
    name: "Malolotja Nature Reserve",
    category: "Hiking & Nature",
    rating: 4.8,
    reviews: 145,
    price: "E120",
    location: "Northwestern Eswatini",
    region: "hhohho",
    duration: "Full Day",
    difficulty: "Moderate to Challenging",
    image: "/images/eswatini-mountains.jpg",
    description:
      "Pristine wilderness with dramatic landscapes, waterfalls, and some of the best hiking trails in Eswatini.",
    activities: ["Hiking Trails", "Waterfall Visits", "Rock Climbing", "Canopy Tours"],
  },
  {
    id: "usutu-river-rafting",
    name: "Usutu River Adventures",
    category: "Water Sports",
    rating: 4.6,
    reviews: 98,
    price: "E350",
    location: "Usutu River",
    region: "manzini",
    duration: "Half Day",
    difficulty: "Moderate",
    image: "/images/eswatini-safari.jpg",
    description:
      "Thrilling white water rafting experience on the Usutu River with rapids suitable for beginners and experienced rafters.",
    activities: ["White Water Rafting", "River Tubing", "Fishing", "Riverside Camping"],
  },
  {
    id: "sibebe-rock-hiking",
    name: "Sibebe Rock Hiking",
    category: "Rock Climbing",
    rating: 4.5,
    reviews: 76,
    price: "E180",
    location: "Mbabane",
    region: "hhohho",
    duration: "Half Day",
    difficulty: "Challenging",
    image: "/images/eswatini-landscape.jpg",
    description:
      "Climb the world's second-largest granite dome for spectacular panoramic views of Eswatini and beyond.",
    activities: ["Rock Climbing", "Guided Hikes", "Photography", "Scenic Views"],
  },
  {
    id: "maguga-dam-activities",
    name: "Maguga Dam Water Sports",
    category: "Water Activities",
    rating: 4.4,
    reviews: 112,
    price: "E250",
    location: "Maguga Dam",
    region: "hhohho",
    duration: "Full Day",
    difficulty: "Easy to Moderate",
    image: "/images/eswatini-village.jpg",
    description:
      "Enjoy various water activities at Eswatini's largest dam including boating, fishing, and water skiing.",
    activities: ["Boat Cruises", "Fishing", "Water Skiing", "Jet Skiing"],
  },
]

export default function AdventurePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Adventure Activities in Eswatini</h1>
          <p className="text-muted-foreground">
            From wildlife safaris to mountain hiking and water sports, discover thrilling adventures across the Kingdom
            of Eswatini.
          </p>
        </div>

        {/* Interactive Map Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Adventure Locations Map</h2>
          <p className="text-muted-foreground mb-6">
            Explore adventure activities across Eswatini's diverse landscapes. From mountain peaks to wildlife reserves
            and river valleys.
          </p>
          <GoogleMapsEswatini height="400px" zoom={9} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adventureProviders.map((adventure) => (
            <Card key={adventure.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={adventure.image || "/placeholder.svg"} alt={adventure.name} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{adventure.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="outline"
                    className={`bg-white/90 ${
                      adventure.difficulty === "Easy"
                        ? "text-green-600"
                        : adventure.difficulty === "Moderate" || adventure.difficulty === "Easy to Moderate"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {adventure.difficulty}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{adventure.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{adventure.rating}</span>
                    <span className="text-sm text-muted-foreground">({adventure.reviews})</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{adventure.description}</p>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{adventure.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{adventure.duration}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {adventure.activities.map((activity) => (
                    <Badge key={activity} variant="outline" className="text-xs">
                      {activity}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3">
                  <div>
                    <span className="text-sm text-muted-foreground">From </span>
                    <span className="font-bold text-primary text-lg">{adventure.price}</span>
                    <span className="text-sm text-muted-foreground">/person</span>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/providers/${adventure.id}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Adventure by Difficulty Level</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-green-600 mb-2">Easy</h3>
              <p className="text-sm text-muted-foreground">
                Perfect for families and beginners. Minimal physical requirements.
              </p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mountain className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-yellow-600 mb-2">Moderate</h3>
              <p className="text-sm text-muted-foreground">
                Some physical fitness required. Great for active travelers.
              </p>
            </div>

            <div className="text-center p-6 border rounded-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-bold text-red-600 mb-2">Challenging</h3>
              <p className="text-sm text-muted-foreground">For experienced adventurers. Good fitness level required.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Plan Your Adventure</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/categories/accommodation">Find Lodging</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories/dining">Local Restaurants</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories/cultural">Cultural Sites</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/map">View All Locations</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
