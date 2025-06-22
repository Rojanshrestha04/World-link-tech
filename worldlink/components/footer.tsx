"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  const [courses, setCourses] = useState<{ title: string; slug: string }[]>([])
  const [contact, setContact] = useState({
    address: "Jawalakhel, Lalitpur\nKathmandu, Nepal",
    phone: "01-5970000",
    email: "info@worldlinktraining.edu.np",
  })

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses")
        if (!res.ok) return
        const data = await res.json()
        setCourses(data.slice(0, 5)) // Limit to 5
      } catch (e) {
        // handle error
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("/api/settings")
        if (!res.ok) return
        const data = await res.json()
        setContact({
          address: data.address || "Jawalakhel, Lalitpur\nKathmandu, Nepal",
          phone: data.contact_phone || "01-5970000",
          email: data.contact_email || "info@worldlinktraining.edu.np",
        })
      } catch (e) {
        // handle error, keep fallback
      }
    }
    fetchContact()
  }, [])

  return (
    <footer className="bg-slate-800 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <p className="mb-4">
              World Link Technical Training Institute Pvt. Ltd. is a CTEVT affiliated vocational training provider
              offering quality short-term courses to develop skilled workforce for Nepal.
            </p>
            <div className="flex gap-4">
              <Link href="https://facebook.com" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
              </Link>
              <Link href="https://youtube.com" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
              </Link>
              <Link href="https://twitter.com" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/admission" className="hover:text-white transition-colors">
                  Admission
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  News & Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Our Courses</h3>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.slug}>
                  <Link href={`/courses/${course.slug}`} className="hover:text-white transition-colors">
                    {course.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/courses" className="hover:text-white font-semibold transition-colors">
                  View Courses &rarr;
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>
                  World Link Technical Training Institute
                  <br />
                  {contact.address.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span>{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} World Link Technical Training Institute Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
