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
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
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
    <div className="bg-gray-50 rounded-[24px] p-4">
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
    <div className="flex flex-col bg-[#F5F5F5] sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 rounded-[21px] border border-gray-100">
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-full sm:w-auto">
        <Image
          src={thumbnail}
          alt={title}
          width={120}
          height={80}
          className="w-full sm:w-20 md:w-24 h-24 sm:h-16 md:h-20 object-cover rounded-[12px]"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-semibold text-[#0F1C3D] mb-2 line-clamp-1">
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src="/images/admin/profile.png" 
                alt="Author" 
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="truncate">{author}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="whitespace-nowrap">{timeAgo}</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex-shrink-0 w-full sm:w-auto mt-3 sm:mt-0">
        <ActionButtons 
          onEdit={onEdit}
          onUnpublish={onUnpublish}
          onDelete={onDelete}
          className="w-full sm:w-auto justify-center sm:justify-start"
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
    <div className="bg-white rounded-[21px] p-6 lg:p-8 border border-gray-100 shadow-sm max-w-lg mx-auto lg:mx-0">
      {/* Job Number */}
      <div className="text-sm text-gray-500 mb-3 font-medium">
        (01)
      </div>
      
      {/* Job Title */}
      <h3 className="text-2xl lg:text-3xl font-bold text-[#0F1C3D] mb-6 leading-tight">
        {jobTitle}
      </h3>
      
      {/* Job Details */}
      <div className="space-y-4 mb-6">
        {/* Location */}
        <div className="flex items-center space-x-3 text-gray-600">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>
            {location}
            {isRemote && <span className="text-blue-600 font-medium ml-1">(Remote)</span>}
          </span>
        </div>
        
        {/* Company */}
        <div className="flex items-center space-x-3 text-gray-600">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>{company}</span>
        </div>
        
        {/* Job Type */}
        <div className="flex items-center space-x-3 text-gray-600">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{jobType}</span>
        </div>
      </div>

      {/* About this Role */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-[#0F1C3D] mb-3">
          About this Role
        </h4>
        <p className="text-gray-600 leading-relaxed line-clamp-4">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mb-6">
        <ActionButtons 
          onEdit={onEdit}
          onUnpublish={onUnpublish}
          onDelete={onDelete}
        />
      </div>

      {/* Additional Details */}
      {(salary || experience || department) && (
        <div className="space-y-3 mb-6">
          {salary && (
            <div className="flex items-center space-x-3 text-gray-600">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span>{salary}</span>
            </div>
          )}
          
          {experience && (
            <div className="flex items-center space-x-3 text-gray-600">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span>{experience}</span>
            </div>
          )}
          
          {department && (
            <div className="flex items-center space-x-3 text-gray-600">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{department}</span>
            </div>
          )}
        </div>
      )}

      {/* Requirements */}
      {requirements && requirements.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-[#0F1C3D] mb-3">
            Requirements
          </h4>
          <ul className="space-y-2">
            {requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-600 leading-relaxed">{req}</span>
              </li>
            ))}
            {requirements.length > 3 && (
              <li className="text-gray-500 ml-6">
                +{requirements.length - 3} more requirements
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-gray-200 text-sm text-gray-500 space-y-1">
        <div>Posted {postedDate}</div>
        {applicationDeadline && (
          <div>Deadline: {applicationDeadline}</div>
        )}
      </div>
    </div>
  )
}