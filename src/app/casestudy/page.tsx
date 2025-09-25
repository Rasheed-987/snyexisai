import React from 'react';
import Image from 'next/image';

const CaseStudyPage = () => {
  return (
    <div className="min-h-screen pb-24 rounded-b-[80px] relative z-50 bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] bg-[rgba(15,28,61,0.68)] flex flex-col items-center justify-center">
        <Image
          src="/images/background.png"
          alt="Case Study Background"
          fill
          priority
          className="absolute inset-0 z-0 object-cover"
        />

        
        <div className="z-10 text-center lg:ml-[458px] max-w-[500px] px-4 lg:px-0">
          <p className="font-chillax font-normal text-[16px] mb-2 sm:text-[18px] lg:text-[20px] leading-relaxed text-white">
            Every solution we create is powered by intelligence and intent. Our case studies highlight how Synexis.ai transforms challenges into opportunities — blending AI, creativity, and strategy to deliver outcomes that truly move businesses forward.
          </p>
          <button className="px-6 py-3 bg-white rounded-full font-chillax font-medium text-[16px] sm:text-[18px] text-[#0C0E12] hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </div>
        <div className="z-10 text-center mb-8">
          <h1 className="font-chillax font-medium text-[40px] sm:text-[60px] lg:text-[110px] leading-tight text-white">
            Case Studies
          </h1>
        </div>

      </section>
    {/* Featured Projects Section */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="mb-12">
          <span className="inline-flex items-center text-sm text-slate-500 font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-900 mr-2" />
            CASE STUDIES
          </span>

          <h2 className="font-chillax text-4xl sm:text-5xl text-slate-900 font-semibold leading-tight mb-4">
            Featured Projects
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
                        className="w-[95vw] ml-6 h-auto object-cover max-h-[500px] sm:max-h-[600px] lg:max-h-[768px]"
                    />
                   
                </section>
      
  <section>
        {/* Two-column showcase (mobile + laptop) */}
        <div className="flex flex-col justify-center lg:flex-row mt-8">
          <div className=" ">
            <Image
              src="/images/img11_1.png"
              alt="App Design Mobile"
              width={439}
              height={633}
              className="rounded-xl shadow-xl object-contain"
            />
          </div>
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/images/img11_2.png"
              alt="App Design Laptop"
              width={907}
              height={633}
              className="rounded-xl shadow-xl object-contain"
            />
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row gap-8 items-center justify-center py-12">
        {/* Left Image */}
        <div className="flex-1 flex flex-col items-center relative">
          
          <Image
            src="/images/img12_1.png"
            alt="App Design Laptop"
            width={410}
            height={410}
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
            priority
          />
        </div>
        {/* Right Image */}
        <div className="flex-1 flex flex-col items-center relative">
         
          <Image
            src="/images/img12_2.png"
            alt="App Design Watches"
            width={410}
            height={410}
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
            priority
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full h-[90vh] bg-cover bg-center z-10" style={{ backgroundImage: 'url(/images/project-background.png)' }}>
        <div className="absolute inset- bg-opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center h-full z-10 text-center px-6 sm:px-12">
          <h2 className="text-white font-chillax font-semibold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Have A Project in Mind?
          </h2>
          <p className="text-white font-chillax font-normal text-base sm:text-lg lg:text-xl mb-6 max-w-[600px]">
            Partner with us to unlock innovation and accelerate your digital future.
          </p>
          <button className="px-6 py-3 bg-white rounded-full font-chillax font-medium text-base sm:text-lg text-blue-900 hover:bg-gray-100 transition-colors">
            Schedule A Call
          </button>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyPage;