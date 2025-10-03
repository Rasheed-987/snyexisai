'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const OurProjectPage = () => {
   const router = useRouter();
  return ( 
    <div className='rounded-b-[80px]  min-h-screen  relative z-50 bg-white pb-24 lg:pb-40  '>
    
    <section className="bg-[#FAFBFC] py-10 ">
      <div className="md:px-[4rem] px-6 ">
        <h1 className="text-5xl font-normal text-center text-[#142047] mb-24" style={{ fontFamily: 'Chillax, sans-serif' }}>
          Our Projects
        </h1>
        <div className=" px-2 ">
          <p className="text-xs font-medium text-[#142047] mb-2 tracking-widest" style={{ fontFamily: 'Chillax, sans-serif' }}>
            OUR FEATURED WORK
          </p>
          <h2 className="text-3xl md:text-4xl font-normal text-[#142047] leading-tight" style={{ fontFamily: 'Chillax, sans-serif' }}>
            AI Agents We’ve Engineered for Smarter Operations
          </h2>
        </div>
      </div>
    </section>

    <section className="bg-white w-full space-y-12 mt-10 h-auto md:px-[4rem] px-8 mx-auto "> 
  <div className="flex flex-col md:flex-row items-start gap-12  mx-auto">
    {/* Image side */}
    <div className="w-full md:w-1/2  h-full mb-8 md:mb-0">
      <Link href="/projectouterpage">
      <img 
        src="/images/ourproject/img1.png" 
        alt="ERP AI Agent Project Screenshot" 
        className="
        w-full 
        rounded-lg 
        shadow-lg 
        
        h-full
        md:max-h-[280px]   /* medium screens */
        lg:max-h-[400px]   /* large screens */
        
        "
        />
        </Link>
    </div>

    {/* Content side */}
    <div className="w-full md:w-1/2 text-[#142047]" style={{ fontFamily: 'Chillax, sans-serif' }}>
      <p className="text-sm text-[#6C7BA1] mb-2">– ERP AI Agent</p>
      <h3 className="text-3xl md:text-4xl font-medium  mb-6 leading-tight">
        Revolutionized ERP System with an AI Agent for Streamlined Order Management
      </h3>
      <p className="mb-6 text-lg font-regular text-[#142047]">
        For a leading American manufacturer, we created an ERP AI agent to manage customer orders, inventory, and order tracking, improving order accuracy and response times while enhancing operational efficiency.
      </p>
      <a href="/projectouterpage" className="inline-flex items-center text-[#3B82F6] font-medium mb-6 hover:underline">
        Read more
        <span className="ml-2">→</span>
      </a>
      <hr className="border-[#E6E8F0] my-6" />
      <ul className="space-y-4">
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          Automated order placement and real-time tracking
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          95% order accuracy with reduced response times
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          Seamless ERP integration for inventory and pricing updates
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          Enhanced operational productivity across departments
        </li>
      </ul>
    </div>
  </div>
{/* 2nd  */}

<div className="flex flex-col md:flex-row items-start gap-12  mx-auto">
    
     {/* Content side */}
    <div className="w-full md:w-1/2 text-[#142047]" style={{ fontFamily: 'Chillax, sans-serif' }}>
      <p className="text-sm text-[#6C7BA1] mb-2">– ERP AI Agent</p>
      <h3 className="text-3xl md:text-4xl font-medium mb-6 leading-tight">
        Revolutionized ERP System with an AI Agent for Streamlined Order Management
      </h3>
      <p className="mb-6 text-lg text-[#142047]">
        For a leading American manufacturer, we created an ERP AI agent to manage customer orders, inventory, and order tracking, improving order accuracy and response times while enhancing operational efficiency.
      </p>
      <a href="/projectouterpage" className="inline-flex items-center text-[#3B82F6] font-medium mb-6 hover:underline">
        Read more
        <span className="ml-2">→</span>
      </a>
      <hr className="border-[#E6E8F0] my-6" />
      <ul className="space-y-4">
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          Automated order placement and real-time tracking
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          95% order accuracy with reduced response times
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          Seamless ERP integration for inventory and pricing updates
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          Enhanced operational productivity across departments
        </li>
      </ul>
    </div>
    
    {/* Image side */}
    <div className="w-full md:w-1/2  h-full mb-8 md:mb-0">
      <Link href="/projectouterpage">
      
      <img 
        src="/images/ourproject/img1.png" 
        alt="ERP AI Agent Project Screenshot" 
        className="
          w-full 
          rounded-lg 
          shadow-lg 
          h-full
          md:max-h-[280px]   /* medium screens */
          lg:max-h-[400px]   /* large screens */
         
        "
      />
      </Link>
    </div>

   
  </div>

 <div className="flex flex-col md:flex-row items-start gap-12   mx-auto">
    {/* Image side */}
    <div className="w-full md:w-1/2 flex h-full mb-8 md:mb-0">
      <img 
        src="/images/ourproject/img1.png" 
        alt="ERP AI Agent Project Screenshot" 
        className="
          w-full 
          rounded-lg 
          shadow-lg 
           h-full
          md:max-h-[280px]   /* medium screens */
          lg:max-h-[400px]   /* large screens */
           
        "
      />
    </div>

    {/* Content side */}
    <div className="w-full md:w-1/2 text-[#142047]" style={{ fontFamily: 'Chillax, sans-serif' }}>
      <p className="text-sm text-[#6C7BA1] mb-2">– ERP AI Agent</p>
      <h3 className="text-3xl md:text-4xl font-medium mb-6 leading-tight">
        Revolutionized ERP System with an AI Agent for Streamlined Order Management
      </h3>
      <p className="mb-6 text-lg text-[#142047]">
        For a leading American manufacturer, we created an ERP AI agent to manage customer orders, inventory, and order tracking, improving order accuracy and response times while enhancing operational efficiency.
      </p>
      <a href="#" className="inline-flex items-center text-[#3B82F6] font-medium mb-6 hover:underline">
        Read more
        <span className="ml-2">→</span>
      </a>
      <hr className="border-[#E6E8F0] my-6" />
      <ul className="space-y-4">
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          Automated order placement and real-time tracking
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          95% order accuracy with reduced response times
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          Seamless ERP integration for inventory and pricing updates
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          Enhanced operational productivity across departments
        </li>
      </ul>
    </div>
  </div>
{/* 4th  */}

<div className="flex flex-col md:flex-row items-start gap-12  mx-auto">
    
     {/* Content side */}
    <div className="w-full md:w-1/2 text-[#142047]" style={{ fontFamily: 'Chillax, sans-serif' }}>
      <p className="text-sm text-[#6C7BA1] mb-2">– ERP AI Agent</p>
      <h3 className="text-3xl md:text-4xl font-medium mb-6 leading-tight">
        Revolutionized ERP System with an AI Agent for Streamlined Order Management
      </h3>
      <p className="mb-6 text-lg text-[#142047]">
        For a leading American manufacturer, we created an ERP AI agent to manage customer orders, inventory, and order tracking, improving order accuracy and response times while enhancing operational efficiency.
      </p>
      <a href="#" className="inline-flex items-center text-[#3B82F6] font-medium mb-6 hover:underline">
        Read more
        <span className="ml-2">→</span>
      </a>
      <hr className="border-[#E6E8F0] my-6" />
      <ul className="space-y-4">
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          Automated order placement and real-time tracking
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          95% order accuracy with reduced response times
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          Seamless ERP integration for inventory and pricing updates
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 mt-2 mr-3 rounded-full bg-[#3B82F6]"></span>
          Enhanced operational productivity across departments
        </li>
      </ul>
    </div>
    
    {/* Image side */}
    <div className="w-full md:w-1/2 flex h-full mb-8 md:mb-0">
      <img 
        src="/images/ourproject/img1.png" 
        alt="ERP AI Agent Project Screenshot" 
        className="
          w-full 
          rounded-lg 
          shadow-lg 
        
          h-full
          md:max-h-[280px]   /* medium screens */
          lg:max-h-[400px]   /* large screens */
            
        "
      />
    </div>

   
  </div>



 {/* CTA Section */}
      <section className="relative w-full h-[60vh] bg-cover bg-center  z-10">
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
          <h2 className="text-white font-chillax font-medium text-3xl sm:text-4xl lg:text-5xl mb-4">
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













</section>

</div>    
  )
}

export default OurProjectPage
