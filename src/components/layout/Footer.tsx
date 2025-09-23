import { ArrowUpRight } from "lucide-react"

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`w-full min-h-[652px] -mt-20  bg-[#0F1C3D] overflow-hidden ${className}`}>
      {/* Main Footer Container */}
      <div className="relative   w-full max-w-[1440px] mx-auto h-full">
        {/* Dark Blue Background Section */}
        <div className="relative w-full bg-[#0F1C3D] pt-[140px] px-4 sm:px-6 py-8">
          {/* Main Content Grid */}
          <div className="relative w-full max-w-[1200px] mx-auto">
            {/* Navigation Columns */}
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
              
              {/* Explore Column */}
              <div className="space-y-6">
                <h3 className="font-chillax font-normal text-[color:var(--sidebar)] text-sm mb-4 sm:mb-8">
                  Explore
                </h3>
                
                <div className="space-y-4">
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-sm sm:text-[16.49px] leading-relaxed sm:leading-[28.14px] hover:text-gray-300 transition-colors">
                    Our work
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-sm sm:text-[16.49px] leading-relaxed sm:leading-[28.14px] hover:text-gray-300 transition-colors">
                    About
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Services
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Shop
                  </a>
                  <a href="/careers" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Careers
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Case Studies
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Quote Calculator
                  </a>
                </div>
              </div>

              {/* Learn Column */}
              <div className="space-y-6">
                <h3 className="font-chillax font-normal text-[color:var(--sidebar)] text-sm mb-4 sm:mb-8">
                  Learn
                </h3>
                
                <div className="space-y-4">
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-sm sm:text-[16.49px] leading-relaxed sm:leading-[28.14px] hover:text-gray-300 transition-colors">
                    Journal
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    No code
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Web3 & Metaverse
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Learn Design Systems
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Learn Webflow SEO
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Insights
                  </a>
                </div>
              </div>

              {/* Webflow Column */}
              <div className="space-y-6">
                <h3 className="font-chillax font-normal text-[color:var(--sidebar)] text-sm mb-4 sm:mb-8">
                  Webflow
                </h3>
                
                <div className="space-y-4">
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-sm sm:text-[16.49px] leading-relaxed sm:leading-[28.14px] hover:text-gray-300 transition-colors">
                    Beginners
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Intermediate
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Tools
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Cloneables
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Blog
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Templates
                  </a>
                  <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-[16.49px] leading-[28.14px] hover:text-gray-300 transition-colors">
                    Color Palette
                  </a>
                </div>
              </div>

          
              {/* Location Column */}
<div className="flex flex-col sm:flex-row gap-4 items-start min-h-0">
  <div className="flex-shrink-0">
    <h3 className="font-chillax font-normal text-[color:var(--sidebar)] text-xs mb-4">
      Our Location
    </h3>
  </div>
  
  <div className="flex-1 min-w-0">
    <div className="space-y-3">
      <p className="font-chillax font-normal text-white text-xs leading-tight max-w-[300px]">
        That's us, creatives and visionaries turning your vision into our version regardless of the timezones. Our presence is worldwide with HQ in Dubai.
      </p>
      
      <div className="space-y-1">
        <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-sm sm:text-[16.49px] leading-tight underline hover:text-gray-300">
          Privacy Policy
        </a>
        <a href="#" className="block font-chillax font-normal text-[color:var(--sidebar)] text-sm sm:text-[16.49px] leading-tight underline hover:text-gray-300">
          Terms and Condition
        </a>
      </div>
      
      {/* Dubai, UAE + Map */}
      <div className="flex items-center gap-2">
        <p className="font-chillax font-normal text-white text-xs">
          Dubai, UAE
        </p>
        
        {/* Dot image */}
        <img
          src="/images/image.png"
          alt="Location dot"
          className="opacity-100 w-12 h-10 object-contain"
        />
      </div>
    </div>
  </div>
</div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Synexis.Ai */}
        <div className="w-full min-h-[120px] sm:min-h-[180px] lg:h-[263px] bg-[#0F1C3D] mt-12 sm:mt-20 lg:mt-[147px] flex items-center justify-center px-4">
          <h1 className="font-chillax font-bold text-4xl sm:text-6xl md:text-8xl lg:text-[162px] leading-none text-white text-center tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] w-full max-w-[90vw] break-words">
            Synexis.Ai
          </h1>
        </div>

      </div>
    </footer>
  )
}