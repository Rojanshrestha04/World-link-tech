import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function SiteFooter() {
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
              <li>
                <Link href="/courses/web-development" className="text-slate-300 hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/mobile-app-development"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link href="/courses/graphic-design" className="text-slate-300 hover:text-white transition-colors">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link href="/courses/digital-marketing" className="text-slate-300 hover:text-white transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/courses/networking" className="text-slate-300 hover:text-white transition-colors">
                  Networking
                </Link>
              </li>
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
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <span className="text-slate-300">
                  World Link Technical Training Institute
                  <br />
                  Jawalakhel, Lalitpur
                  <br />
                  Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-slate-300">01-5970000</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <a
                  href="mailto:info@worldlinktraining.edu.np"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  info@worldlinktraining.edu.np
                </a>
              </li>
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
