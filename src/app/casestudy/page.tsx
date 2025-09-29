import React from 'react';
import Image from 'next/image';

const CaseStudyPage = () => {
  return (
    <div className='rounded-b-[80px]  min-h-screen  relative z-50 bg-white pb-24 lg:pb-40  mx-auto'>
   
      <section className="relative min-h-screen w-full h-[90vh] bg-[rgba(15,28,61,0.68)] flex flex-col items-center justify-center">
        <Image
          src="/images/background.png"
          alt="Case Study Background"
          fill
          priority
          className="absolute inset-0 z-0 object-cover"
        />

        <div className="absolute top-30 right-20 max-w-[500px] px-4 lg:px-0 text-right">
          <p className="font-chillax font-normal text-[16px] mb-4 sm:text-[18px] lg:text-[20px] text-white">
            Every solution we create is powered by intelligence and intent. Our case studies highlight how Synexis.ai transforms challenges into opportunities — blending AI, creativity, and strategy to deliver outcomes that truly move businesses forward.
          </p>
          <button className="px-6 py-3 bg-white rounded-full font-chillax font-medium text-[16px] sm:text-[18px] text-[#0C0E12] hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </div>

        {/* Bottom centered heading */}
        <div className="absolute bottom-1 w-full flex justify-center">
          <h1 className="font-chillax font-medium text-[40px] sm:text-[60px] lg:text-[158px] leading-tight text-white">
            Case Studies
          </h1>
        </div>
      </section>
 

         <div className="min-w-[1200px] mx-auto px-4">
      <section className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="mb-12">
          <span className="inline-flex items-center text-sm text-slate-500 font-regular mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-900 mr-2" />
            CASE STUDIES
          </span>

          <h2 className="font-chillax text-4xl sm:text-5xl text-slate-900 font-regular leading-tight mb-4">
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
          className="w-[95vw] h-auto object-cover max-h-[500px] sm:max-h-[650px] lg:max-h-[768px]"
        />
      </section>

      <section>
        {/* Two-column showcase (mobile + laptop) */}
        <div className="flex flex-col  w-[93vw] lg:flex-row mt-8">
          <div>
            <Image
              src="/images/img11_1.png"
              alt="App Design Mobile"
              width={439}
              height={633}
              className="rounded-xl shadow-xl object-contain"
            />
          </div>
          <div className="flex justify-center">
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
      <section className="relative w-full h-[60vh] bg-cover bg-center z-10">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/img13.png"
            alt="Background"
            fill
            className="object-cover rounded-[32px]"
            priority
          />
        </div>
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
            </div>
  );
};

export default CaseStudyPage;