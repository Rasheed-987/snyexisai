'use client'

import React, { useEffect, useState } from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import { ProjectCard } from '@/components/admin/AdminCards'
import { useTitle } from '@/hooks/titleContext'
import { useRouter } from 'next/navigation'

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


  // const projectsData = [
  //   {
  //     id: '1',
  //     title: 'UX & Web Design Master',
  //     description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
  //     author: 'Alex Smith',
  //     timeAgo: '3h 44min ago',
  //     thumbnail: '/images/grid_1.png'
  //   },
  //   {
  //     id: '2',
  //     title: 'UX & Web Design Master',
  //     description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
  //     author: 'Alex Smith',
  //     timeAgo: '3h 44min ago',
  //     thumbnail: '/images/img1.png'
  //   },
  //   {
  //     id: '3',
  //     title: 'UX & Web Design Master',
  //     description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
  //     author: 'Alex Smith',
  //     timeAgo: '3h 44min ago',
  //     thumbnail: '/images/img2.png'
  //   },
  //   {
  //     id: '4',
  //     title: 'UX & Web Design Master',
  //     description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
  //     author: 'Alex Smith',
  //     timeAgo: '3h 44min ago',
  //     thumbnail: '/images/img3_1.jpg'
  //   },
  //   {
  //     id: '5',
  //     title: 'UX & Web Design Master',
  //     description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
  //     author: 'Alex Smith',
  //     timeAgo: '3h 44min ago',
  //     thumbnail: '/images/grid_2.png'
  //   },
  //   {
  //     id: '6',
  //     title: 'UX & Web Design Master',
  //     description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
  //     author: 'Alex Smith',
  //     timeAgo: '3h 44min ago',
  //     thumbnail: '/images/img4_1.jpg'
  //   }
  // ]


  // Helper function to format date safely
  const formatDate = (dateString: string) => {
    if (!mounted) return 'Loading...' // Prevent hydration mismatch
    
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
      
      if (diffInHours < 1) return 'Just now'
      if (diffInHours < 24) return `${diffInHours}h ago`
      if (diffInHours < 48) return 'Yesterday'
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      })
    } catch {
      return 'Unknown'
    }
  }

  const handleUpload = () => {
    console.log('Upload Project clicked')
    router.push('/admin/projects/upload')
  }

  const handleEdit = (id: string) => {
    console.log('Edit project:', id)
    // Add edit logic here
  }

  const handleUnpublish = (id: string) => {
    console.log('Unpublish project:', id)
    // Add unpublish logic here
  }

  const handleDelete = (id: string) => {
    console.log('Delete project:', id)
    // Add delete logic here
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
          onEdit={() => handleEdit(project._id)}
          onUnpublish={() => handleUnpublish(project._id)}
          onDelete={() => handleDelete(project._id)}
        />
      ))}
    </AdminContentLayout>
  )
}