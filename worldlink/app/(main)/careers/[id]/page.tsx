import Link from "next/link"
import { Calendar, Clock, MapPin, ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/page-header"
import { createClient } from "@supabase/supabase-js"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: job } = await supabase
    .from('careers')
    .select('*')
    .eq('id', params.id)
    .single();
  if (!job) {
    return {
      title: "Job Not Found | World Link Technical Training Institute",
    };
  }
  return {
    title: `${job.title} | Careers | World Link Technical Training Institute`,
    description: job.description || '',
  };
}

async function getJob(id: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: job, error } = await supabase
    .from('careers')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error('Error fetching job:', error);
    return null;
  }
  return job;
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);

  if (!job) {
    return (
      <>
        <PageHeader title="Job Not Found" description="The job posting you're looking for doesn't exist" />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="mb-6">The job posting you're looking for could not be found.</p>
          <Link href="/careers">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title={job.title} description={`${job.job_type || ''} Position`} />
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Job Header */}
            <div className="p-6 border-b">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                </div>
                <div>
                  <Badge variant="secondary" className="text-base px-3 py-1">{job.job_type || 'N/A'}</Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted: {job.posted_date || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Application Deadline: {job.application_deadline || 'N/A'}</span>
                </div>
              </div>
            </div>
            {/* Job Description */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-slate-600 mb-6">{job.description || 'No description provided.'}</p>
              <Separator className="my-6" />
              <h2 className="text-xl font-semibold mb-3">Key Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                {(Array.isArray(job.responsibilities) ? job.responsibilities : []).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <Separator className="my-6" />
              <h2 className="text-xl font-semibold mb-3">Qualifications & Requirements</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                {(Array.isArray(job.requirements) ? job.requirements : []).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <Separator className="my-6" />
              <h2 className="text-xl font-semibold mb-3">Benefits</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                {(Array.isArray(job.benefits) ? job.benefits : []).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <Separator className="my-6" />
              <h2 className="text-xl font-semibold mb-3">How to Apply</h2>
              <p className="text-slate-600 mb-4">
                To apply for this position, please send your CV, cover letter, and relevant certificates to {job.contact_email ? (
                  <a href={`mailto:${job.contact_email}?subject=${encodeURIComponent(job.title + ' - Application')}`} className="text-blue-600 hover:underline">{job.contact_email}</a>
                ) : (
                  <span className="text-blue-600">[No email provided]</span>
                )} with the subject line "{job.title} - Application".
              </p>
              <p className="text-slate-600 mb-6">
                Alternatively, you can submit your application in person at our office during working hours (Sunday to Friday, 10:00 AM to 5:00 PM).
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link href="/careers">
                  <Button variant="ghost" size="lg">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Openings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}