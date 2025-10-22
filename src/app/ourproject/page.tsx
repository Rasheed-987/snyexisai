'use client'

import React, { useEffect, useState } from 'react'

import InnerCard from '@/components/project/innerCard'

const OurProjectPage = () => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [projectData, setProjectData] = useState<any[] | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/projects?status=Published')
        if (!response.ok) throw new Error('Failed to fetch projects')
        const json = await response.json()
        setProjectData(json.projects || [])
      } catch (err: any) {
        setError(err?.message || 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center ">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-b-[80px]  min-h-screen  relative z-50 bg-white pb-24 lg:pb-40  ">
      {projectData?.map((project: any, index: number) => (
        <div key={project._id || index} className="mb-8">
          <InnerCard
            banner={project.images?.banner || ''}
            title={project.title}
            description={project.descriptionText || ''}
            requirements={project.requirements || []}
            project={project}
          />
        </div>
      ))}
    </div>
  )
}

export default OurProjectPage
