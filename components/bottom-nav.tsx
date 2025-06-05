"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Map, Compass, Utensils, User } from "lucide-react"

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Map",
    href: "/map",
    icon: Map,
  },
  {
    name: "Explore",
    href: "/regions/hhohho",
    icon: Compass,
  },
  {
    name: "Dining",
    href: "/categories/dining",
    icon: Utensils,
  },
  {
    name: "Profile",
    href: "/dashboard",
    icon: User,
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    if (href === "/regions/hhohho") {
      return pathname.startsWith("/regions")
    }
    if (href === "/categories/dining") {
      return pathname.startsWith("/categories")
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-gray-700 z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                active ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${active ? "text-white" : ""}`} />
              <span className={`text-xs font-medium ${active ? "text-white" : ""}`}>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
