'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {FlipCard} from '@/components/ui/FlipCard'
import {CTA} from '@/components/ui/cta'
import { motion } from 'framer-motion'
import CounterAnimation from '@/components/ui/CounterAnimation'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  "/images/grid_9.png",
  "/images/grid_12.png",
  "/images/grid_14.png",
];

function TeamCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full lg:w-[60%]">
      {/* Image Container */}
      <div className="relative w-full h-[400px] 2xl:h-[600px] rounded-2xl overflow-hidden shadow-lg">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          <Image
            src={images[current]}
            alt={`Team Image ${current + 1}`}
            fill
            className="object-obtain"
          />
        </motion.div>
      </div>

      {/* Carousel Controls Below Image */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={prevSlide}
          aria-label="Previous team image"
          className="bg-white/70 hover:bg-white p-3 rounded-full shadow-md transition-all duration-200 hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next team image"
          className="bg-white/70 hover:bg-white p-3 rounded-full shadow-md transition-all duration-200 hover:scale-105"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const router = useRouter()


  return (
    <main className="min-h-screen bg-white mb-30 z-50 relative rounded-b-[80px] pb-[160px] pt-16 ">
      <section className="w-full flex justify-center lg:min-h-[500px] items-center py-8 sm:py-12">
        <div className="text-center max-w-[1020px] w-full mx-auto px-4">
          <h2 className="text-foreground font-medium text-lg sm:text-xl md:text-2xl lg:text-[50px] 2xl:text-[70px] leading-snug sm:leading-normal md:leading-[60px] lg:leading-[70px] 2xl:leading-[90px]">
            With expertise across <br />
            ventures and enterprises,
            <br /> Synexis.ai delivers next.
          </h2>
        </div>
      </section>

      <section className="relative  mt-8 w-full">
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] 2xl:h-[1050px] ">
          <Image
            src="/images/img14.png"
            alt="Team grid"
            fill
            className="w-full object-cover h-auto"
            priority
          />
        </div>
      </section>

      <section className="w-full  py-16">
        <div className=" mx-auto px-3 lg:px-12 2xl:px-24">
       
           <p className="text-foreground text-sm sm:text-base lg:text-lg 2xl:text-2xl leading-relaxed">
          Synexis AI is built at the intersection of human creativity and artificial intelligence. With 
headquarters in Dubai and clients worldwide, our mission is to enable organizations to harness 
AI and digital technologies to accelerate growth, optimize efficiency, and delight customers.
          </p>
        </div>
      </section>

      <section className="w-full  py-12">
        <div className=" mx-auto px-3 lg:px-6 2xl:mr-1   2xl:px-0">
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


      
      <section className="w-full flex justify-center items-center py-10">
        <p
          className="mx-auto px-3 lg:px-12  2xl:px-24 text-sm sm:text-base  lg:text-lg "
          style={{
        
            fontWeight: 300,
            fontStyle: 'Light',
            fontSize: '20px',
            lineHeight: '28px',
            letterSpacing: '-0.06px',
            textAlign: 'center',
          }}
        >
          Website design isn't just our profession, it's our passion. That passion fuels our
          commitment to your success. As a specialized Webflow agency in Dubai, we blend creativity
          with technical expertise to ensure every design aligns with performance, visibility, and
          business goals. We believe true success rests on delivering exceptional work, and anything
          less feels like a personal failure. While we are experimental,
        </p>
      </section>



{/* Vision and Mission Section with Background */}
<section className="relative w-full py-20 2xl:py-44 mt-20 px-3 lg:px-12 2xl:px-24 overflow-hidden min-h-[500px] 2xl:min-h-[850px] flex items-center">

  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <Image 
      src="/images/blue_geometric_gradient (1).png" 
      alt="Vision and Mission Background" 
      fill 
      className="object-cover"
      priority
    />
  </div>

  {/* Content */}
  <div className="relative z-20  mx-auto w-full">
    <div className="grid md:grid-cols-2 gap-12 items-start">

      {/* Vision */}
      <div className="text-center md:text-left">
        <h2 className="text-white font-semibold text-center text-3xl sm:text-4xl 2xl:text-6xl mb-6 2xl:mb-10">
          Our Vision
        </h2>
        <p className="text-white text-base sm:text-lg 2xl:text-2xl leading-relaxed">
          Our vision is to be the leading partner for businesses worldwide —
          driving innovation and transformation through AI, making technology
          accessible, and simplifying complex challenges to enhance business
          success and enrich lives.
        </p>
      </div>

      {/* Mission */}
      <div className="text-center md:text-left">
        <h2 className="text-white font-semibold text-center text-3xl sm:text-4xl 2xl:text-6xl mb-6 2xl:mb-10">
          Our Mission
        </h2>
        <p className="text-white text-base sm:text-lg 2xl:text-2xl leading-relaxed">
          To empower companies with cutting-edge AI solutions and expert
          consultancy, enabling them to integrate AI seamlessly, optimize
          efficiency, and unlock new growth opportunities — all while maintaining
          accessibility and ease of use.
        </p>
      </div>

    </div>
  </div>
</section>


{/* Values Section */}
<section className="w-full py-20 2xl:py-44 bg-secondary rounded-3xl px-3 lg:px-12 2xl:px-24 min-h-[500px] 2xl:min-h-[850px] flex items-center">
  <div className=" mx-auto w-full">

    {/* Header */}
    <div className="text-center mb-12 2xl:mb-20">
      <h2 className="text-foreground font-semibold text-3xl sm:text-4xl 2xl:text-6xl">
        Our Values
      </h2>
    </div>

    {/* Value Cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-10 justify-items-center">

      {/* Card */}
      <div className="p-6 2xl:p-10 bg-white border border-foreground/10 rounded-2xl shadow-sm hover:shadow-lg transition-all w-full max-w-[350px]">
        <h3 className="text-foreground text-center font-semibold text-xl 2xl:text-3xl mb-3">
          Innovation First
        </h3>
        <p className="text-foreground/80 text-sm 2xl:text-lg leading-relaxed text-center">
          We challenge conventions, experiment boldly, and bring cutting-edge AI into production.
        </p>
      </div>

      <div className="p-6 2xl:p-10 bg-white border border-foreground/10 rounded-2xl shadow-sm hover:shadow-lg transition-all w-full max-w-[350px]">
        <h3 className="text-foreground text-center font-semibold  text-xl 2xl:text-3xl mb-3">
          Quality & Integrity
        </h3>
        <p className="text-foreground/80 text-sm 2xl:text-lg leading-relaxed text-center">
          We deliver work that meets the highest standards of security, scalability, and user experience.
        </p>
      </div>

      <div className="p-6 2xl:p-10 bg-white border border-foreground/10 rounded-2xl shadow-sm hover:shadow-lg transition-all w-full max-w-[350px]">
        <h3 className="text-foreground text-center font-semibold text-xl 2xl:text-3xl mb-3">
          Collaboration
        </h3>
        <p className="text-foreground/80 text-sm 2xl:text-lg leading-relaxed text-center">
          We work as partners with clients, aligning with goals and stakeholders at every step.
        </p>
      </div>

      <div className="p-6 2xl:p-10 bg-white border border-foreground/10 rounded-2xl shadow-sm hover:shadow-lg transition-all w-full max-w-[350px]">
        <h3 className="text-foreground text-center font-semibold text-xl 2xl:text-3xl mb-3">
          Impact-Driven
        </h3>
        <p className="text-foreground/80 text-sm 2xl:text-lg leading-relaxed text-center">
          Every solution is built with real business value in mind. KPIs matter, not just features.
        </p>
      </div>

    </div>
  </div>
</section>



{/* Our Team & Culture Section */}
<section id='team' className="w-full bg-white py-20 mt-20">
  <div className=" mx-auto px-3 lg:px-12 2xl:px-24 grid md:grid-cols-2 gap-10 items-center">
    {/* Left Side Content */}
    <div className="">
      <p className="text-foreground font-semibold uppercase tracking-wide mb-2">
        Our Team & Culture
      </p>
      <h2 className="text-4xl 2xl:text-6xl font-bold text-foreground mb-6">
        A culture of innovation, learning, and collaboration
      </h2>
      <p className="text-lg 2xl:text-2xl text-foreground/80 leading-relaxed">
        Our team blends seasoned software engineers, AI/ML specialists, UX
        designers, data scientists, and product strategists. We operate a
        sprint-based methodology, maintain continuous feedback loops, and
        encourage a learning culture that keeps us ahead of the tech curve.
      </p>
    </div>

    {/* Right Side Carousel */}
    <div className="flex justify-end">
      
    <TeamCarousel />
      </div> 
  </div>
   
  {/* Join Our Team CTA */}
  {/* <div className="mt-16 bg-foreground rounded-2xl px-8 py-12 text-center">
    
    <div>
    <h3 className="text-white text-2xl font-bold mb-4">Join our team</h3>
    <p className="text-white text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
      Passionate about sustainability, food, and tech? So are we. If you're excited to make a real impact
      —for the planet and for the people behind the plate—we'd love to meet you.
    </p>
     </div>

    <div>
    <button
      onClick={() => router.push('/careers')}
      className=""
    >
      SEE CAREERS
    </button>
    </div>
  </div> */}
</section>


    {/* New content to be added here */}

      <section id='story' className="w-full py-16">
        <div className=" mx-auto px-3 lg:px-12 2xl:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* First card: text only, custom background - NO FLIP */}

            <motion.div 

           initial={{ x: -200 }}       // start 200px left
      whileInView={{ x: 0 }}      // slide to original position
      transition={{
        duration: 1,              // speed of animation
        ease: "easeOut",
      }}
      viewport={{ once: false }} 
            
            className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-start py-8 bg-cover bg-center rounded-xl min-h-[400px]">
              <h2
                className="text-foreground font-medium text-2xl sm:text-3xl 2xl:text-5xl mb-2"
               
              >
                Our Approach
                <br />
                <span className="italic font-medium">To Work Differently</span>
              </h2>
              <p
                className="text-foreground text-base sm:text-lg 2xl:text-2xl opacity-80 mt-2"
              >
                From first call to launch and beyond,<br />
                our approach is disciplined yet agile:
              </p>
            </motion.div>

            {/* Card 1 - Flippable */}
            <FlipCard
              frontImage="/images/grid_2.png"
              frontAlt="Grid 2"
              title="Discovery & Data Strategy"
              description=" Understanding business needs, data readiness, 
opportunity for AI.."
            />

            {/* Text Card that flips to Image */}
            <FlipCard
              frontImage="/images/grid_2.png"
              frontAlt="Grid 2"
                title="Discovery & Data Strategy"
              description=" Understanding business needs, data readiness, 
opportunity for AI.."
              startWithText={true}
            />

            {/* Card 2 - Flippable */}
            <FlipCard
              frontImage="/images/grid_3.png"
              frontAlt="Grid 3"
              title="Prototype & Validation"
              description="Rapid Proof-of-Concept (POC) in 4-6 weeks to de-risk and 
show value early. "
              bgColor="foreground"
            />

            <FlipCard
			  frontImage="/images/grid_3.png"
			  frontAlt="Grid 3"
              title="Prototype & Validation"
        description='Rapid Proof-of-Concept (POC) in 4-6 weeks to de-risk and 
show value early. '
			  startWithText={true}
            />

            <FlipCard
              frontImage="/images/grid_6.png"
              frontAlt="Grid 5"
              title="Engineering & AI Model Development"
              description="Building web/mobile front-end, backend 
architecture, training custom models, integrating agents."
              startWithText={true}
            />

            {/* Card 3 - Flippable */}
            <FlipCard
              frontImage="/images/grid_6.png"
              frontAlt="Grid 6"
             title="Engineering & AI Model Development"
              description="Building web/mobile front-end, backend 
architecture, training custom models, integrating agents."
              bgColor="foreground"
            />

            <FlipCard
              frontImage="/images/grid_8.png"
              frontAlt="Grid 8"
              title="Deployment & Scaling"
              description=" CI/CD pipelines, secure infrastructure, observability, 
compliance. "
              startWithText={true}
            />

            {/* Card 4 - Flippable */}
            <FlipCard
              frontImage="/images/grid_8.png"
              frontAlt="Grid 8"
            title="Deployment & Scaling"
              description=" CI/CD pipelines, secure infrastructure, observability, 
compliance. "
              bgColor="foreground"
            />

            {/* Card 5 - Flippable */}
            <FlipCard
              frontImage="/images/grid_9.png"
              frontAlt="Grid 9"
              title="Monitoring, Iteration & Growth"
              description="Post-launch support, A/B testing, feature evolution, 
optimization."
              bgColor="foreground"
            />

            <FlipCard
              frontImage="/images/grid_9.png"
              frontAlt="Grid 9"
            title="Monitoring, Iteration & Growth"
              description="Post-launch support, A/B testing, feature evolution, 
optimization."
              startWithText={true}
            />

            <FlipCard
              frontImage="/images/grid_12.png"
              frontAlt="Grid 12"
              title="Growth Together"
              description="We learn, mentor, and
support one another to
achieve both personal
and professional
milestones."
         startWithText={true}  
		   />

            {/* Card 6 - Flippable */}
            <FlipCard
              frontImage="/images/grid_12.png"
              frontAlt="Grid 12"
              title="Smart and Solution Driven"
              description="A culture that values
intelligence, critical
thinking, and clever
problem-solving in
everything we do."
              bgColor="foreground"
            />

            <FlipCard
              frontImage="/images/grid_14.png"
              frontAlt="Grid 14"
              title="Smart and Solution Driven"
              description="A culture that values
intelligence, critical
thinking, and clever
problem-solving in
everything we do."
              startWithText={true}
            />

            {/* Card 7 - Flippable */}
            <FlipCard
              frontImage="/images/grid_14.png"
              frontAlt="Grid 14"
              title="Innovation Focus"
              description="Constantly pushing boundaries and exploring new technologies to stay ahead of the curve."
              bgColor="foreground"
            />
          </div>
        </div>
      </section>

{/* Why Choose Synexis AI Section */}
<section className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden">
  {/* Background Image */}
  <Image
    src="/images/AI_background.webp"
    alt="Background"
    fill
    className="object-cover bg-fixed  brightness-75"
    priority
  />

  {/* Overlay Content */}
  <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
    <h2 className="text-4xl md:text-5xl 2xl:text-7xl font-bold text-center mb-12">
      Why Choose Synexis AI
    </h2>

    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
      {/* Row 1 */}
      <div className="flex items-start space-x-3 bg-foreground/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-foreground/20 transition">
        <div className="w-3 h-3 mt-2 bg-blue-400 rounded-full flex-shrink-0" />
        <p className="text-lg 2xl:text-2xl leading-relaxed">
          We combine strategy, design, engineering and AI into one integrated service.
        </p>
      </div>

      <div className="flex items-start space-x-3 bg-foreground/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-foreground/20 transition">
        <div className="w-3 h-3 mt-2 bg-blue-400 rounded-full flex-shrink-0" />
        <p className="text-lg leading-relaxed">
          Experience across industries (SaaS, healthcare, fintech, logistics, e-commerce) — we
          adapt our UX and engineering practices to your domain.
        </p>
      </div>

      {/* Row 2 */}
      <div className="flex items-start space-x-3 bg-foreground/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-foreground/20 transition">
        <div className="w-3 h-3 mt-2 bg-blue-400 rounded-full flex-shrink-0" />
        <p className="text-lg leading-relaxed">
          Short feedback loops, iterative delivery, and close collaboration. You'll see progress
          weekly and steer direction early.
        </p>
      </div>

      <div className="flex items-start space-x-3 bg-foreground/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-foreground/20 transition">
        <div className="w-3 h-3 mt-2 bg-blue-400 rounded-full flex-shrink-0" />
        <p className="text-lg leading-relaxed">
          We pick the right stack for your project: not just Webflow, but Next.js, custom
          Node/Django backends, AI-first architectures.
        </p>
      </div>

      {/* Row 3 */}
      <div className="flex items-start space-x-3 bg-foreground/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-foreground/20 transition">
        <div className="w-3 h-3 mt-2 bg-blue-400 rounded-full flex-shrink-0" />
        <p className="text-lg leading-relaxed">
          We design scalable systems: microservices, observability, performance tuning, and
          security best practices.
        </p>
      </div>

      <div className="flex items-start space-x-3 bg-foreground/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-foreground/20 transition">
        <div className="w-3 h-3 mt-2 bg-blue-400 rounded-full flex-shrink-0" />
        <p className="text-lg leading-relaxed">
          After launch, we remain your partner: support, improvement, optimization, new AI
          capabilities.
        </p>
      </div>
    </div>
  </div>
</section>
	  
      {/* Expertise & Technologies Section */}
      <section  className="w-full mb-11 py-16 ">
        <div className=" mx-auto flex flex-col lg:flex-row gap-12 px-3 lg:px-12 2xl:px-24 items-center">
          {/* Left: Text Content */}
          <div className="flex-1 mb-10 lg:mb-0">
            <h2
              className="text-foreground font-medium text-xl sm:text-2xl lg:text-3xl 2xl:text-5xl mb-6"
             
            >
              Expertise across a range of <br />  technologies
            </h2>
            
            <p
              className="text-foreground text-sm sm:text-base 2xl:text-xl mb-6"
             
            >
            At Synexis, our expertise spans a wide spectrum of technologies, allowing us to craft intelligent, scalable, and future-ready solutions. From AI-driven automation to secure cloud architectures, we combine innovation with precision engineering to deliver systems that empower businesses to evolve and thrive in the digital era.
            </p>

            <button
              onClick={() => router.push('/casestudies')}
              className="custom-about-btn"
            >
              Case Studies <span className="text-xl">→</span>
            </button>
          </div>
          {/* Right: 3x3 Grid */}
          <motion.div className="flex-1 grid grid-cols-3 grid-rows-3 gap-6 w-full max-w-lg">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                className="bg-foreground rounded-xl cursor-pointer relative h-32 w-full overflow-hidden flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                tabIndex={0}
              >
                <img
                  src={`/images/grid_2_${i + 1}.png`}
                  alt={`Grid2 ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
            <CTA/>
    </main>
  )
}
