import React from 'react'
import { CareerCardProps } from '@/types/admin'

export function CareerCard({ career, onView, className = '' }: CareerCardProps) {
  return (
    <div className={`flex items-center justify-between p-3 bg-muted rounded-[12px] transition-colors ${className}`}>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-foreground mb-1">
          {career.jobTitle}
        </h3>
        <p className="text-xs text-gray-600">
          {career.jobType}
        </p>
      </div>
      <button
        onClick={() => onView?.(career.id)}
        className="text-primary text-sm font-medium hover:underline"
      >
        View
      </button>
    </div>
  )
}