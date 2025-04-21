import { getSupabaseServerClient } from "./supabase"

// Regions
export async function getRegions() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("regions").select("*").order("name")

  if (error) {
    console.error("Error fetching regions:", error)
    return []
  }

  return data
}

export async function getRegionBySlug(slug: string) {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("regions").select("*").eq("slug", slug).single()

  if (error) {
    console.error(`Error fetching region ${slug}:`, error)
    return null
  }

  return data
}

// Categories
export async function getCategories() {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data
}

export async function getCategoryBySlug(slug: string) {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).single()

  if (error) {
    console.error(`Error fetching category ${slug}:`, error)
    return null
  }

  return data
}

// Providers
export async function getProviders(options?: {
  category?: string
  region?: string
  limit?: number
}) {
  const supabase = getSupabaseServerClient()
  let query = supabase.from("providers").select("*")

  if (options?.category && options.category !== "all") {
    query = query.eq("category", options.category)
  }

  if (options?.region && options.region !== "all") {
    query = query.eq("region", options.region)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query.order("rating", { ascending: false })

  if (error) {
    console.error("Error fetching providers:", error)
    return []
  }

  return data
}

export async function getProviderBySlug(id: string) {
  const supabase = getSupabaseServerClient()

  // First try to find by slug
  let { data, error } = await supabase.from("providers").select("*").eq("slug", id).single()

  if (error || !data) {
    // If not found by slug, try to find by id
    const { data: dataById, error: errorById } = await supabase.from("providers").select("*").eq("id", id).single()

    if (errorById) {
      console.error(`Error fetching provider ${id}:`, errorById)
      return null
    }

    data = dataById
  }

  return data
}

// Events
export async function getEvents(options?: {
  category?: string
  region?: string
  upcoming?: boolean
  limit?: number
}) {
  const supabase = getSupabaseServerClient()
  let query = supabase.from("events").select("*")

  if (options?.category && options.category !== "all") {
    query = query.eq("category", options.category)
  }

  if (options?.region && options.region !== "all") {
    query = query.eq("region", options.region)
  }

  if (options?.upcoming) {
    const today = new Date().toISOString().split("T")[0]
    query = query.gte("date", today)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query.order("date")

  if (error) {
    console.error("Error fetching events:", error)
    return []
  }

  return data
}

// Reviews
export async function getReviewsForProvider(providerId: number) {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("provider_id", providerId)
    .order("date", { ascending: false })

  if (error) {
    console.error(`Error fetching reviews for provider ${providerId}:`, error)
    return []
  }

  return data
}

export async function addReview(review: {
  provider_id: number
  user_id?: string
  user_name: string
  rating: number
  comment: string
}) {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("reviews").insert([review]).select().single()

  if (error) {
    console.error("Error adding review:", error)
    return null
  }

  // Update provider rating and review count
  await updateProviderRating(review.provider_id)

  return data
}

// Helper function to update provider rating after new review
async function updateProviderRating(providerId: number) {
  const supabase = getSupabaseServerClient()

  // Get all reviews for this provider
  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("rating")
    .eq("provider_id", providerId)

  if (reviewsError || !reviews) {
    console.error(`Error fetching reviews for rating update:`, reviewsError)
    return
  }

  // Calculate new average rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

  // Update provider
  const { error: updateError } = await supabase
    .from("providers")
    .update({
      rating: averageRating,
      review_count: reviews.length,
    })
    .eq("id", providerId)

  if (updateError) {
    console.error(`Error updating provider rating:`, updateError)
  }
}

// Saved Items
export async function getSavedItems(userId: string) {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from("saved_items")
    .select(`
      id,
      provider_id,
      providers (*)
    `)
    .eq("user_id", userId)

  if (error) {
    console.error(`Error fetching saved items for user ${userId}:`, error)
    return []
  }

  return data
}

export async function toggleSavedItem(userId: string, providerId: number) {
  const supabase = getSupabaseServerClient()

  // Check if item is already saved
  const { data: existingItem, error: checkError } = await supabase
    .from("saved_items")
    .select("id")
    .eq("user_id", userId)
    .eq("provider_id", providerId)
    .single()

  if (checkError && checkError.code !== "PGRST116") {
    // PGRST116 is "no rows returned" error
    console.error("Error checking saved item:", checkError)
    return { success: false, saved: false }
  }

  // If already saved, remove it
  if (existingItem) {
    const { error: deleteError } = await supabase.from("saved_items").delete().eq("id", existingItem.id)

    if (deleteError) {
      console.error("Error removing saved item:", deleteError)
      return { success: false, saved: true }
    }

    return { success: true, saved: false }
  }

  // Otherwise, add it
  const { error: insertError } = await supabase
    .from("saved_items")
    .insert([{ user_id: userId, provider_id: providerId }])

  if (insertError) {
    console.error("Error adding saved item:", insertError)
    return { success: false, saved: false }
  }

  return { success: true, saved: true }
}

// Bookings
export async function getUserBookings(userId: string) {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      providers (id, name, location, category)
    `)
    .eq("user_id", userId)
    .order("booking_date")

  if (error) {
    console.error(`Error fetching bookings for user ${userId}:`, error)
    return []
  }

  return data
}

export async function createBooking(booking: {
  user_id: string
  provider_id: number
  booking_date: string
  booking_time?: string
  people: number
  price: number
}) {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from("bookings").insert([booking]).select().single()

  if (error) {
    console.error("Error creating booking:", error)
    return null
  }

  return data
}
