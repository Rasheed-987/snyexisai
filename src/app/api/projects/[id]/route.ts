import { NextRequest, NextResponse } from 'next/server'
import { Project } from '@/utils/models'
import connectDB from '@/lib/mongodb'

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
    
    // Extract updated data
    const updateData = {
      title: formData.get('title') as string,
      tagline: formData.get('tagline') as string,
      addTitle: formData.get('addTitle') as string,
      cards: JSON.parse(formData.get('cards') as string || '[]'),
      largeCard: JSON.parse(formData.get('largeCard') as string || '{}'),
      smallCards: JSON.parse(formData.get('smallCards') as string || '[]'),
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
    
    // TODO: Delete S3 files (optional)
    // if (project.images.banner) {
    //   const bannerKey = project.images.banner.split('.com/')[1]
    //   await S3Service.deleteFile(bannerKey)
    // }
    
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