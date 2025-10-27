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
    <div className="grid md:grid-cols-2 gap-10 px-4 items-center py-10">
      {/* Left Side - Image */}
      <div className="flex justify-center">
        <div className="relative w-[90%] max-w-[500px] aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
          <Image src={banner} alt={title} fill className="object-obtain rounded-2xl" />
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="space-y-4 px-0 md:px-4">
        <h2 className="text-2xl md:text-3xl text-[#0F1C34] font-semibold my-7 leading-snug">{title}</h2>
        {/* thin horizontal line */}
        <div className="h-px bg-black my-10" />
        <p className="text-gray-600 leading-relaxed">{description}</p>

        <div className="my-7">
          <Link href={`/projectouter/${project._id}`} className="text-blue-600 underline">
            Read More-&gt;
          </Link>
        </div>
        {/* Bullets */}
        <ul className="space-y-2 pt-3">
          {requirements?.map((req, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0"></span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default InnerCard
