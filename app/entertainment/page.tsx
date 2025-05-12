import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from "@/components/footer"
import { entertainmentVenues } from "@/lib/data"
import BackButton from "@/components/back-button"
import LocationMap from "@/components/location-map"

export default function EntertainmentPage() {
  // Group venues by type
  const venuesByType = entertainmentVenues.reduce(
    (acc, venue) => {
      if (!acc[venue.type]) {
        acc[venue.type] = []
      }
      acc[venue.type].push(venue)
      return acc
    },
    {} as Record<string, typeof entertainmentVenues>,
  )

  const venueTypes = Object.keys(venuesByType)

  return (
    <main className="min-h-screen pb-16">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Entertainment Hero */}
      <section
        className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/placeholder.svg?height=500&width=1200&text=Entertainment+in+Eswatini')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Entertainment in Eswatini</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover the vibrant nightlife, cultural performances, and entertainment venues across the kingdom.
          </p>
        </div>
      </section>

      {/* Entertainment Venues */}
      <section className="container mx-auto py-8 px-4">
        <Tabs defaultValue={venueTypes[0]} className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold">Browse Entertainment</h2>

            <TabsList className="w-full md:w-auto overflow-x-auto">
              {venueTypes.map((type) => (
                <TabsTrigger key={type} value={type} className="px-4 py-2 whitespace-nowrap">
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {venueTypes.map((type) => (
            <TabsContent key={type} value={type}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venuesByType[type].map((venue) => (
                  <div key={venue.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={venue.image || `/placeholder.svg?height=300&width=500&text=${venue.name}`}
                        alt={venue.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{venue.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{venue.description}</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Location:</span>
                          <span className="text-sm">{venue.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Hours:</span>
                          <span className="text-sm">{venue.hours}</span>
                        </div>
                        {venue.price && (
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Price Range:</span>
                            <span className="text-sm">{venue.price}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        <LocationMap
                          name={venue.name}
                          coordinates={venue.coordinates || [-26.5225, 31.4659]}
                          height="h-[200px]"
                          zoom={13}
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" size="sm">
                          More Details
                        </Button>
                        <Button size="sm">Book Now</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <Footer />
    </main>
  )
}
