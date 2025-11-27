'use client'

import React from 'react'
import ResponsibilityInput from '@/components/admin/ResponsibilityInput'
import { useState, useEffect } from 'react'
import { UploadBox } from '@/components/upload/UploadBox'
import { useRouter, useParams } from 'next/navigation'
import { handleImageUpload } from '@/utils/dashboard'
import Alert from '@/components/ui/Alert'

interface ImageSlot {
  id: string
  file: File | any
  previewUrl: string | null
  existingUrl?: string | null // For existing images from S3
}

const ServiceEditPage = () => {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string
  
  const [serviceTitle, setServiceTitle] = useState('')
  
  // New fields state
  const [descriptionText, setDescriptionText] = useState<string>('');
  
  // Services Offered state
  const [servicesOffered, setServicesOffered] = useState<Array<{ title: string; body: string }>>([]);
  
  // Why It Matters state
  const [whyItMatters, setWhyItMatters] = useState<Array<{ title: string; body: string }>>([]);
  
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
          setDescriptionText(service.description || '');
          setServicesOffered(service.servicesOffered || []);
          setWhyItMatters(service.whyItMatters || []);
          
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

  // Save as draft (only requires title)
  const onSaveDraft = async () => {
    if (!serviceTitle.trim()) {
      alert('Please provide a service title.')
      return
    }
    try {
      setIsUpdating(true)
      setUpdateError(null)
      setUpdateSuccess(false)
      const formData = new FormData()
      formData.append('title', serviceTitle)
      formData.append('status', 'draft')
      formData.append('description', descriptionText)
      formData.append('servicesOffered', JSON.stringify(servicesOffered))
      formData.append('whyItMatters', JSON.stringify(whyItMatters))
      if (imageSlots[0].file) {
        formData.append('image', imageSlots[0].file)
      }
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        body: formData
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save draft')
      }
      setUpdateSuccess(true)
      router.push('/admin/services')
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : 'Save draft failed')
    } finally {
      setIsUpdating(false)
    }
  }

  // Publish (requires title and image)
  const onPublish = async () => {

    if (!serviceTitle.trim() || !imageSlots[0].existingUrl) {
      alert('Please provide a service title and upload an image.')
      return
    }
    try {
      setIsUpdating(true)
      setUpdateError(null)
      setUpdateSuccess(false)
  const formData = new FormData()
  formData.append('title', serviceTitle)
  formData.append('image', imageSlots[0].file)
  formData.append('status', 'published')
  formData.append('description', descriptionText)
  formData.append('servicesOffered', JSON.stringify(servicesOffered))
  formData.append('whyItMatters', JSON.stringify(whyItMatters))
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        body: formData
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update service')
      }
      setUpdateSuccess(true)
      router.push('/admin/services')
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : 'Publish failed')
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
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={isUpdating}
        />
      </div>

      {/* Description Textarea */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          placeholder="Service description"
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={descriptionText}
          onChange={(e) => setDescriptionText(e.target.value)}
          disabled={isUpdating}
        />
      </div>

      {/* Services Offered Section */}
      <div className="space-y-4 mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">Services Offered</label>
        <ResponsibilityInput 
          onAdd={(item) => setServicesOffered(prev => [...prev, item])} 
          titlePlaceholder="Service title (e.g., Custom Model Development)"
          bodyPlaceholder="Service description"
        />
        <div className="space-y-3 mt-4">
          {servicesOffered.map((service, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{service.title}</h4>
                <button 
                  type="button"
                  onClick={() => setServicesOffered(prev => prev.filter((_, i) => i !== idx))}
                  className="text-sm text-red-600 hover:underline"
                  disabled={isUpdating}
                >
                  Remove
                </button>
              </div>
              <p className="text-sm text-gray-600">{service.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why It Matters Section */}
      <div className="space-y-4 mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">Why it matters</label>
        <ResponsibilityInput 
          onAdd={(item) => setWhyItMatters(prev => [...prev, item])} 
          titlePlaceholder="Benefit title (e.g., Gain an Edge)"
          bodyPlaceholder="Benefit description"
        />
        <div className="space-y-3 mt-4">
          {whyItMatters.map((matter, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{matter.title}</h4>
                <button 
                  type="button"
                  onClick={() => setWhyItMatters(prev => prev.filter((_, i) => i !== idx))}
                  className="text-sm text-red-600 hover:underline"
                  disabled={isUpdating}
                >
                  Remove
                </button>
              </div>
              <p className="text-sm text-gray-600">{matter.body}</p>
            </div>
          ))}
        </div>
      </div>

  {updateError && (
        <Alert type="error" message={updateError} onClose={() => setUpdateError(null)} />
      )}

      {updateSuccess && (
        <Alert type="success" message="Service updated successfully!" onClose={() => setUpdateSuccess(false)} />
      )}


      <div className="flex gap-4">
        <button 
          onClick={onCancel}
          className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          disabled={isUpdating}
        >
          Cancel
        </button>
        <button 
          onClick={onSaveDraft}
          className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
          disabled={isUpdating}
        >
          {isUpdating ? 'Saving...' : 'Save Draft'}
        </button>
        <button 
          onClick={onPublish}
          className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={isUpdating}
        >
          {isUpdating ? 'Publishing...' : 'Publish Service'}
        </button>
      </div>
    </div>
  )
}

export default ServiceEditPage