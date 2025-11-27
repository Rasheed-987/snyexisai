import { NextResponse,NextRequest } from 'next/server';
import { S3Service } from '@/lib/s3';
import { Services } from '@/utils/models';
import connectDB from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const formData = await req.formData();

    // Extract status
    const status = (formData.get('status') as string) || 'published';
    const serviceTitle = formData.get('title') as string;
    const imageFile = formData.get('image') as File;
    const description = formData.get('description') as string || '';
    const servicesOffered = JSON.parse(String(formData.get('servicesOffered') || '[]'));
    const whyItMatters = JSON.parse(String(formData.get('whyItMatters') || '[]'));
    
    console.log('📥 Received data:', {
      serviceTitle,
      description,
      servicesOffered,
      whyItMatters
    });
    
    // Validation
    if (status === 'published') {
      if (!serviceTitle || !imageFile) {
        return NextResponse.json({ success: false, message: 'Title and image are required for published services.' }, { status: 400 });
      }
    } else if (status === 'draft') {
      if (!serviceTitle) {
        return NextResponse.json({ success: false, message: 'Title is required to save draft.' }, { status: 400 });
      }
    }

    // Generate unique service ID for S3 folder organization
    const serviceId = new Date().getTime().toString();

    let uploadedImage = '';
    if (imageFile && imageFile.size > 0) {
      uploadedImage = await S3Service.uploadFileToS3(
        imageFile,
        'services',
        serviceId
      );
    } else if (status === 'published') {
      return NextResponse.json({ success: false, message: 'Banner image is required for published services.' }, { status: 400 });
    }

    // Create service document with S3 URL
    const serviceDoc = {
      serviceId,
      serviceTitle,
      images: {
        banner: uploadedImage,
        gallery: []
      },
      status: status as 'published' | 'draft',
      description,
      servicesOffered,
      whyItMatters
    };

    console.log('💾 Saving document:', serviceDoc);
  
    const service = new Services(serviceDoc);
    await service.save();
    
    console.log('✅ Saved service:', service.toObject());

   

    return NextResponse.json({
      success: true,
      service,
      message: status === 'draft' ? 'Draft saved successfully!' : 'Service published successfully!',
    });
  } catch (error) {
    console.error('❌ Error uploading service:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    // Support status filtering and status counts
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const status = searchParams.get('status'); // 'draft', 'published', or null
    let query: any = {};
    if (status) {
      query.status = status;
    }
    // Default: show all services
    const services = await Services.find(query)
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    const total = await Services.countDocuments(query);
    // Add status counts for admin UI
    let statusCounts = undefined;
    if (!status) {
      const draftCount = await Services.countDocuments({ status: 'draft' });
      const publishedCount = await Services.countDocuments({ status: 'published' });
      statusCounts = {
        draft: draftCount,
        published: publishedCount,
        total: draftCount + publishedCount
      };
    }
    return NextResponse.json({
      success: true,
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      ...(statusCounts ? { statusCounts } : {})
    });
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}