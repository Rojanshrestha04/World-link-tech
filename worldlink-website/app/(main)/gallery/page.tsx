"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { Gallery } from "@/lib/types"

export default function GalleryPage() {
  const [allGalleryImages, setAllGalleryImages] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Fetch gallery data
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/gallery')
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to fetch gallery')
        }
        const data = await res.json()
        setAllGalleryImages(data)
      } catch (error) {
        console.error('Error fetching gallery:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch gallery')
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const categories = [...new Set(allGalleryImages.map((img) => img.category))]

  const filteredImages = selectedCategory
    ? allGalleryImages.filter((img) => img.category === selectedCategory)
    : allGalleryImages

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg">Loading gallery...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Gallery</h1>
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
      <PageHeader title="Gallery" description="Photos and videos of our facilities, training sessions, and events" />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Filter className="h-5 w-5 mr-2" /> Filter Gallery
              </h3>
              {selectedCategory && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center"
                >
                  Clear Filter <X className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(image.image_url)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={image.image_url || "/placeholder.svg"}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-medium">{image.title}</h3>
                  <Badge variant="secondary" className="mt-2 w-fit">
                    {image.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Image Lightbox */}
          {selectedImage && ( 
            <div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl max-h-[90vh] w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-6 w-6" />
                </Button>
                <div className="relative h-full">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Gallery image"
                    width={1200}
                    height={800}
                    className="object-contain max-h-[90vh] mx-auto"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
