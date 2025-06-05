import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BackButton from "@/components/back-button"
import GoogleMapsEswatini from "@/components/google-maps-eswatini"
import ProviderCard from "@/components/provider-card"
import { regions, allProviders } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Building, Calendar } from "lucide-react"

interface RegionPageProps {
  params: { region: string }
}

export default function RegionPage({ params }: RegionPageProps) {
  const region = regions.find((r) => r.slug === params.region)

  if (!region) {
    notFound()
  }

  const regionProviders = allProviders.filter((provider) => provider.region === region.slug)

  // Get region center coordinates
  const getRegionCoordinates = () => {
    const regionCenters: Record<string, { lat: number; lng: number }> = {
      hhohho: { lat: -26.3208, lng: 31.1367 },
      manzini: { lat: -26.4833, lng: 31.3667 },
      lubombo: { lat: -26.35, lng: 31.85 },
      shiselweni: { lat: -26.85, lng: 31.2 },
    }

    return regionCenters[region.slug] || { lat: -26.5225, lng: 31.4659 }
  }

  const coordinates = getRegionCoordinates()

  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{region.name} Region</h1>
          <p className="text-xl text-muted-foreground mb-2">{region.tagline}</p>
          <p className="text-lg max-w-2xl mx-auto">{region.description}</p>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GoogleMapsEswatini
            highlightRegion={region.slug}
            height="400px"
            zoom={10}
            destination={{
              name: `${region.name} Region`,
              lat: coordinates.lat,
              lng: coordinates.lng,
            }}
          />

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Region Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Building className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{regionProviders.length}</div>
                    <div className="text-sm text-muted-foreground">Service Providers</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">
                      {region.slug === "hhohho"
                        ? "320K"
                        : region.slug === "manzini"
                          ? "355K"
                          : region.slug === "lubombo"
                            ? "212K"
                            : "217K"}
                    </div>
                    <div className="text-sm text-muted-foreground">Population</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Attractions</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {region.slug === "hhohho" && (
                      <>
                        <li>• Mbabane - Capital city</li>
                        <li>• Ezulwini Valley</li>
                        <li>• Mlilwane Wildlife Sanctuary</li>
                        <li>• Mantenga Cultural Village</li>
                      </>
                    )}
                    {region.slug === "manzini" && (
                      <>
                        <li>• Manzini - Commercial center</li>
                        <li>• Malkerns Valley</li>
                        <li>• Swazi Candles</li>
                        <li>• House on Fire</li>
                      </>
                    )}
                    {region.slug === "lubombo" && (
                      <>
                        <li>• Hlane Royal National Park</li>
                        <li>• Shewula Mountain Camp</li>
                        <li>• Lubombo Mountains</li>
                        <li>• Big Five wildlife</li>
                      </>
                    )}
                    {region.slug === "shiselweni" && (
                      <>
                        <li>• Traditional villages</li>
                        <li>• Rolling hills</li>
                        <li>• Cultural heritage sites</li>
                        <li>• Agricultural landscapes</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Service Providers in {region.name}</h2>

        {regionProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionProviders.slice(0, 9).map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">Service providers in {region.name} will be available soon.</p>
          </div>
        )}

        {regionProviders.length > 9 && (
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              View All Providers in {region.name}
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
