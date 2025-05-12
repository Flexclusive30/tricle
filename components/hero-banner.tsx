"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/placeholder.svg?height=600&width=1200&text=Eswatini+Landscapes",
      title: "Discover the Kingdom of Eswatini",
      description: "Experience the beauty, culture, and adventure of Africa's hidden gem",
    },
    {
      image: "/placeholder.svg?height=600&width=1200&text=Cultural+Festivals",
      title: "Vibrant Cultural Celebrations",
      description: "Immerse yourself in traditional ceremonies and festivals",
    },
    {
      image: "/placeholder.svg?height=600&width=1200&text=Wildlife+Safari",
      title: "Unforgettable Wildlife Encounters",
      description: "Get up close with Africa's magnificent wildlife in pristine reserves",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative h-[350px] md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4">{slide.title}</h1>
              <p className="text-base md:text-xl lg:text-2xl max-w-2xl mx-auto mb-4 md:mb-8">{slide.description}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button size="md" md:size="lg" className="w-full sm:w-auto">
                  Explore Eswatini
                  <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  size="md"
                  md:size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/20 w-full sm:w-auto"
                >
                  Plan Your Trip
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-6 md:w-8 bg-white" : "w-2 bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
