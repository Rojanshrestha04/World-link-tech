"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PlusCircle, XCircle } from "lucide-react"

export default function AddCoursePage() {
  const router = useRouter()
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    instructorBio: "",
    prerequisites: ["",],
    learningOutcomes: ["",],
    courseMaterials: ["",],
    active: true,
    featured: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setCourseData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setCourseData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "prerequisites" | "learningOutcomes" | "courseMaterials"
  ) => {
    const newArray = [...courseData[field]]
    newArray[index] = e.target.value
    setCourseData((prev) => ({ ...prev, [field]: newArray }))
  }

  const addArrayItem = (field: "prerequisites" | "learningOutcomes" | "courseMaterials") => {
    setCourseData((prev) => ({ ...prev, [field]: [...prev[field], ""] }))
  }

  const removeArrayItem = (
    index: number,
    field: "prerequisites" | "learningOutcomes" | "courseMaterials"
  ) => {
    const newArray = [...courseData[field]]
    newArray.splice(index, 1)
    setCourseData((prev) => ({ ...prev, [field]: newArray }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend API
    console.log("Saving course data:", courseData)
    // Simulate API call
    setTimeout(() => {
      alert("Course added successfully!")
      router.push("/admin/courses") // Redirect to courses list or admin dashboard
    }, 1000)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Course Title</Label>
          <Input
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            placeholder="Enter course title"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Course Description</Label>
          <Textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            placeholder="Enter course description"
            rows={5}
            required
          />
        </div>

        <div>
          <Label htmlFor="instructorBio">Instructor Bio</Label>
          <Textarea
            id="instructorBio"
            name="instructorBio"
            value={courseData.instructorBio}
            onChange={handleChange}
            placeholder="Enter instructor bio"
            rows={3}
          />
        </div>

        {/* Prerequisites */}
        <div>
          <Label>Prerequisites</Label>
          {courseData.prerequisites.map((prerequisite, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={prerequisite}
                onChange={(e) => handleArrayChange(e, index, "prerequisites")}
                placeholder="Enter prerequisite"
              />
              {courseData.prerequisites.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArrayItem(index, "prerequisites")}
                >
                  <XCircle className="h-5 w-5 text-red-500" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="link" onClick={() => addArrayItem("prerequisites")}>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Prerequisite
          </Button>
        </div>

        {/* Learning Outcomes */}
        <div>
          <Label>Learning Outcomes</Label>
          {courseData.learningOutcomes.map((outcome, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={outcome}
                onChange={(e) => handleArrayChange(e, index, "learningOutcomes")}
                placeholder="Enter learning outcome"
              />
              {courseData.learningOutcomes.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArrayItem(index, "learningOutcomes")}
                >
                  <XCircle className="h-5 w-5 text-red-500" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="link" onClick={() => addArrayItem("learningOutcomes")}>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Learning Outcome
          </Button>
        </div>

        {/* Course Materials */}
        <div>
          <Label>Course Materials</Label>
          {courseData.courseMaterials.map((material, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={material}
                onChange={(e) => handleArrayChange(e, index, "courseMaterials")}
                placeholder="Enter course material"
              />
              {courseData.courseMaterials.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArrayItem(index, "courseMaterials")}
                >
                  <XCircle className="h-5 w-5 text-red-500" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="link" onClick={() => addArrayItem("courseMaterials")}>
            <PlusCircle className="h-4 w-4 mr-2" /> Add Course Material
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              name="active"
              checked={courseData.active}
              onCheckedChange={(checked) => setCourseData((prev) => ({ ...prev, active: !!checked }))}
            />
            <Label htmlFor="active">Active (visible to students)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              name="featured"
              checked={courseData.featured}
              onCheckedChange={(checked) => setCourseData((prev) => ({ ...prev, featured: !!checked }))}
            />
            <Label htmlFor="featured">Featured Course</Label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">
            Save Course
          </Button>
        </div>
      </form>
    </div>
  )
} 