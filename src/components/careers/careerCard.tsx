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
  const truncate = (text: string, max = 120) => {
    if (!text) return ''
    if (text.length <= max) return text
    const truncated = text.slice(0, max)
    const lastSpace = truncated.lastIndexOf(' ')
    return `${truncated.slice(0, lastSpace > 0 ? lastSpace : max).trim()}...`
  }

  return (
    <div className="
      bg-white border border-border rounded-2xl shadow-sm 
      p-5 sm:p-6 mx-auto flex flex-col justify-between
      w-full max-w-md h-full sm:min-h-[380px] md:min-h-[400px] 
      transition-all duration-300 hover:shadow-md
    ">
      {/* Header */}
      <div>
        <div className="flex gap-2 mb-1">
          <span className="font-normal text-sm sm:text-base text-foreground">({count})</span>
        </div>

        <h3 className="font-medium text-lg sm:text-2xl text-foreground leading-snug break-words line-clamp-2">
          {title}
        </h3>

        {/* Job Info */}
        <div className="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-4">
          <div className="flex items-center gap-2 text-sm sm:text-base text-foreground">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base text-foreground">
            <Building className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="truncate">{company}</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base text-foreground">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>{type}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-3 sm:mt-4">
          <h4 className="font-semibold text-xs sm:text-sm text-foreground mb-1 sm:mb-2">
            About this Role
          </h4>
          <p 
            title={description}
            className="font-normal text-xs sm:text-sm text-foreground break-words line-clamp-3"
          >
            {truncate(description, 140)}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4 mt-5">
        <Link href={`/careers/${id}`} className="flex-1">
          <button className="
            w-full bg-primary rounded-full px-4 py-2 text-white 
            font-medium text-sm sm:text-base cursor-pointer
            hover:bg-primary-dark transition-colors
          ">
            Apply Now
          </button>
        </Link>
        <Link href={`/careers/${id}`} className="flex-1">
          <button className="
            w-full bg-secondary rounded-full px-4 py-2 text-foreground 
            font-medium text-sm sm:text-base cursor-pointer
            hover:bg-background transition-colors
          ">
            Read More
          </button>
        </Link>
      </div>
    </div>
  )
}
