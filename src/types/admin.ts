// Admin Dashboard Types
export interface JobApplication {
  id: string
  name: string
  email: string
  position: string
  appliedDate: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  profileImage?: string
}

export interface Stat {
  icon: React.ReactNode
  value: string
  label: string
  trend?: 'up' | 'down'
  percentage?: string
}

export interface CaseStudy {
  id: string
  title: string
  client: string
  category: string
  image: string
  description: string
  completedDate: string
  tags: string[]
}

// Upload Types
export interface ImageSlot {
  id: string
  file: File | null
  previewUrl: string | null
}

// Job Card Types
export interface JobCardProps {
  id?: string
  jobTitle: string
  company: string
  location: string
  jobType: 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | string
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

// Action Buttons Types
export interface ActionButtonsProps {
  onEdit: () => void
  onUnpublish: () => void
  onDelete: () => void
  className?: string
}

// Project Card Types
export interface ProjectCardProps {
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

// Service Card Types
export interface ServiceCardProps {
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

// Case Study Card Types
export interface CaseStudyCardProps {
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