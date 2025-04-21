import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProviderCard from "@/components/provider-card"
import { regions, allProviders, categories } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
// Add back button to the region page as well
import BackButton from "@/components/back-button"

export default function RegionPage({ params }: { params: { region: string } }) {
  const region = regions.find((r) => r.slug === params.region)

  if (!region) {
    notFound()
  }

  const regionProviders = allProviders.filter((provider) => provider.region === region.slug)

  // Get unique categories in this region
  const regionCategories = Array.from(new Set(regionProviders.map((provider) => provider.category)))

  // Get category details for the ones in this region
  const availableCategories = categories.filter((category) => regionCategories.includes(category.slug))

  const categoryFilters = [
    { id: "all", name: "All" },
    ...availableCategories.map((cat) => ({ id: cat.slug, name: cat.name })),
  ]

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Region Hero */}
      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/placeholder.svg?height=500&width=1200&text=${region.name}+Region')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{region.name} Region</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {region.tagline} - {region.description}
          </p>
        </div>
      </section>

      {/* Region Map */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{region.name} Region</h2>
        <div className="max-w-4xl mx-auto">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-md text-sm font-medium">
              {region.name} Region
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-xl mb-4">About {region.name} Region</h3>
            <p className="text-muted-foreground mb-6">
              {region.description} This region is known for its unique landscape, cultural significance, and various
              attractions.
            </p>

            <h4 className="font-medium mb-2">Major Cities in {region.name}</h4>
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

            <div className="flex flex-wrap gap-2">
              {regions.map(
                (r) =>
                  r.slug !== region.slug && (
                    <Button key={r.slug} variant="outline" asChild>
                      <a href={`/regions/${r.slug}`}>Visit {r.name} Region</a>
                    </Button>
                  ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories in this region */}
      <section className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Explore {region.name} By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {availableCategories.map((category) => {
            const count = regionProviders.filter((p) => p.category === category.slug).length
            const Icon = category.icon

            return (
              <a
                key={category.slug}
                href={`/categories/${category.slug}?region=${region.slug}`}
                className="flex flex-col items-center p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-center">{category.name}</h3>
                <p className="text-sm text-muted-foreground text-center">{count} listings</p>
              </a>
            )
          })}
        </div>
      </section>

      {/* Providers in this region */}
      <section className="container mx-auto py-8 px-4">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold">Browse {region.name}</h2>

            <TabsList className="w-full md:w-auto">
              {categoryFilters.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="px-4 py-2 whitespace-nowrap">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categoryFilters.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionProviders
                  .filter((provider) => category.id === "all" || provider.category === category.id)
                  .map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} />
                  ))}
              </div>

              {regionProviders.filter((provider) => category.id === "all" || provider.category === category.id)
                .length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No providers found</h3>
                  <p className="text-muted-foreground mb-6">
                    There are currently no providers in this category for {region.name}.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Region Highlights */}
      <section className="container mx-auto py-12 px-4 bg-muted/30">
        <h2 className="text-3xl font-bold text-center mb-8">{region.name} Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-64 overflow-hidden">
              <img
                src={`/placeholder.svg?height=400&width=600&text=${region.name}+Landscape`}
                alt={`${region.name} Landscape`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Natural Beauty</h3>
              <p className="text-muted-foreground mb-4">
                {region.slug === "hhohho" &&
                  "Home to the Malolotja Nature Reserve with its stunning waterfalls and diverse flora and fauna."}
                {region.slug === "manzini" &&
                  "Features the Mdzimba Mountains and lush valleys with scenic hiking trails and viewpoints."}
                {region.slug === "lubombo" &&
                  "Known for the dramatic Lubombo Mountain Range and savannah landscapes perfect for wildlife viewing."}
                {region.slug === "shiselweni" &&
                  "Offers rolling hills, forests, and the beautiful Ngwempisi Gorge with breathtaking views."}
              </p>
              <Button variant="outline">Explore Nature</Button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-64 overflow-hidden">
              <img
                src={`/placeholder.svg?height=400&width=600&text=${region.name}+Culture`}
                alt={`${region.name} Culture`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Cultural Heritage</h3>
              <p className="text-muted-foreground mb-4">
                {region.slug === "hhohho" &&
                  "Experience royal traditions at Lobamba, the ceremonial capital where major cultural events take place."}
                {region.slug === "manzini" &&
                  "Visit traditional markets and craft centers showcasing authentic Swazi craftsmanship and artistry."}
                {region.slug === "lubombo" &&
                  "Discover community-based tourism initiatives and authentic rural Swazi lifestyle experiences."}
                {region.slug === "shiselweni" &&
                  "Explore traditional homesteads and learn about ancestral practices preserved in this region."}
              </p>
              <Button variant="outline">Discover Culture</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
