'use client'

import React from 'react'
import Alert from '@/components/ui/Alert'
import { useState, useEffect } from 'react'
import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UploadBox } from '@/components/upload/UploadBox'
import { handleImageUpload } from '@/utils/dashboard'
import { useRouter } from 'next/navigation'
import ResponsibilityInput from '@/components/admin/ResponsibilityInput'
import { useQueryClient } from '@tanstack/react-query'

interface ImageSlot {
  id: string
  file: File | null
  previewUrl: string | null
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

export default function ServicesUploadPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
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

  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([
    { id: 'banner', file: null, previewUrl: null }
  ])
  const [isRouterMounted, setIsRouterMounted] = useState(false)

  // useFieldArray for dynamic arrays - better than manual setValue/getValues
  const {
    fields: servicesFields,
    append: appendService,
    remove: removeService
  } = useFieldArray({
    control,
    name: 'servicesOffered'
  })

  const {
    fields: mattersFields,
    append: appendMatter,
    remove: removeMatter
  } = useFieldArray({
    control,
    name: 'whyItMatters'
  })

  useEffect(() => {
    setIsRouterMounted(true)
  }, [])

  // Submit handler function
  const submitForm = async (data: ServiceFormData, status: 'draft' | 'published') => {
    if (!isRouterMounted) {
      console.error('NextRouter is not mounted.')
      return
    }

    try {
      setUploadError(null)

      // Validation for publish action
      if (status === 'published' && !imageSlots[0].file) {
        setUploadError('Please provide a service title and upload an image.')
        return
      }

      const form = new FormData()
      form.append('title', data.serviceTitle)
      form.append('status', status)
      form.append('description', data.descriptionText || '')
      form.append('servicesOffered', JSON.stringify(data.servicesOffered))
      form.append('whyItMatters', JSON.stringify(data.whyItMatters))
      
     
      if (imageSlots[0].file) {
        form.append('image', imageSlots[0].file)
      }

      const response = await fetch('/api/services', {
        method: 'POST',
        body: form,
      })

      if (response.ok) {
        // Invalidate cache to refresh the services list
        queryClient.invalidateQueries({ queryKey: ['services'] })
        
        const message = status === 'draft' 
          ? 'Service draft saved successfully!' 
          : 'Service published successfully!'
        setUploadSuccess(message)
        
        setTimeout(() => {
          setUploadSuccess(null)
          router.push('/admin/services')
        }, 2000)
      } else {
        const errorMessage = status === 'draft'
          ? 'Failed to save service draft.'
          : 'Failed to publish service.'
        setUploadError(errorMessage)
      }
    } catch (error) {
      console.error(`Error ${status === 'draft' ? 'saving' : 'publishing'} service:`, error)
      setUploadError(`An error occurred while ${status === 'draft' ? 'saving the service draft' : 'publishing the service'}.`)
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

  
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col ">
     
      <UploadBox
        label="Upload Service Image"
        image={imageSlots[0].previewUrl}
        onUpload={(e) => handleImageUpload(e, 0, imageSlots, setImageSlots)}
        className="mb-4 min-h-[50vh]"
      />

      <div className="mb-4">
        <Controller
          name="serviceTitle"
          control={control}
          render={({ field }) => (
            <div>
              <input
                type="text"
                placeholder="Service Title"
                {...field}
                className={`w-full max-w-lg rounded-full px-4 py-2 bg-white border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  errors.serviceTitle ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.serviceTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.serviceTitle.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <Controller
        name="descriptionText"
        control={control}
        render={({ field }) => (
          <textarea
            placeholder="Description Textarea"
            {...field}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        )}
      />

      {/* Services Offered Section - Using useFieldArray */}
      <div className="space-y-4 mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">Services Offered</label>
        
        <ResponsibilityInput 
          onAdd={(item) => appendService(item)} // Much cleaner with useFieldArray
          titlePlaceholder="Service title (e.g., Custom Model Development)"
          bodyPlaceholder="Service description"
        />
        
        <div className="space-y-3 mt-4">
          {servicesFields.map((field, index) => (
            <div key={field.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                {/* Use Controller for individual array items */}
                <div className="flex-1 mr-4">
                  <Controller
                    name={`servicesOffered.${index}.title`}
                    control={control}
                    render={({ field: titleField, fieldState }) => (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {titleField.value || 'Untitled Service'}
                        </h4>
                        {fieldState.error && (
                          <p className="text-red-500 text-xs">{fieldState.error.message}</p>
                        )}
                      </div>
                    )}
                  />
                  
                  <Controller
                    name={`servicesOffered.${index}.body`}
                    control={control}
                    render={({ field: bodyField, fieldState }) => (
                      <div>
                        <p className="text-sm text-gray-600">
                          {bodyField.value || 'No description'}
                        </p>
                        {fieldState.error && (
                          <p className="text-red-500 text-xs">{fieldState.error.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
                
                <button 
                  type="button"
                  onClick={() => removeService(index)} // Clean removal with useFieldArray
                  className="text-sm text-red-600 hover:underline hover:bg-red-50 px-2 py-1 rounded"
                  aria-label={`Remove service item ${index + 1}`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          {servicesFields.length === 0 && (
            <p className="text-gray-500 text-sm italic">
              No services added yet. Use the form above to add services.
            </p>
          )}
        </div>
      </div>

      {/* Why It Matters Section - Using useFieldArray */}
      <div className="space-y-4 mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">Why it matters</label>
        
        <ResponsibilityInput 
          onAdd={(item) => appendMatter(item)} // Clean addition with useFieldArray
          titlePlaceholder="Benefit title (e.g., Gain an Edge)"
          bodyPlaceholder="Benefit description"
        />
        
        <div className="space-y-3 mt-4">
          {mattersFields.map((field, index) => (
            <div key={field.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                {/* Use Controller for individual array items */}
                <div className="flex-1 mr-4">
                  <Controller
                    name={`whyItMatters.${index}.title`}
                    control={control}
                    render={({ field: titleField, fieldState }) => (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {titleField.value || 'Untitled Benefit'}
                        </h4>
                        {fieldState.error && (
                          <p className="text-red-500 text-xs">{fieldState.error.message}</p>
                        )}
                      </div>
                    )}
                  />
                  
                  <Controller
                    name={`whyItMatters.${index}.body`}
                    control={control}
                    render={({ field: bodyField, fieldState }) => (
                      <div>
                        <p className="text-sm text-gray-600">
                          {bodyField.value || 'No description'}
                        </p>
                        {fieldState.error && (
                          <p className="text-red-500 text-xs">{fieldState.error.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>
                
                <button 
                  type="button"
                  onClick={() => removeMatter(index)} // Clean removal with useFieldArray
                  className="text-sm text-red-600 hover:underline hover:bg-red-50 px-2 py-1 rounded"
                  aria-label={`Remove benefit item ${index + 1}`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          {mattersFields.length === 0 && (
            <p className="text-gray-500 text-sm italic">
              No benefits added yet. Use the form above to add benefits.
            </p>
          )}
        </div>
      </div>

 {/* Error and Success Messages */}
      {uploadError && (
        <div className="w-full max-w-lg mb-4">
          <Alert type="error" message={uploadError} onClose={() => setUploadError(null)} />
        </div>
      )}
      {uploadSuccess && (
        <div className="w-full max-w-lg mb-4">
          <Alert type="success" message={uploadSuccess} onClose={() => setUploadSuccess(null)} />
        </div>
      )}


      <div className="flex gap-4">
        <button 
          type="button"
          className="px-6 py-2 rounded-full bg-gray-200" 
          onClick={() => router.push('/admin/services')}
        >
          Cancel
        </button>
        <button 
          type="button"
          className="px-6 py-2 rounded-full bg-gray-300" 
          onClick={handleSaveDraft}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Draft'}
        </button>
        <button 
          type="button"
          className="px-6 py-2 rounded-full bg-blue-600 text-white disabled:opacity-50" 
          onClick={handlePublish}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  )
}
