import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
      <div className=" pb-30 rounded-b-[80px]  relative z-50">
    
     
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <p className="text-sm uppercase tracking-wide font-semibold text-gray-950 mb-4">
          Design & Webflow Agency / UAE
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 mb-4">
          Award-Winning   Agency
        </h1>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-500 mb-6">
          For Digital-First Brands
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          We unite Brand, Website and Digital Product under one vision
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2">
            Work With Us
          </button>
          <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg flex items-center gap-2">
            Explore Our Case Studies
          </button>
        </div>

        {/* Trusted Brands */}
        <div className="flex flex-wrap justify-center gap-8">
          <Image src="/images/home/img1.png" alt="Emaar" width={56} height={20} className="h-5 w-14" />
          <Image src="/images/home/img2.png" alt="TED" width={56} height={20} className="h-5 w-14" />
          <Image src="/images/home/img3.png" alt="Ogilvy" width={56} height={20} className="h-5 w-14" />
          <Image src="/images/home/img4.png" alt="Webflow" width={56} height={20} className="h-5 w-14" />
        </div>
      </section>

      {/* Why Synexis AI Section */}
      <section className="bg-[#F4F0ED] py-16" style={{ minHeight: '500px' }}>
        <div className="container mx-auto px-4">
          <div className="w-full flex items-start justify-start mb-8">
            <h3 className="text-3xl lg:text-4xl font-normal text-gray-900 leading-tight">
              Why<br />Synexis AI
            </h3>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <div className="max-w-xl mx-auto text-center">
              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Meticulous Iteration
              </h4>
              <h5 className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-4">
                Uncompromising Quality
              </h5>
              <hr className="border-dotted border-b-2 border-blue-300 w-2/3 mx-auto mb-4" />
              <p className="text-md sm:text-lg lg:text-xl text-gray-500">
                Our streamlined process allows for continuous refinement, ensuring every detail aligns with your vision. Don't worry, we craft excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Section */}
  <section className="w-full flex flex-col lg:flex-row items-stretch min-h-[600px] ">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img src="/images/home/img5.png" alt="Office" className="w-full  object-cover rounded-l-xl" />
        </div>  
        <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white p-8">
          <h2 className="text-4xl lg:text-5xl font-medium text-[#1A2853] mb-6 leading-tight">
            Empowering businesses,<br />Redefining experiences...
          </h2>
          <p className="text-lg text-[#1A2853] mb-4">
            We don’t just design—we craft experiences that engage, convert, and inspire. Backed by innovation and industry expertise, we transform insights into pixel-perfect digital solutions.
          </p>
          <p className="text-lg text-[#1A2853] mb-6">
            From apps to websites, we deliver seamless, high-impact designs that redefine user experience. Let’s build something extraordinary together!
          </p>
          <button className="bg-[#377DFF] text-white px-8 py-3 rounded-full font-medium mb-8 w-fit">
            More About Us
          </button>
          <div className="bg-white rounded-xl shadow-md p-6 mt-4">
            <p className="text-2xl text-[#1A2853] font-medium mb-4">
              “Musemind was amazing to work with. Their design skills and tech expertise were on point and they really delivered.”
            </p>
            <div className="flex items-center gap-4">
              <img src="/images/home/img6.png" alt="Nedin Zahirovic" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <div className="text-lg font-semibold text-[#1A2853]">Nedin Zahirovic</div>
                <div className="text-sm text-[#1A2853]">Co-Founder, Konoam Software Technologies<br />Starnberg, Germany</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1A2853]" />
              <span className="text-xs tracking-wide text-[#1A2853] uppercase">EXPERTISE</span>
            </div>
            <h2 className="font-chillax text-[#1A2853] text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight mt-4">
              Our<br />Services
            </h2>
          </div>
        </div>
      </section>

      <section className='w-full min-h-[485px]'>
        <img src="/images/home/section.png" alt="Services" className="w-full h-full object-cover rounded-xl" />
      </section>
 <section className="w-full my-12  py-12">
  <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-20">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
      
      {/* Stat 1 */}
      <div>
  <h3 className="text-3xl sm:text-4xl font-bold text-black">250+</h3>
  <p className="text-black mt-2 text-sm sm:text-base">Projects Completed</p>
      </div>

      {/* Stat 2 */}
      <div>
  <h3 className="text-3xl sm:text-4xl font-bold text-black">180+</h3>
  <p className="text-black mt-2 text-sm sm:text-base">Happy Clients</p>
      </div>

      {/* Stat 3 */}
      <div>
  <h3 className="text-3xl sm:text-4xl font-bold text-black">10+</h3>
  <p className="text-black mt-2 text-sm sm:text-base">Years of Experience</p>
      </div>

      {/* Stat 4 */}
      <div>
  <h3 className="text-3xl sm:text-4xl font-bold text-black">50+</h3>
  <p className="text-black mt-2 text-sm sm:text-base">Team Members</p>
      </div>

    </div>
  </div>
</section>

  <section className="max-w-[1600px] mx-auto px-4">
      <section className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="mb-12">
          <span className="inline-flex items-center text-sm text-slate-500 font-regular mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-900 mr-2" />
            CASE STUDIES
          </span>

          <h2 className="font-chillax text-4xl sm:text-5xl text-slate-900 font-regular leading-tight mb-4">
            Our Latest Case Studies
          </h2>

          <p className="text-slate-600 max-w-md">
            As a UI/UX design company in Dubai, we don't just build websites — we craft immersive digital
            experiences that push boundaries and deliver business results.
          </p>
        </div>
      </section>

      <section className="w-full relative">
        <Image
          src="/images/img10.jpg"
          alt="App Design Showcase"
          width={1605}
          height={768}
          priority
          className="w-[95vw] h-auto object-cover max-h-[500px] sm:max-h-[650px] lg:max-h-[768px]"
        />
      </section>

     <section>
  {/* Two-column showcase (mobile + laptop) */}
  <div className="flex flex-col gap-8 lg:flex-row mt-8">
    <div className="flex-shrink-0">
      <Image
        src="/images/img11_1.png"
        alt="App Design Mobile"
        width={439}
        height={633}
        className="rounded-xl shadow-xl object-contain"
      />
    </div>
    <div className="flex flex-1">
      <Image
        src="/images/home/img7.png"
        alt="App Design Laptop"
        width={907}
        height={633}
        className="rounded-xl shadow-xl  w-full "
      />
    </div>
  </div>
</section>
    </section>

    </div>
  );
}
