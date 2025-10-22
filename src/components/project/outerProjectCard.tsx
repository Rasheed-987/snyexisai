'use client'

import Image from 'next/image'

import { OuterProjectCardProps } from '@/types/types'
import {CTA} from '@/components/ui/cta'




export default function OuterProjectCard({
  title,
  tagline,
  addTitle,
  cards,
  smallCards,
  largeCard,
  images,
}: OuterProjectCardProps) {
  return (
    <main className="px-5 rounded-b-[80px] min-h-screen relative z-50 bg-white pb-24 lg:pb-40">
      {/* Hero Section */}
      <section className="mx-auto py-10">
        <h1 className="md:text-[46.93px] text-[30px] leading-[57.36px] lg:px-10 tracking-[-2.35px] text-center font-chillax font-medium mb-4">
          {title}
        </h1>
        <div className="relative w-full mx-auto px-2">
          <Image
            src={images.banner}
            alt="Banner"
            width={1280}
            height={576}
            className="shadow-lg w-full min-h-[250px] rounded-[20px] object-cover"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <h3 className="text-2xl font-regular text-center mb-8">{tagline}</h3>
        <h2 className="text-3xl sm:text-[30px] md:font-semibold text-center mb-8">{addTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-1">
          {cards.map((card, index) => (
            <div key={index} className="py-6 rounded-lg">
              <h3 className="text-xl md:font-bold font-medium mb-4">{card.title}</h3>
              <p className="text-gray-700 text-[15px] leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Side-by-Side Images */}
      <section className="w-full max-w-[2000px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-16 px-4 sm:px-8">
        {images.gallery.map((img, index) => (
          <div key={index} className="flex-1 w-full">
            <Image
              src={img}
              alt={`Gallery ${index + 1}`}
              width={624}
              height={442}
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>
        ))}
      </section>

      {/* The Result Section */}
      <section className="relative w-full mx-auto mb-16 px-4 sm:px-8 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {smallCards.map((card, index) => (
          <div key={index} className="flex-1">
            <h2 className="text-[#0F1C3D] font-normal text-3xl sm:text-4xl lg:text-[45px] leading-tight capitalize mb-6">
              {card.title}
            </h2>
            <div className="space-y-6">
              <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* AI Agents Section */}
      <section className="w-full bg-[#F4F0ED] py-12 flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-8 text-[#142047] font-chillax">
            {largeCard.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 text-[#142047] font-chillax">
            {largeCard.body}
          </p>
        </div>
      </section>
      <CTA className="mt-12" />
    </main>
  )
}
