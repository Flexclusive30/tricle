import { allProviders } from "./data"

export function getProviderByIdFallback(id: string) {
  // First, try to find an exact match by id
  let provider = allProviders.find((p) => p.id === id)

  if (provider) {
    return {
      ...provider,
      slug: provider.id, // Ensure slug is set
      review_count: provider.reviewCount || 0, // Map reviewCount to review_count for consistency
    }
  }

  // If not found, try case-insensitive matching
  const normalizedId = id.toLowerCase().replace(/-/g, " ")

  // Special cases for known providers
  if (normalizedId.includes("royal swazi spa")) {
    provider = allProviders.find((p) => p.id === "royal-swazi-spa")
  } else if (normalizedId.includes("hlane") || normalizedId.includes("royal national park")) {
    provider = allProviders.find((p) => p.id === "hlane-royal-national-park")
  } else {
    // Try to find by name similarity
    provider = allProviders.find(
      (p) => p.name.toLowerCase().includes(normalizedId) || normalizedId.includes(p.name.toLowerCase()),
    )
  }

  if (provider) {
    return {
      ...provider,
      slug: provider.id, // Ensure slug is set
      review_count: provider.reviewCount || 0, // Map reviewCount to review_count for consistency
    }
  }

  return null
}
