"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Camera, Send } from "lucide-react"

export default function ShareExperienceSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setName("")
      setEmail("")
      setMessage("")
      setFile(null)
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <section className="container mx-auto py-12 md:py-16 px-4">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Share Your Experience</h2>
          <p className="text-muted-foreground mb-6">
            We'd love to hear about your adventures in Eswatini! Share your stories, photos, and feedback to help other
            travelers plan their perfect trip.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/images/eswatini-cultural.jpg"
                alt="Cultural experience shared by visitor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="/images/eswatini-wildlife.jpg"
                alt="Wildlife photo shared by visitor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden hidden sm:block">
              <img
                src="/images/eswatini-landscape.jpg"
                alt="Landscape photo shared by visitor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Why share your experience?</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="h-2 w-2 bg-primary rounded-full mr-2 mt-1.5"></span>
                <span>Help other travelers discover hidden gems in Eswatini</span>
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 bg-primary rounded-full mr-2 mt-1.5"></span>
                <span>Get featured on our social media channels</span>
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 bg-primary rounded-full mr-2 mt-1.5"></span>
                <span>Enter our monthly photo contest for a chance to win prizes</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  Your experience has been submitted successfully. We appreciate you sharing your Eswatini adventure
                  with us!
                </p>
                <Button onClick={() => setIsSubmitted(false)}>Share Another Experience</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Experience</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your experience in Eswatini..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">Share a Photo (Optional)</Label>
                  <div className="flex items-center">
                    <label
                      htmlFor="photo"
                      className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <Camera className="h-5 w-5" />
                      <span>{file ? file.name : "Choose a photo"}</span>
                    </label>
                    <Input id="photo" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Your Experience
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
