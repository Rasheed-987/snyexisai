'use client'

import { JobListing } from '@/lib/careers-data';
import  Button  from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { CareerApplicationForm } from './CareerApplicationForm';

interface CareerDetailProps {
  job: JobListing;
}

export function CareerDetail({ job }: CareerDetailProps) {
  return (
    <div className="min-h-screen pb-24 rounded-b-[80px] relative z-50">
      {/* Navigation Bar Space */}
      <div className="h-20"></div>
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link href="/careers" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800">
          <Image src="/images/arrow_left.png" alt="Back" width={16} height={16} className=" mr-2" />
          All Positions
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Job Details */}
          <div className="space-y-8">
            
            {/* Job Title */}
            <div>
              <h1 className="text-4xl lg:text-[59px] font-medium text-[#0f1c3d] mb-5">
                {job.title}
              </h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{job.location}</p>
                <p>{job.company}</p>
              </div>
            </div>

            {/* Position Overview */}
            <section>
              <h2 className="text-lg-[29px] font-medium text-[#0f1c3d] mb-4">Position Overview</h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                {job.overview.split(job.title)[0]}
                <span style={{ fontWeight: 'bold' }}>{job.title}</span>
                {job.overview.split(job.title)[1]}
              </p>
            </section>

            {/* Key Responsibilities */}
            <section>
              <h2 className="text-lg-[29px] font-medium text-[#0f1c3d] mb-4">Key Responsibilities</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[14.88px] text-[#0f1c3d] mb-2">SEO Execution & Support:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {job.responsibilities.slice(0, 3).map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#0f1c3d] mt-1">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-[14.88px] text-[#0f1c3d] mb-2">Performance Tracking & Reporting:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {job.responsibilities.slice(3, 5).map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#0f1c3d] mt-1">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[14.88px] text-[#0f1c3d] mb-2">Collaboration & Learning:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {job.responsibilities.slice(5).map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#0f1c3d] mt-1">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Key Requirements */}
            <section>
              <h2 className="font-medium text-[29.88px] text-[#0f1c3d] mb-4">Key Requirements:</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[#0f1c3d] mt-1">•</span>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* Right Column - Application Form */}
          <div className="lg:pl-8">
            <div className="sticky top-8">
              <CareerApplicationForm 
                jobTitle={job.title}
                jobId={job.id}
              />
            </div>
          </div>

        </div>
      </div>

     </div>
  );
}