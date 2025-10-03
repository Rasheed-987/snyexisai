interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
   <footer
   className="w-full overflow-hidden mt-[-80px] pt-40 text-white "
  style={{
    background: 'linear-gradient(180deg, rgba(6, 71, 207, 0.3) 59.62%, rgba(6, 71, 207, 0.3) 100%)',
      backdropFilter: 'blur(200px)'

  }}
>
  <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
    {/* Explore Column */}
    <div>
      <h3 className="font-chillax font-semibold text-lg mb-4">Explore</h3>
      <ul className="space-y-2">
        <li><a href="/" className="hover:underline">Home</a></li>
        <li><a href="#" className="hover:underline">About Us</a></li>
        <li><a href="#" className="hover:underline">Services</a></li>
        <li><a href="#" className="hover:underline">Case Studies</a></li>
        <li><a href="/careers" className="hover:underline">Careers</a></li>
        <li><a href="#" className="hover:underline">Contact Us</a></li>
      </ul>
    </div>

    {/* Learn Column */}
    <div>
      <h3 className="font-chillax font-semibold text-lg mb-4">Learn</h3>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Who We Are</a></li>
        <li><a href="#" className="hover:underline">Our Approach</a></li>
        <li><a href="#" className="hover:underline">Technologies</a></li>
      </ul>
    </div>

    {/* Resources Column */}
    <div>
      <h3 className="font-chillax font-semibold text-lg mb-4">Resources</h3>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Portfolio</a></li>
        <li><a href="#" className="hover:underline">FAQ's</a></li>
        <li><a href="#" className="hover:underline">Support</a></li>
      </ul>
    </div>

    {/* Location Column */}
    <div>
      <h3 className="font-chillax font-semibold text-lg mb-4">Our Location</h3>
      <p className="text-sm mb-4">
        At Synexis.ai, we connect innovation with intelligence. With headquarters in Dubai and projects delivered worldwide, we design solutions that scale across industries and time zones.
      </p>
      <div>
        <p className="text-sm">Dubai, UAE</p>
        <img src="/images/image.png" alt="" className="w-[70%] mt-[-40px]" />
      </div>
    </div>
  </div>

  {/* Synexis.Ai Text */}
  <div className="w-full text-white py-12">
    <div className="max-w-[1440px] mx-auto px-6">
      <div className="mt-12 text-center">
        <h1 className="font-chillax font-bold text-4xl sm:text-6xl md:text-8xl lg:text-[162px] tracking-wide w-full">
          Synexis.Ai
        </h1>
      </div>
    </div>
  </div>
</footer>

  );
}