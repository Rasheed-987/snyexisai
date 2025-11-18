'use client'

import { CareerDetail } from '@/components/careers/CareerDetail';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CareerDetailPage({ params }: PageProps) {
  const { id } = useParams();

  const {
    data: job,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['career', id],
    queryFn: async () => {
      const response = await fetch(`/api/careers/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch job');
      }
      const data = await response.json();
      const career = data.career;
      // Normalize id field for UI components expecting `id`
      return career ? { id: career.id || career._id, ...career } : null;
    },
    enabled: !!id,
  });

  if (loading) {
    return (
      <div className="text-center w-full h-screen flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-foreground">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center w-full h-screen flex flex-col justify-center items-center">
        <p className="text-foreground mb-4">Job not found.</p>
        <button
          onClick={() => history.back()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center ">
        <p className="text-red-600 mb-4">Error: {(error as Error).message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          Retry
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen pb-24 rounded-b-[80px] relative z-50 bg-white">
      <CareerDetail job={job} />
    </div>
  );
}