"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ClipboardList, Download, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/page-header"
import { Policy } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function PolicyPage() {
  const [policies, setPolicies] = useState<Policy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredResults, setFilteredResults] = useState<Policy[]>([])

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/policy')
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to fetch policies')
        }
        const data = await res.json()
        setPolicies(data)
        setFilteredResults(data)
      } catch (error) {
        console.error('Error fetching policies:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch policies')
      } finally {
        setLoading(false)
      }
    }

    fetchPolicies()
  }, [])

  // Update filtered results whenever search query changes
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = policies.filter(policy => 
        policy.title.toLowerCase().includes(query) ||
        policy.description.toLowerCase().includes(query)
      )
      setFilteredResults(filtered)
    } else {
      setFilteredResults(policies)
    }
  }, [searchQuery, policies])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg">Loading policies...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Policies</h1>
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
        title="Policies"
        description="Access our institutional policies including admission, scholarship, and code of conduct"
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
                placeholder="Search policies..."
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
            {filteredResults.map((policy) => (
              <div
                key={policy.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
                      <ClipboardList className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{policy.title}</h3>
                      <p className="text-slate-600 mb-2">{policy.description}</p>
                      <div className="flex items-center text-slate-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(policy.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link href={policy.file_url || "#"} target="_blank">
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