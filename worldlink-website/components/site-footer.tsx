'use client'

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import React, { useEffect, useState } from "react"

export default function SiteFooter() {
  const [courses, setCourses] = useState<{ title: string; slug: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState<{
    address?: string;
    contact_phone?: string;
    contact_email?: string;
  }>({})
  const [settingsLoading, setSettingsLoading] = useState(true)
  const [settingsError, setSettingsError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch("/api/courses")
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || "Failed to fetch courses")
        }
        const data = await res.json()
        // Only keep title and slug, and limit to 5
        setCourses(data.slice(0, 5).map((c: any) => ({ title: c.title, slug: c.slug })))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch courses")
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setSettingsLoading(true)
        setSettingsError(null)
        const res = await fetch("/api/settings")
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || "Failed to fetch settings")
        }
        const data = await res.json()
        setSettings(data)
      } catch (err) {
        setSettingsError(err instanceof Error ? err.message : "Failed to fetch settings")
      } finally {
        setSettingsLoading(false)
      }
    }
    fetchSettings()
  }, [])

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo-white.png"
                alt="World Link Technical Training Institute"
                width={180}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-slate-300 mb-4">
              World Link Technical Training Institute is dedicated to providing quality vocational training to empower
              Nepal's youth with practical skills for the modern workforce.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-white hover:text-blue-400 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="text-white hover:text-blue-400 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" className="text-white hover:text-blue-400 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://youtube.com" className="text-white hover:text-blue-400 transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-slate-300 hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/admission/apply" className="text-slate-300 hover:text-white transition-colors">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-slate-300 hover:text-white transition-colors">
                  News & Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-slate-300 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Courses</h3>
            <ul className="space-y-2">
              {loading && <li className="text-slate-400">Loading...</li>}
              {error && <li className="text-red-400">{error}</li>}
              {!loading && !error && courses.map((course) => (
                <li key={course.slug}>
                  <Link href={`/courses/${course.slug}`} className="text-slate-300 hover:text-white transition-colors">
                    {course.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/courses" className="text-blue-400 hover:text-blue-300 transition-colors">
                  View All Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              {settingsLoading && <li className="text-slate-400">Loading...</li>}
              {settingsError && <li className="text-red-400">{settingsError}</li>}
              {!settingsLoading && !settingsError && (
                <>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-slate-300 whitespace-pre-line">{settings.address || "-"}</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-400 mr-2" />
                    <span className="text-slate-300">{settings.contact_phone || "-"}</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-400 mr-2" />
                    <a
                      href={settings.contact_email ? `mailto:${settings.contact_email}` : undefined}
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {settings.contact_email || "-"}
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} World Link Technical Training Institute. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
