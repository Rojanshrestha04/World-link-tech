"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, Download, Calendar, Briefcase, Tag, Users, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/page-header"
import { Curriculum } from "@/lib/types"
import { cn } from "@/lib/utils"

// Curriculum type filter options
const typeFilterOptions = ["All Types", "Curriculum", "OP", "OSS/NOSS"];

export default function CurriculumPage() {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("All Types")
  const [filteredResults, setFilteredResults] = useState<Curriculum[]>([])

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/curriculum')
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to fetch curriculums')
        }
        const data = await res.json()
        setCurriculums(data)
        setFilteredResults(data)
      } catch (error) {
        console.error('Error fetching curriculums:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch curriculums')
      } finally {
        setLoading(false)
      }
    }

    fetchCurriculums()
  }, [])

  // Update filtered results whenever filters change
  useEffect(() => {
    let results = curriculums
    
    // Filter by selected type if not "All Types"
    if (selectedTypeFilter !== "All Types") {
      results = results.filter(item => item.curriculum_type === selectedTypeFilter)
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.occupation.toLowerCase().includes(query)
      )
    }
    
    setFilteredResults(results)
  }, [selectedTypeFilter, searchQuery, curriculums])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg">Loading curriculums...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Curriculums</h1>
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
        title="Curriculum"
        description="Access detailed curriculum documents for our training programs and courses"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Filter className="mr-2" />
              <h3 className="text-lg font-semibold">Filter</h3>
            </div>
            
            {/* Curriculum Type Filter */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 text-slate-700">Curriculum Type</h4>
              <div className="flex flex-wrap gap-3 mb-4">
                {typeFilterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedTypeFilter(option)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                      selectedTypeFilter === option
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="search"
                placeholder="Search courses..."
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
            {filteredResults.map((curriculum) => (
              <CurriculumCard key={curriculum.id} curriculum={curriculum} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// Get category badge color based on category
function getCategoryColor(category: string) {
  switch (category) {
    case "IT":
      return "bg-blue-100 text-blue-800";
    case "Electrical":
      return "bg-yellow-100 text-yellow-800";
    case "Mechanical":
      return "bg-green-100 text-green-800";
    case "Hospitality":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Get curriculum type badge color
function getTypeColor(type: string) {
  switch (type) {
    case "Curriculum":
      return "bg-blue-100 text-blue-800";
    case "OP":
      return "bg-green-100 text-green-800";
    case "OSS/NOSS":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Curriculum Card Component
function CurriculumCard({ curriculum }: { curriculum: Curriculum }) {
  const categoryColorClass = getCategoryColor(curriculum.category);
  const typeColorClass = getTypeColor(curriculum.curriculum_type);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-2 mb-1">
              <h3 className="text-xl font-semibold">{curriculum.title}</h3>
              <div className="flex gap-2">
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${categoryColorClass}`}>
                  {curriculum.category}
                </span>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${typeColorClass}`}>
                  {curriculum.curriculum_type}
                </span>
              </div>
            </div>
            <p className="text-slate-600 mb-3">{curriculum.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center text-slate-700">
                <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                <div>
                  <span className="text-xs text-slate-500 block">Occupation</span>
                  <span className="font-medium">{curriculum.occupation}</span>
                </div>
              </div>
              
              <div className="flex items-center text-slate-700">
                <Tag className="h-4 w-4 mr-2 text-blue-600" />
                <div>
                  <span className="text-xs text-slate-500 block">Type</span>
                  <span className="font-medium">{curriculum.type}</span>
                </div>
              </div>
              
              <div className="flex items-center text-slate-700">
                <Users className="h-4 w-4 mr-2 text-blue-600" />
                <div>
                  <span className="text-xs text-slate-500 block">Developed By</span>
                  <span className="font-medium">{curriculum.developed_by}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-slate-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(curriculum.created_at).toLocaleDateString()}</span>
              </div>
              
              <div className="flex-shrink-0">
                <Link href={curriculum.file_url || "#"} target="_blank">
                  <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
