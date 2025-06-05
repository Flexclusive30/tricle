"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"
import { allProviders, categories, regions } from "@/lib/data"
import ProviderCard from "@/components/provider-card"

export default function ExperienceFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [filteredProviders, setFilteredProviders] = useState(allProviders)
  const [showFilters, setShowFilters] = useState(false)

  // Price ranges
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "free", label: "Free" },
    { value: "budget", label: "Under E200" },
    { value: "mid", label: "E200 - E500" },
    { value: "premium", label: "E500 - E1000" },
    { value: "luxury", label: "Over E1000" },
  ]

  // Rating filters
  const ratingFilters = [
    { value: "all", label: "All Ratings" },
    { value: "4.5", label: "4.5+ Stars" },
    { value: "4.0", label: "4.0+ Stars" },
    { value: "3.5", label: "3.5+ Stars" },
    { value: "3.0", label: "3.0+ Stars" },
  ]

  // Sort options
  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name A-Z" },
    { value: "reviews", label: "Most Reviews" },
  ]

  // Filter and sort providers
  useEffect(() => {
    const filtered = allProviders.filter((provider) => {
      // Search term filter
      if (
        searchTerm &&
        !provider.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !provider.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !provider.location.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // Category filter
      if (selectedCategory !== "all" && provider.category !== selectedCategory) {
        return false
      }

      // Region filter
      if (selectedRegion !== "all" && provider.region !== selectedRegion) {
        return false
      }

      // Price range filter
      if (selectedPriceRange !== "all") {
        const price = provider.price
        switch (selectedPriceRange) {
          case "free":
            if (price > 0) return false
            break
          case "budget":
            if (price === 0 || price >= 200) return false
            break
          case "mid":
            if (price < 200 || price >= 500) return false
            break
          case "premium":
            if (price < 500 || price >= 1000) return false
            break
          case "luxury":
            if (price < 1000) return false
            break
        }
      }

      // Rating filter
      if (selectedRating !== "all") {
        const minRating = Number.parseFloat(selectedRating)
        if (provider.rating < minRating) return false
      }

      return true
    })

    // Sort providers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        case "reviews":
          return b.reviewCount - a.reviewCount
        default:
          return 0
      }
    })

    setFilteredProviders(filtered)
  }, [searchTerm, selectedCategory, selectedRegion, selectedPriceRange, selectedRating, sortBy])

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedRegion("all")
    setSelectedPriceRange("all")
    setSelectedRating("all")
    setSortBy("rating")
  }

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0
    if (searchTerm) count++
    if (selectedCategory !== "all") count++
    if (selectedRegion !== "all") count++
    if (selectedPriceRange !== "all") count++
    if (selectedRating !== "all") count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search experiences, locations, activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filter Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Filter Options */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 flex-1 ${showFilters ? "block" : "hidden lg:grid"}`}
            >
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.slug} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Region Filter */}
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region.slug} value={region.slug}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Range Filter */}
              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Rating Filter */}
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  {ratingFilters.map((rating) => (
                    <SelectItem key={rating.value} value={rating.value}>
                      {rating.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: "{searchTerm}"
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </Badge>
              )}
              {selectedRegion !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {regions.find((r) => r.slug === selectedRegion)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedRegion("all")} />
                </Badge>
              )}
              {selectedPriceRange !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {priceRanges.find((p) => p.value === selectedPriceRange)?.label}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedPriceRange("all")} />
                </Badge>
              )}
              {selectedRating !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {ratingFilters.find((r) => r.value === selectedRating)?.label}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedRating("all")} />
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">
            {filteredProviders.length === allProviders.length ? "All Experiences" : `Filtered Results`}
          </h2>
          <Badge variant="outline" className="text-sm">
            {filteredProviders.length} of {allProviders.length} experiences
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Sorted by: {sortOptions.find((s) => s.value === sortBy)?.label}</span>
        </div>
      </div>

      {/* Results Grid */}
      {filteredProviders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No experiences found</h3>
              <p>Try adjusting your filters or search terms to find more experiences.</p>
            </div>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
