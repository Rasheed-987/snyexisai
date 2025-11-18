 'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import OuterProjectCard from '@/components/project/outerProjectCard'
import { useQuery } from 'node_modules/@tanstack/react-query/build/modern/useQuery'


 const ProjectDetailPage = () => {
   const params = useParams()
   const id = params?.id as string

     const { data: project, isLoading: loading, error } = useQuery({
           queryKey: ['project', params?.id],
           queryFn: async () => {
               const response = await fetch(`/api/projects/${params?.id}`)
               if (!response.ok) throw new Error(`HTTP ${response.status}`)
               const data = await response.json()
               const project = data.project
               return project ? { id: project.id || project._id, ...project } : null
           },
           enabled: !!params?.id,
       })
   

   if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center">
         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
       </div>
     )
   }


   if (!project) {
     return (
       <div className="min-h-screen flex items-center justify-center">No project found</div>
     )
   }

   return (
     <div className="">
    <OuterProjectCard {...project} />

     </div>
   )
 }

 export default ProjectDetailPage
