'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CTA } from '@/components/ui/cta';
import { useCaseStudies } from '@/context/CaseStudyContext';
import CaseStudyCard from '@/components/casestudies/CasestudiesDetailCard';


const CaseStudyPage = () => {
  const { caseStudiesData:caseStudy, loading, error } = useCaseStudies();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center ">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CaseStudies...</p>
        </div>
      </div>
    )
  }

  if (error) return <div>Error: {error}</div>

  return (
    <div className='rounded-b-[80px]  min-h-screen  relative z-50 bg-white pb-24 lg:pb-40  mx-auto'>
   
      <section className="relative min-h-screen w-full h-[90vh] bg-[rgba(15,28,61,0.68)] flex flex-col items-center justify-center">
    
          <Image
            src="/images/background.png"
            alt="Case Study Background"
            fill
            priority
            className="absolute inset-0 z-0 object-cover"
          />
      

        <div className="absolute top-30 right-20 max-w-[500px] px-4 lg:px-0 text-right">
          <p className=" font-normal text-[16px] mb-4 sm:text-[18px] lg:text-[20px] 2xl:text-[24px] text-white">
            Every solution we create is powered by intelligence and intent. Our case studies highlight how Synexis.ai transforms challenges into opportunities — blending AI, creativity, and strategy to deliver outcomes that truly move businesses forward.
          </p>
          <button className="px-6 py-3 bg-white rounded-full  font-medium text-[16px] sm:text-[18px] text-[#0C0E12] shadow-lg hover:scale-105 hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </div>

        {/* Bottom centered heading */}
        <div className="absolute bottom-1 w-full flex justify-center">
          <h1 className=" font-medium text-[40px] sm:text-[60px] lg:text-[158px] 2xl:text-[180px ] leading-tight text-white">
            Case Studies
          </h1>
        </div>
      </section>
 

         <div className="w-full mx-auto px-4">
      <section className="w-full mx-auto px-4 sm:px-8 lg:px-4 py-12">
        <div className="mb-12">
          <span className="inline-flex items-center text-sm text-slate-500 font-regular mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-900 mr-2" />
            CASE STUDIES
          </span>

          <h2 className=" text-4xl sm:text-5xl text-slate-900 font-regular leading-tight mb-4">
            Featured Projects
          </h2>

          <p className="text-slate-600 max-w-md">
            As a UI/UX design company in Dubai, we don't just build websites — we craft immersive digital
            experiences that push boundaries and deliver business results.
          </p>
        </div>
      </section>

        {loading ? (
             <p className="text-white">Loading case studies...</p>
           ) :    <section className="w-full mt-8 bg-gray-100 space-y-8">
     {Array.isArray(caseStudy) && caseStudy.map((caseItem: any) => (
       <div
         key={caseItem._id}
         className="relative w-full h-[250px]  sm:h-[400px]  md:h-[550px] lg:h-[750px] rounded-2xl overflow-hidden group"
        style={{
             background: 'linear-gradient(169.02deg, #132225 0%, #0B1016 108.44%)',
           }}
       >
         <Link href={`/caseStudiesDetails/${caseItem._id}`} className="block w-full h-full">
           <Image
             src={caseItem.images?.banner}
             alt={caseItem.caseTitle || caseItem.title || 'Case Study Banner'}
             fill
             priority={false}
             className="object-contain px-2 group-hover:blur-sm transition duration-300"
           />
         </Link>
         <div
           className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
         >
           <Link
             href={`/caseStudiesDetails/${caseItem._id}`}
             className="bg-white text-black px-4 py-2 rounded-xl shadow-md hover:bg-gray-200"
           >
             Read More
           </Link>
         </div>
       </div>
     ))}
   </section>
   }
       

     
      <CTA />
    </div>
            </div>
  );
};

export default CaseStudyPage;