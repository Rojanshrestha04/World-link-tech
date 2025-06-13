"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/page-header"
import { newsArticles } from "@/lib/data"
import { NewsArticle } from "@/lib/types"

export default function NewsPage() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Map categories to more user-friendly names
  const categoryMap: Record<string, string> = {
    "Courses": "news",
    "Announcements": "notice",
    "Events": "events"
  }
  
  // Filter articles based on selected category
  const filteredArticles = filter === "all" 
    ? newsArticles 
    : newsArticles.filter(article => {
        // Use safer approach with optional chaining and default value
        const mappedCategory = categoryMap[article.category] || "other"
        return mappedCategory === filter
      })

  return (
    <>
      <PageHeader title="News & Events" description="Stay updated with the latest news and announcements" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Section - Redesigned */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-semibold">Filter Courses</h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={filter === "all" ? "default" : "outline"} 
                  onClick={() => setFilter("all")}
                  className="rounded-full text-sm h-9 px-4"
                  size="sm"
                >
                  All

                </Button>
                <Button 
                  variant={filter === "news" ? "default" : "outline"} 
                  onClick={() => setFilter("news")}
                  className="rounded-full text-sm h-9 px-4"
                  size="sm"
                >
                  News
                </Button>
                <Button 
                  variant={filter === "events" ? "default" : "outline"} 
                  onClick={() => setFilter("events")}
                  className="rounded-full text-sm h-9 px-4"
                  size="sm"
                >
                  Events
                </Button>
                <Button 
                  variant={filter === "notice" ? "default" : "outline"} 
                  onClick={() => setFilter("notice")}
                  className="rounded-full text-sm h-9 px-4"
                  size="sm"
                >
                  Notices
                </Button>
              </div>
              
              {/* Search Input */}
              <div className="flex-1">
                <Input 
                  type="text" 
                  placeholder="Search courses..." 
                  className="w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Category Dropdown */}
              <div>
                <select className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 w-full">
                  <option value="">Category</option>
                  <option value="news">News</option>
                  <option value="events">Events</option>
                  <option value="notice">Notices</option>
                </select>
              </div>
            </div>
          </div>

          {/* Featured News */}
          {filter === "all" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Latest News</h2>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={newsArticles[0].image || "/placeholder.svg"}
                    alt={newsArticles[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge>{newsArticles[0].category}</Badge>
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-slate-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{newsArticles[0].date}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{newsArticles[0].title}</h3>
                  <p className="text-slate-600 mb-6">{newsArticles[0].excerpt}</p>
                  <Link href={`/news/${newsArticles[0].slug}`}>
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

            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600">No items found for the selected filter.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(filter === "all" ? filteredArticles.slice(1) : filteredArticles).map((article) => (
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
                        <span>{article.date}</span>
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