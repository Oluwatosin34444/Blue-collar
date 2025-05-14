import Container from "@/components/container"

interface MetricsSectionProps {
  title?: string
  subtitle?: string
  metrics?: {
    value: string
    label: string
    description?: string
  }[]
  background?: "white" | "gray" | "blue" | "dark"
}

export default function Metrics({
  title = "Our Impact in Numbers",
  subtitle = "BlueCollar connects thousands of artisans with customers every day",
  metrics = [
    {
      value: "99K+",
      label: "Customers",
      description: "Satisfied customers who found reliable artisans",
    },
    {
      value: "100k+",
      label: "Artisans",
      description: "Skilled professionals offering quality services",
    },
    {
      value: "100k+",
      label: "Services",
      description: "Completed jobs with high satisfaction ratings",
    },
    {
      value: "4.8",
      label: "Rating",
      description: "Average rating from our customers",
    },
  ],
  background = "blue",
}: MetricsSectionProps) {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    blue: "bg-blue-600 text-white",
    dark: "bg-gray-900 text-white",
  }

  const valueColor = background === "blue" || background === "dark" ? "text-white" : "text-blue-600"
  const labelColor = background === "blue" || background === "dark" ? "text-blue-100" : "text-gray-700"
  const descriptionColor = background === "blue" || background === "dark" ? "text-blue-200" : "text-gray-500"

  return (
    <section className={`py-16 md:py-24 ${bgClasses[background]}`}>
      <Container>
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-lg max-w-3xl mx-auto opacity-90">{subtitle}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center p-6 rounded-lg">
              <p className={`text-5xl font-bold mb-2 ${valueColor}`}>{metric.value}</p>
              <p className={`text-xl font-medium mb-2 ${labelColor}`}>{metric.label}</p>
              {metric.description && <p className={`text-sm ${descriptionColor}`}>{metric.description}</p>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
