'use client'

import React, { useEffect, useState } from 'react';
import AdminContentLayout from '@/components/admin/AdminContentLayout';
import { CaseStudyCard } from '@/components/admin/AdminCards';
import { useTitle } from '@/hooks/titleContext';
import { useRouter } from 'next/navigation';
import { formatDate, fetchCaseStudies, deleteCaseStudy, CaseStudy } from '@/utils/dashboard';

export default function CaseStudiesPage() {
  const { setTitle } = useTitle();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set title when page loads
  useEffect(() => {
    setTitle('Case Studies');
  }, [setTitle]);

  useEffect(() => {
 
    if (mounted) {
      fetchCaseStudies(setCaseStudies, setLoading, setError);
    }
  }, [mounted]);

  const handleUpload = () => {
    console.log('Upload Case Study clicked');
    router.push('/admin/case-studies/upload');
  };

  const handleEdit = (id: string) => {
    console.log('Edit case study:', id);
    router.push(`/admin/case-studies/edit/${id}`);
  };

  const handleUnpublish = async (id: string) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('status', 'draft');

      const response = await fetch(`/api/case-studies/${id}`, {
        method: 'PUT',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        throw new Error(result.error || 'Failed to unpublish case study');
      }

      // Update case study in local state
      setCaseStudies((prev) =>
        prev.map((caseStudy) =>
          caseStudy._id === id ? { ...caseStudy, ...result.caseStudy } : caseStudy
        )
      );
    } catch (error) {
      console.error('Error toggling case study status:', error);
      // You can add toast notification here
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteCaseStudy(id, caseStudies, setCaseStudies, setLoading);
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
  };

  // Loading state
  if (loading) {
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
  if (error) {
    return (
      <AdminContentLayout
        title="Case Studies"
        uploadLabel="Upload Case Study"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </AdminContentLayout>
    );
  }

  // Empty state
  if (!caseStudies || caseStudies.length === 0) {
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
      {caseStudies.map((caseStudy: CaseStudy) => (
        <CaseStudyCard
          key={caseStudy._id}
          id={caseStudy._id}
          title={caseStudy.caseTitle}
          description={caseStudy.subtitle || caseStudy.addLine}
          author="Admin"
          timeAgo={formatDate(caseStudy.createdAt)}
          thumbnail={caseStudy.images.banner || '/images/placeholder.png'}
          onEdit={() => handleEdit(caseStudy._id)}
          status={caseStudy.status as 'draft' | 'published'}
          onUnpublish={() => handleUnpublish(caseStudy._id)}
          onDelete={() => handleDelete(caseStudy._id)}
        />
      ))}
    </AdminContentLayout>
  );
}


