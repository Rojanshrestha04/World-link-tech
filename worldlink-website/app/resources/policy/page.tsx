import { ClipboardList, Download, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { resources } from "@/lib/data"

export const metadata = {
  title: "Policies | Resources | World Link Technical Training Institute",
  description:
    "Access institutional policies including admission, scholarship, and code of conduct from World Link Technical Training Institute.",
}

export default function PolicyPage() {
  const policies = resources.filter((resource) => resource.category === "Policy")

  return (
    <>
      <PageHeader
        title="Policies"
        description="Access our institutional policies including admission, scholarship, and code of conduct"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6">
            {policies.map((policy) => (
              <div
                key={policy.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
                      <ClipboardList className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{policy.title}</h3>
                      <p className="text-slate-600 mb-2">{policy.description}</p>
                      <div className="flex items-center text-slate-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{policy.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link href={policy.file} target="_blank">
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