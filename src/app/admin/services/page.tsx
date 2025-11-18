'use client'

import React, { useEffect, useState } from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import { ServiceCard } from '@/components/admin/AdminCards'
import { useTitle } from '@/hooks/titleContext'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDate } from '@/utils/dashboard'

interface Service {
  _id: string;
  serviceId: string;
  serviceTitle: string;
  images: {
    banner?: string;
    gallery: string[];
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function ServicesPage() {
  const router = useRouter();
  const { setTitle } = useTitle();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => setTitle('Services'), [setTitle]);

  // Fetch services using TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch('/api/services');
      if (!res.ok) throw new Error('Failed to fetch services');
      const data = await res.json();
      if (!data.success) throw new Error('API returned unsuccessful response');
      return data.services as Service[];
    }
  });

  // Mutation for toggling publish/draft status
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const formData = new FormData();
      formData.append('status', status);
      
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update service status');
      return data;
    },
    onSuccess: (_, { id, status }) => {
      queryClient.setQueryData<Service[]>(['services'], old =>
        old?.map(service => (service._id === id ? { ...service, status } : service)) || []
      );
    }
  });

  // Mutation for deleting a service
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete service');
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<Service[]>(['services'], old =>
        old?.filter(service => service._id !== id) || []
      );
    }
  });

  const handleUpload = () => router.push('/admin/services/upload');
  const handleEdit = (id: string) => router.push(`/admin/services/edit/${id}`);
  const handleUnpublish = (id: string, currentStatus: string) =>
    toggleStatusMutation.mutate({ id, status: currentStatus === 'draft' ? 'published' : 'draft' });
  const handleDelete = (id: string) => {
      deleteMutation.mutate(id);
    
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <AdminContentLayout
        title="Services"
        uploadLabel="Upload Service"
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
        title="Services"
        uploadLabel="Upload Service"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </AdminContentLayout>
    );
  }

  // Error state
  if (isError) {
    return (
      <AdminContentLayout
        title="Services"
        uploadLabel="Upload Service"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {(error as Error).message}</p>
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ['services'] })}
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
        title="Services"
        uploadLabel="Upload Service"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-4">No services found</p>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload Your First Service
          </button>
        </div>
      </AdminContentLayout>
    );
  }

  return (
    <AdminContentLayout
      title="Services"
      uploadLabel="Upload Service"
      onUpload={handleUpload}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {data.map((service: Service) => (
        <ServiceCard
          key={service._id}
          id={service._id}
          title={service.serviceTitle}
          description={service.serviceTitle}
          author="Admin"
          timeAgo={formatDate(service.createdAt)}
          thumbnail={service.images.banner || '/images/placeholder.png'}
          status={service.status as 'draft' | 'published'}
          onEdit={() => handleEdit(service._id)}
          onUnpublish={() => handleUnpublish(service._id, service.status)}
          onDelete={() => handleDelete(service._id)}
        />
      ))}
    </AdminContentLayout>
  );
}