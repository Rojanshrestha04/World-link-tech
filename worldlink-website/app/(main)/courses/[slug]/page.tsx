"use client"

import React, { useEffect, useState } from "react"
import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Calendar, Award, Users, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import PageHeader from "@/components/page-header"
import { Course } from "@/lib/types"

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params)
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`/api/courses/${resolvedParams.slug}`)
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to fetch course')
        }
        const data = await res.json()
        setCourse(data)
      } catch (error) {
        console.error('Error fetching course:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch course')
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [resolvedParams.slug])
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg">Loading course details...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Course</h1>
          <p className="text-lg mb-6">{error}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/courses">
              <Button>Browse All Courses</Button>
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Course Not Found</h1>
          <p className="text-lg mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link href="/courses">
            <Button>Browse All Courses</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <>
      {/* Course Header */}
      <div className="relative bg-blue-700 text-white">
        <div className="absolute inset-0 opacity-50">
          <Image 
            src={course.image_url || "/placeholder.svg?height=400&width=1200&query=course"} 
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="mb-4">
                <Link href="/courses">
                  <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20 gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Courses
                  </Button>
                </Link>
              </div>
              <div className="flex gap-2 mb-4">
                <Badge>{course.category}</Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  {course.level}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-white/90 max-w-2xl">{course.description}</p>
            </div>
            <div className="bg-white text-slate-800 p-6 rounded-lg shadow-lg min-w-[280px]">
              <div className="text-2xl font-bold mb-2">NPR {course.price}</div>
              <div className="text-slate-600 mb-6">CTEVT Certified Course</div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Duration: {course.duration_weeks} weeks</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Starting: {new Date(course.start_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Class Size: {course.max_students} students</span>
                </div>
              </div>
              <Link href="/admission/apply">
                <Button className="w-full">Apply Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructors">Instructors</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
                  <p className="text-slate-600 mb-4">
                    {course.description}
                  </p>
                  <p className="text-slate-600">
                    This comprehensive course is designed to provide you with both theoretical knowledge and practical skills
                    required in the industry. Upon completion, you will receive a CTEVT certified certificate that is recognized
                    nationwide.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {course.learning_outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Course Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    {course.prerequisites.map((prerequisite, index) => (
                      <li key={index}>{prerequisite}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.curriculum.map((module, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="bg-slate-100 p-4 font-semibold">{module.title}</div>
                      <div className="p-4 space-y-2">
                        {module.topics.map((topic, topicIndex) => (
                          <p key={topicIndex}>• {topic}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="instructors">
                <h2 className="text-2xl font-bold mb-6">Course Instructors</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      <Image 
                        src="/instructor-1.png" 
                        alt={course.instructor_name} 
                        width={80} 
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{course.instructor_name}</h3>
                      <p className="text-blue-700 mb-2">Senior Instructor</p>
                      <p className="text-slate-600">
                        {course.instructor_bio}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">What are the prerequisites for this course?</h3>
                    <p className="text-slate-600">
                      {course.prerequisites.join(', ')}
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">What materials are included in the course fee?</h3>
                    <p className="text-slate-600">
                      {course.course_materials.join(', ')}
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Is there a certificate upon completion?</h3>
                    <p className="text-slate-600">
                      Yes, upon successful completion of the course, you will receive a CTEVT certified certificate that is
                      recognized nationwide and by many international organizations.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">What is the class schedule?</h3>
                    <p className="text-slate-600">
                      {course.schedule || 'Classes are held Monday through Friday, with both morning and evening batches available.'}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Course Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>CTEVT Certified</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Hands-on Training</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Industry Expert Instructors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Job Placement Assistance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Modern Equipment & Tools</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-slate-600 mb-4">
                Have questions about this course? Our admissions team is here to help.
              </p>
              <Link href="/contact">
                <Button className="w-full">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}