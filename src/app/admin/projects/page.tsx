'use client'

import React, { useEffect, useState } from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import { ProjectCard } from '@/components/admin/AdminCards'
import { useTitle } from '@/hooks/titleContext'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDate } from '@/utils/dashboard'

interface Project {
  _id: string
  projectId: string
  title: string
  tagline: string
  addTitle: string
  images: {
    banner?: string
    gallery: string[]
  }
  cards: Array<{ title: string; body: string }>
  largeCard: { title: string; body: string }
  smallCards: Array<{ title: string; body: string }>
  status: string
  createdAt: string
  updatedAt: string
}

export default function ProjectsPage() {
  const router = useRouter();
  const { setTitle } = useTitle();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => setTitle('Projects'), [setTitle]);

  // Fetch projects using TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      if (!data.success) throw new Error('API returned unsuccessful response');
      return data.projects as Project[];
    }
  });

  // Mutation for toggling publish/draft status
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const formData = new FormData();
      formData.append('status', status);
      
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update project status');
      return data;
    },
    onSuccess: (_, { id, status }) => {
      queryClient.setQueryData<Project[]>(['projects'], old =>
        old?.map(project => (project._id === id ? { ...project, status } : project)) || []
      );
    }
  });

  // Mutation for deleting a project
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete project');
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<Project[]>(['projects'], old =>
        old?.filter(project => project._id !== id) || []
      );
    }
  });

  const handleUpload = () => router.push('/admin/projects/upload');
  const handleEdit = (id: string) => router.push(`/admin/projects/edit/${id}`);
  const handleUnpublish = (id: string, currentStatus: string) =>
    toggleStatusMutation.mutate({ id, status: currentStatus === 'draft' ? 'published' : 'draft' });
  const handleDelete = (id: string) => {
      deleteMutation.mutate(id);
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <AdminContentLayout
        title="Projects"
        uploadLabel="Upload Project"
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
        title="Projects"
        uploadLabel="Upload Project"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </AdminContentLayout>
    );
  }

  // Error state
  if (isError) {
    return (
      <AdminContentLayout
        title="Projects"
        uploadLabel="Upload Project"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {(error as Error).message}</p>
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ['projects'] })}
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
        title="Projects"
        uploadLabel="Upload Project"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-4">No projects found</p>
          <button 
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload Your First Project
          </button>
        </div>
      </AdminContentLayout>
    );
  }

  return (
    <AdminContentLayout
      title="Projects"
      uploadLabel="Upload Project"
      onUpload={handleUpload}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {data.map((project: Project) => (
        <ProjectCard
          key={project._id}
          id={project._id}
          title={project.title}
          description={project.tagline || project.addTitle}
          author="Admin"
          timeAgo={formatDate(project.createdAt)}
          thumbnail={project.images.banner || '/images/placeholder.png'}
          status={project.status as 'draft' | 'published'}
          onEdit={() => handleEdit(project._id)}
          onUnpublish={() => handleUnpublish(project._id, project.status)}
          onDelete={() => handleDelete(project._id)}
        />
      ))}
    </AdminContentLayout>
  );
}