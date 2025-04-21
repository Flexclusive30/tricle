import { providers } from "./data"

export function getProviderByIdFallback(id: string) {
  // First try to match by id
  let provider = providers.find((p) => p.id === id)

  // If not found, try to match by name in a URL-friendly format
  if (!provider) {
    const normalizedId = id.replace(/-/g, " ").toLowerCase()
    provider = providers.find(
      (p) => p.name.toLowerCase() === normalizedId || p.name.toLowerCase().replace(/ /g, "-") === id.toLowerCase(),
    )
  }

  return provider
}
