import { NextResponse, NextRequest } from 'next/server';
import { Career } from '@/utils/models';
import connectDB from '@/lib/mongodb';
import { S3Service } from '@/lib/s3';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    
    const { id } = await params;
  const body = await req.json();
  const { status, jobTitle, company, location, jobType, description, requirements, responsibilities, deadline } = body;

    // Find the career
    const career = await Career.findById(id);
    if (!career) {
      return NextResponse.json({ 
        success: false, 
        error: 'Career not found' 
      }, { status: 404 });
    }

    // Update fields if provided
    const updateData: any = {};
    if (status) updateData.status = status;
    if (jobTitle) updateData.jobTitle = jobTitle;
    if (company) updateData.company = company;
    if (location) updateData.location = location;
    if (jobType) updateData.jobType = jobType;
    if (description) updateData.description = description;
    if (Array.isArray(requirements)) updateData.requirements = requirements;
    if (Array.isArray(responsibilities)) updateData.responsibilities = responsibilities;
    if (deadline) {
      try {
        const d = new Date(deadline)
        if (!isNaN(d.getTime())) updateData.deadline = d
      } catch (e) {
        // ignore invalid date
      }
    }

    console.log('Career updateData:', updateData)

    // Merge existing data with updateData to preserve fields not provided in the request
    const mergedData = {
      ...career.toObject(), // Convert Mongoose document to plain object
      ...updateData,
    };

    // Validation
    if (mergedData.status === 'published') {
      if (!mergedData.jobTitle || !mergedData.company || !mergedData.location || !mergedData.description) {
        return NextResponse.json({
          success: false,
          error: 'All required fields must be provided to publish a career',
        }, { status: 400 });
      }
    } else if (mergedData.status === 'draft') {
      if (!mergedData.jobTitle) {
        return NextResponse.json({
          success: false,
          error: 'Job title is required to save as draft',
        }, { status: 400 });
      }
    }

    // Update the career
    const updatedCareer = await Career.findByIdAndUpdate(
      id,
      mergedData,
      { new: true } // Return updated document
    );

    if (!updatedCareer) {
      return NextResponse.json({
        success: false,
        error: 'Failed to update career',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      career: updatedCareer,
      message: 'Career updated successfully',
    });
  } catch (error) {
    console.error('❌ Error updating career:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    
    const { id } = await params;


    // Find and delete the career
    const deletedCareer = await Career.findByIdAndDelete(id);
    
    if (!deletedCareer) {
      return NextResponse.json({ 
        success: false, 
        error: 'Career not found' 
      }, { status: 404 });
    }

   

    return NextResponse.json({
      success: true,
      message: 'Career deleted successfully',
    });
  } catch (error) {
 
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    
    const { id } = await params;

    // Find the career
    const career = await Career.findById(id);
    
    if (!career) {
      return NextResponse.json({ 
        success: false, 
        error: 'Career not found' 
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      career,
    });
  } catch (error) {
 
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}