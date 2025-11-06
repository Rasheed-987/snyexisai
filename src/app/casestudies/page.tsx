'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CTA } from '@/components/ui/cta';
import { useCaseStudies } from '@/context/CaseStudyContext';
import CaseStudyBannerLayout from '@/components/casestudies/CaseStudyBannerLayout';


const CaseStudyPage = () => {
  const { caseStudiesData:caseStudy, loading:caseStudiesLoading, error } = useCaseStudies();

  if (caseStudiesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center ">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading CaseStudies...</p>
        </div>
      </div>
    )
  }

  if (error) return <div>Error: {error}</div>

  return (
    <div className='rounded-b-[80px]  min-h-screen  relative z-50 bg-background pb-24 lg:pb-40  mx-auto'>

      <section className="relative min-h-screen w-full h-[90vh] bg-foreground flex flex-col items-center justify-center">

          <Image
            src="/images/background.png"
            alt="Case Study Background"
            fill
            priority
            className="absolute inset-0 z-0 object-cover"
          />
      

        <div className="absolute top-30 lg:right-20 max-w-[500px] px-4  ">
          <p className=" font-normal text-[16px] mb-4 sm:text-[18px] lg:text-[20px] 2xl:text-[24px] text-white">
            Every solution we create is powered by intelligence and intent. Our case studies highlight how Synexis.ai transforms challenges into opportunities — blending AI, creativity, and strategy to deliver outcomes that truly move businesses forward.
          </p>
          <button className="px-6 py-3 bg-white rounded-full  font-medium text-[16px] sm:text-[18px] text-foreground shadow-lg hover:scale-105 hover:border transition-colors">
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
 

         <div className="w-full mx-auto">
      <section className="w-full mx-auto  py-12">
        <div className="mb-12 px-3 lg:px-10">
  <span className="inline-flex items-center text-sm text-foreground font-regular mb-4">
    CASE STUDIES
  </span>

  <h2 className="text-xl lg:text-4xl text-foreground font-regular leading-tight mb-4">
    Featured Projects
  </h2>

  <p className="text-foreground max-w-lg mb-6">
    Explore how we’ve helped clients across industries launch AI-powered digital experiences. 
    From SaaS startups to enterprise platforms, from chatbots to computer-vision systems — 
    each case study demonstrates our end-to-end capabilities and the measurable business 
    impact we achieved.
  </p>

 

</div>
 <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-4">
            What you’ll see:
          </h3>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold leading-relaxed">•</span>
              <p className="text-foreground leading-relaxed">
                Project overview: client challenge, solution, our approach
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-primary font-bold leading-relaxed">•</span>
              <p className="text-foreground leading-relaxed">
                AI component breakdown: model type, data used, deployment
                strategy
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-primary font-bold leading-relaxed">•</span>
              <p className="text-foreground leading-relaxed">
                UX & engineering highlights: web/mobile design, integrations,
                performance results
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-primary font-bold leading-relaxed">•</span>
              <p className="text-foreground leading-relaxed">
                Results & metrics: conversion uplift, cost savings, user
                engagement, ROI
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-primary font-bold leading-relaxed">•</span>
              <p className="text-foreground leading-relaxed">
                Tech stack: front-end, backend, AI/ML frameworks, infrastructure
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <h3 className="text-base font-semibold text-foreground mb-4">
            Featured industries:
          </h3>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="text-primary font-bold leading-relaxed">•</span>
              <p className="text-foreground leading-relaxed">
                Fintech: loan-approval automation with NLP and rule-based
                decision-making
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-primary font-bold leading-relaxed">•</span>
              <p className="text-foreground leading-relaxed">
                Healthcare: image-based screening tools and predictive analytics
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-primary font-bold leading-relaxed">•</span>
              <p className="text-foreground leading-relaxed">
                Logistics: route optimisation and predictive maintenance using
                AI
              </p>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-primary font-bold leading-relaxed">•</span>
              <p className="text-foreground leading-relaxed">
                eCommerce: personalization engine driving repeat-purchase and
                retention
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

      </section>
      {caseStudiesLoading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-foreground">Loading case studies...</p>
        </div>
      ) : Array.isArray(caseStudy) && caseStudy.length > 0 ? (
        <>
          <CaseStudyBannerLayout caseStudies={caseStudy} maxDisplay={3} />
          {caseStudy.length > 3 && (
            <div className="flex justify-center mt-8">
              <Link 
                href="/casestudies"
                className="bg-white text-foreground px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-all hover:bg-background hover:text-white hover:scale-105"
              >
                View All Case Studies
                <img src="/images/home/button_arrow.png" alt="Arrow Right" className="w-4 h-4" />
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center py-20">
          <p className="text-foreground">No case studies available</p>
        </div>
      )} 

     
      <CTA />
    </div>
            </div>
  );
};

export default CaseStudyPage;