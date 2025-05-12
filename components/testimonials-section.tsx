"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "United Kingdom",
    rating: 5,
    text: "Eswatini was the highlight of my African adventure! The cultural experiences were authentic and the wildlife viewing was incredible. I'll never forget the warm hospitality of the Swazi people.",
    image: "/placeholder.svg?height=100&width=100&text=Sarah+J",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Canada",
    rating: 5,
    text: "What an amazing country! The landscapes are breathtaking and the traditional ceremonies were fascinating. Hlane Royal National Park was a particular highlight - we saw lions, elephants and rhinos all in one day!",
    image: "/placeholder.svg?height=100&width=100&text=Michael+C",
  },
  {
    id: 3,
    name: "Priya Patel",
    location: "India",
    rating: 4,
    text: "I loved exploring the craft markets and learning about the traditional crafts. The accommodations were comfortable and the food was delicious. Would definitely recommend visiting Eswatini!",
    image: "/placeholder.svg?height=100&width=100&text=Priya+P",
  },
  {
    id: 4,
    name: "David Müller",
    location: "Germany",
    rating: 5,
    text: "The Umhlanga Reed Dance was a spectacular cultural experience that I'll never forget. The natural beauty of Eswatini combined with the rich cultural heritage makes it a must-visit destination.",
    image: "/placeholder.svg?height=100&width=100&text=David+M",
  },
  {
    id: 5,
    name: "Olivia Thompson",
    location: "Australia",
    rating: 5,
    text: "From hiking in the mountains to experiencing traditional village life, Eswatini offers such diverse experiences. The people are incredibly friendly and the scenery is stunning!",
    image: "/placeholder.svg?height=100&width=100&text=Olivia+T",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Set visible testimonials based on screen size
  useEffect(() => {
    if (isMobile) {
      setVisibleTestimonials([currentIndex])
    } else {
      // On desktop, show 3 testimonials at once
      const indices = []
      for (let i = 0; i < 3; i++) {
        indices.push((currentIndex + i) % testimonials.length)
      }
      setVisibleTestimonials(indices)
    }
  }, [currentIndex, isMobile])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="container mx-auto py-12 md:py-16 px-4">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">What People Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Read about the experiences of travelers who have visited the Kingdom of Eswatini
        </p>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out w-full">
            {visibleTestimonials.map((index) => (
              <div key={testimonials[index].id} className="w-full md:w-1/3 flex-shrink-0 px-2">
                <Card className="h-full p-6 flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonials[index].image || "/placeholder.svg"}
                        alt={testimonials[index].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonials[index].name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonials[index].location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonials[index].rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>
                  <div className="flex-grow">
                    <div className="relative">
                      <Quote className="h-6 w-6 text-primary/20 absolute -top-2 -left-2" />
                      <p className="text-muted-foreground text-sm pl-4">{testimonials[index].text}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevTestimonial}
          className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-center mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full mx-1 transition-all ${
              visibleTestimonials.includes(index) ? "w-6 bg-primary" : "w-2 bg-muted"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
