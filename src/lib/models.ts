import mongoose, { Document, Schema } from 'mongoose'

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
  
 
  status: 'draft' | 'published' | 'archived'
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>({
  projectId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  addTitle: { type: String, required: true },
  
  images: {
    banner: { type: String },
    gallery: [{ type: String }]
  },
  
  cards: [{
    title: { type: String, required: true },
    body: { type: String, required: true }
  }],
  
  largeCard: {
    title: { type: String, required: true },
    body: { type: String, required: true }
  },
  
  smallCards: [{
    title: { type: String, required: true },
    body: { type: String, required: true }
  }],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, {
  timestamps: true
})

// Export models
export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)