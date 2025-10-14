'use client'

import React, { useEffect, useState } from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import { JobCard } from '@/components/admin/AdminCards'
import { useTitle } from '@/hooks/titleContext'
import { useRouter } from 'next/navigation'

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
  
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/careers')
        
        if (!response.ok) {
          throw new Error('Failed to fetch careers')
        }
        
        const careersData = await response.json()
        console.log('Fetched careers:', careersData)
        
        if (careersData.success) {
          setCareers(careersData.careers)
        } else {
          throw new Error('API returned unsuccessful response')
        }
      } catch (error) {
        console.error('Error fetching careers:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch careers')
      } finally {
        setLoading(false)
      }
    }

    if (mounted) {
      fetchCareers()
    }
  }, [mounted])

  useEffect(() => {
    setTitle('Career')
  }, [setTitle])

  const handleUpload = () => {
    console.log('Upload Career clicked')
    router.push('/admin/career/upload')
  }

  const handleEdit = (id: string) => {
    console.log('Edit career:', id)
    // Navigate to edit page (you can create this later)
    router.push(`/admin/career/edit/${id}`)
  }

  const handleUnpublish = async (id: string, currentStatus: string) => {
    try {
      setLoading(true)
      
      if (currentStatus === 'draft') {
        // For draft careers, publish them
        console.log('Publishing draft career:', id)
        
        const response = await fetch(`/api/careers/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'published' })
        })
        
        const result = await response.json()
        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to publish career')
        }
        
        console.log('✅ Career published successfully')
        
        // Update career in local state
        setCareers(prev => prev.map(career => 
          career._id === id 
            ? { ...career, status: 'published' }
            : career
        ))
        
      } else {
        // For published careers, unpublish them (set to draft)
        console.log('Unpublishing career:', id)
        
        const response = await fetch(`/api/careers/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'draft' })
        })
        
        const result = await response.json()
        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to unpublish career')
        }
        
        console.log('✅ Career unpublished successfully')
        
        // Update career in local state
        setCareers(prev => prev.map(career => 
          career._id === id 
            ? { ...career, status: 'draft' }
            : career
        ))
      }
      
    } catch (error) {
      console.error('Error toggling career status:', error)
      // You can add toast notification here
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this job posting? This action cannot be undone.')
    
    if (!confirmed) return
    
    try {
      setLoading(true)
      console.log('Deleting career:', id)
      
      const response = await fetch(`/api/careers/${id}`, {
        method: 'DELETE'
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete career')
      }
      
      console.log('✅ Career deleted successfully')
      
      // Remove career from local state
      setCareers(careers.filter(career => career._id !== id))
      
      // Show success message (optional - you can add a toast notification)
      alert('Job posting deleted successfully!')
      
    } catch (error) {
      console.error('❌ Error deleting career:', error)
      alert(error instanceof Error ? error.message : 'Failed to delete job posting')
    } finally {
      setLoading(false)
    }
  }

  // Don't render until mounted to prevent hydration issues
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

  // Loading state
  if (loading) {
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

  // Error state
  if (error) {
    return (
      <AdminContentLayout
        title="Career"
        uploadLabel="Add Career"
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
    )
  }

  // Empty state
  if (careers.length === 0) {
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
      {careers.map((career: Career, index: number) => (
        <JobCard
          key={career._id}
          id={(index + 1).toString()}
          jobTitle={career.jobTitle}
          company={career.company}
          location={career.location}
          jobType={career.jobType}
          description={career.description}
          className=""
          status={career.status as 'draft' | 'published'}
          onEdit={() => handleEdit(career._id)}
          onUnpublish={() => handleUnpublish(career._id, career.status)}
          onDelete={() => handleDelete(career._id)}
        />
      ))}
    </AdminContentLayout>
  )
}