interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer
      className="w-full overflow-hidden mt-[-80px] pt-[130px] text-white"

style={{
  background: 'linear-gradient(180deg, #0F1C3D 20%, #0D255C 50%, #0F1C3D 80%)',
  backdropFilter: 'blur(200px)'
}}

    >
  <div className="max-w-[1440px] 2xl:w-full mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 2xl:gap-8">
    {/* Explore Column */}
    <div>
  <h3 className="font-chillax font-semibold text-lg mb-1 2xl:text-2xl 2xl:mb-3">Explore</h3>
  <ul className="space-y-1 2xl:space-y-2">
    <li><a href="/" className="hover:underline 2xl:text-lg">Home</a></li>
    <li><a href="/about" className="hover:underline 2xl:text-lg">About Us</a></li>
    <li><a href="/services" className="hover:underline 2xl:text-lg">Services</a></li>
    <li><a href="/casestudies" className="hover:underline 2xl:text-lg">Case Studies</a></li>
    <li><a href="/careers" className="hover:underline 2xl:text-lg">Careers</a></li>
    <li><a href="/contact" className="hover:underline 2xl:text-lg">Contact Us</a></li>
      </ul>
    </div>

    {/* Learn Column */}
    <div>
  <h3 className="font-chillax font-semibold text-lg mb-1 2xl:text-2xl 2xl:mb-3">Learn</h3>
  <ul className="space-y-1 2xl:space-y-2">
        <li><a href="#" className="hover:underline 2xl:text-lg">Who We Are</a></li>
        <li><a href="#" className="hover:underline 2xl:text-lg">Our Approach</a></li>
        <li><a href="#" className="hover:underline 2xl:text-lg">Technologies</a></li>
      </ul>
    </div>

    {/* Resources Column */}
    <div>
  <h3 className="font-chillax font-semibold text-lg mb-1 2xl:text-2xl 2xl:mb-3">Resources</h3>
  <ul className="space-y-1 2xl:space-y-2">
        <li><a href="#" className="hover:underline 2xl:text-lg">Portfolio</a></li>
        <li><a href="#" className="hover:underline 2xl:text-lg">FAQ's</a></li>
        <li><a href="#" className="hover:underline 2xl:text-lg">Support</a></li>
      </ul>
    </div>

    {/* Location Column */}
    <div>
  <h3 className="font-chillax font-semibold text-lg mb-1 2xl:text-2xl 2xl:mb-3">Our Location</h3>
  <p className="text-sm mb-2 2xl:text-lg">
        At Synexis.ai, we connect innovation with intelligence. With headquarters in Dubai and projects delivered worldwide, we design solutions that scale across industries and time zones.
      </p>
      <div>
        <p className="text-sm 2xl:text-lg">Dubai, UAE</p>
  <img src="/images/image.png" alt="" className="w-[70%] mt-[-20px] 2xl:w-[90%]" />
      </div>
    </div>
  </div>

      {/* Synexis.Ai Text */}
      <div className="w-full text-white pt-6">
       <div className="  lg:h-[180px] xl:h-[200px] 2xl:h-[320px] overflow-hidden flex items-start justify-start">
  <h1 className="font-chillax font-medium w-full block text-[19vw] leading-none ">
    Synexis.Ai
  </h1>
</div>
      </div>
    </footer>

  );
}