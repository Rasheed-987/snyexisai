'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from "motion/react"


export default function HomePage() {
  const router = useRouter();
  return (
      <div className=" bg-white  rounded-b-[80px] mb-30  relative z-50">
      {/* Hero Section */}
      <section className="bg-[#F9F9F9] min-h-screen flex flex-col justify-center items-center text-center px-10">
        <p className="text-sm uppercase tracking-wide font-semibold text-[#0F1C3D] mb-4">
          Design & Webflow Agency / UAE
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-[#0F1C3D] mb-4">
          Award-Winning   Agency
        </h1>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#327AED] mb-6">
          For Digital-First Brands.
        </h2>
        <p className="text-lg font-regular text-[#0F1C3D] mb-8">
          We unite Brand, Website and Digital Product under one vision
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => router.push('/contact')}
            className="bg-[#327AED] text-white px-3 md:px-10 py-5 rounded-full flex items-center gap-3 font-chillax text-base font-normal shadow-md transition-all duration-150"
          >
            Work With Us
            <img src="/images/home/button_arrow.png" alt="Arrow Right" className="w-4 h-4" />
          </button>
          <button
            onClick={() => router.push('/casestudies')}
            className="border border-[#0F1C3D] text-[#0F1C3D] px-3 md:px-10 py-5 rounded-full flex items-center gap-3 font-chillax text-base font-normal transition-all duration-150"
          >
            Explore Our Case Studies
            <img src="/images/home/button_arrow.png" alt="Arrow Right" className="w-4 h-4" />
          </button>
        </div>

      </section>

      {/* Why Synexis AI Section */}
      <section className="bg-[#F4F0ED] py-16 ">
        <div className=" mx-auto px-10">
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
          <p className="text-lg font-regular text-[#1A2853] mb-4">
            We don’t just design—we craft experiences that engage, convert, and inspire. Backed by innovation and industry expertise, we transform insights into pixel-perfect digital solutions.
          </p>
          <p className="text-lg font-regular text-[#1A2853] mb-6">
            From apps to websites, we deliver seamless, high-impact designs that redefine user experience. Let’s build something extraordinary together!
          </p>
          <button onClick={() => router.push('/about')} className="custom-about-btn">
            More About Us
          </button>
          <div className="bg-white interactive-card rounded-xl shadow-md p-6 mt-4">
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
        <div className=" mx-auto px-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1A2853]" />
              <span className="text-xs tracking-wide text-[#1A2853] uppercase">EXPERTISE</span>
            </div>
            <h2 className="font-chillax text-[#1A2853] text-4xl sm:text-5xl lg:text-6xl font-regular leading-tight mt-4">
              Our<br />Services
            </h2>
          </div>
        </div>
      </section>

      <section className='w-full md:min-h-[485px]'>
  <Image src="/images/home/Section.png" alt="Services" width={1600} height={485} className="w-full h-full object-cover rounded-xl" />
      </section>
 <section className="w-full my-12  py-12">
  <div className="  px-10">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
      
      {/* Stat 1 */}
      <div>
  <h3 className="text-3xl sm:text-4xl font-medium text-black">250+</h3>
  <p className="text-[#0F1C3D] mt-2 text-sm sm:text-base">Projects Completed</p>
      </div>

      {/* Stat 2 */}
      <div>
  <h3 className="text-3xl sm:text-4xl font-medium text-black">180+</h3>
  <p className="text-[#0F1C3D] mt-2 text-sm sm:text-base">Happy Clients</p>
      </div>

      {/* Stat 3 */}
      <div>
  <h3 className="text-3xl sm:text-4xl font-medium text-black">10+</h3>
  <p className="text-[#0F1C3D] mt-2 text-sm sm:text-base">Years of Experience</p>
      </div>

      {/* Stat 4 */}
      <div>
  <h3 className="text-3xl sm:text-4xl font-medium text-black">50+</h3>
  <p className="text-[#0F1C3D] mt-2 text-sm sm:text-base">Team Members</p>
      </div>

    </div>
  </div>
</section>

  <section className=" mx-auto px-10">
      <section className="  py-12">
        <div className="mb-12">
          <span className="inline-flex items-center text-sm text-slate-500 font-regular mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-900 mr-2" />
            CASE STUDIES
          </span>

          <h2 className="font-chillax text-4xl sm:text-5xl text-[#0F1C3D] font-regular leading-tight mb-4">
            Our Latest Case Studies
          </h2>

          <p className="text-slate-600 max-w-md">
            As a UI/UX design company in Dubai, we don't just build websites — we craft immersive digital
            experiences that push boundaries and deliver business results.
          </p>
        </div>
      </section>

      <section className="w-full relative">
        <div className="w-full overflow-hidden rounded-[29px] min-h-[200px] sm:min-h-[350px] md:min-h-[612px] relative">
          <Image
            src="/images/img10.jpg"
            alt="App Design Showcase"
            fill
            priority
            sizes="100vw"
            className="object-obtain sm:rounded-[22px] rounded-[29px]"
          />
        </div>
      </section>


   <section className="mt-8">
  <div className="flex flex-col gap-2 lg:flex-row items-stretch">
    {/* Left: Mobile Image */}
    <div className=" lg:w-[40%] flex items-center justify-center">
      <div className="w-full h-full max-h-[600px] flex ">
        <Image
          src="/images/img11_1.png"
          alt="App Design Mobile"
          width={439}
          height={633}
          className="rounded-xl shadow-xl w-full h-full object-obtain"
        />
      </div>
    </div>

    {/* Right: Laptop Image */}
    <div className="flex-1 w-full flex items-center justify-center">
      <div className="w-full h-full max-h-[600px]">
        <Image
          src="/images/home/img7.png"
          alt="App Design Laptop"
          width={907}
          height={633}
          className="rounded-xl shadow-xl w-full h-full object-obtain"
        />
      </div>
    </div>
  </div>
</section>

    </section>


    {/* Our Approach to AI Success Section */}
    <section className="w-full bg-white py-16 px-4 flex flex-col items-center font-[Chillax,sans-serif]">
      <h2 className="text-[#1A2341] text-3xl sm:text-5xl lg:text-6xl font-medium text-center tracking-tight mb-4">Our Approach to AI Success</h2>
      <p className="text-[#6B7280] text-base sm:text-lg lg:text-xl text-center max-w-2xl mb-12">We blend strategic insight, advanced technology, and a commitment to excellence to drive transformative results for your business.</p>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Card 1 */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-10">
                <Image src="/images/home/img1_1.png" alt="POC" width={130} height={130} className="object-contain w-[130px] h-[130px] approach-img-hover" />
          </span>
          <h3 className="text-[#1A2341] text-xl font-medium mb-2">POC in 4 – 6 weeks</h3>
          <p className="text-[#6B7280] text-base">See impact quickly with our rapid prototyping approach.</p>
        </div>
        {/* Card 2 */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-10">
                <Image src="/images/home/img1_2.png" alt="End-to-End AI Delivery" width={130} height={130} className="object-contain w-[130px] h-[130px] approach-img-hover" />
          </span>
          <h3 className="text-[#1A2341] text-xl font-medium mb-2">End-to-End AI Delivery</h3>
          <p className="text-[#6B7280] text-base">From data prep to deployment to monitoring – we handle it all.</p>
        </div>
        {/* Card 3 */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-10">
                <Image src="/images/home/img1_3.png" alt="Regulatory Compliance" width={130} height={130} className="object-contain w-[130px] h-[130px] approach-img-hover" />
          </span>
          <h3 className="text-[#1A2341] text-xl font-medium mb-2">Regulatory Compliance</h3>
          <p className="text-[#6B7280] text-base">HIPAA, CDPR, and SOC2 practices implemented from the ground up – so your AI is secure and scalable.</p>
        </div>
        {/* Card 4 */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-10">
                <Image src="/images/home/img1_4.png" alt="Proven ROI" width={130} height={130} className="object-contain w-[130px] h-[130px] approach-img-hover" />
          </span>
          <h3 className="text-[#1A2341] text-xl font-medium mb-2">Proven ROI</h3>
          <p className="text-[#6B7280] text-base">Documented case studies with measurable, quantifiable results.</p>
        </div>
      </div>
    </section>

<section className="w-full bg-white py-16 px-4 flex flex-col items-center font-[Chillax,sans-serif]">
  <div>
    <h2 className="text-[#1A2341] text-3xl sm:text-5xl lg:text-6xl font-medium text-center tracking-tight mb-4">Delight Clients</h2>
    <p className="text-[#6B7280] text-base sm:text-lg lg:text-xl text-center max-w-2xl mb-12">We blend strategic insight, advanced technology, and a commitment to excellence to drive transformative results for your business.</p>
  </div>

      <div className="w-full max-w-7xl px-10 flex flex-col gap-y-0">
        {/* Row 1 */}
        <hr className="w-full border-t border-gray-200" />
        <motion.div 
          className="flex flex-row flex-wrap justify-center items-center gap-x-4 sm:gap-x-10 gap-y-4 py-4 sm:py-6"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img src="/images/client/img1.png" alt="Logo 1" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
          <img src="/images/client/img2.png" alt="Logo 2" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
          <img src="/images/client/img3.png" alt="Logo 3" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
          <img src="/images/client/img4.png" alt="Logo 4" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
          <img src="/images/client/img5.png" alt="Logo 5" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
          <img src="/images/client/img6.png" alt="Logo 6" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
        </motion.div>
        <hr className="w-full border-t border-gray-200" />
        {/* Row 2 */}
        <motion.div 
          className="flex flex-row flex-wrap justify-center items-center gap-x-4 sm:gap-x-10 gap-y-4 py-4 sm:py-6"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img src="/images/client/img7.png" alt="Logo 7" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
          <img src="/images/client/img8.png" alt="Logo 8" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
          <img src="/images/client/img9.png" alt="Logo 9" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
          <img src="/images/client/img10.png" alt="Logo 10" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
          <img src="/images/client/img11.png" alt="Logo 11" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
          <img src="/images/client/img12.png" alt="Logo 12" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
        </motion.div>
        <hr className="w-full border-t border-gray-200" />
        {/* Row 3 */}
        <motion.div 
          className="flex flex-row  flex-wrap sm:gap-x-3 gap-y-4 py-4 sm:py-6   w-full justify-center items-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          <img src="/images/client/img13.png" alt="Logo 13" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0 inline-block" />
          <img src="/images/client/img14.png" alt="Logo 14" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0 inline-block" />
          <img src="/images/client/img15.png" alt="Logo 15" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0 inline-block" />
          <img src="/images/client/img16.png" alt="Logo 16" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0 inline-block" />
          <img src="/images/client/img17.png" alt="Logo 17" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0 inline-block" />
          <img src="/images/client/img18.png" alt="Logo 18" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0 inline-block" />
          <img src="/images/client/img19.png" alt="Logo 19" className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0 inline-block" />
        </motion.div>
        <hr className="w-full border-t border-gray-200" />
      </div>

</section>

<section className='w-full  pt-30 bg-[#F4F0ED] mb-20'>
<div className="w-full  flex flex-col md:flex-row md:justify-between p-6 md:p-10 gap-8  font-[Chillax,sans-serif]">
          <div className="flex-1 flex flex-col ">
            <h2 className="text-[#1A2341] text-2xl sm:text-4xl lg:text-5xl font-medium leading-tight mb-4">Innovative design is<br />our tool to reshape<br />business</h2>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[#1A2341] text-base sm:text-lg mb-4">We're a passionate team of UI/UX designers dedicated to creating intuitive digital experiences. With years of experience, we blend creativity and strategy to design solutions that engage users and drive business success.</p>
            <p className="text-[#1A2341] text-base sm:text-lg mb-6">We turn ideas into seamless, Beautiful designs. Let's build digital experiences that not only look stunning but also deliver real results.</p>
            <button onClick={() => router.push('/about')}  className="custom-about-btn">More About Us</button>
          </div>
        </div>
<div className="w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className=" flex items-center justify-center">
            <img src="/images/client/img1_1.png" alt="Office 1" className="w-[370px] h-[274px] object-cover" />
          </div>
          <div className=" flex items-center justify-center">
            <img src="/images/client/img1_4.png" alt="Office 2" className="w-[370px] h-[499px] object-cover" />
          </div>
          <div className=" flex items-center justify-center">
            <img src="/images/client/img1_2.png" alt="Office 3" className="w-[370px] h-[273px] object-cover" />
          </div>
          <div className=" flex items-center justify-center">
            <img src="/images/client/img1_3.png" alt="Office 4" className="w-[370px] h-[499px] object-cover" />
          </div>
        </div>
</section>

<section className="w-full bg-white py-16 space-y-8 px-10 flex flex-col items-center font-[Chillax,sans-serif]">
  <div className="w-full flex md:justify-between  items-center">
    <div className="w-full md:w-[5 0%] flex flex-col justify-center">
      <h2 className="text-[#1A2341] text-3xl sm:text-5xl lg:text-6xl font-medium text-center md:text-left tracking-tight mb-4 md:mb-0 w-full">Words that define our UI/UX<br />design capabilities</h2>
    </div>
    <div className="hidden md:flex flex-row gap-4 items-center mr-20">
      <span className="bg-white shadow flex items-center justify-center" style={{ borderRadius: '21px', width: '43px', height: '43px' }}>
        <img src="/images/home/arrow-left-solid-full.svg" alt="Left Arrow" style={{ width: '35px', height: '21px' }} />
      </span>
      <span className="bg-white shadow flex items-center justify-center" style={{ borderRadius: '21px', width: '43px', height: '43px' }}>
        <img src="/images/home/arrow-right-solid-full.svg" alt="Right Arrow" style={{ width: '21px', height: '21px' }} />
      </span>
    </div>
  </div>
 {/* Card Div */}
  <div className="interactive-card flex flex-col md:flex-row bg-white rounded-3xl  overflow-hidden max-w-7xl mx-auto w-full" >
  {/* Mobile arrow nav below card */}
  
    {/* Left: Project Info */}
    <div className="md:w-1/2 w-full bg-[#181C23] flex flex-col justify-between">
      <div>
        <img src="/images/home/img8.png" alt="Project Screenshot" className="rounded-xl w-full h-full object-contain" />
      </div>
    </div>
    {/* Right:  */}
    <div className="md:w-1/2 w-full flex flex-col justify-center p-8 gap-4">
      <div className="flex items-center gap-3 mb-2">
        <img src="/images/home/profile.png" alt="Robin Fish" className="w-12 h-12 rounded-full object-cover" />
        <div>
          <div className="text-[#181C23] font-semibold text-base">Robin Fish</div>
          <div className="text-xs text-gray-500">Founder &amp; CEO, Arrive</div>
        </div>
      </div>
      <blockquote className="text-[#181C23] text-lg font-medium mb-4">“They brought our app redesign to life beyond expectations! We’re thrilled with the results and truly loved collaborating with their incredibly talented team.”</blockquote>
      <div className="flex flex-col gap-1">
        <img src="/images/home/arrive.png" alt="Location" className="w-[119.77px] h-[42.58px] object-contain" />
        <span className="text-gray-500 text-xs">New York, USA</span>
      </div>
    </div>

  </div>
  <div className="flex flex-row gap-4 items-center mt-6 justify-center sm:hidden">
    <span className="bg-white shadow flex items-center justify-center" style={{ borderRadius: '21px', width: '43px', height: '43px' }}>
      <img src="/images/home/arrow-left-solid-full.svg" alt="Left Arrow" style={{ width: '35px', height: '21px' }} />
    </span>
    <span className="bg-white shadow flex items-center justify-center" style={{ borderRadius: '21px', width: '43px', height: '43px' }}>
      <img src="/images/home/arrow-right-solid-full.svg" alt="Right Arrow" style={{ width: '21px', height: '21px' }} />
    </span>
  </div>

 
{/* Enhanced CTA Section */}
<section className="w-full max-w-7xl mx-auto rounded-[40px] group overflow-hidden cursor-pointer relative mt-8 shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
  
  {/* Background Image: Scales up on group hover */}
  <div className="absolute inset-0 w-full h-full">
    <img
      src="/images/home/background.png"
      alt="Abstract background"
      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
    />
  </div>

  {/* Overlay: Becomes slightly more transparent on group hover */}
  <div className="absolute inset-0 bg-[#0A2341]/80 transition-all duration-500 group-hover:bg-[#0A2341]/70" />

  
  <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4 ">
    <h2 className="font-chillax text-white text-3xl sm:text-5xl lg:text-6xl font-medium text-center tracking-tight mb-4">
      Let’s Create Tomorrow<br />Hand in Hand!
    </h2>
    <p className="text-white text-base sm:text-lg text-center max-w-xl mb-8">
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
    </p>
    
    {/* Button: Enhanced hover effects */}
    <button className="bg-white text-[#0A2341] px-8 py-3 rounded-full font-medium shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:-translate-y-1 active:scale-95">
      Free Consultation
    </button>
  </div>
</section>

</section>
 {/* FAQ Section */}
    <section className="w-full py-16 px-7 flex   font-[Chillax,sans-serif]">
      <div className="w-full   flex flex-col  md:flex-row md:justify-between md:gap-[120px]">
        {/* Left: Heading */}
        <div className="md:w-1/3 w-full flex flex-col justify-start items-start pl-4 md:pr-8 mb-8 md:mb-0">
          <h2 className="text-[#1A2341] text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight mb-2">Frequently</h2>
          <div className="text-[#1A2341] text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight">Asked<br />Questions</div>
        </div>
        {/* Right: FAQ List */}
        <div className="md:w-2/3 w-full flex flex-col gap-2">
          {[
            'Why should I choose Synexis for my project?',
            'What industries does Synexis specialize in?',
            'How does Synexis process differ from other agencies?',
            'Do you exclusively use Webflow for projects?',
            'Can Synexis handle large-scale projects?',
            'What kind of support can I expect after my project is completed?',
            'How quickly can Synexis deliver results?',
            'Is Synexis a good fit if I’m looking for a branding agency in Dubai?'
          ].map((q, i) => (
            <div key={i} className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-[#1A2341] text-base sm:text-lg lg:text-xl font-normal">{q}</span>
              <span className="text-[#1A2341] text-2xl font-bold select-none">+</span>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
