import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Career, Project, CaseStudy, Services } from '@/utils/models';

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.trim();
  const pathname = searchParams.get('pathname');

  if (!q || !pathname) return NextResponse.json({ results: [] });

  let results: { id: string; title: string; type: string; href: string }[] = [];

  if (pathname.includes('career')) {
    const careers = await Career.find({ jobTitle: { $regex: q, $options: 'i' } }).limit(2);
    results = careers.map((c) => ({
      id: c._id.toString(),
      title: c.jobTitle,
      type: 'Career',
      href: `/admin/career/edit/${c._id}`,
    }));
  } else if (pathname.includes('project')) {
    const projects = await Project.find({ title: { $regex: q, $options: 'i' } }).limit(2);
    results = projects.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      type: 'Project',
      href: `/admin/projects/edit/${p._id}`,
    }));
  } else if (pathname.includes('case-studies')) {
    const caseStudies = await CaseStudy.find({ caseTitle: { $regex: q, $options: 'i' } }).limit(2);
    results = caseStudies.map((cs) => ({
      id: cs._id.toString(),
      title: cs.caseTitle,
      type: 'Case Study',
      href: `/admin/case-studies/edit/${cs._id}`,
    }));
  } else if (pathname.includes('services')) {
    const services = await Services.find({ serviceTitle: { $regex: q, $options: 'i' } }).limit(2);
    results = services.map((s) => ({
      id: s._id.toString(),
      title: s.serviceTitle,
      type: 'Service',
      href: `/admin/services/edit/${s._id}`,
    }));
  }
  return NextResponse.json({ results });
}

