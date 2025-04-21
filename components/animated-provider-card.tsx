"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AnimatedProviderCardProps {
  provider: any
  className?: string
}

export default function AnimatedProviderCard({ provider, className }: AnimatedProviderCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Generate a simple logo based on the first letter of the provider name
  const firstLetter = provider.name.charAt(0).toUpperCase()

  // Determine category color
  const getCategoryColor = () => {
    switch (provider.category) {
      case "entertainment":
        return "text-purple-500 border-purple-500"
      case "accommodation":
        return "text-blue-500 border-blue-500"
      case "dining":
        return "text-orange-500 border-orange-500"
      case "adventure":
        return "text-green-500 border-green-500"
      case "cultural":
        return "text-red-500 border-red-500"
      default:
        return "text-primary border-primary"
    }
  }

  const categoryColor = getCategoryColor()
  const [textColor, borderColor] = categoryColor.split(" ")

  return (
    <Link href={`/providers/${provider.id || provider.slug}`}>
      <div
        className={cn(
          "w-[300px] h-[200px] bg-slate-800/35 backdrop-blur-sm relative flex items-center justify-center rounded-lg overflow-hidden transition-all duration-500 group",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated border */}
        <div
          className={cn(
            "absolute inset-0 border-2 opacity-0 rotate-3 transition-all duration-500",
            borderColor,
            isHovered && "inset-[15px] opacity-100 rotate-0",
          )}
        />

        {/* Content */}
        <div className="transition-all duration-500 z-10 flex flex-col items-center">
          {/* Logo area */}
          <div
            className={cn(
              "h-[35px] relative overflow-hidden transition-all duration-1000",
              isHovered ? "w-[134px]" : "w-[33px]",
            )}
          >
            <div className="h-[33px] absolute left-0">
              <div
                className={cn("h-10 w-10 rounded-full flex items-center justify-center text-xl font-bold", textColor)}
              >
                {firstLetter}
              </div>
            </div>
            <div className="h-[33px] absolute left-[33px]">
              <div className={cn("text-lg font-bold whitespace-nowrap", textColor)}>{provider.name}</div>
            </div>
            <span className={cn("absolute right-0 h-full w-full opacity-0", isHovered && "animate-trail")} />
          </div>

          {/* Provider type */}
          <span
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-[30px] text-xs opacity-0 transition-all duration-500 delay-500",
              textColor,
              isHovered && "opacity-100 tracking-[9.5px]",
            )}
          >
            {provider.category}
          </span>
        </div>

        {/* Bottom text */}
        <span
          className={cn(
            "absolute left-1/2 bottom-[13px] -translate-x-1/2 text-[6px] uppercase px-[5px] pl-[8px] bg-slate-800/70 opacity-0 tracking-[7px] transition-all duration-500",
            textColor,
            isHovered && "opacity-100 tracking-[3px]",
          )}
        >
          {provider.location}
        </span>
      </div>
    </Link>
  )
}
