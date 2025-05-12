import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Share2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { events } from "@/lib/data"
import { notFound } from "next/navigation"
import BackButton from "@/components/back-button"
import LocationMap from "@/components/location-map"

// Get event coordinates
const getEventCoordinates = (eventId: string): [number, number] => {
  // Default coordinates for Eswatini (center of the country)
  const defaultCoordinates: [number, number] = [-26.5225, 31.4659]

  // Event-specific coordinates
  const coordinatesMap: Record<string, [number, number]> = {
    "umhlanga-reed-dance": [-26.4667, 31.2], // Ludzidzini Royal Village
    "incwala-ceremony": [-26.4667, 31.2], // Lobamba Royal Village
    "bush-fire-festival": [-26.5333, 31.2], // House on Fire, Malkerns
    "marula-festival": [-26.2667, 31.8333], // Ebuhleni Royal Residence (approximation)
    "eswatini-marathon": [-26.4, 31.25], // Between Mbabane and Manzini
    "food-festival": [-26.4167, 31.1667], // Ezulwini Valley
  }

  return coordinatesMap[eventId] || defaultCoordinates
}

export default function EventPage({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === params.id)

  if (!event) {
    notFound()
  }

  const eventCoordinates = getEventCoordinates(event.id)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Event Hero */}
      <section
        className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('${event.image}')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.name}</h1>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-4">About the Event</h2>
              <p className="text-muted-foreground mb-6">{event.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Event Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">{formatDate(event.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Share2 className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium">Share</p>
                      <div className="flex gap-2 mt-1">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <span className="sr-only">Share on Facebook</span>
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                          </svg>
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <span className="sr-only">Share on Twitter</span>
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <span className="sr-only">Share via Email</span>
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Event Location</h3>
                <LocationMap name={event.name} coordinates={eventCoordinates} height="h-[300px]" />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md sticky top-24">
              <h3 className="text-xl font-bold mb-4">Event Information</h3>

              <div className="mb-6">
                <p className="font-medium mb-2">Category</p>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </div>
              </div>

              <div className="mb-6">
                <p className="font-medium mb-2">Region</p>
                <p className="text-muted-foreground">{event.region}</p>
              </div>

              <Button className="w-full mb-3">Register for Event</Button>
              <Button variant="outline" className="w-full">
                Add to Calendar
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
