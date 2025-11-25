"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import CaseStudyDetailPage from '@/components/casestudies/CasestudiesDetailCard'
import { useQuery } from '@tanstack/react-query'

const CaseStudiesDetailPage = () => {
    const params = useParams() as { id?: string }

    const { data: caseStudy, isLoading: loading, error } = useQuery({
        queryKey: ['caseStudy', params?.id],
        queryFn: async () => {
            const response = await fetch(`/api/case-studies/${params?.id}`)
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const data = await response.json()
            const cs = data.caseStudy
            return cs ? { id: cs.id || cs._id, ...cs } : null
        },
        enabled: !!params?.id,
    })

 
if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center ">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CaseStudies...</p>
        </div>
      </div>
    )
  }



    if (error) return <div>Error: {(error as Error).message}</div>
    if (!caseStudy) return <div>No case study found.</div>

    return (
        <div className='rounded-b-[80px]  min-h-screen  relative z-50 bg-background pt-10 pb-24 lg:pb-40 ' >
            <CaseStudyDetailPage { ...caseStudy } />
            
            {/* CTA Section - Partner with us & Subscribe */}
            <section className="w-full py-20 mb-20 px-3 lg:px-12 2xl:px-24 bg-background">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Partner with us Card */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 2xl:p-14 shadow-sm hover:shadow-lg transition-shadow">
                        <div className="mb-6">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                                <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <h2 className="text-2xl md:text-3xl 2xl:text-5xl font-medium text-foreground mb-4">Partner with us</h2>
                        <p className="text-foreground text-base 2xl:text-xl mb-8 leading-relaxed">
                            We work in all things creative and strategy, and look forward to discussing your project.
                        </p>
                        <a 
                            href="/contact" 
                            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-medium text-base 2xl:text-lg hover:bg-blue-700 transition-colors"
                        >
                            Contact Us
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </a>
                    </div>

                    {/* Stay informed Card */}
                    <div className="bg-white rounded-3xl p-8 md:p-10 2xl:p-14 shadow-sm hover:shadow-lg transition-shadow">
                        <div className="mb-6 relative">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-500">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {/* Zzz symbols */}
                            <div className="absolute -top-2 left-2 text-[10px] text-primary font-bold">ZZZ</div>
                        </div>
                        <h2 className="text-2xl md:text-3xl 2xl:text-5xl font-medium text-foreground mb-4">Stay informed.</h2>
                        <p className="text-foreground text-base 2xl:text-xl mb-8 leading-relaxed">
                            Sign up to our newsletter for a global view on design and technology.
                        </p>
                        <a 
                            href="/contact" 
                            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-medium text-base 2xl:text-lg transition-colors"
                        >
                            Subscribe
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CaseStudiesDetailPage
