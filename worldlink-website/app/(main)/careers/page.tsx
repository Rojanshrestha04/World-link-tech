import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageHeader from "@/components/page-header"
import { createClient } from "@supabase/supabase-js"

export const metadata = {
  title: "Careers | World Link Technical Training Institute",
  description:
    "Explore current job openings and career opportunities at World Link Technical Training Institute. Join our team of dedicated professionals.",
}

async function getCareers() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase
    .from('careers')
    .select('*')
    .eq('is_active', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching careers:', error);
    return [];
  }
  return data || [];
}

export default async function CareersPage() {
  const careers = await getCareers();

  // Group jobs for tabs (example: by job_type)
  const featuredJobs = careers.filter(job => job.featured);
  const teachingJobs = careers.filter(job => job.job_type === "full-time");
  const administrativeJobs = careers.filter(job => job.job_type === "part-time");
  const technicalJobs = careers.filter(job => job.job_type === "contract" || job.job_type === "internship");

  return (
    <>
      <PageHeader 
        title="Career Opportunities" 
        description="Join our team of dedicated professionals and make a difference in vocational education" 
      />

      {/* Featured Openings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Featured Openings</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Explore our current job opportunities and find your perfect role
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.length === 0 ? (
              <div className="col-span-full text-center text-slate-500">No featured jobs available at the moment.</div>
            ) : (
              featuredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border-t-4 border-blue-600">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <Badge variant="outline" className="bg-blue-50">Featured</Badge>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-y-2 text-sm text-slate-500 mb-4">
                    <div className="w-full sm:w-1/2 flex items-center">
                        <Badge variant="secondary" className="mr-2">{job.job_type}</Badge>
                    </div>
                    <div className="w-full sm:w-1/2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="w-full sm:w-1/2 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                        <span>Posted: {job.posted_date}</span>
                    </div>
                    <div className="w-full sm:w-1/2 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                        <span>Deadline: {job.application_deadline || 'N/A'}</span>
                      </div>
                    </div>
                  <Link href={`/careers/${job.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </div>
              </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* All Job Openings */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">All Job Openings</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Browse all available positions by category
            </p>
          </div>

          <Tabs defaultValue="teaching" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-8">
              <TabsTrigger value="teaching">Teaching Positions</TabsTrigger>
              <TabsTrigger value="administrative">Administrative Roles</TabsTrigger>
              <TabsTrigger value="technical">Technical Support</TabsTrigger>
            </TabsList>
            <TabsContent value="teaching" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {teachingJobs.length === 0 ? (
                  <div className="p-6 text-center text-slate-500">No teaching jobs available.</div>
                ) : (
                  teachingJobs.map((job, index) => (
                  <div key={job.id} className={`p-6 ${index !== teachingJobs.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                          <div className="flex items-center">
                              <Badge variant="secondary" className="mr-1">{job.job_type}</Badge>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                              <span>Deadline: {job.application_deadline || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      <Link href={`/careers/${job.id}`}>
                        <Button variant="outline" className="whitespace-nowrap">
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="administrative" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {administrativeJobs.length === 0 ? (
                  <div className="p-6 text-center text-slate-500">No administrative jobs available.</div>
                ) : (
                  administrativeJobs.map((job, index) => (
                  <div key={job.id} className={`p-6 ${index !== administrativeJobs.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                          <div className="flex items-center">
                              <Badge variant="secondary" className="mr-1">{job.job_type}</Badge>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                              <span>Deadline: {job.application_deadline || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      <Link href={`/careers/${job.id}`}>
                        <Button variant="outline" className="whitespace-nowrap">
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="technical" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {technicalJobs.length === 0 ? (
                  <div className="p-6 text-center text-slate-500">No technical jobs available.</div>
                ) : (
                  technicalJobs.map((job, index) => (
                  <div key={job.id} className={`p-6 ${index !== technicalJobs.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                          <div className="flex items-center">
                              <Badge variant="secondary" className="mr-1">{job.job_type}</Badge>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                              <span>Deadline: {job.application_deadline || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      <Link href={`/careers/${job.id}`}>
                        <Button variant="outline" className="whitespace-nowrap">
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Application Process</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Follow these steps to apply for a position at World Link Technical Training Institute
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-700 font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Review Job Details</h3>
              <p className="text-slate-600 text-sm">
                Carefully review the job description, responsibilities, and qualifications to ensure it's a good fit.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-700 font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Prepare Documents</h3>
              <p className="text-slate-600 text-sm">
                Update your CV, prepare a cover letter, and gather necessary certificates and references.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-700 font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Submit Application</h3>
              <p className="text-slate-600 text-sm">
                Submit your application through our online portal or email it to careers@worldlinktraining.edu.np.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-700 font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Interview Process</h3>
              <p className="text-slate-600 text-sm">
                Shortlisted candidates will be invited for interviews and possibly a teaching demonstration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image 
                src="/work-with-us.png" 
                alt="Work With Us" 
                fill 
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Why Work With Us</h2>
              <p className="text-slate-600 mb-6">
                At World Link Technical Training Institute, we value our team members and provide a supportive environment for professional growth and development.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                    <svg className="h-4 w-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Professional Development</h3>
                    <p className="text-slate-600 text-sm">
                      We invest in our team's growth through training, workshops, and career advancement opportunities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                    <svg className="h-4 w-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Collaborative Environment</h3>
                    <p className="text-slate-600 text-sm">
                      Work with a team of dedicated professionals who are passionate about education and student success.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                    <svg className="h-4 w-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Competitive Benefits</h3>
                    <p className="text-slate-600 text-sm">
                      Enjoy competitive salary, health insurance, festival bonuses, and other benefits.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                    <svg className="h-4 w-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Make a Difference</h3>
                    <p className="text-slate-600 text-sm">
                      Contribute to the development of skilled professionals and make a positive impact on students' lives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our current openings and take the next step in your career with World Link Technical Training Institute.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="mailto:careers@worldlinktraining.edu.np" 
              className="bg-white hover:bg-slate-100 text-blue-700 px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Email Your Resume
            </a>
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-500 text-white border border-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Contact HR Department
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}