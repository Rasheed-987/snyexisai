'use client'

import Image from 'next/image'

interface ServiceDetailProps {
  title: string
  image: string
  description: string
  servicesOffered?: Array<{ title: string; body: string }>
  whyItMatters?: Array<{ title: string; body: string }>
}

export default function ServicesDetailCard({
  title,
  image,
  description,
  servicesOffered,
  whyItMatters,
}: ServiceDetailProps) {
  return (
    <main className="bg-background w-full">
      {/* Hero Section */}
      <section className="w-full flex flex-col justify-center items-center text-center py-16">
        <h1 className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-medium leading-tight tracking-tight mb-6 break-words">
          {title}
        </h1>
      </section>

      {/* Banner Image */}
      <div className="flex justify-center mb-16">
        <div className="relative w-full max-w-3xl rounded-xl aspect-[16/9]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Description */}
      <section className="mx-auto text-foreground px-3 lg:px-12 2xl:px-24 mb-20">
        <p className="text-base 2xl:text-xl leading-relaxed text-muted-foreground max-w-4xl">
          {description}
        </p>
      </section>

      {/* Services Offered and Why It Matters - Two Column Layout */}
      <section className="mx-auto px-3 lg:px-12 2xl:px-24 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Column - Services Offered */}
          {servicesOffered && servicesOffered.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl 2xl:text-4xl text-foreground font-semibold mb-8">
                Services Offered
              </h2>
              <div className="space-y-6">
                {servicesOffered.map((service, idx) => (
                  <div 
                    key={idx} 
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl 2xl:text-2xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm 2xl:text-base text-muted-foreground leading-relaxed">
                      {service.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right Column - Why It Matters */}
          {whyItMatters && whyItMatters.length > 0 && (
            <div className="lg:pl-8">
              <h2 className="text-2xl md:text-3xl 2xl:text-4xl text-foreground font-semibold mb-8">
                Why it matters
              </h2>
              <div className="space-y-6">
                {whyItMatters.map((matter, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 2xl:w-10 2xl:h-10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 2xl:w-8 2xl:h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg 2xl:text-xl font-semibold text-foreground mb-2">
                        {matter.title}
                      </h3>
                      <p className="text-sm 2xl:text-base text-muted-foreground leading-relaxed">
                        {matter.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

    </main>
  )
}
