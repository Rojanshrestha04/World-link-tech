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
import { courses } from "@/lib/data"
import { Course } from "@/lib/types"

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Find the course with the matching slug
    const foundCourse = courses.find(c => c.slug === slug)
    setCourse(foundCourse || null)
    setLoading(false)
  }, [slug])
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg">Loading course details...</p>
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
            src={course.image || "/placeholder.svg?height=400&width=1200&query=course"} 
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
              <Badge className="mb-4">{course.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-white/90 max-w-2xl">{course.description}</p>
            </div>
            <div className="bg-white text-slate-800 p-6 rounded-lg shadow-lg min-w-[280px]">
              <div className="text-2xl font-bold mb-2">NPR {course.price}</div>
              <div className="text-slate-600 mb-6">CTEVT Certified Course</div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Duration: {course.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Starting: {course.startDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Class Size: 20 students</span>
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
                    {[
                      "Industry-standard best practices",
                      "Hands-on practical skills",
                      "Troubleshooting and problem-solving",
                      "Safety protocols and procedures",
                      "Equipment maintenance and care",
                      "Customer service and communication",
                      "Project planning and execution",
                      "Quality control and assessment"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Course Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Basic literacy and numeracy skills</li>
                    <li>Minimum education: SLC/SEE pass</li>
                    <li>Age: 16 years and above</li>
                    <li>Physical ability to perform practical tasks</li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-slate-100 p-4 font-semibold">Module 1: Introduction and Fundamentals</div>
                    <div className="p-4 space-y-2">
                      <p>• Overview of the field and industry standards</p>
                      <p>• Safety protocols and best practices</p>
                      <p>• Introduction to tools and equipment</p>
                      <p>• Basic theoretical concepts</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-slate-100 p-4 font-semibold">Module 2: Core Skills Development</div>
                    <div className="p-4 space-y-2">
                      <p>• Practical hands-on training</p>
                      <p>• Step-by-step procedures</p>
                      <p>• Supervised practice sessions</p>
                      <p>• Quality control and assessment</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-slate-100 p-4 font-semibold">Module 3: Advanced Techniques</div>
                    <div className="p-4 space-y-2">
                      <p>• Specialized skills and methods</p>
                      <p>• Problem-solving and troubleshooting</p>
                      <p>• Industry-specific applications</p>
                      <p>• Modern technologies and innovations</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-slate-100 p-4 font-semibold">Module 4: Professional Development</div>
                    <div className="p-4 space-y-2">
                      <p>• Customer service and communication</p>
                      <p>• Business aspects and entrepreneurship</p>
                      <p>• Project planning and management</p>
                      <p>• Career guidance and job placement</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="instructors">
                <h2 className="text-2xl font-bold mb-6">Course Instructors</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      <Image 
                        src="/instructor-1.png" 
                        alt="Instructor" 
                        width={80} 
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Ram Sharma</h3>
                      <p className="text-blue-700 mb-2">Senior Instructor</p>
                      <p className="text-slate-600">
                        Over 15 years of industry experience with expertise in advanced techniques and troubleshooting.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      <Image 
                        src="/instructor-2.png" 
                        alt="Instructor" 
                        width={80} 
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Sita Thapa</h3>
                      <p className="text-blue-700 mb-2">Practical Skills Instructor</p>
                      <p className="text-slate-600">
                        Specialized in hands-on training with 10+ years of teaching experience in vocational education.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faq">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-slate-100 p-4 font-semibold">What certification will I receive?</div>
                    <div className="p-4 text-slate-600">
                      Upon successful completion of the course, you will receive a CTEVT (Council for Technical Education and Vocational Training) certified certificate that is recognized throughout Nepal.
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-slate-100 p-4 font-semibold">Are there any prerequisites for this course?</div>
                    <div className="p-4 text-slate-600">
                      Basic literacy and numeracy skills are required. You should have completed at least SLC/SEE education and be at least 16 years of age.
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-slate-100 p-4 font-semibold">What is the class schedule?</div>
                    <div className="p-4 text-slate-600">
                      Classes are typically held 5 days a week, with both morning (7AM-10AM) and afternoon (2PM-5PM) sessions available. You can choose the session that works best for you.
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-slate-100 p-4 font-semibold">Do you provide job placement assistance?</div>
                    <div className="p-4 text-slate-600">
                      Yes, we provide job placement assistance to all our graduates. We have partnerships with various companies and organizations that regularly hire our students.
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-slate-100 p-4 font-semibold">What is the fee structure and payment options?</div>
                    <div className="p-4 text-slate-600">
                      The total course fee is NPR {course.price}. We offer flexible payment options including installment plans. A 10% discount is available for full upfront payment.
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Course Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-500">Category</div>
                  <div>{course.category}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Duration</div>
                  <div>{course.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Start Date</div>
                  <div>{course.startDate}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Schedule</div>
                  <div>Mon-Fri, 2PM-5PM</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Language</div>
                  <div>Nepali and English</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Certification</div>
                  <div>CTEVT Certified</div>
                </div>
              </div>
              
              <div className="border-t mt-6 pt-6">
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="text-slate-600 mb-4">
                  Have questions about this course? Contact our admissions team for more information.
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enroll in This Course?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-slate-600">
            Take the first step towards your new career. Apply now and join our upcoming batch.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/admission/apply">
              <Button size="lg">Apply Now</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">Request Information</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}