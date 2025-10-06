'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      label: 'Overview',
      href: '/admin/overview',
      active: true
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      label: 'Projects',
      href: '/admin/projects',
      active: false
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      label: 'Case Studies',
      href: '/admin/case-studies',
      active: false
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Services',
      href: '/admin/services',
      active: false
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      ),
      label: 'Career',
      href: '/admin/career',
      active: false
    }
  ]

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} h-screen flex flex-col`}>
      {/* Header with Logo and Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center w-full">
              <Image
                src="/images/logo.png"
                alt="Synexis Ai"
                width={200}
                height={40}
                className="w-full h-auto object-contain"
              />
            </div>
          )}
          
          {isCollapsed && (
            <div className="flex justify-center w-full">
              <Image
                src="/images/logo.png"
                alt="Synexis Ai"
                width={28}
                height={28}
                className="rounded"
              />
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors md:hidden lg:block"
            aria-label="Toggle sidebar"
          >
            <svg 
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} 
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
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  item.active
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-[var(--primary)]'
                }`}
              >
                <span className={`flex-shrink-0 ${item.active ? 'text-white' : 'text-gray-500 group-hover:text-[var(--primary)]'}`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="body-medium font-medium">
                    {item.label}
                  </span>
                )}
              </Link>

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="hidden group-hover:block absolute left-16 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </div>
  )
}
