 'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import OuterProjectCard from '@/components/project/outerProjectCard'


 const ProjectDetailPage = () => {
   const params = useParams()
   const id = params?.id as string

  const [project, setProject] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

   useEffect(() => {
     if (!id) return
     const load = async () => {
       try {
         setLoading(true)
         const res = await fetch(`/api/projects/${id}`)
         if (!res.ok) throw new Error('Failed to load project')
         const json = await res.json()
         setProject(json.project || null)
       } catch (err: any) {
         setError(err?.message || 'Failed to load')
       } finally {
         setLoading(false)
       }
     }
     load()
   }, [id])

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
