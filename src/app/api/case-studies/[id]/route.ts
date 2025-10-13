import { NextRequest, NextResponse } from 'next/server'
import { CaseStudy } from '@/utils/models'
import connectDB from '@/lib/mongodb'
import { S3Service } from '@/lib/s3'

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await context.params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Case study ID is required' },
        { status: 400 }
      )
    }

    // Find the case study first to get image URLs for cleanup
    const caseStudy = await CaseStudy.findById(id)
    
    if (!caseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      )
    }

    // Delete images from S3 if they exist
    if (caseStudy.images) {
      try {
        // Delete banner image
        if (caseStudy.images.banner) {
          const bannerKey = caseStudy.images.banner.split('/').pop() || ''
          await S3Service.deleteFile(`case-studies/${caseStudy.caseStudyId}/${bannerKey}`)
        }
        
        // Delete gallery images
        if (caseStudy.images.gallery && caseStudy.images.gallery.length > 0) {
          for (const imageUrl of caseStudy.images.gallery) {
            const imageKey = imageUrl.split('/').pop() || ''
            await S3Service.deleteFile(`case-studies/${caseStudy.caseStudyId}/${imageKey}`)
          }
        }
      } catch (imageError) {
        console.warn('Failed to delete some images from S3:', imageError)
        // Continue with case study deletion even if image deletion fails
      }
    }

    // Delete the case study from database
    await CaseStudy.findByIdAndDelete(id)

    return NextResponse.json({
      success: true,
      message: 'Case study deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting case study:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete case study',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    
    const { id } = await context.params 
    
    if (!id) {
      return NextResponse.json(
        { error: 'Case study ID is required' },
        { status: 400 }
      )
    }

    const caseStudy = await CaseStudy.findById(id)
    
    if (!caseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      caseStudy
    })

  } catch (error) {
    console.error('Error fetching case study:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch case study',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const { id } = params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Case study ID is required' },
        { status: 400 }
      )
    }

    const formData = await request.formData()

    // Parse JSON fields
    const largeCard = JSON.parse(formData.get('largeCard') as string || '{}')
    const smallCardsA = JSON.parse(formData.get('smallCardsA') as string || '[]')
    const smallCardsB = JSON.parse(formData.get('smallCardsB') as string || '[]')

    // Extract case study data
    const updateData: any = {
      caseTitle: formData.get('caseTitle') as string,
      subtitle: formData.get('subtitle') as string,
      leftTextBox: formData.get('leftTextBox') as string,
      whatWeDid: formData.get('whatWeDid') as string,
      addLine: formData.get('addLine') as string,
      largeCard: largeCard,
      smallCardsA: smallCardsA,
      smallCardsB: smallCardsB,
      bodyTextTop: formData.get('bodyTextTop') as string,
      bodyTextBottom: formData.get('bodyTextBottom') as string,
    }

    // Handle image uploads if new images are provided
    const bannerFile = formData.get('bannerImage') as File
    const galleryFiles = formData.getAll('galleryImages') as File[]
    const gallerySlots = formData.getAll('gallerySlots') as string[]



    const hasNewBanner = bannerFile && bannerFile.size > 0
    const hasNewGallery = galleryFiles.some(file => file && file.size > 0)

    if (hasNewBanner || hasNewGallery) {
      // Get existing case study to preserve existing images
      const existingCaseStudy = await CaseStudy.findById(id)
      
      if (!existingCaseStudy) {
        return NextResponse.json(
          { error: 'Case study not found' },
          { status: 404 }
        )
      }
      
      const uploadedImages = await S3Service.uploadImages(
        hasNewBanner ? bannerFile : null,
        hasNewGallery ? galleryFiles.filter(file => file && file.size > 0) : [],
        'case-studies',
        id
      )
      
      // Merge uploaded images with existing ones
      let mergedGallery = [...(existingCaseStudy.images?.gallery || [])]
      
      // Ensure gallery array has at least 5 slots (case studies have 6 total image slots - 1 banner = 5 gallery)
      while (mergedGallery.length < 5) {
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
      
      // Merge with existing images
      const mergedImages = {
        banner: hasNewBanner && uploadedImages.banner 
          ? uploadedImages.banner 
          : (existingCaseStudy.images?.banner || ''),
        gallery: mergedGallery
      }
      
      // Add images to update data
      updateData.images = mergedImages
    }

    const updatedCaseStudy = await CaseStudy.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!updatedCaseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Case study updated successfully',
      caseStudy: updatedCaseStudy
    })

  } catch (error) {
    console.error('Error updating case study:', error)
    return NextResponse.json(
      {
        error: 'Failed to update case study',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}