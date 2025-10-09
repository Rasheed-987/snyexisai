'use client'

import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { JobApplicationCard } from '@/components/admin/JobApplicationCard'
import { CaseStudyCard } from '@/components/admin/AdminCards'
import {Stat, JobApplication, CaseStudy} from '@/types/admin'

export default function AdminDashboardPage() {
 
  const [date,setDate] = useState('');

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
    setDate(currentDate);
  }, []);

  const jobApplications: JobApplication[] = [
    {
      id: 1,
      name: "Amanda Mandos",
      position: "Senior Developer", 
      profileImage: "/images/admin/profile.png"
    },
    {
      id: 2,
      name: "Amanda Mandos",
      position: "Senior Developer", 
      profileImage: "/images/admin/profile.png"
    },
    {
      id: 3,
      name: "Amanda Mandos",
      position: "Senior Developer", 
      profileImage: "/images/admin/profile.png"
    },
    {
      id: 4,
      name: "Amanda Mandos",
      position: "Senior Developer", 
      profileImage: "/images/admin/profile.png"
    }
  ]
  const stats: Stat[] = [
    {
      title: '103',
      subtitle: 'Projects',
      icon: (
        <Image
          src="/images/admin/career1.svg"
          alt="Projects"
          width={21.53}
          height={21.53}
          className="w-[21.53px] h-[21.53px]"
        />
      ),
      bgColor: 'bg-[#327AED]',
      textColor: 'text-white',
     
    },
    {
      title: '06',
      subtitle: 'Services',
      icon: (
        <Image
          src="/images/admin/services1.svg"
          alt="Services"
          width={21.53}
          height={21.53}
          className="w-[21.53px] h-[21.53px]"
        />
      ),
      bgColor: 'bg-[#327AED]',
      textColor: 'text-white',
     
    },
    {
      title: '80',
      subtitle: 'Case Studies',
      icon: (
        <Image
          src="/images/admin/case1.svg"
          alt="Case Studies"
          width={21.53}
          height={21.53}
          className="w-[21.53px] h-[21.53px]"
        />
      ),
      bgColor: 'bg-[#327AED]',
      textColor: 'text-white',
     
    },
    {
      title: '04',
      subtitle: 'Jobs',
      icon: (
        <Image
          src="/images/admin/job.svg"
          alt="Career"
          width={21.53}
          height={21.53}
          className="w-[21.53px] h-[21.53px]"
        />
      ),
      bgColor: 'bg-[#327AED]',
      textColor: 'text-white',
     
    }
  ]

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      authorImage: '/images/admin/profile.png',
      timeAgo: '3h 43min ago',
      thumbnail: '/images/grid_1.png'
    },
    {
      id: '2',
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      authorImage: '/images/admin/profile.png',
      timeAgo: '3h 43min ago',
      thumbnail: '/images/grid_2.png'
    },
    {
      id: '3',
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      authorImage: '/images/admin/profile.png',
      timeAgo: '3h 43min ago',
      thumbnail: '/images/grid_3.png'
    },
    {
      id: '4',
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      authorImage: '/images/admin/profile.png',
      timeAgo: '3h 43min ago',
      thumbnail: '/images/grid_4.png'
    }
  ]

  const handleEdit = (id: number) => {
    console.log('Edit case study:', id)
    // Add edit logic here
  }

  const handleUnpublish = (id: number) => {
    console.log('Unpublish case study:', id)
    // Add unpublish logic here
  }

  const handleDelete = (id: number) => {
    console.log('Delete case study:', id)
    // Add delete logic here
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0F1C3D] mb-2">
          Welcome back, Alex
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Take a look your progress for today {date}.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:bg-white rounded-[21px]  lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white  rounded-2xl p-4 md:p-6">
            <div className="flex items-center space-x-3 md:space-x-4">

             <div className=' w-[50px] md:w-[60px] bg-[#E2EDFF] rounded-[13px] h-[50px] md:h-[60px] flex items-center justify-center'>

              <div className={`${stat.bgColor} ${stat.textColor} w-[30px] md:w-[35px] h-[30px] md:h-[35px] rounded-full flex items-center justify-center`}>
                {stat.icon}
              </div>
             </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-bold text-[#0F1C3D] mb-1">
                  {stat.title}
                </h3>
                <p className="text-xs md:text-sm text-[#0F1C3D]/70 font-medium">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Case Studies Section */}
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-5 gap-4 lg:gap-5">

        <div className="space-y-4 rounded-[21px] w-full lg:w-[65%] bg-[#FFFFFF] p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-[#0F1C3D]">
            Latest Case Studies
          </h2>
          <button className="text-[#327AED] text-sm font-medium hover:underline">
            View All →
          </button>
        </div>
         
{caseStudies.map((caseStudy) => (
  <CaseStudyCard  key={caseStudy.id}
          id={caseStudy.id}
          title={caseStudy.title}
          description={caseStudy.description}
          author={caseStudy.author}
          timeAgo={caseStudy.timeAgo}
          thumbnail={caseStudy.thumbnail}
          className="flex flex-row items-center bg-[#F4F0ED] rounded-[21px] p-4 space-y-0 space-x-0 [&>div:last-child]:hidden"
          onEdit={() => {}}
          onUnpublish={() => {}}
          onDelete={() => {}}
          
          />
))}


        </div>
        <div className="w-full lg:flex-1 bg-white rounded-[21px] p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#0F1C3D]">
              Jobs Applications
            </h2>
            <button className="text-[#327AED] text-sm font-medium hover:underline">
              View All →
            </button>
          </div>
          <div className="space-y-2">
            {jobApplications.map((application) => (
              <JobApplicationCard 
                key={application.id}
                application={application} 
                onView={(id) => alert(`Viewing details for application ID: ${id}`)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}