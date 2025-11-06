'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDropdownHover } from '@/utils/utils'


export default function HomeDropdown({ textColor }: { textColor: string }) {

  const router = useRouter()
  const { isOpen, handleMouseEnter, handleMouseLeave, closeDropdown } = useDropdownHover()

  const scrollToSection = (sectionId: string) => {
    closeDropdown()
    
    // If not on homepage, navigate first
    if (window.location.pathname !== '/') {
      router.push(`/#${sectionId}`)
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          window.scrollTo({ top: elementPosition - 80, behavior: 'smooth' })
        }
      }, 300)
    } else {
      // Already on homepage, just scroll
      const element = document.getElementById(sectionId)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: elementPosition - 80, behavior: 'smooth' })
      }
    }
  }


  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Link */}
      <Link 
        href="/" 
        className={`relative font-semibold text-[14px] tracking-[0.5px] ${textColor} flex items-center gap-1`}
      >
        HOME
        <span 
          className="text-[12px] cursor-pointer" 
          onClick={(e) => {
            e.preventDefault();
            if (isOpen) {
              closeDropdown();
            }
            else {
              handleMouseEnter();
            }
          }}
        >
          {isOpen ? '▲' : '▼'}
        </span>
      </Link>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-7 left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white border border-border rounded-2xl shadow-2xl z-50 p-5 transition-all duration-200 grid grid-cols-[1.4fr_1fr] gap-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
  
  {/* LEFT FEATURE CARD */}
  <div className="relative  rounded-xl overflow-hidden bg-black text-white p-6 flex flex-col justify-end">
    <div className="absolute inset-0">
      {/* You can drop the background image or SVG circles here */}
    </div>

    <div className="relative z-10">
      <h3 className="text-xl font-semibold mb-2"></h3>
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
    <button onClick={() => scrollToSection('case-studies')} className="flex gap-3 group w-full text-left cursor-pointer">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">Case Studies</p>
        <p className="text-xs text-foreground">
          Real-world success stories and detailed project showcases.
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/case-studies.png" alt="Case Studies" fill className="object-contain group-hover:scale-105 transition" />
      </div>
    </button>

    <button onClick={() => scrollToSection('services')} className="flex gap-3 group w-full text-left cursor-pointer">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">Services</p>
        <p className="text-xs text-foreground">
          Comprehensive solutions tailored to your business needs.
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/customer-service.png" alt="Services" fill className="object-contain group-hover:scale-105 transition" />
      </div>
    </button>

    <button onClick={() => scrollToSection('testimonials')} className="flex gap-3 group w-full text-left cursor-pointer">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">Testimonials</p>
        <p className="text-xs text-foreground">
          Hear what our clients say about their experience with us.
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/testimonial.png" alt="Testimonials" fill className="object-contain group-hover:scale-105 transition" />
      </div>
    </button>

    <button onClick={() => scrollToSection('faq')} className="flex gap-3 group w-full text-left cursor-pointer">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">FAQs</p>
        <p className="text-xs text-foreground">
          Quick answers to common questions about our services.
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/faq.png" alt="FAQ" fill className="object-contain group-hover:scale-105 transition" />
      </div>
    </button>
  </div>

</div>

      )}
    </div>
  )
}
