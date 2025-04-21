"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface RegionDetailMapProps {
  region: string
}

export default function RegionDetailMap({ region }: RegionDetailMapProps) {
  const router = useRouter()

  // Define the position and size for each region's focus area
  const regionFocus = {
    hhohho: {
      objectPosition: "0% 0%",
      objectFit: "cover" as const,
      aspectRatio: "1/1",
    },
    manzini: {
      objectPosition: "20% 60%",
      objectFit: "cover" as const,
      aspectRatio: "1/1",
    },
    lubombo: {
      objectPosition: "80% 50%",
      objectFit: "cover" as const,
      aspectRatio: "1/1",
    },
    shiselweni: {
      objectPosition: "30% 90%",
      objectFit: "cover" as const,
      aspectRatio: "1/1",
    },
  }

  const focus = regionFocus[region as keyof typeof regionFocus] || regionFocus.hhohho

  // Get region name with proper capitalization
  const regionName = region.charAt(0).toUpperCase() + region.slice(1)

  // Handle click to navigate to region page
  const handleClick = () => {
    router.push(`/regions/${region}`)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">{regionName} Region Map</h3>
        <div
          className="relative w-full rounded-lg overflow-hidden border shadow-md cursor-pointer"
          style={{ aspectRatio: focus.aspectRatio }}
          onClick={handleClick}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eswatini-regions-and-capital-map.jpg-8pRhxbWrd2qTai5z4ud80k8ADOUXdO.jpeg"
            alt={`Map of ${regionName} region in Eswatini`}
            fill
            style={{
              objectFit: focus.objectFit,
              objectPosition: focus.objectPosition,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent hover:from-black/50 transition-colors" />
          <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-md text-sm font-medium">
            {regionName} Region
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button>Explore {regionName}</Button>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2">Major Cities in {regionName}</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {region === "hhohho" && (
              <>
                <li>Mbabane (Executive Capital)</li>
                <li>Lobamba (Legislative Capital)</li>
                <li>Piggs Peak</li>
                <li>Bulembu</li>
                <li>Ngwenya</li>
              </>
            )}
            {region === "manzini" && (
              <>
                <li>Manzini (Regional Capital)</li>
                <li>Malkerns</li>
                <li>Bhunya</li>
                <li>Mankayane</li>
                <li>Luyengo</li>
              </>
            )}
            {region === "lubombo" && (
              <>
                <li>Siteki (Regional Capital)</li>
                <li>Big Bend</li>
                <li>Simunye</li>
                <li>Mhlume</li>
                <li>Tikhuba</li>
              </>
            )}
            {region === "shiselweni" && (
              <>
                <li>Nhlangano (Regional Capital)</li>
                <li>Hlatikulu</li>
                <li>Lavumisa</li>
                <li>Hluti</li>
                <li>Matsanjeni</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
