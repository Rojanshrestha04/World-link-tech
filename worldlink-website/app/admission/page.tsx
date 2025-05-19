import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, FileText, Calendar, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import PageHeader from "@/components/page-header"

export const metadata = {
  title: "Admission | World Link Technical Training Institute",
  description:
    "Learn about the admission process, eligibility criteria, and how to apply for courses at World Link Technical Training Institute.",
}

export default function AdmissionPage() {
  return (
    <>
      <PageHeader title="Admission" description="Learn about our admission process and how to apply" />

      {/* Admission Process */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Admission Process</h2>
              <p className="text-slate-600 mb-6">
                Joining World Link Technical Training Institute is a straightforward process. Follow these steps to
                enroll in your chosen vocational training program:
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Choose a Course</h3>
                    <p className="text-slate-600">
                      Browse our range of CTEVT certified courses and select the one that aligns with your career goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Check Eligibility</h3>
                    <p className="text-slate-600">
                      Ensure you meet the eligibility criteria for your chosen course, including educational
                      qualifications and age requirements.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Submit Application</h3>
                    <p className="text-slate-600">
                      Complete the application form online or visit our institute to submit it in person along with
                      required documents.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Admission Interview</h3>
                    <p className="text-slate-600">
                      Attend a brief interview to assess your interest and aptitude for the chosen course.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Pay Fees & Enroll</h3>
                    <p className="text-slate-600">
                      Upon acceptance, complete the fee payment and formally enroll in your chosen course.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/admission/apply">
                  <Button size="lg">Apply Now</Button>
                </Link>
              </div>
            </div>

            <div className="relative h-[500px]">
              <Image
                src="/admission-process.png"
                alt="Admission Process"
                width={600}
                height={500}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Eligibility Criteria</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              General requirements for admission to our vocational training programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">General Eligibility</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">Minimum age of 16 years (varies by course)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">
                    Educational qualification: Minimum 8th grade pass (varies by course)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">Basic understanding of Nepali and/or English language</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">Physical fitness suitable for practical training</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600">Interest and aptitude in the chosen field</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Course-Specific Requirements</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-blue-700">IT & Computing Courses</h4>
                  <p className="text-slate-600 mt-1">Minimum 10th grade pass, basic computer knowledge</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700">Electrical Courses</h4>
                  <p className="text-slate-600 mt-1">Minimum 8th grade pass, basic understanding of mathematics</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700">Mechanical Courses</h4>
                  <p className="text-slate-600 mt-1">Minimum 8th grade pass, basic mechanical aptitude</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700">Hospitality Courses</h4>
                  <p className="text-slate-600 mt-1">Minimum 10th grade pass, good communication skills</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-slate-600 text-sm">
                  Note: Specific requirements may vary by course. Please check individual course pages for detailed
                  eligibility criteria.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Required Documents</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Documents you need to submit with your application</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Basic Documents</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Completed application form</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Citizenship certificate or birth certificate (photocopy)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Educational certificates (photocopies)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">4 passport-sized photographs</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Additional Documents (if applicable)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Experience certificates (if any)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Recommendation letters (if any)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Scholarship application documents (if applying)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Caste/ethnicity certificate (for reserved quotas)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-slate-600 text-sm">
                  All original documents must be presented for verification at the time of admission. Photocopies should
                  be attested by a gazetted officer or notary public.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Important Dates</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Key dates for upcoming course batches</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-blue-600">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Computer Hardware & Networking</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Application Deadline:</span>
                  <span className="font-medium">April 25, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Batch Starts:</span>
                  <span className="font-medium">May 1, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Duration:</span>
                  <span className="font-medium">3 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Class Schedule:</span>
                  <span className="font-medium">Mon-Fri, 10AM-1PM</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-yellow-600">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-yellow-600 mr-3" />
                <h3 className="text-xl font-semibold">Electrical House Wiring</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Application Deadline:</span>
                  <span className="font-medium">May 10, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Batch Starts:</span>
                  <span className="font-medium">May 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Duration:</span>
                  <span className="font-medium">2 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Class Schedule:</span>
                  <span className="font-medium">Mon-Fri, 2PM-5PM</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-600">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold">Mobile Phone Repair</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Application Deadline:</span>
                  <span className="font-medium">May 25, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Batch Starts:</span>
                  <span className="font-medium">June 1, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Duration:</span>
                  <span className="font-medium">2 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Class Schedule:</span>
                  <span className="font-medium">Mon-Fri, 10AM-1PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Frequently Asked Questions</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">Common questions about our admission process</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the admission process?</AccordionTrigger>
                <AccordionContent>
                  The admission process involves selecting a course, checking eligibility, submitting an application
                  with required documents, attending an interview, and completing the fee payment upon acceptance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Can I apply online?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can apply online through our website. Simply fill out the online application form and upload
                  the required documents. You can also visit our institute to apply in person.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Are there any scholarships available?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer scholarships to deserving candidates based on merit and financial need. We also have
                  special scholarships for women, disadvantaged groups, and persons with disabilities. Please check our
                  scholarship page for more details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What is the fee structure?</AccordionTrigger>
                <AccordionContent>
                  The fee structure varies by course. It typically includes registration fee, tuition fee, examination
                  fee, and practical materials cost. Detailed fee information is available on each course page. We also
                  offer installment payment options.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Do you provide job placement assistance?</AccordionTrigger>
                <AccordionContent>
                  Yes, we have a dedicated placement cell that helps students find employment opportunities after course
                  completion. We have partnerships with various industries and regularly organize job fairs and campus
                  recruitment drives.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Can I visit the institute before applying?</AccordionTrigger>
                <AccordionContent>
                  We encourage prospective students to visit our institute, tour our facilities, and speak with faculty
                  members before making a decision. You can schedule a visit by contacting our admission office.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 text-center">
              <p className="text-slate-600 mb-4">Still have questions about the admission process?</p>
              <Link href="/contact">
                <Button>Contact Our Admission Team</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Now CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step towards your career by applying for one of our vocational training programs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/admission/apply"
              className="bg-white hover:bg-slate-100 text-blue-700 px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Apply Online
            </Link>
            <Link
              href="/courses"
              className="bg-blue-600 hover:bg-blue-500 text-white border border-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
