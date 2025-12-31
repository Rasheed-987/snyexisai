import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const router = useRouter()

  return (
    <footer
      className="w-full mt-[-80px] pt-[130px] pb-20 text-white"

style={{
  background: 'linear-gradient(180deg, #0F1C3D 20%, #0D255C 50%, #0F1C3D 80%)',
  backdropFilter: 'blur(200px)'
}}

    >
  <div className="mx-auto px-6 flex flex-col lg:flex-row justify-between gap-10 2xl:gap-20">
    {/* Brand Column */}
    <div className="flex flex-col items-center gap-3">
      <Link href="/">
        <Image 
          src="/images/logo_white.png" 
          alt="Synexis Ai" 
          width={206} 
          height={50} 
          className="w-[140px] lg:w-[180px] h-auto object-contain cursor-pointer hover:opacity-80 transition-opacity duration-300" 
        />
      </Link>
      <p className="text-sm mb-2 2xl:text-lg leading-[1.1] text-center lg:text-start text-gray-300">
        At Synexis.ai, we connect innovation with intelligence.
      </p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
          <Facebook size={20} />
        </a>
        <a href="https://twitter.com/synexis_ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
          <Twitter size={20} />
        </a>
        <a href="https://www.instagram.com/synexis_ai/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
          <Instagram size={20} />
        </a>
        <a href="https://www.linkedin.com/company/synexis-ai/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
          <Linkedin size={20} />
        </a>
      </div>
    </div>
  
    {/* Explore Column */}
    <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-8 2xl:gap-16">


<div>
      <h3 className="font-semibold text-lg mb-2 2xl:text-2xl 2xl:mb-4">Explore</h3>
      <ul className="space-y-1 2xl:space-y-2">
        <li><a href="/" className="text-base hover:underline 2xl:text-lg">Home</a></li>
        <li><a href="/about" className="text-base hover:underline 2xl:text-lg">About Us</a></li>
        <li><a href="/services" className="text-base hover:underline 2xl:text-lg">Services</a></li>
        <li><a href="/casestudies" className="text-base hover:underline 2xl:text-lg">Case Studies</a></li>
        <li><a href="/careers" className="text-base hover:underline 2xl:text-lg">Careers</a></li>
        <li><a href="/contact" className="text-base hover:underline 2xl:text-lg">Contact Us</a></li>
      </ul>
    </div>

    {/* Learn Column */}
    <div>
      <h3 className="font-semibold text-lg mb-2 2xl:text-2xl 2xl:mb-4">Learn</h3>
      <ul className="space-y-1 2xl:space-y-2">
        <li><a href="#" className="text-base hover:underline 2xl:text-lg">Who We Are</a></li>
        <li><a href="#" className="text-base hover:underline 2xl:text-lg">Our Approach</a></li>
        <li><a href="#" className="text-base hover:underline 2xl:text-lg">Technologies</a></li>
      </ul>
    </div>

    {/* Resources Column */}
    <div>
      <h3 className="font-semibold text-lg mb-2 2xl:text-2xl 2xl:mb-4">Resources</h3>
      <ul className="space-y-1 2xl:space-y-2">
        <li><a href="#" className="text-base hover:underline 2xl:text-lg">Portfolio</a></li>
        <li><a href="#" className="text-base hover:underline 2xl:text-lg">FAQ's</a></li>
        <li><a href="#" className="text-base hover:underline 2xl:text-lg">Support</a></li>
      </ul>
    </div>

    {/* Location Column */}
    <div>
      <h3 className="font-semibold text-lg mb-2 2xl:text-2xl 2xl:mb-4">Our Location</h3>
      <div className="space-y-2 text-sm 2xl:text-lg">
        <p className="flex items-center gap-2">info@synexisai.com</p>
        <p className="flex items-center gap-2">+971 56 557 4998</p>
        <p className="flex items-center gap-2">Ajman, UAE</p>
      </div>
    </div>

</div>
    
  </div>


    </footer>

  );
}