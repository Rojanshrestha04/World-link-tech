import Link from "next/link"
import { FileText, BookOpen, ClipboardList, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"

export const metadata = {
  title: "Resources | World Link Technical Training Institute",
  description:
    "Access publications, policies, curriculum documents, and reports from World Link Technical Training Institute.",
}

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        title="Resources"
        description="Access our publications, policies, curriculum documents, and reports"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/resources/publications" className="block">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Publications</h3>
                <p className="text-slate-600">
                  Access our handbooks, academic calendars, newsletters, and other publications.
                </p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View Publications</Button>
                </div>
              </div>
            </Link>

            <Link href="/resources/policy" className="block">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Policies</h3>
                <p className="text-slate-600">
                  View our institutional policies including admission, scholarship, and code of conduct.
                </p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View Policies</Button>
                </div>
              </div>
            </Link>

            <Link href="/resources/curriculum" className="block">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Curriculum</h3>
                <p className="text-slate-600">
                  Access detailed curriculum documents for our training programs and courses.
                </p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View Curriculum</Button>
                </div>
              </div>
            </Link>

            <Link href="/resources/reports" className="block">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Reports</h3>
                <p className="text-slate-600">
                  View our annual reports, training outcomes, and industry partnership reports.
                </p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View Reports</Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Resources */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Recent Resources</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Browse our most recently published resources and documents
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-blue-700 mb-3">
                <FileText className="h-5 w-5" />
                <span className="text-sm font-medium">Publications</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Student Handbook 2025</h3>
              <p className="text-slate-600 mb-4">
                Comprehensive guide for students including rules, regulations, and resources available at the institute.
              </p>
              <Link href="/resources/publications">
                <Button variant="outline" size="sm">View Document</Button>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-blue-700 mb-3">
                <ClipboardList className="h-5 w-5" />
                <span className="text-sm font-medium">Policy</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Admission Policy</h3>
              <p className="text-slate-600 mb-4">
                Official policy document outlining admission requirements, procedures, and selection criteria.
              </p>
              <Link href="/resources/policy">
                <Button variant="outline" size="sm">View Document</Button>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-blue-700 mb-3">
                <BarChart3 className="h-5 w-5" />
                <span className="text-sm font-medium">Reports</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Annual Training Report 2024</h3>
              <p className="text-slate-600 mb-4">
                Comprehensive report on training outcomes, student performance, and employment statistics for the year 2024.
              </p>
              <Link href="/resources/reports">
                <Button variant="outline" size="sm">View Document</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}