import Image from "next/image"
import Link from "next/link"
import { Clock, Calendar, Award, Pencil, Trash2, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Course } from "@/lib/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <Image
          src={course.image_url || "/placeholder.svg?height=200&width=400&query=course"}
          alt={course.title}
          width={400}
          height={200}
          className="object-cover w-full h-full"
        />
        {course.is_featured && <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700">Featured</Badge>}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
            {course.category}
          </Badge>
          <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
            {course.level}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center text-sm text-slate-600">
            <Clock className="h-4 w-4 mr-2 text-blue-600" />
            <span>Duration: {course.duration_weeks} weeks</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
            <span>Starting: {new Date(course.start_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Award className="h-4 w-4 mr-2 text-blue-600" />
            <span>Instructor: {course.instructor_name}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-blue-700 font-bold">NPR {course.price}</span>
          <Link href={`/courses/${course.slug}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}