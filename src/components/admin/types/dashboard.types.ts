import { ReactNode } from 'react';

// JobApplication Types
export interface JobApplication {
  id: number;
  name: string;
  position: string;
  profileImage: string;
}

export interface JobApplicationCardProps {
  application: JobApplication;
  onView: (id: string) => void;
}

// Stats Types
export interface Stat {
  title: string;
  subtitle: string;
  icon: ReactNode;
  bgColor: string;
  textColor: string;
}

// Case Study Types
export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  timeAgo: string;
  thumbnail: string;
}