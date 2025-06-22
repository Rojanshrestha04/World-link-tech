"use client"

import { useState } from "react"
import Image from "next/image"
import { Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { galleryImages } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function GalleryClientPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const categories = [...new Set(galleryImages.map((img) => img.category))]

  const filteredImages = selectedCategory
    ? galleryImages.filter((img) => img.category === selectedCategory)
    : galleryImages

  return (
    <>
      <PageHeader title="Gallery" description="Photos and videos of our facilities, training sessions, and events" />

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
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === null
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  )}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-slate-600">
              Showing {filteredImages.length} {filteredImages.length === 1 ? 'result' : 'results'}
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(image.image)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={image.image || "/placeholder.svg"}
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
