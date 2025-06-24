import Image from "next/image"
import Link from "next/link"
import { Mail, Linkedin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const metadata = {
  title: "Our Team | World Link Technical Training Institute",
  description:
    "Meet the dedicated team of professionals at World Link Technical Training Institute who are committed to providing quality vocational education.",
}

async function getTeamMembers() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: teams, error } = await supabase
    .from('teams')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    .order('id', { ascending: false })

  if (error) {
    console.error('Error fetching team members:', error)
    return []
  }

  return teams || []
}

function groupTeamMembersByCategory(teamMembers: any[]) {
  const grouped = teamMembers.reduce((acc, member) => {
    const category = member.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(member)
    return acc
  }, {})

  return grouped
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()
  const groupedMembers = groupTeamMembersByCategory(teamMembers)

  // Get unique categories for display
  const categories = Object.keys(groupedMembers)

  return (
    <>
      <PageHeader title="Our Team" description="Meet the dedicated professionals behind our success" />

      {categories.map((category, index) => (
        <section key={category} className={`py-12 ${index % 2 === 1 ? 'bg-slate-50' : ''}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800">{category}</h2>
              <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
                {category === 'Leadership Team' && 'Meet the experienced professionals guiding our institute'}
                {category === 'Faculty Members' && 'Our experienced instructors bring industry expertise to the classroom'}
                {category === 'Support Staff' && 'The dedicated team that ensures smooth operations and student support'}
                {!['Leadership Team', 'Faculty Members', 'Support Staff'].includes(category) && 
                  'Meet our dedicated team members'}
              </p>
            </div>

            <div className={`grid gap-6 ${
              category === 'Leadership Team' ? 'md:grid-cols-3' : 
              category === 'Support Staff' ? 'md:grid-cols-4' : 
              'md:grid-cols-3'
            }`}>
              {groupedMembers[category].map((member: any) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`relative ${
                    category === 'Leadership Team' ? 'h-64' : 'h-48'
                  }`}>
                    <Image
                      src={member.image || "/placeholder.svg?height=300&width=300&query=person"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className={`font-semibold mb-1 ${
                      category === 'Leadership Team' ? 'text-xl' : 'text-lg'
                    }`}>{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                    {member.bio && (
                      <p className="text-slate-600 text-sm mb-4">{member.bio}</p>
                    )}
                    {(member.email || member.phone || member.linkedin) && (
                      <div className="flex flex-wrap gap-2">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600"
                          >
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </a>
                        )}
                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600"
                          >
                            <Phone className="h-4 w-4" />
                            <span>Call</span>
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Join Our Team */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Join Our Team</h2>
              <p className="text-slate-600 mb-4">
                We are always looking for talented and passionate individuals to join our team. If you are committed to
                quality education and want to make a difference in the lives of our students, we'd love to hear from
                you.
              </p>
              <p className="text-slate-600 mb-6">
                We offer a collaborative work environment, competitive compensation, and opportunities for professional
                growth and development.
              </p>
              <Link href="/careers">
                <Button size="lg">View Current Openings</Button>
              </Link>
            </div>
            <div className="relative h-[400px]">
              <Image src="/join-our-team.png" alt="Join Our Team" fill className="object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team in Person</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our campus to meet our faculty and staff and learn more about our programs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white hover:bg-slate-100 text-blue-700 px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Contact Us
            </Link>
            <Link
              href="/about/facilities"
              className="bg-blue-600 hover:bg-blue-500 text-white border border-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Explore Our Facilities
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
