'use client'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'


export default function HomeDropdown({ textColor }: { textColor: string }) {

  const [isOpen, setIsOpen] = useState(false)


  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Main Link */}
    
      <button
        className={`relative font-semibold text-[14px] tracking-[0.5px] ${textColor} flex items-center gap-1`}
      >
        <Link href="/" className={`relative font-semibold text-[14px] tracking-[0.5px] ${textColor} flex items-center gap-1`}>
       HOME
       <span className="text-[12px]">{isOpen ? '▲' : '▼'}</span>
     </Link>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-7 left-0 mt-2 w-[600px] bg-white border border-border rounded-2xl shadow-2xl z-50 p-5 transition-all duration-200 grid grid-cols-[1.4fr_1fr] gap-6"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setTimeout(() => setIsOpen(false), 4000)}
        >
  
  {/* LEFT FEATURE CARD */}
  <div className="relative  rounded-xl overflow-hidden bg-black text-white p-6 flex flex-col justify-end">
    <div className="absolute inset-0">
      {/* You can drop the background image or SVG circles here */}
    </div>

    <div className="relative z-10">
      <h3 className="text-xl font-semibold mb-2">Learn SEO for Webflow</h3>
      <p className="text-sm text-gray-300 mb-4">
        Practical guides to improve your Webflow site's visibility.
      </p>
      <Link href="/learn-seo" className="text-white text-sm inline-flex items-center gap-1 font-medium hover:opacity-80">
        Start Learning →
      </Link>
    </div>
  </div>


  {/* RIGHT NAV LINKS */}
  <div className="space-y-4">
    {/* ITEM */}
    <Link href="#case-studies" className="flex gap-3 group">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">Case Studies</p>
        <p className="text-xs text-muted-foreground">
          Real-world success stories and detailed project showcases.
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/case-studies.png" alt="Case Studies" fill className="object-contain group-hover:scale-105 transition" />
      </div>
    </Link>

    <Link href="#services" className="flex gap-3 group">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">Services</p>
        <p className="text-xs text-muted-foreground">
          Comprehensive solutions tailored to your business needs.
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/customer-service.png" alt="Services" fill className="object-contain group-hover:scale-105 transition" />
      </div>
    </Link>

    <Link href="#testimonials" className="flex gap-3 group">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">Testimonials</p>
        <p className="text-xs text-muted-foreground">
          Hear what our clients say about their experience with us.
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/testimonial.png" alt="Testimonials" fill className="object-contain group-hover:scale-105 transition" />
      </div>
    </Link>

    <Link href="#faq" className="flex gap-3 group">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">FAQs</p>
        <p className="text-xs text-muted-foreground">
          Quick answers to common questions about our services.
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/faq.png" alt="FAQ" fill className="object-contain group-hover:scale-105 transition" />
      </div>
    </Link>
  </div>

</div>

      )}
    </div>
  )
}
