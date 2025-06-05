import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"

interface ProviderCardProps {
  provider: any
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Link href={`/providers/${provider.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
        <div className="h-48 overflow-hidden">
          <img
            src={`/placeholder.svg?height=300&width=500&text=${provider.name}`}
            alt={provider.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">{provider.name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm ml-1">{provider.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{provider.location}</span>
          </div>

          {provider.tags && provider.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {provider.tags.slice(0, 2).map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{provider.description}</p>

          <div className="flex justify-between items-center">
            <span className="text-primary font-medium">{provider.price > 0 ? `E${provider.price}` : "Free"}</span>
            <Button size="sm">View Details</Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
