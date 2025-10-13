'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { UploadBox } from '@/components/upload/UploadBox'
import { useRouter, useParams } from 'next/navigation'
import { handleImageUpload } from '@/utils/dashboard'

interface ImageSlot {
  id: string
  file: File | null
  previewUrl: string | null
  existingUrl?: string | null // For existing images from S3
}

const ServiceEditPage = () => {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string
  
  const [serviceTitle, setServiceTitle] = useState('')
  
  // Add loading and error states
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  const initialImageSlots: ImageSlot[] = [
    { id: 'banner', file: null, previewUrl: null, existingUrl: null }
  ]

  const [imageSlots, setImageSlots] = useState(initialImageSlots)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load existing service data
  useEffect(() => {
    const loadService = async () => {
      if (!mounted || !serviceId) return
      
      try {
        setIsLoading(true)
        console.log('Loading service with ID:', serviceId)
        
        const response = await fetch(`/api/services/${serviceId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch service')
        }
        
        const data = await response.json()
        
        if (data.success && data.service) {
          const service = data.service
          console.log('Loaded service:', service)
          
          // Populate form fields
          setServiceTitle(service.serviceTitle || '')
          
          // Set existing image if available
          if (service.images?.banner) {
            setImageSlots([{
              id: 'banner',
              file: null,
              previewUrl: service.images.banner,
              existingUrl: service.images.banner
            }])
          }
          
        } else {
          throw new Error('Service not found')
        }
        
      } catch (error) {
        console.error('Error loading service:', error)
        setUpdateError(error instanceof Error ? error.message : 'Failed to load service')
      } finally {
        setIsLoading(false)
      }
    }

    loadService()
  }, [serviceId, mounted])

  const onUpdate = async () => {
    if (!serviceTitle.trim()) {
      alert('Please provide a service title.')
      return
    }

    try {
      setIsUpdating(true)
      setUpdateError(null)
      setUpdateSuccess(false)
      
      console.log('Updating service:', serviceId)
      
      const formData = new FormData()
      formData.append('title', serviceTitle)
      
      // Add image file if new one is selected
      if (imageSlots[0].file) {
        formData.append('image', imageSlots[0].file)
      }
      
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        body: formData
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update service')
      }
      
      console.log('✅ Service updated successfully')
      setUpdateSuccess(true)
      
      // Show success message
      alert('Service updated successfully!')
      
      // Navigate back to services list
      router.push('/admin/services')
      
    } catch (error) {
      console.error('❌ Error updating service:', error)
      setUpdateError(error instanceof Error ? error.message : 'Failed to update service')
      alert(error instanceof Error ? error.message : 'Failed to update service')
    } finally {
      setIsUpdating(false)
    }
  }

  const onCancel = () => {
    router.push('/admin/services')
  }

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (updateError && !serviceTitle) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {updateError}</p>
          <button 
            onClick={() => router.push('/admin/services')} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Services
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Edit Service</h1>
        <p className="text-gray-600">Update service information and image</p>
      </div>

      {updateError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {updateError}
        </div>
      )}

      {updateSuccess && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Service updated successfully!
        </div>
      )}

      <UploadBox
        label="Service Image"
        image={imageSlots[0].previewUrl}
        onUpload={(e) => handleImageUpload(e, 0, imageSlots, setImageSlots)}
        className="mb-6 min-h-[50vh]"
      />

      <div className="mb-6">
        <label htmlFor="serviceTitle" className="block text-sm font-medium text-gray-700 mb-2">
          Service Title
        </label>
        <input
          id="serviceTitle"
          type="text"
          placeholder="Enter service title"
          value={serviceTitle}
          onChange={(e) => setServiceTitle(e.target.value)}
          className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none"
          disabled={isUpdating}
        />
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onCancel}
          className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          disabled={isUpdating}
        >
          Cancel
        </button>
        <button 
          onClick={onUpdate} 
          className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={isUpdating || !serviceTitle.trim()}
        >
          {isUpdating ? 'Updating...' : 'Update Service'}
        </button>
      </div>
    </div>
  )
}

export default ServiceEditPage