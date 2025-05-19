import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Youtube, Instagram, Twitter } from "lucide-react"

export default function Footer() {
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
              <li>
                <Link href="/courses/it" className="hover:text-white transition-colors">
                  IT & Computing
                </Link>
              </li>
              <li>
                <Link href="/courses/electrical" className="hover:text-white transition-colors">
                  Electrical
                </Link>
              </li>
              <li>
                <Link href="/courses/mechanical" className="hover:text-white transition-colors">
                  Mechanical
                </Link>
              </li>
              <li>
                <Link href="/courses/hospitality" className="hover:text-white transition-colors">
                  Hospitality
                </Link>
              </li>
              <li>
                <Link href="/courses/agriculture" className="hover:text-white transition-colors">
                  Agriculture
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
                  Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span>01-5970000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span>info@worldlinktraining.edu.np</span>
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
