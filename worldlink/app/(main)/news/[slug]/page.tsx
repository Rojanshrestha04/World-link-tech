"use client"

import React, { useEffect, useState } from "react"
import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { News } from "@/lib/types"

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`/api/news/${resolvedParams.slug}`)
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to fetch news')
        }
        const data = await res.json()
        setNews(data)
      } catch (error) {
        console.error('Error fetching news:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch news')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [resolvedParams.slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg">Loading news article...</p>
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
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/news">
              <Button>Back to News</Button>
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">News Not Found</h1>
          <p className="text-lg mb-6">The news article you're looking for doesn't exist or has been removed.</p>
          <Link href="/news">
            <Button>Back to News</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative bg-blue-700 text-white">
        <div className="absolute inset-0 opacity-50">
          <Image 
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link href="/news">
                <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20 gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to News
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/90 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(news.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{news.reading_time} min read</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
            <p className="text-xl text-white/90">{news.excerpt}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div className="text-slate-600">
                Last updated: {new Date(news.updated_at).toLocaleDateString()}
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}