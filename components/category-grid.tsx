import Link from "next/link"
import { categories } from "@/lib/data"

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categories/${category.slug}`}
          className="group bg-white/25 backdrop-blur-sm rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 text-center"
        >
          <div className="h-16 w-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <category.icon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-bold mb-1 text-shadow">{category.name}</h3>
          <p className="text-xs text-foreground text-shadow-light">{category.count} listings</p>
        </Link>
      ))}
    </div>
  )
}
