"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  useEffect(() => {
    // Set a timeout to mark animation as complete
    const timer = setTimeout(() => {
      setIsAnimationComplete(true)
      // Add a small delay before calling onComplete
      setTimeout(onComplete, 500)
    }, 3500) // Total animation duration + small buffer

    return () => clearTimeout(timer)
  }, [onComplete])

  // Split the text into individual characters for animation
  const visitText = "VISIT"
  const eswatiniText = "ESWATINI"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Flag background - no overlay to show the flag clearly */}
      <div className="absolute inset-0">
        <Image src="/images/eswatini-flag.jpeg" alt="Eswatini Flag" fill className="object-cover" priority />
        {/* Remove the overlay div that was here */}
      </div>

      <div className="relative text-center">
        {/* VISIT text */}
        <div className="flex justify-center mb-2">
          {visitText.split("").map((char, index) => (
            <motion.span
              key={`visit-${index}`}
              className="text-6xl md:text-8xl font-bold text-white inline-block text-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index === 0 ? 0 : 0.2 * index, // V appears first
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* ESWATINI text */}
        <div className="flex justify-center">
          {eswatiniText.split("").map((char, index) => (
            <motion.span
              key={`eswatini-${index}`}
              className="text-6xl md:text-8xl font-bold text-white inline-block text-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 1 + index * 0.15, // Start after VISIT, with the last I appearing last
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Animated underline */}
        <motion.div
          className="h-1 bg-white rounded-full mx-auto mt-4"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 2.5 }}
        />

        {/* Tagline with fade in */}
        <motion.p
          className="text-white mt-6 text-lg text-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
        >
          Discover Africa's Hidden Gem
        </motion.p>
      </div>

      {/* Exit animation */}
      {isAnimationComplete && (
        <motion.div
          className="absolute inset-0 bg-black z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  )
}
