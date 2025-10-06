import React from 'react'
import AdminContentLayout from '@/components/admin/AdminContentLayout'
import AdminCard from '@/components/admin/AdminCard'

const career = () => {

     const careerData = [
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

    // Props for AdminContentLayout
    const className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
  return (
    <>
      <AdminContentLayout title="Career" uploadLabel="Add Career" onUpload={() => {}} className={className}>
        {careerData.map((project) => (
          <AdminCard
            key={project.id}
            title={project.title}
            description={project.description}
            author={project.author}
            timeAgo={project.timeAgo}
            thumbnail={project.thumbnail}
          />
        ))}

        </AdminContentLayout>
    </>
  )
}




export default career
