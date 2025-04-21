import { Bed, Compass, Utensils, Mountain, Music, Landmark } from "lucide-react"

export const regions = [
  {
    slug: "hhohho",
    name: "Hhohho",
    tagline: "Cultural Heartland",
    description:
      "Home to the capital Mbabane and the Ezulwini Valley, known for its cultural attractions and royal residences.",
  },
  {
    slug: "manzini",
    name: "Manzini",
    tagline: "Commercial Hub",
    description: "The industrial and commercial center of Eswatini, featuring the country's largest urban area.",
  },
  {
    slug: "lubombo",
    name: "Lubombo",
    tagline: "Savannah Adventures",
    description: "Known for its diverse wildlife, game reserves, and the beautiful Lubombo Mountains.",
  },
  {
    slug: "shiselweni",
    name: "Shiselweni",
    tagline: "Untamed Wilderness",
    description: "A region of rolling hills, forests, and traditional rural Swazi life.",
  },
]

export const categories = [
  {
    slug: "accommodation",
    name: "Accommodation",
    icon: Bed,
    count: 124,
    description: "Find the perfect place to stay, from luxury lodges to traditional beehive huts.",
  },
  {
    slug: "tours",
    name: "Tours",
    icon: Compass,
    count: 87,
    description: "Guided experiences that showcase the best of Eswatini's landscapes and culture.",
  },
  {
    slug: "dining",
    name: "Dining",
    icon: Utensils,
    count: 56,
    description: "Taste traditional Swazi cuisine and international dishes at restaurants across the kingdom.",
  },
  {
    slug: "cultural",
    name: "Cultural Sites",
    icon: Landmark,
    count: 42,
    description: "Explore Eswatini's rich cultural heritage through museums, villages, and historical sites.",
  },
  {
    slug: "adventure",
    name: "Adventure",
    icon: Mountain,
    count: 38,
    description: "Get your adrenaline pumping with hiking, rafting, and other outdoor activities.",
  },
  {
    slug: "entertainment",
    name: "Entertainment",
    icon: Music,
    count: 35,
    description: "Experience Eswatini's vibrant nightlife, music venues, and entertainment spots.",
  },
]

// Featured provider for the homepage
export const featuredProvider = {
  id: "featured-provider",
  name: "Hilton Mbabane",
  category: "accommodation",
  region: "hhohho",
  location: "Mbabane",
  address: "Main Street, Mbabane, Eswatini",
  description:
    "Experience luxury in the heart of Mbabane with stunning views of the surrounding mountains and valleys. Our 5-star hotel offers world-class amenities and exceptional service.",
  rating: 4.9,
  reviewCount: 245,
  price: 2500,
  tags: ["Luxury", "City Center", "Mountain View"],
  amenities: [
    "Swimming Pool",
    "Spa",
    "Fitness Center",
    "Restaurant",
    "Bar",
    "Conference Rooms",
    "Free Wi-Fi",
    "Room Service",
  ],
  services: [
    "24-hour Room Service",
    "Airport Transfers",
    "Concierge Service",
    "Laundry Service",
    "Business Center",
    "Tour Arrangements",
  ],
  phone: "+268 2404 1234",
  email: "reservations@hiltonmbabane.sz",
  website: "https://www.hiltonmbabane.sz",
}

export const providers = [
  {
    id: "mantenga-cultural-village",
    name: "Mantenga Cultural Village",
    category: "cultural",
    region: "hhohho",
    location: "Ezulwini Valley",
    address: "Mantenga Nature Reserve, Ezulwini Valley, Eswatini",
    description:
      "Experience traditional Swazi culture through dance performances, crafts demonstrations, and a guided tour of a reconstructed Swazi homestead.",
    rating: 4.8,
    reviewCount: 156,
    price: 250,
    tags: ["Cultural Experience", "Traditional Dance", "Guided Tours"],
    amenities: ["Craft Shop", "Restaurant", "Parking", "Restrooms", "Wheelchair Accessible"],
    services: [
      "Traditional Sibhaca Dance Performances",
      "Guided Tours of Traditional Homestead",
      "Cultural Workshops",
      "Craft Demonstrations",
      "Traditional Swazi Meals",
    ],
    phone: "+268 2416 1179",
    email: "info@mantengaculturalvillage.co.sz",
    website: "https://www.mantengaculturalvillage.co.sz",
  },
  {
    id: "mlilwane-wildlife-sanctuary",
    name: "Mlilwane Wildlife Sanctuary",
    category: "adventure",
    region: "hhohho",
    location: "Ezulwini Valley",
    address: "Ezulwini Valley, Eswatini",
    description:
      "Eswatini's oldest protected area offering wildlife viewing, hiking, mountain biking, and horseback riding in a beautiful savanna setting.",
    rating: 4.7,
    reviewCount: 203,
    price: 150,
    tags: ["Wildlife", "Outdoor Activities", "Nature"],
    amenities: ["Accommodation", "Restaurant", "Camping", "Swimming Pool", "Gift Shop"],
    services: [
      "Guided Game Drives",
      "Horseback Safaris",
      "Mountain Biking Trails",
      "Hiking Trails",
      "Bird Watching Tours",
    ],
    phone: "+268 2528 3943",
    email: "reservations@biggameparks.org",
    website: "https://www.biggameparks.org/mlilwane",
  },
  {
    id: "royal-swazi-spa",
    name: "Royal Swazi Spa",
    category: "accommodation",
    region: "hhohho",
    location: "Ezulwini Valley",
    address: "Old Mbabane-Manzini Main Road, Ezulwini Valley",
    description:
      "Luxury resort featuring a hotel, spa, casino, and championship golf course in the heart of the Ezulwini Valley.",
    rating: 4.5,
    reviewCount: 178,
    price: 1500,
    tags: ["Luxury", "Golf", "Spa"],
    amenities: ["Swimming Pool", "Spa", "Casino", "Golf Course", "Restaurants", "Bars", "Gym", "Conference Facilities"],
    services: ["Spa Treatments", "Golf Lessons", "Casino Gaming", "Fine Dining", "Conference Hosting"],
    phone: "+268 2416 5000",
    email: "reservations@royalswazi.sz",
    website: "https://www.royalswazi.sz",
  },
  {
    id: "swazi-candles",
    name: "Swazi Candles Craft Market",
    category: "cultural",
    region: "manzini",
    location: "Malkerns Valley",
    address: "Malkerns Valley, Eswatini",
    description:
      "Artisan marketplace featuring handcrafted candles, textiles, and other local crafts, with live demonstrations of candle making.",
    rating: 4.6,
    reviewCount: 124,
    price: 0,
    tags: ["Shopping", "Crafts", "Souvenirs"],
    amenities: ["Cafe", "Parking", "Restrooms"],
    services: ["Candle Making Demonstrations", "Craft Shopping", "Cafe Services"],
    phone: "+268 2528 3266",
    email: "info@swazicandles.com",
    website: "https://www.swazicandles.com",
  },
  {
    id: "hlane-royal-national-park",
    name: "Hlane Royal National Park",
    category: "adventure",
    region: "lubombo",
    location: "Lubombo Region",
    address: "Lubombo Region, Eswatini",
    description:
      "Eswatini's largest protected area, home to lions, elephants, rhinos, and diverse birdlife, offering game drives and guided walks.",
    rating: 4.9,
    reviewCount: 187,
    price: 200,
    tags: ["Big Five", "Safari", "Wildlife"],
    amenities: ["Accommodation", "Restaurant", "Camping", "Game Viewing Hides"],
    services: ["Game Drives", "Guided Bush Walks", "Bird Watching Tours", "Rhino Tracking", "Bush Dinners"],
    phone: "+268 2383 8100",
    email: "reservations@biggameparks.org",
    website: "https://www.biggameparks.org/hlane",
  },
  {
    id: "shewula-mountain-camp",
    name: "Shewula Mountain Camp",
    category: "accommodation",
    region: "lubombo",
    location: "Shewula Community",
    address: "Shewula Community, Lubombo Mountains",
    description:
      "Community-owned eco-lodge offering authentic cultural experiences and stunning views of the Lubombo Mountains and plains.",
    rating: 4.7,
    reviewCount: 92,
    price: 450,
    tags: ["Eco-Tourism", "Community Project", "Cultural Experience"],
    amenities: ["Traditional Accommodation", "Restaurant", "Guided Tours", "Cultural Activities"],
    services: [
      "Cultural Village Tours",
      "Traditional Meals",
      "Hiking Trails",
      "Bird Watching",
      "Community Project Visits",
    ],
    phone: "+268 7602 0202",
    email: "bookings@shewulacamp.org",
    website: "https://www.shewulacamp.org",
  },
  // Add new entertainment providers
  {
    id: "solanis-entertainment",
    name: "Solanis Entertainment",
    category: "entertainment",
    region: "manzini",
    location: "Manzini",
    address: "Main Street, Manzini, Eswatini",
    description:
      "Premier entertainment venue featuring live music, DJ nights, and cultural performances in a vibrant atmosphere.",
    rating: 4.8,
    reviewCount: 156,
    price: 100,
    tags: ["Live Music", "Nightlife", "Cultural Performances"],
    amenities: ["Bar", "Dance Floor", "VIP Lounge", "Outdoor Terrace", "Restaurant"],
    services: [
      "Live Music Events",
      "DJ Nights",
      "Private Event Hosting",
      "Cultural Performances",
      "Food & Beverage Service",
    ],
    phone: "+268 2505 1234",
    email: "info@solanis.sz",
    website: "https://www.solanis.sz",
  },
  {
    id: "the-mill",
    name: "The Mill",
    category: "entertainment",
    region: "hhohho",
    location: "Mbabane",
    address: "Industrial Area, Mbabane, Eswatini",
    description:
      "Converted industrial space offering a unique entertainment experience with live bands, art exhibitions, and craft markets.",
    rating: 4.7,
    reviewCount: 132,
    price: 80,
    tags: ["Live Bands", "Art Space", "Craft Market"],
    amenities: ["Bar", "Art Gallery", "Performance Space", "Craft Market", "Food Stalls"],
    services: [
      "Weekend Live Bands",
      "Art Exhibitions",
      "Monthly Craft Markets",
      "Food & Beverage Service",
      "Private Event Hosting",
    ],
    phone: "+268 2404 5678",
    email: "events@themill.sz",
    website: "https://www.themill.sz",
  },
  {
    id: "the-exchange",
    name: "The Exchange",
    category: "entertainment",
    region: "hhohho",
    location: "Ezulwini Valley",
    address: "Valley Road, Ezulwini, Eswatini",
    description:
      "Modern entertainment complex featuring a cinema, bowling alley, arcade games, and a variety of dining options.",
    rating: 4.6,
    reviewCount: 178,
    price: 150,
    tags: ["Cinema", "Bowling", "Arcade", "Family Entertainment"],
    amenities: ["Cinema", "Bowling Alley", "Arcade Games", "Restaurants", "Bar", "Parking"],
    services: [
      "Movie Screenings",
      "Bowling Lanes",
      "Arcade Gaming",
      "Birthday Parties",
      "Corporate Events",
      "Food & Beverage Service",
    ],
    phone: "+268 2416 7890",
    email: "info@theexchange.sz",
    website: "https://www.theexchange.sz",
  },
  // Add featured provider to the providers array
  featuredProvider,
]

// Generate 10 accommodation providers
export const accommodationProviders = Array(10)
  .fill(0)
  .map((_, i) => ({
    id: `accommodation-${i + 1}`,
    name: `Eswatini Lodge ${i + 1}`,
    category: "accommodation",
    region: regions[i % regions.length].slug,
    location: `${regions[i % regions.length].name} Region`,
    address: `Main Road, ${regions[i % regions.length].name}, Eswatini`,
    description: `A beautiful lodge offering comfortable accommodation with stunning views of the ${regions[i % regions.length].name} landscape. Perfect for both leisure and business travelers.`,
    rating: 4 + Math.random() * 1,
    reviewCount: 50 + Math.floor(Math.random() * 150),
    price: 800 + i * 200,
    tags: ["Comfortable", "Scenic Views", i % 2 === 0 ? "Family Friendly" : "Business"],
    amenities: ["Wi-Fi", "Parking", "Restaurant", "Swimming Pool", i % 2 === 0 ? "Spa" : "Conference Room"],
    services: [
      "Room Service",
      "Airport Shuttle",
      "Laundry",
      "Tour Desk",
      i % 2 === 0 ? "Childcare" : "Business Center",
    ],
    phone: `+268 2416 ${1000 + i}`,
    email: `info@eswatinilodge${i + 1}.sz`,
    website: `https://www.eswatinilodge${i + 1}.sz`,
  }))

// Generate 10 tour providers
export const tourProviders = Array(10)
  .fill(0)
  .map((_, i) => ({
    id: `tour-${i + 1}`,
    name: `Eswatini Adventures ${i + 1}`,
    category: "tours",
    region: regions[i % regions.length].slug,
    location: `${regions[i % regions.length].name} Region`,
    address: `Tourism Center, ${regions[i % regions.length].name}, Eswatini`,
    description: `Discover the beauty of Eswatini with our guided tours. We offer a range of experiences from cultural immersion to wildlife safaris in the ${regions[i % regions.length].name} region.`,
    rating: 4 + Math.random() * 1,
    reviewCount: 30 + Math.floor(Math.random() * 100),
    price: 350 + i * 150,
    tags: ["Guided Tours", i % 2 === 0 ? "Cultural" : "Wildlife", "Group Discounts"],
    amenities: [
      "Transportation",
      "Refreshments",
      "Experienced Guides",
      i % 2 === 0 ? "Photography Tips" : "Binoculars",
    ],
    services: [
      "Half-day Tours",
      "Full-day Excursions",
      "Custom Itineraries",
      i % 2 === 0 ? "Cultural Workshops" : "Wildlife Photography",
    ],
    phone: `+268 7612 ${1000 + i}`,
    email: `bookings@eswatiniadventures${i + 1}.sz`,
    website: `https://www.eswatiniadventures${i + 1}.sz`,
  }))

// Generate 10 dining providers
export const diningProviders = Array(10)
  .fill(0)
  .map((_, i) => ({
    id: `dining-${i + 1}`,
    name: `Eswatini Flavors ${i + 1}`,
    category: "dining",
    region: regions[i % regions.length].slug,
    location: `${regions[i % regions.length].name} Region`,
    address: `Dining District, ${regions[i % regions.length].name}, Eswatini`,
    description: `Experience the authentic tastes of Eswatini in our restaurant. We serve traditional Swazi cuisine alongside international favorites in a welcoming atmosphere.`,
    rating: 4 + Math.random() * 1,
    reviewCount: 40 + Math.floor(Math.random() * 120),
    price: 150 + i * 50,
    tags: ["Traditional Cuisine", i % 2 === 0 ? "Fine Dining" : "Casual", "Local Ingredients"],
    amenities: ["Indoor Seating", "Outdoor Terrace", "Bar", i % 2 === 0 ? "Private Dining" : "Live Music"],
    services: [
      "Lunch & Dinner",
      "Catering",
      "Special Dietary Options",
      i % 2 === 0 ? "Cooking Classes" : "Wine Pairing",
    ],
    phone: `+268 2418 ${1000 + i}`,
    email: `reservations@eswatiniflavors${i + 1}.sz`,
    website: `https://www.eswatiniflavors${i + 1}.sz`,
  }))

// Generate 10 cultural site providers
export const culturalProviders = Array(10)
  .fill(0)
  .map((_, i) => ({
    id: `cultural-${i + 1}`,
    name: `Eswatini Heritage ${i + 1}`,
    category: "cultural",
    region: regions[i % regions.length].slug,
    location: `${regions[i % regions.length].name} Region`,
    address: `Cultural Route, ${regions[i % regions.length].name}, Eswatini`,
    description: `Immerse yourself in Swazi culture at our heritage site. Learn about traditional practices, witness authentic performances, and engage with local artisans.`,
    rating: 4 + Math.random() * 1,
    reviewCount: 35 + Math.floor(Math.random() * 90),
    price: 100 + i * 30,
    tags: ["Cultural Heritage", i % 2 === 0 ? "Museum" : "Living Village", "Educational"],
    amenities: ["Guided Tours", "Craft Market", "Cultural Displays", i % 2 === 0 ? "Audio Guides" : "Performance Area"],
    services: [
      "Cultural Demonstrations",
      "Traditional Dance Shows",
      "Craft Workshops",
      i % 2 === 0 ? "School Programs" : "Cultural Festivals",
    ],
    phone: `+268 2417 ${1000 + i}`,
    email: `info@eswatiniheritage${i + 1}.sz`,
    website: `https://www.eswatiniheritage${i + 1}.sz`,
  }))

// Generate 10 adventure providers
export const adventureProviders = Array(10)
  .fill(0)
  .map((_, i) => ({
    id: `adventure-${i + 1}`,
    name: `Eswatini Expeditions ${i + 1}`,
    category: "adventure",
    region: regions[i % regions.length].slug,
    location: `${regions[i % regions.length].name} Region`,
    address: `Adventure Base, ${regions[i % regions.length].name}, Eswatini`,
    description: `Get your adrenaline pumping with our adventure activities in the beautiful landscapes of ${regions[i % regions.length].name}. From hiking to white water rafting, we offer experiences for all thrill levels.`,
    rating: 4 + Math.random() * 1,
    reviewCount: 45 + Math.floor(Math.random() * 110),
    price: 300 + i * 100,
    tags: ["Outdoor Activities", i % 2 === 0 ? "Extreme Sports" : "Family Adventures", "Nature"],
    amenities: [
      "Equipment Rental",
      "Safety Briefings",
      "Experienced Guides",
      i % 2 === 0 ? "Photography Service" : "Refreshments",
    ],
    services: [
      "Hiking Expeditions",
      "River Activities",
      "Mountain Biking",
      i % 2 === 0 ? "Rock Climbing" : "Canopy Tours",
    ],
    phone: `+268 7614 ${1000 + i}`,
    email: `bookings@eswatiniexpeditions${i + 1}.sz`,
    website: `https://www.eswatiniexpeditions${i + 1}.sz`,
  }))

// Generate 10 entertainment providers
export const entertainmentProviders = Array(10)
  .fill(0)
  .map((_, i) => ({
    id: `entertainment-${i + 1}`,
    name: `Eswatini Entertainment ${i + 1}`,
    category: "entertainment",
    region: regions[i % regions.length].slug,
    location: `${regions[i % regions.length].name} Region`,
    address: `Entertainment District, ${regions[i % regions.length].name}, Eswatini`,
    description: `Experience the vibrant nightlife and entertainment scene of Eswatini. We offer a range of entertainment options from live music to cultural performances.`,
    rating: 4 + Math.random() * 1,
    reviewCount: 25 + Math.floor(Math.random() * 80),
    price: 120 + i * 50,
    tags: ["Live Music", i % 2 === 0 ? "Nightclub" : "Cultural Shows", "Entertainment"],
    amenities: ["Bar", "Dance Floor", "Stage", i % 2 === 0 ? "VIP Lounge" : "Outdoor Seating"],
    services: ["Live Performances", "DJ Nights", "Special Events", i % 2 === 0 ? "Private Parties" : "Cultural Shows"],
    phone: `+268 7616 ${1000 + i}`,
    email: `info@eswatinientertainment${i + 1}.sz`,
    website: `https://www.eswatinientertainment${i + 1}.sz`,
  }))

// Generate 10 transport providers
export const transportProviders = Array(10)
  .fill(0)
  .map((_, i) => ({
    id: `transport-${i + 1}`,
    name: `Eswatini Transfers ${i + 1}`,
    category: "transport",
    region: regions[i % regions.length].slug,
    location: `${regions[i % regions.length].name} Region`,
    address: `Transport Hub, ${regions[i % regions.length].name}, Eswatini`,
    description: `Reliable transportation services throughout Eswatini. We offer airport transfers, day trips, and custom transportation solutions for individuals and groups.`,
    rating: 4 + Math.random() * 1,
    reviewCount: 25 + Math.floor(Math.random() * 80),
    price: 200 + i * 50,
    tags: ["Transportation", i % 2 === 0 ? "Luxury Vehicles" : "Group Transport", "Reliable"],
    amenities: [
      "Air Conditioning",
      "Professional Drivers",
      "Bottled Water",
      i % 2 === 0 ? "Wi-Fi" : "Child Seats Available",
    ],
    services: [
      "Airport Transfers",
      "Day Trip Transport",
      "Hotel Pickups",
      i % 2 === 0 ? "Corporate Services" : "Wedding Transport",
    ],
    phone: `+268 7616 ${1000 + i}`,
    email: `bookings@eswatinitransfers${i + 1}.sz`,
    website: `https://www.eswatinitransfers${i + 1}.sz`,
  }))

// Add all providers to the main providers array
export const allProviders = [
  ...providers,
  ...accommodationProviders,
  ...tourProviders,
  ...diningProviders,
  ...culturalProviders,
  ...adventureProviders,
  ...entertainmentProviders,
]

export const events = [
  {
    id: "umhlanga-reed-dance",
    name: "Umhlanga Reed Dance",
    category: "cultural",
    region: "hhohho",
    location: "Ludzidzini Royal Village",
    date: "2023-08-28",
    time: "All Day",
    description:
      "Annual traditional ceremony where thousands of unmarried girls and young women gather to pay homage to the Queen Mother (Indlovukazi).",
    image: "/placeholder.svg?height=300&width=500&text=Umhlanga+Reed+Dance",
  },
  {
    id: "incwala-ceremony",
    name: "Incwala Ceremony",
    category: "cultural",
    region: "hhohho",
    location: "Lobamba Royal Village",
    date: "2023-12-15",
    time: "All Day",
    description:
      "The most sacred national event in Eswatini, celebrating kingship and the first fruits of the harvest.",
    image: "/placeholder.svg?height=300&width=500&text=Incwala+Ceremony",
  },
  {
    id: "bush-fire-festival",
    name: "Bush Fire Festival",
    category: "music",
    region: "manzini",
    location: "House on Fire, Malkerns Valley",
    date: "2023-06-30",
    time: "10:00 AM - 11:00 PM",
    description:
      "International music and arts festival celebrating the human spirit and showcasing African and global talent.",
    image: "/placeholder.svg?height=300&width=500&text=Bush+Fire+Festival",
  },
  {
    id: "marula-festival",
    name: "Marula Festival",
    category: "cultural",
    region: "lubombo",
    location: "Ebuhleni Royal Residence",
    date: "2023-02-20",
    time: "9:00 AM - 5:00 PM",
    description:
      "Traditional festival celebrating the harvest of marula fruit and the brewing of buganu (marula beer).",
    image: "/placeholder.svg?height=300&width=500&text=Marula+Festival",
  },
  {
    id: "eswatini-marathon",
    name: "Eswatini Marathon",
    category: "sports",
    region: "manzini",
    location: "Mbabane to Manzini",
    date: "2023-05-15",
    time: "6:00 AM - 2:00 PM",
    description:
      "Annual marathon event attracting local and international runners through the beautiful landscapes of Eswatini.",
    image: "/placeholder.svg?height=300&width=500&text=Eswatini+Marathon",
  },
  {
    id: "food-festival",
    name: "Eswatini Food Festival",
    category: "food",
    region: "hhohho",
    location: "Ezulwini Valley",
    date: "2023-07-08",
    time: "11:00 AM - 8:00 PM",
    description:
      "Culinary celebration showcasing traditional Swazi cuisine and international dishes from local restaurants.",
    image: "/placeholder.svg?height=300&width=500&text=Food+Festival",
  },
]
