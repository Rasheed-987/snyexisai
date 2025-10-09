'use client'

import React from 'react'

import Image from 'next/image'

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
}: ActionButtonsProps) {
  return (
    <div
      className={`flex items-center bg-white rounded-[26px] justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4  p-2 sm:p-3  ${className}`}
    >
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

export function ProjectCard({
  title,
  description,
  author,
  timeAgo,
  thumbnail,
  onEdit,
  onUnpublish,
  onDelete,
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

      <h3 className="body-medium font-semibold text-[var(--foreground)] mb-2">{title}</h3>

      <p className="body-small text-gray-600 line-clamp-2 mb-4">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
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
        <ActionButtons onEdit={onEdit} onUnpublish={onUnpublish} onDelete={onDelete} />
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
  onEdit,
  onUnpublish,
  onDelete,
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

      <h3 className="body-medium font-semibold text-[var(--foreground)] mb-2">{title}</h3>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <ActionButtons onEdit={onEdit} onUnpublish={onUnpublish} onDelete={onDelete} />
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
}: CaseStudyCardProps) {
  return (
    <div className={`flex flex-col bg-[#F5F5F5] sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 sm:p-4 rounded-[21px] border border-gray-100 ${className}`}>
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
        <h3 className="text-base sm:text-lg font-semibold text-[#0F1C3D] mb-2 line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>

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

export function JobCard({ jobTitle, location, company, jobType, description }: JobCardProps) {
  return (
    <div className="bg-[#F9FAFB] rounded-2xl p-6 sm:p-8 max-w-md mx-auto text-[#0F1C3D] font-inter">
      {/* Job Number */}
      <div className="text-sm text-gray-500 mb-2">(01)</div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">{jobTitle}</h2>

      {/* Location */}
      <div className="flex items-center text-gray-600 mb-3">
        <svg
          className="w-5 h-5 mr-3 text-[#0F1C3D]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>{location}</span>
      </div>

      {/* Company */}
      <div className="flex items-center text-gray-600 mb-3">
        <svg
          className="w-5 h-5 mr-3 text-[#0F1C3D]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5"
          />
        </svg>
        <span>{company}</span>
      </div>

      {/* Job Type */}
      <div className="flex items-center text-gray-600 mb-6">
        <svg
          className="w-5 h-5 mr-3 text-[#0F1C3D]"
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
        <span>{jobType}</span>
      </div>

      {/* About this Role */}
      <h4 className="font-semibold mb-2 text-lg">About this Role</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
