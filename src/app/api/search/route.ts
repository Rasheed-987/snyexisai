import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Career } from '@/utils/models';
import { Project } from '@/utils/models';
import { CaseStudy } from '@/utils/models';
import { Services } from '@/utils/models';

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.trim();
  if (!q) return NextResponse.json({ results: [] });

  // Search all collections by title/name
  const [careers, projects, caseStudies, services] = await Promise.all([
    Career.find({ jobTitle: { $regex: q, $options: 'i' } }).limit(2),
    Project.find({ title: { $regex: q, $options: 'i' } }).limit(2),
    CaseStudy.find({ caseTitle: { $regex: q, $options: 'i' } }).limit(2),
    Services.find({ serviceTitle: { $regex: q, $options: 'i' } }).limit(2),
  ]);

  // Format results for dropdown
  const results = [
    ...careers.map((c) => ({
      id: c._id,
      title: c.jobTitle,
      type: 'Career',
      href: `/admin/career/edit/${c._id}`,
    })),
    ...projects.map((p) => ({
      id: p._id,
      title: p.title,
      type: 'Project',
      href: `/admin/projects/edit/${p._id}`,
    })),
    ...caseStudies.map((cs) => ({
      id: cs._id,
      title: cs.caseTitle,
      type: 'Case Study',
      href: `/admin/case-studies/edit/${cs._id}`,
    })),
    ...services.map((s) => ({
      id: s._id,
      title: s.serviceTitle,
      type: 'Service',
      href: `/admin/services/edit/${s._id}`,
    })),
  ];

  return NextResponse.json({ results });
}
