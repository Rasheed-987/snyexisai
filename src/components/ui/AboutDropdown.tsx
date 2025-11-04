'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDropdownHover } from '@/utils/utils'


export default function AboutDropdown({ textColor }: { textColor: string }) {

  const router = useRouter()
  const { isOpen, handleMouseEnter, handleMouseLeave, closeDropdown } = useDropdownHover()

  const navigateToPage = (path: string) => {
    closeDropdown()
    router.push(path)
  }


  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Link */}
    
      <button
        className={`relative font-semibold text-[14px] tracking-[0.5px] ${textColor} flex items-center gap-1`}
      >
        <Link href="/about" className={`relative font-semibold text-[14px] tracking-[0.5px] ${textColor} flex items-center gap-1`}>
       ABOUT
       <span className="text-[12px]">{isOpen ? '▲' : '▼'}</span>
     </Link>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-7 left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white border border-border rounded-2xl shadow-2xl z-50 p-5 transition-all duration-200 grid grid-cols-[1.4fr_1fr] gap-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
  
  {/* LEFT FEATURE CARD */}
  <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary to-blue-600 text-white p-6 flex flex-col justify-end">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
      <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
    </div>

    <div className="relative z-10">
      <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
      <p className="text-sm text-white/90 mb-4">
        Discover our story, values, and what makes us different.
      </p>
      <Link href="/about" onClick={closeDropdown} className="text-white text-sm inline-flex items-center gap-1 font-medium hover:opacity-80">
        Learn More →
      </Link>
    </div>
  </div>


  {/* RIGHT NAV LINKS */}
  <div className="space-y-4">
    {/* ITEM */}
    <button onClick={() => navigateToPage('/about')} className="flex gap-3 group w-full text-left cursor-pointer">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">Our Story</p>
        <p className="text-xs text-foreground">
          Learn about our journey and mission.
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/about.png" alt="Our Story" fill className="object-contain group-hover:scale-105 transition" />
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

    <button onClick={() => navigateToPage('/careers')} className="flex gap-3 group w-full text-left cursor-pointer">
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition">Careers</p>
        <p className="text-xs text-foreground">
          Join our team and grow with us.
        </p>
      </div>
      <div className="w-10 h-10 relative flex-shrink-0">
        <Image src="/images/career.png" alt="Careers" fill className="object-contain group-hover:scale-105 transition" />
      </div>
    </button>

    <button onClick={() => navigateToPage('/contact')} className="flex gap-3 group w-full text-left cursor-pointer">
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
