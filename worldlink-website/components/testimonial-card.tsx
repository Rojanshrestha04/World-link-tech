import Image from "next/image"
import type { Testimonial } from "@/lib/types"

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-64 relative">
        <Image
          src={testimonial.image || "/placeholder.svg?height=300&width=400&query=person"}
          alt={`${testimonial.name} - ${testimonial.position}`}
          width={400}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
        <p className="text-blue-600 font-medium mb-4">{testimonial.position}</p>
        <p className="text-slate-600 mb-4">"{testimonial.quote}"</p>
      </div>
    </div>
  )
}
