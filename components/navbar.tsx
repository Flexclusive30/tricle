"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          <span className="text-eswatini-blue">Visit</span> <span className="text-eswatini-red">Eswatini</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className={`hidden md:block text-gray-600 dark:text-gray-400 hover:text-eswatini-blue ${pathname === "/" ? "font-semibold" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/categories/all"
            className={`hidden md:block text-gray-600 dark:text-gray-400 hover:text-eswatini-blue ${pathname.startsWith("/categories") ? "font-semibold" : ""}`}
          >
            Explore
          </Link>
          <Link
            href="/destinations-map"
            className={`hidden md:block text-gray-600 dark:text-gray-400 hover:text-eswatini-blue ${pathname === "/map" ? "font-semibold" : ""}`}
          >
            Map
          </Link>
          <Link
            href="/events"
            className={`hidden md:block text-gray-600 dark:text-gray-400 hover:text-eswatini-blue ${pathname === "/events" ? "font-semibold" : ""}`}
          >
            Events
          </Link>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  )
}
