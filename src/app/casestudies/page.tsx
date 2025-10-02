'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CaseStudyPage = () => {
  const router = useRouter();
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
 

         <div className="w-full mx-auto px-4">
      <section className="w-full mx-auto px-4 sm:px-8 lg:px-4 py-12">
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
        <Link href="/casestudiesDetail">
          <Image
            src="/images/img10.jpg"
            alt="App Design Showcase"
            width={1605}
            height={768}
            priority
            className="w-full h-auto object-cover max-h-[500px] sm:max-h-[650px] lg:max-h-[768px]"
          />
        </Link>
      </section>

      <section className='overflow-hidden'>
        {/* Two-column showcase (mobile + laptop) */}
        <div className="flex flex-col gap-8 md:flex-row mt-8">
          <div className="flex justify-center relative w-full h-[300px] md:w-[40%] md:h-[633px] lg:justify-start">
            <Link href="/casestudiesDetail">
              <Image
                src="/images/img11_1.png"
                alt="App Design Mobile"
                fill
                className="rounded-xl shadow-xl object-contain"
              />
            </Link>
          </div>
          <div className="flex flex-1 relative justify-center w-full h-[300px] md:h-[633px]">
            <Link href="/casestudiesDetail">
              <Image
                src="/images/img11_2.png"
                alt="App Design Laptop"
                fill
                className="rounded-xl shadow-xl object-contain"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row gap-8 items-center justify-center py-12">
        {/* Left Image */}
        <div className="flex-1 flex flex-col w-full h-[250px] md:h-[589px] items-center relative">
          <Link href="/casestudiesDetail">
            <Image
              src="/images/img12_1.png"
              alt="App Design Laptop"
              fill
              className="rounded-2xl shadow-lg object-cover"
              priority
            />
          </Link>
        </div>
        {/* Right Image */}
        <div className="flex-1 flex flex-col h-[250px] md:h-[589px] items-center relative">
          <Link href="/casestudiesDetail">
            <Image
              src="/images/img12_2.png"
              alt="App Design Watches"
              fill
              className="rounded-2xl shadow-lg object-cover"
              priority
            />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full h-[60vh] bg-cover bg-center z-10">
        <div className="absolute inset-0 w-full h-full">
          <Link href="/casestudiesDetail">
            <Image
              src="/images/img13.png"
              alt="Background"
              fill
              className="object-cover rounded-[32px]"
              priority
            />
          </Link>
        </div>
        <div className="relative flex flex-col items-center justify-center h-full z-10 text-center px-6 sm:px-12">
          <h2 className="text-white font-chillax font-semibold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Have A Project in Mind?
          </h2>
          <p className="text-white font-chillax font-normal text-base sm:text-lg lg:text-xl mb-6 max-w-[600px]">
            Partner with us to unlock innovation and accelerate your digital future.
          </p>
          
          <button  onClick={()=>router.push('/contact')}
          className="px-6 py-3 bg-white rounded-full font-chillax font-medium text-base sm:text-lg text-blue-900 hover:bg-gray-100 transition-colors">
            Schedule A Call 
          </button>
        </div>
      </section>
    </div>
            </div>
  );
};

export default CaseStudyPage;