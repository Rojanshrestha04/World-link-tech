export interface Course {
  id: string
  title: string
  slug: string
  description: string
  category: string
  duration: string
  startDate: string
  price: number
  image: string
  featured: boolean
  prerequisites?: string[]
  curriculum?: {
    title: string
    topics: string[]
  }[]
}

export interface Testimonial {
  id: string
  name: string
  position: string
  quote: string
  image: string
}

export interface GalleryImage {
  id: string
  title: string
  category: string
  image: string
}

export interface NewsArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  image: string
  category: string
}

export interface Resource {
  id: string
  title: string
  description: string
  file: string
  category: string
  date: string
}