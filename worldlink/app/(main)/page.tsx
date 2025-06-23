"use client"

import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { GraduationCap, BookOpen, Users, Award, FileText, ArrowRight } from "lucide-react"
import { Course } from "@/lib/types"
import CourseCard from "@/components/course-card"
import TestimonialCard from "@/components/testimonial-card"
import type { Testimonial } from "@/lib/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
  const [popularCourses, setPopularCourses] = useState<Course[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)
  const [testimonialsError, setTestimonialsError] = useState<string | null>(null)
  const autoplayRef = useRef<any>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        setTestimonialsLoading(true)
        setTestimonialsError(null)
        
        // Fetch featured courses
        const featuredRes = await fetch('/api/courses/featured')
        if (!featuredRes.ok) {
          const errorData = await featuredRes.json()
          throw new Error(errorData.error || 'Failed to fetch featured courses')
        }
        const featuredData = await featuredRes.json()
        setFeaturedCourses(featuredData)

        // Fetch popular courses
        const popularRes = await fetch('/api/courses/popular')
        if (!popularRes.ok) {
          const errorData = await popularRes.json()
          throw new Error(errorData.error || 'Failed to fetch popular courses')
        }
        const popularData = await popularRes.json()
        setPopularCourses(popularData)

        // Fetch testimonials from API
        const testimonialsRes = await fetch('/api/testimonials')
        if (!testimonialsRes.ok) {
          const errorData = await testimonialsRes.json()
          throw new Error(errorData.error || 'Failed to fetch testimonials')
        }
        const testimonialsData = await testimonialsRes.json()
        setTestimonials(testimonialsData)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch data')
        setTestimonialsError(error instanceof Error ? error.message : 'Failed to fetch testimonials')
      } finally {
        setLoading(false)
        setTestimonialsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[500px]">
        <Image
          src="/vocational-training-hero.png"
          alt="World Link Technical Training Institute"
          width={1920}
          height={500}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg text-white">
              <h1 className="text-4xl font-bold mb-4">Build Your Career with Industry-Recognized Skills</h1>
              <p className="text-lg mb-6">
                CTEVT affiliated short-term vocational training programs designed to prepare you for the job market.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
                >
                  Explore Courses
                </Link>
                <Link
                  href="/admission/apply"
                  className="bg-white hover:bg-slate-100 text-blue-700 px-6 py-3 rounded-md font-medium transition-colors inline-block"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Our Featured Programs</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              CTEVT certified vocational training programs designed to meet industry demands
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg">Loading featured courses...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-lg text-red-600">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : featuredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg">No featured courses available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCourses.map((course) => (
                <div key={course.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <GraduationCap className="h-8 w-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">{course.title}</h3>
                  <p className="text-slate-600 text-center">
                    {course.description.substring(0, 100)}...
                  </p>
                  <div className="mt-4 text-center">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="text-blue-700 font-medium hover:text-blue-600 transition-colors"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Why Choose World Link Technical Training Institute?</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              We provide quality vocational education with industry-recognized certification
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/vocational-training-workshop.png"
                alt="Hands-on Training Workshop"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-2">Hands-on Practical Training</h3>
                  <p className="mb-4">
                    Our courses focus on practical skills with 70% hands-on training in well-equipped workshops and
                    labs.
                  </p>
                  <Link
                    href="/about/facilities"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Explore Our Facilities →
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/ctevt-certification.png"
                alt="CTEVT Certification"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-2">CTEVT Certified Programs</h3>
                  <p className="mb-4">
                    All our courses are approved by the Council for Technical Education and Vocational Training (CTEVT),
                    ensuring national recognition.
                  </p>
                  <Link href="/about" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    Learn About CTEVT Affiliation →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Popular Courses</h2>
              <p className="text-slate-600 mt-2">Explore our most in-demand training programs</p>
            </div>
            <Link
              href="/courses"
              className="mt-4 sm:mt-0 inline-flex items-center text-blue-700 hover:text-blue-600 font-medium"
            >
              View All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Student Testimonials</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Hear from our graduates who have successfully built their careers after training with us
            </p>
          </div>
          {testimonialsLoading ? (
            <div className="text-center py-12">
              <p className="text-lg">Loading testimonials...</p>
            </div>
          ) : testimonialsError ? (
            <div className="text-center py-12">
              <p className="text-lg text-red-600">{testimonialsError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg">No testimonials available at the moment.</p>
            </div>
          ) : testimonials.length > 3 ? (
            <div className="relative"
              onMouseEnter={() => {
                setIsHovered(true)
                if (autoplayRef.current) autoplayRef.current.stop()
              }}
              onMouseLeave={() => {
                setIsHovered(false)
                if (autoplayRef.current) autoplayRef.current.play()
              }}
            >
              <Carousel
                opts={{
                  loop: true,
                  align: "center",
                  slidesToScroll: 1,
                }}
                plugins={[Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false, active: !isHovered })]}
                className="w-full"
              >
                <CarouselPrevious />
                <CarouselNext />
                <CarouselContent>
                  {testimonials.map((testimonial) => (
                    <CarouselItem
                      key={testimonial.id}
                      className="md:basis-1/3 lg:basis-1/3 px-2"
                    >
                      <TestimonialCard testimonial={testimonial} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Join World Link Technical Training Institute and gain the skills needed to succeed in today's competitive
            job market. Enroll in our CTEVT affiliated programs today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/admission/apply"
              className="bg-white hover:bg-slate-100 text-blue-700 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="border border-white hover:bg-white hover:text-blue-700 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
