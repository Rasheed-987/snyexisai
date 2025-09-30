'use client'

import { notFound } from 'next/navigation';
import { getJobById } from '@/lib/careers-data';
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
    <div className="min-h-screen pb-24 rounded-b-[80px] relative z-50 bg-white">
      <CareerDetail job={job} />
    </div>
  );
}