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

        // Extract case study data
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
            status: 'published'
        };

        if( !caseStudyData.caseTitle || !caseStudyData.subtitle ) {
            return NextResponse.json({ error: 'Case title and subtitle are required' }, { status: 400 });
        }
        
        const caseStudyId = new Date().getTime().toString();    

        const bannerFile = formData.get('bannerImage') as File;
        const galleryFiles = formData.getAll('galleryImages') as File[];
        
        const uploadedImages = await S3Service.uploadImages(
            bannerFile,
            galleryFiles,
            'case-studies',
            caseStudyId
        );
        
        const caseStudyDoc = {
            ...caseStudyData,
            images: uploadedImages,
            caseStudyId: caseStudyId
        };

        const newCaseStudy = new CaseStudy(caseStudyDoc);
        await newCaseStudy.save();

        return NextResponse.json({ 
            success: true, 
            message: 'Case study created successfully',
            caseStudy: newCaseStudy 
        }, { status: 201 });
    } 

    catch (error) {
        console.error('Error creating case study:', error);

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


        const caseStudy = await CaseStudy.find({ status: 'published' })
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip((page - 1) * limit)

        const total = await CaseStudy.countDocuments({ status: 'published' })
        
        return NextResponse.json({
          success: true,
          caseStudy,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
          }
        })
        
      } catch (error) {
        console.error('Error fetching projects:', error)
        return NextResponse.json(
          { error: 'Failed to fetch projects' },
          { status: 500 }
        )
      }

}