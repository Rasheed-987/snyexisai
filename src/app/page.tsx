'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion,useAnimation,useInView } from 'framer-motion';
import { useState,useEffect,useRef } from 'react';
import { useServices } from '@/context/ServicesContext';
import { useCaseStudies } from '@/context/CaseStudyContext';
import ServicesCard from '@/components/services/servicesCard';
import CaseStudyBannerLayout from '@/components/casestudies/CaseStudyBannerLayout';
import SmoothScroll from '@/components/ui/SmoothScroll';
import CounterAnimation from '@/components/ui/CounterAnimation';
import { testimonials } from '@/utils/utils';
import {faqs} from '@/utils/utils';
import {CTA} from '@/components/ui/cta';
import { section } from 'motion/react-client';


export default function HomePage() {


  const { servicesData:service, loading, error } = useServices();
  const { caseStudiesData:caseStudy, loading: caseStudiesLoading, error: caseStudiesError } = useCaseStudies();
  const router = useRouter();
  
  // Testimonial carousel state
  const testimonialScrollRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const carouselRef = useRef(null)
  const inView = useInView(carouselRef, { once: true })

  const scrollTestimonial = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentTestimonial((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
    } else {
      setCurrentTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
    }
  };

   // Parent controls the stagger timing
  const containerVariants:any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // delay between children
        delayChildren: 0.3, // initial delay before animation starts
      },
    },
  }

  // Children animation (slide-up + fade-in)
  const itemVariants:any = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }


  
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
      <div className=" bg-background   rounded-b-[80px] mb-30   relative z-50">
      <section className="bg-background min-h-screen flex flex-col justify-center mt-6 items-center text-center px-3 lg:px-10 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute w-[80%]  mx-auto inset-0 z-0">
        <Image
          src="/images/Mask group.png"
          alt="Background"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>
      
      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
           whileInView="visible"
        animate="visible"
        className="relative z-10"
      >
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-wide 2xl:text-xl font-semibold text-foreground mb-4"
        >
          Design & Webflow Agency / UAE
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-2xl max-w-[950px] 2xl:max-w-[1100px] mx-auto sm:text-2xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-medium text-foreground mb-4"
        >
          Where Intelligence Meets Imagination
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-2xl max-w-[1200px] 2xl:max-w-[1400px] sm:text-2xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-medium text-primary mb-6"
        >
          Crafting Tomorrow’s Digital Experiences, Today.
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-base mx-auto xl:text-lg 2xl:text-2xl max-w-[800px] 2xl:max-w-[1000px] font-regular text-foreground mb-8"
        >
    Synexis AI is a future-ready creative & technology agency headquartered in Dubai, blending 
advanced artificial intelligence, web & mobile development, and bespoke solutions to deliver 
digital experiences that engage, convert, and inspire. 
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => router.push('/contact')}
            className="bg-primary text-primary-foreground pr-3 pl-6 md:px-10 hover:scale-90 py-5 rounded-full flex items-center gap-3 lg:text-base 2xl:text-xl text-sm font-normal shadow-md transition-all duration-150"
          >
            Work With Us
            <img src="/images/home/button_arrow.png" alt="Arrow Right" className="w-4 h-4 invert" />
          </button>

          <button
            onClick={() => router.push('/casestudies')}
            className="border border-foreground text-foreground px-3 md:px-10 py-5 hover:scale-90 rounded-full flex items-center gap-3 lg:text-base 2xl:text-xl text-sm font-normal transition-all duration-150"
          >
            Explore Our Case Studies
            <img src="/images/home/button_arrow.png" alt="Arrow Right" className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </section>



      {/* Why Synexis AI Section */}
      <section className="bg-secondary py-32 lg:py-40 xl:py-52 2xl:py-72 min-h-[80vh] flex flex-col justify-center">
        <div className="mx-auto px-3 lg:px-12  2xl:px-24 ">
          <div className="w-full flex items-start justify-start mb-12 lg:mb-16">
            <h3 className="text-xl xl:text-3xl 2xl:text-5xl font-normal text-foreground leading-tight">
              Why<br />Synexis AI
            </h3>
          </div>
          
          {/* Grid Layout for Three Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 xl:gap-8">
            {/* First Section: Meticulous Iteration */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center text-center p-6 lg:p-8 min-w-0"
            >
              <motion.h4 variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium text-foreground mb-2 whitespace-nowrap">
                Meticulous Iteration
              </motion.h4>
              <motion.h5 variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-foreground mb-4 whitespace-nowrap">
                Uncompromising Quality
              </motion.h5>
              <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-foreground">
                Our streamlined process allows for continuous refinement, ensuring every detail aligns with your vision.
              </motion.p>
            </motion.div>

            {/* Second Section: Empowering Businesses */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center text-center p-6 lg:p-8 min-w-0"
            >
              <motion.h4 variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium text-foreground mb-2 whitespace-nowrap">
                Empowering Businesses
              </motion.h4>
              <motion.h5 variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-foreground mb-4 whitespace-nowrap">
                Redefining Experiences
              </motion.h5>
              <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-foreground">
                We don't just design—we craft experiences backed by intelligence, innovation and industry expertise.
              </motion.p>
            </motion.div>

            {/* Third Section: From Apps to Websites */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center text-center p-6 lg:p-8 md:col-span-2 lg:col-span-1 min-w-0"
            >
              <motion.h4 variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium text-foreground mb-2 whitespace-nowrap">
                From Apps to Websites
              </motion.h4>
              <motion.h5 variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-foreground mb-4 whitespace-nowrap">
                To AI Agents
              </motion.h5>
              <motion.p variants={itemVariants} className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-foreground">
                We deliver seamless, high-impact digital solutions that reshape business.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Section */}
      <section className="w-full flex flex-col lg:flex-row min-h-[600px] xl:min-h-[720px]">
        <div className="w-full lg:w-1/2 flex items-stretch">
          <img 
            src="/images/home/img5.png" 
            alt="Office" 
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-auto lg:min-h-[600px] xl:min-h-[720px] object-cover " 
          />
        </div>  
        {/* cards */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white p-6 sm:p-8 lg:p-10 xl:p-12">
          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-6xl font-medium text-foreground mb-4 sm:mb-6 leading-tight">
            Empowering businesses,<br />Redefining experiences...
          </h2>
          <p className="text-sm sm:text-sm lg:text-base xl:text-lg 2xl:text-2xl font-regular text-foreground mb-3 sm:mb-4 leading-relaxed">
            We don't just design—we craft experiences that engage, convert, and inspire. Backed by innovation and industry expertise, we transform insights into pixel-perfect digital solutions.
          </p>
          <p className="text-sm sm:text-sm lg:text-base xl:text-lg 2xl:text-2xl font-regular text-foreground mb-4 sm:mb-6 leading-relaxed">
            From apps to websites, we deliver seamless, high-impact designs that redefine user experience. Let's build something extraordinary together!
          </p>
          <button onClick={() => router.push('/about')} className="custom-about-btn">
            More About Us
          </button>
          <div className="bg-white rounded-xl p-4 sm:p-6 mt-4 sm:mt-6">
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-foreground font-medium mb-3 sm:mb-4 leading-relaxed">
              "The team at Synexis made everything simple, clear, and exciting. They genuinely cared about our goals and treated the project like their own. It was a creative partnership from start to finish"
            </p>
            <div className="flex items-center gap-3 sm:gap-4 xl:gap-6">
              <img 
                src="/images/home/img6.png" 
                alt="Nedin Zahirovic" 
                className="w-10 h-10 sm:w-12 sm:h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 rounded-full object-cover flex-shrink-0" 
              />
              <div>
                <div className="text-sm sm:text-base md:text-lg 2xl:text-2xl font-semibold text-foreground">louise Nonweiler</div>
                <div className="text-xs sm:text-xs md:text-sm xl:text-base text-foreground">Founder, Trader 365<br />Starnberg, Germany</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 xl:py-24">
        <div className='pt-20'>
        <h2 className="text-foreground text-xl text-center sm:text-4xl lg:text-5xl 2xl:text-7xl font-medium leading-tight mb-20">
          Our Services
        </h2>
      </div>
    
<div className="mx-auto px-3 lg:px-10 overflow-hidden">
      <div ref={carouselRef}>
        <motion.div
          className="flex gap-8 mt-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 80, ease: "linear", repeat: Infinity, repeatType: 'loop', repeatDelay: 0 }}
          style={{ width: "max-content" }}
        >
          {/* Duplicate items for seamless looping */}
          {[...service, ...service].map((item, index) => (
            <div
              key={item._id + "-" + index}
              className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[400px] 2xl:w-[650px] mb-3 flex-shrink-0"
            >
              <ServicesCard
                title={item.serviceTitle}
                image={item.images?.banner}
                description=""
                requirements={[]}
                requirementsTitle=""
                largeCard={{ title: "", body: "" }}
                showOnlyTitleAndImage={true}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
      </section>

      {/* Stats Section */}
      
  <section className="w-full  py-12">
        <div className=" mx-auto px-3 lg:px-4 2xl:mx-1 xl:px-3 2xl:px-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <h3 className="text-5xl font-bandeins  lg:text-8xl 2xl:text-9xl font-bold text-foreground">
                <CounterAnimation end={250} duration={2.5} suffix="+" />
              </h3>
              <p className="text-foreground font-inter mt-2 text-sm font-medium sm:text-lg 2xl:text-2xl">Projects Completed</p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-5xl font-bandeins lg:text-8xl 2xl:text-9xl font-semibold text-foreground">
                <CounterAnimation end={180} duration={2.5} suffix="+" />
              </h3>
              <p className="text-foreground  font-inter mt-2 text-sm font-medium sm:text-lg 2xl:text-2xl">Happy Clients</p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-5xl font-bandeins lg:text-8xl 2xl:text-9xl font-semibold text-foreground">
                <CounterAnimation end={10} duration={2.5} suffix="+" />
              </h3>
              <p className="text-foreground mt-2 font-inter text-sm font-medium sm:text-lg 2xl:text-2xl">Years of Experience</p>
            </motion.div>

            {/* Stat 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-5xl font-bandeins lg:text-8xl 2xl:text-9xl font-semibold text-foreground">
                <CounterAnimation end={50} duration={2.5} suffix="+" />
              </h3>
              <p className="text-foreground mt-2 font-inter text-sm font-medium sm:text-lg 2xl:text-2xl">Team Members</p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Case Studies Section */}
      <section id="case-studies" className=" mx-auto ">
        <section className=" px-3 lg:px-12  2xl:px-24  py-12">
          <div className="mb-12">
            <span className="inline-flex items-center text-sm 2xl:text-lg text-foreground font-regular mb-4">
          
            CASE STUDIES
          </span>

          <h2 className=" text-xl sm:text-3xl xl:text-4xl 2xl:text-6xl text-foreground font-regular leading-tight mb-4">
            Our Latest Case Studies
          </h2>

          <p className="text-foreground max-w-md sm:text-base xl:max-w-2xl text-base xl:text-lg 2xl:text-2xl 2xl:max-w-4xl">
            As a UI/UX design company in Dubai, we don't just build websites — we craft immersive digital
            experiences that push boundaries and deliver business results.
          </p>
        </div>
      </section>


    <section className="w-full relative">
      {caseStudiesLoading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-foreground">Loading case studies...</p>
        </div>
      ) : Array.isArray(caseStudy) && caseStudy.length > 0 ? (
        <>
          <CaseStudyBannerLayout caseStudies={caseStudy} maxDisplay={3} />
          {caseStudy.length > 3 && (
            <div className="flex justify-center   px-3 lg:px-12  2xl:px-24 mt-8">
              <Link 
                href="/casestudies"
                className="bg-white text-foreground px-3 lg:px-12  2xl:px-24 py-3 rounded-full flex items-center gap-2 font-medium transition-all hover:bg-border"
              >
                View All Case Studies
                <img src="/images/home/button_arrow.png" alt="Arrow Right" className="w-4 h-4" />
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center py-20">
          <p className="text-foreground">No case studies available</p>
        </div>
      )}
    </section>
      </section>

    {/* Our Approach to AI Success Section */}
      <section className="w-full bg-white py-16 xl:py-24 px-3 lg:px-12  2xl:px-24 flex flex-col items-center">
      <h2 className="text-foreground text-lg sm:text-xl lg:text-2xl xl:text-4xl 2xl:text-7xl font-medium text-center tracking-tight mb-4">Our Approach to AI Success</h2>
      <p className="text-foreground text-base sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-center max-w-2xl xl:max-w-4xl 2xl:max-w-6xl mb-12">We blend strategic insight, advanced technology, and a commitment to excellence to drive transformative results for your business.</p>
      <div className="w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Card 1 */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0 }}
          className="flex flex-col items-center text-center"
        >
          <span className="mb-10">
              <Image src="/images/home/img1_1.png" alt="POC" width={130} height={130} className="object-contain w-[130px] h-[130px] xl:w-[160px] xl:h-[160px] approach-img-hover" />
          </span>
          <h3 className="text-foreground text-lg xl:text-xl 2xl:text-2xl font-medium mb-2">POC in 4 – 6 weeks</h3>
          <p className="text-foreground text-sm xl:text-base 2xl:text-lg">See impact quickly with our rapid prototyping approach.</p>
        </motion.div>
        {/* Card 2 */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-center text-center"
        >
          <span className="mb-10">
              <Image src="/images/home/img1_2.png" alt="End-to-End AI Delivery" width={130} height={130} className="object-contain w-[130px] h-[130px] xl:w-[160px] xl:h-[160px] approach-img-hover" />
          </span>
          <h3 className="text-foreground text-lg xl:text-xl 2xl:text-2xl font-medium mb-2">End-to-End AI Delivery</h3>
          <p className="text-foreground text-sm xl:text-base 2xl:text-lg">From data prep to deployment to monitoring.</p>
        </motion.div>
        {/* Card 3 */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <span className="mb-10">
              <Image src="/images/home/img1_3.png" alt="Regulatory Compliance" width={130} height={130} className="object-contain w-[130px] h-[130px] xl:w-[160px] xl:h-[160px] approach-img-hover" />
          </span>
          <h3 className="text-foreground text-lg xl:text-xl 2xl:text-2xl font-medium mb-2">Regulatory Compliance</h3>
          <p className="text-muted-foreground text-sm xl:text-base 2xl:text-lg">HIPAA, CDPR, and SOC2 built in .</p>
        </motion.div>
        {/* Card 4 */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center text-center"
        >
          <span className="mb-10">
              <Image src="/images/home/img1_4.png" alt="Proven ROI" width={130} height={130} className="object-contain w-[130px] h-[130px] xl:w-[160px] xl:h-[160px] approach-img-hover" />
          </span>
          <h3 className="text-foreground text-lg xl:text-xl 2xl:text-2xl font-medium mb-2">Proven ROI</h3>
          <p className="text-muted-foreground text-sm xl:text-base 2xl:text-lg">Documented case studies with measurable, quantifiable results.</p>
        </motion.div>
      </div>
    </section>

<section className="w-full bg-white py-16 px-3 flex flex-col items-center">
  <div>
    <h2 className="text-foreground text-xl sm:text-xl lg:text-3xl xl:text-4xl 2xl:text-7xl font-medium text-center tracking-tight mb-4">Delight Clients</h2>
    <p className="text-foreground text-sm sm:text-base lg:text-lg 2xl:text-2xl text-center max-w-2xl xl:max-w-4xl 2xl:max-w-6xl mb-12">We blend strategic insight, advanced technology, and a commitment to excellence to drive transformative results for your business.</p>
  </div>


      <div className="w-full flex flex-col gap-y-0">
        {/* Row 1: Infinite scroll */}
        <hr className="w-full border-t border-border" />
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex flex-row gap-x-4 sm:gap-x-10 py-4 sm:py-6"
            animate={{ x: ["0%", "-66.66%"] }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity ,repeatType: 'loop',repeatDelay: 0}}
            style={{ width: "max-content" }}
          >
            {/* Logos tripled for seamless loop */}
            {[
              "/images/client/img1.png",
              "/images/client/img2.png",
              "/images/client/img3.png",
              "/images/client/img4.png",
              "/images/client/img5.png",
              "/images/client/img6.png",
              "/images/client/img1.png",
              "/images/client/img2.png",
              "/images/client/img3.png",
              "/images/client/img4.png",
              "/images/client/img5.png",
              "/images/client/img6.png",
              "/images/client/img1.png",
              "/images/client/img2.png",
              "/images/client/img3.png",
              "/images/client/img4.png",
              "/images/client/img5.png",
              "/images/client/img6.png"
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Logo ${i + 1}`}
                className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0"
              />
            ))}
          </motion.div>
        </div>
        <hr className="w-full border-t border-border" />
        {/* Row 2: Infinite scroll */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex flex-row gap-x-4 sm:gap-x-10 py-4 sm:py-6"
            animate={{ x: ["-66.66%", "0%"] }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
            style={{ width: "max-content" }}
          >
            {["/images/client/img7.png","/images/client/img8.png","/images/client/img9.png","/images/client/img10.png","/images/client/img11.png","/images/client/img12.png",
              "/images/client/img7.png","/images/client/img8.png","/images/client/img9.png","/images/client/img10.png","/images/client/img11.png","/images/client/img12.png",
              "/images/client/img7.png","/images/client/img8.png","/images/client/img9.png","/images/client/img10.png","/images/client/img11.png","/images/client/img12.png"].map((src, i) => (
              <img key={i} src={src} alt={`Logo ${i+7}`} className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0" />
            ))}
          </motion.div>
        </div>
        <hr className="w-full border-t border-border" />
        {/* Row 3: Infinite scroll */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex flex-row sm:gap-x-3 py-4 sm:py-6 w-full"
            animate={{ x: ["0%", "-66.66%"] }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
            style={{ width: "max-content" }}
          >
            {["/images/client/img13.png","/images/client/img14.png","/images/client/img15.png","/images/client/img16.png","/images/client/img17.png","/images/client/img18.png","/images/client/img19.png",
              "/images/client/img13.png","/images/client/img14.png","/images/client/img15.png","/images/client/img16.png","/images/client/img17.png","/images/client/img18.png","/images/client/img19.png",
              "/images/client/img13.png","/images/client/img14.png","/images/client/img15.png","/images/client/img16.png","/images/client/img17.png","/images/client/img18.png","/images/client/img19.png"].map((src, i) => (
              <img key={i} src={src} alt={`Logo ${i+13}`} className="h-[40px] w-[90px] sm:h-[61px] sm:w-[150px] object-contain flex-shrink-0 inline-block" />
            ))}
          </motion.div>
        </div>
        <hr className="w-full border-t border-border" />
      </div>

</section>

<section className='w-full   pt-30 bg-secondary mb-20'>
<div className="w-full   flex flex-col md:flex-row md:justify-between px-3 py-12 2xl:py-20 lg:px-12  2xl:px-24 gap-8  ">
          <div className="flex-1 flex flex-col ">
            <h2 className="text-foreground text-lg sm:text-xl lg:text-2xl xl:text-4xl 2xl:text-7xl font-medium leading-tight mb-4">Innovative design is<br />our tool to reshape<br />business</h2>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-foreground text-sm sm:text-base 2xl:text-2xl mb-4">We're a passionate team of UI/UX designers dedicated to creating intuitive digital experiences. With years of experience, we blend creativity and strategy to design solutions that engage users and drive business success.


We turn ideas into seamless, Beautiful designs. Let's build digital experiences that not only look stunning but also deliver real results.</p>
            {/* <p className="text-foreground text-sm sm:text-base 2xl:text-lg mb-4">We're a passionate team of UI/UX designers dedicated to creating intuitive digital experiences. With years of experience, we blend creativity and strategy to design solutions that engage users and drive business success.</p> */}
            {/* <p className="text-foreground text-sm sm:text-base 2xl:text-lg mb-6">We turn ideas into seamless, Beautiful designs. Let's build digital experiences that not only look stunning but also deliver real results.</p> */}
            <button onClick={() => router.push('/about')} className="custom-about-btn">More About Us</button>
          </div>
        </div>
<div className="w-full overflow-x-auto py-4 hide-scrollbar" style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}>
          <div className="flex flex-row gap-8 px-4" style={{ minWidth: 'max-content' }}>
            <motion.div 
              className="flex-shrink-0"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0 }}
            >
              <img src="/images/client/img1_1.png" alt="Office 1" className="w-[370px] h-[274px] 2xl:w-[500px] 2xl:h-[360px] object-cover rounded-lg" style={{ scrollSnapAlign: 'start' }} />
            </motion.div>
            <motion.div 
              className="flex-shrink-0"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <img src="/images/client/img1_4.png" alt="Office 2" className="w-[370px] h-[499px] 2xl:w-[500px] 2xl:h-[640px] object-cover rounded-lg" style={{ scrollSnapAlign: 'start' }} />
            </motion.div>
            <motion.div 
              className="flex-shrink-0"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src="/images/client/img1_2.png" alt="Office 3" className="w-[370px] h-[273px] 2xl:w-[500px] 2xl:h-[360px] object-cover rounded-lg" style={{ scrollSnapAlign: 'start' }} />
            </motion.div>
            <motion.div 
              className="flex-shrink-0"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img src="/images/client/img1_3.png" alt="Office 4" className="w-[370px] h-[499px] 2xl:w-[500px] 2xl:h-[640px] object-cover rounded-lg" style={{ scrollSnapAlign: 'start' }} />
            </motion.div>
          </div>
        </div>
</section>

<section className="w-full bg-white py-16 space-y-8 px-3 lg:px-12  2xl:px-24 flex flex-col items-center">
  <div className="w-full flex md:justify-between items-center">
    <div className="w-full md:w-[50%] flex flex-col justify-center">
      <h2 className="text-foreground text-1xl sm:text-lg lg:text-xl xl:text-2xl 2xl:text-5xl font-medium text-center md:text-left tracking-tight mb-4 md:mb-0 w-full">Words that define our UI/UX<br />design capabilities</h2>
    </div>
    <div className="hidden md:flex flex-row gap-4 items-center mr-20">
      <button 
        onClick={() => scrollTestimonial('left')}
        aria-label="Previous testimonial"
        className="bg-white shadow flex items-center justify-center cursor-pointer hover:scale-110 transition-transform" 
        style={{ borderRadius: '21px', width: '43px', height: '43px' }}
      >
        <img src="/images/home/arrow-left-solid-full.svg" alt="Left Arrow" style={{ width: '35px', height: '21px' }} />
      </button>
      <button 
        onClick={() => scrollTestimonial('right')}
        aria-label="Next testimonial"
        className="bg-white shadow flex items-center justify-center cursor-pointer hover:scale-110 transition-transform" 
        style={{ borderRadius: '21px', width: '43px', height: '43px' }}
      >
        <img src="/images/home/arrow-right-solid-full.svg" alt="Right Arrow" style={{ width: '21px', height: '21px' }} />
      </button>
    </div>
  </div>

  {/* Card Div with Carousel */}
  <div id="testimonials" className="overflow-hidden max-w-5xl 2xl:max-w-7xl mx-auto w-full">
    <div 
      ref={testimonialScrollRef}
      className="flex flex-row gap-6 hide-scrollbar transition-transform duration-500 ease-in-out" 
      style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
    >
      {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="flex flex-col md:flex-row bg-white rounded-3xl interactive-card overflow-hidden flex-shrink-0 w-full">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative ">
            <Image src={testimonial.image} alt="Project Screenshot" fill className=" object-fit" />
          </div>
          {/* Right: Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center border-black p-4 md:p-8 h-full gap-2 md:gap-4">
            <div className="flex items-center border-border gap-2 md:gap-3 mb-1 md:mb-2">
              <img src={testimonial.profileImage} alt={testimonial.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
              <div>
                <div className="text-foreground font-semibold text-sm md:text-base 2xl:text-xl">{testimonial.name}</div>
                <div className="text-[10px] md:text-xs text-foreground">{testimonial.role}</div>
              </div>
            </div>
            <blockquote className="text-foreground text-sm md:text-lg xl:text-xl 2xl:text-3xl font-medium mb-2 md:mb-4">"{testimonial.quote}"</blockquote>
            <div className="flex flex-col gap-1">
              {testimonial.logo && (
                <img src={testimonial.logo} alt="Company Logo" className="w-[100px] md:w-[119.77px] h-[36px] md:h-[42.58px] object-contain" />
              )}
              <span className="text-foreground text-[10px] md:text-xs">{testimonial.location}</span>
            </div>
          </div>
          </div>
      ))}
    </div>
  </div>

  {/* Mobile arrow nav below card */}
  <div className="flex flex-row gap-4 items-center mt-6 justify-center sm:hidden">
    <button 
      onClick={() => scrollTestimonial('left')}
      aria-label="Previous testimonial"
      className="bg-white shadow flex items-center justify-center cursor-pointer hover:scale-110 transition-transform" 
      style={{ borderRadius: '21px', width: '43px', height: '43px' }}
    >
      <img src="/images/home/arrow-left-solid-full.svg" alt="Left Arrow" style={{ width: '35px', height: '21px' }} />
    </button>
    <button 
      onClick={() => scrollTestimonial('right')}
      aria-label="Next testimonial"
      className="bg-white shadow flex items-center justify-center cursor-pointer hover:scale-110 transition-transform" 
      style={{ borderRadius: '21px', width: '43px', height: '43px' }}
    >
      <img src="/images/home/arrow-right-solid-full.svg" alt="Right Arrow" style={{ width: '21px', height: '21px' }} />
    </button>
  </div>

  {/* Dots indicator */}
  <div className="flex gap-2 mt-4">
    {testimonials.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentTestimonial(index)}
        aria-label={`Go to testimonial ${index + 1}`}
        className={`h-2 rounded-full transition-all ${
          currentTestimonial === index ? 'w-8 bg-[var(--primary)]' : 'w-2 bg-[var(--background)]'
        }`}
      />
    ))}
  </div>

</section>

    <CTA/>
    {/* FAQ Section */}
    <section id="faq" className="w-full py-16 px-3 lg:px-12  2xl:px-24 flex">
      <div className="w-full flex flex-col md:flex-row md:justify-between md:gap-[120px] 2xl:gap-[150px]">
        {/* Left: Heading */}
        <div className="md:w-1/3 w-full flex flex-col justify-start items-start pl-4 md:pr-8 mb-8 md:mb-0">
          <h2 className="text-foreground text-base sm:text-lg lg:text-xl 2xl:text-4xl font-medium leading-tight mb-2">Frequently</h2>
          <div className="text-foreground text-base sm:text-xl lg:text-2xl 2xl:text-5xl font-normal leading-tight">Asked<br />Questions</div>
        </div>
        {/* Right: FAQ List - interactive accordion */}
        <div className="md:w-2/3 w-full flex flex-col divide-y divide-[var(--border)] rounded-2xl bg-white/60 backdrop-blur">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="text-left w-full p-4 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary "
                
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-foreground text-base sm:text-base lg:text-lg 2xl:text-2xl font-normal">
                    {item.question}
                  </span>
                  <span
                    className={`inline-flex h-8 w-8 aspect-square items-center justify-center rounded-full border border-foreground text-foreground transition-transform ${isOpen ? 'rotate-45' : ''}`}
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
                  <p className="mt-3 text-foreground text-sm 2xl:text-lg leading-relaxed">
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