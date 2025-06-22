import Image from "next/image"
import Link from "next/link"
import { Award, BookOpen, Target, Lightbulb, Compass, Users } from "lucide-react"
import PageHeader from "@/components/page-header"

export const metadata = {
  title: "Mission & Vision | World Link Technical Training Institute",
  description:
    "Learn about the mission, vision, and core values that drive World Link Technical Training Institute's commitment to quality vocational education.",
}

export default function MissionVisionPage() {
  return (
    <>
      <PageHeader
        title="Mission & Vision"
        description="The guiding principles that drive our commitment to quality vocational education"
      />

      {/* Mission Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                <Target className="h-5 w-5" />
                <span className="font-medium">Our Mission</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Empowering Through Quality Education</h2>
              <p className="text-slate-600 mb-4">
                Our mission at World Link Technical Training Institute is to provide quality vocational education that
                develops skilled professionals capable of meeting industry demands and contributing to Nepal's economic
                growth.
              </p>
              <p className="text-slate-600 mb-6">
                We are dedicated to bridging the skills gap in Nepal's workforce by offering practical, hands-on
                training that prepares students for real-world challenges and creates pathways to meaningful employment
                and entrepreneurship.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-700 mt-1">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Excellence in Training</h3>
                    <p className="text-slate-600">
                      Delivering high-quality, industry-relevant training that meets national and international
                      standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-700 mt-1">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Inclusive Learning</h3>
                    <p className="text-slate-600">
                      Creating an inclusive learning environment that respects diversity and provides equal
                      opportunities for all students.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px]">
              <Image
                src="/mission-image.png"
                alt="Students in vocational training"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] order-2 md:order-1">
              <Image src="/vision-image.png" alt="Modern training facility" fill className="object-cover rounded-lg" />
            </div>

            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                <Compass className="h-5 w-5" />
                <span className="font-medium">Our Vision</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Leading Vocational Education in Nepal</h2>
              <p className="text-slate-600 mb-4">
                Our vision is to be the leading vocational training institute in Nepal, recognized for excellence in
                technical education and producing skilled professionals who drive economic development.
              </p>
              <p className="text-slate-600 mb-6">
                We aspire to become a center of excellence for vocational training in South Asia, continuously evolving
                our curriculum to meet changing industry needs and establishing strong industry partnerships that
                enhance employment opportunities for our graduates.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-700 mt-1">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Innovation in Education</h3>
                    <p className="text-slate-600">
                      Pioneering innovative teaching methodologies and incorporating new technologies to enhance the
                      learning experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-700 mt-1">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Industry Leadership</h3>
                    <p className="text-slate-600">
                      Setting the standard for industry-academia collaboration and becoming the preferred partner for
                      employers seeking skilled professionals.
                    </p>
                  </div>
                </div>
              </div>
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
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Excellence</h3>
              <p className="text-slate-600">
                We strive for excellence in all aspects of our operations, from curriculum development to teaching
                methodologies and student support services. We set high standards and continuously work to exceed them.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Integrity</h3>
              <p className="text-slate-600">
                We maintain the highest standards of honesty, transparency, and ethical conduct in our interactions with
                students, staff, and stakeholders. We believe in doing what is right, not what is easy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Innovation</h3>
              <p className="text-slate-600">
                We embrace innovation in our teaching methods, incorporating new technologies and approaches to enhance
                the learning experience. We encourage creative thinking and problem-solving among our students and
                staff.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Inclusivity</h3>
              <p className="text-slate-600">
                We create an inclusive learning environment that respects diversity and provides equal opportunities for
                all students regardless of background. We believe that everyone deserves access to quality education.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Practicality</h3>
              <p className="text-slate-600">
                We focus on practical, hands-on training that prepares students for real-world challenges and workplace
                requirements. We believe that learning by doing is the most effective way to develop skills.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Collaboration</h3>
              <p className="text-slate-600">
                We foster collaboration with industry partners, government agencies, and other educational institutions
                to enhance the quality of our programs. We believe that working together creates better outcomes for our
                students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us in Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of our journey to transform vocational education in Nepal and create a skilled workforce for the
            future.
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
