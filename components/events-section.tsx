"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { events } from "@/lib/data"
import { useState } from "react"

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState("upcoming")

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Get upcoming events (future dates)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingEvents = sortedEvents.filter((event) => new Date(event.date) >= today)

  // Display events based on filter
  const displayEvents = activeFilter === "upcoming" ? upcomingEvents : sortedEvents

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Upcoming Events & Festivals</h2>
            <p className="text-muted-foreground max-w-2xl">
              Don't miss these cultural celebrations and special events during your visit
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0" variant="outline">
            <Link href="/events">
              View All Events
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide gap-3 mb-6 pb-2">
          <Button
            variant={activeFilter === "upcoming" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("upcoming")}
            className="rounded-full"
          >
            Upcoming
          </Button>
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("all")}
            className="rounded-full"
          >
            All Events
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Cultural
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Music
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Sports
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.slice(0, 3).map((event) => (
            <Card key={event.id} className="overflow-hidden h-full hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden relative">
                <img src={event.image || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 m-4">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="bg-primary px-3 py-1 text-white text-xs font-bold text-center">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                    </div>
                    <div className="px-3 py-1 text-center font-bold">{new Date(event.date).getDate()}</div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{event.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{event.location}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link href={`/events/${event.id}`}>Event Details</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-medium">Don't miss the Umhlanga Reed Dance in August!</span>
          </div>
        </div>
      </div>
    </section>
  )
}
