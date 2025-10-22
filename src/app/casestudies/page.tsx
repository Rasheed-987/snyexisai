'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CTA } from '@/components/ui/cta';


const CaseStudyPage = () => {

  const [caseStudy, setCaseStudy] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


   useEffect(() => {
        const fetchCaseStudy = async () => {
            try {
                const response = await fetch(`/api/case-studies`)
                if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
      
        const items = Array.isArray(data.caseStudies)
          ? data.caseStudies
          : Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : []

        setCaseStudy(items)
              } catch (err: any) {

                setError(err?.message ?? 'Failed to load')
            } finally {
                setLoading(false)
            }
        }

        fetchCaseStudy()
    }, [])


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

    <section className="w-full mt-8 bg-gray-100 space-y-8">
  {Array.isArray(caseStudy) && caseStudy.map((caseItem: any) => (
    <div
      key={caseItem._id}
      className="relative w-full h-[250px] sm:h-[400px] md:h-[550px] lg:h-[650px] rounded-2xl overflow-hidden"
    >
      <Link href={`/caseStudiesDetails/${caseItem._id}`} className="block w-full h-full">
        <Image
          src={caseItem.images?.banner}
          alt={caseItem.caseTitle || caseItem.title || 'Case Study Banner'}
          fill
          priority={false}
          className="object-obtain"
        />
      </Link>

    </div>
  ))}
</section>


      <section className='overflow-hidden'>
        {/* Two-column showcase (mobile + laptop) */}
        <div className="flex  flex-col gap-8 md:flex-row mt-8">
          <div className=" relative justify-center w-full h-[300px] md:w-[40%] md:h-[633px] lg:justify-start">
                 {/* Badge: App Design */}
        <span
          className="absolute left-4 top-[21px] lg:left-4 lg:top-4 inline-flex items-center px-3 py-1 rounded-full bg-white text-xs sm:text-sm font-medium text-[#0F1C3D] shadow-md "
          aria-hidden="true"
        >
          App Design
        </span>
            <Link href="/casestudiesDetail"> 
              <Image
                src="/images/img11_1.png"
                alt="App Design Mobile"
                fill
                className="rounded-xl shadow-xl object-obtain object-right"
              />
            </Link>
          </div>
          <div className="flex md:flex-1 relative justify-center w-full h-[300px] md:h-[633px]">
            <Link href="/casestudiesDetail">
              <Image
                src="/images/img11_2.png"
                alt="App Design Laptop"
                fill
                className="rounded-xl shadow-xl object-cover object-left"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row gap-8 items-center justify-center py-12">
        {/* Left Image */}
        <div className="md:flex-1 flex flex-col w-full h-[250px] md:h-[589px] items-center relative">
          <Link href="/casestudiesDetail">
            <Image
              src="/images/img12_1.png"
              alt="App Design Laptop"
              fill
              className="rounded-2xl shadow-lg object-cover object-top"
              priority
            />
          </Link>
        </div>
        {/* Right Image */}
        <div className="md:flex-1 flex flex-col w-full h-[250px] md:h-[589px] items-center relative">
          <Link href="/casestudiesDetail">
            <Image
              src="/images/img12_2.png"
              alt="App Design Watches"
              fill
              className="rounded-2xl shadow-lg object-cover object-top"
              priority
            />
          </Link>
        </div>
      </section>
      <CTA />
    </div>
            </div>
  );
};

export default CaseStudyPage;