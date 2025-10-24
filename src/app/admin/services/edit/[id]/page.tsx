'use client'

import React from 'react'
import RequirementsInput from '@/components/admin/RequirementsInput'
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
  const [requirements, setRequirements] = useState<string[]>([]);
  const [editingReqIndex, setEditingReqIndex] = useState<number | null>(null);
  const [editingReqText, setEditingReqText] = useState<string>('');
  
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
          setRequirements(service.requirements || []);
          
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
      formData.append('requirements', JSON.stringify(requirements))
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
  formData.append('requirements', JSON.stringify(requirements))
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

      {/* Requirements */}
      <div className="space-y-2 mb-6">
        <label className="block text-sm font-medium text-gray-700">Bullets Points</label>
        <div className="space-y-2">
          <RequirementsInput onAdd={(text: string) => setRequirements(prev => [...prev, text.trim()])} />
          <ul className="list-disc pl-5 space-y-1">
            {requirements.map((r, idx) => (
              <li key={idx} className="flex items-center justify-between">
                {editingReqIndex === idx ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      value={editingReqText}
                      onChange={(e) => setEditingReqText(e.target.value)}
                      placeholder="Edit requirement"
                      className="flex-1 border p-2 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newText = editingReqText.trim();
                        if (newText.length) {
                          setRequirements(prev => prev.map((it, i) => i === idx ? newText : it));
                        }
                        setEditingReqIndex(null);
                        setEditingReqText('');
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingReqIndex(null);
                        setEditingReqText('');
                      }}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{r}</span>
                    <div className="flex gap-3 items-center">
                      <button type="button" onClick={() => setRequirements(prev => prev.filter((_, i) => i !== idx))} className="text-sm text-red-600 hover:underline">Remove</button>
                      <button type="button" onClick={() => { setEditingReqIndex(idx); setEditingReqText(r); }} className="text-sm text-blue-600 hover:underline">Edit</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
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