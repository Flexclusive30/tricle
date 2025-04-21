"use server"

import { addReview } from "@/lib/data-service"

export async function submitReview(formData: FormData) {
  try {
    const providerId = Number.parseInt(formData.get("providerId") as string)
    const rating = Number.parseInt(formData.get("rating") as string)
    const comment = formData.get("comment") as string
    const userName = formData.get("userName") as string

    if (!providerId || !rating || !comment || !userName) {
      return { success: false, message: "All fields are required" }
    }

    if (rating < 1 || rating > 5) {
      return { success: false, message: "Rating must be between 1 and 5" }
    }

    const review = await addReview({
      provider_id: providerId,
      user_name: userName,
      rating,
      comment,
    })

    if (!review) {
      return { success: false, message: "Failed to submit review" }
    }

    return { success: true, message: "Review submitted successfully", review }
  } catch (error) {
    console.error("Error submitting review:", error)
    return { success: false, message: "An error occurred while submitting your review" }
  }
}
