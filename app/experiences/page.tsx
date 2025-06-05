import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BackButton from "@/components/back-button"
import ProviderCard from "@/components/provider-card"
import GoogleMapsEswatini from "@/components/google-maps-eswatini"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"
import { allProviders, categories, regions } from "@/lib/data"
import ExperienceFilters from "@/components/experience-filters"

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/placeholder.svg?height=500&width=1200&text=All+Experiences+in+Eswatini')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Experiences in Eswatini</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover every destination, activity, and experience across the Kingdom of Eswatini
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <ExperienceFilters />
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              All Experience Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GoogleMapsEswatini height="500px" zoom={8} />
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                Explore all {allProviders.length} experiences across Eswatini's four regions. Click on markers to see
                details about each location.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{allProviders.length}</div>
              <div className="text-sm text-muted-foreground">Total Experiences</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{regions.length}</div>
              <div className="text-sm text-muted-foreground">Regions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {(allProviders.reduce((sum, p) => sum + p.rating, 0) / allProviders.length).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* All Experiences Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">All Experiences</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Showing {allProviders.length} experiences</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="container mx-auto px-4 py-8 bg-muted/30">
        <h2 className="text-3xl font-bold text-center mb-8">Experiences by Category</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categoryProviders = allProviders.filter((p) => p.category === category.slug)
            const avgRating =
              categoryProviders.length > 0
                ? (categoryProviders.reduce((sum, p) => sum + p.rating, 0) / categoryProviders.length).toFixed(1)
                : "0.0"

            return (
              <Card key={category.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold">{category.name}</div>
                      <div className="text-sm text-muted-foreground">{categoryProviders.length} experiences</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{avgRating}</span>
                      <span className="text-sm text-muted-foreground">avg rating</span>
                    </div>
                    <Badge variant="outline">{categoryProviders.length} listings</Badge>
                  </div>

                  <Button asChild className="w-full">
                    <a href={`/categories/${category.slug}`}>Explore {category.name}</a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Regional Breakdown */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Experiences by Region</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region) => {
            const regionProviders = allProviders.filter((p) => p.region === region.slug)
            const topCategories = categories
              .map((cat) => ({
                ...cat,
                count: regionProviders.filter((p) => p.category === cat.slug).length,
              }))
              .filter((cat) => cat.count > 0)
              .sort((a, b) => b.count - a.count)
              .slice(0, 3)

            return (
              <Card key={region.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>
                    <div className="font-bold text-lg">{region.name}</div>
                    <div className="text-sm text-muted-foreground">{region.tagline}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{region.description}</p>

                  <div className="mb-4">
                    <div className="text-2xl font-bold text-primary">{regionProviders.length}</div>
                    <div className="text-sm text-muted-foreground">experiences available</div>
                  </div>

                  {topCategories.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Top Categories:</div>
                      <div className="flex flex-wrap gap-1">
                        {topCategories.map((cat) => (
                          <Badge key={cat.slug} variant="outline" className="text-xs">
                            {cat.name} ({cat.count})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button asChild className="w-full" variant="outline">
                    <a href={`/regions/${region.slug}`}>Explore {region.name}</a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <Footer />
    </main>
  )
}
