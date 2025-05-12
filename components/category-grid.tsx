import Link from "next/link"
import { categories } from "@/lib/data"

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/categories/${category.slug}`}
          className="group bg-white/25 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 text-center"
        >
          <div className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-2 md:mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <category.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          </div>
          <h3 className="font-bold mb-1 text-shadow text-sm md:text-base">{category.name}</h3>
          <p className="text-xs text-foreground text-shadow-light">{category.count} listings</p>
        </Link>
      ))}
    </div>
  )
}
