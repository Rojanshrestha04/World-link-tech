// Updated PageHeader component
interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export default function PageHeader({ title, description, className = "bg-blue-600" }: PageHeaderProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
        {description && <p className="text-white/90 text-lg max-w-2xl mx-auto">{description}</p>}
      </div>
    </section>
  )
}