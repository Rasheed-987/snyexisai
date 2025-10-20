'use client'

import { MapPin, Building, Clock } from "lucide-react"
import Link from 'next/link'
import '@/app/globals.css'

interface JobCardProps {
  id: number
  count: number
  title: string
  location: string
  company: string
  type: string
  description: string
}

export function JobCard({ id, count, title, location, company, type, description }: JobCardProps) {
  return (
    <div className="bg-white border border-[#D2D2D2] rounded-2xl shadow-sm p-4 sm:p-6 mx-auto flex flex-col gap-2 sm:gap-4 max-w-sm sm:max-w-md">
      <div className="flex gap-2">
        <span className=" font-normal text-sm sm:text-base text-[#0F1C3D]">({count})</span>
      </div>
      <h3 className=" font-medium text-lg sm:text-2xl text-[#0F1C3D] leading-tight break-words">{title}</h3>
      <div className="flex flex-col gap-2 sm:gap-4 sm:mt-2">
        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
          <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-[#0F1C3D]" strokeWidth={2} />
          <span className=" font-normal text-sm sm:text-base text-[#0F1C3D]">{location}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
          <Building className="w-6 h-6 sm:w-7 sm:h-7 text-[#0F1C3D]" strokeWidth={2} />
          <span className=" font-normal text-sm sm:text-base text-[#0F1C3D]">{company}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
          <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-[#0F1C3D]" strokeWidth={2} />
          <span className=" font-normal text-sm sm:text-base text-[#0F1C3D]">{type}</span>
        </div>
      </div>
      <div className="mt-2 sm:mt-4">
        <h4 className=" font-semibold text-xs sm:text-sm text-[#0F1C3D] mb-1 sm:mb-2">About this Role</h4>
        <p className=" font-normal text-xs sm:text-sm text-[#0F1C3D] break-words">{description}</p>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-content gap-2 sm:gap-4 mt-2 sm:mt-4">
        <Link href={`/careers/${id}`}>
          <button className="bg-[#327AED] rounded-full px-4 py-2 text-white  font-normal text-sm sm:text-base cursor-pointer">
            Apply Now
          </button>
        </Link>
        <Link href={`/careers/${id}`}>
          <button className="bg-[#F1F1F1] rounded-full px-4 py-2 text-[#0F1C3D]  font-normal text-sm sm:text-base cursor-pointer hover:bg-[#E5E5E5] transition-colors">
            Read More
          </button>
        </Link>
      </div>
    </div>
  )
}
