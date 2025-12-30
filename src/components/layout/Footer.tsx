import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const router = useRouter()

  return (
    <footer
      className="w-full overflow-hidden mt-[-80px] pt-[130px] text-white"

style={{
  background: 'linear-gradient(180deg, #0F1C3D 20%, #0D255C 50%, #0F1C3D 80%)',
  backdropFilter: 'blur(200px)'
}}

    >
  <div className="max-w-[1550px] 2xl:w-full mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-4 2xl:gap-8">
    {/* Brand Column */}
    <div className="flex flex-col gap-3">
      <Link href="/">
        <Image 
          src="/images/logo_white.png" 
          alt="Synexis Ai" 
          width={206} 
          height={50} 
          className="w-[140px] lg:w-[180px] h-auto object-contain cursor-pointer hover:opacity-80 transition-opacity duration-300" 
        />
      </Link>
      <p className="text-sm mb-2 2xl:text-lg leading-[1.5] text-gray-300">
        At Synexis.ai, we connect innovation with intelligence. With headquarters in Dubai and projects delivered worldwide, we design solutions that scale across industries.
      </p>
    </div>
  
    {/* Explore Column */}
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

      
      {/* <div className="w-full text-white pt-6">
       <div className="flex items-start justify-start">
  <h1 
    className=" font-medium w-full pb-16 block text-[19vw] leading-none cursor-pointer hover:opacity-80 transition-opacity duration-300"
    onClick={() => router.push('/')}
  >
    Synexis.Ai
  </h1>
</div>
      </div> */}
    </footer>

  );
}