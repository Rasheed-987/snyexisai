"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import CaseStudyDetailPage from '@/components/casestudies/CasestudiesDetailCard'

const CaseStudiesDetailPage = () => {
    const params = useParams()
    const [caseStudy, setCaseStudy] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCaseStudy = async () => {
            try {
                const response = await fetch(`/api/case-studies/${params.id}`)
                if (!response.ok) throw new Error(`HTTP ${response.status}`)
                const data = await response.json()
            console.log('case-study detail response:', data)
                setCaseStudy(data.caseStudy)
            } catch (err: any) {
                setError(err?.message ?? 'Failed to load')
            } finally {
                setLoading(false)
            }
        }

        if (params?.id) fetchCaseStudy()
    }, [params?.id])

 
if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center ">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CaseStudies...</p>
        </div>
      </div>
    )
  }



    if (error) return <div>Error: {error}</div>
    if (!caseStudy) return <div>No case study found.</div>

    return (
        <div>
            <CaseStudyDetailPage { ...caseStudy } />
        </div>
    )
}

export default CaseStudiesDetailPage
