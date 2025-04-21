import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedProviderCard from "@/components/animated-provider-card"
import { allProviders } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Music } from "lucide-react"
// Add back button to the entertainment page as well
import BackButton from "@/components/back-button"

export default function EntertainmentPage() {
  // Filter providers to only show entertainment venues
  const entertainmentProviders = allProviders.filter((provider) => provider.category === "entertainment")

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="relative h-80 bg-cover bg-center flex items-center justify-center bg-purple-900">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Entertainment in Eswatini</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Experience the vibrant nightlife and entertainment scene across the kingdom
          </p>
        </div>
      </section>

      {/* Featured Entertainment Venues */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-purple-100 p-2 rounded-full">
            <Music className="h-6 w-6 text-purple-500" />
          </div>
          <h2 className="text-3xl font-bold">Featured Entertainment Venues</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {entertainmentProviders.slice(0, 3).map((provider) => (
            <AnimatedProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        <div className="bg-slate-100 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold mb-4">Discover Eswatini's Nightlife</h3>
          <p className="text-muted-foreground mb-6">
            From live music venues and cultural performances to modern entertainment complexes, Eswatini offers a
            diverse range of entertainment options for visitors. Experience the rhythm of traditional and contemporary
            music, enjoy local performances, or spend an evening at one of the kingdom's vibrant nightspots.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Explore All Venues
          </Button>
        </div>
      </section>

      {/* All Entertainment Venues */}
      <section className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-8">All Entertainment Venues</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {entertainmentProviders.map((provider) => (
            <AnimatedProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
