'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

type InnerCardProps = {
  banner: string
  title: string
  description: string
  requirements: string[]
  project?: any
}

const InnerCard = ({ banner, title, description, requirements, project }: InnerCardProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-10  px-3 lg:px-12 2xl:px-24  items-center py-10">
      {/* Left Side - Image */}
      <div className="flex lg:justify-start justify-center">
        <div className="relative w-[90%] max-w-[600px] 2xl:max-w-[800px] aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
          <Image src={banner} alt={title} fill className="object-obtain rounded-2xl" />
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="space-y-4 px-3">
        <h2 className="text-xl md:text-2xl 2xl:text-5xl text-foreground font-semibold my-7 2xl:my-10 leading-snug">{title}</h2>
        {/* thin horizontal line */}
        <div className="h-px bg-black my-10 2xl:my-14" />
        <p className="text-foreground text-base 2xl:text-2xl leading-relaxed">{description}</p>

        <div className="my-7 2xl:my-10">
          <Link href={`/projectouter/${project._id}`} className="text-primary text-base 2xl:text-xl underline">
            Read More-&gt;
          </Link>
        </div>
        {/* Bullets */}
        <ul className="space-y-2 2xl:space-y-4 pt-3">
          {requirements?.map((req, i) => (
            <li key={i} className="flex items-start gap-2 text-foreground text-base 2xl:text-xl">
              <span className="w-2 h-2 2xl:w-3 2xl:h-3 mt-2 bg-primary rounded-full flex-shrink-0"></span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default InnerCard
