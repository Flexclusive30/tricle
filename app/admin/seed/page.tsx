"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { seedDatabase } from "@/lib/seed-data"
import { Loader2 } from "lucide-react"

export default function SeedPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; message?: string } | null>(null)

  const handleSeed = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const seedResult = await seedDatabase()
      setResult(seedResult)
    } catch (error) {
      setResult({ success: false, message: "An unexpected error occurred" })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Seed Database</CardTitle>
          <CardDescription>
            This will populate your Supabase database with initial data for the Eswatini Tourism app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">This action will seed your database with:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Regions</li>
            <li>Categories</li>
            <li>Providers (accommodations, tours, etc.)</li>
            <li>Events</li>
          </ul>

          {result && (
            <div
              className={`mt-4 p-3 rounded-md ${result.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
            >
              {result.message}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSeed} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Seeding Database...
              </>
            ) : (
              "Seed Database"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
