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
    <div className={`flex items-center space-x-3 ${className}`}>
      <button
        onClick={onEdit}
        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 body-small font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <span>Edit</span>
      </button>
      
      <button
        onClick={onUnpublish}
        className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 body-small font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m-3-3L9 9" />
        </svg>
        <span>Unpublish</span>
      </button>
      
      <button
        onClick={onDelete}
        className="flex items-center space-x-1 text-red-600 hover:text-red-700 body-small font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span>Delete</span>
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
      
      <p className="body-small text-gray-600 line-clamp-2 mb-4">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium">AS</span>
          </div>
          <span>{author}</span>
          <span>•</span>
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