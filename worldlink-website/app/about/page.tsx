import Image from "next/image"
import Link from "next/link"
import { FileText, Award, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export const metadata = {
  title: "About Us | World Link Technical Training Institute",
  description:
    "Learn about World Link Technical Training Institute, our mission, vision, and commitment to quality vocational education in Nepal.",
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="Learn about our institute, mission, vision, and commitment to quality vocational education"
      />

      {/* About Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">World Link Technical Training Institute</h2>
              <p className="text-slate-600 mb-4">
                Established in 2010, World Link Technical Training Institute Pvt. Ltd. is a premier vocational training
                provider in Nepal, dedicated to developing skilled professionals through quality technical education.
              </p>
              <p className="text-slate-600 mb-4">
                As a CTEVT affiliated institution, we offer short-term vocational training programs designed to meet
                industry demands and prepare students for successful careers in various technical fields.
              </p>
              <p className="text-slate-600 mb-6">
                Our institute is equipped with modern facilities, experienced instructors, and industry connections to
                ensure our graduates are job-ready and competitive in the market.
              </p>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-700" />
                  <span className="font-medium">CTEVT Registration No: 123-456-789</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/about-institute.png"
                alt="World Link Technical Training Institute Building"
                width={600}
                height={400}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Our Mission & Vision</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Guiding principles that drive our commitment to quality vocational education
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Award className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold">Our Mission</h3>
              </div>
              <p className="text-slate-600 mb-4">
                To provide quality vocational education that develops skilled professionals capable of meeting industry
                demands and contributing to Nepal's economic growth.
              </p>
              <p className="text-slate-600">We are committed to:</p>
              <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
                <li>Delivering practical, hands-on training that prepares students for real-world challenges</li>
                <li>Maintaining high standards of education aligned with national and international benchmarks</li>
                <li>Fostering innovation and entrepreneurship among our students</li>
                <li>Creating an inclusive learning environment that respects diversity</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <BookOpen className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold">Our Vision</h3>
              </div>
              <p className="text-slate-600 mb-4">
                To be the leading vocational training institute in Nepal, recognized for excellence in technical
                education and producing skilled professionals who drive economic development.
              </p>
              <p className="text-slate-600">We aspire to:</p>
              <ul className="list-disc list-inside text-slate-600 mt-2 space-y-1">
                <li>Become a center of excellence for vocational training in South Asia</li>
                <li>Bridge the skills gap in Nepal's workforce through quality technical education</li>
                <li>Establish strong industry partnerships that enhance employment opportunities for our graduates</li>
                <li>Continuously evolve our curriculum to meet changing industry needs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Our Core Values</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              The principles that guide our approach to education and training
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Excellence</h3>
              <p className="text-slate-600">
                We strive for excellence in all aspects of our operations, from curriculum development to teaching
                methodologies and student support services.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Integrity</h3>
              <p className="text-slate-600">
                We maintain the highest standards of honesty, transparency, and ethical conduct in our interactions with
                students, staff, and stakeholders.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Innovation</h3>
              <p className="text-slate-600">
                We embrace innovation in our teaching methods, incorporating new technologies and approaches to enhance
                the learning experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Inclusivity</h3>
              <p className="text-slate-600">
                We create an inclusive learning environment that respects diversity and provides equal opportunities for
                all students regardless of background.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Practicality</h3>
              <p className="text-slate-600">
                We focus on practical, hands-on training that prepares students for real-world challenges and workplace
                requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Collaboration</h3>
              <p className="text-slate-600">
                We foster collaboration with industry partners, government agencies, and other educational institutions
                to enhance the quality of our programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTEVT Affiliation */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-slate-800 mb-6">CTEVT Affiliation</h2>
              <p className="text-slate-600 mb-4">
                World Link Technical Training Institute is proud to be affiliated with the Council for Technical
                Education and Vocational Training (CTEVT), the apex body for technical and vocational education in
                Nepal.
              </p>
              <p className="text-slate-600 mb-4">
                This affiliation ensures that all our training programs meet national quality standards and that our
                certificates are recognized throughout Nepal and by many international organizations.
              </p>
              <p className="text-slate-600 mb-6">
                As a CTEVT affiliated institution, we undergo regular quality assessments and curriculum reviews to
                maintain the highest standards of vocational education.
              </p>
              <Link
                href="https://ctevt.org.np"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
              >
                Visit CTEVT Website
              </Link>
            </div>
            <div className="relative h-[400px] order-1 md:order-2">
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

      {/* Our Team */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Our Leadership Team</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Meet the experienced professionals guiding our institute
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm text-center">
              <div className="h-64 relative">
                <Image
                  src="/team-director.png"
                  alt="Director"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dr. Rajesh Sharma</h3>
                <p className="text-blue-600 font-medium mb-3">Director</p>
                <p className="text-slate-600 text-sm">
                  With over 20 years of experience in technical education and management, Dr. Sharma leads our institute
                  with a vision for excellence and innovation.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm text-center">
              <div className="h-64 relative">
                <Image
                  src="/team-academic.png"
                  alt="Academic Director"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Sushila Thapa</h3>
                <p className="text-blue-600 font-medium mb-3">Academic Director</p>
                <p className="text-slate-600 text-sm">
                  Ms. Thapa oversees our academic programs, curriculum development, and quality assurance, ensuring our
                  courses meet industry standards.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-sm text-center">
              <div className="h-64 relative">
                <Image
                  src="/team-admin.png"
                  alt="Administrative Manager"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Binod Adhikari</h3>
                <p className="text-blue-600 font-medium mb-3">Administrative Manager</p>
                <p className="text-slate-600 text-sm">
                  Mr. Adhikari manages the day-to-day operations of our institute, ensuring smooth functioning of
                  administrative processes and student services.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/about/team">
              <Button variant="outline" size="lg">
                View All Team Members
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Career Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join World Link Technical Training Institute and gain the skills employers are looking for.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-white hover:bg-slate-100 text-blue-700 px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Explore Our Courses
            </Link>
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-500 text-white border border-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
