"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center text-muted-foreground hover:text-foreground"
      onClick={handleBack}
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      Back
    </Button>
  )
}
