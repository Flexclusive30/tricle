import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProviderCard from "@/components/provider-card"
import { categories, allProviders } from "@/lib/data"
import { notFound } from "next/navigation"
import ImageCarousel from "@/components/image-carousel"
import BackButton from "@/components/back-button"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categories.find((c) => c.slug === params.category)

  if (!category) {
    notFound()
  }

  const categoryProviders = allProviders.filter((provider) => provider.category === category.slug)

  const regions = [
    { id: "all", name: "All Regions" },
    { id: "hhohho", name: "Hhohho" },
    { id: "manzini", name: "Manzini" },
    { id: "lubombo", name: "Lubombo" },
    { id: "shiselweni", name: "Shiselweni" },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Category Image Carousel */}
      <ImageCarousel
        images={[
          { src: `/placeholder.svg?height=600&width=1200&text=${category.name}+1`, alt: `${category.name} 1` },
          { src: `/placeholder.svg?height=600&width=1200&text=${category.name}+2`, alt: `${category.name} 2` },
          { src: `/placeholder.svg?height=600&width=1200&text=${category.name}+3`, alt: `${category.name} 3` },
          { src: `/placeholder.svg?height=600&width=1200&text=${category.name}+4`, alt: `${category.name} 4` },
          { src: `/placeholder.svg?height=600&width=1200&text=${category.name}+5`, alt: `${category.name} 5` },
          { src: `/placeholder.svg?height=600&width=1200&text=${category.name}+6`, alt: `${category.name} 6` },
          { src: `/placeholder.svg?height=600&width=1200&text=${category.name}+7`, alt: `${category.name} 7` },
          { src: `/placeholder.svg?height=600&width=1200&text=${category.name}+8`, alt: `${category.name} 8` },
          { src: `/placeholder.svg?height=600&width=1200&text=${category.name}+9`, alt: `${category.name} 9` },
          { src: `/placeholder.svg?height=600&width=1200&text=${category.name}+10`, alt: `${category.name} 10` },
        ]}
      />

      {/* Category Hero */}
      <section
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/placeholder.svg?height=500&width=1200&text=${category.name}')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl max-w-2xl mx-auto">{category.description}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold">Browse {category.name}</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
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

            <Select defaultValue="popularity">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        {categoryProviders.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No providers found</h3>
            <p className="text-muted-foreground mb-6">There are currently no providers in this category.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
