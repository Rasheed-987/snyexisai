'use client'

import React from 'react'
import Image from 'next/image'

interface ActionButtonsProps {
  onEdit: () => void
  onUnpublish: () => void
  onDelete: () => void
  className?: string
}

export function ActionButtons({ onEdit, onUnpublish, onDelete, className = "" }: ActionButtonsProps) {
  return (
    <div className={`flex items-center bg-white rounded-[26px] justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4  p-2 sm:p-3  ${className}`}>
      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors"
      >
        <Image
          src="/images/admin/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        />
        <span className="text-xs font-medium">Edit</span>
      </button>
      
      {/* Divider */}
      <div className="w-px h-3 sm:h-4 bg-gray-300"></div>
      
      {/* Unpublish Button */}
      <button
        onClick={onUnpublish}
        className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors"
      >
        <Image
          src="/images/admin/unpublish.svg"
          alt="Unpublish"
          width={14}
          height={14}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        />
        <span className="text-xs font-medium">Unpublish</span>
      </button>
      
      {/* Divider */}
      <div className="w-px h-3 sm:h-4 bg-gray-300"></div>
      
      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="flex items-center space-x-1 text-blue-500 hover:text-red-500 transition-colors"
      >
        <Image
          src="/images/admin/delete.svg"
          alt="Delete"
          width={14}
          height={14}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        />
        <span className="text-xs font-medium">Delete</span>
      </button>
    </div>
  )
}

interface ProjectCardProps {
  id: string
  title: string
  description: string
  author: string
  timeAgo: string
  thumbnail: string
  onEdit: () => void
  onUnpublish: () => void
  onDelete: () => void
}

export function ProjectCard({ 
  title, 
  description, 
  author, 
  timeAgo, 
  thumbnail,
  onEdit,
  onUnpublish,
  onDelete 
}: ProjectCardProps) {
  return (
    <div className="bg-[#F5F5F5] rounded-[21px] p-4">
      <div className="mb-4">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-[17px]"
        />
      </div>
      
      <h3 className="body-medium font-semibold text-[var(--foreground)] mb-2">
        {title}
      </h3>
      
      <p className="body-small text-gray-600 line-clamp-2 mb-4">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center relative justify-center">
            <Image src="/images/admin/profile.png" alt="Author" fill className="w-3 h-3" />
          </div>
          <span>{author}</span>
          <span></span>
          <span>{timeAgo}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <ActionButtons 
          onEdit={onEdit}
          onUnpublish={onUnpublish}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

interface ServiceCardProps {
  id: string
  title: string
  description: string
  author: string
  timeAgo: string
  thumbnail: string
  onEdit: () => void
  onUnpublish: () => void
  onDelete: () => void
}

export function ServiceCard({ 
  title, 
  description, 
  author, 
  timeAgo, 
  thumbnail,
  onEdit,
  onUnpublish,
  onDelete 
}: ServiceCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="mb-4">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      
      <h3 className="body-medium font-semibold text-[var(--foreground)] mb-2">
        {title}
      </h3>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <ActionButtons 
          onEdit={onEdit}
          onUnpublish={onUnpublish}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

interface CaseStudyCardProps {
  id: string
  title: string
  description: string
  author: string
  timeAgo: string
  thumbnail: string
  onEdit: () => void
  onUnpublish: () => void
  onDelete: () => void
}

export function CaseStudyCard({ 
  title, 
  description, 
  author, 
  timeAgo, 
  thumbnail,
  onEdit,
  onUnpublish,
  onDelete 
}: CaseStudyCardProps) {
  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0">
        <Image
          src={thumbnail}
          alt={title}
          width={120}
          height={80}
          className="w-30 h-20 object-cover rounded-lg"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="body-medium font-semibold text-[var(--foreground)] mb-2">
          {title}
        </h3>
        
        <p className="body-small text-gray-600 line-clamp-2 mb-3">
          {description}
        </p>
        
        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">AS</span>
            </div>
            <span>{author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{timeAgo}</span>
          </div>
        </div>
        
        <ActionButtons 
          onEdit={onEdit}
          onUnpublish={onUnpublish}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

interface JobCardProps {
  id: string
  jobTitle: string
  company: string
  location: string
  jobType: 'Full Time' | 'Part Time' | 'Contract' | 'Internship'
  description: string
  postedDate: string
  salary?: string
  experience?: string
  department?: string
  applicationDeadline?: string
  isRemote?: boolean
  requirements?: string[]
  benefits?: string[]
  onEdit: () => void
  onUnpublish: () => void
  onDelete: () => void
}

export function JobCard({ 
  jobTitle,
  company,
  location,
  jobType,
  description,
  postedDate,
  salary,
  experience,
  department,
  applicationDeadline,
  isRemote,
  requirements,
  benefits,
  onEdit,
  onUnpublish,
  onDelete 
}: JobCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* Job Header */}
      <div className="mb-4">
        <h3 className="heading-small text-[var(--foreground)] mb-2">
          {jobTitle}
        </h3>
        
        {/* Company and Location */}
        <div className="flex items-center space-x-4 text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="body-small">{company}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="body-small">{location}</span>
            {isRemote && <span className="text-blue-600 body-small font-medium">(Remote)</span>}
          </div>
        </div>

        {/* Job Type and Details */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="body-small text-gray-600">{jobType}</span>
          </div>
          
          {salary && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span className="body-small text-gray-600">{salary}</span>
            </div>
          )}
          
          {experience && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="body-small text-gray-600">{experience}</span>
            </div>
          )}
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-4">
        <h4 className="body-medium font-semibold text-[var(--foreground)] mb-2">About this Role</h4>
        <p className="body-small text-gray-600 line-clamp-3 mb-3">
          {description}
        </p>
      </div>

      {/* Requirements */}
      {requirements && requirements.length > 0 && (
        <div className="mb-4">
          <h4 className="body-medium font-semibold text-[var(--foreground)] mb-2">Requirements</h4>
          <ul className="space-y-1">
            {requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span className="body-small text-gray-600">{req}</span>
              </li>
            ))}
            {requirements.length > 3 && (
              <li className="body-small text-gray-500">+{requirements.length - 3} more requirements</li>
            )}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span>Posted {postedDate}</span>
          {applicationDeadline && <span>• Deadline: {applicationDeadline}</span>}
        </div>
      </div>
      
      <div className="mt-4">
        <ActionButtons 
          onEdit={onEdit}
          onUnpublish={onUnpublish}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}