"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PageHeader from "@/components/page-header"
import CourseCard from "@/components/course-card"
import { courses } from "@/lib/data"
import { Course } from "@/lib/types"

// Map category names to their slugs for consistent linking
const categoryToSlug: Record<string, string> = {
  "IT & Computing": "it",
  "Electrical": "electrical",
  "Mechanical": "mechanical",
  "Hospitality": "hospitality"
}

export default function CoursesPage() {
  const categories = [...new Set(courses.map((course) => course.category))]
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDuration, setSelectedDuration] = useState<string>("all")
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)
  
  // Apply filters when any filter changes
  useEffect(() => {
    let result = [...courses]
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        course => 
          course.title.toLowerCase().includes(query) || 
          course.description.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
      )
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(course => 
        course.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }
    
    // Apply duration filter
    if (selectedDuration !== "all") {
      result = result.filter(course => {
        const durationMonths = parseInt(course.duration.split(" ")[0])
        
        if (selectedDuration === "1-2") {
          return durationMonths >= 1 && durationMonths <= 2
        } else if (selectedDuration === "3-4") {
          return durationMonths >= 3 && durationMonths <= 4
        } else if (selectedDuration === "5+") {
          return durationMonths >= 5
        }
        return true
      })
    }
    
    setFilteredCourses(result)
  }, [searchQuery, selectedCategory, selectedDuration])
  
  // Handle category badge click
  const handleCategoryBadgeClick = (category: string): void => {
    setSelectedCategory(category === "All Courses" ? "all" : category.toLowerCase())
  }

  // Get slug for a category
  const getCategorySlug = (category: string): string => {
    return categoryToSlug[category] || category.toLowerCase().replace(/\s+/g, '-')
  }

  return (
    <>
      <PageHeader title="Our Courses" description="Explore our CTEVT certified vocational training programs" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Filter className="h-5 w-5 mr-2" /> Filter Courses
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  placeholder="Search courses..." 
                  className="w-full sm:w-[250px]" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Durations</SelectItem>
                    <SelectItem value="1-2">1-2 Months</SelectItem>
                    <SelectItem value="3-4">3-4 Months</SelectItem>
                    <SelectItem value="5+">5+ Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedCategory === "all" ? "default" : "outline"} 
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => handleCategoryBadgeClick("All Courses")}
              >
                All Courses
              </Badge>
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant={selectedCategory === category.toLowerCase() ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-slate-100"
                  onClick={() => handleCategoryBadgeClick(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Course Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Course Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/courses/category/it"
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-600"
              >
                <h3 className="text-xl font-semibold mb-2">IT & Computing</h3>
                <p className="text-slate-600 mb-2">
                  Computer hardware, networking, web development, and mobile repair courses.
                </p>
                <span className="text-blue-700 font-medium">View Courses →</span>
              </Link>

              <Link
                href="/courses/category/electrical"
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-yellow-600"
              >
                <h3 className="text-xl font-semibold mb-2">Electrical</h3>
                <p className="text-slate-600 mb-2">Electrical wiring, installation, maintenance, and repair courses.</p>
                <span className="text-blue-700 font-medium">View Courses →</span>
              </Link>

              <Link
                href="/courses/category/mechanical"
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-green-600"
              >
                <h3 className="text-xl font-semibold mb-2">Mechanical</h3>
                <p className="text-slate-600 mb-2">Plumbing, welding, refrigeration, and air conditioning courses.</p>
                <span className="text-blue-700 font-medium">View Courses →</span>
              </Link>

              <Link
                href="/courses/category/hospitality"
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-red-600"
              >
                <h3 className="text-xl font-semibold mb-2">Hospitality</h3>
                <p className="text-slate-600 mb-2">Culinary arts, hotel management, and food service courses.</p>
                <span className="text-blue-700 font-medium">View Courses →</span>
              </Link>
            </div>
          </div>

          {/* All Courses */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              {selectedCategory !== "all" 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Courses` 
                : "All Courses"}
              {filteredCourses.length !== courses.length && 
                ` (${filteredCourses.length} ${filteredCourses.length === 1 ? 'result' : 'results'})`}
            </h2>
            
            {filteredCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-slate-700 mb-2">No courses found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your search or filter criteria</p>
                <Button 
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedDuration("all")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-slate-600">
            Contact us to inquire about other courses or to request information about upcoming batches.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}