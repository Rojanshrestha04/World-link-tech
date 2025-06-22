"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Download, Calendar, BookOpen, ClipboardList, BarChart3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { Resource } from "@/lib/types"

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/resources')
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to fetch resources')
        }
        const data = await res.json()
        setResources(data)
      } catch (error) {
        console.error('Error fetching resources:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch resources')
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg">Loading resources...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Resources</h1>
          <p className="text-lg mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader 
        title="Resources" 
        description="Access our publications, policies, curriculum documents, and reports"
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/resources/publications" className="block">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Publications</h3>
                <p className="text-slate-600">
                  Access our handbooks, academic calendars, newsletters, and other publications.
                </p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View Publications</Button>
                </div>
              </div>
            </Link>

            <Link href="/resources/policy" className="block">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Policies</h3>
                <p className="text-slate-600 mb-2">Electrical wiring, installation, maintenance, and repair courses.</p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View Policies</Button>
                </div>
              </div>
            </Link>

            <Link href="/resources/curriculum" className="block">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Curriculum</h3>
                <p className="text-slate-600 mb-2">Plumbing, welding, refrigeration, and air conditioning courses.</p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View Curriculum</Button>
                </div>
              </div>
            </Link>

            <Link href="/resources/reports" className="block">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-700">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Reports</h3>
                <p className="text-slate-600 mb-2">Culinary arts, hotel management, and food service courses.</p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">View Reports</Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Resources */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Recent Resources</h2>
            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
              Browse our most recently published resources and documents
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.slice(0, 3).map((resource) => (
              <div key={resource.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 text-blue-700 mb-3">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium">{resource.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-slate-600 mb-4">{resource.description}</p>
                {typeof resource.file_url === 'string' && resource.file_url !== '' && (
                  <Link href={resource.file_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">View Document</Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}