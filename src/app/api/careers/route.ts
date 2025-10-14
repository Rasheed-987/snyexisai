import { NextResponse, NextRequest } from 'next/server';
import { Career } from '@/utils/models';
import connectDB from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { jobTitle, company, location, jobType, description, status = 'published' } = body;

    // Validation
    if (status === 'published') {
      if (!jobTitle || !company || !location || !jobType || !description) {
        return NextResponse.json({ 
          success: false, 
          message: 'Job Title, Company, Location, Job Type, and Description are required for published jobs.' 
        }, { status: 400 });
      }
    } else if (status === 'draft') {
      if (!jobTitle) {
        return NextResponse.json({ 
          success: false, 
          message: 'Job Title is required to save draft.' 
        }, { status: 400 });
      }
    }

    // Generate unique career ID
    const careerId = new Date().getTime().toString();

    // Create career document
    const careerDoc = {
      careerId,
      jobTitle,
      company: company || '',
      location: location || '',
      jobType: jobType || 'Full Time',
      description: description || '',
      status: status as 'published' | 'draft'
    };

    const career = new Career(careerDoc);
    await career.save();

    console.log('✅ Career uploaded successfully:', career._id);

    return NextResponse.json({
      success: true,
      career,
      message: status === 'draft' ? 'Job draft saved successfully!' : 'Job published successfully!',
    });
  } catch (error) {
    console.error('❌ Error uploading career:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error.' 
    }, { status: 500 });
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
    
    // Default: show all careers
    const careers = await Career.find(query)
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
      
    const total = await Career.countDocuments(query);
    
    // Add status counts for admin UI
    let statusCounts = undefined;
    if (!status) {
      const draftCount = await Career.countDocuments({ status: 'draft' });
      const publishedCount = await Career.countDocuments({ status: 'published' });
      statusCounts = {
        draft: draftCount,
        published: publishedCount,
        total: draftCount + publishedCount
      };
    }
    
    return NextResponse.json({
      success: true,
      careers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      ...(statusCounts ? { statusCounts } : {})
    });
  } catch (error) {
    console.error('❌ Error fetching careers:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error.' 
    }, { status: 500 });
  }
}