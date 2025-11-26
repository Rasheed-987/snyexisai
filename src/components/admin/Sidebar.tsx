'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      icon: (
        <Image
          src="/images/admin/overview.svg"
          alt="Overview"
          width={24}
          height={24}
          className="w-6 h-6 2xl:w-8 2xl:h-8"
        />
      ),
      label: 'Overview',
      href: '/admin/dashboard',
      active: true
    },
    {
      icon: (
        <Image
          src="/images/admin/project.svg"
          alt="Projects"
          width={24}
          height={24}
          className="w-6 h-6 2xl:w-8 2xl:h-8"
        />
      ),
      label: 'Projects',
      href: '/admin/projects',
      active: false
    },
    {
      icon: (
        <Image
          src="/images/admin/case.svg"
          alt="Case Studies"
          width={24}
          height={24}
          className="w-6 h-6 2xl:w-8 2xl:h-8"
        />
      ),
      label: 'Case Studies',
      href: '/admin/case-studies',
      active: false
    },
    {
      icon: (
        <Image
          src="/images/admin/services.svg"
          alt="Services"
          width={24}
          height={24}
          className="w-6 h-6 2xl:w-8 2xl:h-8"
        />
      ),
      label: 'Services',
      href: '/admin/services',
      active: false
    },
    {
      icon: (
        <Image
          src="/images/admin/career.svg"
          alt="Career"
          width={24}
          height={24}
          className="w-6 h-6 2xl:w-8 2xl:h-8"
        />
      ),
      label: 'Career',
      href: '/admin/career',
      active: false
    }
  ]

  return (
    <>
      
      <div className={`hidden lg:flex transition-all duration-300 ${
        isCollapsed ? 'w-16 2xl:w-24' : 'w-64 2xl:w-80'
      } h-screen flex-col fixed lg:relative z-50 lg:z-auto  ${
        isCollapsed ? 'overflow-hidden' : ''
      }`}>
        {/* Header with Logo and Toggle */}
        <div className="p-6 2xl:p-8 border-b border-[#0F1C3D]/10">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center w-full">
                <Image
                  src="/images/logo.png"
                  alt="Synexis Ai"
                  width={180}
                  height={36}
                  className="w-auto h-8 2xl:h-10 object-contain"
                />
              </div>
            )}
            
            {isCollapsed && (
              <div className="flex justify-center w-full">
                <Image
                  src="/images/logo.png"
                  alt="Synexis Ai"
                  width={32}
                  height={32}
                  className="rounded 2xl:w-10 2xl:h-10"
                />
              </div>
            )}

            {/* Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-[#FFFFFF]/70 transition-all duration-200 lg:block border border-transparent hover:border-[#0F1C3D]/20"
              aria-label="Toggle sidebar"
            >
              <svg 
                className={`w-5 h-5 2xl:w-6 2xl:h-6 text-[#0F1C3D] transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 2xl:p-6">
          <ul className="space-y-3 2xl:space-y-4">
            {menuItems.map((item, index) => (
              <li key={index} className="relative group">
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 2xl:px-6 2xl:py-4 rounded-xl transition-all duration-200 relative ${
                    item.active
                      ? 'text-[#327AED]  hover:bg-[#FFFFFF]/80 hover:shadow-md border border-transparent'
                      : 'text-[#0F1C3D] hover:bg-[#FFFFFF]/80 hover:shadow-md border border-transparent'
                  } ${isCollapsed ? 'justify-center' : 'space-x-4'}`}
                >
                  <span className={`flex-shrink-0 w-6 h-6 2xl:w-8 2xl:h-8 flex items-center justify-center transition-colors ${
                    item.active ? 'text-[#FFFFFF]' : 'text-[#0F1C3D] group-hover:text-[#327AED]'
                  }`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="font-medium text-base 2xl:text-xl leading-relaxed transition-colors">
                      {item.label}
                    </span>
                  )}
                </Link>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-60">
                    <div className="bg-[#0F1C3D] text-[#FFFFFF] text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-[#327AED]/20">
                      {item.label}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-[#0F1C3D]"></div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer space for additional content if needed */}
        <div className="p-4 border-t border-[#0F1C3D]/10">
          {/* Add footer content here if needed */}
        </div>
      </div>
    </>
  )
}
