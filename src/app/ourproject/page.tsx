import Image from 'next/image';

export default function OutProjectPage() {
  return (
    <main className="px-5   font-chillax">
      {/* Hero Section */}
      <section className="text-center mx-auto py-16">
        <h1 className="text-[46.93px] leading-[57.36px] tracking-[-2.35px] text-center font-chillax font-medium mb-4">
          Revolutionized ERP System with an AI Agent for Streamlined Order Management
        </h1>
        <div className="relative w-full max-w-[1280px] h-auto mx-auto px-5 rounded-[66px] sm:rounded-[36px]">
          <Image
            src="/images/img16.png"
            alt="Laptop Mockup"
            width={1280}
            height={576}
            className="shadow-lg rounded-[56px] sm:rounded-[24px]"
         />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-8">
          Our AI agent development services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">AI Agent Consulting</h3>
            <p>
              We help you define a clear AI agent strategy by analyzing your use case, assessing your data and IT infrastructure, and determining the best AI agent type. Our experts guide you in selecting the right LLM, optimizing prompt engineering, and ensuring seamless integration, setting the foundation for a successful AI agent deployment.
            </p>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Custom AI Agent Design and Seamless Integration</h3>
            <p>
              We specialize in designing AI agents that are fully customized to meet your operational goals and user requirements. Our team ensures seamless integration with your existing systems and technologies, so your workflows remain uninterrupted while maximizing the benefits of AI.
            </p>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Task Automation and Operational Optimization</h3>
            <p>
              The AI agents we engineer can handle repetitive, time-consuming tasks, allowing your team to focus on more strategic initiatives. We also provide ongoing performance optimization, ensuring these agents adapt to changing business needs and deliver continuous value.
            </p>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Real-Time Data Processing and Decision Support</h3>
            <p>
              We equip AI agents with powerful data processing capabilities allowing for real-time large datasets analysis. These agents offer valuable insights and support decision-making processes, helping businesses stay agile in fast-paced environments.
            </p>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Intelligent Customer Interaction and Engagement</h3>
            <p>
              We build AI agents to enhance customer interactions through intelligent and human-like responses. They efficiently manage customer inquiries, provide personalized experiences, and strengthen relationships while reducing response times.
            </p>
          </div>
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Security, Compliance, and Continuous Support</h3>
            <p>
              We build robust protections into every solution, ensuring that your AI agents comply with industry regulations and safeguard sensitive data. In addition to security, we offer continuous support and regular updates, keeping the AI agents optimized to meet new challenges while maintaining peak performance over time.
            </p>
          </div>
        </div>
      </section>

     {/* Side-by-Side Images Section */}
         <section className="w-full max-w-[2000px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-16 px-4 sm:px-8">
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
         <section className="relative w-full max-w-[1280px] mx-auto mb-16 px-4 sm:px-8 flex flex-col lg:flex-row gap-8 lg:gap-16">
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
      <section className=" mb-[50px] h-[550px] bg-[#F4F0ED]" style={{ padding: 0 }}>
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-8">
            Building AI Agents to Automate Processes, Deliver Real-Time Insights, and Elevate Customer Engagement
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed mb-6">
            AI agents are intelligent software programs designed to autonomously perform tasks, make decisions, and interact with users in a human-like manner. These agents are invaluable for businesses, as they can automate up to 45% of repetitive processes, provide real-time data analysis, and enhance customer interactions, leading to a 30% increase in operational efficiency.
          </p>
          <p className="text-lg sm:text-xl leading-relaxed">
            Leveraging advanced AI technologies, we help our clients design, develop, and implement AI agents that can integrate seamlessly into their existing systems, ensuring they effectively support your business goals and drive growth.
          </p>
        </div>
      </section>
    </main>
  );
}