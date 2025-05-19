"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BookOpen, Download, Calendar, Briefcase, Tag, Users, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/page-header"
import { cn } from "@/lib/utils"

// Extended curriculum type with additional fields
interface ExtendedCurriculum {
  id: string
  title: string
  description: string
  file: string
  category: string
  date: string
  occupation: string
  type: string
  developedBy: string
  curriculumType: "Curriculum" | "OP" | "OSS/NOSS"
}

// Sample extended curriculum data
const extendedCurriculums: ExtendedCurriculum[] = [
  // Curriculum type
  {
    id: "1",
    title: "Computer Hardware & Networking Curriculum",
    description: "Detailed curriculum for the Computer Hardware & Networking course including modules, topics, and assessment criteria.",
    file: "/resources/computer-hardware-networking-curriculum.pdf",
    category: "IT",
    date: "January 25, 2025",
    occupation: "Computer Hardware Technician",
    type: "Level 2",
    developedBy: "CTEVT",
    curriculumType: "Curriculum"
  },
  {
    id: "2",
    title: "Electrical House Wiring Curriculum",
    description: "Detailed curriculum for the Electrical House Wiring course including modules, topics, and assessment criteria.",
    file: "/resources/electrical-house-wiring-curriculum.pdf",
    category: "Electrical",
    date: "January 25, 2025",
    occupation: "Electrical Technician",
    type: "Level 1",
    developedBy: "CTEVT",
    curriculumType: "Curriculum"
  },
  {
    id: "3",
    title: "Mobile Phone Repair Curriculum",
    description: "Comprehensive curriculum for mobile phone repair training program.",
    file: "/resources/mobile-repair-curriculum.pdf",
    category: "IT",
    date: "February 10, 2025",
    occupation: "Mobile Repair Technician",
    type: "Level 1",
    developedBy: "CTEVT",
    curriculumType: "Curriculum"
  },
  
  // OP type
  {
    id: "4",
    title: "Web Development Occupational Profile",
    description: "Occupational profile for web development training program.",
    file: "/resources/web-development-op.pdf",
    category: "IT",
    date: "March 5, 2025",
    occupation: "Web Developer",
    type: "Level 3",
    developedBy: "Industry Experts",
    curriculumType: "OP"
  },
  {
    id: "5",
    title: "Professional Cooking Occupational Profile",
    description: "Detailed occupational profile for professional cooking course.",
    file: "/resources/cooking-op.pdf",
    category: "Hospitality",
    date: "February 15, 2025",
    occupation: "Professional Cook",
    type: "Level 2",
    developedBy: "Hospitality Industry Association",
    curriculumType: "OP"
  },
  
  // OSS/NOSS type
  {
    id: "6",
    title: "Plumbing NOSS Standard",
    description: "National Occupational Skill Standard for plumbing and pipe fitting.",
    file: "/resources/plumbing-noss.pdf",
    category: "Mechanical",
    date: "January 30, 2025",
    occupation: "Plumber",
    type: "Level 1",
    developedBy: "National Skill Testing Board",
    curriculumType: "OSS/NOSS"
  },
  {
    id: "7",
    title: "Welding OSS Standard",
    description: "Occupational Skill Standard for welding techniques and safety.",
    file: "/resources/welding-oss.pdf",
    category: "Mechanical",
    date: "March 10, 2025",
    occupation: "Welder",
    type: "Level 2",
    developedBy: "CTEVT",
    curriculumType: "OSS/NOSS"
  }
];

// Curriculum type filter options
const typeFilterOptions = ["All Types", "Curriculum", "OP", "OSS/NOSS"];

export default function CurriculumPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("All Types");
  const [filteredResults, setFilteredResults] = useState<ExtendedCurriculum[]>(extendedCurriculums);
  
  // Update filtered results whenever filters change
  useEffect(() => {
    let results = extendedCurriculums;
    
    // Filter by selected type if not "All Types"
    if (selectedTypeFilter !== "All Types") {
      results = results.filter(item => item.curriculumType === selectedTypeFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.occupation.toLowerCase().includes(query)
      );
    }
    
    setFilteredResults(results);
  }, [selectedTypeFilter, searchQuery]);
  
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
function CurriculumCard({ curriculum }: { curriculum: ExtendedCurriculum }) {
  const categoryColorClass = getCategoryColor(curriculum.category);
  const typeColorClass = getTypeColor(curriculum.curriculumType);
  
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
                  {curriculum.curriculumType}
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
                  <span className="font-medium">{curriculum.developedBy}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-slate-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{curriculum.date}</span>
              </div>
              
              <Link href={curriculum.file} target="_blank">
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
