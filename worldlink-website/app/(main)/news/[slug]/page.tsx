"use client"

import { use } from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { newsArticles } from "@/lib/data"
import { NewsArticle } from "@/lib/types"

export default function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Find the article with the matching slug
    const foundArticle = newsArticles.find(a => a.slug === slug)
    setArticle(foundArticle || null)
    
    // Find related articles (same category, excluding current article)
    if (foundArticle) {
      const related = newsArticles
        .filter(a => a.category === foundArticle.category && a.id !== foundArticle.id)
        .slice(0, 3)
      setRelatedArticles(related)
    }
    
    setLoading(false)
  }, [slug])
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg">Loading article...</p>
        </div>
      </div>
    )
  }
  
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Article Not Found</h1>
          <p className="text-lg mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/news">
            <Button>Back to News</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <>
      {/* Article Header */}
      <div className="bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link href="/news">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to News
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <Badge>{article.category}</Badge>
            <div className="flex items-center text-slate-500">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{article.date}</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-slate-50 p-6 rounded-lg sticky top-6">
              <h3 className="text-xl font-bold mb-6">Related Articles</h3>
              
              {relatedArticles.length > 0 ? (
                <div className="space-y-6">
                  {relatedArticles.map((relatedArticle) => (
                    <div key={relatedArticle.id} className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={relatedArticle.image || "/placeholder.svg"}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1 line-clamp-2">
                          <Link 
                            href={`/news/${relatedArticle.slug}`}
                            className="hover:text-blue-700 transition-colors"
                          >
                            {relatedArticle.title}
                          </Link>
                        </h4>
                        <div className="text-sm text-slate-500">
                          {relatedArticle.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600">No related articles found.</p>
              )}
              
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-xl font-bold mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Link href="/news?filter=news">
                    <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                      News
                    </Badge>
                  </Link>
                  <Link href="/news?filter=events">
                    <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                      Events
                    </Badge>
                  </Link>
                  <Link href="/news?filter=notice">
                    <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                      Notices
                    </Badge>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* More Articles */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">More Articles</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {newsArticles
              .filter(a => a.id !== article.id)
              .slice(0, 3)
              .map((moreArticle) => (
                <div
                  key={moreArticle.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={moreArticle.image || "/placeholder.svg"}
                      alt={moreArticle.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge>{moreArticle.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-slate-500 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{moreArticle.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{moreArticle.title}</h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">{moreArticle.excerpt}</p>
                    <Link
                      href={`/news/${moreArticle.slug}`}
                      className="text-blue-700 font-medium hover:text-blue-600 inline-flex items-center"
                    >
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
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