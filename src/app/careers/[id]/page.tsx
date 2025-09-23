'use client'

import { notFound } from 'next/navigation';
import { getJobById, getAllJobIds } from '@/lib/careers-data';
import { CareerDetail } from '@/components/careers/CareerDetail';

interface PageProps {
  params: {
    id: string;
  };
}

// Temporarily commented out static generation
// export async function generateStaticParams() {
//   const jobIds = getAllJobIds();
//   return jobIds.map((id) => ({
//     id: id,
//   }));
// }

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const job = getJobById(params.id);
//   
//   if (!job) {
//     return {
//       title: 'Job Not Found',
//       description: 'The requested job listing could not be found.',
//     };
//   }

//   return {
//     title: `${job.title} - ${job.company} | Careers`,
//     description: job.overview || job.description,
//     openGraph: {
//       title: `${job.title} at ${job.company}`,
//       description: job.overview || job.description,
//       type: 'website',
//     },
//   };
// }

export default function CareerDetailPage({ params }: PageProps) {
  const job = getJobById(params.id);

  // If job not found, show 404
  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-24 rounded-b-[80px] border-2 relative z-50 bg-white border-red-600">
      <CareerDetail job={job} />
    </div>
  );
}