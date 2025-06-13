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
          src={course.image || "/placeholder.svg?height=200&width=400&query=course"}
          alt={course.title}
          width={400}
          height={200}
          className="object-cover w-full h-full"
        />
        {course.featured && <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700">Featured</Badge>}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
            {course.category}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center text-sm text-slate-600">
            <Clock className="h-4 w-4 mr-2 text-blue-600" />
            <span>Duration: {course.duration}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
            <span>Starting: {course.startDate}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Award className="h-4 w-4 mr-2 text-blue-600" />
            <span>Certification: CTEVT</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-blue-700 font-bold">NPR {course.price}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/courses/edit-course?id=${course.id}`} className="flex items-center">
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/courses/delete-course?id=${course.id}`} className="flex items-center text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={`/courses/${course.slug}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}