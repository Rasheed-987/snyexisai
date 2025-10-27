import mongoose, { Document} from 'mongoose'



export interface ICaseStudy extends Document {
  caseStudyId: string
  caseTitle: string
  subtitle: string
  leftTextBox: string
  requirements: string[]
  largeCard: {
    title: string
    body: string
  }
  smallCardsA: Array<{
    title: string
    body: string
  }>
  smallCardsB: Array<{
    title: string
    body: string
  }>
  bodyTextTop: string
  bodyTextMiddle: string
  bodyTextBottom: string
  images:{
    banner?: string // Main banner image S3 URL
    gallery: string[] // Additional gallery images S3 URLs
  }
  status: 'draft' | 'published' | 'archived'
  createdAt: Date
  updatedAt: Date
  }

  
// Enhanced Project Model to match your upload page structure
export interface IProject extends Document {
  projectId: string
  title: string
  tagline: string
  addTitle: string
  
  // Images with specific purposes
  images: {
    banner?: string // Main banner image S3 URL
    gallery: string[] // Additional gallery images S3 URLs
  }
  
  // Grid cards (6 cards from your upload page)
  cards: Array<{
    title: string
    body: string
  }>
  
  // Large content card
  largeCard: {
    title: string
    body: string
  }
  
  // Small cards pair
  smallCards: Array<{
    title: string
    body: string
  }>
  descriptionText: string
   requirements: string[]
 
  status: 'draft' | 'published' | 'archived'
  createdAt: Date
  updatedAt: Date
}

export interface IServices extends Document {
  serviceId: string,
  serviceTitle: string,
  images: {
    banner?: string,
    gallery?: string[]
  },
  requirements: string[],
  status: 'draft' | 'published' | 'archived'
  createdAt: Date
  updatedAt: Date
}

export interface ICareer extends Document {
  careerId: string
  jobTitle: string
  company: string
  location: string
  jobType: 'Full Time' | 'Part Time' | 'Contract' | 'Internship'
  description: string
  responsibilities: Array<{
    title: string
    body: string
  }>
  requirements: string[]
  deadline?: Date
  status: 'draft' | 'published' | 'archived'
  createdAt: Date
  updatedAt: Date
}

export interface IAdmin extends Document {
  username: string
  password: string
  createdAt: Date
  updatedAt: Date
}