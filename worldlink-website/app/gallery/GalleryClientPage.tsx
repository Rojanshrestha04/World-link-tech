"use client"

import { useState } from "react"
import Image from "next/image"
import { Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/page-header"
import { galleryImages } from "@/lib/data"

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
