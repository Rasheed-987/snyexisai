import { NextRequest, NextResponse } from 'next/server'
import { Services } from '@/utils/models'
import connectDB from '@/lib/mongodb'
import { S3Service } from '@/lib/s3'

type RouteContext = {
  params: Promise<{ id: string }>
}

// GET specific service by ID
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB()
    
    const { id } = await context.params
    console.log('Fetching service with ID:', id)
    
    const service = await Services.findById(id)
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      service
    })
    
  } catch (error) {
    console.error('❌ Error fetching service:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    )
  }
}

// UPDATE specific service by ID
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB()
    
    const { id } = await context.params
    console.log('Updating service with ID:', id)
    
    const formData = await request.formData()
    

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
    await appendIfExists('title')

   // 🔹 Handle status
    const status = formData.get('status')
    if (status) updateData.status = String(status)



    const imageFile = formData.get('image') as File | null
    // Find existing service
    const existingService = await Services.findById(id)
    if (!existingService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }


 // Ensure mergedData includes all required fields
    const mergedData = {
      ...existingService.toObject(), // Convert Mongoose document to plain object
      ...updateData,
    };

    // Validation
    const newStatus = status || existingService.status;
    if (newStatus === 'published') {
      if (!mergedData.serviceTitle || (!imageFile && !existingService.images.banner)) {
        return NextResponse.json({ error: 'Service title and banner image are required for published services.' }, { status: 400 });
      }
    } else if (newStatus === 'draft') {
      if (!mergedData.serviceTitle) {
        return NextResponse.json({ error: 'Service title is required to save draft.' }, { status: 400 });
      }
    }

    // Handle image upload if a new image is provided
    let updatedImageUrl = existingService.images.banner;
    if (imageFile && imageFile.size > 0) {
      updatedImageUrl = await S3Service.uploadFileToS3(
        imageFile,
        'services',
        existingService.serviceId
      );
    }

    // Ensure published services have a banner image
    if (newStatus === 'published' && !updatedImageUrl) {
      return NextResponse.json({ error: 'Banner image is required for published services.' }, { status: 400 });
    }

    // Update service data
    const updatedService = await Services.findByIdAndUpdate(
      id,
      {
        serviceTitle: mergedData.serviceTitle,
        images: {
          banner: updatedImageUrl,
          gallery: existingService.images.gallery || [],
        },
        status: newStatus,
      },
      { new: true } // Return updated document
    );

    if (!updatedService) {
      return NextResponse.json(
        { error: 'Failed to update service.' },
        { status: 500 }
      );
    }

    console.log('✅ Service updated successfully:', updatedService._id);
    return NextResponse.json({
      success: true,
      service: updatedService,
      message: newStatus === 'draft' ? 'Draft saved successfully!' : 'Service updated successfully!',
    })
    
  } catch (error) {
    console.error('❌ Error updating service:', error)
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    )
  }
}

// DELETE specific service by ID
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB()
    
    const { id } = await context.params
    console.log('Deleting service with ID:', id)
    
    // Find service first to get S3 keys for cleanup
    const service = await Services.findById(id)
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }
    
    // TODO: Delete S3 files (optional)
    // if (service.images.banner) {
    //   const bannerKey = service.images.banner.split('.com/')[1]
    //   await S3Service.deleteFile(bannerKey)
    // }
    
    // Delete from database
    await Services.findByIdAndDelete(id)
    
    console.log('✅ Service deleted successfully:', id)
    
    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully!'
    })
    
  } catch (error) {
    console.error('❌ Error deleting service:', error)
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    )
  }
}