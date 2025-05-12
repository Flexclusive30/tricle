"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Map, Calendar, Compass, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon, User } from "lucide-react"

export default function BottomNavigation() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore", href: "/categories/all", icon: Compass },
    { name: "Map", href: "/destinations-map", icon: Map },
    { name: "Events", href: "/events", icon: Calendar },
  ]

  // Full navigation links for the menu
  const fullNavLinks = [
    { name: "Home", href: "/" },
    { name: "Regions", href: "/regions/hhohho" },
    { name: "Categories", href: "/categories/accommodation" },
    { name: "Map", href: "/destinations-map" },
    { name: "Events", href: "/events" },
    { name: "Travel Guides", href: "/guides" },
  ]

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Main bottom navigation - visible on all devices */}
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
        <div className="grid h-full grid-cols-5 mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center ${
                  isActive ? "text-eswatini-blue dark:text-eswatini-blue" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? "text-eswatini-blue" : ""}`} />
                <span className="text-xs">{item.name}</span>
              </Link>
            )
          })}

          {/* More menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400">
                <Menu className="w-6 h-6 mb-1" />
                <span className="text-xs">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
              <div className="flex flex-col h-full pt-6">
                <div className="flex justify-between items-center mb-6">
                  <Link href="/" className="font-bold text-xl">
                    <span className="text-eswatini-blue">Visit</span>{" "}
                    <span className="text-eswatini-red">Eswatini</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </div>

                <nav className="grid grid-cols-2 gap-4">
                  {fullNavLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium py-3 px-4 rounded-md transition-colors hover:bg-muted hover:text-eswatini-blue"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pt-6 pb-8">
                  <Button className="w-full bg-eswatini-blue hover:bg-eswatini-blue/90">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind the bottom navigation */}
      <div className="h-16"></div>
    </>
  )
}
