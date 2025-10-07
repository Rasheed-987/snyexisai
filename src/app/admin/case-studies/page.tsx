'use client'

import React, { useEffect } from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import { CaseStudyCard } from '@/components/admin/AdminCards'
import { useTitle } from '@/hooks/titleContext'
import { useRouter } from 'next/navigation'

export default function CaseStudiesPage() {
  const { setTitle } = useTitle();
  const router = useRouter();

  // Set title when page loads
  useEffect(() => {
    setTitle('Case Studies');
  }, [setTitle]);
  const caseStudiesData = [
    {
      id: '1',
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      timeAgo: '3h 44min ago',
      thumbnail: '/images/grid_1.png'
    },
    {
      id: '2',
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      timeAgo: '3h 44min ago',
      thumbnail: '/images/grid_2.png'
    },
    {
      id: '3',
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      timeAgo: '3h 44min ago',
      thumbnail: '/images/grid_3.png'
    },
    {
      id: '4',
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      timeAgo: '3h 44min ago',
      thumbnail: '/images/grid_4.png'
    }
  ]

  const handleUpload = () => {
    console.log('Upload Case Study clicked')
    // Add upload logic here
    router.push('/admin/case-studies/upload');
  }

  const handleEdit = (id: string) => {
    console.log('Edit case study:', id)
    // Add edit logic here
  }

  const handleUnpublish = (id: string) => {
    console.log('Unpublish case study:', id)
    // Add unpublish logic here
  }

  const handleDelete = (id: string) => {
    console.log('Delete case study:', id)
    // Add delete logic here
  }

  return (
    <AdminContentLayout
      title="Case Studies"
      uploadLabel="Upload Study"
      onUpload={handleUpload}
      className="space-y-4"
    >
      {caseStudiesData.map((caseStudy) => (
        <CaseStudyCard
          key={caseStudy.id}
          id={caseStudy.id}
          title={caseStudy.title}
          description={caseStudy.description}
          author={caseStudy.author}
          timeAgo={caseStudy.timeAgo}
          thumbnail={caseStudy.thumbnail}
          onEdit={() => handleEdit(caseStudy.id)}
          onUnpublish={() => handleUnpublish(caseStudy.id)}
          onDelete={() => handleDelete(caseStudy.id)}
        />
      ))}
    </AdminContentLayout>
  )
}