'use client'

import Image from 'next/image';
import { JobApplicationCardProps } from './types/dashboard.types';

export const JobApplicationCard = ({ application, onView }: JobApplicationCardProps) => {
  return (
    <div className="flex items-center justify-between p-3 md:p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
        <Image
          src={application.profileImage}
          alt={application.name}
          width={48}
          height={48}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[#0F1C3D] text-sm truncate">
            {application.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 truncate">
            {application.position}
          </p>
        </div>
      </div>
      <button 
        onClick={() => onView(application.id.toString())} 
        className="text-[#327AED] text-xs md:text-sm font-medium hover:underline flex-shrink-0 ml-2"
      >
        View
      </button>
    </div>
  );
};