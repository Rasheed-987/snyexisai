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
    <main className=" rounded-b-[80px] min-h-screen relative pt-10 text-foreground z-50 bg-background pb-24 lg:pb-40">
      {/* Hero Section */}
      <section className="mx-auto py-10">
        <h1 className="text-2xl lg:text-4xl leading-[57.36px] mx-auto py-10 tracking-[-2.35px] text-center  font-medium mb-4 w-[70vw]">
          {title}
        </h1>
        <div className="relative w-full px-3">
          <Image
            src={images.banner}
            alt="Banner"
            width={1280}
            height={576}
            className="shadow-lg w-full  min-h-[250px] rounded-[20px] object-cover"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <h3 className="text-lg lg:text-xl font-regular px-3 text-center mb-8">{tagline}</h3>
        <h2 className="text-xl lg:text-2xl 2xl:text-3xl px-3 md:font-semibold text-center mb-8">{addTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-3 lg:px-10">
          {cards.map((card, index) => (
            <div key={index} className="py-6 rounded-lg">
              <h3 className="text-xl md:font-bold font-medium mb-4">{card.title}</h3>
              <p className="text-foreground text-[15px] leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Side-by-Side Images */}
      <section className="w-full  mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-16 px-3 lg:px-10">
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
      <section className="relative w-full mx-auto mb-16 lg:px-10 px-3 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {smallCards.map((card, index) => (
          <div key={index} className="flex-1">
            <h2 className=" font-normal text-2xl  lg:text-4xl leading-tight capitalize mb-6">
              {card.title}
            </h2>
            <div className="space-y-6">
              <p className=" font-normal text-sm sm:text-base leading-relaxed">
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* AI Agents Section */}
      <section className="w-full bg-[#F4F0ED] py-12 flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto text-center px-4">
          <h2 className="text-lg sm:text-lg md:text-2xl font-medium mb-8  ">
            {largeCard.title}
          </h2>
          <p className="text-base sm:text-base md:text-lg leading-relaxed mb-6  ">
            {largeCard.body}
          </p>
        </div>
      </section>
      <CTA className="mt-12" />
    </main>
  )
}
