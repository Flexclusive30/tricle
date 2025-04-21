import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, CalendarIcon, Heart, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { providers } from "@/lib/data"
// Add back button to the dashboard page as well
import BackButton from "@/components/back-button"

export default function DashboardPage() {
  // Mock saved providers
  const savedProviders = providers.slice(0, 4)

  // Mock bookings
  const bookings = [
    {
      id: "booking-1",
      providerId: providers[0].id,
      providerName: providers[0].name,
      date: "2023-07-15",
      time: "10:00 AM",
      people: 2,
      status: "confirmed",
      price: 198,
    },
    {
      id: "booking-2",
      providerId: providers[1].id,
      providerName: providers[1].name,
      date: "2023-07-20",
      time: "2:00 PM",
      people: 4,
      status: "pending",
      price: 356,
    },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Dashboard Header */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your trips, bookings, and saved experiences</p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="container mx-auto py-8 px-4">
        <Tabs defaultValue="trip-planner">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="trip-planner">Trip Planner</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="trip-planner">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Trip Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar mode="single" className="w-full" />

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center p-2 bg-primary/10 rounded-md">
                      <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                      <div>
                        <p className="font-medium">Mantenga Cultural Village</p>
                        <p className="text-sm text-muted-foreground">July 15, 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 bg-primary/10 rounded-md">
                      <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                      <div>
                        <p className="font-medium">Mlilwane Wildlife Sanctuary</p>
                        <p className="text-sm text-muted-foreground">July 16, 2023</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trip Builder */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Build Your Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-bold mb-2">Day 1: July 15, 2023</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>10:00 AM - 2:00 PM</span>
                          </div>
                          <span className="font-medium">Mantenga Cultural Village</span>
                          <Button size="sm" variant="ghost">
                            Remove
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>3:00 PM - 5:00 PM</span>
                          </div>
                          <span className="font-medium">Local Craft Market</span>
                          <Button size="sm" variant="ghost">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="font-bold mb-2">Day 2: July 16, 2023</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>9:00 AM - 4:00 PM</span>
                          </div>
                          <span className="font-medium">Mlilwane Wildlife Sanctuary</span>
                          <Button size="sm" variant="ghost">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">Add New Day</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Activities */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Suggested Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {providers.slice(0, 3).map((provider) => (
                      <div key={provider.id} className="flex border rounded-md overflow-hidden">
                        <div className="w-1/3">
                          <img
                            src={`/placeholder.svg?height=100&width=100&text=${provider.name}`}
                            alt={provider.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-3">
                          <h4 className="font-medium text-sm">{provider.name}</h4>
                          <div className="flex items-center text-xs text-muted-foreground mb-2">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{provider.location}</span>
                          </div>
                          <Button size="sm">Add to Trip</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Upcoming Bookings</h2>

              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="h-16 w-16 bg-muted rounded-md mr-4 flex items-center justify-center">
                          <CalendarIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold">{booking.providerName}</h3>
                          <p className="text-muted-foreground">
                            {booking.date} at {booking.time}
                          </p>
                          <p className="text-sm">
                            {booking.people} {booking.people === 1 ? "person" : "people"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="mb-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        <p className="font-bold">${booking.price}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm">View Details</Button>
                          <Button size="sm" variant="outline">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center py-4">
                <Button variant="outline">View Past Bookings</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <h2 className="text-xl font-bold mb-6">Saved Experiences</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedProviders.map((provider) => (
                <div key={provider.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=200&width=300&text=${provider.name}`}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                      <Heart className="h-5 w-5 fill-primary text-primary" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{provider.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{provider.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-medium">${provider.price}</span>
                      <Button size="sm" asChild>
                        <a href={`/providers/${provider.id}`}>View Details</a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <h2 className="text-xl font-bold mb-6">My Reviews</h2>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">Mantenga Cultural Village</h3>
                      <div className="flex items-center my-2">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Heart
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "text-primary fill-primary" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Visited on July 10, 2023</p>
                      <p>
                        Amazing cultural experience! The traditional dances were spectacular and the guides were very
                        knowledgeable about Swazi culture.
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">Mlilwane Wildlife Sanctuary</h3>
                      <div className="flex items-center my-2">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Heart
                              key={i}
                              className={`h-4 w-4 ${i < 5 ? "text-primary fill-primary" : "text-gray-300"}`}
                            />
                          ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Visited on June 25, 2023</p>
                      <p>
                        Incredible wildlife viewing! We saw zebras, warthogs, and many antelope species. The guided tour
                        was well worth it.
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Footer />
    </main>
  )
}
