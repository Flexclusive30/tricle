import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"

interface ProviderCardProps {
  provider: any
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  // Ensure we have a valid link path
  const providerPath = `/providers/${provider.slug || provider.id}`

  return (
    <Link href={providerPath} className="group">
      <div className="bg-white/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl h-full flex flex-col">
        <div className="h-40 sm:h-48 overflow-hidden">
          <img
            src={`/placeholder.svg?height=300&width=500&text=${provider.name}`}
            alt={provider.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-3 md:p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-base md:text-lg text-shadow line-clamp-1">{provider.name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm ml-1">{provider.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-foreground mb-2 text-shadow-light">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{provider.location}</span>
          </div>

          {provider.tags && provider.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {provider.tags.slice(0, 2).map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs bg-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <p className="text-foreground text-xs md:text-sm mb-3 line-clamp-2 text-shadow-light flex-grow">
            {provider.description}
          </p>

          <div className="flex justify-between items-center mt-auto">
            <span className="text-primary font-medium text-sm md:text-base">
              {provider.price > 0 ? `E${provider.price}` : "Free"}
            </span>
            <Button size="sm" className="bg-white/50 hover:bg-white/70 text-xs md:text-sm py-1 px-2 h-auto">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
