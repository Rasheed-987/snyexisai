import React from 'react';
import Image from 'next/image';

interface ServicesCardProps {
  title: string;
  image: string;
}



const ServicesCard = ({ title, image }: ServicesCardProps) => {
  return (
    <div className="w-full">
      <div className="relative w-full h-[350px] rounded-xl overflow-hidden">
        <Image src={image} alt={title} fill className="object-fit" />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  )
}

export default ServicesCard;
