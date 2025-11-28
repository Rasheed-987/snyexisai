import { NextRequest, NextResponse } from 'next/server'
import { Project } from '@/utils/models'
import connectDB from '@/lib/mongodb'
import { S3Service } from '@/lib/s3'

type RouteContext = {
  params: Promise<{ id: string }>
}

// GET specific project by ID
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB()
    
    const { id } = await context.params
    console.log('Fetching project with ID:', id)
    
    const project = await Project.findById(id)
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      project
    })
    
  } catch (error) {
    
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

// UPDATE specific project by ID
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB()
    
    const { id } = await context.params
    
    const formData = await request.formData()

    // helper to read string or blob values from formData
    const readFormValue = async (key: string) => {
      const v = formData.get(key)
      if (!v) return ''
      if (v instanceof Blob) return await v.text()
      return String(v)
    }

    // Get existing project first to preserve status if not provided
    const existingProject = await Project.findById(id)
    
    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    const updateData: any = {}

     // 🔹 Helper: only set if exists and not empty
    const appendIfExists = async (key: string, parser?: (v: string) => any) => {
      const value = formData.get(key)
      if (value !== null && value !== undefined && value !== '') {
        if (value instanceof Blob) {
          updateData[key] = await value.text()
        } else {
          updateData[key] = parser ? parser(String(value)) : String(value)
        }
      }
    }

    // 🔸 Add fields (your pattern)
    await appendIfExists('title')
    await appendIfExists('tagline')
    await appendIfExists('addTitle')
    await appendIfExists('cards', JSON.parse)
    await appendIfExists('largeCard', JSON.parse)
    await appendIfExists('smallCards', JSON.parse)
    await appendIfExists('descriptionText')
    await appendIfExists('requirements', JSON.parse)

    // 🔹 Status (if provided)
    const status = formData.get('status')
    if (status) updateData.status = String(status)
    // Handle image uploads if new images are provided
    const bannerFile = formData.get('bannerImage') as File
    const galleryFiles = formData.getAll('galleryImages') as File[]
    const gallerySlots = formData.getAll('gallerySlots') as string[]
    
    const hasNewBanner = bannerFile && bannerFile.size > 0
    const hasNewGallery = galleryFiles.some(file => file && file.size > 0)
    
    // Only upload and update images if there are new files
    if (hasNewBanner || hasNewGallery) {
      // Note: existingProject already fetched above
      
      // Upload new images to S3
      const uploadedImages = await S3Service.uploadImages(
        hasNewBanner ? bannerFile : null,
        hasNewGallery ? galleryFiles.filter(file => file && file.size > 0) : [],
        'projects',
        id 
      )
      
      // Merge uploaded images with existing ones
      let mergedGallery = [...(existingProject.images?.gallery || [])]
      
      // Ensure gallery array has at least 2 slots
      while (mergedGallery.length < 2) {
        mergedGallery.push('')
      }
      
      // If we have new gallery images, place them at correct slots
      if (hasNewGallery && uploadedImages.gallery) {
        galleryFiles.forEach((file, uploadIndex) => {
          if (file && file.size > 0) {
            const slotIndex = parseInt(gallerySlots[uploadIndex])
            if (!isNaN(slotIndex) && uploadedImages.gallery[uploadIndex]) {
              mergedGallery[slotIndex] = uploadedImages.gallery[uploadIndex]
            }
          }
        })
      }
      
      const mergedImages = {
        banner: hasNewBanner && uploadedImages.banner 
          ? uploadedImages.banner 
          : (existingProject.images?.banner || ''),
        gallery: mergedGallery
      }
      
      // Add images to updateData
      updateData.images = mergedImages
    }

    // Validate if trying to publish a draft
    if (updateData.status === 'published') {
      // Check both new data and existing data for required fields
      const finalTitle = updateData.title || existingProject.title
      const finalTagline = updateData.tagline || existingProject.tagline
      const finalAddTitle = updateData.addTitle || existingProject.addTitle
      
      console.log('🔍 Publishing validation:')
      console.log('- finalTitle:', finalTitle)
      console.log('- finalTagline:', finalTagline)
      console.log('- finalAddTitle:', finalAddTitle)
      
      if (!finalTitle || !finalTagline || !finalAddTitle) {
        return NextResponse.json(
          { error: 'Title, tagline, and addTitle are required for published projects' },
          { status: 400 }
        )
      }
      
      // Check if has banner image (either existing or uploaded)
      const hasBanner = (hasNewBanner && updateData.images?.banner) || existingProject.images?.banner
      if (!hasBanner) {
        return NextResponse.json(
          { error: 'Banner image is required for published projects' },
          { status: 400 }
        )
      }
    }

    const project = await Project.findByIdAndUpdate(
      id, 
      updateData,

      { new: true } // Return updated document
    )
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }
    
    console.log('Updated project with ID:change right now', id)
    return NextResponse.json({
      success: true,
      project,
      message: 'Project updated successfully!'
    })
    
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE specific project by ID
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB()
    
    const { id } = await context.params
    console.log('Deleting project with ID:', id)
    
    // Find project first to get S3 keys for cleanup
    const project = await Project.findById(id)
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }
    
  
    
    // Delete from database
    await Project.findByIdAndDelete(id)
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully!'
    })
    
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}