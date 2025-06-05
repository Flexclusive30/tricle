import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Phone } from "lucide-react"
import Link from "next/link"
import BackButton from "@/components/back-button"
import Image from "next/image"
import GoogleMapsEswatini from "@/components/google-maps-eswatini"

const diningProviders = [
  // Hhohho Region Restaurants
  {
    id: "royal-swazi-spa-restaurant",
    name: "Royal Swazi Spa Restaurant",
    category: "Fine Dining",
    rating: 4.8,
    reviews: 156,
    price: "E150-300",
    location: "Ezulwini Valley, Hhohho",
    region: "Hhohho",
    hours: "6:00 AM - 10:00 PM",
    phone: "+268 2416 1001",
    image: "/images/hilton-atrium.jpeg",
    description: "Elegant dining with panoramic valley views and international cuisine.",
    specialties: ["International", "Local Cuisine", "Vegetarian"],
  },
  {
    id: "mantenga-lodge-restaurant",
    name: "Mantenga Lodge Restaurant",
    category: "Traditional",
    rating: 4.6,
    reviews: 89,
    price: "E80-180",
    location: "Ezulwini Valley, Hhohho",
    region: "Hhohho",
    hours: "7:00 AM - 9:00 PM",
    phone: "+268 2416 1049",
    image: "/images/hlane-accommodation.jpeg",
    description: "Authentic Swazi cuisine in a traditional setting with cultural performances.",
    specialties: ["Traditional Swazi", "Grilled Meats", "Local Beer"],
  },
  {
    id: "mbabane-city-grill",
    name: "Mbabane City Grill",
    category: "Casual Dining",
    rating: 4.4,
    reviews: 203,
    price: "E60-150",
    location: "Mbabane, Hhohho",
    region: "Hhohho",
    hours: "11:00 AM - 11:00 PM",
    phone: "+268 2404 2567",
    image: "/images/hilton-lobby.jpeg",
    description: "Popular city restaurant known for steaks and local favorites.",
    specialties: ["Steaks", "Burgers", "Local Dishes"],
  },
  {
    id: "ezulwini-valley-bistro",
    name: "Ezulwini Valley Bistro",
    category: "Bistro",
    rating: 4.5,
    reviews: 134,
    price: "E90-200",
    location: "Ezulwini Valley, Hhohho",
    region: "Hhohho",
    hours: "8:00 AM - 10:00 PM",
    phone: "+268 2416 2345",
    image: "/images/eswatini-cultural.jpg",
    description: "Cozy bistro offering fusion cuisine with local ingredients.",
    specialties: ["Fusion", "Fresh Salads", "Craft Cocktails"],
  },
  {
    id: "lobamba-royal-dining",
    name: "Lobamba Royal Dining",
    category: "Fine Dining",
    rating: 4.7,
    reviews: 98,
    price: "E120-250",
    location: "Lobamba, Hhohho",
    region: "Hhohho",
    hours: "6:00 PM - 11:00 PM",
    phone: "+268 2416 3456",
    image: "/images/eswatini-village.jpg",
    description: "Upscale dining experience near the royal residence.",
    specialties: ["Royal Cuisine", "Wine Pairing", "Private Dining"],
  },

  // Manzini Region Restaurants
  {
    id: "manzini-central-kitchen",
    name: "Manzini Central Kitchen",
    category: "Local Cuisine",
    rating: 4.3,
    reviews: 187,
    price: "E40-120",
    location: "Manzini City, Manzini",
    region: "Manzini",
    hours: "7:00 AM - 9:00 PM",
    phone: "+268 2505 1234",
    image: "/images/eswatini-landscape.jpg",
    description: "Authentic local flavors in the heart of Manzini's commercial district.",
    specialties: ["Traditional Swazi", "Street Food", "Local Beverages"],
  },
  {
    id: "malkerns-valley-cafe",
    name: "Malkerns Valley Cafe",
    category: "Cafe",
    rating: 4.4,
    reviews: 156,
    price: "E35-90",
    location: "Malkerns Valley, Manzini",
    region: "Manzini",
    hours: "6:30 AM - 6:00 PM",
    phone: "+268 2528 4567",
    image: "/images/eswatini-mountains.jpg",
    description: "Charming cafe with artisanal coffee and homemade pastries.",
    specialties: ["Coffee", "Pastries", "Light Meals"],
  },
  {
    id: "matsapha-industrial-grill",
    name: "Matsapha Industrial Grill",
    category: "Grill House",
    rating: 4.2,
    reviews: 143,
    price: "E70-160",
    location: "Matsapha, Manzini",
    region: "Manzini",
    hours: "11:00 AM - 10:00 PM",
    phone: "+268 2518 7890",
    image: "/images/eswatini-safari.jpg",
    description: "Hearty grilled meals popular with locals and business travelers.",
    specialties: ["Grilled Meats", "Burgers", "Local Beer"],
  },
  {
    id: "house-on-fire-restaurant",
    name: "House on Fire Restaurant",
    category: "Contemporary",
    rating: 4.6,
    reviews: 201,
    price: "E100-220",
    location: "Malkerns Valley, Manzini",
    region: "Manzini",
    hours: "12:00 PM - 11:00 PM",
    phone: "+268 2528 3311",
    image: "/images/eswatini-wildlife.jpg",
    description: "Artistic venue combining great food with cultural performances.",
    specialties: ["Contemporary", "Live Music", "Art Gallery"],
  },

  // Lubombo Region Restaurants
  {
    id: "hlane-safari-lodge-restaurant",
    name: "Hlane Safari Lodge Restaurant",
    category: "Safari Dining",
    rating: 4.5,
    reviews: 112,
    price: "E80-180",
    location: "Hlane National Park, Lubombo",
    region: "Lubombo",
    hours: "6:00 AM - 9:00 PM",
    phone: "+268 2383 8200",
    image: "/images/hlane-royal-park.jpeg",
    description: "Bush dining experience with views of the African savanna.",
    specialties: ["Game Meat", "Bush Breakfast", "Sundowner Drinks"],
  },
  {
    id: "shewula-mountain-restaurant",
    name: "Shewula Mountain Restaurant",
    category: "Mountain Cuisine",
    rating: 4.4,
    reviews: 87,
    price: "E60-140",
    location: "Shewula Community, Lubombo",
    region: "Lubombo",
    hours: "7:00 AM - 8:00 PM",
    phone: "+268 7602 0303",
    image: "/images/hlane-lion.jpeg",
    description: "Community-run restaurant with stunning mountain views.",
    specialties: ["Traditional Meals", "Mountain Views", "Community Experience"],
  },
  {
    id: "lubombo-conservancy-dining",
    name: "Lubombo Conservancy Dining",
    category: "Eco Dining",
    rating: 4.3,
    reviews: 94,
    price: "E70-150",
    location: "Lubombo Mountains, Lubombo",
    region: "Lubombo",
    hours: "6:30 AM - 9:00 PM",
    phone: "+268 2383 9100",
    image: "/images/hlane-room.jpeg",
    description: "Sustainable dining with locally sourced ingredients.",
    specialties: ["Organic", "Local Produce", "Conservation Dining"],
  },
  {
    id: "siteki-town-eatery",
    name: "Siteki Town Eatery",
    category: "Local Eatery",
    rating: 4.1,
    reviews: 76,
    price: "E30-80",
    location: "Siteki, Lubombo",
    region: "Lubombo",
    hours: "7:00 AM - 8:00 PM",
    phone: "+268 2343 1234",
    image: "/images/eswatini-cultural.jpg",
    description: "Friendly local eatery serving traditional Swazi dishes.",
    specialties: ["Traditional Food", "Local Atmosphere", "Budget Friendly"],
  },

  // Shiselweni Region Restaurants
  {
    id: "nhlangano-country-kitchen",
    name: "Nhlangano Country Kitchen",
    category: "Country Style",
    rating: 4.2,
    reviews: 103,
    price: "E50-120",
    location: "Nhlangano, Shiselweni",
    region: "Shiselweni",
    hours: "7:00 AM - 9:00 PM",
    phone: "+268 2207 1234",
    image: "/images/eswatini-village.jpg",
    description: "Rustic country-style dining with homemade comfort food.",
    specialties: ["Comfort Food", "Homemade Bread", "Country Atmosphere"],
  },
  {
    id: "lavumisa-border-cafe",
    name: "Lavumisa Border Cafe",
    category: "Border Cafe",
    rating: 4.0,
    reviews: 89,
    price: "E35-90",
    location: "Lavumisa, Shiselweni",
    region: "Shiselweni",
    hours: "6:00 AM - 10:00 PM",
    phone: "+268 2207 5678",
    image: "/images/eswatini-landscape.jpg",
    description: "Convenient stop for travelers with local and international dishes.",
    specialties: ["Travel Food", "Quick Service", "Border Convenience"],
  },
  {
    id: "mahamba-gorge-restaurant",
    name: "Mahamba Gorge Restaurant",
    category: "Scenic Dining",
    rating: 4.4,
    reviews: 67,
    price: "E60-140",
    location: "Mahamba Gorge, Shiselweni",
    region: "Shiselweni",
    hours: "8:00 AM - 6:00 PM",
    phone: "+268 2207 9012",
    image: "/images/eswatini-mountains.jpg",
    description: "Spectacular gorge views while enjoying fresh local cuisine.",
    specialties: ["Scenic Views", "Fresh Fish", "Nature Dining"],
  },
  {
    id: "shiselweni-cultural-kitchen",
    name: "Shiselweni Cultural Kitchen",
    category: "Cultural Dining",
    rating: 4.3,
    reviews: 81,
    price: "E45-110",
    location: "Shiselweni Region",
    region: "Shiselweni",
    hours: "7:00 AM - 8:00 PM",
    phone: "+268 2207 3456",
    image: "/images/eswatini-cultural.jpg",
    description: "Experience authentic Swazi culture through traditional cuisine.",
    specialties: ["Cultural Experience", "Traditional Cooking", "Local Stories"],
  },
]

export default function DiningPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dining in Eswatini</h1>
          <p className="text-muted-foreground">
            Discover the flavors of Eswatini, from traditional Swazi cuisine to international fine dining across all
            four regions.
          </p>
        </div>

        {/* Interactive Map Section */}
        <section className="container mx-auto py-8 px-4">
          <h2 className="text-2xl font-bold mb-4">Find Dining Locations</h2>
          <p className="text-muted-foreground mb-6">
            Explore restaurants and dining venues across Eswatini. Click on markers to see details about each location.
          </p>
          <GoogleMapsEswatini height="400px" zoom={9} />
        </section>

        {/* Region Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="default" className="cursor-pointer">
              All Regions
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Hhohho
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Manzini
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Lubombo
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Shiselweni
            </Badge>
          </div>
        </div>

        {/* Restaurants by Region */}
        <div className="space-y-12">
          {/* Hhohho Region */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">Hhohho Region</h2>
            <p className="text-muted-foreground mb-6">Cultural heartland with fine dining and traditional cuisine</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diningProviders
                .filter((restaurant) => restaurant.region === "Hhohho")
                .map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{restaurant.category}</Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                          <span className="text-sm text-muted-foreground">({restaurant.reviews})</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{restaurant.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{restaurant.hours}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{restaurant.phone}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {restaurant.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-3">
                        <span className="font-medium text-primary">{restaurant.price}</span>
                        <Button size="sm" asChild>
                          <Link href={`/providers/${restaurant.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>

          {/* Manzini Region */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">Manzini Region</h2>
            <p className="text-muted-foreground mb-6">Commercial hub with diverse dining options</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diningProviders
                .filter((restaurant) => restaurant.region === "Manzini")
                .map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{restaurant.category}</Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                          <span className="text-sm text-muted-foreground">({restaurant.reviews})</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{restaurant.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{restaurant.hours}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{restaurant.phone}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {restaurant.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-3">
                        <span className="font-medium text-primary">{restaurant.price}</span>
                        <Button size="sm" asChild>
                          <Link href={`/providers/${restaurant.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>

          {/* Lubombo Region */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">Lubombo Region</h2>
            <p className="text-muted-foreground mb-6">Safari adventures with unique bush dining experiences</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diningProviders
                .filter((restaurant) => restaurant.region === "Lubombo")
                .map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{restaurant.category}</Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                          <span className="text-sm text-muted-foreground">({restaurant.reviews})</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{restaurant.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{restaurant.hours}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{restaurant.phone}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {restaurant.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-3">
                        <span className="font-medium text-primary">{restaurant.price}</span>
                        <Button size="sm" asChild>
                          <Link href={`/providers/${restaurant.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>

          {/* Shiselweni Region */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">Shiselweni Region</h2>
            <p className="text-muted-foreground mb-6">Untamed wilderness with authentic rural dining</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diningProviders
                .filter((restaurant) => restaurant.region === "Shiselweni")
                .map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{restaurant.category}</Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                          <span className="text-sm text-muted-foreground">({restaurant.reviews})</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{restaurant.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{restaurant.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{restaurant.hours}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{restaurant.phone}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {restaurant.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-3">
                        <span className="font-medium text-primary">{restaurant.price}</span>
                        <Button size="sm" asChild>
                          <Link href={`/providers/${restaurant.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Explore More Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/categories/accommodation">Hotels & Lodges</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories/cultural">Cultural Experiences</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories/adventure">Adventure Activities</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
