'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useDropdownHover } from '@/utils/utils'


export default function AboutDropdown({ textColor }: { textColor: string }) {

  const router = useRouter()
  const pathname = usePathname()
  const { isOpen, handleMouseEnter, handleMouseLeave, closeDropdown } = useDropdownHover()

  // ✅ Fixed: Properly handle hash navigation
  const navigateToPage = (path: string) => {
    closeDropdown()
    
    // Check if it's a hash link
    if (path.includes('#')) {
      const [route, hash] = path.split('#')
      
      // If we're already on the page, just scroll to element
      if (pathname === route) {
        const element = document.getElementById(hash)
        if (element) {
          const offset = 80 // Adjust for fixed header if needed
          const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top: elementPosition, behavior: 'smooth' })
        }
      } else {
        // Navigate to the page first
        router.push(path)
        // Wait for navigation and DOM to be ready, then scroll
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            const offset = 80 // Adjust for fixed header if needed
            const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top: elementPosition, behavior: 'smooth' })
          }
        }, 300) // Increased delay for page load
      }
    } else {
      router.push(path)
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
        href="/about" 
        className={`relative font-semibold text-[14px] tracking-[0.5px] ${textColor} flex items-center gap-1`}
      >
        ABOUT
        <span 
          className="text-[12px] cursor-pointer" 
          onClick={(e) => {
            e.preventDefault();
            if (isOpen) {
              closeDropdown();
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
  <div className="relative rounded-xl overflow-hidden text-white p-6 flex flex-col justify-end h-[280px] group hover:scale-[1.02] transition-transform duration-300" style={{ backgroundColor: '#0f1c34' }}>
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <Image 
        src="/images/home/img5.png" 
        alt="About Synexis AI" 
        fill
        className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-[#0f1c34]/80 to-[#0f1c34]"></div>
    </div>

   

    <div className="relative z-10">
      <h3 className="text-xl font-bold mb-2">Why Choose Us?</h3>
      <p className="text-sm text-white/90 mb-4">
        Discover our story, values, and what makes us different in delivering exceptional digital experiences.
      </p>
      <Link href="/about" onClick={closeDropdown} className="text-white text-sm inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all duration-200 bg-white/20 hover:bg-white hover:text-primary px-4 py-2 rounded-full">
        Learn More
        <span className="text-lg">→</span>
      </Link>
    </div>
  </div>


  {/* RIGHT NAV LINKS */}
  <div className="space-y-4 flex flex-col justify-center">
    {/* ITEM */}
    <button onClick={() => navigateToPage('/about#story')} className="flex gap-3 group w-full text-left cursor-pointer">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">Our Creativity</p>
        <p className="text-xs text-foreground">
          Learn about our journey and creativity
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/story.png" alt="Our Story" fill className="object-contain group-hover:scale-105 transition" />
      </div>
    </button>

    <button onClick={() => navigateToPage('/about#team')} className="flex gap-3 group w-full text-left cursor-pointer">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">Our Team</p>
        <p className="text-xs text-foreground">
          Meet the talented people behind our success.
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/team.png" alt="Our Team" fill className="object-contain group-hover:scale-105 transition" />
      </div>
    </button>

  

    <button onClick={() => navigateToPage('/about#contact')} className="flex gap-3 group w-full text-left cursor-pointer">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">Contact Us</p>
        <p className="text-xs text-foreground">
          Get in touch with our team.
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/contact.png" alt="Contact" fill className="object-contain group-hover:scale-105 transition" />
      </div>
    </button>
  </div>

</div>

      )}
    </div>
  )
}
