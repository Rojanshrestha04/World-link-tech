import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Monitor, PenToolIcon as Tool, Utensils, BookOpen, Wifi, Coffee, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export const metadata = {
  title: "Our Facilities | World Link Technical Training Institute",
  description:
    "Explore the state-of-the-art facilities at World Link Technical Training Institute designed to provide an optimal learning environment for vocational training.",
}

// Facilities data
const facilities = [
  {
    id: "1",
    title: "Computer Labs",
    description:
      "Our modern computer labs are equipped with the latest hardware and software, providing students with hands-on experience in computer hardware, networking, programming, and other IT-related courses.",
    features: [
      "High-performance computers with dual monitors",
      "Latest software applications and tools",
      "High-speed internet connectivity",
      "Network simulation environment",
      "Hardware troubleshooting stations",
    ],
    image: "/facility-computer-lab.png",
    icon: Monitor,
  },
  {
    id: "2",
    title: "Electrical Workshop",
    description:
      "Our electrical workshop provides a safe and practical environment for students to learn electrical wiring, installation, and maintenance. The workshop is equipped with industry-standard tools and equipment.",
    features: [
      "Electrical wiring practice panels",
      "Circuit testing equipment",
      "Safety gear and protective equipment",
      "Industrial and residential wiring setups",
      "Solar panel installation training area",
    ],
    image: "/facility-electrical-workshop.png",
    icon: Tool,
  },
  {
    id: "3",
    title: "Culinary Kitchen",
    description:
      "Our professional culinary kitchen is designed to provide students with a real-world cooking environment. It is equipped with commercial-grade appliances and tools used in the hospitality industry.",
    features: [
      "Commercial cooking ranges and ovens",
      "Food preparation stations",
      "Baking and pastry equipment",
      "Food storage and safety facilities",
      "Dining service area for practical training",
    ],
    image: "/facility-culinary-kitchen.png",
    icon: Utensils,
  },
  {
    id: "4",
    title: "Library & Resource Center",
    description:
      "Our library and resource center offers a quiet space for study and research, with a comprehensive collection of textbooks, reference materials, and digital resources related to our courses.",
    features: [
      "Extensive collection of technical books and manuals",
      "Digital resource access with e-books and journals",
      "Quiet study areas and discussion rooms",
      "Computer terminals for research",
      "Printing and photocopying services",
    ],
    image: "/facility-library.png",
    icon: BookOpen,
  },
]

// Amenities data
const amenities = [
  {
    title: "Free Wi-Fi",
    description: "High-speed internet access throughout the campus",
    icon: Wifi,
  },
  {
    title: "Cafeteria",
    description: "On-site cafeteria serving affordable meals and refreshments",
    icon: Coffee,
  },
  {
    title: "Student Lounge",
    description: "Comfortable space for students to relax and socialize",
    icon: Users,
  },
  {
    title: "Career Counseling Center",
    description: "Dedicated space for career guidance and job placement assistance",
    icon: BookOpen,
  },
]

export default function FacilitiesPage() {
  return (
    <>
      <PageHeader title="Our Facilities" description="State-of-the-art training facilities for hands-on learning" />

      {/* Intro Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">World-Class Training Facilities</h2>
              <p className="text-slate-600 mb-4">
                At World Link Technical Training Institute, we believe that practical, hands-on training is essential
                for developing job-ready skills. That's why we've invested in state-of-the-art facilities that replicate
                real-world work environments.
              </p>
              <p className="text-slate-600 mb-6">
                Our facilities are designed to provide students with the practical experience they need to excel in
                their chosen fields. From modern computer labs to fully-equipped workshops, we provide the tools and
                environment necessary for effective learning.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/gallery">
                  <Button variant="outline">View Gallery</Button>
                </Link>
                <Link href="/admission/apply">
                  <Button>Apply Now</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/facilities-overview.png"
                alt="World Link Technical Training Institute Facilities"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Showcase */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Our Training Facilities</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Explore our purpose-built facilities designed to provide optimal learning environments
            </p>
          </div>

          <div className="space-y-16">
            {facilities.map((facility, index) => (
              <div
                key={facility.id}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className={`order-2 ${index % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                  <div className="relative h-[400px]">
                    <Image
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className={`order-1 ${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
                    <facility.icon className="h-5 w-5" />
                    <span className="font-medium">{facility.title}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{facility.title}</h3>
                  <p className="text-slate-600 mb-6">{facility.description}</p>
                  <div className="space-y-3">
                    {facility.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Campus Amenities</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Additional facilities to enhance your learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <amenity.icon className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{amenity.title}</h3>
                <p className="text-slate-600">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Take a Virtual Tour</h2>
              <p className="text-slate-600 mb-4">
                Can't visit us in person? Take a virtual tour of our campus and facilities to get a feel for our
                learning environment.
              </p>
              <p className="text-slate-600 mb-6">
                Our virtual tour allows you to explore our classrooms, workshops, labs, and common areas from the
                comfort of your home.
              </p>
              <Link href="/gallery">
                <Button size="lg">Start Virtual Tour</Button>
              </Link>
            </div>
            <div className="relative h-[400px]">
              <Image src="/virtual-tour.png" alt="Virtual Tour" fill className="object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Visit Campus */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Visit Our Campus</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We invite you to visit our campus and experience our facilities firsthand. Schedule a tour today!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white hover:bg-slate-100 text-blue-700 px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Schedule a Visit
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
    </>
  )
}
