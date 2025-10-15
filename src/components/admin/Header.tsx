'use client'

import { useState } from 'react'

import Image from 'next/image'
import { logout } from '@/utils/auth'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

// Sidebar menu items (copied for mobile dropdown)
const sidebarMenuItems = [
  {
    icon: (
      <Image
        src="/images/admin/overview.svg"
        alt="Overview"
        width={24}
        height={24}
        className="w-5 h-5"
      />
    ),
    label: 'Overview',
    href: '/admin/dashboard',
  },
  {
    icon: (
      <Image
        src="/images/admin/project.svg"
        alt="Projects"
        width={24}
        height={24}
        className="w-5 h-5"
      />
    ),
    label: 'Projects',
    href: '/admin/projects',
  },
  {
    icon: (
      <Image
        src="/images/admin/case.svg"
        alt="Case Studies"
        width={24}
        height={24}
        className="w-5 h-5"
      />
    ),
    label: 'Case Studies',
    href: '/admin/case-studies',
  },
  {
    icon: (
      <Image
        src="/images/admin/services.svg"
        alt="Services"
        width={24}
        height={24}
        className="w-5 h-5"
      />
    ),
    label: 'Services',
    href: '/admin/services',
  },
  {
    icon: (
      <Image
        src="/images/admin/career.svg"
        alt="Career"
        width={24}
        height={24}
        className="w-5 h-5"
      />
    ),
    label: 'Career',
    href: '/admin/career',
  },
]

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className=" px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Center - Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full  bg-[#ECEFF3] pl-10 pr-3 outline-none py-2 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Right side - Notifications and User Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {/* Notification badge */}
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <Menu>
              <MenuButton
                className="inline-flex items-center gap-3 rounded-full border border-[#F4F0ED] bg-white pl-2 pr-3 py-1.5 text-sm font-medium text-[#0F1C3D] shadow-sm  focus:outline-none  focus:ring-0 "
                aria-label="Open account menu"
              >
                {/* Compact user pill (avatar + name) */}
                <span className="flex items-center">
                  <img
                    src="/images/admin/profile.png"
                    alt="Alex Smith"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="ml-2 mr-1 text-[#0F1C3D]">Alex Smith</span>
                </span>
                <ChevronDownIcon className="h-4 w-4 text-[#327AED]" aria-hidden="true" />
              </MenuButton>
              <MenuItems
                anchor="bottom end"
                className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-[12px]   bg-white p-1 text-sm shadow-lg  "
              >
                {/* Mobile: Sidebar menu items */}
                <div className="md:hidden">
                  {sidebarMenuItems.map((item) => (
                    <MenuItem key={item.label}>
                      <a
                        href={item.href}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-[black] "
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    </MenuItem>
                  ))}
                </div>
                {/* Desktop: Original menu items */}
                <div className="hidden md:block  rounded-lg">
                  <MenuItem>
                    <button
                      onClick={logout}
                      className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-[#0F1C3D] hover:bg-[#ECEFF3] transition-colors duration-150"
                    >
                      Logout
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="/Setting"
                      className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-[#0F1C3D] hover:bg-[#ECEFF3] transition-colors duration-150"
                    >
                      Setting
                    </a>
                  </MenuItem>
                  <div className="my-1 h-px bg-[#F4F0ED]" />
                  {/* <MenuItem>
                    <a
                      href="/license"
                      className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-[#0F1C3D] hover:bg-[#F4F0ED] focus:bg-[#F4F0ED] data-[focus]:bg-[#F4F0ED]"
                    >
                      License
                    </a>
                  </MenuItem> */}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  )
}
