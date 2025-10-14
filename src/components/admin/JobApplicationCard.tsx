import React from 'react'
import { JobApplicationCardProps } from '@/types/admin'

export function JobApplicationCard({ application, onView, className = '' }: JobApplicationCardProps) {
  return (
    <div className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg  ${className}`}>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-[#0F1C3D] mb-1">
          {application.name}
        </h3>
        <p className="text-xs text-gray-600">
          {application.position}
        </p>
      </div>
      <button
        onClick={() => onView?.(application.id.toString())}
        className="text-[#327AED] text-sm font-medium hover:underline"
      >
        View
      </button>
    </div>
  )
}