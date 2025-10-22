'use client'

import Image from 'next/image'

interface SmallCard {
  title: string
  body: string
}

interface LargeCard {
  title: string
  body: string
}

interface CaseStudy {
  caseTitle: string
  subtitle: string
  leftTextBox: string
  requirements: string[]
  largeCard: LargeCard
  smallCardsA: SmallCard[]
  smallCardsB: SmallCard[]
  bodyTextTop: string
  bodyTextMiddle: string
  bodyTextBottom: string
  images: {
    banner: string
    gallery: string[]
  }
}

export default function CaseStudyDetailPage({
     caseTitle,
    subtitle,
    leftTextBox,
    requirements,
    largeCard,
    smallCardsA,
    smallCardsB,
    bodyTextTop,
    bodyTextMiddle,
    bodyTextBottom,
    images
}: CaseStudy) {
 

  return (
    <main className="bg-white text-[#0a0a0a]">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-5 pt-20 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{caseTitle}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </section>

      {/* Banner Image */}
      <div className="relative w-full max-w-6xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden mb-16">
        <Image
          src={images.banner}
          alt={caseTitle}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Left Text and Requirements */}
      <section className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 mb-20">
        <div>
          <h3 className="text-lg font-semibold mb-4">{leftTextBox}</h3>
        </div>
        <ul className="space-y-2 text-gray-700">
          <h4 className="font-semibold">What we did</h4>
          {requirements?.map((req, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              {req}
            </li>
          ))}
        </ul>
      </section>

      {/* Large Image */}
      <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden mb-20">
        <Image
          src={images.gallery[1]}
          alt="Large showcase"
          fill
          className="object-cover"
        />
      </div>

      {/* Two Side-by-Side Images */}
      <section className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-6 mb-20">
        {[images.gallery[2], images.gallery[3]].map((img, i) => (
          <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      {/* Center Text Div (LargeCard) */}
      <section className="max-w-3xl mx-auto px-5 text-center mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">{largeCard.title}</h2>
        <p className="text-gray-700">{largeCard.body}</p>
      </section>

      {/* Two Small Cards A */}
      <section className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-6 mb-20">
        {smallCardsA.map((card, i) => (
          <div key={i} className="p-6 bg-gray-50 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-700">{card.body}</p>
          </div>
        ))}
      </section>

      {/* Two Image Squares */}
      <section className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-6 mb-20">
        {[images.gallery[4], images.gallery[5]].map((img, i) => (
          <div key={i} className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src={img} alt={`Square ${i}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      {/* Two Small Cards B */}
      <section className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-6 mb-20">
        {smallCardsB.map((card, i) => (
          <div key={i} className="p-6 bg-gray-50 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-700">{card.body}</p>
          </div>
        ))}
      </section>

      {/* Two Square Images (Lower) */}
      <section className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-6 mb-20">
        {[images.gallery[6], images.gallery[7]].map((img, i) => (
          <div key={i} className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src={img} alt={`Lower square ${i}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      {/* Body Text Top */}
      {bodyTextTop && (
        <section className="max-w-3xl mx-auto px-5 text-center mb-16">
          <p className="text-gray-700">{bodyTextTop}</p>
        </section>
      )}

      {/* 3 Horizontal Images */}
      <section className="max-w-6xl mx-auto px-5 grid bg-[#EDEDED] md:grid-cols-1 gap-6 mb-20">
        {[images.gallery[8], images.gallery[9], images.gallery[10]].map((img, i) => (
          <div key={i} className="relative aspect-[16/10] rounded-2xl overflow-hidden">
            <Image src={img} alt={`Horizontal ${i}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      {/* Two Square Images (Lower Again) */}
      <section className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-6 mb-20">
        {[images.gallery[11], images.gallery[12]].map((img, i) => (
          <div key={i} className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src={img} alt={`Lower set ${i}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      {/* Middle Body Text + Single Image */}
      {bodyTextMiddle && (
        <section className="max-w-3xl mx-auto px-5 text-center mb-10">
          <p className="text-gray-700">{bodyTextMiddle}</p>
        </section>
      )}
      {images.gallery[13] && (
        <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden mb-20">
          <Image src={images.gallery[13]} alt="Final image" fill className="object-cover" />
        </div>
      )}

      {/* Bottom Body Text */}
      {bodyTextBottom && (
        <section className="max-w-3xl mx-auto px-5 text-center pb-24">
          <p className="text-gray-700">{bodyTextBottom}</p>
        </section>
      )}
    </main>
  )
}
