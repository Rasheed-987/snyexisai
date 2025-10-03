import Image from 'next/image';

export default function OurProjectPage() {
  return (
    <main className="px-5 rounded-b-[80px]  min-h-screen  relative z-50 bg-white pb-24 lg:pb-40   ">
      {/* Hero Section */}
      <section className=" mx-auto py-10">
        <h1 className="md:text-[46.93px] text-[30px] leading-[57.36px] lg:px-10  tracking-[-2.35px] text-center font-chillax font-medium mb-4">
          Revolutionized ERP System with an AI Agent for Streamlined Order Management
        </h1>
        <div className="relative w-full   mx-auto px-2 ">
          <Image
            src="/images/img16.png"
            alt="Laptop Mockup"
            width={1280}
            height={576}
            className="shadow-lg w-full min-h-[250px] rounded-[20px]"
         />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <h3 className="text-2xl font-regular text-center mb-8">WHAT WE OFFER</h3>
        <h2 className="text-3xl sm:text-[30px] md:font-semibold   text-center mb-8">
          Our AI agent development services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-1">
          <div className="py-6 rounded-lg">
            <h3 className="text-xl md:font-bold font-medium mb-4">AI Agent Consulting</h3>
            <p>
              We help you define a clear AI agent strategy by analyzing your use case, assessing your data and IT infrastructure, and determining the best AI agent type. Our experts guide you in selecting the right LLM, optimizing prompt engineering, and ensuring seamless integration, setting the foundation for a successful AI agent deployment.
            </p>
          </div>
          <div className="py-6 rounded-lg">
            <h3 className="text-xl md:font-bold font-medium mb-4">Custom AI Agent Design and Seamless Integration</h3>
            <p>
              We specialize in designing AI agents that are fully customized to meet your operational goals and user requirements. Our team ensures seamless integration with your existing systems and technologies, so your workflows remain uninterrupted while maximizing the benefits of AI.
            </p>
          </div>
          <div className="py-6 rounded-lg">
            <h3 className="text-xl md:font-bold font-medium mb-4">Task Automation and Operational Optimization</h3>
            <p>
              The AI agents we engineer can handle repetitive, time-consuming tasks, allowing your team to focus on more strategic initiatives. We also provide ongoing performance optimization, ensuring these agents adapt to changing business needs and deliver continuous value.
            </p>
          </div>
          <div className="py-6 rounded-lg">
            <h3 className="text-xl md:font-bold font-medium mb-4">Real-Time Data Processing and Decision Support</h3>
            <p>
              We equip AI agents with powerful data processing capabilities allowing for real-time large datasets analysis. These agents offer valuable insights and support decision-making processes, helping businesses stay agile in fast-paced environments.
            </p>
          </div>
          <div className="py-6 rounded-lg">
            <h3 className="text-xl md:font-bold font-medium mb-4">Intelligent Customer Interaction and Engagement</h3>
            <p>
              We build AI agents to enhance customer interactions through intelligent and human-like responses. They efficiently manage customer inquiries, provide personalized experiences, and strengthen relationships while reducing response times.
            </p>
          </div>
          <div className="py-6 rounded-lg">
            <h3 className="text-xl md:font-bold font-medium mb-4">Security, Compliance, and Continuous Support</h3>
            <p>
              We build robust protections into every solution, ensuring that your AI agents comply with industry regulations and safeguard sensitive data. In addition to security, we offer continuous support and regular updates, keeping the AI agents optimized to meet new challenges while maintaining peak performance over time.
            </p>
          </div>
        </div>
      </section>

     {/* Side-by-Side Images Section */}
         <section className="w-full max-w-[2000px] mx-auto flex flex-col sm:flex-row items-center justify-center gapy-6 sm:gap-8 mb-16 px-4 sm:px-8">
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
         <section className="relative w-full  mx-auto mb-16 px-4 sm:px-8 flex flex-col lg:flex-row gap-8 lg:gap-16">
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
   

      {/* AI Agents Section */}
      <section className="w-full bg-[#F4F0ED]  py-12 flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-8 text-[#142047] font-chillax">
            Building AI Agents to Automate Processes, Deliver Real-Time Insights, and Elevate Customer Engagement
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 text-[#142047] font-chillax">
            AI agents are intelligent software programs designed to autonomously perform tasks, make decisions, and interact with users in a human-like manner. These agents are invaluable for businesses, as they can automate up to 45% of repetitive processes, provide real-time data analysis, and enhance customer interactions, leading to a 30% increase in operational efficiency.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#142047] font-chillax">
            Leveraging advanced AI technologies, we help our clients design, develop, and implement AI agents that can integrate seamlessly into their existing systems, ensuring they effectively support your business goals and drive growth.
          </p>
        </div>
      </section>
<section className='my-16'>
     {/* Card Div */}
  <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden max-w-8xl mx-auto w-full" style={{ boxShadow: '0 0 32px 0 rgba(50,122,237,0.18)' }}>
  {/* Mobile arrow nav below card */}
  
    {/* Left: Project Info */}
    <div className="md:w-1/2 w-full bg-[#181C23] flex flex-col justify-between">
      <div>
        <img src="/images/img1.png" alt="Project Screenshot" className="rounded-xl w-full h-full object-contain" />
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
        <img src="/images/ourproject/img2.png" alt="Location" className="w-[119.77px] h-[42.58px] object-contain" />
        <span className="text-gray-500 text-xs">New York, USA</span>
      </div>
    </div>

  </div>
</section>

    </main>
  );
}