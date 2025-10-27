'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation';

import Image from 'next/image'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'



const logout = async () => {
  try {
    // Call the backend API to clear the session
    const response = await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to log out');
    }

    window.location.href = '/';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
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
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  // Search API call
  async function handleSearch(query:any) {
    if (!query) {
      setSearchResults([])
      setShowResults(false)
      return
    }
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&pathname=${window.location.pathname}`)
    if (res.ok) {
      const data = await res.json()
      setSearchResults(data.results || [])
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  // Handle input change
  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value)
    handleSearch(e.target.value)
  }

  // Handle result click
  function handleResultClick(item: any) {
    setShowResults(false)
    setSearchQuery('')
    if (item && item.href) {
      window.location.href = item.href
    }
  }

  return (
    <header className=" px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Center - Search Bar */}
        {pathname !== '/admin/dashboard' && (
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
              <div className="relative w-full">
  {/* White container wrapping input + results */}
  <div className="bg-white rounded-[18px] shadow-md w-full">
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={onInputChange}
        className="block w-full pl-10 pr-3 outline-none py-2 rounded-[18px] text-sm"
        onFocus={() => searchQuery && setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
      />
    </div>

    {/* Search Results (inside the same white box) */}
    {showResults && searchResults.length > 0 && (
      <div className="mt-2 rounded-b-[18px] max-h-64 overflow-y-auto">
        {searchResults.map((item: any) => (
          <div
            key={item.id || item.href}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onMouseDown={() => handleResultClick(item)}
          >
            <span className="font-medium">{item.title}</span>
            <span className="ml-2 text-xs text-gray-500">{item.type}</span>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

            </div>
          </div>
        )}

        {/* Right side - Notifications and User Profile */}
        <div
          className={`flex items-center space-x-4 ${pathname === '/admin/dashboard' ? 'ml-auto' : ''}`}
        >
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
                  <span className="ml-2 mr-1 text-[#0F1C3D]">Admin</span>
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
                      href="/admin/settings"
                      className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-[#0F1C3D] hover:bg-[#ECEFF3] transition-colors duration-150"
                    >
                      Settings
                    </a>
                  </MenuItem>
                  <div className="my-1 h-px bg-[#F4F0ED]" />
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  )
}
