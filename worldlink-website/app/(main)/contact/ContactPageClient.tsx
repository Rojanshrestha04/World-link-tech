"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PageHeader from "@/components/page-header"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  inquiry: z.string({
    required_error: "Please select an inquiry type.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      inquiry: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = getSupabaseBrowserClient()

      // Insert the form data into the contact_submissions table
      const { error: insertError } = await supabase
        .from("contact_submissions")
        .insert({
          name: values.name,
          email: values.email,
          phone: values.phone,
          subject: values.subject,
          inquiry_type: values.inquiry,
          message: values.message,
          status: 'pending'
        })

      if (insertError) {
        console.error("Supabase insert error:", insertError)
        toast.error(insertError.message || "Failed to submit form")
        throw new Error(insertError.message || "Failed to submit form")
      }

      // Show success message
      setIsSubmitted(true)
      toast.success("Your message has been sent successfully!")
    } catch (err: any) {
      console.error("Form submission error:", err)
      toast.error(err?.message || "An error occurred while submitting your message. Please try again.")
      setError(err?.message || "An error occurred while submitting your message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PageHeader title="Contact Us" description="Get in touch with our team for any inquiries or information" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Our Location</h3>
                    <p className="text-slate-600">
                      World Link Technical Training Institute
                      <br />
                      Jawalakhel, Lalitpur
                      <br />
                      Kathmandu, Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-slate-600">
                      Main: 01-5970000
                      <br />
                      Admissions: 01-5970001
                      <br />
                      Support: 01-5970002
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-slate-600">
                      General Inquiries: info@worldlinktraining.edu.np
                      <br />
                      Admissions: admissions@worldlinktraining.edu.np
                      <br />
                      Support: support@worldlinktraining.edu.np
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Office Hours</h3>
                    <p className="text-slate-600">
                      Sunday - Friday: 9:00 AM - 5:00 PM
                      <br />
                      Saturday: Closed
                      <br />
                      Public Holidays: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Find Us On Map</h3>
                <div className="h-[300px] bg-slate-200 rounded-lg relative overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.2587478568707!2d85.31315137447127!3d27.67839662676947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb196ea2f39203%3A0xb3f16826d162006d!2sWorldLink%20Training%20Center!5e0!3m2!1sen!2snp!4v1750313921536!5m2!1sen!2snp"
                    width="100%"
                    height="100%"
                    style={{ border: 0, width: '100%', height: '100%' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="WorldLink Training Center Map"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {isSubmitted ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">Message Sent Successfully!</h2>
                  <p className="text-slate-600 mb-6">
                    Thank you for contacting World Link Technical Training Institute. We have received your message and
                    will get back to you as soon as possible, usually within 24-48 hours.
                  </p>
                  <p className="text-slate-600 mb-8">
                    If you have any urgent inquiries, please feel free to call us directly at{" "}
                    <span className="font-medium">01-5970000</span>.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/">
                      <Button variant="outline">Return to Home</Button>
                    </Link>
                    <Link href="/courses">
                      <Button>Explore Our Courses</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Send Us a Message</h2>
                  <p className="text-slate-600 mb-6">
                    Fill out the form below to get in touch with our team. We'll respond to your inquiry as soon as
                    possible.
                  </p>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Your email address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Subject of your message" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="inquiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Inquiry Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select inquiry type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="admission">Admission Information</SelectItem>
                                <SelectItem value="courses">Course Information</SelectItem>
                                <SelectItem value="fees">Fee Structure</SelectItem>
                                <SelectItem value="job">Job Placement</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Your message" className="resize-none min-h-[150px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
