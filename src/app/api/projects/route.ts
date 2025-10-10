import { NextRequest, NextResponse } from 'next/server'
import { S3Service } from '@/lib/s3'
import { Project } from '@/lib/models'
import connectDB from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    console.log('✅ Database connected')
    
    const formData = await request.formData()
    console.log('📝 Form data extracted')
    
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
    
    const uploadedImages: { banner?: string; gallery: string[] } = { gallery: [] }
    
    // Upload banner image if exists
    if (bannerFile && bannerFile.size > 0) {
      console.log('📁 Processing banner file:', {
        name: bannerFile.name,
        size: bannerFile.size,
        type: bannerFile.type
      })
      
      const bannerKey = S3Service.generateKey(bannerFile.name, `projects/${projectId}`)
      console.log('🔑 Generated S3 key:', bannerKey)
      
      const bannerUpload = await S3Service.getPresignedUploadUrl(bannerKey, bannerFile.type)
      console.log('📝 Presigned URL generated:', {
        key: bannerUpload.key,
        fileUrl: bannerUpload.fileUrl
      })
      
      // Actually upload the file to S3 using presigned URL
      console.log('🔄 Starting S3 upload...')
      console.log('📁 File details:', {
        name: bannerFile.name,
        size: bannerFile.size,
        type: bannerFile.type
      })
      
      const uploadResponse = await fetch(bannerUpload.uploadUrl, {
        method: 'PUT',
        body: bannerFile,
        // Try without explicit Content-Type header first
      })
      
      console.log('🔍 Upload response status:', uploadResponse.status)
      console.log('🔍 Upload response statusText:', uploadResponse.statusText)
      
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        console.error('❌ S3 Upload failed:', {
          status: uploadResponse.status,
          statusText: uploadResponse.statusText,
          error: errorText,
          uploadUrl: bannerUpload.uploadUrl
        })
        throw new Error(`Failed to upload banner image: ${uploadResponse.status} ${uploadResponse.statusText} - ${errorText}`)
      }
      
      console.log(`✅ Banner uploaded successfully to: ${bannerUpload.fileUrl}`)
      
      // Only save to database AFTER successful S3 upload
      uploadedImages.banner = bannerUpload.fileUrl
    }
    
    // Upload gallery images if any
    for (const file of galleryFiles) {
      if (file && file.size > 0) {
        const galleryKey = S3Service.generateKey(file.name, `projects/${projectId}/gallery`)
        const galleryUpload = await S3Service.getPresignedUploadUrl(galleryKey, file.type)
        
        const uploadResponse = await fetch(galleryUpload.uploadUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        })
        
        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload gallery image: ${file.name}`)
        }
        
        uploadedImages.gallery.push(galleryUpload.fileUrl)
      }
    }
    
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

