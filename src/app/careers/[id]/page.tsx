'use client'

import { CareerDetail } from '@/components/careers/CareerDetail';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';


interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CareerDetailPage({ params }: PageProps) {
  const { id } = useParams();

  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/careers/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job');
        }
        const data = await response.json();
        setJob(data.career);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

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


  return (
    <div className="min-h-screen pb-24 rounded-b-[80px] relative z-50 bg-white">
      <CareerDetail job={job} />
    </div>
  );
}