import type { Metadata } from "next"

interface Props {
  params: { category: string }
}

export async function generateMetadata({ params: { category } }: Props): Promise<Metadata> {
  return {
    title: `Category: ${category}`,
  }
}

const CategoryPage = ({ params: { category } }: Props) => {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-5">Category: {category}</h1>
        {/* Add category specific content here */}
        <p>This is the page for the {category} category.</p>
      </div>
    </main>
  )
}

export default CategoryPage
