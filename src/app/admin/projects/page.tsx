'use client'

import React, { useEffect } from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import { ProjectCard } from '@/components/admin/AdminCards'
import { useTitle } from '@/hooks/titleContext'
import { useRouter } from 'next/navigation'

export default function ProjectsPage() {

  const router = useRouter();

const { setTitle } = useTitle();

useEffect(() => {
  setTitle('Projects');
}, [setTitle]);

  const projectsData = [
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
      thumbnail: '/images/img1.png'
    },
    {
      id: '3',
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      timeAgo: '3h 44min ago',
      thumbnail: '/images/img2.png'
    },
    {
      id: '4',
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      timeAgo: '3h 44min ago',
      thumbnail: '/images/img3_1.jpg'
    },
    {
      id: '5',
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      timeAgo: '3h 44min ago',
      thumbnail: '/images/grid_2.png'
    },
    {
      id: '6',
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      timeAgo: '3h 44min ago',
      thumbnail: '/images/img4_1.jpg'
    }
  ]

  const handleUpload = () => {
    console.log('Upload Project clicked')
    router.push('/admin/projects/upload');
    // Add upload logic here
  }

  const handleEdit = (id: string) => {
    console.log('Edit project:', id)
    // Add edit logic here
  }

  const handleUnpublish = (id: string) => {
    console.log('Unpublish project:', id)
    // Add unpublish logic here
  }

  const handleDelete = (id: string) => {
    console.log('Delete project:', id)
    // Add delete logic here
  }

  return (
    <AdminContentLayout
      title="Projects"
      uploadLabel="Upload Project"
      onUpload={handleUpload}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projectsData.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          description={project.description}
          author={project.author}
          timeAgo={project.timeAgo}
          thumbnail={project.thumbnail}
          onEdit={() => handleEdit(project.id)}
          onUnpublish={() => handleUnpublish(project.id)}
          onDelete={() => handleDelete(project.id)}
        />
      ))}
    </AdminContentLayout>
  )
}