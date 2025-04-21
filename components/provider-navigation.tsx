"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ProviderNavigationProps {
  className?: string
  providerId?: string // Add providerId prop to make navigation specific to a provider
}

export default function ProviderNavigation({ className, providerId }: ProviderNavigationProps) {
  const [activeSection, setActiveSection] = useState("about")

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "amenities", "services", "hours"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If the section is in view (with some offset for the sticky header)
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section when clicking navigation item
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -100 // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  return (
    <div
      className={cn(
        "sticky top-16 z-30 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex overflow-x-auto">
          <ul className="flex w-max space-x-8 py-4">
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  activeSection === "about" ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground",
                )}
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("amenities")}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  activeSection === "amenities"
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground",
                )}
              >
                Amenities
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("services")}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  activeSection === "services"
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground",
                )}
              >
                Services & Activities
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("hours")}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  activeSection === "hours" ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground",
                )}
              >
                Opening Hours
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
