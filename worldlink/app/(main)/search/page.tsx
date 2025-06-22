"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { courses } from "@/lib/data"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <>
      <PageHeader
        title={`Search Results: ${query}`}
        description={`Found ${filteredCourses.length} results for your search`}
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredCourses.length > 0 ? (
            <div className="space-y-8">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/4 flex-shrink-0">
                    <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-700 text-sm font-medium px-2.5 py-0.5 rounded">
                        {course.category}
                      </span>
                      <span className="text-slate-500 text-sm">Duration: {course.duration}</span>
                      <span className="text-slate-500 text-sm">Starting: {course.startDate}</span>
                    </div>
                    <p className="text-slate-600 mb-4">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 font-bold">NPR {course.price}</span>
                      <Link href={`/courses/${course.category.toLowerCase()}/${course.slug}`}>
                        <Button>
                          View Course <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">No results found</h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                We couldn't find any courses matching your search query. Please try again with different keywords or
                browse our course categories.
              </p>
              <Link href="/courses">
                <Button size="lg">Browse All Courses</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
