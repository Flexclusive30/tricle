import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, CalendarIcon } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { events } from "@/lib/data"
// Add back button to the events page as well
import BackButton from "@/components/back-button"

export default function EventsPage() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const regions = [
    { id: "all", name: "All Regions" },
    { id: "hhohho", name: "Hhohho" },
    { id: "manzini", name: "Manzini" },
    { id: "lubombo", name: "Lubombo" },
    { id: "shiselweni", name: "Shiselweni" },
  ]

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "cultural", name: "Cultural" },
    { id: "music", name: "Music & Arts" },
    { id: "food", name: "Food & Drink" },
    { id: "sports", name: "Sports" },
    { id: "nature", name: "Nature" },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/placeholder.svg?height=500&width=1200&text=Events+and+Festivals')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & Festivals</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the vibrant cultural celebrations and events across Eswatini
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="upcoming">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="next-month">Next Month</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Events Calendar */}
      <section className="container mx-auto py-8 px-4">
        <Tabs defaultValue="list">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=300&width=500&text=${event.name}`}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-primary/10 text-primary font-medium px-3 py-1 rounded text-sm">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                      <div className="ml-2 text-sm text-muted-foreground">{event.time}</div>
                    </div>

                    <h3 className="font-bold text-lg mb-2">{event.name}</h3>

                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{event.location}</span>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>

                    <Button asChild>
                      <a href={`/events/${event.id}`}>View Details</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardContent className="p-6">
                  <Calendar mode="single" className="w-full" />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Events on Selected Date</h3>

                  <div className="space-y-4">
                    {events.slice(0, 2).map((event) => (
                      <div key={event.id} className="flex border rounded-md overflow-hidden">
                        <div className="w-1/4">
                          <img
                            src={`/placeholder.svg?height=100&width=100&text=${event.name}`}
                            alt={event.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-3/4 p-4">
                          <h4 className="font-bold">{event.name}</h4>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span>{event.time}</span>
                            <span className="mx-2">•</span>
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{event.location}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto py-12 px-4 bg-muted/30">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Annual Festivals</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-64 overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=600&text=Umhlanga+Reed+Dance"
                alt="Umhlanga Reed Dance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">Umhlanga Reed Dance</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>Late August / Early September</span>
              </div>
              <p className="text-muted-foreground mb-4">
                The Umhlanga Reed Dance is one of Eswatini's most well-known cultural events. Thousands of unmarried
                girls and young women gather to pay homage to the Queen Mother.
              </p>
              <Button>Learn More</Button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-64 overflow-hidden">
              <img
                src="/placeholder.svg?height=400&width=600&text=Incwala+Ceremony"
                alt="Incwala Ceremony"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">Incwala Ceremony</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>December / January</span>
              </div>
              <p className="text-muted-foreground mb-4">
                The Incwala is the most sacred national event in Eswatini, celebrating both kingship and the seasonal
                first fruits.
              </p>
              <Button>Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
