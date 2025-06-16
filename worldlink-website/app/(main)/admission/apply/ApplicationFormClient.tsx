"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import PageHeader from "@/components/page-header"
import { courses } from "@/lib/data"
import { getSupabaseBrowserClient } from "@/lib/supabase"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  dateOfBirth: z.date({
    required_error: "Please select your date of birth.",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select your gender.",
  }),
  education: z.string({
    required_error: "Please select your highest education.",
  }),
  course: z.string({
    required_error: "Please select a course.",
  }),
  preferredTime: z.enum(["morning", "afternoon", "evening"], {
    required_error: "Please select your preferred class time.",
  }),
  howDidYouHear: z.string().optional(),
  message: z.string().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export default function ApplicationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      gender: undefined,
      education: undefined,
      course: undefined,
      preferredTime: undefined,
      howDidYouHear: "",
      message: "",
      agreeTerms: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = getSupabaseBrowserClient()

      // Insert the form data into the application_submissions table
      const { error: insertError } = await supabase
        .from("application_submissions")
        .insert({
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          date_of_birth: values.dateOfBirth.toISOString().split("T")[0], // Format as YYYY-MM-DD
          gender: values.gender,
          education: values.education,
          course: values.course,
          preferred_time: values.preferredTime,
          how_did_you_hear: values.howDidYouHear || null,
          message: values.message || null,
          status: 'pending' // Explicitly set the status
        })

      if (insertError) {
        console.error("Supabase insert error:", insertError)
        throw new Error(insertError.message || "Failed to submit application")
      }

      // Show success message
      setIsSubmitted(true)
    } catch (err: any) {
      console.error("Application submission error:", err)
      setError(err?.message || "An error occurred while submitting your application. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <>
        <PageHeader
          title="Application Submitted"
          description="Thank you for applying to World Link Technical Training Institute"
        />

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Application Submitted Successfully!</h2>
              <p className="text-slate-600 mb-6">
                Thank you for applying to World Link Technical Training Institute. We have received your application and
                will review it shortly. Our admission team will contact you within 2-3 business days regarding the next
                steps.
              </p>
              <p className="text-slate-600 mb-8">
                If you have any questions, please feel free to contact our admission office at{" "}
                <span className="font-medium">01-5970000</span> or email us at{" "}
                <span className="font-medium">admissions@worldlinktraining.edu.np</span>
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/">
                  <Button variant="outline">Return to Home</Button>
                </Link>
                <Link href="/courses">
                  <Button>Browse More Courses</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Apply Online"
        description="Fill out the application form to enroll in our vocational training programs"
      />

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {error && (
                  <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
                    <p>{error}</p>
                  </div>
                )}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                              onChange={(e) => field.onChange(new Date(e.target.value))}
                              max={format(new Date(), "yyyy-MM-dd")}
                              min="1940-01-01"
                              className="mt-2"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="male" id="male" />
                                  <label htmlFor="male">Male</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="female" id="female" />
                                  <label htmlFor="female">Female</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="other" id="other" />
                                  <label htmlFor="other">Other</label>
                                </div>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">Educational Background</h3>

                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highest Education</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your highest education" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="below_8">Below 8th Grade</SelectItem>
                            <SelectItem value="8th_pass">8th Grade Pass</SelectItem>
                            <SelectItem value="10th_pass">10th Grade (SEE) Pass</SelectItem>
                            <SelectItem value="12th_pass">12th Grade (+2) Pass</SelectItem>
                            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                            <SelectItem value="masters">Master's Degree or Higher</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">Course Selection</h3>

                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Preferred Class Time</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="morning" id="morning" />
                                <label htmlFor="morning">Morning (10AM-1PM)</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="afternoon" id="afternoon" />
                                <label htmlFor="afternoon">Afternoon (2PM-5PM)</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="evening" id="evening" />
                                <label htmlFor="evening">Evening (5PM-8PM)</label>
                              </div>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">Additional Information</h3>

                  <FormField
                    control={form.control}
                    name="howDidYouHear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How did you hear about us?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="social_media">Social Media</SelectItem>
                            <SelectItem value="newspaper">Newspaper</SelectItem>
                            <SelectItem value="radio">Radio</SelectItem>
                            <SelectItem value="tv">Television</SelectItem>
                            <SelectItem value="friend">Friend or Family</SelectItem>
                            <SelectItem value="website">Website</SelectItem>
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
                        <FormLabel>Additional Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional information you would like to share"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I agree to the terms and conditions</FormLabel>
                        <FormDescription>
                          By submitting this form, you agree to our{" "}
                          <Link href="/terms" className="text-blue-600 hover:underline">
                            terms and conditions
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-blue-600 hover:underline">
                            privacy policy
                          </Link>
                          .
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  )
}
