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
    <main className="bg-white  w-full text-[#0a0a0a]">
    {/* Hero Section */}
  <section className="w-full flex flex-col justify-center items-center text-center py-16 px-6">
    {/* Case Title */}
    <h1 className="text-[40px] sm:text-[60px] md:text-[90px] lg:text-[105px] font-medium leading-tight tracking-tight mb-6 break-words">
      {caseTitle}
    </h1>

    <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
      {subtitle}
    </p>
  </section>

      {/* Banner Image */}
      <div className="relative w-full mx-auto aspect-[16/9] rounded-2xl  mb-16">
        <Image
          src={images.banner}
          alt={caseTitle}
          fill
          className="object-fit"
          priority
        />
      </div>

      {/* Left Text and Requirements */}
      <section className=" mx-auto px-7 flex md:justify-between gap-10 mb-20">
        <div>
          <h3 className="text-2xl max-w-[400px]   font-medium mb-4">{leftTextBox}</h3>
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

<div className="w-full px-10 mb-16">
  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mx-auto">
    <Image
      src={images.gallery[0]}
      alt={caseTitle}
      fill
      className="object-cover"
      priority
    />
  </div>
</div>

     <section className="mx-auto px-10 grid md:grid-cols-2 gap-6 mb-20">
  {[images.gallery[1], images.gallery[2]].map((img, i) => (
    <div key={i} className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden">
      <Image
        src={img}
        alt={`Gallery ${i}`}
        fill
        className="object-cover"
      />
    </div>
  ))}
</section>

      {/* Center Text Div (LargeCard) */}
      <section className="max-w-3xl mx-auto px-5 text-center mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">{largeCard.title}</h2>
        <p className="text-gray-700">{largeCard.body}</p>
      </section>

      {/* Two Small Cards A */}
      <section className=" mx-auto px-5 grid md:grid-cols-2 gap-6 mb-20">
        {smallCardsA.map((card, i) => (
          <div key={i} className="p-6 bg-gray-50 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-700">{card.body}</p>
          </div>
        ))}
      </section>

      {/* Two Image Squares */}
      <section className=" mx-auto px-5 grid md:grid-cols-2 gap-6 mb-20">
        {[images.gallery[3], images.gallery[4]].map((img, i) => (
          <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src={img} alt={`Square ${i}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      {/* Two Small Cards B */}
      <section className=" mx-auto px-5 grid md:grid-cols-2 gap-6 mb-20">
        {smallCardsB.map((card, i) => (
          <div key={i} className="p-6 bg-gray-50 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-700">{card.body}</p>
          </div>
        ))}
      </section>

      {/* Two Square Images (Lower) */}
      <section className=" mx-auto px-5 grid md:grid-cols-2 gap-6 mb-20">
        {[images.gallery[5], images.gallery[6]].map((img, i) => (
          <div key={i} className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src={img} alt={`Lower square ${i}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      {/* Body Text Top */}
      {bodyTextTop && (
        <section className="max-w-3xl mx-auto px-5 text-center mb-16">
          <p className="text-gray-700 text-xl">{bodyTextTop}</p>
        </section>
      )}

      {/* 3 Horizontal Images */}
      <section className=" mx-auto px-20 grid bg-[#EDEDED] md:grid-cols-1 gap-6 mb-20">
        {[images.gallery[7], images.gallery[8], images.gallery[9]].map((img, i) => (
          <div key={i} className="relative aspect-[16/10] rounded-2xl overflow-hidden">
            <Image src={img} alt={`Horizontal ${i}`} fill className="object-fit" />
          </div>
        ))}
      </section>

      {/* Two Square Images (Lower Again) */}
      <section className=" mx-auto px-5 grid md:grid-cols-2 gap-6 mb-20">
        {[images.gallery[10], images.gallery[11]].map((img, i) => (
          <div key={i} className="relative aspect-[16/9] rounded-2xl overflow-hidden">
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
      <div className='w-full px-10 mb-16'>    
      {images.gallery[12] && (
        <div className="relative w-full  px-10 mx-auto aspect-[16/9] rounded-2xl overflow-hidden mb-20">
          <Image src={images.gallery[12]} alt="Final image" fill className="object-cover" />
        </div>
      )}
      </div>

      {/* Bottom Body Text */}
      {bodyTextBottom && (
        <section className="max-w-3xl mx-auto px-5 text-center pb-24">
          <p className="text-gray-700">{bodyTextBottom}</p>
        </section>
      )}
    </main>
  )
}
