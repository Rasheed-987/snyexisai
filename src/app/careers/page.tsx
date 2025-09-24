
'use client'

import { JobCard } from '@/components/ui/Card'

export default function CareersPage() {
  return (
    <div className="min-h-screen pb-24 rounded-b-[80px]  relative z-50 bg-white ">
      <div className="max-w-[100vw] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 w-full max-w-xl mx-auto px-4 py-8 md:py-12 lg:py-16">
            <h1 className="heading-hero font-chillax font-normal text-[70.05px] leading-[84.48px] tracking-[-2px] text-center text-[#0f1c3d]">
                Let's get to work
            </h1>
        </div>

        {/* Job Listings Container */}
        <div className="w-full max-w-[1198px] min-h-[944px] mx-auto opacity-100  rotate-0 relative">
          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 place-items-center">
            {jobListings.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                location={job.location}
                company={job.company}
                type={job.type}
                description={job.description}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}