import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { GraduationCap, BookOpen, Users, Award, FileText, ArrowRight } from "lucide-react"
import CourseCard from "@/components/course-card"
import TestimonialCard from "@/components/testimonial-card"
import { featuredCourses, testimonials } from "@/lib/data"

export default function Home() {
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <GraduationCap className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Computer Hardware & Networking</h3>
              <p className="text-slate-600 text-center">
                Learn to assemble, maintain, and troubleshoot computer systems and networks.
              </p>
              <div className="mt-4 text-center">
                <Link
                  href="/courses/hardware-networking"
                  className="text-blue-700 font-medium hover:text-blue-600 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Electrical Wiring & Installation</h3>
              <p className="text-slate-600 text-center">
                Master residential and commercial electrical wiring, installation, and maintenance.
              </p>
              <div className="mt-4 text-center">
                <Link
                  href="/courses/house-wiring"
                  className="text-blue-700 font-medium hover:text-blue-600 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Hospitality & Culinary Arts</h3>
              <p className="text-slate-600 text-center">
                Develop skills in food preparation, service, and hospitality management.
              </p>
              <div className="mt-4 text-center">
                <Link
                  href="/courses/professional-cooking"
                  className="text-blue-700 font-medium hover:text-blue-600 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Award className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Mobile Phone Repair</h3>
              <p className="text-slate-600 text-center">
                Learn to diagnose and repair smartphones and mobile devices with hands-on training.
              </p>
              <div className="mt-4 text-center">
                <Link
                  href="/courses/mobile-repair"
                  className="text-blue-700 font-medium hover:text-blue-600 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
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
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Student Testimonials</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Hear from our graduates who have successfully built their careers after training with us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Career Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Enroll in our CTEVT certified vocational training programs and gain the skills employers are looking for.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-white hover:bg-slate-100 text-blue-700 px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Browse Courses
            </Link>
            <Link
              href="/admission/apply"
              className="bg-blue-600 hover:bg-blue-500 text-white border border-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* CTEVT Affiliation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">CTEVT Affiliated Institution</h2>
              <p className="text-slate-600 mb-4">
                World Link Technical Training Institute is proud to be affiliated with the Council for Technical
                Education and Vocational Training (CTEVT), the apex body for technical and vocational education in
                Nepal.
              </p>
              <p className="text-slate-600 mb-6">
                This affiliation ensures that all our training programs meet national quality standards and that our
                certificates are recognized throughout Nepal and by many international organizations.
              </p>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-700" />
                  <span className="font-medium">CTEVT Registration No: 123-456-789</span>
                </div>
              </div>
              <Link
                href="/about"
                className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
              >
                Learn More About Our Affiliation
              </Link>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/ctevt-affiliation.png"
                alt="CTEVT Affiliation"
                width={600}
                height={400}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
