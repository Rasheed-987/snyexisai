'use client'

import React from 'react'
import Image from 'next/image'

export default function AdminDashboardPage() {
  const stats = [
    {
      title: '103',
      subtitle: 'Projects',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      bgColor: 'bg-blue-500',
      textColor: 'text-white'
    },
    {
      title: '06',
      subtitle: 'Services',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bgColor: 'bg-blue-500',
      textColor: 'text-white'
    },
    {
      title: '80',
      subtitle: 'Case Studies',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bgColor: 'bg-blue-500',
      textColor: 'text-white'
    },
    {
      title: '04',
      subtitle: 'Jobs',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      ),
      bgColor: 'bg-blue-500',
      textColor: 'text-white'
    }
  ]

  const caseStudies = [
    {
      id: 1,
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      timeAgo: '3h 44min ago',
      thumbnail: '/images/grid_1.png'
    },
    {
      id: 2,
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      timeAgo: '3h 44min ago',
      thumbnail: '/images/grid_2.png'
    },
    {
      id: 3,
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      timeAgo: '3h 44min ago',
      thumbnail: '/images/grid_3.png'
    },
    {
      id: 4,
      title: 'UX & Web Design Master',
      description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry lorem ipsum has been...',
      author: 'Alex Smith',
      timeAgo: '3h 44min ago',
      thumbnail: '/images/grid_4.png'
    }
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="heading-medium text-[var(--foreground)] mb-2">
          Welcome back, Alex
        </h1>
        <p className="body-medium text-gray-600">
          Take a look your progress for today {new Date().toLocaleDateString()}.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className={`${stat.bgColor} ${stat.textColor} p-3 rounded-full flex-shrink-0`}>
                {stat.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-1">
                  {stat.title}
                </h3>
                <p className="body-small text-gray-600">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Case Studies Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-small text-[var(--foreground)]">
            Latest Case Studies
          </h2>
          <button className="text-[var(--primary)] body-small font-medium hover:underline">
            View All →
          </button>
        </div>

        <div className="space-y-4">
          {caseStudies.map((study) => (
            <div key={study.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0">
                <Image
                  src={study.thumbnail}
                  alt={study.title}
                  width={80}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="body-medium font-semibold text-[var(--foreground)] mb-2">
                  {study.title}
                </h3>
                <p className="body-small text-gray-600 line-clamp-2 mb-3">
                  {study.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">AS</span>
                    </div>
                    <span>{study.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{study.timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}