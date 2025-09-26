'use client'

import { MapPin, Building, Clock } from "lucide-react"
import Link from 'next/link'
import '@/app/globals.css'

interface JobCardProps {
  id: string
  title: string
  location: string
  company: string
  type: string
  description: string
}

// Base Card components
export function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white border border-[#d2d2d2] rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

export function JobCard({ id, title, location, company, type, description }: JobCardProps) {
  return (
    <div className="hover:shadow-[0px_4px_32px_rgba(50,200,237,0.5)] bg-white border border-[#D2D2D2] rounded-[32px] shadow-sm p-6 sm:p-10 w-full max-w-md sm:max-w-3xl mx-auto flex flex-col gap-4 sm:gap-6">
      <div className="flex  gap-2">
        <span className="font-chillax font-normal text-base sm:text-xl text-[#0F1C3D]">({id})</span>
      </div>
      <h3 className="font-chillax font-medium text-2xl sm:text-5xl text-[#0F1C3D] leading-tight break-words">{title}</h3>
      <div className="flex flex-col gap-2 sm:gap-4 sm:mt-2">
        <div className="flex items-center gap-3 sm:gap-4 text-lg sm:text-2xl">
          <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-[#0F1C3D]" strokeWidth={2} />
          <span className="font-chillax font-normal text-base sm:text-2xl text-[#0F1C3D]">{location}</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-lg sm:text-2xl">
          <Building className="w-7 h-7 sm:w-8 sm:h-8 text-[#0F1C3D]" strokeWidth={2} />
          <span className="font-chillax font-normal text-base sm:text-2xl text-[#0F1C3D]">{company}</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-lg sm:text-2xl">
          <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-[#0F1C3D]" strokeWidth={2} />
          <span className="font-chillax font-normal text-base sm:text-2xl text-[#0F1C3D]">{type}</span>
        </div>
      </div>
      <div className="mt-2 sm:mt-4">
        <h4 className="font-chillax font-semibold text-base sm:text-2xl text-[#0F1C3D] mb-1 sm:mb-2">About this Role</h4>
        <p className="font-chillax font-normal text-sm sm:text-xl text-[#0F1C3D] break-words">{description}</p>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-content gap-4 sm:gap-6 mt-2 sm:mt-6">
       <Link href={`/careers/${id}`}>
        <button
          className="bg-[#327AED] rounded-full px-8 py-3 text-white font-chillax font-normal text-lg sm:text-2xl cursor-pointer"
        >
          Apply Now
        </button>
        </Link>
        <Link href={`/careers/${id}`}>
          <button className="bg-[#F1F1F1] rounded-full px-8 py-3 text-[#0F1C3D] font-chillax font-normal text-lg sm:text-2xl cursor-pointer hover:bg-[#E5E5E5] transition-colors">
            Read More
          </button>
        </Link>
      </div>
    </div>
  )
}
