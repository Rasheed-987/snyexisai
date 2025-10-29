'use client'

import { useProjectContext } from '@/context/ProjectContext'

import InnerCard from '@/components/project/innerCard'

const OurProjectPage = () => {
  const { projectsData:projectData, loading, error } = useProjectContext()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center ">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading projects...</p>
        </div>
      </div>
    )
  }
  if(error){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-b-[80px]  min-h-screen  relative z-50 bg-background pb-24 lg:pb-40  ">
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
