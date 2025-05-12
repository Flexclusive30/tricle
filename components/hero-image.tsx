import Image from "next/image"

export default function HeroImage() {
  return (
    <section className="relative h-[400px] md:h-[600px] overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image src="/images/eswatini-landscape.jpg" alt="Eswatini Landscape" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 py-6 md:py-0">
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 text-white max-w-4xl">
          Welcome to the Kingdom of Eswatini
        </h1>
        <p className="text-lg md:text-2xl text-white/90 max-w-2xl">
          Experience Africa's hidden gem with breathtaking landscapes, vibrant culture, and unforgettable adventures
        </p>
      </div>
    </section>
  )
}
