import React from "react";
import Image from "next/image";

export default function CaseStudies() {
  return (
    <main className="flex flex-col items-center sm:mt-5 min-h-screen  rounded-b-[80px] bg-[#F9F9F9] relative z-50 bg-white pb-24 lg:pb-40">
      {/* Hero Container */}
      <section className="w-full max-w-[1248px]  sm:mt-[180px] md:mt-[100px] lg:mt-[133px] px-4 sm:px-8 flex flex-col items-center  lg:gap-10  mb-16 lg:mb-10 ">
        {/* Company Tag */}
        <div className="w-fit flex items-center justify-center uppercase font-bold text-xs sm:text-[12.5px] leading-[18px] text-[#0F1C3D] font-sans mt-0">
          the be company
        </div>
        
        {/* Heading */}
        <h1 className="w-full flex items-center justify-center mt-25">
          <span className="w-full max-w-[728px] flex items-center justify-center text-center font-chillax font-medium text-4xl sm:text-6xl md:text-7xl lg:text-[105.188px] leading-tight lg:leading-[120px] capitalize text-[#0F1C3D]">
            trader 365 case Study
          </span>
        </h1>
        
        {/* Description - Fixed positioning */}
        <div className="w-full max-w-[962px] flex items-center justify-center text-center font-chillax font-normal text-base sm:text-lg md:text-xl lg:text-[18.125px] leading-6 md:leading-7 lg:leading-[28px] text-[#0F1C3D] mt-2 relative z-10">
          We helped BEC redefine its digital presence with a bold, scalable brand identity. From branding to website development, our work positioned BEC as a leader in clean energy AI infrastructure.
        </div>
      </section>

      {/* Case Study Image Section */}
      <section className="relative w-full h-full flex justify-center lg:mb-40 sm:mt-20 md:mt-28 lg:mt-[10px] px-4 sm:px-8 ">
        <div className="relative w-full max-w-[1376px] aspect-[1376/917]">
          <Image
            src="/images/img1.png"
            alt="Case Study Preview"
            fill
            className="object-cover rounded-[32px] sm:rounded-[45.87px]"
            style={{ opacity: 1 }}
            priority
          />
        </div>
      </section>
    
  <section className="w-full max-w-[1248px] mx-auto flex flex-col md:flex-row items-center justify-center gap-8 mt-16 px-4 sm:px-8">
    
      
        {/* Left: Main Statement */}
        <div className="flex-1">
          <h2 className="font-chillax text-[#0F1C3D] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal leading-tight max-w-[600px]">
            BEC provides clean energy<br />infrastructure for power<br />intensive industries.
          </h2>
        </div>

        <div className="w-full max-w-[260px] mt-8 md:mt-0">
          <h3 className="text-[#0F1C3D] font-chillax text-base font-medium mb-4">What We Did</h3>
          <ol className="text-[#0F1C3D] font-chillax text-sm font-normal space-y-2">
            <li className="flex items-center justify-between border-b border-[#E5E7EB] pb-1">
              <span>1</span>
              <span className="ml-2 flex-1 text-right">Branding</span>
            </li>
            <li className="flex items-center justify-between border-b border-[#E5E7EB] pb-1">
              <span>2</span>
              <span className="ml-2 flex-1 text-right">Website Design</span>
            </li>
            <li className="flex items-center justify-between border-b border-[#E5E7EB] pb-1">
              <span>3</span>
              <span className="ml-2 flex-1 text-right">Website Development</span>
            </li>
            <li className="flex items-center justify-between border-b border-[#E5E7EB] pb-1">
              <span>4</span>
              <span className="ml-2 flex-1 text-right">Animation</span>
            </li>
            <li className="flex items-center justify-between border-b border-[#E5E7EB] pb-1">
              <span>5</span>
              <span className="ml-2 flex-1 text-right">Illustration</span>
            </li>
          </ol>
        </div>
      </section>
      <section className="w-full flex flex-col items-center gap-8 mt-16">
        {/* Laptop image (img2) */}
        <div className="flex w-full max-w-[1376px]  justify-center">
          <Image
            src="/images/img2.png"
            alt="Laptop"
            width={1280}
            height={720}
            className="  rounded-[16px] object-cover"
            style={{ opacity: 1 }}
            priority
          />
        </div>
        {/* Phones row (img3_1 and img3_2) */}
        <div className="flex flex-row gap-6 justify-center items-center sm:gap-1 w-full">
          <Image src="/images/img3_1.jpg" width={624} height={918} alt="Phone 1" className="w-[40vw] h-auto" priority />
          <Image src="/images/img3_2.jpg" width={624} height={918} alt="Phone 2" className="w-[40vw] h-auto" priority />
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative w-full max-w-[640px] mx-auto mt-2  px-4 sm:px-8">
        {/* Heading */}
        <h2 className="text-[#0F1C3D] font-chillax font-normal text-[45px] leading-[48px] capitalize mb-6">
          the Problem
        </h2>
        {/* Paragraph 1 */}
        <p className="text-[#0F1C3D] font-chillax font-normal text-[14.0719px] leading-[22px] mb-6">
          BEC isn’t your typical digital startup—they operate in a space that requires significant physical infrastructure to serve their clients. But they also understand that standing out as a professional leader in the clean energy-as-a-service space means it’s time for a brand overhaul.
        </p>
        {/* Paragraph 2 */}
        <p className="text-[#0F1C3D] font-chillax font-normal text-[14.3188px] leading-[22px] mb-6">
          Sath Ganesarajah, the Founder and CEO of BEC, firmly believes that clean energy is the future. With industries like AI and cryptocurrency becoming increasingly computation-heavy, the demand for renewable energy solutions has never been more critical. BEC’s vision is ambitious: to build a global portfolio of clean power assets and contracts, while creating a team capable of converting that power into diverse forms of computing capacity.
        </p>
        {/* Paragraph 3 */}
        <p className="text-[#0F1C3D] font-chillax font-normal text-[14.0719px] leading-[22px] mb-6">
          The challenge? Their branding and website weren’t keeping up with that vision. Their logo was designed on Canva, and the website was a basic Mailchimp template. To position BEC as a leader in their industry, they needed a scalable, timeless design that would reflect their bold ambitions and stay relevant for at least the next three years.
        </p>
      </section>

      {/* Challenge and Solution Section */}
      <section className="relative w-full max-w-[1280px] mx-auto  px-4 sm:px-8 flex flex-col md:flex-row gap-16">
        {/* Challenge Column */}
        <div className="flex-1">
          {/* Heading */}
          <h2 className="text-[#0F1C3D] font-chillax font-normal text-[44.8125px] leading-[48px] capitalize mb-6">
            the Challenge
          </h2>
          {/* Paragraph 1 */}
          <p className="text-[#0F1C3D] font-chillax font-normal text-[14.1953px] leading-[22px] mb-6">
            BEC approached us with a bold vision: to lead the clean energy-as-a-service market while maintaining a grounded yet forward-thinking identity. As a company requiring significant physical infrastructure, they recognized the need for a digital-first presence that aligned with their ambitions.
          </p>
          {/* Paragraph 2 */}
          <p className="text-[#0F1C3D] font-chillax font-normal text-[14.3188px] leading-[22px] mb-6">
            However, their existing brand presented a number of challenges. Tight timelines, driven by an upcoming investment round, added urgency to the project. Their branding was overly simplistic—a Canva-designed logo paired with a Mailchimp template website—and lacked the sophistication and scalability they needed to resonate with global stakeholders.
          </p>
        </div>

        {/* Solution Column */}
        <div className="flex-1">
          {/* Heading */}
          <h2 className="text-[#0F1C3D] font-chillax font-normal text-[44.4375px] leading-[48px] capitalize mb-6">
            the Solution
          </h2>
          {/* Paragraph 1 */}
          <p className="text-[#0F1C3D] font-chillax font-normal text-[14.0719px] leading-[22px] mb-6">
            At Synexis, we started by reimagining BEC’s brand strategy from the ground up. Understanding their mission to build a global portfolio of clean energy assets and transform this power into computing capacity, we designed an identity that matched the scale of their vision.
          </p>
          {/* Paragraph 2 */}
          <p className="text-[#0F1C3D] font-chillax font-normal text-[14.3188px] leading-[22px] mb-6">
            We presented two initial design directions: one minimalist with blue tones, black-and-white contrasts, and clean imagery, and another vibrant and bold, incorporating renewable energy visuals, nature-inspired elements, and a pixel-blur effect. Despite the initial preference for blue tones, BEC trusted our creative instincts and chose the vibrant direction—a decision they described as “game-changing.”
          </p>
        </div>
      </section>
      
      {/* Side-by-Side Images Section */}
      <section className="w-full max-w-[1248px] mx-auto flex flex-row items-center justify-center gap-8 mt-16 px-4 sm:px-8">
        {/* Image 1 */}
        <div className="flex-1">
          <Image
            src="/images/img4_1.jpg"
            alt="Image 4_1"
            width={624}
            height={442}
            className="rounded-lg object-cover"
          />
        </div>
        {/* Image 2 */}
        <div className="flex-1">
          <Image
            src="/images/img4_2.jpg"
            alt="Image 4_2"
            width={624}
            height={442}
            className="rounded-lg object-cover"
          />
        </div>
      </section>
      {/* The Result Section */}
<section className="relative w-full mt-3 max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row gap-16">
  {/* Left Column */}
  <div className="flex-1">
    {/* Heading */}
    <h2 className="text-[#0F1C3D] font-chillax font-normal text-[45px] leading-[48px] capitalize mb-6">
      the Result
    </h2>
    {/* Paragraph 1 */}
    <p className="text-[#0F1C3D] font-chillax font-normal text-[14.1953px] leading-[22px] mb-6">
      The BEC project was more than a branding exercise—it was a collaborative
      journey that merged our creative expertise with their bold ambitions.
      Synexis transformed their vision into a scalable, professional identity
      that positioned them as leaders in clean energy design. From crafting the
      “+BE” logo to creating a vibrant, nature-inspired brand narrative, every
      decision was made with BEC’s long-term goals in mind.
    </p>
    {/* Paragraph 2 */}
    <p className="text-[#0F1C3D] font-chillax font-normal text-[14.0719px] leading-[22px] mb-6">
      The result? A timeless brand that combines innovation and sustainability,
      ready to power their growth for years to come. By trusting our process and
      pushing creative boundaries together, we achieved a design solution that
      truly reflects their values and aspirations.
    </p>
    {/* Paragraph 3 */}
    <p className="text-[#0F1C3D] font-chillax font-normal text-[14.1953px] leading-[22px]">
      At Synexis, we’re proud to have played a role in shaping BEC’s journey.
      This case study showcases our ability to deliver impactful branding for
      ambitious, mission-driven companies in emerging industries. If you’re
      looking to elevate your own brand with a clean, timeless design, let’s
      talk.
    </p>
  </div>

  {/* Right Column (optional, e.g. for image/illustration) */}
  <div className="flex-1">
 {/* Heading */}
    <h2 className="text-[#0F1C3D] font-chillax font-normal text-[45px] leading-[48px] capitalize mb-6">
      the Result
    </h2>
    {/* Paragraph 1 */}
    <p className="text-[#0F1C3D] font-chillax font-normal text-[14.1953px] leading-[22px] mb-6">
      The BEC project was more than a branding exercise—it was a collaborative
      journey that merged our creative expertise with their bold ambitions.
      Synexis transformed their vision into a scalable, professional identity
      that positioned them as leaders in clean energy design. From crafting the
      “+BE” logo to creating a vibrant, nature-inspired brand narrative, every
      decision was made with BEC’s long-term goals in mind.
    </p>
    {/* Paragraph 2 */}
    <p className="text-[#0F1C3D] font-chillax font-normal text-[14.0719px] leading-[22px] mb-6">
      The result? A timeless brand that combines innovation and sustainability,
      ready to power their growth for years to come. By trusting our process and
      pushing creative boundaries together, we achieved a design solution that
      truly reflects their values and aspirations.
    </p>
    {/* Paragraph 3 */}
    <p className="text-[#0F1C3D] font-chillax font-normal text-[14.1953px] leading-[22px]">
      At Synexis, we’re proud to have played a role in shaping BEC’s journey.
      This case study showcases our ability to deliver impactful branding for
      ambitious, mission-driven companies in emerging industries. If you’re
      looking to elevate your own brand with a clean, timeless design, let’s
      talk.
    </p>
</div>
</section>
    <section className="w-full max-w-[1248px] mx-auto flex flex-row items-center justify-center gap-8 mt-16 px-4 sm:px-8">

    <div className="flex-1 ">
    {/* Background blur image */}
    <Image
      src="/images/img5_1.png"
      alt="Background blur"
      width={624}
      height={810}
      className="  rounded-2xl"
    />
    </div>
    {/* Foreground mockup */}
   <div className="flex-1">
    <Image
      src="/images/img5_2.png"
      alt="iPhone mockup"
       width={624}
      height={810}
      className=""
      />
  </div>


</section>
<section className="w-full bg-white flex justify-center px-6 py-16">
      <div className="max-w-3xl text-center">
        <p className="font-chillax text-base sm:text-lg leading-relaxed font-normal">
          Design simplicity, ironically, was one of the most complex parts of the brief. 
          The challenge was to create a timeless identity that wouldn’t require frequent 
          updates but still stood out subtly in the clean energy sector. We also had to 
          strike a delicate balance: making BEC distinctive without feeling too loud or 
          disruptive.
        </p>
      </div>
    </section>
    
    {/* Feature Section: Trade Journal for Smarter Decisions */}
      <section className="w-full bg-[#EDEDED] py-12 flex mx-2  max-w-[1280px] justify-center items-center rounded-3xl my-8">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-10 px-4">
          {/* Left: App Screenshot */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/img6.png"
              alt="App feature screenshot"
              width={1143}
              height={938}
              className="rounded-2xl w-full "
              priority
            />
          </div>
                </div>
      </section>
       <section className="w-full max-w-[1248px] mx-auto flex flex-row items-center justify-center gap-8 mt-16 px-4 sm:px-8">
        {/* Image 1 */}
        <div className="flex-1">
          <Image
            src="/images/img7_1.png"
            alt="Image 7_1"
            width={624}
            height={442}
            className="rounded-lg object-cover"
          />
        </div>
        {/* Image 2 */}
        <div className="flex-1">
          <Image
            src="/images/img7_2.png"
            alt="Image 7_2"
            width={624}
            height={442}
            className="rounded-lg object-cover"
          />
        </div>
      </section>
      <section className="w-full bg-white flex justify-center px-6 py-8">
        <div className="max-w-3xl w-full">
          <p className="font-chillax font-normal text-[14.2px] leading-[22.05px] text-[#0F1C3D] align-middle">
            The branding itself presented unique design hurdles. Developing a memorable logo for a two-letter company name, “BE,” required meticulous attention to detail. From exploring negative space to integrating abstract patterns and energy-related motifs, every iteration needed to reflect their ethos of “adding value” rather than disrupting the industry. The deliverables were extensive, requiring us to package everything into a cohesive, organized structure while staying true to the timeline.
          </p>
        </div>
      </section>
      {/* Trader 365 Logo Section */}
      <section className="w-full flex justify-center items-center bg-[#B6F8FC] py-16 px-4 rounded-3xl my-12">
        <div className="w-full max-w-6xl flex flex-col items-center">
          <Image
            src="/images/img8.png"
            alt="Trader 365 Logo and Tagline"
            width={1100}
            height={600}
            className="w-full max-w-[1100px] h-auto object-contain"
            priority
          />
        </div>
      </section>
      <section className="w-full bg-white flex justify-center px-6 py-8">
        <div className="max-w-3xl w-full">
          <p className="font-chillax font-normal text-[14.07px] leading-[22.05px] text-[#0F1C3D] align-middle">
            The “+” symbolized their commitment to adding value to existing resources rather than disrupting the industry. It encapsulated their mission to enhance renewable energy solutions while maintaining harmony with nature. The design resonated deeply with BEC, aligning perfectly with their brand philosophy.
          </p>
        </div>
      </section>

 <section className="w-full max-w-[1248px] mx-auto flex flex-row items-center justify-center gap-8 mt-16 px-4 sm:px-8">
        {/* Image 1 */}
        <div className="flex-1">
          <Image
            src="/images/img9_1.png"
            alt="Image 7_1"
            width={624}
            height={442}
            className="rounded-lg object-cover"
          />
        </div>
        {/* Image 2 */}
        <div className="flex-1">
          <Image
            src="/images/img9_2.png"
            alt="Image 7_2"
            width={624}
            height={442}
            className="rounded-lg object-cover"
          />
        </div>
      </section>

   </main>
  );
}