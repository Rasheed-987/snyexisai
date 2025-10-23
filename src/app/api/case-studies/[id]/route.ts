import { NextRequest, NextResponse } from 'next/server'
import { CaseStudy } from '@/utils/models'
import connectDB from '@/lib/mongodb'
import { S3Service } from '@/lib/s3'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
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
  context: RouteContext
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
  context: RouteContext
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

    const formData = await request.formData()


    // Get existing case study first to preserve status if not provided
    const existingCaseStudy = await CaseStudy.findById(id)
    if (!existingCaseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      )
    }

    const updateData: any = {}

 // 🔹 Helper function — only add field if exists
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
    // 🔸 Your structured update fields
    await appendIfExists('caseTitle')
    await appendIfExists('subtitle')
    await appendIfExists('leftTextBox')
    await appendIfExists('whatWeDid')
    await appendIfExists('addLine')
    await appendIfExists('bodyTextTop')
    await appendIfExists('bodyTextMiddle')
    await appendIfExists('bodyTextBottom')
    await appendIfExists('largeCard', JSON.parse)
    await appendIfExists('smallCardsA', JSON.parse)
    await appendIfExists('smallCardsB', JSON.parse)

    // 🔹 Handle status
    const status = formData.get('status')
    if (status) updateData.status = String(status)

    // Merge existing data with updateData to preserve fields not provided in formData
    const mergedData = {
      ...existingCaseStudy.toObject(), // Convert Mongoose document to plain object
      ...updateData,
    };

    // Validation
    if (mergedData.status === 'published') {
      if (!mergedData.caseTitle || !mergedData.subtitle || !mergedData.leftTextBox || !mergedData.largeCard?.title || !mergedData.largeCard?.body) {
        return NextResponse.json({ error: 'All fields are required for published case studies' }, { status: 400 });
      }
    } else if (mergedData.status === 'draft') {
      if (!mergedData.caseTitle) {
        return NextResponse.json({ error: 'Title is required to save draft' }, { status: 400 });
      }
    }

    // Handle image uploads if new images are provided
    const bannerFile = formData.get('bannerImage') as File
    const galleryFiles = formData.getAll('galleryImages') as File[]
    const gallerySlots = formData.getAll('gallerySlots') as string[]

    const hasNewBanner = bannerFile && bannerFile.size > 0
    const hasNewGallery = galleryFiles.some(file => file && file.size > 0)

    if (hasNewBanner || hasNewGallery) {
      const uploadedImages = await S3Service.uploadImages(
        hasNewBanner ? bannerFile : null,
        hasNewGallery ? galleryFiles.filter(file => file && file.size > 0) : [],
        'case-studies',
        id
      )
      // Merge uploaded images with existing ones
      let mergedGallery = [...(existingCaseStudy.images?.gallery || [])]
      while (mergedGallery.length < 5) {
        mergedGallery.push('')
      }
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
          : (existingCaseStudy.images?.banner || ''),
        gallery: mergedGallery
      }
      updateData.images = mergedImages
    }

    // Published must have a banner image
    if (updateData.status === 'published') {
      const hasBanner = (hasNewBanner && updateData.images?.banner) || existingCaseStudy.images?.banner
      if (!hasBanner) {
        return NextResponse.json({ error: 'Banner image is required for published case studies' }, { status: 400 })
      }
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