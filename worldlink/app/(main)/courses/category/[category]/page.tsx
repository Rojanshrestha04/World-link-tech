"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import CourseCard from "@/components/course-card"
import { courses } from "@/lib/data"
import { Course } from "@/lib/types"

// Map of category slugs to display names
const categoryDisplayNames: Record<string, string> = {
  "it": "IT & Computing",
  "electrical": "Electrical",
  "mechanical": "Mechanical",
  "hospitality": "Hospitality"
}

// Map of category slugs to descriptions
const categoryDescriptions: Record<string, string> = {
  "it": "Computer hardware, networking, web development, and mobile repair courses.",
  "electrical": "Electrical wiring, installation, maintenance, and repair courses.",
  "mechanical": "Plumbing, welding, refrigeration, and air conditioning courses.",
  "hospitality": "Culinary arts, hotel management, and food service courses."
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params)
  const categorySlug = resolvedParams.category.toLowerCase()
  
  const [categoryCourses, setCategoryCourses] = useState<Course[]>([])
  
  // Get the display name for the category or use a capitalized version of the slug
  const categoryName = categoryDisplayNames[categorySlug] || 
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)
  
  // Get the description for the category or use a default
  const categoryDescription = categoryDescriptions[categorySlug] || 
    `Explore our ${categoryName} courses and start your career journey today.`
  
  useEffect(() => {
    // Filter courses by category
    const filtered = courses.filter(course => {
      return course.category.toLowerCase() === categoryName.toLowerCase() ||
             course.category.toLowerCase().includes(categorySlug)
    })
    setCategoryCourses(filtered)
  }, [categorySlug, categoryName])

  return (
    <>
      <PageHeader 
        title={`${categoryName} Courses`} 
        description={categoryDescription}
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/courses">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to All Courses
              </Button>
            </Link>
          </div>

          {categoryCourses.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                Available {categoryName} Courses ({categoryCourses.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-slate-700 mb-2">No courses found</h3>
              <p className="text-slate-500 mb-6">
                We couldn't find any courses in the {categoryName} category.
              </p>
              <Link href="/courses">
                <Button>View All Courses</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Career in {categoryName}?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-slate-600">
            Enroll in one of our industry-recognized {categoryName.toLowerCase()} training programs and gain the skills employers are looking for.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/admission/apply">
              <Button size="lg">Apply Now</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}