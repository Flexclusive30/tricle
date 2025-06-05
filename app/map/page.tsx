import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import InteractiveEswatiniMap from "@/components/interactive-eswatini-map"
import GoogleMapsEswatini from "@/components/google-maps-eswatini"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Navigation, Compass, Globe, Satellite } from "lucide-react"
import { regions } from "@/lib/data"
import BackButton from "@/components/back-button"

export default function MapPage() {
  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/placeholder.svg?height=400&width=1200&text=Eswatini+Interactive+Maps')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Eswatini Maps</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the Kingdom of Eswatini with interactive maps, satellite views, and detailed regional information
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="google-maps" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="google-maps" className="flex items-center gap-2">
              <Satellite className="h-4 w-4" />
              Google Maps
            </TabsTrigger>
            <TabsTrigger value="interactive" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Interactive
            </TabsTrigger>
            <TabsTrigger value="regions" className="flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              Regions
            </TabsTrigger>
            <TabsTrigger value="facts" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Facts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="google-maps" className="mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                <GoogleMapsEswatini height="600px" zoom={8} />
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Satellite className="h-5 w-5" />
                      Map Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Real satellite imagery</strong> and street maps
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Interactive markers</strong> for cities and attractions
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Regional boundaries</strong> with color coding
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Zoom and pan</strong> for detailed exploration
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Quick Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {regions.map((region) => (
                      <div key={region.slug} className="p-2 border rounded hover:bg-muted/50 transition-colors">
                        <div className="font-medium">{region.name}</div>
                        <div className="text-sm text-muted-foreground">{region.tagline}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interactive" className="mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <InteractiveEswatiniMap
                  title="Explore Eswatini Regions"
                  description="Click on any region to learn more about it. Hover for quick information."
                />
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Navigation className="h-5 w-5" />
                      How to Use
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Hover</strong> over regions to see quick information
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Click</strong> on regions to explore in detail
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Stars (★)</strong> indicate capital cities
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Use buttons</strong> to explore regions or find accommodations
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Total Area</div>
                        <div className="text-muted-foreground">17,364 km²</div>
                      </div>
                      <div>
                        <div className="font-medium">Population</div>
                        <div className="text-muted-foreground">~1.2 million</div>
                      </div>
                      <div>
                        <div className="font-medium">Regions</div>
                        <div className="text-muted-foreground">4 administrative</div>
                      </div>
                      <div>
                        <div className="font-medium">Capitals</div>
                        <div className="text-muted-foreground">Mbabane & Lobamba</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="regions" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regions.map((region) => (
                <Card key={region.slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {region.name} Region
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <GoogleMapsEswatini highlightRegion={region.slug} showControls={false} height="250px" zoom={10} />
                    </div>
                    <p className="text-muted-foreground mb-4">{region.description}</p>
                    <div className="flex gap-2">
                      <a
                        href={`/regions/${region.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                      >
                        Explore {region.name}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="facts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Compass className="h-5 w-5" />
                    Geography
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Location:</span>
                    <span className="text-muted-foreground">Southern Africa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Borders:</span>
                    <span className="text-muted-foreground">South Africa, Mozambique</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Terrain:</span>
                    <span className="text-muted-foreground">Mountains, hills, plains</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Climate:</span>
                    <span className="text-muted-foreground">Temperate</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Culture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Languages:</span>
                    <span className="text-muted-foreground">English, siSwati</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Currency:</span>
                    <span className="text-muted-foreground">Lilangeni (SZL)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Government:</span>
                    <span className="text-muted-foreground">Absolute Monarchy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">King:</span>
                    <span className="text-muted-foreground">Mswati III</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Tourism
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Best Time:</span>
                    <span className="text-muted-foreground">May - September</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Wildlife:</span>
                    <span className="text-muted-foreground">Big Five</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Activities:</span>
                    <span className="text-muted-foreground">Safari, Culture, Hiking</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Festivals:</span>
                    <span className="text-muted-foreground">Umhlanga, Incwala</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
