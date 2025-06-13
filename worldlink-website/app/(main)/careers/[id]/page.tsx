import Link from "next/link"
import { Calendar, Clock, MapPin, ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/page-header"

// Job openings data (same as in careers/page.tsx)
const jobOpenings = [
  {
    id: "1",
    title: "Senior IT Trainer",
    department: "IT Department",
    type: "Full-time",
    location: "Kathmandu",
    postedDate: "April 25, 2025",
    deadline: "May 20, 2025",
    category: "teaching",
    featured: true,
    description: "We are seeking an experienced IT professional to join our team as a Senior IT Trainer specializing in Computer Hardware & Networking.",
    responsibilities: [
      "Deliver high-quality training in Computer Hardware, Networking, and related IT subjects",
      "Develop and update course materials in line with CTEVT guidelines and industry standards",
      "Conduct practical lab sessions and evaluate student performance",
      "Mentor junior trainers and provide technical guidance",
      "Stay updated with the latest technologies and incorporate them into the curriculum"
    ],
    qualifications: [
      "Bachelor's degree in Computer Science, IT, or related field (Master's preferred)",
      "Minimum 3 years of experience in IT training or related industry experience",
      "Strong knowledge of computer hardware, networking, and troubleshooting",
      "Industry certifications such as CompTIA A+, Network+, or CCNA",
      "Excellent communication and presentation skills",
      "Experience with CTEVT curriculum is a plus"
    ],
    benefits: [
      "Competitive salary package",
      "Professional development opportunities",
      "Health insurance coverage",
      "Festival bonuses",
      "Collaborative work environment"
    ]
  },
  // Include all other job openings from the careers page here
  // ...
];

export function generateMetadata({ params }: { params: { id: string } }) {
  const job = jobOpenings.find(job => job.id === params.id);
  
  if (!job) {
    return {
      title: "Job Not Found | World Link Technical Training Institute",
    };
  }
  
  return {
    title: `${job.title} | Careers | World Link Technical Training Institute`,
    description: job.description,
  };
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = jobOpenings.find(job => job.id === params.id);
  
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
      <PageHeader title={job.title} description={`${job.department} | ${job.type}`} />
      
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Job Header */}
            <div className="p-6 border-b">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold">{job.title}</h1>
                  <p className="text-blue-600 font-medium">{job.department}</p>
                </div>
                <div>
                  <Badge variant="secondary" className="text-base px-3 py-1">{job.type}</Badge>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Posted: {job.postedDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Application Deadline: {job.deadline}</span>
                </div>
              </div>
            </div>
            
            {/* Job Description */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-slate-600 mb-6">{job.description}</p>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-3">Key Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-3">Qualifications & Requirements</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                {job.qualifications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-3">Benefits</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                {job.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-3">How to Apply</h2>
              <p className="text-slate-600 mb-4">
                To apply for this position, please send your CV, cover letter, and relevant certificates to <a href="mailto:careers@worldlinktraining.edu.np" className="text-blue-600 hover:underline">careers@worldlinktraining.edu.np</a> with the subject line "{job.title} - Application".
              </p>
              <p className="text-slate-600 mb-6">
                Alternatively, you can submit your application in person at our office during working hours (Sunday to Friday, 10:00 AM to 5:00 PM).
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="mailto:careers@worldlinktraining.edu.np?subject=Application for {job.title}">
                  <Button size="lg">
                    Apply via Email
                  </Button>
                </a>
                <a href="/application-form.pdf" download>
                  <Button variant="outline" size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Download Application Form
                  </Button>
                </a>
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
      
      {/* Related Positions */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Similar Positions</h2>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {jobOpenings
              .filter(item => item.category === job.category && item.id !== job.id)
              .slice(0, 3)
              .map((relatedJob, index, array) => (
                <div key={relatedJob.id} className={`p-6 ${index !== array.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{relatedJob.title}</h3>
                      <p className="text-blue-600 font-medium mb-2">{relatedJob.department}</p>
                      <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                        <div className="flex items-center">
                          <Badge variant="secondary" className="mr-1">{relatedJob.type}</Badge>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{relatedJob.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Deadline: {relatedJob.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <Link href={`/careers/${relatedJob.id}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}