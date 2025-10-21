import { NextRequest, NextResponse } from 'next/server'
import { S3Service } from '@/lib/s3'
import { Project } from '@/utils/models'
import connectDB from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const formData = await request.formData()

    // helper to read string or blob values from formData
    const readFormValue = async (key: string) => {
      const v = formData.get(key)
      if (!v) return ''
      // If a Blob/File was appended by mistake, read text
      if (v instanceof Blob) return await v.text()
      return String(v)
    }

    // Extract project data
    const status = (String(formData.get('status') || 'published'))
    const projectData = {
      title: String(formData.get('title') || ''),
      tagline: String(formData.get('tagline') || ''),
      addTitle: String(formData.get('addTitle') || ''),
      cards: JSON.parse(String(formData.get('cards') || '[]')),
      largeCard: JSON.parse(String(formData.get('largeCard') || '{}')),
      smallCards: JSON.parse(String(formData.get('smallCards') || '[]')),
      descriptionText: await readFormValue('descriptionText'),
      requirements: JSON.parse(String(formData.get('requirements') || '[]')),
      status: status as 'published' | 'draft'
    }

    // Different validation rules for drafts vs published
    if (status === 'published') {
      // Published projects require all fields
      if (!projectData.title || !projectData.tagline || !projectData.addTitle) {
        return NextResponse.json(
          { error: 'Title, tagline, and addTitle are required for published projects' },
          { status: 400 }
        )
      }
    } else if (status === 'draft') {
      // Drafts only need a title to be identifiable
      if (!projectData.title) {
        return NextResponse.json(
          { error: 'Title is required to save draft' },
          { status: 400 }
        )
      }
    }
    
    // Generate unique project ID for S3 folder organization
    const projectId = new Date().getTime().toString()
    
    // Extract files from form data
    const bannerFile = formData.get('bannerImage') as File
    const galleryFiles = formData.getAll('galleryImages') as File[]
    
    // Check if we have valid files
    const hasValidBanner = bannerFile && bannerFile.size > 0
    const hasValidGallery = galleryFiles.some(file => file && file.size > 0)
    
    let uploadedImages: { banner?: string; gallery: string[] } = { gallery: [] }
    
    // Handle image uploads
    if (hasValidBanner || hasValidGallery) {
      // Upload images to S3
      uploadedImages = await S3Service.uploadImages(
        hasValidBanner ? bannerFile : null,
        hasValidGallery ? galleryFiles.filter(file => file && file.size > 0) : [],
        'projects',
        projectId
      )
    } else if (status === 'published') {
      // Published projects must have at least a banner image
      return NextResponse.json(
        { error: 'At least a banner image is required for published projects' },
        { status: 400 }
      )
    }
    
    // Create project document with S3 URLs
    const projectDoc = {
      projectId: projectId,
      title: projectData.title,
      tagline: projectData.tagline || '',
      addTitle: projectData.addTitle || '',
      images: uploadedImages,
      cards: projectData.cards.length > 0 ? projectData.cards : [
        { title: '', body: '' }, { title: '', body: '' }, { title: '', body: '' },
        { title: '', body: '' }, { title: '', body: '' }, { title: '', body: '' }
      ],
      largeCard: projectData.largeCard.title ? projectData.largeCard : { title: '', body: '' },
      smallCards: projectData.smallCards.length > 0 ? projectData.smallCards : [
        { title: '', body: '' }, { title: '', body: '' }
        
      ],
      descriptionText: projectData.descriptionText || '',
      requirements: Array.isArray(projectData.requirements) ? projectData.requirements : [],
      status: status as 'published' | 'draft'
    }

    const project = new Project(projectDoc)
    
    // For drafts, skip validation to allow empty fields
    if (status === 'draft') {
      await project.save({ validateBeforeSave: false })
    } else {
      await project.save()
    }
    
    return NextResponse.json({
      success: true,
      project: project,
      message: status === 'draft' 
        ? 'Draft saved successfully!' 
        : 'Project published successfully!'
    })
    
  } catch (error) {
    console.error('❌ Project validation failed:', error)
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
    const status = searchParams.get('status') // 'draft', 'published', or null
    
    // Build query based on parameters
    let query: any = {}
    
    if (status) {
      query.status = status
    }

    const projects = await Project.find(query)
      .sort({ updatedAt: -1 }) // Show recently updated first (good for drafts)
      .limit(limit)
      .skip((page - 1) * limit)
    
    const total = await Project.countDocuments(query)
    
    // Always provide status counts when returning all projects
    const response: any = {
      success: true,
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
    
    // Add status counts for better frontend handling
    if (!status) {
      // Only add counts when showing all projects (not filtered by status)
      const draftCount = await Project.countDocuments({ status: 'draft' })
      const publishedCount = await Project.countDocuments({ status: 'published' })
      
      response.statusCounts = {
        draft: draftCount,
        published: publishedCount,
        total: draftCount + publishedCount
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

