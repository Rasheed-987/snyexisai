'use client'

import React from 'react'

import Image from 'next/image'
import { MapPin, Building, Clock } from "lucide-react"
import {
  ActionButtonsProps,
  CaseStudyCardProps,
  JobCardProps,
  ProjectCardProps,
  ServiceCardProps,
} from '@/types/admin'

export function ActionButtons({
  onEdit,
  onUnpublish,
  onDelete,
  className = '',
  status = 'published',
}: ActionButtonsProps) {
  const isDraft = status === 'draft'
  
  return (
    <div
      className={`flex items-center bg-white rounded-[26px] justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4  p-2 sm:p-3 2xl:p-4 ${className}`}
    >
      {/* First Button - Always Edit */}
      <button
        onClick={onEdit}
        className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
        title="Edit"
      >
        <Image
          src="/images/admin/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        />
        <span className="text-xs 2xl:text-sm font-medium">Edit</span>
      </button>

      {/* Divider */}
      <div className="w-px h-3 sm:h-4 bg-gray-300"></div>

      {/* Second Button - Publish for draft, Unpublish for published */}
      <button
        onClick={onUnpublish}
        className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
        title={isDraft ? 'Publish this draft' : 'Unpublish this item'}
      >
        {isDraft ? (
          <svg 
            className="w-3.5 h-3.5 sm:w-4 sm:h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <Image
            src="/images/admin/unpublish.svg"
            alt="Unpublish"
            width={14}
            height={14}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
          />
        )}
        <span className="text-xs 2xl:text-sm font-medium">{isDraft ? 'Publish' : 'Unpublish'}</span>
      </button>

      {/* Divider */}
      <div className="w-px h-3 sm:h-4 bg-gray-300"></div>

      {/* Delete Button - Always present */}
      <button
        onClick={onDelete}
        className="group flex items-center space-x-1 text-primary hover:text-red-500 transition-colors"
      >
        <div className="relative">
          <Image
            src="/images/admin/delete.svg"
            alt="Delete"
            width={14}
            height={14}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:opacity-0 transition-opacity duration-200"
          />
          <svg 
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </div>
        <span className="text-xs 2xl:text-sm font-medium">Delete</span>
      </button>
    </div>
  )
}

export function ProjectCard({
  title,
  description,
  author,
  timeAgo,
  thumbnail,
  status,
  onEdit,
  onUnpublish,
  onDelete,
}: ProjectCardProps) {
  return (
    <div className="bg-[#F5F5F5] rounded-[21px] p-4 2xl:p-6">
      <div className="mb-4">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-[17px]"
        />
      </div>

      <div className="flex items-center justify-between mb-2">
        <h3 className="body-medium 2xl:text-xl font-semibold text-foreground">{title}</h3>
        <span className={`text-xs 2xl:text-sm px-2 py-1 rounded-full ${
          status === 'draft' 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {status === 'draft' ? 'Draft' : 'Published'}
        </span>
      </div>

      <p className="body-small 2xl:text-base text-foreground line-clamp-2 mb-4">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs 2xl:text-sm text-foreground">
          <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center relative justify-center">
            <Image src="/images/admin/profile.png" alt="Author" fill className="w-3 h-3" />
          </div>
          <span>{author}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{timeAgo}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <ActionButtons onEdit={onEdit} onUnpublish={onUnpublish} onDelete={onDelete} status={status} />
      </div>
    </div>
  )
}

export function ServiceCard({
  title,
  description,
  author,
  timeAgo,
  thumbnail,
  status,
  onEdit,
  onUnpublish,
  onDelete,
}: ServiceCardProps) {
  return (
    <div className="bg-gray-50 rounded-[24px] p-4 2xl:p-6">
      <div className="mb-4">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-[17px]"
        />
      </div>

      <div className="flex items-center justify-between mb-2">
        <h3 className="body-medium 2xl:text-xl font-semibold text-foreground">{title}</h3>
        <span className={`text-xs 2xl:text-sm px-2 py-1 rounded-full ${
          status === 'draft' 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {status === 'draft' ? 'Draft' : 'Published'}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <ActionButtons onEdit={onEdit} onUnpublish={onUnpublish} onDelete={onDelete} status={status} />
      </div>
    </div>
  )
}

export function CaseStudyCard({
  title,
  description,
  author,
  timeAgo,
  thumbnail,
  className = '',
  onEdit,
  onUnpublish,
  onDelete,
  status
}: CaseStudyCardProps) {
  return (
    <div className={`flex flex-col bg-[#F5F5F5] sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 2xl:p-6 rounded-[21px] border border-gray-100 ${className}`}>
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-full sm:w-auto">
        <Image
          src={thumbnail}
          alt={title}
          width={120}
          height={80}
          className="w-full w-35 md:w-40 h-[90px]  object-cover rounded-[12px]"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg 2xl:text-2xl font-medium text-foreground mb-2 line-clamp-1">
          {title}
        </h3>

        <p className="text-sm 2xl:text-lg text-foreground line-clamp-2 mb-3">{description}</p>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 text-sm 2xl:text-base text-foreground">
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
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="whitespace-nowrap">{timeAgo}</span>
          </div>
        </div>
      </div>
<div>
   
</div>
      {/* Action Buttons */}
      <div className="flex-shrink-0 flex flex-col items-center gap-2 mt-3 sm:mt-0">
        <span className={`text-xs 2xl:text-sm px-2 py-1 rounded-full whitespace-nowrap ${
          status === 'draft' 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {status === 'draft' ? 'Draft' : 'Published'}
        </span>
       
        <ActionButtons
          onEdit={onEdit}
          onUnpublish={onUnpublish}
          onDelete={onDelete}
          className="w-full sm:w-auto justify-center sm:justify-start"
          status={status}
        />
      </div>
    </div>
  )
}

export function JobCard({ id,jobTitle, location, company, jobType, description, status, onEdit,
  onUnpublish,
  onDelete, className = "" }: JobCardProps) {


 const truncate = (text: string, max = 120) => {
    if (!text) return ''
    if (text.length <= max) return text
    const truncated = text.slice(0, max)
    const lastSpace = truncated.lastIndexOf(' ')
    return `${truncated.slice(0, lastSpace > 0 ? lastSpace : max).trim()}...`
  }

  return (
     <div
      className={`bg-[#ECEFF3] border border-gray-200 rounded-[15px] p-6 2xl:p-8 shadow-sm h-[350px] 2xl:h-[450px] flex flex-col ${className}`}
    >
      {/* Job Number and Status Badge */}
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm 2xl:text-base text-gray-500">({id})</div>
        {status && (
          <span className={`text-xs 2xl:text-sm px-2 py-1 rounded-full ${
            status === 'draft' 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {status === 'draft' ? 'Draft' : 'Published'}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl 2xl:text-2xl font-medium text-foreground mb-3 line-clamp-2">
        {jobTitle}
      </h2>

      {/* Job Info */}
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center gap-2 text-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm 2xl:text-base truncate">
            {location}
          </span>
        </div>
        <div className="flex items-center gap-2 text-foreground">
          <Building className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm 2xl:text-base truncate">
            {company}
          </span>
        </div>
        <div className="flex items-center gap-2 text-foreground">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm 2xl:text-base">{jobType}</span>
        </div>
      </div>

      {/* About Section - This will grow to fill available space */}
      <div className="flex-1 flex flex-col min-h-0">
        <h4 className="font-medium text-foreground mb-1 text-sm 2xl:text-lg">
          About this Role
        </h4>
        <p className="text-foreground text-xs sm:text-sm 2xl:text-base leading-relaxed flex-1 line-clamp-4">
          {truncate(description, 110)}
        </p>
      </div>

      {/* Action Buttons - Always at bottom */}
      <div className="mt-4 pt-3 border-t border-gray-300">
        <ActionButtons
          onEdit={onEdit}
          onUnpublish={onUnpublish}
          onDelete={onDelete}
          status={status}
          className="justify-center"
        />
      </div>
  
    </div>
  )
}
