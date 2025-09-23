'use client'

import { notFound } from 'next/navigation';
import { getJobById, getAllJobIds } from '@/lib/careers-data';
import { CareerDetail } from '@/components/careers/CareerDetail';
import { use } from 'react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CareerDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const job = getJobById(resolvedParams.id);

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