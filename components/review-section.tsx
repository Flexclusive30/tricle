"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, User } from "lucide-react"

interface ReviewSectionProps {
  providerId: string
}

export default function ReviewSection({ providerId }: ReviewSectionProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  // Mock reviews
  const reviews = [
    {
      id: "review-1",
      user: "John Smith",
      date: "2023-05-15",
      rating: 5,
      comment:
        "Amazing experience! The staff was incredibly friendly and the facilities were top-notch. Would definitely recommend to anyone visiting Eswatini.",
    },
    {
      id: "review-2",
      user: "Sarah Johnson",
      date: "2023-04-22",
      rating: 4,
      comment:
        "Great place to visit. The cultural tour was very informative and entertaining. Only giving 4 stars because the food options were a bit limited.",
    },
    {
      id: "review-3",
      user: "Michael Brown",
      date: "2023-03-10",
      rating: 5,
      comment:
        "One of the highlights of our trip to Eswatini. The views were breathtaking and the guides were very knowledgeable about the local history and wildlife.",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle review submission
    alert("Review submitted! (This is a demo)")
    setRating(0)
    setReviewText("")
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>

      <div className="space-y-6 mb-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium">{review.user}</h4>
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
        ))}
      </div>

      <div className="bg-muted/30 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit}>
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
            />
          </div>

          <Button type="submit" disabled={rating === 0 || reviewText.trim() === ""}>
            Submit Review
          </Button>
        </form>
      </div>
    </div>
  )
}
