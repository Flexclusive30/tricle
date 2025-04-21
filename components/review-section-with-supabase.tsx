"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, User } from "lucide-react"
import { submitReview } from "@/app/actions/review-actions"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"

interface ReviewSectionProps {
  providerId: string | number
  initialReviews?: any[]
}

export default function ReviewSection({ providerId, initialReviews = [] }: ReviewSectionProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [userName, setUserName] = useState("")
  const [reviews, setReviews] = useState(initialReviews)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("providerId", providerId.toString())
    formData.append("rating", rating.toString())
    formData.append("comment", reviewText)
    formData.append("userName", userName)

    const result = await submitReview(formData)

    setIsSubmitting(false)

    if (result.success) {
      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback!",
      })

      // Add the new review to the list
      if (result.review) {
        setReviews([result.review, ...reviews])
      }

      // Reset form
      setRating(0)
      setReviewText("")
      setUserName("")
    } else {
      toast({
        title: "Error",
        description: result.message || "Failed to submit review",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>

      <div className="space-y-6 mb-8">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">{review.user_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
        )}
      </div>

      <div className="bg-muted/30 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Rating</label>
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 cursor-pointer ${
                      i < (hoverRating || rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience..."
              className="min-h-[100px]"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || rating === 0 || reviewText.trim() === "" || userName.trim() === ""}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
    </div>
  )
}
