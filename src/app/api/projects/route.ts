import { NextRequest, NextResponse } from 'next/server'
import { S3Service } from '@/lib/s3'
import { Project } from '@/utils/models'
import connectDB from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const formData = await request.formData()

    
    // Extract project data
    const projectData = {
      title: formData.get('title') as string,
      tagline: formData.get('tagline') as string,
      addTitle: formData.get('addTitle') as string,
      cards: JSON.parse(formData.get('cards') as string || '[]'),
      largeCard: JSON.parse(formData.get('largeCard') as string || '{}'),
      smallCards: JSON.parse(formData.get('smallCards') as string || '[]'),
      status: 'published'
    }
    
    // Validate required fields
    if (!projectData.title || !projectData.tagline || !projectData.addTitle) {
      return NextResponse.json(
        { error: 'Title, tagline, and addTitle are required' },
        { status: 400 }
      )
    }
    
    // Generate unique project ID for S3 folder organization
    const projectId = new Date().getTime().toString()
    
    // Extract files from form data
    const bannerFile = formData.get('bannerImage') as File
    const galleryFiles = formData.getAll('galleryImages') as File[]
    
    // Upload images to S3 using reusable function
    const uploadedImages = await S3Service.uploadImages(
      bannerFile,
      galleryFiles,
      'projects',
      projectId
    )
    
    // Create project document with S3 URLs
    const projectDoc = {
      ...projectData,
      images: uploadedImages,
      projectId: projectId
    }
    
    const project = new Project(projectDoc)
    await project.save()
    
    return NextResponse.json({
      success: true,
      project: project,
      message: 'Project uploaded successfully!'
    })
    
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create project' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')
    
    const projects = await Project.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
    
    const total = await Project.countDocuments({ status: 'published' })
    
    return NextResponse.json({
      success: true,
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

