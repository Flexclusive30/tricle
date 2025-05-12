"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageGalleryProps {
  provider: any
  images?: string[]
}

export default function ImageGallery({ provider, images }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [showFullscreen, setShowFullscreen] = useState(false)

  // Use provided images or generate placeholders
  const galleryImages =
    images ||
    Array(5)
      .fill(0)
      .map((_, i) => `/placeholder.svg?height=600&width=800&text=${provider.name}+Image+${i + 1}`)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <>
      <section className="container mx-auto py-3 md:py-4 px-3 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
          <div
            className="md:col-span-2 h-64 md:h-96 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setShowFullscreen(true)}
          >
            <img
              src={galleryImages[currentImage] || "/placeholder.svg"}
              alt={`${provider.name} - Main Image`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            {galleryImages.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className={`h-44 overflow-hidden rounded-lg cursor-pointer ${index === currentImage ? "ring-2 ring-primary" : ""}`}
                onClick={() => setCurrentImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${provider.name} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-3 md:mt-4 md:hidden">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${index === currentImage ? "bg-primary" : "bg-muted"}`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </section>

      {/* Fullscreen Gallery */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white"
            onClick={() => setShowFullscreen(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button variant="ghost" size="icon" className="absolute left-2 md:left-4 text-white" onClick={prevImage}>
            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
          </Button>

          <img
            src={galleryImages[currentImage] || "/placeholder.svg"}
            alt={`${provider.name} - Fullscreen Image`}
            className="max-h-screen max-w-full object-contain px-10"
          />

          <Button variant="ghost" size="icon" className="absolute right-2 md:right-4 text-white" onClick={nextImage}>
            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
          </Button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentImage ? "w-6 md:w-8 bg-white" : "w-2 bg-white/50"
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
