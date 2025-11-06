
import mongoose, { Schema, Document, Model } from 'mongoose'
import { IProject,ICaseStudy,IServices, ICareer, IAdmin } from '@/types/modelType'


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
  descriptionText: { type: String, required: true },
  requirements: [{ type: String }],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, {
  timestamps: true
})

const CaseStudySchema = new Schema<ICaseStudy>({
  caseStudyId: { type: String, required: true, unique: true },
  caseTitle: { type: String, required: true },
  subtitle: { type: String, required: true },
  leftTextBox: { type: String, required: true },
  requirements: [{ type: String }],
  largeCard: {
    title: { type: String, required: true },
    body: { type: String, required: true }
  },
  smallCardsA: [{
    title: { type: String, required: true },
    body: { type: String, required: true }
  }],
  smallCardsB: [{
    title: { type: String, required: true },
    body: { type: String, required: true }
  }],
  bodyTextTop: { type: String, required: true },
  bodyTextMiddle: { type: String, required: true },
  bodyTextBottom: { type: String, required: true },
  images: {
    banner: { type: String },
    gallery: [{ type: String }]
  },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, {
  timestamps: true
})

const ServiceSchema = new Schema<IServices>({
  serviceId: { type: String, required: true, unique: true },
  serviceTitle: { type: String, required: true },
  images: {
    banner: { type: String },
    gallery: [{ type: String }]
  },
  requirements: [{ type: String }],
  requirementsTitle: { type: String },
  description: { type: String },
  largeCard: {
    title: { type: String },
    body: { type: String }
  },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
},
{
  timestamps: true
}
)

const CareerSchema = new Schema<ICareer>({
  careerId: { type: String, required: true, unique: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, enum: ['Full Time', 'Part Time', 'Contract', 'Internship'], required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  responsibilities: [{ title: String, body: String }],
  deadline: { type: Date },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
},
{
  timestamps: true
}
)

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},
{
  timestamps: true
})

// Export models with cache clearing for Services to ensure schema updates are applied
export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
export const CaseStudy = mongoose.models.CaseStudy || mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema)

// Force refresh Services model to pick up schema changes
if (mongoose.models.Services) {
  delete mongoose.models.Services;
}
export const Services = mongoose.model<IServices>('Services', ServiceSchema)

export const Career = mongoose.models.Career || mongoose.model<ICareer>('Career', CareerSchema)
export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema)