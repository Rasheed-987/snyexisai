import React from 'react'
import Image from 'next/image'

const service = () => {
  return (
<section className='w-full h-[100vh] py-16   bg-white  rounded-b-[80px] mb-30  relative z-50'>
<div>
    <h2 className="text-[#1A2341] text-3xl text-center sm:text-4xl lg:text-5xl font-medium leading-tight mb-2">Our Services</h2>
</div>
      <div className="flex flex-col gap-4 w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl px-8">
  <div className="relative flex flex-1 h-full">
    <Image src="/images/Services/img1.png" alt="Services" fill className="object-obtain rounded-xl" />
  </div>
  <div className="relative flex flex-1 h-full">
    <Image src="/images/Services/img2.png" alt="Services" fill className="object-obtain rounded-xl" />
    
  </div>
</div>
</section>
  )
}

export default service
