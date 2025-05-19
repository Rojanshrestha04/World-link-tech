import { useState } from "react"
import Link from "next/link"
import { FileText, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { resources } from "@/lib/data"

export const metadata = {
  title: "Publications | Resources | World Link Technical Training Institute",
  description:
    "Access handbooks, academic calendars, newsletters, and other publications from World Link Technical Training Institute.",
}

export default function PublicationsPage() {
  const publications = resources.filter((resource) => resource.category === "Publications")

  return (
    <>
      <PageHeader
        title="Publications"
        description="Access our handbooks, academic calendars, newsletters, and other publications"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6">
            {publications.map((publication) => (
              <div
                key={publication.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{publication.title}</h3>
                      <p className="text-slate-600 mb-2">{publication.description}</p>
                      <div className="flex items-center text-slate-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{publication.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link href={publication.file} target="_blank">
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