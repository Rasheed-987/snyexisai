
'use client'

import { JobCard } from '@/components/ui/Card'
import { useEffect, useState } from 'react'
 
export default function CareersPage() {

  const [jobListings, setJobListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const response = await fetch('/api/careers?status=published');
        if (!response.ok) {
          throw new Error('Failed to fetch job listings');
        }
        const data = await response.json();
        console.log('API response:', data);
        // Support different shapes: prefer data.careers or data
        const listings = Array.isArray(data.careers) ? data.careers : Array.isArray(data) ? data : [];
        setJobListings(listings);
      } catch (err: any) {
        console.error('Error fetching careers:', err);
        setError(err?.message || 'Failed to fetch job listings');
      } finally {
        setLoading(false);
      }
    };
    fetchJobListings();
  }, []);

  if (loading) {
    return (
      <div className="text-center w-full h-screen flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading job postings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center ">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 rounded-b-[80px] relative z-50 bg-[#f9f9f9]">   
      <div className="max-w-[100vw] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 w-full max-w-xl mx-auto px-4 py-8 md:py-12 lg:py-16">
            <h1 className="heading-hero  font-normal text-[70.05px] leading-[84.48px] tracking-[-2px] text-center text-[#0f1c3d]">
                Let's get to work
            </h1>
        </div>

        {/* Job Listings Container */}
        <div className="w-full  mx-auto opacity-100  rotate-0 relative">
          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-2 place-items-center">
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