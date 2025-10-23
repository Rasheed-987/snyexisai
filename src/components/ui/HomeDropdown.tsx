'use client'
import Link from 'next/link'
import { useState } from 'react'


export default function HomeDropdown({ textColor }: { textColor: string }) {

  const [isOpen, setIsOpen] = useState(false)


  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setTimeout(() => setIsOpen(false), 1000)}
    >
      {/* Main Link */}
    
      <button
        className={`font-semibold text-[14px] tracking-[0.5px] ${textColor} flex items-center gap-1`}
      >
        <Link href="/" className={`font-semibold text-[14px] tracking-[0.5px] ${textColor} flex items-center gap-1`}>
       HOME
       <span className="text-[12px]">{isOpen ? '▲' : '▼'}</span>
     </Link>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[36px] left-0 bg-white shadow-lg rounded-xl py-2 w-[300px] z-50">
          <Link
            href="/#hero"
            className="block px-4 py-2 text-[14px] text-[#0F1C3D] hover:text-blue-600"
          >
            Hero Section
          </Link>
          <Link
            href="/#services"
            className="block px-4 py-2 text-[14px] text-[#0F1C3D] hover:text-blue-600"
          >
            Our Services
          </Link>
          <Link
            href="/#case-studies"
            className="block px-4 py-2 text-[14px] text-[#0F1C3D] hover:text-blue-600"
          >
            Our Case Studies
          </Link>
          <Link
            href="/#contact"
            className="block px-4 py-2 text-[14px] text-[#0F1C3D] hover:text-blue-600"
          >
            Contact Section
          </Link>
        </div>
      )}
    </div>
  )
}
