
'use client'

import Button from "@/components/ui/Button"
import { MapPin, Building, Clock } from "lucide-react"
import Link from 'next/link'

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
    <div className="bg-white border border-[#D2D2D2] rounded-2xl shadow-sm p-6 w-full max-w-md mx-auto flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="font-chillax font-normal text-base text-[#0F1C3D]">({id})</span>
      </div>
      <h3 className="font-chillax font-medium text-2xl sm:text-3xl text-[#0F1C3D] leading-tight break-words">{title}</h3>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#0F1C3D]" strokeWidth={1.5} />
          <span className="font-chillax font-normal text-base text-[#0F1C3D]">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building className="w-5 h-5 text-[#0F1C3D]" strokeWidth={1.5} />
          <span className="font-chillax font-normal text-base text-[#0F1C3D]">{company}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#0F1C3D]" strokeWidth={1.5} />
          <span className="font-chillax font-normal text-base text-[#0F1C3D]">{type}</span>
        </div>
      </div>
      <div>
        <h4 className="font-chillax font-medium text-lg text-[#0F1C3D] mb-1">About this Role</h4>
        <p className="font-chillax font-normal text-sm text-[#0F1C3D] break-words">{description}</p>
      </div>
      <div className="flex gap-4 mt-2">
        <button
          className="bg-[#327AED] rounded-full px-6 py-2 text-white font-chillax font-normal text-base cursor-pointer"
          onClick={() => {}}
        >
          Apply Now
        </button>
        <Link href={`/careers/${id}`}>
          <button className="bg-[#F1F1F1] rounded-full px-6 py-2 text-[#0F1C3D] font-chillax font-normal text-base cursor-pointer hover:bg-[#E5E5E5] transition-colors">
            Read More
          </button>
        </Link>
      </div>
    </div>
  )
}
