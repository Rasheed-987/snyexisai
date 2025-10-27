import React from 'react';
import Image from 'next/image';

interface ServicesCardProps {
  title: string;
  image: string;
  requirements?: string[];
}



const ServicesCard = ({ title, image, requirements }: ServicesCardProps) => {
  return (
    <div className="w-full">
      <div className="relative w-full h-[350px] rounded-xl overflow-hidden">
        <Image src={image} alt={title} fill className="object-fit" />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
       {/* Bullets */}
        <ul className="space-y-2 pt-3">
          {requirements?.map((req, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0"></span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default ServicesCard;
