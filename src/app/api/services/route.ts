import { NextResponse } from 'next/server';
import { S3Service } from '@/lib/s3';
import { Services } from '@/utils/models';
import connectDB from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const formData = await req.formData();

    // Extract service title and image file from form data
    const serviceTitle = formData.get('title') as string;
    const imageFile = formData.get('image') as File;

    if (!serviceTitle || !imageFile) {
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    // Generate unique service ID for S3 folder organization
    const serviceId = new Date().getTime().toString();

    // Upload image to S3
    const uploadedImage = await S3Service.uploadFileToS3(
      imageFile,
      'services',
      serviceId
    );

    // Create service document with S3 URL
    const serviceDoc = {
      serviceId,
      serviceTitle,
      images: {
        banner: uploadedImage,
        gallery: []
      },
      status: 'published'
    };

    const service = new Services(serviceDoc);
    await service.save();

    console.log('✅ Service uploaded successfully:', service._id);

    return NextResponse.json({
      success: true,
      service,
      message: 'Service uploaded successfully!',
    });
  } catch (error) {
    console.error('❌ Error uploading service:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    
    // Fetch all services from the database
    const services = await Services.find();

    console.log('✅ Fetched services:', services.length);

    return NextResponse.json({
      success: true,
      services,
    });
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}