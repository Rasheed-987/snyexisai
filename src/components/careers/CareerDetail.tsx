'use client'

import  Button  from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { CareerApplicationForm } from './CareerApplicationForm';
import { JobCardProps } from '@/types/admin';
import  {highlightJobTitle}  from '@/utils/utils';

type Responsibility = { title: string; body: string }

interface CareerDetailProps {
  job: JobCardProps & {
    responsibilities?: Responsibility[] | string[]
    requirements?: string[]
  }
}

export function CareerDetail({ job }: CareerDetailProps) {
  return (
    <div className="min-h-screen pb-24 rounded-b-[80px] relative z-50">
      {/* Navigation Bar Space */}
      <div className="h-20"></div>
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link href="/careers" className="inline-flex items-center text-sm text-foreground hover:text-foreground">
          <Image src="/images/arrow_left.png" alt="Back" width={16} height={16} className=" mr-2" />
          All Positions
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Job Details */}
          <div className="space-y-8">
            
            {/* Job Title */}
            <div>
              <h1 className="text-4xl lg:text-[30px] font-medium text-foreground mb-5">
                {job.jobTitle}
              </h1>
              <div className="text-sm text-foreground space-y-1">
                <p>{job.location}</p>
      
              </div>
            </div>

            {/* Position Overview */}
            <section>
              <h2 className="text-lg-[29px] font-medium text-foreground mb-4">Position Overview</h2>
              <p className="text-foreground leading-relaxed text-sm">
                 {highlightJobTitle(job, job.jobTitle)}
              </p>
            </section>

            {/* Key Responsibilities */}
            <section>
              <h2 className="font-medium text-[29.88px] text-foreground mb-4">Key Responsibilities:</h2>
              {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 ? (
                <div className="space-y-6">
                  {job.responsibilities.map((r: any, idx: number) => {
                    // If responsibility is a plain string, render as simple bullet
                    if (typeof r === 'string') {
                      return (
                        <div key={idx} className="text-sm text-foreground">
                          <div className="flex items-start gap-2">
                            <span className="font-semibold mr-2">{idx + 1}.</span>
                            <div>{r}</div>
                          </div>
                        </div>
                      )
                    }

                    // Object shape: { title, body }
                    const title = r.title || `Responsibility ${idx + 1}`
                    const body = r.body || ''
                    // Split body into bullet lines by newline; fallback to sentences if no newlines
// Split body into bullet lines by period; fallback to newlines if no periods
const bullets = (
  body.includes('.') 
    ? body.split('.')
    : body.split(/\n+/)
)
.map((s: string) => s.trim())
.filter(Boolean);

                    return (
                      <div key={idx}>
                        <h3 className="text-lg font-semibold text-foreground">{idx + 1}. {title}</h3>
                        {bullets.length > 0 && (
                          <ul className="mt-2 space-y-2 text-sm text-foreground list-disc pl-6">
                            {bullets.map((b: string, bi: number) => (
                              <li key={bi}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-foreground">No responsibilities listed.</p>
              )}
            </section>

            {/* Key Requirements */}
            <section>
              <h2 className="font-medium text-[29.88px] text-foreground mb-4">Key Requirements:</h2>
              {Array.isArray(job.requirements) && job.requirements.length > 0 ? (
                <ul className="space-y-2 text-sm text-foreground">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-foreground mt-1">•</span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-foreground">No requirements listed.</p>
              )}
            </section>

          </div>

          {/* Right Column - Application Form */}
          <div className="lg:pl-8">
            <div className="sticky top-8">
              <CareerApplicationForm Id={job.id} jobTitle={job.jobTitle} />
            </div>
          </div>

        </div>
      </div>

     </div>
  );
}