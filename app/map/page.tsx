import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { regions } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

// Add back button to the map page as well
import BackButton from "@/components/back-button"

export default function MapPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/placeholder.svg?height=400&width=1200&text=Eswatini+Maps')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Eswatini</h1>
          <p className="text-xl max-w-2xl mx-auto">Interactive maps to help you discover the Kingdom of Eswatini</p>
        </div>
      </section>

      {/* Main Map Section */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Kingdom of Eswatini</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <p className="text-center text-muted-foreground mb-8">
            Eswatini (formerly Swaziland) is a small, landlocked monarchy in southern Africa, bordered by Mozambique to
            the northeast and South Africa to the north, west, and south. The country is divided into four
            administrative regions: Hhohho, Manzini, Lubombo, and Shiselweni.
          </p>

          <div className="relative aspect-[4/3] max-w-3xl mx-auto rounded-lg overflow-hidden border shadow-md">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eswatini-regions-and-capital-map.jpg-8pRhxbWrd2qTai5z4ud80k8ADOUXdO.jpeg"
              alt="Complete map of Eswatini showing all regions and cities"
              fill
              className="object-contain"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map((region) => (
              <div key={region.slug} className="text-center">
                <h3 className="font-bold">{region.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{region.tagline}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/regions/${region.slug}`}>Explore {region.name}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Maps */}
        <h2 className="text-2xl font-bold text-center mb-6">Regional Maps</h2>
        <Tabs defaultValue="hhohho">
          <TabsList className="w-full mb-6">
            {regions.map((region) => (
              <TabsTrigger key={region.slug} value={region.slug}>
                {region.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {regions.map((region) => (
            <TabsContent key={region.slug} value={region.slug}>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-2/3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden border shadow-md">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eswatini-regions-and-capital-map.jpg-8pRhxbWrd2qTai5z4ud80k8ADOUXdO.jpeg"
                        alt={`Map of ${region.name} region in Eswatini`}
                        fill
                        style={{
                          objectFit: "cover",
                          objectPosition:
                            region.slug === "hhohho"
                              ? "0% 0%"
                              : region.slug === "manzini"
                                ? "20% 60%"
                                : region.slug === "lubombo"
                                  ? "80% 50%"
                                  : "30% 90%",
                        }}
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <Button asChild>
                        <Link href={`/regions/${region.slug}`}>Explore {region.name} Region</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/3">
                    <h3 className="text-xl font-bold mb-4">{region.name} Region</h3>
                    <p className="text-muted-foreground mb-4">{region.description}</p>

                    <h4 className="font-medium mb-2">Major Cities</h4>
                    <ul className="list-disc pl-5 space-y-1 mb-6">
                      {region.slug === "hhohho" && (
                        <>
                          <li>Mbabane (Executive Capital)</li>
                          <li>Lobamba (Legislative Capital)</li>
                          <li>Piggs Peak</li>
                          <li>Bulembu</li>
                          <li>Ngwenya</li>
                        </>
                      )}
                      {region.slug === "manzini" && (
                        <>
                          <li>Manzini (Regional Capital)</li>
                          <li>Malkerns</li>
                          <li>Bhunya</li>
                          <li>Mankayane</li>
                          <li>Luyengo</li>
                        </>
                      )}
                      {region.slug === "lubombo" && (
                        <>
                          <li>Siteki (Regional Capital)</li>
                          <li>Big Bend</li>
                          <li>Simunye</li>
                          <li>Mhlume</li>
                          <li>Tikhuba</li>
                        </>
                      )}
                      {region.slug === "shiselweni" && (
                        <>
                          <li>Nhlangano (Regional Capital)</li>
                          <li>Hlatikulu</li>
                          <li>Lavumisa</li>
                          <li>Hluti</li>
                          <li>Matsanjeni</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Map Types */}
      <section className="container mx-auto py-12 px-4 bg-muted/30">
        <h2 className="text-2xl font-bold text-center mb-8">Specialized Maps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=500&text=Tourist+Attractions+Map"
                alt="Tourist Attractions Map"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Tourist Attractions</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Discover the most popular tourist destinations across Eswatini with this specialized map.
              </p>
              <Button variant="outline" className="w-full">
                View Map
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=500&text=Wildlife+&+Parks+Map"
                alt="Wildlife & Parks Map"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Wildlife & Parks</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Explore Eswatini's national parks, game reserves, and wildlife viewing areas.
              </p>
              <Button variant="outline" className="w-full">
                View Map
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=500&text=Cultural+Sites+Map"
                alt="Cultural Sites Map"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Cultural Sites</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Locate important cultural and historical sites throughout the Kingdom of Eswatini.
              </p>
              <Button variant="outline" className="w-full">
                View Map
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
