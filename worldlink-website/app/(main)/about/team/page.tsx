import Image from "next/image"
import Link from "next/link"
import { Mail, Linkedin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export const metadata = {
  title: "Our Team | World Link Technical Training Institute",
  description:
    "Meet the dedicated team of professionals at World Link Technical Training Institute who are committed to providing quality vocational education.",
}

// Team member data
const leadershipTeam = [
  {
    id: "1",
    name: "Dr. Rajesh Sharma",
    position: "Director",
    bio: "With over 20 years of experience in technical education and management, Dr. Sharma leads our institute with a vision for excellence and innovation. He holds a Ph.D. in Educational Leadership and has previously worked with several leading educational institutions in Nepal and abroad.",
    image: "/team-director.png",
    email: "director@worldlinktraining.edu.np",
    phone: "+977-1-5970001",
    linkedin: "https://linkedin.com/in/rajesh-sharma",
  },
  {
    id: "2",
    name: "Sushila Thapa",
    position: "Academic Director",
    bio: "Ms. Thapa oversees our academic programs, curriculum development, and quality assurance, ensuring our courses meet industry standards. With a Master's in Education and 15 years of experience in vocational training, she has been instrumental in developing our CTEVT-certified curriculum.",
    image: "/team-academic.png",
    email: "academic@worldlinktraining.edu.np",
    phone: "+977-1-5970002",
    linkedin: "https://linkedin.com/in/sushila-thapa",
  },
  {
    id: "3",
    name: "Binod Adhikari",
    position: "Administrative Manager",
    bio: "Mr. Adhikari manages the day-to-day operations of our institute, ensuring smooth functioning of administrative processes and student services. He has over 10 years of experience in educational administration and holds an MBA from Tribhuvan University.",
    image: "/team-admin.png",
    email: "admin@worldlinktraining.edu.np",
    phone: "+977-1-5970003",
    linkedin: "https://linkedin.com/in/binod-adhikari",
  },
]

const facultyMembers = [
  {
    id: "4",
    name: "Prakash Gurung",
    position: "Head of IT Department",
    bio: "Mr. Gurung leads our IT department with 12 years of industry experience. He specializes in computer hardware, networking, and cybersecurity, and holds multiple industry certifications including CCNA and CompTIA A+.",
    image: "/faculty-it.png",
  },
  {
    id: "5",
    name: "Sarita Maharjan",
    position: "Senior Electrical Instructor",
    bio: "Ms. Maharjan brings 10 years of practical experience in electrical engineering and installation. She has worked on numerous commercial and residential projects and specializes in electrical wiring, installation, and maintenance.",
    image: "/faculty-electrical.png",
  },
  {
    id: "6",
    name: "Deepak Shrestha",
    position: "Head of Hospitality Department",
    bio: "Chef Shrestha has over 15 years of experience in the hospitality industry, having worked in five-star hotels in Nepal and abroad. He specializes in culinary arts and hospitality management.",
    image: "/faculty-hospitality.png",
  },
  {
    id: "7",
    name: "Anita Tamang",
    position: "Mechanical Engineering Instructor",
    bio: "Ms. Tamang specializes in plumbing, welding, and mechanical systems. With 8 years of industry experience, she brings practical knowledge and hands-on expertise to our mechanical courses.",
    image: "/faculty-mechanical.png",
  },
  {
    id: "8",
    name: "Ramesh Poudel",
    position: "Mobile Technology Instructor",
    bio: "Mr. Poudel is an expert in mobile device repair and maintenance with 7 years of experience working with leading mobile service centers. He specializes in smartphone diagnostics and repair techniques.",
    image: "/faculty-mobile.png",
  },
  {
    id: "9",
    name: "Sunita Rai",
    position: "Web Development Instructor",
    bio: "Ms. Rai has 6 years of experience as a full-stack web developer. She specializes in modern web technologies and has worked with several tech companies before joining our faculty.",
    image: "/faculty-web.png",
  },
]

const supportStaff = [
  {
    id: "10",
    name: "Hari Bahadur",
    position: "Student Affairs Coordinator",
    image: "/staff-student-affairs.png",
  },
  {
    id: "11",
    name: "Gita Sharma",
    position: "Admissions Officer",
    image: "/staff-admissions.png",
  },
  {
    id: "12",
    name: "Bikash Magar",
    position: "Career Counselor",
    image: "/staff-career.png",
  },
  {
    id: "13",
    name: "Sabina Lama",
    position: "Finance Officer",
    image: "/staff-finance.png",
  },
]

export default function TeamPage() {
  return (
    <>
      <PageHeader title="Our Team" description="Meet the dedicated professionals behind our success" />

      {/* Leadership Team */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Leadership Team</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Meet the experienced professionals guiding our institute
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadershipTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-64 relative">
                  <Image
                    src={member.image || "/placeholder.svg?height=300&width=300&query=person"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-slate-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call</span>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Members */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Faculty Members</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Our experienced instructors bring industry expertise to the classroom
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {facultyMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 relative">
                  <Image
                    src={member.image || "/placeholder.svg?height=300&width=300&query=person"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-slate-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Staff */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Support Staff</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              The dedicated team that ensures smooth operations and student support
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {supportStaff.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="h-48 relative">
                  <Image
                    src={member.image || "/placeholder.svg?height=300&width=300&query=person"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Join Our Team</h2>
              <p className="text-slate-600 mb-4">
                We are always looking for talented and passionate individuals to join our team. If you are committed to
                quality education and want to make a difference in the lives of our students, we'd love to hear from
                you.
              </p>
              <p className="text-slate-600 mb-6">
                We offer a collaborative work environment, competitive compensation, and opportunities for professional
                growth and development.
              </p>
              <Link href="/careers">
                <Button size="lg">View Current Openings</Button>
              </Link>
            </div>
            <div className="relative h-[400px]">
              <Image src="/join-our-team.png" alt="Join Our Team" fill className="object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team in Person</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our campus to meet our faculty and staff and learn more about our programs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white hover:bg-slate-100 text-blue-700 px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Contact Us
            </Link>
            <Link
              href="/about/facilities"
              className="bg-blue-600 hover:bg-blue-500 text-white border border-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Explore Our Facilities
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
