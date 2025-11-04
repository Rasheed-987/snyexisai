'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {FlipCard} from '@/components/ui/FlipCard'
import {CTA} from '@/components/ui/cta'
import { motion } from 'framer-motion'
import CounterAnimation from '@/components/ui/CounterAnimation'

export default function AboutPage() {
  const router = useRouter()


  return (
    <main className="min-h-screen bg-white mb-30 z-50 relative rounded-b-[80px] pb-[160px] pt-16 ">
      <section className="w-full flex justify-center lg:min-h-[500px] items-center py-8 sm:py-12">
        <div className="text-center max-w-[1020px] w-full mx-auto px-4">
          <h2 className="text-foreground font-medium text-lg sm:text-xl md:text-2xl lg:text-[50px] leading-snug sm:leading-normal md:leading-[60px] lg:leading-[70px]">
            With expertise across <br />
            ventures and enterprises,
            <br /> Synexis.ai delivers next.
          </h2>
        </div>
      </section>

      <section className="relative  mt-8 w-full">
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] 2xl:h-[700px] ">
          <Image
            src="/images/img14.png"
            alt="Team grid"
            fill
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      <section className="w-full  py-16">
        <div className=" mx-auto px-3 lg:px-10">
          <p className="text-foreground text-sm sm:text-base  lg:text-lg leading-relaxed">
            We collaborate with forward-thinking leaders, where our generative AI experts provide
            strategic insights that will reshape tomorrow. Our team of AI engineers, developers, and
            data scientists supports clients through their digital transformation, enhancing
            capabilities across their organization. With over 200 innovative solutions delivered and
            counting, we are dedicated to empowering businesses with cutting-edge generative AI
            expertise for a future-proof world.
          </p>
        </div>
      </section>

      <section className="w-full  py-12">
        <div className=" mx-auto px-6 sm:px-12 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <h3 className="text-3xl font-inter lg:text-7xl font-semibold text-foreground">
                <CounterAnimation end={250} duration={2.5} suffix="+" />
              </h3>
              <p className="text-foreground mt-2 text-sm font-medium sm:text-base">Projects Completed</p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-3xl font-inter lg:text-7xl font-semibold text-foreground">
                <CounterAnimation end={180} duration={2.5} suffix="+" />
              </h3>
              <p className="text-foreground mt-2 text-sm font-medium sm:text-base">Happy Clients</p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-inter lg:text-7xl font-semibold text-foreground">
                <CounterAnimation end={10} duration={2.5} suffix="+" />
              </h3>
              <p className="text-foreground mt-2 text-sm font-medium sm:text-base">Years of Experience</p>
            </motion.div>

            {/* Stat 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-3xl font-inter lg:text-7xl font-semibold text-foreground">
                <CounterAnimation end={50} duration={2.5} suffix="+" />
              </h3>
              <p className="text-foreground mt-2 text-sm font-medium sm:text-base">Team Members</p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center items-center py-10">
        <p
          className="mx-auto px-4 sm:px-6 lg:px-20 text-sm sm:text-base  lg:text-lg "
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

      <section id='story' className="w-full py-16">
        <div className=" mx-auto px-4 sm:px-8 lg:px-[130px]">
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
            
            className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col justify-center items-start p-8 bg-cover bg-center rounded-xl min-h-[400px]">
              <h2
                className="text-foreground font-medium text-2xl sm:text-3xl mb-2"
               
              >
                Where Collaboration
                <br />
                <span className="italic font-medium">Meets Creativity</span>
              </h2>
              <p
                className="text-foreground text-base sm:text-lg opacity-80 mt-2"
              >
                We foster an open, inclusive culture where teamwork,
                <br /> smart thinking, and curiosity spark innovation—
                <br />
                balancing growth, fun, and shared success.
              </p>
            </motion.div>

            {/* Card 1 - Flippable */}
            <FlipCard
              frontImage="/images/grid_2.png"
              frontAlt="Grid 2"
              title="Open & Inclusive"
              description="Everyone's voice matters, and ideas are welcomed from every corner of the team."
            />

            {/* Text Card that flips to Image */}
            <FlipCard
              frontImage="/images/grid_2.png"
              frontAlt="Grid 2"
              title="Open & Inclusive"
              description="Everyone's voice matters, and ideas are welcomed from every corner of the team."
              startWithText={true}
            />

            {/* Card 2 - Flippable */}
            <FlipCard
              frontImage="/images/grid_3.png"
              frontAlt="Grid 3"
              title="Collaboration at the Core"
              description="We thrive on teamwork, solving challenges together, and celebrating wins as one."
              bgColor="foreground"
            />

            <FlipCard
			  frontImage="/images/grid_3.png"
			  frontAlt="Grid 3"
              title="Collaboration at the Core"
              description="We thrive on teamwork, solving challenges together, and celebrating wins as one."
			  startWithText={true}
            />

            <FlipCard
              frontImage="/images/grid_6.png"
              frontAlt="Grid 5"
              title="Work + Fun Balance"
              description="From team hangouts to
lighthearted traditions,
we make space for
laughter as much as for
results."
              startWithText={true}
            />

            {/* Card 3 - Flippable */}
            <FlipCard
              frontImage="/images/grid_6.png"
              frontAlt="Grid 6"
              title="Creative Freedom"
              description="Encouraging curiosity
and experimentation so
great ideas can spark
anywhere, anytime."
              bgColor="foreground"
            />

            <FlipCard
              frontImage="/images/grid_8.png"
              frontAlt="Grid 8"
              title="Creative Freedom"
              description="Encouraging curiosity
and experimentation so
great ideas can spark
anywhere, anytime."
              startWithText={true}
            />

            {/* Card 4 - Flippable */}
            <FlipCard
              frontImage="/images/grid_8.png"
              frontAlt="Grid 8"
              title="Celebrating Diversity"
              description="Different perspectives
make us stronger, more
creative, and better
problem-solvers."
              bgColor="foreground"
            />

            {/* Card 5 - Flippable */}
            <FlipCard
              frontImage="/images/grid_9.png"
              frontAlt="Grid 9"
              title="Growth Together"
              description="We learn, mentor, and
support one another to
achieve both personal
and professional
milestones."
              bgColor="foreground"
            />

            <FlipCard
              frontImage="/images/grid_9.png"
              frontAlt="Grid 9"
              title="Celebrating Diversity"
              description="Different perspectives
make us stronger, more
creative, and better
problem-solvers."
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



	  
      {/* Expertise & Technologies Section */}
      <section id='team' className="w-full mb-11 py-16 ">
        <div className=" mx-auto flex flex-col lg:flex-row gap-12 px-3 lg:px-10 items-center">
          {/* Left: Text Content */}
          <div className="flex-1 mb-10 lg:mb-0">
            <h2
              className="text-foreground font-medium text-xl sm:text-2xl lg:text-3xl mb-6"
             
            >
              Expertise across a range of <br />  technologies
            </h2>
            
            <p
              className="text-foreground text-sm sm:text-base  mb-6"
             
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
      {/* Hero Section with Background */}
      <section id='contact' className="relative w-full flex items-center justify-center px-4 sm:px-8 lg:px-12 sm:mb-7">
        {/* Inner Container */}
        <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px] 2xl:h-[500px] rounded-[32px] overflow-hidden flex items-center justify-center group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          {/* Background Image */}
          <Image src="/images/img15.png" alt="Background" fill className="object-cover transition-transform duration-700 group-hover:scale-110" priority />
          <div className="absolute inset-0  bg-opacity-40 transition-all duration-500 group-hover:bg-opacity-30" />

          {/* Content */}
          <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center transition-all duration-500 group-hover:transform group-hover:-translate-y-2">
            <h1
              className="text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 transition-all duration-500 group-hover:text-shadow-lg"
             
            >
              Shaping the next

              era together.
            </h1>
            <p
              className="text-white text-sm sm:text-base lg:text-lg font-light mb-6 sm:mb-8 max-w-[600px] transition-all duration-500 group-hover:opacity-90"
             
            >
              Partner with us to unlock innovation and accelerate your digital future.
            </p>
            <button
              onClick={() => router.push('/contact')}
              className="bg-white  px-6 py-2 rounded-full font-medium shadow transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-background hover:transform hover:-translate-y-1 active:scale-95"
            >
              Schedule A Call
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
