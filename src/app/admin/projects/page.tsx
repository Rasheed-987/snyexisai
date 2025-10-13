'use client'

import React, { useEffect, useState } from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import { ProjectCard } from '@/components/admin/AdminCards'
import { useTitle } from '@/hooks/titleContext'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const { setTitle } = useTitle()
  
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/projects')
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        
        const projectsData = await response.json()
        console.log('Fetched projects:', projectsData)
        
        if (projectsData.success) {
          setProjects(projectsData.projects)
          
        } else {
          throw new Error('API returned unsuccessful response')
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch projects')
      } finally {
        setLoading(false)
      }
    }

    if (mounted) {
      fetchProjects()
    }
  }, [mounted])

  useEffect(() => {
    setTitle('Projects')
  }, [setTitle])




  const handleUpload = () => {
    console.log('Upload Project clicked')
    router.push('/admin/projects/upload')
  }

  const handleEdit = (id: string) => {
    console.log('Edit project:', id)
    // Navigate to edit page (you can create this later)
    router.push(`/admin/projects/edit/${id}`)
  }

  const handleUnpublish = async (id: string, currentStatus: string) => {
    try {
      setLoading(true)
      
      if (currentStatus === 'draft') {
        // For draft projects, publish them
        console.log('Publishing draft project:', id)
        
        const formData = new FormData()
        formData.append('status', 'published')
        
        const response = await fetch(`/api/projects/${id}`, {
          method: 'PUT',
          body: formData
        })
        
        const result = await response.json()
        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to publish project')
        }
        
        console.log('✅ Project published successfully')
        
        // Update project in local state
        setProjects(prev => prev.map(project => 
          project._id === id 
            ? { ...project, status: 'published' }
            : project
        ))
        
      } else {
        // For published projects, unpublish them (set to draft)
        console.log('Unpublishing project:', id)
        
        const formData = new FormData()
        formData.append('status', 'draft')
        
        const response = await fetch(`/api/projects/${id}`, {
          method: 'PUT',
          body: formData
        })
        
        const result = await response.json()
        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to unpublish project')
        }
        
        console.log('✅ Project unpublished successfully')
        
        // Update project in local state
        setProjects(prev => prev.map(project => 
          project._id === id 
            ? { ...project, status: 'draft' }
            : project
        ))
      }
      
    } catch (error) {
      console.error('Error toggling project status:', error)
      // You can add toast notification here
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this project? This action cannot be undone.')
    
    if (!confirmed) return
    
    try {
      setLoading(true)
      console.log('Deleting project:', id)
      
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete project')
      }
      
      console.log('✅ Project deleted successfully')
      
      // Remove project from local state
      setProjects(projects.filter(project => project._id !== id))
      
      // Show success message (optional - you can add a toast notification)
      alert('Project deleted successfully!')
      
    } catch (error) {
      console.error('❌ Error deleting project:', error)
      alert(error instanceof Error ? error.message : 'Failed to delete project')
    } finally {
      setLoading(false)
    }
  }

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
    )
  }

  // Loading state
  if (loading) {
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
    )
  }

  // Error state
  if (error) {
    return (
      <AdminContentLayout
        title="Projects"
        uploadLabel="Upload Project"
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
  if (projects.length === 0) {
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
    )
  }

  return (
    <AdminContentLayout
      title="Projects"
      uploadLabel="Upload Project"
      onUpload={handleUpload}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project: Project) => (
        <ProjectCard
          key={project._id}
          id={project._id}
          title={project.title}
          description={project.tagline || project.addTitle}
          author="Admin" // You can modify this based on your user system
          timeAgo={formatDate(project.createdAt)}
          thumbnail={project.images.banner || '/images/placeholder.png'}
          status={project.status as 'draft' | 'published'}
          onEdit={() => handleEdit(project._id)}
          onUnpublish={() => handleUnpublish(project._id, project.status)}
          onDelete={() => handleDelete(project._id)}
        />
      ))}
    </AdminContentLayout>
  )
}