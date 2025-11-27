"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import ServicesDetailCard from '@/components/services/ServicesDetailCard'
import { useQuery } from '@tanstack/react-query'

const ServiceDetailPage = () => {
    const params = useParams() as { id?: string }

    const { data: service, isLoading: loading, error } = useQuery({
        queryKey: ['service', params?.id],
        queryFn: async () => {
            const response = await fetch(`/api/services/${params?.id}`)
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const data = await response.json()
            return data.service || data
        },
        enabled: !!params?.id,
    })

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-foreground">Loading Service...</p>
                </div>
            </div>
        )
    }

    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {(error as Error).message}</div>
    if (!service) return <div className="min-h-screen flex items-center justify-center">No service found.</div>

    return (
        <div className='rounded-b-[80px] min-h-screen relative z-50 bg-background pt-10 pb-24 lg:pb-40'>
            <ServicesDetailCard
                title={service.serviceTitle}
                image={service.images?.banner}
                description={service.description}
                servicesOffered={service.servicesOffered}
                whyItMatters={service.whyItMatters}
            />
        
        </div>
    )
}

export default ServiceDetailPage
