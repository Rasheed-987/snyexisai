interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer
      className="w-full overflow-hidden mt-[-80px] pt-[130px] text-white"
      style={{
        background: 'linear-gradient(180deg,rgba(15, 28, 61, 1) 59%, rgba(6, 71, 207, 1) 100%)',
        backdropFilter: 'blur(200px)'
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
    {/* Explore Column */}
    <div>
  <h3 className="font-chillax font-semibold text-lg mb-1">Explore</h3>
  <ul className="space-y-1">
        <li><a href="/" className="hover:underline">Home</a></li>
        <li><a href="/about" className="hover:underline">About Us</a></li>
        <li><a href="/services" className="hover:underline">Services</a></li>
        <li><a href="/casestudies" className="hover:underline">Case Studies</a></li>
        <li><a href="/careers" className="hover:underline">Careers</a></li>
        <li><a href="/contact" className="hover:underline">Contact Us</a></li>
      </ul>
    </div>

    {/* Learn Column */}
    <div>
  <h3 className="font-chillax font-semibold text-lg mb-1">Learn</h3>
  <ul className="space-y-1">
        <li><a href="#" className="hover:underline">Who We Are</a></li>
        <li><a href="#" className="hover:underline">Our Approach</a></li>
        <li><a href="#" className="hover:underline">Technologies</a></li>
      </ul>
    </div>

    {/* Resources Column */}
    <div>
  <h3 className="font-chillax font-semibold text-lg mb-1">Resources</h3>
  <ul className="space-y-1">
        <li><a href="#" className="hover:underline">Portfolio</a></li>
        <li><a href="#" className="hover:underline">FAQ's</a></li>
        <li><a href="#" className="hover:underline">Support</a></li>
      </ul>
    </div>

    {/* Location Column */}
    <div>
  <h3 className="font-chillax font-semibold text-lg mb-1">Our Location</h3>
  <p className="text-sm mb-2">
        At Synexis.ai, we connect innovation with intelligence. With headquarters in Dubai and projects delivered worldwide, we design solutions that scale across industries and time zones.
      </p>
      <div>
        <p className="text-sm">Dubai, UAE</p>
  <img src="/images/image.png" alt="" className="w-[70%] mt-[-20px]" />
      </div>
    </div>
  </div>

      {/* Synexis.Ai Text */}
      <div className="w-full text-white pt-6">
        <div className="">
          <div className="mt-4 text-center">
            <h1 className="font-chillax font-medium w-full block text-[19vw] leading-none text-center">
              Synexis.Ai
            </h1>
          </div>
        </div>
      </div>
    </footer>

  );
}