'use client'

import React, { useEffect, useState } from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import { JobCard } from '@/components/admin/AdminCards'
import { useTitle } from '@/hooks/titleContext'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Career {
  _id: string
  careerId: string
  jobTitle: string
  company: string
  location: string
  jobType: 'Full Time' | 'Part Time' | 'Contract' | 'Internship'
  description: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function CareersPage() {
  const router = useRouter()
  const { setTitle } = useTitle()
  const queryClient = useQueryClient()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => setTitle('Career'), [setTitle])

  // Fetch careers using TanStack Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['careers'],
    queryFn: async () => {
      const res = await fetch('/api/careers')
      if (!res.ok) throw new Error('Failed to fetch careers')
      const data = await res.json()
      if (!data.success) throw new Error('API returned unsuccessful response')
      return data.careers as Career[]
    }
  })

  // Mutation for toggling publish/draft status
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/careers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update career status')
      return data
    },
    onSuccess: (_, { id, status }) => {
      queryClient.setQueryData<Career[]>(['careers'], old =>
        old?.map(career => (career._id === id ? { ...career, status } : career)) || []
      )
    }
  })

  // Mutation for deleting a career
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/careers/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to delete career')
      return data
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<Career[]>(['careers'], old =>
        old?.filter(career => career._id !== id) || []
      )
    }
  })

  const handleUpload = () => router.push('/admin/career/upload')
  const handleEdit = (id: string) => router.push(`/admin/career/edit/${id}`)
  const handleUnpublish = (id: string, currentStatus: string) =>
    toggleStatusMutation.mutate({ id, status: currentStatus === 'draft' ? 'published' : 'draft' })
  const handleDelete = (id: string) => {
      deleteMutation.mutate(id)
    
  }

  if (!mounted) {
    return (
      <AdminContentLayout
        title="Career"
        uploadLabel="Add Career"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <div className="animate-pulse bg-gray-200 h-8 w-32 rounded mx-auto"></div>
        </div>
      </AdminContentLayout>
    )
  }

  if (isLoading) {
    return (
      <AdminContentLayout
        title="Career"
        uploadLabel="Add Career"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job postings...</p>
        </div>
      </AdminContentLayout>
    )
  }

  if (isError) {
    return (
      <AdminContentLayout
        title="Career"
        uploadLabel="Add Career"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {(error as Error).message}</p>
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ['careers'] })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </AdminContentLayout>
    )
  }

  if (!data || data.length === 0) {
    return (
      <AdminContentLayout
        title="Career"
        uploadLabel="Add Career"
        onUpload={handleUpload}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-4">No job postings found</p>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Your First Job Posting
          </button>
        </div>
      </AdminContentLayout>
    )
  }

  return (
    <AdminContentLayout
      title="Career"
      uploadLabel="Add Career"
      onUpload={handleUpload}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {data.map((career, index) => (
        <JobCard
          key={career._id}
          id={(index + 1).toString()}
          jobTitle={career.jobTitle}
          company={career.company}
          location={career.location}
          jobType={career.jobType}
          description={career.description}
          status={career.status as 'draft' | 'published'}
          onEdit={() => handleEdit(career._id)}
          onUnpublish={() => handleUnpublish(career._id, career.status)}
          onDelete={() => handleDelete(career._id)}
        />
      ))}
    </AdminContentLayout>
  )
}
