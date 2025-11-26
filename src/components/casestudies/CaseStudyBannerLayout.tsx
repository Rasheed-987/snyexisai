'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo } from 'react'

interface CaseStudy {
  _id: string
  caseTitle: string
  images?: {
    banner: string
  }
}

interface CaseStudyBannerLayoutProps {
  /** Array of case studies to display */
  caseStudies: CaseStudy[]
  
  maxDisplay?: number
}



export default function CaseStudyBannerLayout({ 
  caseStudies, 
  maxDisplay = 3 
}: CaseStudyBannerLayoutProps) {
  // Memoize array slicing to prevent unnecessary operations on re-renders
  const displayedStudies = useMemo(() => 
    caseStudies.slice(0, maxDisplay), 
    [caseStudies, maxDisplay]
  )
  
  if (displayedStudies.length === 0) {
    return null
  }

  // Memoize featured and other studies to avoid recalculating on every render
  const { featuredStudy, otherStudies } = useMemo(() => ({
    featuredStudy: displayedStudies[0],
    otherStudies: displayedStudies.slice(1)
  }), [displayedStudies])

  return (
    <section className="w-full px-3 lg:px-12  2xl:px-24 py-8">
      {/* Large Featured Banner */}
      <div className="mb-8">
        <Link href={`/caseStudiesDetails/${featuredStudy._id}`}>
          <div className="relative w-full h-[270px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] rounded-2xl overflow-hidden group bg-gradient-to-br from-[#132225] to-[#0B1016]">
            
            <span className="absolute top-4 left-9 sm:left-25 bg-white text-black px-3 py-1 rounded-xl text-sm font-semibold z-10">
              {featuredStudy.caseTitle}
            </span>
            
            <div className="absolute inset-0">
              <Image
                src={featuredStudy.images?.banner || ''}
                alt={featuredStudy.caseTitle}
                fill
                className="object-contain lg:p-6 group-hover:blur-sm transition duration-300"
                priority
              />
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition duration-300">
              <button className="bg-white text-black px-6 py-3 rounded-xl shadow-md hover:bg-background active:scale-95 transform transition duration-200">
                Read More
              </button>
            </div>
          </div>
        </Link>
      </div>

      {/* Two Smaller Banners Side by Side */}
      {otherStudies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {otherStudies.map((study) => (
            <Link key={study._id} href={`/caseStudiesDetails/${study._id}`}>
              <div className="relative w-full h-[250px]  sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-2xl overflow-hidden group bg-gradient-to-br from-[#132225] to-[#0B1016]">
                
                <span className="absolute top-4 left-9 sm:left-25 bg-white text-black px-3 py-1 rounded-xl text-sm font-semibold z-10">
                  {study.caseTitle}
                </span>
                
                <div className="absolute inset-0 ">
                  <Image
                    src={study.images?.banner || ''}
                    alt={study.caseTitle}
                    fill
                    className="object-fit  group-hover:blur-sm transition duration-300"
                  />
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition duration-300">
                  <button className="bg-white text-black px-4 py-2 rounded-xl shadow-md hover:bg-background active:scale-95 transform transition duration-200 text-sm">
                    Read More
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

