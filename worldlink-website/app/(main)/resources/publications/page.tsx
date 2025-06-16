"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Download, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/page-header"
import { Publication } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredResults, setFilteredResults] = useState<Publication[]>([])

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/publications')
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to fetch publications')
        }
        const data = await res.json()
        setPublications(data)
        setFilteredResults(data)
      } catch (error) {
        console.error('Error fetching publications:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch publications')
      } finally {
        setLoading(false)
      }
    }

    fetchPublications()
  }, [])

  // Update filtered results whenever search query changes
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = publications.filter(publication => 
        publication.title.toLowerCase().includes(query) ||
        publication.description.toLowerCase().includes(query)
      )
      setFilteredResults(filtered)
    } else {
      setFilteredResults(publications)
    }
  }, [searchQuery, publications])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg">Loading publications...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Publications</h1>
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
        title="Publications"
        description="Access our handbooks, academic calendars, newsletters, and other publications"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Filter className="mr-2" />
              <h3 className="text-lg font-semibold">Filter</h3>
            </div>
            
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="search"
                placeholder="Search publications..."
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-slate-600">
              Showing {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'}
            </p>
          </div>
          
          {/* Results */}
          <div className="grid gap-6">
            {filteredResults.map((publication) => (
              <div
                key={publication.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{publication.title}</h3>
                      <p className="text-slate-600 mb-2">{publication.description}</p>
                      <div className="flex items-center text-slate-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(publication.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link href={publication.file_url || "#"} target="_blank">
                      <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}