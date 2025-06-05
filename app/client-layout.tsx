"use client"

import type React from "react"
import BottomNav from "@/components/bottom-nav"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="bg-overlay">
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
        <BottomNav />
      </ThemeProvider>
    </div>
  )
}
