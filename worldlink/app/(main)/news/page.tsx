"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/page-header"
import { News } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function NewsPage() {
  const [allNews, setAllNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // State for filters
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredNews, setFilteredNews] = useState<News[]>([])

  // Map categories to more user-friendly names (adjust as per your actual Supabase categories)
  const categoryMap: Record<string, string> = {
    "news": "News",
    "notices": "Notices",
    "events": "Events"
  }

  // Reverse mapping for filtering
  const reverseCategoryMap: Record<string, string> = {
    "News": "news",
    "Notices": "notices",
    "Events": "events"
  }

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/news')
        
        if (!res.ok) {
          const errorData = await res.json()
          if (res.status === 404) {
            setAllNews([])
            return
          }
          const errorMessage = errorData.error || `Failed to fetch news (Status: ${res.status})`
          console.error('News fetch error:', errorMessage)
          throw new Error(errorMessage)
        }
        
        const data = await res.json()
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format from server')
        }
        setAllNews(data)
      } catch (error) {
        console.error('Error fetching news:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch news')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Apply filters when any filter or news data changes
  useEffect(() => {
    if (!allNews.length && !loading) {
      setFilteredNews([])
      return
    }

    let result = [...allNews]
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        item => 
          item.title.toLowerCase().includes(query) || 
          item.excerpt.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query)
      )
    }
    
    // Apply category filter
    if (filter !== "all") {
      result = result.filter(item => item.category.toLowerCase() === filter.toLowerCase())
    }
    
    setFilteredNews(result)
  }, [searchQuery, filter, allNews, loading])

  // Find the latest news article for the featured section
  const latestNewsArticle = filteredNews.length > 0 ? filteredNews[0] : null

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg">Loading news...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading News</h1>
          <p className="text-lg mb-6">{error}</p>
          <div className="space-y-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
            <p className="text-sm text-slate-600">
              If the problem persists, please check your internet connection or try again later.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader title="News & Events" description="Stay updated with the latest news and announcements" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Filter className="mr-2" />
              <h3 className="text-lg font-semibold">Filter</h3>
            </div>
            
            {/* Category Filter */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 text-slate-700">Category</h4>
              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={() => setFilter("all")}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    filter === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  )}
                >
                  All
                </button>
                {Object.keys(categoryMap).map((categoryKey) => (
                  <button
                    key={categoryKey}
                    onClick={() => setFilter(categoryKey)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                      filter === categoryKey
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    )}
                  >
                    {categoryKey}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="search"
                placeholder="Search news..."
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-slate-600">
              Showing {filteredNews.length} {filteredNews.length === 1 ? 'result' : 'results'}
            </p>
          </div>

          {/* Featured News */}
          {filter === "all" && latestNewsArticle && ( // Only show featured if 'all' filter is active and there's a latest article
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Latest News</h2>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={latestNewsArticle.image || "/placeholder.svg"}
                    alt={latestNewsArticle.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge>{latestNewsArticle.category}</Badge>
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-slate-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(latestNewsArticle.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{latestNewsArticle.title}</h3>
                  <p className="text-slate-600 mb-6">{latestNewsArticle.excerpt}</p>
                  <Link href={`/news/${latestNewsArticle.slug}`}>
                    <Button className="flex items-center gap-2">
                      Read Full Article <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* All News */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              {filter === "all" ? "All News & Events" : 
              filter === "news" ? "News" : 
              filter === "events" ? "Events" : "Notices"}
            </h2>

            {filteredNews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600">No items found for the selected filter or search.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(filter === "all" && latestNewsArticle ? filteredNews.slice(1) : filteredNews).map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge>{article.category}</Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-slate-500 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(article.created_at).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                      <p className="text-slate-600 mb-4">{article.excerpt}</p>
                      <Link
                        href={`/news/${article.slug}`}
                        className="text-blue-700 font-medium hover:text-blue-600 inline-flex items-center"
                      >
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Stay updated with the latest news, events, and course offerings from World Link Technical Training
            Institute.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-md text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}