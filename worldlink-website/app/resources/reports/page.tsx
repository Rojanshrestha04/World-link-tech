import { useState } from "react"
import Link from "next/link"
import { BarChart3, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { resources } from "@/lib/data"

export const metadata = {
  title: "Reports | Resources | World Link Technical Training Institute",
  description:
    "Access annual reports, training outcomes, and industry partnership reports from World Link Technical Training Institute.",
}

export default function ReportsPage() {
  const reports = resources.filter((resource) => resource.category === "Reports")

  return (
    <>
      <PageHeader
        title="Reports"
        description="Access our annual reports, training outcomes, and industry partnership reports"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{report.title}</h3>
                      <p className="text-slate-600 mb-2">{report.description}</p>
                      <div className="flex items-center text-slate-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{report.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link href={report.file} target="_blank">
                      <Button className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}