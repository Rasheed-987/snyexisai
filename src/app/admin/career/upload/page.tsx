'use client'

import React from 'react'
import Alert from '@/components/ui/Alert'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function CareersUploadPage() {
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState<string>('')
  const [company, setCompany] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [jobType, setJobType] = useState<'Full Time' | 'Part Time' | 'Contract' | 'Internship'>('Full Time')
  const [description, setDescription] = useState<string>('')
  const [isRouterMounted, setIsRouterMounted] = useState(false);

  // Add loading and error states
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  useEffect(() => {
    setIsRouterMounted(true);
  }, []);

  // Save as draft (only requires title)
  const onSaveDraft = async () => {
    if (!isRouterMounted) {
      console.error('NextRouter is not mounted.');
      return;
    }
    
    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(false)
    
    try {
      if (!jobTitle.trim()) {
        setUploadError('Please provide a job title.');
        setIsUploading(false)
        return;
      }
      
      const jobData = {
        jobTitle: jobTitle.trim(),
        company: company.trim(),
        location: location.trim(),
        jobType,
        description: description.trim(),
        status: 'draft'
      };

      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        setUploadSuccess(true)
        setTimeout(() => {
          router.push('/admin/career');
        }, 1000);
      } else {
        const errorData = await response.json();
        setUploadError(errorData.message || 'Failed to save job draft.');
      }
    } catch (error) {
      console.error('Error saving job draft:', error);
      setUploadError(error instanceof Error ? error.message : 'An error occurred while saving the job draft.');
    } finally {
      setIsUploading(false)
    }
  }

  // Publish (requires all required fields)
  const onPublish = async () => {
    if (!isRouterMounted) {
      console.error('NextRouter is not mounted.');
      return;
    }
    
    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(false)
    
    try {
      if (!jobTitle.trim() || !company.trim() || !location.trim() || !description.trim() || !jobType.trim()  ) {
        setUploadError('Please fill in all required fields: Job Title, Company, Location, and Description.');
        setIsUploading(false)
        return;
      }

      const jobData = {
        jobTitle: jobTitle.trim(),
        company: company.trim(),
        location: location.trim(),
        jobType,
        description: description.trim(),
        status: 'published'
      };

      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        setUploadSuccess(true)
        setTimeout(() => {
          router.push('/admin/career');
        }, 1000);
      } else {
        const errorData = await response.json();
        setUploadError(errorData.message || 'Failed to publish job.');
      }
    } catch (error) {
      console.error('Error publishing job:', error);
      setUploadError(error instanceof Error ? error.message : 'An error occurred while publishing the job.');
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Job Posting</h1>
        
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
        {uploadError && (
          <div className="mb-4">
            <Alert type="error" message={uploadError} onClose={() => setUploadError(null)} />
          </div>
        )}
        {uploadSuccess && (
          <div className="mb-4">
            <Alert type="success" message="Job saved successfully! Redirecting..." onClose={() => setUploadSuccess(false)} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button 
            className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={() => router.push('/admin/career')}
            disabled={isUploading}
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={onSaveDraft}
            disabled={isUploading}
          >
            {isUploading ? 'Saving...' : 'Save Draft'}
          </button>
          <button 
            className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={onPublish}
            disabled={isUploading}
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25"></circle>
                  <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </span>
            ) : (
              'Publish'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}