'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function CareerEditPage() {
  const router = useRouter()
  const params = useParams()
  const careerId = params.id as string

  const [jobTitle, setJobTitle] = useState<string>('')
  const [company, setCompany] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [jobType, setJobType] = useState<'Full Time' | 'Part Time' | 'Contract' | 'Internship'>('Full Time')
  const [description, setDescription] = useState<string>('')

  // Add loading and error states
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  // Load existing career data
  useEffect(() => {
    const loadCareer = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/careers/${careerId}`)
        
        if (!response.ok) {
          throw new Error('Failed to load career')
        }

        const response_data = await response.json()
        const career = response_data.career
        console.log('Fetched Career Data', career)
        
        // Populate form fields
        setJobTitle(career.jobTitle || '')
        setCompany(career.company || '')
        setLocation(career.location || '')
        setJobType(career.jobType || 'Full Time')
        setDescription(career.description || '')

      } catch (error) {
        console.error('Failed to load career:', error)
        setUpdateError('Failed to load career data')
      } finally {
        setIsLoading(false)
      }
    }

    if (careerId) {
      loadCareer()
    }
  }, [careerId])

  const handleSaveDraft = async () => {
    setIsUpdating(true)
    setUpdateError(null)
    setUpdateSuccess(false)

    try {
      if (!jobTitle.trim()) {
        throw new Error('Please provide a job title.')
      }

      const jobData = {
        jobTitle: jobTitle.trim(),
        company: company.trim(),
        location: location.trim(),
        jobType,
        description: description.trim(),
        status: 'draft'
      }

      const response = await fetch(`/api/careers/${careerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Save draft failed')
      }

      console.log('✅ Career saved as draft:', result)
      setUpdateSuccess(true)
      
      // Navigate back to careers list after successful save
      setTimeout(() => {
        router.push('/admin/career')
      }, 2000)
      
    } catch (error) {
      console.error('❌ Save draft failed:', error)
      setUpdateError(error instanceof Error ? error.message : 'Save draft failed')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleUpdate = async () => {
    setIsUpdating(true)
    setUpdateError(null)
    setUpdateSuccess(false)

    try {
      // Validation for publishing - all required fields
      if (!jobTitle.trim() || !company.trim() || !location.trim() || !description.trim()) {
        throw new Error('Please fill in all required fields: Job Title, Company, Location, and Description.')
      }

      const jobData = {
        jobTitle: jobTitle.trim(),
        company: company.trim(),
        location: location.trim(),
        jobType,
        description: description.trim(),
        status: 'published'
      }

      const response = await fetch(`/api/careers/${careerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Update failed')
      }

      console.log('✅ Career published successfully:', result)
      setUpdateSuccess(true)
      
      // Navigate back to careers list after successful update
      setTimeout(() => {
        router.push('/admin/career')
      }, 2000)
      
    } catch (error) {
      console.error('❌ Publish failed:', error)
      setUpdateError(error instanceof Error ? error.message : 'Publish failed')
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading career data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Job Posting</h1>
        
        {/* Job Title */}
        <div className="space-y-2">
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title *
          </label>
          <input
            type="text"
            id="jobTitle"
            placeholder="Enter job title (e.g., Software Engineer)"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full border-2 border-dashed border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company *
          </label>
          <input
            type="text"
            id="company"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border-2 border-dashed border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location *
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter job location (e.g., New York, NY or Remote)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border-2 border-dashed border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
            Job Type *
          </label>
          <select
            id="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value as 'Full Time' | 'Part Time' | 'Contract' | 'Internship')}
            className="w-full border-2 border-dashed border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
            required
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description *
          </label>
          <textarea
            id="description"
            placeholder="Enter detailed job description, responsibilities, and requirements..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            className="w-full border-2 border-dashed border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none resize-vertical"
            required
          />
        </div>

        {/* Status Messages */}
        {updateError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">❌ {updateError}</p>
          </div>
        )}

        {updateSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-600 text-sm">✅ Career updated successfully! Redirecting...</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button 
            className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={() => router.push('/admin/career')}
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handleSaveDraft}
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save Draft'}
          </button>
          <button 
            className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25"></circle>
                  <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </span>
            ) : (
              'Update & Publish'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}