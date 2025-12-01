'use client'

import React from 'react'
import ResponsibilityInput from '@/components/admin/ResponsibilityInput'
import { useState, useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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

// Form data type
type ServiceFormData = {
  serviceTitle: string
  descriptionText?: string
  servicesOffered: { title: string; body: string }[]
  whyItMatters: { title: string; body: string }[]
  image?: any
}

// Zod validation schema
const serviceFormSchema = z.object({
  serviceTitle: z.string().min(1, 'Service title is required'),
  descriptionText: z.string().optional(),
  servicesOffered: z.array(z.object({
    title: z.string().min(1, 'Service title is required'),
    body: z.string().min(1, 'Service description is required')
  })),
  whyItMatters: z.array(z.object({
    title: z.string().min(1, 'Benefit title is required'),
    body: z.string().min(1, 'Benefit description is required')
  })),
  image: z.any().optional()
}) satisfies z.ZodType<ServiceFormData>

const ServiceEditPage = () => {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      serviceTitle: '',
      descriptionText: '',
      servicesOffered: [],
      whyItMatters: []
    }
  })
  
  // Add loading and error states
  const [isLoading, setIsLoading] = useState(true)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Watch form values for real-time updates
  const watchedServicesOffered = watch('servicesOffered')
  const watchedWhyItMatters = watch('whyItMatters')

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
          
          // Populate form fields using React Hook Form's reset
          reset({
            serviceTitle: service.serviceTitle || '',
            descriptionText: service.description || '',
            servicesOffered: service.servicesOffered || [],
            whyItMatters: service.whyItMatters || []
          })
          
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

  // Submit handler function
  const submitForm = async (data: ServiceFormData, status: 'draft' | 'published') => {
    try {
      setUpdateError(null)
      setUpdateSuccess(false)

      // Validation for publish action
      if (status === 'published' && !imageSlots[0].existingUrl && !imageSlots[0].file) {
        setUpdateError('Please provide a service title and upload an image.')
        return
      }

      const formData = new FormData()
      formData.append('title', data.serviceTitle)
      formData.append('status', status)
      formData.append('description', data.descriptionText || '')
      formData.append('servicesOffered', JSON.stringify(data.servicesOffered))
      formData.append('whyItMatters', JSON.stringify(data.whyItMatters))
      
      if (imageSlots[0].file) {
        formData.append('image', imageSlots[0].file)
      }

      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        body: formData
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || `Failed to ${status === 'draft' ? 'save draft' : 'update service'}`)
      }

      const message = status === 'draft' 
        ? 'Service draft saved successfully!' 
        : 'Service published successfully!'
      setUpdateSuccess(true)
      
      setTimeout(() => {
        setUpdateSuccess(false)
        router.push('/admin/services')
      }, 2000)
    } catch (error) {
      console.error(`Error ${status === 'draft' ? 'saving' : 'publishing'} service:`, error)
      setUpdateError(error instanceof Error ? error.message : `${status === 'draft' ? 'Save draft' : 'Publish'} failed`)
    }
  }

  // Save as draft handler
  const handleSaveDraft = () => {
    handleSubmit((data: any) => submitForm(data as ServiceFormData, 'draft'))()
  }

  // Publish handler  
  const handlePublish = () => {
    handleSubmit((data: any) => submitForm(data as ServiceFormData, 'published'))()
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

  // Error state (only show if we failed to load initial data)
  if (updateError && isLoading) {
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
        <Controller
          name="serviceTitle"
          control={control}
          render={({ field }) => (
            <div>
              <input
                id="serviceTitle"
                type="text"
                placeholder="Enter service title"
                {...field}
                className={`w-full px-3 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  errors.serviceTitle ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.serviceTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.serviceTitle.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Description Textarea */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <Controller
          name="descriptionText"
          control={control}
          render={({ field }) => (
            <textarea
              placeholder="Service description"
              {...field}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-200"
              disabled={isSubmitting}
            />
          )}
        />
      </div>

      {/* Services Offered Section */}
      <div className="space-y-4 mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">Services Offered</label>
        <ResponsibilityInput 
          onAdd={(item) => {
            const currentServices = getValues('servicesOffered') || []
            setValue('servicesOffered', [...currentServices, item])
          }} 
          titlePlaceholder="Service title (e.g., Custom Model Development)"
          bodyPlaceholder="Service description"
        />
        <div className="space-y-3 mt-4">
          {watchedServicesOffered?.map((service: { title: string; body: string }, idx: number) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{service.title}</h4>
                <button 
                  type="button"
                  onClick={() => {
                    const currentServices = getValues('servicesOffered') || []
                    setValue('servicesOffered', currentServices.filter((_: any, i: number) => i !== idx))
                  }}
                  className="text-sm text-red-600 hover:underline"
                  disabled={isSubmitting}
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
          onAdd={(item) => {
            const currentMatters = getValues('whyItMatters') || []
            setValue('whyItMatters', [...currentMatters, item])
          }} 
          titlePlaceholder="Benefit title (e.g., Gain an Edge)"
          bodyPlaceholder="Benefit description"
        />
        <div className="space-y-3 mt-4">
          {watchedWhyItMatters?.map((matter: { title: string; body: string }, idx: number) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{matter.title}</h4>
                <button 
                  type="button"
                  onClick={() => {
                    const currentMatters = getValues('whyItMatters') || []
                    setValue('whyItMatters', currentMatters.filter((_: any, i: number) => i !== idx))
                  }}
                  className="text-sm text-red-600 hover:underline"
                  disabled={isSubmitting}
                >
                  Remove
                </button>
              </div>
              <p className="text-sm text-gray-600">{matter.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Error and Success Messages */}
      {updateError && (
        <div className="w-full max-w-lg mb-4">
          <Alert type="error" message={updateError} onClose={() => setUpdateError(null)} />
        </div>
      )}
      {updateSuccess && (
        <div className="w-full max-w-lg mb-4">
          <Alert type="success" message="Service updated successfully!" onClose={() => setUpdateSuccess(false)} />
        </div>
      )}

      <div className="flex gap-4">
        <button 
          type="button"
          onClick={() => router.push('/admin/services')}
          className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button 
          type="button"
          onClick={handleSaveDraft}
          className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Draft'}
        </button>
        <button 
          type="button"
          onClick={handlePublish}
          className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publishing...' : 'Publish Service'}
        </button>
      </div>
    </div>
  )
}

export default ServiceEditPage