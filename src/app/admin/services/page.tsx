'use client'

import React from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import { ServiceCard } from '@/components/admin/AdminCards'

export default function ServicesPage() {
  const servicesData = [
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
    }
  ]

  const handleUpload = () => {
    console.log('Upload Service clicked')
    // Add upload logic here
  }

  const handleEdit = (id: string) => {
    console.log('Edit service:', id)
    // Add edit logic here
  }

  const handleUnpublish = (id: string) => {
    console.log('Unpublish service:', id)
    // Add unpublish logic here
  }

  const handleDelete = (id: string) => {
    console.log('Delete service:', id)
    // Add delete logic here
  }

  return (
    <AdminContentLayout
      title="Services"
      uploadLabel="Upload Service"
      onUpload={handleUpload}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {servicesData.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          title={service.title}
          description={service.description}
          author={service.author}
          timeAgo={service.timeAgo}
          thumbnail={service.thumbnail}
          onEdit={() => handleEdit(service.id)}
          onUnpublish={() => handleUnpublish(service.id)}
          onDelete={() => handleDelete(service.id)}
        />
      ))}
    </AdminContentLayout>
  )
}