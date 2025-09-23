
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
    <div className="relative w-[584px] h-[407px]">
      {/* Rectangle 3 - Card Background */}
      <div className="absolute w-[584px] h-[407px] bg-white border border-[#D2D2D2] rounded-[25.75px]">
        
        {/* Group 2083 - CardContent */}
        <div className="absolute w-[512px] h-[362.59px] left-[36px] top-[22px]">
          
          {/* (01) - Job ID */}
          <div className="absolute w-[28px] h-[27px] left-0 top-0">
            <span 
              className="absolute font-chillax font-normal text-[16.1087px] leading-[26px] text-[#0F1C3D]"
              style={{ left: 0, top: 0 }}
            >
              ({id})
            </span>
          </div>

          {/* Group 157 - Job Title and Details */}
          <div className="absolute w-[426px] h-[171.17px] left-0 top-[31.76px]">
            
            {/* Software Engineer - Job Title */}
            <div className="absolute w-[305px] h-[47px] left-0 top-0">
              <h3 
                className="absolute font-chillax font-medium text-[33.67px] leading-[100%] text-[#0F1C3D]"
                style={{ left: 0, top: 0, letterSpacing: '0%' }}
              >
                {title}
              </h3>
            </div>

            {/* Group 155 - Location, Company, Type */}
            <div className="absolute w-[426px] h-[120.24px] left-0 top-[50.93px]">
              
              {/* Group 150 - Location */}
              <div className="absolute w-[426px] h-[30.31px] left-0 top-0">
                <div className="absolute w-[30.3px] h-[30.3px] left-0 top-0">
                  <MapPin className="absolute w-[30.3px] h-[30.3px] left-0 top-0 text-[#0F1C3D]" strokeWidth={1.89401} />
                </div>
                <span 
                  className="absolute w-[390px] h-[29px] font-chillax font-normal text-[17.5575px] leading-[28px] text-[#0F1C3D]"
                  style={{ left: 36, top: 2 }}
                >
                  {location}
                </span>
              </div>

              {/* Group 152 - Company */}
              <div className="absolute w-[169.12px] h-[30.3px] left-0 top-[44.96px]">
                <div className="absolute w-[30.3px] h-[30.3px] left-0 top-0">
                  <Building className="absolute w-[30.3px] h-[30.3px] left-0 top-0 text-[#0F1C3D]" strokeWidth={1.89401} />
                </div>
                <span 
                  className="absolute w-[132.95px] h-[29px] font-chillax font-normal text-[17.5575px] leading-[28px] text-[#0F1C3D]"
                  style={{ left: 36, top: 1 }}
                >
                  {company}
                </span>
              </div>

              {/* Group 154 - Employment Type */}
              <div className="absolute w-[169.12px] h-[30.3px] left-0 top-[89.93px]">
                <div className="absolute w-[30.3px] h-[30.3px] left-0 top-0">
                  <Clock className="absolute w-[30.3px] h-[30.3px] left-0 top-0 text-[#0F1C3D]" strokeWidth={1.89401} />
                </div>
                <span 
                  className="absolute w-[132.95px] h-[29px] font-chillax font-normal text-[17.5575px] leading-[28px] text-[#0F1C3D]"
                  style={{ left: 36, top: 1 }}
                >
                  {type}
                </span>
              </div>
            </div>
          </div>

          {/* Group 156 - About this Role Section */}
          <div className="absolute w-[512px] h-[90.43px] left-0 top-[218.57px]">
            
            {/* About this Role - Title */}
            <div className="absolute w-[125px] h-[27px] left-0 top-0">
              <h4 
                className="absolute font-chillax font-medium text-[16.5995px] leading-[27px] text-[#0F1C3D]"
                style={{ left: 0, top: 0 }}
              >
                About this Role
              </h4>
            </div>

            {/* Description Text */}
            <div className="absolute w-[512px] h-[61px] left-0 top-[29.43px]">
              <p 
                className="absolute font-chillax font-normal text-[12.4578px] leading-[20px] text-[#0F1C3D]"
                style={{ left: 0, top: 0 }}
              >
                {description}
              </p>
            </div>
          </div>

          {/* Group 159 - Buttons */}
          <div className="absolute w-[239.11px] h-[35.11px] left-0 top-[327.48px]">
            
            {/* Group 3 - Apply Now Button */}
            <div className="absolute w-[113.01px] h-[35.11px] left-0 top-0">
              <div 
                className="absolute w-[113.01px] h-[35.11px] bg-[#327AED] rounded-[21.0541px] cursor-pointer"
                style={{ left: 0, top: 0 }}
                onClick={() => {}}
              >
                <span 
                  className="absolute w-[74px] h-[19px] font-chillax font-normal text-[13.9025px] leading-[19px] text-center text-white"
                  style={{ left: 19.59, top: 8.25 }}
                >
                  Apply Now
                </span>
              </div>
            </div>

            {/* Group 158 - Read More Button */}
            <div className="absolute w-[113.01px] h-[35.11px] left-[126.1px] top-0">
              <Link href={`/careers/${id}`}>
                <div 
                  className="absolute w-[113.01px] h-[35.11px] bg-[#F1F1F1] rounded-[21.0541px] cursor-pointer hover:bg-[#E5E5E5] transition-colors"
                  style={{ left: 0, top: 0 }}
                >
                  <span 
                    className="absolute w-[73px] h-[19px] font-chillax font-normal text-[13.9025px] leading-[19px] text-center text-[#0F1C3D]"
                    style={{ left: 20.67, top: 8.25 }}
                  >
                    Read More
                  </span>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
    
  )
}
