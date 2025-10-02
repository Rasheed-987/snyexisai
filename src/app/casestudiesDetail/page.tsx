import React from "react";
import Image from "next/image";

export default function CaseStudies() {
  return (
    <div  className="rounded-b-[80px]  min-h-screen  relative z-50 bg-white pb-24 lg:pb-40  mx-auto px-4">


    <main className="flex flex-col items-center w-full mx-auto  min-h-screen ">
      {/* Hero Container */}
      <section className="w-full max-w-[2000px] mt-8 sm:mt-16 md:mt-20 lg:mt-[133px] flex flex-col items-center gap-4 lg:gap-10 mb-16 lg:mb-10">
        {/* Company Tag */}
        <div className="w-fit flex items-center justify-center uppercase font-bold text-xs sm:text-[12.5px] leading-[18px] text-[#0F1C3D] font-sans">
          the be company
        </div>
        
        {/* Heading */}
        <h1 className="w-full flex items-center justify-center">
          <span className="w-full max-w-[728px] flex items-center justify-center text-center font-medium text-3xl sm:text-5xl md:text-6xl lg:text-[105.188px] leading-tight lg:leading-[120px] capitalize text-[#0F1C3D]">
            trader 365 case Study
          </span>
        </h1>
        
        {/* Description */}
        <div className="w-full max-w-[962px] flex items-center justify-center text-center font-normal text-sm sm:text-base md:text-lg lg:text-[18.125px] leading-6 md:leading-7 lg:leading-[28px] text-[#0F1C3D]">
          We helped BEC redefine its digital presence with a bold, scalable brand identity. From branding to website development, our work positioned BEC as a leader in clean energy AI infrastructure.
        </div>
      </section>

      {/* Case Study Image Section */}
      <section className="relative w-full flex justify-center mb-16 lg:mb-40  sm:px-8">
        <div className="relative w-full  aspect-[16/10] ">
          <Image
            src="/images/img1.png"
            alt="Case Study Preview"
            fill
            className="object-cover rounded-2xl sm:rounded-[45.87px]"
            priority
          />
        </div>
      </section>
    
      {/* What We Did Section */}
      <section className="w-full  mx-auto flex flex-col md:flex-row items-start justify-between gap-8 lg:gap-16 mb-16 px-10 sm:px-12">
        {/* Left: Main Statement */}
        <div className="flex-1">
          <h2 className="font-normal text-[#0F1C3D] text-xl sm:text-2xl md:text-3xl lg:text-[40px] leading-tight">
            BEC provides clean energy<br />infrastructure for power<br />intensive industries.
          </h2>
        </div>

        {/* Right: What We Did List */}
        <div className="w-full md:w-auto md:min-w-[260px]">
          <h3 className="text-[#0F1C3D] text-base font-medium mb-4">What We Did</h3>
          <ol className="text-[#0F1C3D] text-sm font-normal space-y-3">
            <li className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
              <span>1</span>
              <span className="ml-4 flex-1 text-right">Branding</span>
            </li>
            <li className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
              <span>2</span>
              <span className="ml-4 flex-1 text-right">Website Design</span>
            </li>
            <li className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
              <span>3</span>
              <span className="ml-4 flex-1 text-right">Website Development</span>
            </li>
            <li className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
              <span>4</span>
              <span className="ml-4 flex-1 text-right">Animation</span>
            </li>
            <li className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
              <span>5</span>
              <span className="ml-4 flex-1 text-right">Illustration</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Device Mockups Section */}
      <section className="w-full flex flex-col items-center gap-6 sm:gap-8 mb-16  md:px-12">
        {/* Laptop image */}
        <div className="w-full  flex justify-center">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src="/images/img2.png"
              alt="Laptop"
              fill
              className="rounded-2xl object-cover"
              priority
            />
          </div>
        </div>

       {/* Mobile Devices Section */}
<div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full">
  {/* First Image */}
  <div className="relative w-full sm:flex-1 aspect-[9/16] min-w-0">
    <Image
      src="/images/img3_1.jpg"
      alt="Phone 1"
      fill
      className="object-cover rounded-xl"
      priority
    />
  </div>

  {/* Second Image */}
  <div className="relative w-full sm:flex-1 aspect-[9/16] min-w-0">
    <Image
      src="/images/img3_2.jpg"
      alt="Phone 2"
      fill
      className="object-cover rounded-xl"
      priority
    />
  </div>
</div>
      </section>

      {/* Problem Section */}
      <section className="relative w-full max-w-[640px] mx-auto mb-16 px-4 sm:px-8">
        <h2 className="text-[#0F1C3D] font-normal text-3xl sm:text-4xl lg:text-[45px] leading-tight capitalize mb-6">
          the Problem
        </h2>
        <div className="space-y-6">
          <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
            BEC isn't your typical digital startup—they operate in a space that requires significant physical infrastructure to serve their clients. But they also understand that standing out as a professional leader in the clean energy-as-a-service space means it's time for a brand overhaul.
          </p>
          <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
            Sath Ganesarajah, the Founder and CEO of BEC, firmly believes that clean energy is the future. With industries like AI and cryptocurrency becoming increasingly computation-heavy, the demand for renewable energy solutions has never been more critical. BEC's vision is ambitious: to build a global portfolio of clean power assets and contracts, while creating a team capable of converting that power into diverse forms of computing capacity.
          </p>
          <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
            The challenge? Their branding and website weren't keeping up with that vision. Their logo was designed on Canva, and the website was a basic Mailchimp template. To position BEC as a leader in their industry, they needed a scalable, timeless design that would reflect their bold ambitions and stay relevant for at least the next three years.
          </p>
        </div>
      </section>

      {/* Challenge and Solution Section */}
      <section className="relative w-full  mx-auto mb-16 md:px-12 sm:px-6 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Challenge Column */}
        <div className="flex-1">
          <h2 className="text-[#0F1C3D] font-normal text-3xl sm:text-4xl lg:text-[45px] leading-tight capitalize mb-6">
            the Challenge
          </h2>
          <div className="space-y-6">
            <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
              BEC approached us with a bold vision: to lead the clean energy-as-a-service market while maintaining a grounded yet forward-thinking identity. As a company requiring significant physical infrastructure, they recognized the need for a digital-first presence that aligned with their ambitions.
            </p>
            <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
              However, their existing brand presented a number of challenges. Tight timelines, driven by an upcoming investment round, added urgency to the project. Their branding was overly simplistic—a Canva-designed logo paired with a Mailchimp template website—and lacked the sophistication and scalability they needed to resonate with global stakeholders.
            </p>
          </div>
        </div>

        {/* Solution Column */}
        <div className="flex-1">
          <h2 className="text-[#0F1C3D] font-normal text-3xl sm:text-4xl lg:text-[45px] leading-tight capitalize mb-6">
            the Solution
          </h2>
          <div className="space-y-6">
            <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
              At Synexis, we started by reimagining BEC's brand strategy from the ground up. Understanding their mission to build a global portfolio of clean energy assets and transform this power into computing capacity, we designed an identity that matched the scale of their vision.
            </p>
            <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
              We presented two initial design directions: one minimalist with blue tones, black-and-white contrasts, and clean imagery, and another vibrant and bold, incorporating renewable energy visuals, nature-inspired elements, and a pixel-blur effect. Despite the initial preference for blue tones, BEC trusted our creative instincts and chose the vibrant direction—a decision they described as "game-changing."
            </p>
          </div>
        </div>
      </section>
      
      {/* Side-by-Side Images Section */}
      <section className="w-full mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-16  md:px-12">
        <div className="flex-1 w-full">
          <Image
            src="/images/img4_1.jpg"
            alt="Image 4_1"
            width={624}
            height={442}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
        <div className="flex-1 w-full">
          <Image
            src="/images/img4_2.jpg"
            alt="Image 4_2"
            width={624}
            height={442}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      </section>

      {/* The Result Section */}
      <section className="relative w-full  mx-auto mb-16  md:px-12 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left Column */}
        <div className="flex-1">
          <h2 className="text-[#0F1C3D] font-normal text-3xl sm:text-4xl lg:text-[45px] leading-tight capitalize mb-6">
            the Result
          </h2>
          <div className="space-y-6">
            <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
              The BEC project was more than a branding exercise—it was a collaborative journey that merged our creative expertise with their bold ambitions. Synexis transformed their vision into a scalable, professional identity that positioned them as leaders in clean energy design. From crafting the "+BE" logo to creating a vibrant, nature-inspired brand narrative, every decision was made with BEC's long-term goals in mind.
            </p>
            <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
              The result? A timeless brand that combines innovation and sustainability, ready to power their growth for years to come. By trusting our process and pushing creative boundaries together, we achieved a design solution that truly reflects their values and aspirations.
            </p>
            <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
              At Synexis, we're proud to have played a role in shaping BEC's journey. This case study showcases our ability to deliver impactful branding for ambitious, mission-driven companies in emerging industries. If you're looking to elevate your own brand with a clean, timeless design, let's talk.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <h2 className="text-[#0F1C3D] font-normal text-3xl sm:text-4xl lg:text-[45px] leading-tight capitalize mb-6 lg:opacity-0">
            the Result
          </h2>
          <div className="space-y-6">
            <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
              The BEC project was more than a branding exercise—it was a collaborative journey that merged our creative expertise with their bold ambitions. Synexis transformed their vision into a scalable, professional identity that positioned them as leaders in clean energy design. From crafting the "+BE" logo to creating a vibrant, nature-inspired brand narrative, every decision was made with BEC's long-term goals in mind.
            </p>
            <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
              The result? A timeless brand that combines innovation and sustainability, ready to power their growth for years to come. By trusting our process and pushing creative boundaries together, we achieved a design solution that truly reflects their values and aspirations.
            </p>
            <p className="text-[#0F1C3D] font-normal text-sm sm:text-base leading-relaxed">
              At Synexis, we're proud to have played a role in shaping BEC's journey. This case study showcases our ability to deliver impactful branding for ambitious, mission-driven companies in emerging industries. If you're looking to elevate your own brand with a clean, timeless design, let's talk.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Mockups Section */}
      <section className="w-full max-w-[2000px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-16  sm:px-8">
        <div className="flex-1 w-full">
          <Image
            src="/images/img5_1.png"
            alt="Background blur"
            width={624}
            height={810}
            className="rounded-2xl w-full h-auto"
          />
        </div>
        <div className="flex-1 w-full">
          <Image
            src="/images/img5_2.png"
            alt="iPhone mockup"
            width={624}
            height={810}
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Quote Section */}
      <section className="w-full bg-white flex justify-center px-6 py-12 mb-16">
        <div className="max-w-3xl text-center">
          <p className="font-normal text-sm sm:text-base lg:text-lg leading-relaxed text-[#0F1C3D]">
            Design simplicity, ironically, was one of the most complex parts of the brief. 
            The challenge was to create a timeless identity that wouldn't require frequent 
            updates but still stood out subtly in the clean energy sector. We also had to 
            strike a delicate balance: making BEC distinctive without feeling too loud or 
            disruptive.
          </p>
        </div>
      </section>
      
      {/* Feature Section */}
      <section className="w-full md:px-10">

      
      <div className="w-full   bg-[#EDEDED] py-8 sm:py-2 flex justify-center  items-center rounded-3xl mb-8 px:5 md:px-14">
        <div className="w-full  flex justify-center  ">
          <div className="w-full ">
            <Image
              src="/images/img6.png"
              alt="App feature screenshot"
              width={1143}
              height={938}
              className="rounded-2xl w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
</section>

      {/* Another Image Pair */}
      <section className="w-full max-w-[2000px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-16 px-4 sm:px-8">
        <div className="flex-1 w-full">
          <Image
            src="/images/img7_1.png"
            alt="Image 7_1"
            width={624}
            height={442}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
        <div className="flex-1 w-full">
          <Image
            src="/images/img7_2.png"
            alt="Image 7_2"
            width={624}
            height={442}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      </section>

      {/* Text Section */}
      <section className="w-full bg-white flex justify-center px-6 py-8 mb-16">
        <div className="max-w-3xl w-full">
          <p className="font-normal text-sm sm:text-base leading-relaxed text-[#0F1C3D]">
            The branding itself presented unique design hurdles. Developing a memorable logo for a two-letter company name, "BE," required meticulous attention to detail. From exploring negative space to integrating abstract patterns and energy-related motifs, every iteration needed to reflect their ethos of "adding value" rather than disrupting the industry. The deliverables were extensive, requiring us to package everything into a cohesive, organized structure while staying true to the timeline.
          </p>
        </div>
      </section>

      {/* Logo Section */}
      <section className="w-full  mx-auto flex justify-center items-center py-7 md:py-16 md:px-12 rounded-3xl mb-12">
        <div className="w-full  flex flex-col items-center">
          <Image
            src="/images/img8.png"
            alt="Trader 365 Logo and Tagline"
            width={1100}
            height={600}
            className="w-full  h-auto "
            priority
          />
        </div>
      </section>

      {/* Final Text Section */}
      <section className="w-full bg-white flex justify-center px-6 py-8 mb-16">
        <div className="max-w-3xl w-full">
          <p className="font-normal text-sm sm:text-base leading-relaxed text-[#0F1C3D]">
            The "+" symbolized their commitment to adding value to existing resources rather than disrupting the industry. It encapsulated their mission to enhance renewable energy solutions while maintaining harmony with nature. The design resonated deeply with BEC, aligning perfectly with their brand philosophy.
          </p>
        </div>
      </section>

      {/* Final Image Pair */}
      <section className="w-full max-w-[2000px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 px-4 sm:px-8">
        <div className="flex-1 w-full">
          <Image
            src="/images/img9_1.png"
            alt="Image 9_1"
            width={624}
            height={442}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
        <div className="flex-1 w-full">
          <Image
            src="/images/img9_2.png"
            alt="Image 9_2"
            width={624}
            height={442}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      </section>
    </main>
        </div>
  );
}