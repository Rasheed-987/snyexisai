'use client'

import React, { useEffect, useState } from 'react';
import AdminContentLayout from '@/components/admin/AdminContentLayout';
import { CaseStudyCard } from '@/components/admin/AdminCards';
import { useTitle } from '@/hooks/titleContext';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { formatDate, CaseStudy } from '@/utils/dashboard';

export default function CaseStudiesPage() {
  const router = useRouter();
  const { setTitle } = useTitle();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => setTitle('Case Studies'), [setTitle]);

  // Fetch case studies using TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['case-studies'],
    queryFn: async () => {
      const res = await fetch('/api/case-studies');
      if (!res.ok) throw new Error('Failed to fetch case studies');
      const data = await res.json();
      if (!data.success) throw new Error('API returned unsuccessful response');
      return data.caseStudies as CaseStudy[];
    }
  });

  // Mutation for toggling publish/draft status
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const formData = new FormData();
      formData.append('status', status);
      
      const res = await fetch(`/api/case-studies/${id}`, {
        method: 'PUT',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update case study status');
      return data;
    },
    onSuccess: (_, { id, status }) => {
      queryClient.setQueryData<CaseStudy[]>(['case-studies'], old =>
        old?.map(caseStudy => (caseStudy._id === id ? { ...caseStudy, status } : caseStudy)) || []
      );
    }
  });

  // Mutation for deleting a case study
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/case-studies/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete case study');
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<CaseStudy[]>(['case-studies'], old =>
        old?.filter(caseStudy => caseStudy._id !== id) || []
      );
    }
  });

  const handleUpload = () => router.push('/admin/case-studies/upload');
  const handleEdit = (id: string) => router.push(`/admin/case-studies/edit/${id}`);
  const handleUnpublish = (id: string, currentStatus: string) =>
    toggleStatusMutation.mutate({ id, status: currentStatus === 'draft' ? 'published' : 'draft' });
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      deleteMutation.mutate(id);
    }
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <AdminContentLayout
        title="Case Studies"
        uploadLabel="Upload Case Study"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <div className="animate-pulse bg-gray-200 h-8 w-32 rounded mx-auto"></div>
        </div>
      </AdminContentLayout>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <AdminContentLayout
        title="Case Studies"
        uploadLabel="Upload Case Study"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading case studies...</p>
        </div>
      </AdminContentLayout>
    );
  }

  // Error state
  if (isError) {
    return (
      <AdminContentLayout
        title="Case Studies"
        uploadLabel="Upload Case Study"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {(error as Error).message}</p>
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ['case-studies'] })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </AdminContentLayout>
    );
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <AdminContentLayout
        title="Case Studies"
        uploadLabel="Upload Case Study"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-4">No case studies found</p>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload Your First Case Study
          </button>
        </div>
      </AdminContentLayout>
    );
  }

  return (
    <AdminContentLayout
      title="Case Studies"
      uploadLabel="Upload Case Study"
      onUpload={handleUpload}
      className="space-y-6"
    >
      {data.map((caseStudy: CaseStudy) => (
        <CaseStudyCard
          key={caseStudy._id}
          id={caseStudy._id}
          title={caseStudy.caseTitle}
          description={caseStudy.subtitle || caseStudy.addLine}
          author="Admin"
          timeAgo={formatDate(caseStudy.createdAt)}
          thumbnail={caseStudy.images.banner || '/images/placeholder.png'}
          status={caseStudy.status as 'draft' | 'published'}
          onEdit={() => handleEdit(caseStudy._id)}
          onUnpublish={() => handleUnpublish(caseStudy._id, caseStudy.status)}
          onDelete={() => handleDelete(caseStudy._id)}
        />
      ))}
    </AdminContentLayout>
  );
}


