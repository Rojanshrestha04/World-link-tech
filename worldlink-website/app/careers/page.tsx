import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageHeader from "@/components/page-header"

export const metadata = {
  title: "Careers | World Link Technical Training Institute",
  description:
    "Explore current job openings and career opportunities at World Link Technical Training Institute. Join our team of dedicated professionals.",
}

// Job openings data
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
  {
    id: "2",
    title: "Web Development Co-Trainer",
    department: "IT Department",
    type: "Full-time",
    location: "Kathmandu",
    postedDate: "April 28, 2025",
    deadline: "May 25, 2025",
    category: "teaching",
    featured: true,
    description: "We are looking for a passionate Web Development Co-Trainer to assist in delivering our web development courses and provide hands-on guidance to students.",
    responsibilities: [
      "Assist the lead trainer in conducting web development classes",
      "Guide students during practical sessions and project work",
      "Help develop and update course materials for web technologies",
      "Provide one-on-one support to students facing challenges",
      "Evaluate student assignments and provide constructive feedback"
    ],
    qualifications: [
      "Bachelor's degree in Computer Science, IT, or related field",
      "At least 2 years of experience in web development",
      "Strong knowledge of HTML, CSS, JavaScript, and modern frameworks",
      "Experience with backend technologies and databases",
      "Good communication and interpersonal skills",
      "Teaching experience is a plus but not mandatory"
    ],
    benefits: [
      "Competitive salary package",
      "Professional development opportunities",
      "Health insurance coverage",
      "Festival bonuses",
      "Collaborative work environment"
    ]
  },
  {
    id: "3",
    title: "Electrical Wiring Trainer",
    department: "Electrical Department",
    type: "Full-time",
    location: "Kathmandu",
    postedDate: "April 20, 2025",
    deadline: "May 15, 2025",
    category: "teaching",
    featured: false,
    description: "We are seeking an experienced Electrical Wiring Trainer to teach our Electrical House Wiring course and provide practical training to students.",
    responsibilities: [
      "Deliver theoretical and practical training in electrical wiring and installation",
      "Develop and update course materials as per CTEVT guidelines",
      "Conduct hands-on workshops and practical assessments",
      "Ensure safety protocols are followed in the electrical workshop",
      "Mentor students and provide career guidance in the electrical field"
    ],
    qualifications: [
      "Diploma or Bachelor's degree in Electrical Engineering",
      "Minimum 3 years of experience in electrical wiring and installation",
      "Strong knowledge of electrical codes and safety standards",
      "Experience in teaching or training is preferred",
      "Excellent communication skills in Nepali and English",
      "Valid electrical license"
    ],
    benefits: [
      "Competitive salary package",
      "Professional development opportunities",
      "Health insurance coverage",
      "Festival bonuses",
      "Collaborative work environment"
    ]
  },
  {
    id: "4",
    title: "Culinary Arts Trainer",
    department: "Hospitality Department",
    type: "Full-time",
    location: "Kathmandu",
    postedDate: "April 22, 2025",
    deadline: "May 18, 2025",
    category: "teaching",
    featured: false,
    description: "We are looking for an experienced Culinary Arts Trainer to teach our Professional Cooking course and train students in culinary skills and kitchen management.",
    responsibilities: [
      "Deliver theoretical and practical training in culinary arts and food preparation",
      "Develop and update course materials as per industry standards",
      "Conduct hands-on cooking sessions and practical assessments",
      "Ensure food safety and hygiene protocols are followed",
      "Mentor students and provide career guidance in the hospitality industry"
    ],
    qualifications: [
      "Diploma or Bachelor's degree in Culinary Arts or Hospitality Management",
      "Minimum 3 years of experience in professional kitchens or culinary training",
      "Strong knowledge of various cuisines and cooking techniques",
      "Experience in teaching or training is preferred",
      "Excellent communication and demonstration skills",
      "Food safety certification"
    ],
    benefits: [
      "Competitive salary package",
      "Professional development opportunities",
      "Health insurance coverage",
      "Festival bonuses",
      "Collaborative work environment"
    ]
  },
  {
    id: "5",
    title: "Student Counselor",
    department: "Student Affairs",
    type: "Full-time",
    location: "Kathmandu",
    postedDate: "April 26, 2025",
    deadline: "May 22, 2025",
    category: "administrative",
    featured: true,
    description: "We are seeking a dedicated Student Counselor to provide guidance and support to our students throughout their educational journey.",
    responsibilities: [
      "Provide academic and career counseling to students",
      "Assist students in course selection and career planning",
      "Conduct orientation programs for new students",
      "Address student concerns and provide appropriate solutions",
      "Coordinate with faculty members to support student success",
      "Maintain student records and track progress"
    ],
    qualifications: [
      "Bachelor's degree in Psychology, Education, or related field",
      "At least 2 years of experience in counseling or student affairs",
      "Strong interpersonal and communication skills",
      "Empathetic approach to student concerns",
      "Knowledge of vocational education and career pathways",
      "Proficiency in MS Office and database management"
    ],
    benefits: [
      "Competitive salary package",
      "Professional development opportunities",
      "Health insurance coverage",
      "Festival bonuses",
      "Collaborative work environment"
    ]
  },
  {
    id: "6",
    title: "Admissions Officer",
    department: "Admissions",
    type: "Full-time",
    location: "Kathmandu",
    postedDate: "April 24, 2025",
    deadline: "May 20, 2025",
    category: "administrative",
    featured: false,
    description: "We are looking for an organized and detail-oriented Admissions Officer to manage the student admission process and provide information to prospective students.",
    responsibilities: [
      "Process student applications and admissions",
      "Provide information about courses and admission requirements to prospective students",
      "Conduct admission interviews and assessments",
      "Maintain accurate records of applicants and admitted students",
      "Coordinate with other departments for smooth student onboarding",
      "Participate in educational fairs and recruitment events"
    ],
    qualifications: [
      "Bachelor's degree in any discipline",
      "At least 2 years of experience in admissions or administrative role",
      "Excellent communication and interpersonal skills",
      "Strong organizational and multitasking abilities",
      "Proficiency in MS Office and database management",
      "Customer service orientation"
    ],
    benefits: [
      "Competitive salary package",
      "Professional development opportunities",
      "Health insurance coverage",
      "Festival bonuses",
      "Collaborative work environment"
    ]
  },
  {
    id: "7",
    title: "Marketing Coordinator",
    department: "Marketing",
    type: "Full-time",
    location: "Kathmandu",
    postedDate: "April 27, 2025",
    deadline: "May 23, 2025",
    category: "administrative",
    featured: false,
    description: "We are seeking a creative and energetic Marketing Coordinator to promote our institute and its programs through various channels.",
    responsibilities: [
      "Develop and implement marketing strategies for course promotions",
      "Manage social media accounts and digital marketing campaigns",
      "Create content for website, brochures, and promotional materials",
      "Coordinate with local media for advertisements and press releases",
      "Organize and participate in educational fairs and events",
      "Track marketing metrics and prepare reports"
    ],
    qualifications: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "At least 2 years of experience in marketing or communications",
      "Strong knowledge of digital marketing and social media platforms",
      "Excellent written and verbal communication skills",
      "Creative thinking and problem-solving abilities",
      "Experience with graphic design tools is a plus"
    ],
    benefits: [
      "Competitive salary package",
      "Professional development opportunities",
      "Health insurance coverage",
      "Festival bonuses",
      "Collaborative work environment"
    ]
  },
  {
    id: "8",
    title: "IT Lab Assistant",
    department: "IT Department",
    type: "Part-time",
    location: "Kathmandu",
    postedDate: "April 29, 2025",
    deadline: "May 25, 2025",
    category: "technical",
    featured: false,
    description: "We are looking for an IT Lab Assistant to maintain our computer labs and provide technical support during practical sessions.",
    responsibilities: [
      "Set up and maintain computer hardware and software in labs",
      "Assist trainers during practical sessions",
      "Troubleshoot technical issues and perform basic repairs",
      "Ensure all equipment is in working condition before classes",
      "Maintain inventory of IT equipment and supplies",
      "Assist in upgrading lab facilities as needed"
    ],
    qualifications: [
      "Diploma or Bachelor's degree in IT or related field (ongoing studies acceptable)",
      "Knowledge of computer hardware and networking",
      "Basic troubleshooting skills",
      "Responsible and detail-oriented approach",
      "Good communication skills",
      "Ability to work in shifts"
    ],
    benefits: [
      "Competitive hourly rate",
      "Flexible working hours",
      "Hands-on experience in IT support",
      "Professional development opportunities",
      "Possibility of full-time employment after graduation"
    ]
  }
];

export default function CareersPage() {
  // Group jobs by category
  const teachingJobs = jobOpenings.filter(job => job.category === "teaching");
  const administrativeJobs = jobOpenings.filter(job => job.category === "administrative");
  const technicalJobs = jobOpenings.filter(job => job.category === "technical");
  const featuredJobs = jobOpenings.filter(job => job.featured);

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
            {featuredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border-t-4 border-blue-600">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <Badge variant="outline" className="bg-blue-50">Featured</Badge>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{job.department}</p>
                  <p className="text-slate-600 text-sm mb-4">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-y-2 text-sm text-slate-500 mb-4">
                    <div className="w-full sm:w-1/2 flex items-center">
                      <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                    </div>
                    <div className="w-full sm:w-1/2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="w-full sm:w-1/2 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Posted: {job.postedDate}</span>
                    </div>
                    <div className="w-full sm:w-1/2 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Deadline: {job.deadline}</span>
                    </div>
                  </div>
                  
                  <Link href={`/careers/${job.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
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
                {teachingJobs.map((job, index) => (
                  <div key={job.id} className={`p-6 ${index !== teachingJobs.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <p className="text-blue-600 font-medium mb-2">{job.department}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                          <div className="flex items-center">
                            <Badge variant="secondary" className="mr-1">{job.type}</Badge>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Deadline: {job.deadline}</span>
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
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="administrative" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {administrativeJobs.map((job, index) => (
                  <div key={job.id} className={`p-6 ${index !== administrativeJobs.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <p className="text-blue-600 font-medium mb-2">{job.department}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                          <div className="flex items-center">
                            <Badge variant="secondary" className="mr-1">{job.type}</Badge>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Deadline: {job.deadline}</span>
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
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="technical" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {technicalJobs.map((job, index) => (
                  <div key={job.id} className={`p-6 ${index !== technicalJobs.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                        <p className="text-blue-600 font-medium mb-2">{job.department}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                          <div className="flex items-center">
                            <Badge variant="secondary" className="mr-1">{job.type}</Badge>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Deadline: {job.deadline}</span>
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
                ))}
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