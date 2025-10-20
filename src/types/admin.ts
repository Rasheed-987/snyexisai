
export interface Stat {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}


export interface JobApplication {
  id: number;
  name: string;
  position: string;
  profileImage?: string; // Make optional since we won't use it
}

// New interface for career data in dashboard
export interface CareerPosting {
  id: string;
  jobTitle: string;
  jobType: string;
  company: string;
}

export interface JobApplicationCardProps {
  application: JobApplication;
  onView?: (id: string) => void;
  className?: string;
}

// New props for career card
export interface CareerCardProps {
  career: CareerPosting;
  onView?: (id: string) => void;
  className?: string;
}



export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  author: string;
  authorImage?: string;
  timeAgo: string;
  thumbnail: string;
}

// Case Study Card Types
export interface CaseStudyCardProps {
  id: string
  title: string
  description: string
  author: string
  timeAgo: string
  thumbnail: string
  className?: string
  status: 'draft' | 'published' // Add status field
  onEdit: () => void
  onUnpublish: () => void
  onDelete: () => void
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
  className?: string
  status?: 'draft' | 'published' // Add status field
  requirements?: string[]
  responsibilities?: string[]
  deadline?: Date
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
  status?: 'draft' | 'published' // Add status for conditional rendering
}

// Project Card Types
export interface ProjectCardProps {
  id: string
  title: string
  description: string
  author: string
  timeAgo: string
  thumbnail: string
  status: 'draft' | 'published' // Add status field
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
  status?: 'draft' | 'published' // Add status field (optional for backward compatibility)
  onEdit: () => void
  onUnpublish: () => void
  onDelete: () => void
}
