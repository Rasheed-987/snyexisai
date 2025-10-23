'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from "motion/react"
import { useState,useEffect } from 'react';
import { useServices } from '@/context/ServicesContext';
import { useCaseStudies } from '@/context/CaseStudyContext';
import ServicesCard from '@/components/services/servicesCard';



export default function HomePage() {



  const { servicesData:service, loading, error } = useServices();
  const { caseStudiesData:caseStudy, loading: caseStudiesLoading, error: caseStudiesError } = useCaseStudies();
  const router = useRouter();



  const faqs: { question: string; answer: string }[] = [
    {
      question: 'Why should I choose Synexis for my project?',
      answer:
        'We combine strategy, design, and engineering to deliver measurable outcomes. Our process focuses on business impact, not just deliverables.'
    },
    {
      question: 'What industries does Synexis specialize in?',
      answer:
        'We have experience across SaaS, healthcare, fintech, logistics, and e‑commerce, adapting our UX and engineering practices to each domain.'
    },
    {
      question: 'How does Synexis process differ from other agencies?',
      answer:
        'Short feedback loops, iterative delivery, and close collaboration. You see progress weekly and can steer direction early.'
    },
    {
      question: 'Do you exclusively use Webflow for projects?',
      answer:
        'No. We pick the right stack per project: Webflow for marketing, Next.js for apps, and custom backends where needed.'
    },
    {
      question: 'Can Synexis handle large-scale projects?',
      answer:
        'Yes. We design scalable architectures, CI/CD, observability, and follow security best practices to support growth.'
    },
    {
      question: 'What support can I expect after my project is completed?',
      answer:
        'We offer post‑launch support: performance tuning, A/B testing, feature iterations, and maintenance SLAs.'
    },
    {
      question: 'How quickly can Synexis deliver results?',
      answer:
        'POCs typically ship in 4–6 weeks. Production releases depend on scope, with milestones delivered every sprint.'
    },
    {
      question: 'Is Synexis a good fit if I’m looking for a branding agency in Dubai?',
      answer:
        'Yes. Our team covers brand, product, and web. We can deliver brand systems alongside websites and apps.'
    }
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
      <div className=" bg-white   rounded-b-[80px] mb-30   relative z-50">
      {/* Hero Section */}
      <section className="bg-[#F9F9F9] min-h-screen flex flex-col justify-center items-center text-center px-10">
        <p className="text-sm uppercase tracking-wide 2xl:text-lg font-semibold text-[#0F1C3D] mb-4">
          Design & Webflow Agency / UAE
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl font-medium text-[#0F1C3D] mb-4">
          Award-Winning   Agency
        </h1>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-[#327AED] mb-6">
          For Digital-First Brands.
        </h2>
        <p className="text-lg xl:text-xl font-regular text-[#0F1C3D] mb-8">
          We unite Brand, Website and Digital Product under one vision
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => router.push('/contact')}
            className="bg-[#327AED] text-white px-3 md:px-10 py-5 rounded-full flex items-center gap-3 font-chillax text-base font-normal shadow-md transition-all duration-150"
          >
            Work With Us
            <img src="/images/home/button_arrow.png" alt="Arrow Right" className="w-4 h-4 invert" />
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
      <section className="bg-[#F4F0ED] lg:min-h-[700px] xl:min-h-[1000px] py-16 xl:py-24 ">
        <div className=" mx-auto flex flex-col lg:gap-[120px] xl:gap-[160px] px-10">
          <div className="w-full flex items-start justify-start mb-8">
            <h3 className="text-3xl xl:text-5xl font-normal text-gray-900 leading-tight">
              Why<br />Synexis AI
            </h3>
          </div>
          <div className="w-full flex flex-col lg:mt-8 items-center justify-center">
            <div className="max-w-xl xl:max-w-3xl mx-auto text-center">
              <h4 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-900 mb-2">
                Meticulous Iteration
              </h4>
              <h5 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-600 mb-4">
                Uncompromising Quality
              </h5>
            
              <p className="text-md sm:text-lg lg:text-xl xl:text-2xl text-gray-500">
                Our streamlined process allows for continuous refinement, ensuring every detail aligns with your vision. Don't worry, we craft excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Section */}
      <section className="w-full flex flex-col lg:flex-row min-h-[600px] xl:min-h-[720px] ">
        <div className="w-full lg:w-1/2 flex items-stretch">
          <img src="/images/home/img5.png" alt="Office" className="w-full lg:h-[100vh] object-cover rounded-l-xl" />
        </div>  
        {/* cards */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white p-8 lg:p-5 ">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-medium text-[#1A2853] mb-6 leading-tight">
            Empowering businesses,<br />Redefining experiences...
          </h2>
          <p className="text-base md:text-sm lg:text-md xl:text-lg 2xl:text-xl font-regular text-[#1A2853] mb-4 leading-relaxed">
            We don’t just design—we craft experiences that engage, convert, and inspire. Backed by innovation and industry expertise, we transform insights into pixel-perfect digital solutions.
          </p>
          <p className="text-base md:text-sm lg:text-md xl:text-lg 2xl:text-xl font-regular text-[#1A2853] mb-6 leading-relaxed">
            From apps to websites, we deliver seamless, high-impact designs that redefine user experience. Let’s build something extraordinary together!
          </p>
          <button onClick={() => router.push('/about')} className="custom-about-btn">
            More About Us
          </button>
          <div className="bg-white  rounded-xl p-6  mt-6">
            <p className=" text-[#1A2853] xl:text-xl font-medium mb-4">
              “Musemind was amazing to work with. Their design skills and tech expertise were on point and they really delivered.”
            </p>
            <div className="flex items-center gap-4 xl:gap-6">
              <img src="/images/home/img6.png" alt="Nedin Zahirovic" className="w-12 h-12  xl:w-15 xl:h-15 2xl:w-17 2xl:h-17 rounded-full object-cover" />
              <div>
                <div className="text-base md:text-lg 2xl:text-xl font-semibold text-[#1A2853]">Nedin Zahirovic</div>
                <div className="text-xs md:text-sm xl:text-base text-[#1A2853]">Co-Founder, Konoam Software Technologies<br />Starnberg, Germany</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 xl:py-24">
        <div className='pt-20'>
        <h2 className="text-[#1A2341] text-3xl text-center sm:text-4xl lg:text-5xl font-medium leading-tight mb-20">
          Our Services
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {service.map((service: any) => (
            <ServicesCard
              key={service._id}
              title={service.serviceTitle}
              image={service.images?.banner} // Adjusted based on schema
            />
          ))}
        </div>
      </div>
      </section>

      {/* Stats Section */}
      
<section className="w-full my-12   py-12">
  <div className="   px-10">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
      
      {/* Stat 1 */}
      <div>
  <h3 className="text-3xl sm:text-4xl  font-medium text-black">250+</h3>
  <p className="text-[#0F1C3D] mt-2 text-sm sm:text-base xl:text-lg">Projects Completed</p>
      </div>

      {/* Stat 2 */}
      <div>
  <h3 className="text-3xl sm:text-4xl  font-medium text-black">180+</h3>
  <p className="text-[#0F1C3D] mt-2 text-sm sm:text-base xl:text-lg">Happy Clients</p>
      </div>

      {/* Stat 3 */}
      <div>
  <h3 className="text-3xl sm:text-4xl  font-medium text-black">10+</h3>
  <p className="text-[#0F1C3D] mt-2 text-sm sm:text-base xl:text-lg">Years of Experience</p>
      </div>

      {/* Stat 4 */}
      <div>
  <h3 className="text-3xl sm:text-4xl  font-medium text-black">50+</h3>
  <p className="text-[#0F1C3D] mt-2 text-sm sm:text-base xl:text-lg">Team Members</p>
      </div>

    </div>
  </div>
</section>

  <section className=" mx-auto px-10">
      <section className="   py-12">
        <div className="mb-12">
          <span className="inline-flex items-center text-sm text-slate-500 font-regular mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-900 mr-2" />
            CASE STUDIES
          </span>

          <h2 className="font-chillax text-2xl sm:text-5xl xl:text-6xl text-[#0F1C3D] font-regular leading-tight mb-4">
            Our Latest Case Studies
          </h2>

          <p className="text-slate-600 max-w-md xl:max-w-2xl text-base xl:text-xl">
            As a UI/UX design company in Dubai, we don't just build websites — we craft immersive digital
            experiences that push boundaries and deliver business results.
          </p>
        </div>
      </section>


    <section className="w-full relative">
      

        {loading ? (
          <p className="text-white">Loading case studies...</p>
        ) :    <section className="w-full mt-8 bg-gray-100 space-y-8">
  {Array.isArray(caseStudy) && caseStudy.map((caseItem: any) => (
    <div
      key={caseItem._id}
      className="relative w-full h-[250px] sm:h-[400px] md:h-[550px] lg:h-[650px] rounded-2xl overflow-hidden"
     style={{
          background: 'linear-gradient(169.02deg, #132225 0%, #0B1016 108.44%)',
        }}
    >
      <Link href={`/caseStudiesDetails/${caseItem._id}`} className="block w-full h-full">
        <Image
          src={caseItem.images?.banner}
          alt={caseItem.caseTitle || caseItem.title || 'Case Study Banner'}
          fill
          priority={false}
          className="object-obtain"
        />
      </Link>

    </div>
  ))}
</section>
}
    
    </section>

   <section className="mt-8">
  <div className="flex flex-col gap-4 lg:flex-row items-stretch">
    {/* Left: Mobile Image (40% on lg) */}
    <div className="w-full  lg:w-[40%]">
      <div className="w-full relative h-[350px]  md:h-[600px] lg:h-[700px] xl:h-[800px]">
            {/* Badge: App Design */}
         <span
          className="absolute top-[7px] left-2 lg:left-4 lg:top-[8px] inline-flex items-center px-3 py-1 rounded-full bg-white text-xs sm:text-sm font-medium text-[#0F1C3D] shadow-md "
          aria-hidden="true"
        >
          App Design
        </span> 
        <Image
          src="/images/img11_1.png"
          alt="App Design Mobile"
          width={439}
          height={633}
          sizes="(min-width:1024px) 40vw, 100vw"
          className="rounded-xl shadow-xl w-full h-full object-obtain"
        />
      </div>
    </div>

    {/* Right: Laptop Image (60% on lg) */}
    <div className="w-full lg:w-[60%]">
      <div className="w-full relative h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] xl:h-[800px]">
            {/* Badge: App Design */}
        <span
          className="absolute lg:right-4 right-2  top-4 inline-flex items-center px-3 py-1 rounded-full bg-white text-xs sm:text-sm font-medium text-[#0F1C3D] shadow-md mb-2 sm:mb-0"
          aria-hidden="true"
        >
          App Design
        </span>
        <Image
          src="/images/home/logistic.png"
          alt="App Design Laptop"
          width={907}
          height={780}
          sizes="(min-width:1024px) 60vw, 100vw"
          className="rounded-xl shadow-xl w-full h-full object-obtain"
        />
      </div>
    </div>
  </div>
</section>

    </section>


    {/* Our Approach to AI Success Section */}
      <section className="w-full bg-white py-16 xl:py-24 px-4 flex flex-col items-center">
      <h2 className="text-[#1A2341] text-3xl sm:text-3xl lg:text-4xl xl:text-7xl font-medium text-center tracking-tight mb-4">Our Approach to AI Success</h2>
      <p className="text-[#6B7280] text-base sm:text-lg lg:text-xl xl:text-2xl text-center max-w-2xl xl:max-w-4xl mb-12">We blend strategic insight, advanced technology, and a commitment to excellence to drive transformative results for your business.</p>
      <div className="w-full max-w-6xl xl:max-w-8xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Card 1 */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-10">
              <Image src="/images/home/img1_1.png" alt="POC" width={130} height={130} className="object-contain w-[130px] h-[130px] xl:w-[160px] xl:h-[160px] approach-img-hover" />
          </span>
          <h3 className="text-[#1A2341] text-xl xl:text-2xl font-medium mb-2">POC in 4 – 6 weeks</h3>
          <p className="text-[#6B7280] text-base xl:text-lg">See impact quickly with our rapid prototyping approach.</p>
        </div>
        {/* Card 2 */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-10">
              <Image src="/images/home/img1_2.png" alt="End-to-End AI Delivery" width={130} height={130} className="object-contain w-[130px] h-[130px] xl:w-[160px] xl:h-[160px] approach-img-hover" />
          </span>
          <h3 className="text-[#1A2341] text-xl xl:text-2xl font-medium mb-2">End-to-End AI Delivery</h3>
          <p className="text-[#6B7280] text-base xl:text-lg">From data prep to deployment to monitoring – we handle it all.</p>
        </div>
        {/* Card 3 */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-10">
              <Image src="/images/home/img1_3.png" alt="Regulatory Compliance" width={130} height={130} className="object-contain w-[130px] h-[130px] xl:w-[160px] xl:h-[160px] approach-img-hover" />
          </span>
          <h3 className="text-[#1A2341] text-xl xl:text-2xl font-medium mb-2">Regulatory Compliance</h3>
          <p className="text-[#6B7280] text-base xl:text-lg">HIPAA, CDPR, and SOC2 practices implemented from the ground up – so your AI is secure and scalable.</p>
        </div>
        {/* Card 4 */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-10">
              <Image src="/images/home/img1_4.png" alt="Proven ROI" width={130} height={130} className="object-contain w-[130px] h-[130px] xl:w-[160px] xl:h-[160px] approach-img-hover" />
          </span>
          <h3 className="text-[#1A2341] text-xl xl:text-2xl font-medium mb-2">Proven ROI</h3>
          <p className="text-[#6B7280] text-base xl:text-lg">Documented case studies with measurable, quantifiable results.</p>
        </div>
      </div>
    </section>

<section className="w-full bg-white py-16 px-4 flex flex-col items-center">
  <div>
    <h2 className="text-[#1A2341] text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-center tracking-tight mb-4">Delight Clients</h2>
    <p className="text-[#6B7280] text-base sm:text-lg lg:text-xl text-center max-w-2xl xl:max-w-4xl mb-12">We blend strategic insight, advanced technology, and a commitment to excellence to drive transformative results for your business.</p>
  </div>


      <div className="w-full max-w-7xl px-10 flex flex-col gap-y-0">
        {/* Row 1: Infinite scroll */}
        <hr className="w-full border-t border-gray-200" />
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex flex-row gap-x-4 sm:gap-x-10 py-4 sm:py-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity ,repeatType: 'loop',repeatDelay: 0}}
            style={{ width: "max-content" }}
          >
            {/* Logos duplicated for seamless loop */}
            {["/images/client/img1.png","/images/client/img2.png","/images/client/img3.png","/images/client/img4.png","/images/client/img5.png","/images/client/img6.png",
              "/images/client/img1.png","/images/client/img2.png","/images/client/img3.png","/images/client/img4.png","/images/client/img5.png","/images/client/img6.png"].map((src, i) => (
              <img key={i} src={src} alt={`Logo ${i+1}`} className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
            ))}
          </motion.div>
        </div>
        <hr className="w-full border-t border-gray-200" />
        {/* Row 2: Infinite scroll */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex flex-row gap-x-4 sm:gap-x-10 py-4 sm:py-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            style={{ width: "max-content" }}
          >
            {["/images/client/img7.png","/images/client/img8.png","/images/client/img9.png","/images/client/img10.png","/images/client/img11.png","/images/client/img12.png",
              "/images/client/img7.png","/images/client/img8.png","/images/client/img9.png","/images/client/img10.png","/images/client/img11.png","/images/client/img12.png"].map((src, i) => (
              <img key={i} src={src} alt={`Logo ${i+7}`} className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
            ))}
          </motion.div>
        </div>
        <hr className="w-full border-t border-gray-200" />
        {/* Row 3: Infinite scroll */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex flex-row sm:gap-x-3 py-4 sm:py-6 w-full"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            style={{ width: "max-content" }}
          >
            {["/images/client/img13.png","/images/client/img14.png","/images/client/img15.png","/images/client/img16.png","/images/client/img17.png","/images/client/img18.png","/images/client/img19.png",
              "/images/client/img13.png","/images/client/img14.png","/images/client/img15.png","/images/client/img16.png","/images/client/img17.png","/images/client/img18.png","/images/client/img19.png"].map((src, i) => (
              <img key={i} src={src} alt={`Logo ${i+13}`} className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0 inline-block" />
            ))}
          </motion.div>
        </div>
        <hr className="w-full border-t border-gray-200" />
      </div>

</section>

<section className='w-full   pt-30 bg-[#F4F0ED] mb-20'>
<div className="w-full   flex flex-col md:flex-row md:justify-between p-6 md:p-10 xl:p-16 gap-8  ">
          <div className="flex-1 flex flex-col ">
            <h2 className="text-[#1A2341] text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight mb-4">Innovative design is<br />our tool to reshape<br />business</h2>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[#1A2341] text-base sm:text-lg 2xl:text-xl mb-4">We're a passionate team of UI/UX designers dedicated to creating intuitive digital experiences. With years of experience, we blend creativity and strategy to design solutions that engage users and drive business success.</p>
            <p className="text-[#1A2341] text-base sm:text-lg 2xl:xl mb-6">We turn ideas into seamless, Beautiful designs. Let's build digital experiences that not only look stunning but also deliver real results.</p>
            <button onClick={() => router.push('/about')}   className="custom-about-btn">More About Us</button>
          </div>
        </div>
<div className="w-full   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className=" flex items-center justify-center">
            <img src="/images/client/img1_1.png" alt="Office 1" className="w-[370px] h-[274px] 2xl:w-[500px] 2xl:h-[360px] object-cover" />
          </div>
          <div className=" flex items-center justify-center">
            <img src="/images/client/img1_4.png" alt="Office 2" className="w-[370px] h-[499px] 2xl:w-[500px] 2xl:h-[640px] object-cover" />
          </div>
          <div className=" flex items-center justify-center">
            <img src="/images/client/img1_2.png" alt="Office 3" className="w-[370px] h-[273px] 2xl:w-[500px] 2xl:h-[360px] object-cover" />
          </div>
          <div className=" flex items-center justify-center">
            <img src="/images/client/img1_3.png" alt="Office 4" className="w-[370px] h-[499px] 2xl:w-[500px] 2xl:h-[640px] object-cover" />
          </div>
        </div>
</section>

<section className="w-full bg-white py-16 space-y-8 px-10 flex flex-col items-center">
  <div className="w-full flex md:justify-between   items-center">
    <div className="w-full md:w-[5 0%] flex flex-col justify-center">
      <h2 className="text-[#1A2341] text-1xl sm:text-lg lg:text-xl xl:text-4xl 2xl:text-5xl   font-medium text-center md:text-left tracking-tight mb-4 md:mb-0 w-full">Words that define our UI/UX<br />design capabilities</h2>
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
  <div className=" flex flex-col md:flex-row bg-white rounded-3xl interactive-card  overflow-hidden max-w-5xl 2xl:max-w-7xl mx-auto w-full" >
  {/* Mobile arrow nav below card */}
  
    {/* Left: Project Info */}
    <div className="md:w-1/2  bg-[#181C23] ">
        <img src="/images/home/img8.png" alt="Project Screenshot" className="rounded-xl w-full h-full object-cover object-left" />
    </div>
    {/* Right:  */}
    <div className="md:w-1/2 flex flex-col justify-center p-8 h-full gap-4">
      <div className="flex items-center gap-3 mb-2">
        <img src="/images/home/profile.png" alt="Robin Fish" className="w-12 h-12 rounded-full object-cover" />
        <div>
          <div className="text-[#181C23] font-semibold text-base">Robin Fish</div>
          <div className="text-xs text-gray-500">Founder &amp; CEO, Arrive</div>
        </div>
      </div>
      <blockquote className="text-[#181C23] text-lg xl:text-2xl font-medium mb-4">“They brought our app redesign to life beyond expectations! We’re thrilled with the results and truly loved collaborating with their incredibly talented team.”</blockquote>
      <div className="flex flex-col gap-1">
        <img src="/images/home/arrive.png" alt="Location" className="w-[119.77px] h-[42.58px] object-contain" />
        <span className="text-gray-500 text-xs">New York, USA</span>
      </div>
    </div>

  </div>
  <div className="flex  flex-row gap-4 items-center mt-6 justify-center sm:hidden">
    <span className="bg-white shadow flex items-center justify-center" style={{ borderRadius: '21px', width: '43px', height: '43px' }}>
      <img src="/images/home/arrow-left-solid-full.svg" alt="Left Arrow" style={{ width: '35px', height: '21px' }} />
    </span>
    <span className="bg-white shadow flex items-center justify-center" style={{ borderRadius: '21px', width: '43px', height: '43px' }}>
      <img src="/images/home/arrow-right-solid-full.svg" alt="Right Arrow" style={{ width: '21px', height: '21px' }} />
    </span>
  </div>

 
{/* Enhanced CTA Section */}
<section className="w-full  max-w-5xl 2xl:max-w-7xl mx-auto rounded-[40px] group overflow-hidden cursor-pointer relative mt-8 shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
  
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

  
  <div className="relative z-10 flex flex-col items-center justify-center py-16 xl:py-24 px-4 ">
    <h2 className=" text-white text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-center tracking-tight mb-4">
      Let’s Create Tomorrow<br />Hand in Hand!
    </h2>
    <p className="text-white text-base sm:text-lg xl:text-xl text-center max-w-xl xl:max-w-3xl mb-8">
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
    <section className="w-full py-16 px-7 flex">
      <div className="w-full flex flex-col md:flex-row md:justify-between md:gap-[120px] 2xl:gap-[150px]">
        {/* Left: Heading */}
        <div className="md:w-1/3 w-full flex flex-col justify-start items-start pl-4 md:pr-8 mb-8 md:mb-0">
          <h2 className="text-[#1A2341] text-2xl sm:text-3xl lg:text-4xl  font-medium leading-tight mb-2">Frequently</h2>
          <div className="text-[#1A2341] text-2xl sm:text-2xl lg:text-3xl font-normal leading-tight">Asked<br />Questions</div>
        </div>
        {/* Right: FAQ List - interactive accordion */}
        <div className="md:w-2/3 w-full flex flex-col divide-y divide-gray-200 rounded-2xl bg-white/60 backdrop-blur">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="text-left w-full p-4 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600/50"
                
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[#1A2341] text-base sm:text-lg lg:text-xl  font-normal">
                    {item.question}
                  </span>
                  <span
                    className={`inline-flex h-8 w-8 aspect-square items-center justify-center rounded-full border border-gray-300 text-[#1A2341] transition-transform ${isOpen ? 'rotate-45' : ''}`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                    >
                      <rect x="8" y="3" width="2" height="12" rx="1" fill="#1A2341" />
                      <rect x="3" y="8" width="12" height="2" rx="1" fill="#1A2341" />
                    </svg>
                  </span>
                </div>
                <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
    </div>
  );
}