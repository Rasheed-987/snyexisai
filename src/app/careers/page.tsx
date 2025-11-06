
'use client'

import { JobCard } from '@/components/careers/careerCard'
import { useCareerContext } from '@/context/CareerContext';
 
export default function CareersPage() {
  const { careersData:jobListings, loading, error } = useCareerContext();

  if (loading) {
    return (
      <div className="text-center w-full h-screen flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-foreground">Loading job postings...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center ">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          Retry
        </button>
      </div>
    );
  }

  if (jobListings.length === 0) {
    return (
      <div className="min-h-screen pb-24 rounded-b-[80px] pt-10 relative z-50 bg-background">
        <div className="max-w-[100vw] mx-auto">
          {/* Header */}
          <div className="text-center mb-12 w-full max-w-xl mx-auto px-4 py-8 md:py-12 lg:py-16">
            <h1 className="heading-hero font-normal text-4xl lg:text-6xl leading-[84.48px] tracking-[-2px] text-center text-foreground">
              Let's get to work
            </h1>
          </div>

          {/* No Open Vacancies Card */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="border border-border rounded-2xl bg-white p-8 md:p-12 text-center shadow-lg">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground mb-6">
                No Open Vacancies
              </h2>
              <p className="text-base md:text-lg text-foreground mb-2">
                We're not hiring right now, but we're always happy to hear from talented people.
              </p>
              <p className="text-base md:text-lg text-foreground mb-2">
                Feel free to send your resume to{' '}
                <a 
                  href="mailto:careers@aisynexis.com" 
                  className="text-primary font-semibold hover:underline"
                >
                  careers@aisynexis.com
                </a>
                .
              </p>
              <p className="text-base md:text-lg text-foreground">
                We'll be in touch if something opens up!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return ( 
    <div className="min-h-screen pb-24 rounded-b-[80px] relative z-50 mt-5 bg-background">   
      <div className="max-w-[100vw] mx-auto ">  
        {/* Header */}
        <div className="text-center mb-12 w-full  mx-auto px-4 py-8 md:py-12 lg:py-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground mb-6 leading-tight">
            Join the Synexis AI Team
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            At Synexis AI, we're building the future of intelligence-powered digital experiences — and we're 
            always looking for talented, curious, mission-driven people to join us. If you're passionate about 
            AI, full-stack development, UX design, or product engineering — we'd love to meet you.
          </p>
          
      
        </div>

        {/* Job Listings Container */}
        <div className="w-full  mx-auto opacity-100 px-3 rotate-0 relative">
          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4  place-items-center">
            {jobListings.map((job,index:number) => (
              <JobCard 
                key={String(job.id || job._id || job.careerId)}
                id={job.id || job._id || job.careerId}
                count={index + 1}
                title={job.jobTitle}
                location={job.location}
                company={job.company}
                type={job.jobType}
                description={job.description}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}