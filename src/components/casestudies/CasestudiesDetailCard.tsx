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
    <main className="bg-background  w-full ">
    {/* Hero Section */}
  <section className="w-full flex flex-col justify-center items-center text-center py-16 ">
    {/* Case Title */}
    <h1 className="text-[40px] text-foreground sm:text-[60px] md:text-[90px] lg:text-[105px] font-medium leading-tight tracking-tight mb-6 break-words">
      {caseTitle}
    </h1>

    <p className="text-foreground max-w-3xl mx-auto text-base sm:text-lg px-3 leading-relaxed">
      {subtitle}
    </p>
  </section>

      {/* Banner Image */}
      <div>

      
      <div className="relative w-full mx-auto   rounded-xl aspect-[16/9]   mb-16">
        <Image
          src={images.banner}
          alt={caseTitle}
          fill
          className="object-contain  rounded-xl"
          priority
        />
      </div>
</div>
      {/* Left Text and Requirements */}
      <section className=" mx-auto text-foreground px-3 lg:px-10 flex md:justify-between gap-10 mb-20">
        <div>
          <h3 className="text-2xl max-w-[400px]   font-medium mb-4">{leftTextBox}</h3>
        </div>
        <ul className="space-y-2 ">
          <h4 className="font-semibold">What we did</h4>
          {requirements?.map((req, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className=" mt-1">•</span>
              {req}
            </li>
          ))}
        </ul>
      </section>

<div className="w-full  mb-16">
  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mx-auto">
    <Image
      src={images.gallery[0]}
      alt={caseTitle}
      fill
      className="object-obtain px-3 lg:px-10 rounded-2xl"
      priority
    />
  </div>
</div>

     <section className="mx-auto lg:px-10 px-3  grid md:grid-cols-2 gap-6 mb-20">
  {[images.gallery[1], images.gallery[2]].map((img, i) => (
    <div key={i} className="relative aspect-[9/16] w-full  rounded-2xl overflow-hidden">
      <Image
        src={img}
        alt={`Gallery ${i}`}
        fill
        className="object-obtain"
      />
    </div>
  ))}
</section>

      {/* Center Text Div (LargeCard) */}
      <section className="max-w-3xl mx-auto px-3 text-center mb-20">
        <h2 className="text-2xl md:text-3xl text-foreground font-semibold mb-3">{largeCard.title}</h2>
        <p className="text-foreground">{largeCard.body}</p>
      </section>

      {/* Two Small Cards A */}
      <section className=" mx-auto px-3 grid md:grid-cols-2 gap-6 mb-20">
        {smallCardsA.map((card, i) => (
          <div key={i} className="p-6 bg-background rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-foreground">{card.body}</p>
          </div>
        ))}
      </section>

      {/* Two Image Squares */}
      <section className=" mx-auto lg:px-10 px-3 grid md:grid-cols-2 gap-6 mb-20">
        {[images.gallery[3], images.gallery[4]].map((img, i) => (
          <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src={img} alt={`Square ${i}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      {/* Two Small Cards B */}
      <section className=" mx-auto  px-3 grid md:grid-cols-2 gap-6 mb-20">
        {smallCardsB.map((card, i) => (
          <div key={i} className="p-6 bg-background rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-foreground">{card.body}</p>
          </div>
        ))}
      </section>

      {/* Two Square Images (Lower) */}
      <section className=" mx-auto px-3 lg:px-10 grid md:grid-cols-2 gap-6 mb-20">
        {[images.gallery[5], images.gallery[6]].map((img, i) => (
          <div key={i} className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src={img} alt={`Lower square ${i}`} fill className="object-cover" />
          </div>
        ))}
      </section>

      {/* Body Text Top */}
      {bodyTextTop && (
        <section className="max-w-3xl mx-auto px-3  text-center mb-16">
          <p className="text-foreground text-xl">{bodyTextTop}</p>
        </section>
      )}

      {/* 3 Horizontal Images */}
      <div className='px-3 lg:px-10' >
      <section className=" mx-auto  grid bg-muted p-20  rounded-[50px] md:grid-cols-1 gap-6 mb-20">
        {[images.gallery[7], images.gallery[8], images.gallery[9]].map((img, i) => (
          <div key={i} className="relative aspect-[16/3]   rounded-2xl overflow-hidden">
            <Image src={img} alt={`Horizontal ${i}`} fill className="object-fit" />
          </div>
        ))}
      </section>
      </div>
    

      {/* Two Square Images (Lower Again) */}
      <section className=" mx-auto  px-3 lg:px-10 grid md:grid-cols-2 gap-6 mb-20">
        {[images.gallery[10], images.gallery[11]].map((img, i) => (
          <div key={i} className="relative aspect-[4/4] rounded-2xl overflow-hidden">
            <Image src={img} alt={`Lower set ${i}`} fill className="object-fill" />
          </div>
        ))}
      </section>

      {/* Middle Body Text + Single Image */}
      {bodyTextMiddle && (
        <section className="max-w-3xl mx-auto px-3 text-center mb-10">
          <p className="text-foreground">{bodyTextMiddle}</p>
        </section>
      )}
      <div className='w-full px-3 lg:px-10 mb-16'>    
      {images.gallery[12] && (
        <div className="relative w-full  px-10 mx-auto aspect-[16/9] rounded-2xl overflow-hidden mb-20">
          <Image src={images.gallery[12]} alt="Final image" fill className="object-cover" />
        </div>
      )}
      </div>

      {/* Bottom Body Text */}
      {bodyTextBottom && (
        <section className="max-w-3xl mx-auto px-3 text-center pb-24">
          <p className="text-foreground">{bodyTextBottom}</p>
        </section>
      )}
    </main>
  )
}
