"use server"

import { getSupabaseServerClient } from "./supabase"
import { regions, categories, providers, events } from "./data"

export async function seedDatabase() {
  const supabase = getSupabaseServerClient()

  try {
    // Seed regions
    console.log("Seeding regions...")
    for (const region of regions) {
      const { error } = await supabase.from("regions").upsert(
        {
          slug: region.slug,
          name: region.name,
          tagline: region.tagline,
          description: region.description,
        },
        { onConflict: "slug" },
      )

      if (error) throw error
    }

    // Seed categories
    console.log("Seeding categories...")
    for (const category of categories) {
      const { error } = await supabase.from("categories").upsert(
        {
          slug: category.slug,
          name: category.name,
          icon: category.icon.name, // Store the icon name as string
          count: category.count,
          description: category.description,
        },
        { onConflict: "slug" },
      )

      if (error) throw error
    }

    // Seed providers
    console.log("Seeding providers...")
    for (const provider of providers) {
      const { error } = await supabase.from("providers").upsert(
        {
          slug: provider.id, // Use id as slug
          name: provider.name,
          category: provider.category,
          region: provider.region,
          location: provider.location,
          address: provider.address,
          description: provider.description,
          rating: provider.rating,
          review_count: provider.reviewCount || 0,
          price: provider.price,
          tags: provider.tags || [],
          amenities: provider.amenities || [],
          services: provider.services || [],
          phone: provider.phone || null,
          email: provider.email || null,
          website: provider.website || null,
        },
        { onConflict: "slug" },
      )

      if (error) throw error
    }

    // Seed events
    console.log("Seeding events...")
    for (const event of events) {
      const { error } = await supabase.from("events").upsert(
        {
          slug: event.id,
          name: event.name,
          category: event.category,
          region: event.region,
          location: event.location,
          date: event.date,
          time: event.time,
          description: event.description,
          image_url: event.image,
        },
        { onConflict: "slug" },
      )

      if (error) throw error
    }

    return { success: true, message: "Database seeded successfully" }
  } catch (error) {
    console.error("Error seeding database:", error)
    return { success: false, message: "Error seeding database", error }
  }
}
