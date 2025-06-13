"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Simulate fetching course data
const fetchCourseDetails = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        title: `Sample Course ${id}`,
      })
    }, 300)
  })
}

export default function DeleteCoursePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get("id")
  const [courseTitle, setCourseTitle] = useState("")
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(courseId).then((data: any) => {
        setCourseTitle(data.title)
        setLoading(false)
      })
    }
  }, [courseId])

  const handleDelete = async () => {
    if (!courseId) return

    setIsDeleting(true)
    // Simulate API call to delete the course
    console.log(`Deleting course with ID: ${courseId}`)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert(`Course "${courseTitle}" deleted successfully!`)
    setIsDeleting(false)
    router.push("/admin/courses") // Redirect to courses list
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Loading course details...</p>
      </div>
    )
  }

  if (!courseId) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-red-500">No course ID provided for deletion.</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-700">Delete Course</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg mb-4">
          Are you sure you want to delete the course "<span className="font-semibold">{courseTitle}</span>" (ID: {courseId})?
        </p>
        <p className="text-red-600 mb-6">
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isDeleting}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Deleting...</>
            ) : (
              "Delete Course"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
} 