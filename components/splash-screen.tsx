"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

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

  // Eswatini flag colors: Blue (#3A75C4), Yellow (#FFCD00), Red (#CE1126), White (#FFFFFF)
  const flagColors = ["#3A75C4", "#FFCD00", "#CE1126", "#FFFFFF"]

  // Function to get color for each letter
  const getLetterColor = (index: number, totalLetters: number) => {
    return flagColors[index % flagColors.length]
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative text-center">
        {/* VISIT text */}
        <div className="flex justify-center mb-2">
          {visitText.split("").map((char, index) => (
            <motion.span
              key={`visit-${index}`}
              className="text-6xl md:text-8xl font-bold inline-block"
              style={{ color: getLetterColor(index, visitText.length) }}
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
              className="text-6xl md:text-8xl font-bold inline-block"
              style={{ color: getLetterColor(index + visitText.length, visitText.length + eswatiniText.length) }}
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

        {/* Animated underline with flag colors */}
        <motion.div
          className="h-2 rounded-full mx-auto mt-4 relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div className="absolute inset-0 flex">
            <div className="flex-1 bg-blue-600" style={{ backgroundColor: "#3A75C4" }}></div>
            <div className="flex-1 bg-yellow-400" style={{ backgroundColor: "#FFCD00" }}></div>
            <div className="flex-1 bg-red-600" style={{ backgroundColor: "#CE1126" }}></div>
            <div className="flex-1 bg-white"></div>
          </div>
        </motion.div>

        {/* Tagline with fade in */}
        <motion.p
          className="text-white mt-6 text-lg"
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
