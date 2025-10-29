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
      <section {...rest} className={`relative ${className} w-[90vw] mx-auto  h-[300px] sm:h-[350px] lg:h-[400px] 2xl:h-[500px] bg-cover bg-center z-10 overflow-hidden rounded-[32px] group cursor-pointer transition-all hover:scale-[1.02] duration-500 hover:shadow-2xl`}>
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
          <h2 className="text-white  font-semibold text-3xl sm:text-4xl lg:text-5xl mb-4 transition-all duration-500 group-hover:text-shadow-lg">
            Have A Project in Mind?
          </h2>
          <p className="text-white  font-normal text-base sm:text-lg lg:text-xl mb-6 max-w-[600px] transition-all duration-500 group-hover:opacity-90">
            Partner with us to unlock innovation and accelerate your digital future.
          </p>
          
          <button onClick={()=>router.push('/contact')}
          className="px-6 py-3 bg-white rounded-full  font-medium text-base sm:text-lg text-blue-900 shadow transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-background hover:transform hover:-translate-y-1 active:scale-95">
            Schedule A Call 
          </button>
        </div>
      </section>
          </>
    )
}
