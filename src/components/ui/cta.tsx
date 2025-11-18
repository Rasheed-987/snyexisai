import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from 'react'

type CTAProps = React.HTMLAttributes<HTMLElement> & {
  className?: string
}

export const CTA: React.FC<CTAProps> = ({ className = '', ...rest }) => {
  const router = useRouter();
  return (
    <>

      {/* CTA Section */}
      {/* <section {...rest} className={`relative ${className} w-[90vw] mx-auto  h-[300px] sm:h-[350px] lg:h-[400px] 2xl:h-[500px] bg-cover bg-center z-10 overflow-hidden rounded-[32px] group cursor-pointer transition-all hover:scale-[1.02] duration-500 hover:shadow-2xl`}>
        <div className="absolute inset-0 w-full h-full">
          <Link href="/casestudiesDetail">
            <Image
              src="/images/img13.png"
              alt="Background"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </Link>
        </div>
        <div className="absolute inset-0  bg-opacity-40 transition-all duration-500 group-hover:bg-opacity-30" />
        <div className="relative flex flex-col items-center justify-center h-full z-10 text-center px-6 sm:px-12 transition-all duration-500 group-hover:transform group-hover:-translate-y-2">
          <h2 className="text-white  font-semibold text-lg sm:text-xl lg:text-3xl mb-4 transition-all duration-500 group-hover:text-shadow-lg">
            Have A Project in Mind?
          </h2>
          <p className="text-white  font-normal text-sm sm:text-base lg:text-lg mb-6 max-w-[600px] transition-all duration-500 group-hover:opacity-90">
            Partner with us to unlock innovation and accelerate your digital future.
          </p>
          
          <button onClick={()=>router.push('/contact')}
          className="px-6 py-3 bg-white rounded-full  font-medium text-base sm:text-lg text-blue-900 shadow transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-background hover:transform hover:-translate-y-1 active:scale-95">
            Schedule A Call 
          </button>
        </div>
      </section> */}

{/* Enhanced CTA Section */}
<section className="w-full  mx-auto px-4 sm:px-6 lg:px-8 mt-8">
  <div className="max-w-5xl 2xl:max-w-7xl mx-auto rounded-2xl sm:rounded-[30px] lg:rounded-[40px] group overflow-hidden cursor-pointer relative shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
    
    {/* Background Image: Scales up on group hover */}
    <div className="absolute inset-0 w-full h-full">
      <img
        src="/images/home/background.png"
        alt="Abstract background"
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
      />
    </div>

    {/* Overlay: Becomes slightly more transparent on group hover */}
    <div className="absolute inset-0 bg-foreground/80 transition-all duration-500 group-hover:bg-foreground/70" />

    
    <div className="relative z-10 flex flex-col items-center justify-center py-8 px-4 sm:py-12 sm:px-6 md:py-16 lg:px-8 xl:py-24">
      <h2 className="text-white text-base sm:text-base md:text-lg lg:text-3xl xl:text-4xl 2xl:text-5xl font-medium text-center tracking-tight mb-3 sm:mb-4 leading-tight">
        Let's Create Tomorrow<br className="hidden sm:block" /><span className="sm:hidden"> </span>Hand in Hand!
      </h2>
      <p className="text-white text-sm sm:text-sm md:text-base lg:text-lg text-center max-w-xl xl:max-w-3xl mb-4 sm:mb-6 lg:mb-8 px-2">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      </p>
      
      {/* Button: Enhanced hover effects */}
      <button onClick={()=>router.push('/contact')} className="bg-white text-[var(--foreground)] px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-medium shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:-translate-y-1 active:scale-95">
        Free Consultation
      </button>
    </div>
  </div>
</section>


          </>
    )
}
