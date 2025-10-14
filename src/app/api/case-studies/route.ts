import {NextResponse,NextRequest} from 'next/server';
import { CaseStudy } from '@/utils/models';
import connectDB from '@/lib/mongodb';
import { S3Service } from '@/lib/s3';


export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const formData = await request.formData();

        // Parse JSON fields
        const largeCard = JSON.parse(formData.get('largeCard') as string || '{}');
        const smallCardsA = JSON.parse(formData.get('smallCardsA') as string || '[]');
        const smallCardsB = JSON.parse(formData.get('smallCardsB') as string || '[]');

    // Extract status
    const status = (formData.get('status') as string) || 'published';
    const caseStudyData = {
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
      status: status as 'published' | 'draft'
    };

    // Validation
    if (status === 'published') {
      if (!caseStudyData.caseTitle || !caseStudyData.subtitle || !caseStudyData.leftTextBox || !caseStudyData.whatWeDid || !caseStudyData.largeCard?.title || !caseStudyData.largeCard?.body) {
        return NextResponse.json({ error: 'All fields are required for published case studies' }, { status: 400 });
      }
    } else if (status === 'draft') {
      if (!caseStudyData.caseTitle) {
        return NextResponse.json({ error: 'Title is required to save draft' }, { status: 400 });
      }
    }

    const caseStudyId = new Date().getTime().toString();
    const bannerFile = formData.get('bannerImage') as File;
    const galleryFiles = formData.getAll('galleryImages') as File[];
    const hasValidBanner = bannerFile && bannerFile.size > 0;
    const hasValidGallery = galleryFiles.some(file => file && file.size > 0);

    let uploadedImages: { banner?: string; gallery: string[] } = { gallery: [] };
    if (hasValidBanner || hasValidGallery) {
      uploadedImages = await S3Service.uploadImages(
        hasValidBanner ? bannerFile : null,
        hasValidGallery ? galleryFiles.filter(file => file && file.size > 0) : [],
        'case-studies',
        caseStudyId
      );
    } else if (status === 'published') {
      return NextResponse.json({ error: 'At least a banner image is required for published case studies' }, { status: 400 });
    }

    const caseStudyDoc = {
      caseStudyId: caseStudyId,
      caseTitle: caseStudyData.caseTitle,
      subtitle: caseStudyData.subtitle || '',
      leftTextBox: caseStudyData.leftTextBox || '',
      whatWeDid: caseStudyData.whatWeDid || '',
      addLine: caseStudyData.addLine || '',
      largeCard: caseStudyData.largeCard.title ? caseStudyData.largeCard : { title: '', body: '' },
      smallCardsA: caseStudyData.smallCardsA.length > 0 ? caseStudyData.smallCardsA : [],
      smallCardsB: caseStudyData.smallCardsB.length > 0 ? caseStudyData.smallCardsB : [],
      bodyTextTop: caseStudyData.bodyTextTop || '',
      bodyTextBottom: caseStudyData.bodyTextBottom || '',
      images: uploadedImages,
      status: status as 'published' | 'draft'
    };

    const newCaseStudy = new CaseStudy(caseStudyDoc);
    
    // For drafts, skip validation to allow empty fields
    if (status === 'draft') {
      await newCaseStudy.save({ validateBeforeSave: false });
    } else {
      await newCaseStudy.save();
    }

    return NextResponse.json({
      success: true,
      message: status === 'draft' ? 'Draft saved successfully!' : 'Case study published successfully!',
      caseStudy: newCaseStudy
    }, { status: 201 });
    } 

    catch (error) {
        console.error('❌ Case study validation failed:', error);

        // Return detailed error message for debugging
        return NextResponse.json(
            {
                success: false,
                message: 'Error creating case study',
                error: error instanceof Error ? error.message : error,
                // Include validation error details if available
            },
            { status: 500 }
        );
    }
}

export async function GET(request:NextRequest) {
    try {
        await connectDB();
        const {searchParams}= new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')


        // Support status filtering and status counts
        const status = searchParams.get('status'); // 'draft', 'published', or null
        let query: any = {};
        if (status) {
            query.status = status;
        }
        // Default: show all case studies
        const caseStudies = await CaseStudy.find(query)
            .sort({ updatedAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit);
        const total = await CaseStudy.countDocuments(query);
        // Add status counts for admin UI
        let statusCounts = undefined;
        if (!status) {
            const draftCount = await CaseStudy.countDocuments({ status: 'draft' });
            const publishedCount = await CaseStudy.countDocuments({ status: 'published' });
            statusCounts = {
                draft: draftCount,
                published: publishedCount,
                total: draftCount + publishedCount
            };
        }
        return NextResponse.json({
            success: true,
            caseStudies,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            },
            ...(statusCounts ? { statusCounts } : {})
        });
        
      } catch (error) {
        console.error('Error fetching projects:', error)
        return NextResponse.json(
          { error: 'Failed to fetch projects' },
          { status: 500 }
        )
      }

}