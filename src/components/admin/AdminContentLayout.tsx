'use client'

import React from 'react'

interface AdminContentLayoutProps {
  title: string
  uploadLabel: string
  onUpload: () => void
  children: React.ReactNode
  className?: string
}

export default function AdminContentLayout({ 
  title, 
  uploadLabel, 
  onUpload, 
  children,
  className = ""
}: AdminContentLayoutProps) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-[24px] p-6 ">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-medium text-[var(--foreground)]">
            {title}
          </h1>
          <button
            onClick={onUpload}
            className="flex items-center space-x-2 bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity body-medium font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span>{uploadLabel}</span>
          </button>
        </div>

        {/* Content Area */}
        <div className={className}>
          {children}
        </div>
      </div>
    </div>
  )
}